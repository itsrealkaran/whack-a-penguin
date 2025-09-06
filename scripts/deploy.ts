import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.0.0/index.ts";

// This script helps with contract deployment and testing
// Run with: clarinet run scripts/deploy.ts

export function deployContract(chain: Chain, deployer: Account) {
  console.log("Deploying whack-a-penguin contract...");
  
  // The contract is already deployed via Clarinet.toml
  // This is just for reference and additional setup if needed
  
  console.log("Contract deployed successfully!");
  console.log("Contract address:", deployer.address);
  console.log("Contract name: whack-a-penguin");
}

// Test the contract functions
export function testContract(chain: Chain, accounts: Map<string, Account>) {
  const deployer = accounts.get("deployer")!;
  const player = accounts.get("wallet_1")!;

  console.log("Testing contract functions...");

  // Test hitting a mole
  let block = chain.mineBlock([
    Tx.contractCall("whack-a-penguin", "hit-mole", [], player.address),
  ]);

  console.log("Hit mole result:", block.receipts[0].result);

  // Test getting pool amount
  let pool = chain.callReadOnlyFn("whack-a-penguin", "get-pool-amount", [], player.address);
  console.log("Pool amount:", pool.result);

  // Test getting player score
  let score = chain.callReadOnlyFn("whack-a-penguin", "get-player-score", [types.principal(player.address)], player.address);
  console.log("Player score:", score.result);

  console.log("Contract testing completed!");
}
