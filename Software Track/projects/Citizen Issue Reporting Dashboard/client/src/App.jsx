import { useState, useEffect } from 'react';

export default function App(){
  const [reports,setReports] = useState([]);
  const [form,setForm] = useState({id:Date.now(),title:'',category:'',description:'',status:'open'});

  const load = async()=>{ setReports(await fetch('http://localhost:8000/reports').then(r=>r.json())); };
  useEffect(()=>{ load(); },[]);

  const submit = async(e)=>{
    e.preventDefault();
    await fetch('http://localhost:8000/reports',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    });
    setForm({id:Date.now(),title:'',category:'',description:'',status:'open'});
    load();
  };

  const updateStatus = async(id,newStatus)=>{
    await fetch(`http://localhost:8000/reports/${id}?status=${newStatus}`,{method:'PUT'});
    load();
  };

  return (
    <div style={{padding:'1rem',fontFamily:'sans-serif'}}>
      <h1>Citizen Issue Reporter</h1>
      <form onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <button>Report</button>
      </form>

      <h2>All Reports</h2>
      <ul>
        {reports.map(r=>
          <li key={r.id}>
            <b>{r.title}</b> ({r.category}) - {r.status}
            {r.status==='open' && <button onClick={()=>updateStatus(r.id,'resolved')}>Mark Resolved</button>}
          </li>
        )}
      </ul>
    </div>
  );
}
