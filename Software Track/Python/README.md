# Problem Statement

Banks want to **flag potentially fraudulent transactions in real-time**. This simplified app loads a small transaction stream from stdin, computes basic **user-level features** (average transaction amount, transaction frequency, time-of-day patterns), and applies a **lightweight rule-based + statistical anomaly detector** to rank suspicious transactions.

## Input Format
Each line represents a transaction:  
```
tx_id user_id timestamp(ISO8601) amount merchant_category
```

### Sample Input
```
1 user1 2025-09-01T10:02:00 120.50 electronics
2 user1 2025-09-01T10:03:00 5000.00 jewelry
```

## Output Format
For each transaction, output:
- `score` (0-1, indicating likelihood of fraud)  
- `reason` summary for top suspects

### Sample Output
```
tx_id  user_id  score  reason
2      user1    0.95   unusually high amount compared to user average
```
