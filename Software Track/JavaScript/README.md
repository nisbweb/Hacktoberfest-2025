# Problem Statement

Smart homes want to schedule **flexible loads** (washing machine, EV charging, battery charging) to minimize **energy cost** while respecting **user comfort windows** and **grid constraints** (peak demand limits). This CLI app reads device jobs with earliest/latest start and duration, electricity price timeline, and produces a feasible schedule that minimizes cost using a **greedy shifting heuristic**.

## Input Format (JSON via stdin)
```json
{
  "prices": [0.12, 0.15, ...], // hourly price for next 24 hours
  "peak_limit": 5.0,            // kW
  "jobs": [
    {"id":"EV","power":3.5,"dur":4,"earliest":0,"latest":23},
    ...
  ]
}
```

## Output Format
For each job, output:
- `start_hour`
- `end_hour`
- `estimated_cost`

### Sample Output
```
Job ID   Start Hour   End Hour   Estimated Cost
EV       1            5          1.82
Washing  8            10         0.45
Battery  20           22         0.60
```
