import java.util.*;

public class TransitOptimizer {
    static class Segment{
        String id, from, to; int time, cap; double fare; Segment(String i,String f,String t,int ti,int c,double fa){id=i;from=f;to=t;time=ti;cap=c;fare=fa;}
    }

    static class Route{ String id; List<String> segs; Route(String i, List<String> s){id=i;segs=s;} }

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int S = sc.nextInt(), R = sc.nextInt(), P = sc.nextInt();
        Map<String,Segment> segMap = new HashMap<>();
        for(int i=0;i<S;i++){ String sid=sc.next(); String from=sc.next(); String to=sc.next(); int t=sc.nextInt(); int c=sc.nextInt(); double f=sc.nextDouble(); segMap.put(sid,new Segment(sid,from,to,t,c,f)); }
        Map<String,Route> routes = new HashMap<>();
        for(int i=0;i<R;i++){ String rid = sc.next(); int k=sc.nextInt(); List<String> list=new ArrayList<>(); for(int j=0;j<k;j++) list.add(sc.next()); routes.put(rid,new Route(rid,list)); }
        List<String[]> ods = new ArrayList<>(); List<Integer> pax = new ArrayList<>();
        for(int i=0;i<P;i++){ String o=sc.next(); String d=sc.next(); int p=sc.nextInt(); ods.add(new String[]{o,d}); pax.add(p); }

        // For each OD, evaluate candidate routes (routes that begin at origin's node and end at destination's node)
        for(int i=0;i<P;i++){
            String origin = ods.get(i)[0]; String dest = ods.get(i)[1]; int passengers = pax.get(i);
            double bestScore = Double.MAX_VALUE; String bestRouteId = null; int totalTime=0; double totalFare=0;
            for(Route r: routes.values()){
                // check if route covers origin->...->dest contiguous
                List<String> segs = r.segs; boolean seenOrigin=false; boolean valid=false;
                int tSum=0; double fSum=0; double capacityPenalty=0;
                for(String sid: segs){ Segment s = segMap.get(sid); if(s.from.equals(origin)) seenOrigin = true; if(seenOrigin){ tSum += s.time; fSum += s.fare; capacityPenalty += (double)s.cap; if(s.to.equals(dest)){ valid=true; break; } } }
                if(!valid) continue;
                // score: time + fare*2 + penalty if capacity small (we invert cap to penalize low cap)
                double score = tSum + fSum*2 + (double)segs.size()*100.0/Math.max(1.0, capacityPenalty);
                if(score < bestScore){ bestScore = score; bestRouteId = r.id; totalTime = tSum; totalFare = (double)Math.round((fSum)*100.0)/100.0; }
            }
            if(bestRouteId==null){ System.out.println("OD "+origin+"->"+dest+": no feasible route"); continue; }
            // simple passenger assignment limited by average segment capacity along route
            double avgCap = 0; int segCount=0; for(String sid: routes.get(bestRouteId).segs){ Segment s=segMap.get(sid); if(s.from.equals(origin) || segCount>0){ avgCap += s.cap; segCount++; if(s.to.equals(dest)) break; } }
            if(segCount>0) avgCap /= segCount;
            int assigned = (int)Math.min(passengers, Math.max(0, (int)Math.floor(avgCap*0.9)) ); // leave safety margin
            System.out.println("OD " + origin + "->" + dest + ": Route=" + bestRouteId + " Time=" + totalTime + "min Fare=" + totalFare + " Assigned=" + assigned + "/" + passengers);
        }

        System.out.println("\nWhat this does and improvements:\n- Evaluates existing routes for OD pairs using a heuristic combining time, fare, and capacity.\n- Improvements: formulate as multi-commodity flow / min-cost flow with capacity constraints, dynamic pricing, real passenger boarding models, transfer penalties, real-time traffic integration, and UI/visualization.\n- Add tests, persistence (DB), and API layer for web front-end.\n");
    }
}

