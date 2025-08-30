import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

export async function airdropSol(address: string) {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const airdropSignature = await connection.requestAirdrop(
      new PublicKey(address),
      LAMPORTS_PER_SOL * 2
    );
    await connection.confirmTransaction(airdropSignature);
    return airdropSignature;
  } catch (error) {
    console.error(error);
    return "failed";
  }
}
