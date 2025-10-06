# Problem Statement

During natural disasters, aid agencies must allocate limited resources (food, water, medical kits) across affected zones. Each zone has a **severity score** and a **population**; travel time between hubs and zones influences delivery schedules. Design a **CLI app** that accepts resources inventory, zone demands, and travel penalties and produces a **prioritized allocation plan** and simple route batches.

This is a simplified, single-run simulator focusing on **greedy optimization + heuristics** (not full MILP).

## Input Format
```
First line: R N
  R = number of resource types
  N = number of zones

Next R lines:
  resource_name total_quantity

Next N lines:
  zone_name population severity_score (1-10) travel_penalty (hours)

Next line:
  M (number of resource demands)

Next M lines:
  zone_name resource_name requested_quantity
```

### Sample Input
```
3 3
Food 1000
Water 800
MedKit 200
ZoneA 5000 8 4
ZoneB 2000 6 2
ZoneC 700 9 6
6
ZoneA Food 600
ZoneA Water 400
ZoneB Food 300
ZoneB MedKit 50
ZoneC Food 500
ZoneC MedKit 120
```

## Output Format
For each zone and resource, output:
- Allocated quantity
- Summary of unmet demand
- Suggestions for allocation adjustments

### Sample Output
```
Zone    Resource    Requested    Allocated
ZoneA   Food        600          600
ZoneA   Water       400          400
ZoneB   Food        300          300
ZoneB   MedKit      50           50
ZoneC   Food        500          100
ZoneC   MedKit      120          50

Unmet Demand:
ZoneC Food: 400
ZoneC MedKit: 70

Suggestions:
Prioritize ZoneC deliveries based on severity and travel time.
```
