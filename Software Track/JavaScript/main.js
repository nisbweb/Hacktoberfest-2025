const fs = require('fs');

function loadInput(){
  const raw = fs.readFileSync(0,'utf8');
  return JSON.parse(raw);
}

function schedule(input){
  const hours = input.prices.length;
  const load = Array(hours).fill(0.0);
  const schedule = [];

  // Sort jobs by flexibility (latest-earliest - dur) ascending (less flexible first)
  input.jobs.sort((a,b)=> ( (a.latest - a.earliest - a.dur) - (b.latest - b.earliest - b.dur) ));

  for(const job of input.jobs){
    let bestStart = null; let bestCost = Infinity;
    for(let s=job.earliest; s+job.dur-1<=job.latest; s++){
      let feasible=true; let cost=0;
      for(let h=0; h<job.dur; h++){
        const hour = s+h;
        if(load[hour] + job.power > input.peak_limit + 1e-9) { feasible=false; break; }
        cost += job.power * input.prices[hour];
      }
      if(feasible && cost < bestCost){ bestCost = cost; bestStart = s; }
    }
    if(bestStart===null){
      // best-effort: assign to earliest possible, allow soft-violation (record penalty)
      bestStart = job.earliest; bestCost = 0; for(let h=0; h<job.dur; h++){ bestCost += job.power * input.prices[bestStart+h]; load[bestStart+h] += job.power; }
      schedule.push({id:job.id, start:bestStart, end:bestStart+job.dur, cost:bestCost, note:"soft-violated peak"});
    } else {
      for(let h=0; h<job.dur; h++){ load[bestStart+h] += job.power; }
      schedule.push({id:job.id, start:bestStart, end:bestStart+job.dur, cost:bestCost});
    }
  }

  return {schedule, load};
}

function main(){
  const input = loadInput();
  const out = schedule(input);
  console.log(JSON.stringify(out, null, 2));
  console.log('\nWhat this does and what can be improved:');
  console.log('- Uses a greedy heuristic that optimizes each job independently by cost while respecting peak limit.');
  console.log('- Improvements: formulate as integer programming (min-cost scheduling), incorporate batteries & dynamic tariffs, user preferences, stochastic prices, device preemption, and real-time re-scheduling. Add web UI and tests.');
}

main();


