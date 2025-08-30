import { useState } from "react";
import { airdropSol } from "./lib/airdrop";

function App() {
  const [address, setAddress] = useState("");
  const [airdropSuccess, setAirdropSuccess] = useState(false);
  const [airdropFailed, setAirdropFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const sig = await airdropSol(address);
    if (sig !== "failed") {
      setAirdropSuccess(true);
    } else {
      setAirdropFailed(true);
    }
    console.log(sig);
    setIsLoading(false);
  };
  return (
    <>
      <div className="w-screen h-screen py-10 px-14 bg-gray-900 text-neutral-100">
        <nav className="text-4xl mb-10 font-extrabold">
          Solana <i>Airdrop</i>
        </nav>
        <main className="container mx-auto flex flex-col items-center p-10">
          <div className="px-8 py-5 border border-gray-700 rounded-xl bg-gradient-to-tr from-gray-950 via-gray-800/50 to-gray-950">
            <div className="flex justify-between mb-8">
              <h1 className="text-2xl font-bold inline">Request Airdrop</h1>
              <span className="w-fit px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700 font-bold text-gray-300 cursor-not-allowed">
                Devnet
              </span>
            </div>
            <input
              className="w-full mr-3 px-4 py-2 focus:ring-0 focus:outline-0 bg-gray-900 border border-gray-700 rounded-lg block"
              type="text"
              placeholder="wallet address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              disabled={isLoading}
              onClick={handleClick}
              className={`w-full my-3 px-5 py-1 ${
                isLoading ? "bg-gray-300" : "bg-gray-200"
              } text-gray-900 rounded-lg font-bold hover:bg-gray-100 cursor-pointer transition-all duration-150 active:bg-gray-300 active:scale-[0.98]`}
            >
              {isLoading ? "requesting..." : "confirm airdrop"}
            </button>
            <p className="text-gray-400 px-1 mt-3">
              2 SOL will credited to the above address on the Devnet.
            </p>
          </div>
          {(airdropSuccess || airdropFailed) && (
            <div
              className={
                airdropSuccess
                  ? `mt-10 px-4 py-1 rounded-lg border border-green-400 bg-green-600 text-xl font-bold text-green-200`
                  : `mt-10 px-4 py-1 rounded-lg border border-red-400 bg-red-600 text-xl font-bold text-red-200`
              }
            >
              {airdropSuccess ? "Airdrop Successfull" : "Airdrop Failed"}
            </div>
          )}
          {airdropFailed && (
            <div className="text-red-500 mt-3">
              You probably exceded the <b>rate limit</b>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
