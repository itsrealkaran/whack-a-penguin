;; Whack-a-Penguin Smart Contract
;; A blockchain-based whack-a-mole game with daily leaderboards and rewards

;; Constants
(define-constant HIT_COST u1000000) ;; 1 STX per hit (in microSTX)
(define-constant REWARD_PERCENTAGE u40) ;; 40% of pool goes to top scorer
(define-constant CONTRACT_OWNER tx-sender)

;; Data Variables
(define-data-var daily-pool uint 0)
(define-data-var last-reset-day uint 0)
(define-data-var total-hits uint 0)

;; Maps for tracking player data
(define-map daily-scores { player: principal } { score: uint })
(define-map player-total-hits { player: principal } { hits: uint })
(define-map daily-hits { player: principal } { hits: uint })

;; Events
(define-data-event mole-hit (player principal) (score uint) (hits uint))
(define-data-event reward-distributed (winner principal) (amount uint))
(define-data-event daily-reset (day uint) (pool-amount uint))

;; Helper function to get current day (simplified - in production, use block height or timestamp)
(define-private (get-current-day)
  (get-block-info? time u0)
)

;; Helper function to check if it's a new day
(define-private (is-new-day)
  (let ((current-day (get-current-day)))
    (> current-day (var-get last-reset-day))
  )
)

;; Reset daily data
(define-private (reset-daily-data)
  (begin
    (var-set daily-pool u0)
    (var-set last-reset-day (get-current-day))
    (ok true)
  )
)

;; Update player score
(define-private (update-player-score (player principal) (additional-score uint))
  (let ((current-score (default-to u0 (map-get? daily-scores { player: player }))))
    (map-set daily-scores { player: player } { score: (+ current-score additional-score) })
    (ok true)
  )
)

;; Update player hit count
(define-private (update-player-hits (player principal))
  (let ((current-hits (default-to u0 (map-get? daily-hits { player: player }))))
    (map-set daily-hits { player: player } { hits: (+ current-hits u1) })
    (map-set player-total-hits { player: player } { hits: (+ (default-to u0 (map-get? player-total-hits { player: player })) u1) })
    (ok true)
  )
)

;; Main function: Hit a mole
(define-public (hit-mole)
  (begin
    ;; Check if it's a new day and reset if needed
    (if (is-new-day)
      (reset-daily-data)
      (ok true)
    )
    
    ;; Transfer STX from player to contract
    (try! (stx-transfer? HIT_COST tx-sender CONTRACT_OWNER))
    
    ;; Update pool
    (var-set daily-pool (+ (var-get daily-pool) HIT_COST))
    
    ;; Update player data
    (try! (update-player-score tx-sender u10)) ;; 10 points per hit
    (try! (update-player-hits tx-sender))
    
    ;; Update total hits counter
    (var-set total-hits (+ (var-get total-hits) u1))
    
    ;; Emit event
    (ok (print (mole-hit tx-sender u10 (default-to u0 (map-get? daily-hits { player: tx-sender })))))
  )
)

;; Submit final score (for end of game)
(define-public (submit-score (final-score uint))
  (begin
    ;; Check if it's a new day and reset if needed
    (if (is-new-day)
      (reset-daily-data)
      (ok true)
    )
    
    ;; Update player's daily score
    (try! (update-player-score tx-sender final-score))
    
    (ok (print (mole-hit tx-sender final-score (default-to u0 (map-get? daily-hits { player: tx-sender })))))
  )
)

;; Get daily leaderboard
(define-read-only (get-daily-leaderboard)
  (ok (map-get? daily-scores { player: tx-sender }))
)

;; Get all daily scores (for leaderboard display)
(define-read-only (get-all-daily-scores)
  (ok daily-scores)
)

;; Get current pool amount
(define-read-only (get-pool-amount)
  (ok (var-get daily-pool))
)

;; Get player's daily score
(define-read-only (get-player-score (player principal))
  (ok (default-to u0 (map-get? daily-scores { player: player })))
)

;; Get player's daily hits
(define-read-only (get-player-hits (player principal))
  (ok (default-to u0 (map-get? daily-hits { player: player })))
)

;; Get top player for the day
(define-read-only (get-top-player)
  (ok tx-sender) ;; Simplified - in production, implement proper sorting
)

;; Distribute daily rewards
(define-public (distribute-rewards)
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) (err u100)) ;; Only contract owner can distribute
    
    (let (
      (pool-amount (var-get daily-pool))
      (reward-amount (/ (* pool-amount REWARD_PERCENTAGE) u100))
      (top-player (get-top-player))
    )
      (if (> pool-amount u0)
        (begin
          ;; Transfer reward to top player
          (try! (stx-transfer? reward-amount CONTRACT_OWNER top-player))
          
          ;; Update pool
          (var-set daily-pool (- pool-amount reward-amount))
          
          ;; Emit event
          (ok (print (reward-distributed top-player reward-amount)))
        )
        (ok false)
      )
    )
  )
)

;; Reset daily cycle (for testing or manual reset)
(define-public (reset-daily-cycle)
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) (err u101)) ;; Only contract owner can reset
    
    (let ((current-pool (var-get daily-pool)))
      (try! (reset-daily-data))
      (ok (print (daily-reset (get-current-day) current-pool)))
    )
  )
)

;; Get game statistics
(define-read-only (get-game-stats)
  (ok {
    daily-pool: (var-get daily-pool),
    total-hits: (var-get total-hits),
    last-reset-day: (var-get last-reset-day),
    current-day: (get-current-day)
  })
)
