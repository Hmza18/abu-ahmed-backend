const express = require('express');
const cors = require('cors');
const { OpenAIApi, Configuration } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "You are Abu Ahmed — a chill, sarcastic, semi-Bahraini triathlon coach. You give smart pacing, training, and nutrition advice with humor.",
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Abu Ahmed AI running on port ${PORT}`));
