require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/journal', async (req, res) => {
  const { userInput, vibe } = req.body;

  if (!userInput || !vibe) {
    return res.status(400).json({ error: 'userInput and vibe are required.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured.' });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a reflective AI journal companion. The user's current vibe is: "${vibe}". Respond thoughtfully and empathetically to their journal entry.`,
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    return res.status(response.status).json({ error: err.error?.message || 'OpenAI request failed.' });
  }

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;
  res.json({ response: aiMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
