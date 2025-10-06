import sys
from collections import defaultdict, deque
from datetime import datetime, timedelta
import math

# simple in-memory user profile store
profiles = defaultdict(lambda: {
    'count':0, 'sum':0.0, 'recent':deque(), # recent holds (timestamp, amount)
})

WINDOW = timedelta(hours=24)

def score_tx(tx_id, user, ts, amt, cat):
    p = profiles[user]
    # update rolling window
    now = ts
    p['recent'].append((now,amt))
    while p['recent'] and (now - p['recent'][0][0]) > WINDOW:
        p['recent'].popleft()
    counts_24h = len(p['recent'])
    sum_24h = sum(a for (_,a) in p['recent'])
    avg = (p['sum']/p['count']) if p['count']>0 else (sum_24h/counts_24h if counts_24h>0 else amt)

    # rule features
    z_amt = (amt - avg) / (math.sqrt(sum((a-avg)**2 for (_,a) in p['recent'])/max(1,counts_24h)) + 1.0)
    rush_hour = 1 if ts.hour>=0 and ts.hour<=5 else 0
    freq_score = min(1.0, counts_24h/50.0)

    # crude anomaly score between 0-1
    score = 0.0
    # large deviation from avg
    if z_amt > 3: score += 0.5
    # very high amount absolute threshold
    if amt > 2000: score += 0.3
    # suspicious time
    if rush_hour: score += 0.1
    # sudden spike in frequency
    if freq_score>0.7: score += 0.2

    score = min(1.0, score)

    # update long-term counters (after scoring)
    p['count'] += 1
    p['sum'] += amt

    reasons = []
    if z_amt>3: reasons.append(f"amount {amt:.2f} >> user avg {avg:.2f}")
    if amt>2000: reasons.append("amount exceeds absolute threshold")
    if rush_hour: reasons.append("unusual hour")
    if freq_score>0.7: reasons.append("high recent frequency")

    return score, reasons

if __name__=='__main__':
    print("tx_id,user,score,reasons")
    for line in sys.stdin:
        line=line.strip()
        if not line: continue
        parts=line.split()
        if len(parts)<5: continue
        tx_id, user, ts_s, amt_s, cat = parts[0], parts[1], parts[2], parts[3], parts[4]
        ts = datetime.fromisoformat(ts_s)
        amt = float(amt_s)
        score, reasons = score_tx(tx_id,user,ts,amt,cat)
        print(f"{tx_id},{user},{score:.2f},\"{' | '.join(reasons)}\"")

    # What to improve (printed at end of run):
    print("\nImprovements:\n- Replace rule-based scoring with supervised models (XGBoost/NN) and online learning.\n- Add feature store, entity resolution, graph-based link analysis, and feedback loop for labeling.\n- Scale with streaming (Kafka), persistent state, and low-latency datastore (Redis).\n- Add unit tests, explainability, and adversarial testing.\n")
