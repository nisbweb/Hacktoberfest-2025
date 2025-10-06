#include <bits/stdc++.h>
using namespace std;

struct Resource { string name; int total; };
struct Zone { string name; int pop; int severity; int travel; };

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int R,N; if(!(cin>>R>>N)) return 0;
    vector<Resource> resources(R);
    unordered_map<string,int> resIndex;
    for(int i=0;i<R;i++){ cin>>resources[i].name>>resources[i].total; resIndex[resources[i].name]=i; }

    vector<Zone> zones(N);
    unordered_map<string,int> zoneIndex;
    for(int i=0;i<N;i++){ cin>>zones[i].name>>zones[i].pop>>zones[i].severity>>zones[i].travel; zoneIndex[zones[i].name]=i; }

    int M; cin>>M;
    // demanded[zone][res]
    vector<vector<int>> demand(N, vector<int>(R,0));
    for(int i=0;i<M;i++){ string zn,rn; int q; cin>>zn>>rn>>q; demand[zoneIndex[zn]][resIndex[rn]] += q; }

    // Score each zone by (severity * log(pop)) / travel_penalty to prioritize urgent reachable zones
    vector<pair<double,int>> priority; // score, zoneIndex
    for(int i=0;i<N;i++){
        double score = zones[i].severity * log(1.0 + zones[i].pop) / max(1, zones[i].travel);
        priority.push_back({-score,i}); // negative for ascending sort
    }
    sort(priority.begin(), priority.end());

    vector<vector<int>> alloc(N, vector<int>(R,0));

    // Greedy allocate resources to high priority zones first, try to satisfy requests proportionally
    for(auto &p: priority){
        int zi = p.second;
        for(int ri=0; ri<R; ri++){
            int req = demand[zi][ri];
            if(req<=0) continue;
            int give = min(req, resources[ri].total);
            // small heuristic: for very severe zones, try to overserve by 10% if available
            if(zones[zi].severity>=8){ int bonus = min(resources[ri].total - give, (int)ceil(give*0.1)); give += bonus; }
            alloc[zi][ri] = give;
            resources[ri].total -= give;
        }
    }

    // Output allocation
    cout<<"Allocation Report:\n";
    cout<<left<<setw(12)<<"Zone"<<setw(12)<<"Resource"<<setw(12)<<"Allocated"<<"\n";
    for(int zi=0;zi<N;zi++){
        for(int ri=0;ri<R;ri++){
            if(alloc[zi][ri]>0){
                cout<<left<<setw(12)<<zones[zi].name<<setw(12)<<resources[ri].name<<setw(12)<<alloc[zi][ri]<<"\n";
            }
        }
    }

    // Summary: unmet demands and leftover inventory
    cout<<"\nUnmet Demands:\n";
    for(int zi=0;zi<N;zi++){
        for(int ri=0;ri<R;ri++){
            int unmet = demand[zi][ri] - alloc[zi][ri];
            if(unmet>0) cout<<zones[zi].name<<" needs "<<unmet<<" more of "<<resources[ri].name<<"\n";
        }
    }
    cout<<"\nLeftover Inventory:\n";
    for(int ri=0;ri<R;ri++) cout<<resources[ri].name<<": "<<resources[ri].total<<"\n";

    cout<<"\nSuggested improvements:\n";
    cout<<"- Replace greedy heuristic with integer programming/MILP to optimize fairness & coverage.\n";
    cout<<"- Add travel time & vehicle capacity constraints and batch routing (Vehicle Routing Problem).\n";
    cout<<"- Integrate real map distances, dynamic re-supply, and uncertainty in demand.\n";

    return 0;
}
