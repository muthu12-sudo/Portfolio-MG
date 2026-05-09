import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client with NVIDIA configuration
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Load user bio data
let userBioData: any = {};
try {
  // Try to load agent-bio.json first, fallback to user-bio.json
  let bioPath = path.join(process.cwd(), 'agent-bio.json');
  let bioContent = '';
  
  try {
    bioContent = fs.readFileSync(bioPath, 'utf-8');
    console.log('Loaded agent-bio.json');
  } catch {
    bioPath = path.join(process.cwd(), 'user-bio.json');
    bioContent = fs.readFileSync(bioPath, 'utf-8');
    console.log('Loaded user-bio.json');
  }
  
  userBioData = JSON.parse(bioContent);
} catch (error) {
  console.warn('Could not load bio files, proceeding without it');
}

// System prompt with user details
const systemPrompt = `You are an AI assistant for Muthuganesh R's portfolio website. You have access to detailed information about the user and should use it to answer questions accurately.

USER INFORMATION:
${JSON.stringify(userBioData, null, 2)}

Guidelines:
- Provide accurate information about Muthuganesh's education, skills, and experience
- Be friendly, professional, and conversational
- If asked about something not in your knowledge, offer to help find more information
- Format responses clearly with line breaks for better readability
- Use bullet points or numbered lists when appropriate
- Be concise but informative
- Feel free to engage in casual conversation while maintaining professionalism`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Prepare messages for the API with system prompt
    const formattedMessages = [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call NVIDIA API
    const completion = await openai.chat.completions.create({
      model: 'nvidia/nemotron-3-super-120b-a12b',
      messages: formattedMessages as any,
      temperature: 1,
      top_p: 0.95,
      max_tokens: 1024,
      reasoning_budget: 1024,
      chat_template_kwargs: { enable_thinking: true },
    });

    // Extract the response content
    const responseContent = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

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
  console.log(`Server running on http://localhost:${PORT}`);
});
