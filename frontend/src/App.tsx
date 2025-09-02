import { useDisconnect, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useMetaMaskConnect } from "@/hooks/useMetaMaskConnect";
import useMint from "@/hooks/useMint";
import { useLoadNFTs } from "@/hooks/useLoadNFTs";

function App() {
  const { handleConnect } = useMetaMaskConnect();
  const { gallery, loading, refetch } = useLoadNFTs();
  const { mint, loading: minting } = useMint(refetch);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div className="min-h-dvh bg-app text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar (Menu) */}
          <aside className="glass bg-panel elev-1 w-full shrink-0 rounded-2xl border border-border p-6 md:sticky md:top-6 md:w-72 lg:w-80">
            <div className="mb-6">
              <h1 className="bg-gradient-to-r from-primary/70 via-accent/70 to-secondary/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Dye NFT Viewer
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Connect your wallet to view and mint unique on-chain SVG NFTs.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={handleConnect}>Connect Wallet</Button>

              <Button onClick={() => disconnect()} variant="outline">
                Disconnect
              </Button>

              <Button onClick={mint} disabled={minting} variant="success">
                {minting ? "Minting…" : "Mint NFT"}
              </Button>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Badge variant="secondary">
                {address ? "Connected" : "Disconnected"}
              </Badge>
              {address && (
                <span className="rounded-md bg-muted/20 px-2 py-1 font-mono text-xs text-muted-foreground">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Stats */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Your Collection
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {loading
                    ? "Loading your NFTs…"
                    : gallery.length === 0
                    ? "No NFTs yet — mint your first one!"
                    : `${gallery.length} ${
                        gallery.length === 1 ? "NFT" : "NFTs"
                      } in your wallet`}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="mt-10 flex items-center justify-center py-16">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/60 border-t-transparent"></div>
                  <span className="text-lg text-muted-foreground">
                    Loading your NFTs...
                  </span>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && gallery.length === 0 && (
              <div className="mt-10 rounded-2xl border border-border bg-muted/15 p-12 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20">
                  <svg
                    className="h-12 w-12 text-primary/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">No NFTs Found</h3>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                  Connect your wallet and mint your first NFT to see it appear
                  here.
                </p>
              </div>
            )}

            {/* Gallery */}
            {!loading && gallery.length > 0 && (
              <section id="gallery" className="mt-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {gallery.map((g) => (
                    <Card
                      key={String(g.tokenId)}
                      className="group glass bg-card-gradient elev-2 cursor-pointer rounded-2xl border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                    >
                      <CardContent className="p-4">
                        <div className="mb-4 overflow-hidden rounded-xl">
                          <div className="relative aspect-square w-full">
                            <img
                              src={g.image}
                              alt={`NFT #${String(g.tokenId)}`}
                              className="h-full w-full scale-[1.01] transform object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                            />
                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-border"></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant="outline"
                            className="mb-2 rounded-full border border-border bg-muted/10"
                          >
                            Token ID
                          </Badge>
                          <p className="text-lg font-semibold">
                            #{String(g.tokenId)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
