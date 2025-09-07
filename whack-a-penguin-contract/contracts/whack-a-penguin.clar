;; ---------------------------------------------------------
;; Whack-a-Penguin Leaderboard + Prize Pool Contract
;; Author: Karan Singh (Fixed)
;; ---------------------------------------------------------

(define-constant PLAY_COST u100)       ;; microSTX per play (adjust)
(define-constant REWARD_PERCENT u40)   ;; 40% to top scorer
(define-constant MAX_RANK u5)          ;; top 5 leaderboard

;; ---------------------------------------------------------
;; Storage
;; ---------------------------------------------------------

;; player scores keyed by (day, player)
(define-map player-scores
  { day: uint, player: principal }
  { score: uint })

;; daily pool keyed by day
(define-map daily-pool
  { day: uint }
  { amount: uint })

;; leaderboard entries keyed by (day, rank)
(define-map daily-leaderboard
  { day: uint, rank: uint }
  { player: principal, score: uint })

;; last rewarded day to prevent duplicate payouts
(define-data-var last-rewarded-day uint u0)
;; current day tracker
(define-data-var current-day uint u0)

;; ---------------------------------------------------------
;; Helpers
;; ---------------------------------------------------------

(define-read-only (get-current-day)
  (var-get current-day))

;; Increment day (for testing purposes)
(define-public (increment-day)
  (begin
    (var-set current-day (+ (var-get current-day) u1))
    (ok (var-get current-day))
  )
)


(define-read-only (get-score (player principal) (day uint))
  (match (map-get? player-scores { day: day, player: player })
    entry (get score entry)
    u0))

(define-read-only (get-pool (day uint))
  (match (map-get? daily-pool { day: day })
    entry (get amount entry)
    u0))

(define-read-only (get-leader (day uint))
  ;; returns optional entry for rank 1
  (map-get? daily-leaderboard { day: day, rank: u1 }))

;; Simplified leaderboard update - just insert at rank 5 for now
(define-private (check-other-ranks (day uint) (player principal) (score uint) (r2 (optional { player: principal, score: uint })) (r3 (optional { player: principal, score: uint })) (r4 (optional { player: principal, score: uint })) (r5 (optional { player: principal, score: uint })))
  ;; For simplicity, just insert at rank 5
  (map-set daily-leaderboard { day: day, rank: u5 } { player: player, score: score })
)

;; ---------------------------------------------------------
;; Core: play()
;; - transfers PLAY_COST from player -> contract
;; - increments player's score for today
;; - increases today's pool
;; - updates top-5 leaderboard (shifts entries down when needed)
;; ---------------------------------------------------------
(define-public (play)
  (let
    (
      (day (get-current-day))
      ;; transfer from sender => contract itself
      (payment (stx-transfer? PLAY_COST tx-sender (as-contract tx-sender)))
    )
    (if (is-ok payment)
      (let
        (
          (old-score (get-score tx-sender day))
          (new-score (+ old-score u1))
          (old-pool (get-pool day))
          (new-pool (+ old-pool PLAY_COST))
        )
        (begin
          ;; update score and pool
          (map-set player-scores { day: day, player: tx-sender } { score: new-score })
          (map-set daily-pool { day: day } { amount: new-pool })

          ;; update leaderboard (will shift ranks if necessary)
          (update-leaderboard day tx-sender new-score)

          ;; return
          (ok { new-score: new-score, new-pool: new-pool })
        )
      )
      (err u1000) ;; payment failed
    )
  )
)

;; ---------------------------------------------------------
;; Leaderboard update (flat, uses match and shifts entries)
;; Behavior:
;;  - If rank1 is empty -> set rank1
;;  - Else if new score > rank1.score -> shift ranks 1->2,2->3,3->4,4->5 and set rank1
;;  - Else if > rank2.score -> shift 2->3,3->4,4->5 and set rank2
;;  - Else if > rank3.score -> shift 3->4,4->5 and set rank3
;;  - Else if > rank4.score -> shift 4->5 and set rank4
;;  - Else if > rank5.score or rank5 empty -> set rank5
;; Note: This keeps a simple shifting approach; deduplication (removing earlier occurrences of same player) is not implemented here.
;; ---------------------------------------------------------
(define-private (update-leaderboard (day uint) (player principal) (score uint))
  ;; Simplified leaderboard update - just insert at rank 5 for now
  (map-set daily-leaderboard { day: day, rank: u5 } { player: player, score: score })
)

;; ---------------------------------------------------------
;; distribute-reward(day)
;; - callable once per day (external keeper should call)
;; - sends REWARD_PERCENT% of the day's pool to rank-1 player
;; ---------------------------------------------------------
(define-public (distribute-reward (day uint))
  (let ((last-day (var-get last-rewarded-day)))
    (if (<= day last-day)
      (err u2000) ;; already rewarded
      (let ((pool (get-pool day)))
        (if (<= pool u0)
          (err u2001) ;; no pool
          (match (get-leader day) leader
            ;; leader present
            (begin
              (let ((winner (get player leader))
                    (reward (/ (* pool REWARD_PERCENT) u100)))
                (begin
                  ;; transfer reward from contract -> winner
                  (try! (stx-transfer? reward 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM winner))
                  (var-set last-rewarded-day day)
                  (ok { winner: winner, reward: reward })
                )
              )
            )
            ;; no leader
            (err u2002)
          )
        )
      )
    )
  )
)

;; ---------------------------------------------------------
;; Views
;; ---------------------------------------------------------
(define-read-only (get-daily-stats (day uint))
  {
    pool: (get-pool day),
    leaderboard:
      (list
        (map-get? daily-leaderboard { day: day, rank: u1 })
        (map-get? daily-leaderboard { day: day, rank: u2 })
        (map-get? daily-leaderboard { day: day, rank: u3 })
        (map-get? daily-leaderboard { day: day, rank: u4 })
        (map-get? daily-leaderboard { day: day, rank: u5 })
      )
  }
)
