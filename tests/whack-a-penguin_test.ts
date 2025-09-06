import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.0.0/index.ts";

Clarinet.test({
  name: "Can hit mole and update score",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const player = accounts.get("wallet_1")!;

    // Hit a mole
    let block = chain.mineBlock([
      Tx.contractCall("whack-a-penguin", "hit-mole", [], player.address),
    ]);

    // Check that the transaction was successful
    block.receipts[0].result.expectOk();

    // Check that the player's score was updated
    let score = chain.callReadOnlyFn("whack-a-penguin", "get-player-score", [types.principal(player.address)], player.address);
    score.result.expectUint(10);

    // Check that the pool was updated
    let pool = chain.callReadOnlyFn("whack-a-penguin", "get-pool-amount", [], player.address);
    pool.result.expectUint(1000000); // 1 STX in microSTX
  },
});

Clarinet.test({
  name: "Can submit final score",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const player = accounts.get("wallet_1")!;

    // Submit a final score
    let block = chain.mineBlock([
      Tx.contractCall("whack-a-penguin", "submit-score", [types.uint(50)], player.address),
    ]);

    // Check that the transaction was successful
    block.receipts[0].result.expectOk();

    // Check that the player's score was updated
    let score = chain.callReadOnlyFn("whack-a-penguin", "get-player-score", [types.principal(player.address)], player.address);
    score.result.expectUint(50);
  },
});

Clarinet.test({
  name: "Can get game stats",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const player = accounts.get("wallet_1")!;

    // Hit a mole first
    chain.mineBlock([
      Tx.contractCall("whack-a-penguin", "hit-mole", [], player.address),
    ]);

    // Get game stats
    let stats = chain.callReadOnlyFn("whack-a-penguin", "get-game-stats", [], player.address);
    stats.result.expectOk();
  },
});

Clarinet.test({
  name: "Can distribute rewards (owner only)",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const player = accounts.get("wallet_1")!;

    // Hit a mole to add to pool
    chain.mineBlock([
      Tx.contractCall("whack-a-penguin", "hit-mole", [], player.address),
    ]);

    // Try to distribute rewards as non-owner (should fail)
    let block = chain.mineBlock([
      Tx.contractCall("whack-a-penguin", "distribute-rewards", [], player.address),
    ]);

    block.receipts[0].result.expectErr(100);

    // Distribute rewards as owner (should succeed)
    block = chain.mineBlock([
      Tx.contractCall("whack-a-penguin", "distribute-rewards", [], deployer.address),
    ]);

    block.receipts[0].result.expectOk();
  },
});
