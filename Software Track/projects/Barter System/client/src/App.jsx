import { useEffect, useState } from 'react';

export default function App(){
  const [skills,setSkills] = useState([]);
  const [form,setForm] = useState({user:'',skill:'',type:'offer'});
  const [matches,setMatches] = useState([]);

  const load = async()=>{
    const s = await fetch('http://localhost:4000/skills').then(r=>r.json());
    setSkills(s);
    const m = await fetch('http://localhost:4000/matches').then(r=>r.json());
    setMatches(m);
  };

  useEffect(()=>{ load(); },[]);

  const submit = async(e)=>{
    e.preventDefault();
    await fetch('http://localhost:4000/skills',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    });
    setForm({user:'',skill:'',type:'offer'});
    load();
  };

  return (
    <div style={{padding:'1rem',fontFamily:'sans-serif'}}>
      <h1>Skill Barter</h1>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.user} onChange={e=>setForm({...form,user:e.target.value})}/>
        <input placeholder="Skill" value={form.skill} onChange={e=>setForm({...form,skill:e.target.value})}/>
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option value="offer">Offer</option>
          <option value="request">Request</option>
        </select>
        <button>Add</button>
      </form>

      <h2>All Entries</h2>
      <ul>
        {skills.map(s=><li key={s.id}>{s.user} - {s.skill} ({s.type})</li>)}
      </ul>

      <h2>Matches</h2>
      <ul>
        {matches.map((m,i)=>
          <li key={i}>{m.request.user} wants {m.request.skill} ↔ {m.offer.user} offers it</li>
        )}
      </ul>
    </div>
  );
}
