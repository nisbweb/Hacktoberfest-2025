import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let skills = []; // {id, user, skill, type: 'offer'|'request'}

app.get('/skills', (req, res) => {
  res.json(skills);
});

app.post('/skills', (req, res) => {
  const { user, skill, type } = req.body;
  if (!user || !skill || !['offer','request'].includes(type)) {
    return res.status(400).json({error:'Invalid payload'});
  }
  const entry = { id: Date.now(), user, skill, type };
  skills.push(entry);
  res.json(entry);
});

app.get('/matches', (req, res) => {
  const offers = skills.filter(s=>s.type==='offer');
  const requests = skills.filter(s=>s.type==='request');
  const matches = [];
  for (const r of requests) {
    const match = offers.find(o => o.skill.toLowerCase()===r.skill.toLowerCase());
    if (match) matches.push({request:r, offer:match});
  }
  res.json(matches);
});

app.listen(4000, ()=> console.log('Node server running on http://localhost:4000'));
