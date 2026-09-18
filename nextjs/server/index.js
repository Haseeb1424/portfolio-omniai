require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

const leads = [];

app.get('/api/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

app.post('/api/contact', async (req, res) => {
  const { name, email, problem, interests = [], budget } = req.body || {};
  if (!name || !String(name).trim()) return res.status(400).json({ error: 'Name is required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''))) return res.status(400).json({ error: 'Valid email is required.' });

  const lead = { name, email, problem, interests, budget, at: new Date().toISOString() };
  leads.push(lead);
  console.log('New lead:', lead);

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Team OmniAI site" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `New audit request — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Budget: ${budget || '—'}`,
          `Interested in: ${interests.join(', ') || '—'}`,
          '',
          `Problem:\n${problem || '—'}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('Mail failed:', err.message);
      return res.status(502).json({ error: 'Could not send email.' });
    }
  }

  res.json({ ok: true });
});

// Admin peek at captured leads (protect or remove in production)
app.get('/api/leads', (req, res) => {
  if (process.env.ADMIN_KEY && req.query.key !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  res.json(leads);
});

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
