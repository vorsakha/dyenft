// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/// @title Dye NFT
/// @notice ERC721 where the image and metadata are generated fully on-chain.
///         Visual properties change based on on-chain data like owner balance
///         and current block. Enhanced with layered aesthetic elements.
contract DyeNFT is ERC721, ERC721Enumerable {
  using Strings for uint256;

  uint256 private _nextTokenId = 1;

  constructor() ERC721("Dye NFT", "DYE") {}

  /// @notice Mint a new token to the caller.
  /// @return tokenId The newly minted token id
  function mint() external returns (uint256 tokenId) {
    tokenId = _nextTokenId++;
    _safeMint(msg.sender, tokenId);
  }

  /// @notice Generates the tokenURI JSON fully on-chain.
  /// @dev The SVG is embedded as a data URI.
  function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
  {
    address owner = ownerOf(tokenId);

    uint256 ownerBalanceWei = owner.balance;
    uint256 ownerBalanceEth = ownerBalanceWei / 1 ether;
    uint256 blockNum = block.number;

    uint256 hue = uint256(
      keccak256(
        abi.encodePacked(owner, ownerBalanceEth, blockNum, tokenId)
      )
    ) % 360;
    bool isEven = (blockNum % 2 == 0);
    uint256 baseSpeed = 14;
    uint256 speedSlow = baseSpeed - (ownerBalanceEth % 8);
    if (speedSlow < 6) speedSlow = 6;
    uint256 speedFast = speedSlow > 4 ? speedSlow - 3 : 4;

    string memory svg = _generateSVG(
      tokenId,
      owner,
      ownerBalanceEth,
      blockNum
    );

    string memory image = string(
      abi.encodePacked(
        "data:image/svg+xml;base64,",
        Base64.encode(bytes(svg))
      )
    );

    string memory json = string(
      abi.encodePacked(
        "{",
          "\"name\":\"Dye NFT #", tokenId.toString(), "\",",
          "\"description\":\"On-chain SVG that changes with owner balance and block number. "
          "Enhanced with layered visuals: animated gradient, grid, starfield, orbit rings, "
          "glow, and satellites.\",",
          "\"attributes\":[",
            "{\"trait_type\":\"Block\",\"value\":\"", blockNum.toString(), "\"}",
            ",{\"trait_type\":\"OwnerBalanceETH\",\"value\":\"",
              ownerBalanceEth.toString(), "\"}",
            ",{\"trait_type\":\"Hue\",\"value\":\"", hue.toString(), "\"}",
            ",{\"trait_type\":\"Shape\",\"value\":\"",
              (isEven ? "Circle" : "RoundedRect"), "\"}",
            ",{\"trait_type\":\"OrbitSlow(s)\",\"value\":\"",
              speedSlow.toString(), "\"}",
            ",{\"trait_type\":\"OrbitFast(s)\",\"value\":\"",
              speedFast.toString(), "\"}",
          "],",
          "\"image\":\"", image, "\"",
        "}"
      )
    );

    return string(
      abi.encodePacked(
        "data:application/json;base64,",
        Base64.encode(bytes(json))
      )
    );
  }

  function _update(address to, uint256 tokenId, address auth)
    internal
    override(ERC721, ERC721Enumerable)
    returns (address)
  {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(address account, uint128 value)
    internal
    override(ERC721, ERC721Enumerable)
  {
    super._increaseBalance(account, value);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _generateSVG(
    uint256 tokenId,
    address owner,
    uint256 ownerBalanceEth,
    uint256 blockNum
  ) internal pure returns (string memory) {
    uint256 hue = uint256(
      keccak256(
        abi.encodePacked(owner, ownerBalanceEth, blockNum, tokenId)
      )
    ) % 360;

    string memory color = _hsl(hue, 70, 50);
    string memory accent1 = _hsl((hue + 32) % 360, 85, 60);
    string memory accent2 = _hsl((hue + 200) % 360, 70, 55);

    bool isEven = (blockNum % 2 == 0);

    uint256 baseSpeed = 14;
    uint256 speedSlow = baseSpeed - (ownerBalanceEth % 8);
    if (speedSlow < 6) speedSlow = 6;
    uint256 speedFast = speedSlow > 4 ? speedSlow - 3 : 4;

    string memory speedSlowStr = string(
      abi.encodePacked(speedSlow.toString(), "s")
    );
    string memory speedFastStr = string(
      abi.encodePacked(speedFast.toString(), "s")
    );

    string memory stars = _starfield(
      uint256(
        keccak256(
          abi.encodePacked(owner, tokenId, blockNum, ownerBalanceEth)
        )
      )
    );

    string memory shape = isEven
      ? string(
        abi.encodePacked(
          '<circle cx="175" cy="140" r="68" fill="', color,
          '" stroke="', accent2, '" stroke-width="2"',
          ' filter="url(#gl)" />'
        )
      )
      : string(
        abi.encodePacked(
          '<rect x="100" y="76" width="150" height="128" rx="18" fill="',
          color, '" stroke="', accent2, '" stroke-width="2"',
          ' filter="url(#gl)" />'
        )
      );

    string memory rings = string(
      abi.encodePacked(
        '<g transform="translate(175 140)">',

          '<circle r="110" fill="none" stroke="', accent2,
          '" stroke-opacity="0.45" stroke-width="2"',
          ' stroke-dasharray="14 10">',
            '<animateTransform attributeName="transform" attributeType="XML"',
            ' type="rotate" from="0" to="360" dur="', speedSlowStr,
            '" repeatCount="indefinite" />',
          '</circle>',

          '<circle r="90" fill="none" stroke="', accent1,
          '" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"',
          ' stroke-dasharray="3 7">',
            '<animateTransform attributeName="transform" attributeType="XML"',
            ' type="rotate" from="360" to="0" dur="', speedFastStr,
            '" repeatCount="indefinite" />',
          '</circle>',

          '<g>',
            '<circle cx="110" cy="0" r="4" fill="', accent1,
            '" opacity="0.9" />',
            '<animateTransform attributeName="transform" attributeType="XML"',
            ' type="rotate" from="0" to="360" dur="', speedSlowStr,
            '" repeatCount="indefinite" />',
          '</g>',
          
          '<g>',
            '<circle cx="-75" cy="0" r="3" fill="', accent2,
            '" opacity="0.85" />',
            '<animateTransform attributeName="transform" attributeType="XML"',
            ' type="rotate" from="360" to="0" dur="', speedFastStr,
            '" repeatCount="indefinite" />',
          '</g>',
        '</g>'
      )
    );

    return string(
      abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350">',
          '<defs>',

            '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">',
              '<stop offset="0%" stop-color="#0b0d16" />',
              '<stop offset="100%" stop-color="#161a2a" />',
            '</linearGradient>',

            '<radialGradient id="spot" cx="50%" cy="35%" r="60%">',
              '<stop offset="0%" stop-color="', accent1,
              '" stop-opacity="0.26" />',
              '<stop offset="100%" stop-color="#000000" stop-opacity="0" />',
            '</radialGradient>',
            
            '<pattern id="grid" width="35" height="35"',
            ' patternUnits="userSpaceOnUse">',
              '<path d="M 35 0 L 0 0 0 35" fill="none" stroke="#ffffff"',
              ' stroke-opacity="0.05" />',
            '</pattern>',
            
            '<filter id="gl" x="-50%" y="-50%" width="200%" height="200%">',
              '<feDropShadow dx="0" dy="3" stdDeviation="3"',
              ' flood-color="', accent1, '" flood-opacity="0.25"/>',
              '<feGaussianBlur stdDeviation="2" />',
            '</filter>',
          '</defs>',
          
          '<rect width="100%" height="100%" fill="url(#bg)" />',
          '<rect width="100%" height="100%" fill="url(#spot)" />',
          '<rect width="100%" height="100%" fill="url(#grid)" />',
          stars,
          rings,
          shape,
          '<text x="50%" y="72%" dominant-baseline="middle"',
          ' text-anchor="middle" fill="#eaeaf0" font-family="monospace"',
          ' font-size="14" letter-spacing="0.5">',
            'ID ', tokenId.toString(),
            ' | BN ', blockNum.toString(),
            ' | ETH ', ownerBalanceEth.toString(),
          '</text>',
          '<text x="50%" y="86%" dominant-baseline="middle"',
          ' text-anchor="middle" fill="#9aa0a6" font-family="monospace"',
          ' font-size="12" letter-spacing="0.5">',
            _shortAddress(owner),
          '</text>',
        '</svg>'
      )
    );
  }

  function _hsl(
    uint256 h,
    uint256 s,
    uint256 l
  ) internal pure returns (string memory) {
    return string(
      abi.encodePacked(
        "hsl(",
        h.toString(),
        ",",
        s.toString(),
        "%,",
        l.toString(),
        "%)"
      )
    );
  }

  function _starfield(uint256 seed) internal pure returns (string memory out) {
    out = string(
      abi.encodePacked(
        _star(seed, 1),
        _star(seed, 2),
        _star(seed, 3),
        _star(seed, 4),
        _star(seed, 5),
        _star(seed, 6),
        _star(seed, 7),
        _star(seed, 8),
        _star(seed, 9),
        _star(seed, 10),
        _star(seed, 11),
        _star(seed, 12),
        _star(seed, 13),
        _star(seed, 14),
        _star(seed, 15),
        _star(seed, 16),
        _star(seed, 17),
        _star(seed, 18)
      )
    );
  }

  function _star(uint256 seed, uint256 idx)
    internal
    pure
    returns (string memory)
  {
    bytes32 h = keccak256(abi.encodePacked(seed, idx));
    uint256 x = 12 + (uint256(h) % 326);
    uint256 y = 12 + ((uint256(h) >> 16) % 326);
    uint256 r = 1 + ((uint256(h) >> 32) % 2);
    uint256 sel = (uint256(h) >> 48) % 3;
    string memory op = sel == 0 ? "0.25" : (sel == 1 ? "0.45" : "0.7");
    string memory fill = ((uint256(h) >> 56) % 2 == 0)
      ? "#eaf2ff"
      : "#c4d8ff";

    return string(
      abi.encodePacked(
        '<circle cx="',
        x.toString(),
        '" cy="',
        y.toString(),
        '" r="',
        r.toString(),
        '" fill="',
        fill,
        '" opacity="',
        op,
        '"/>'
      )
    );
  }

  function _shortAddress(address a) internal pure returns (string memory) {
    bytes memory full = bytes(Strings.toHexString(uint256(uint160(a)), 20));
    bytes memory out = new bytes(2 + 4 + 3 + 4);
    // 0x
    out[0] = full[0];
    out[1] = full[1];
    // first 4
    out[2] = full[2];
    out[3] = full[3];
    out[4] = full[4];
    out[5] = full[5];
    // ellipsis '...'
    out[6] = bytes1(".");
    out[7] = bytes1(".");
    out[8] = bytes1(".");
    // last 4 (from end)
    uint256 len = full.length;
    out[9] = full[len - 4];
    out[10] = full[len - 3];
    out[11] = full[len - 2];
    out[12] = full[len - 1];
    return string(out);
  }
}