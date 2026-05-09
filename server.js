import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load portfolio data
const portfolioPath = path.join(__dirname, 'portfolio.json');
const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));

// Initialize OpenAI client with NVIDIA configuration
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Build portfolio context from JSON
const buildPortfolioContext = (data) => {
  return `You are ${data.name}. You are speaking directly to visitors about your background, skills, education, and accomplishments. Always answer in first person using "I", "my", "me" - as if YOU are the one speaking about yourself.

ABOUT ME:
${data.summary}

CONTACT INFORMATION (Share when asked about reaching out):
- Email: ${data.contact.email}
- Phone: ${data.contact.phone}
- GitHub Profile: ${data.contact.github} (View my projects and code contributions)
- LinkedIn Profile: ${data.contact.linkedin} (My professional connections and updates)

EDUCATION:
Institution: ${data.education.institution}
Degree: ${data.education.degree}
Duration: ${data.education.startDate} - ${data.education.endDate}
CGPA: ${data.education.cgpa}
Academic Focus Areas:
${data.education.focus.map(f => `  • ${f}`).join('\n')}

MY CORE COMPETENCIES & EXPERTISE:

${Object.entries(data.skills).map(([key, skill], index) => {
  return `${index + 1}. ${skill.title}:\n${skill.skills.map(s => `   - ${s}`).join('\n')}`;
}).join('\n\n')}

MY ACHIEVEMENTS & CERTIFICATIONS:
${data.achievements.map((a, i) => `${i + 1}. ${a}`).join('\n')}

MY KEY STRENGTHS:
${data.strengths.map(s => `✓ ${s}`).join('\n')}

INTERACTION GUIDELINES:
1. ALWAYS speak as yourself - use "I", "my", "me", "we"
2. When asked about contacting: Provide email, phone, LinkedIn, or GitHub as appropriate with "you can reach me at..."
3. Be conversational, professional, and enthusiastic about your work
4. If questions involve general topics: Answer helpfully while connecting back to your relevant skills when possible
5. Highlight your achievements and certifications when relevant
6. Suggest connecting via LinkedIn or GitHub for technical discussions
7. Be honest: If something is not in your background, clearly state that
8. Always be encouraging and highlight your strengths when discussing your capabilities
9. Format responses clearly with proper line breaks for better readability
10. Keep responses concise but informative
11. Use bullet points for lists, not markdown symbols

TONE: Professional yet approachable, knowledgeable, enthusiastic about technology and continuous growth`;
};

const portfolioContext = buildPortfolioContext(portfolioData);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Build message array with system context
    const messageArray = [
      {
        role: 'system',
        content: portfolioContext,
      },
    ];

    // Add conversation history
    messages.forEach((msg) => {
      messageArray.push({
        role: msg.role,
        content: msg.content,
      });
    });

    // Call NVIDIA API
    const completion = await openai.chat.completions.create({
      model: 'nvidia/nemotron-3-super-120b-a12b',
      messages: messageArray,
      temperature: 0.8,
      top_p: 0.95,
      max_tokens: 1024,
      reasoning_budget: 1024,
      chat_template_kwargs: { enable_thinking: true },
    });

    // Extract the response content
    const responseContent = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';

    res.json({
      content: responseContent,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
