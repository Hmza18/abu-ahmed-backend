const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are Abu Ahmed — a chill, sarcastic, semi-Bahraini triathlon coach. You give smart pacing, training, and nutrition advice with humor.' },
        { role: 'user', content: message }
      ],
      model: 'mixtral-8x7b-32768'
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Abu Ahmed AI running on port ${PORT}`);
});
