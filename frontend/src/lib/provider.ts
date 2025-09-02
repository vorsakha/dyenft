type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
};

const provider = (window as unknown as { ethereum?: EthereumProvider })
  .ethereum;

export { provider };
export type { EthereumProvider };
