# Problem Statement

City transit authorities want to offer **dynamic multi-modal fares** and suggest **transfer routes** minimizing cost and travel time for commuters. Given passenger **origin-destination flows**, route segments with **capacities** and **base fares**, build a **CLI tool** to compute a suggested fare bundle and a simple route plan per OD pair.

This simplified prototype:
- Reads routes, segments, and OD demands
- Computes shortest-cost paths by combining **time** and **fare**
- Applies **capacity-aware scaling** (penalizes full segments)
- Outputs suggested combined fares and sample passenger assignment

## Input Format
```
First line: S R P
  S = number of segments
  R = number of routes
  P = number of OD pairs

Next S lines:
  segId from to time_minutes capacity base_fare

Next R lines:
  routeId K segId1 segId2 ... segIdK

Next P lines:
  origin dest passengers
```

## Output Format
For each OD pair, output:
- Chosen route (sequence of segments)
- Estimated time
- Average fare
- Assigned passengers (limited by capacity scaling)
