import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Initialize OpenAI client with NVIDIA configuration
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Cache for bio data
let cachedBioData: any = null;

// Fetch agent bio data
async function getAgentBioData() {
  if (cachedBioData) {
    return cachedBioData;
  }

  try {
    // Try to fetch from public folder or environment
    const bioJson = process.env.AGENT_BIO_DATA;
    if (bioJson) {
      cachedBioData = JSON.parse(bioJson);
      return cachedBioData;
    }
    return {};
  } catch (error) {
    console.warn('Could not load bio data:', error);
    return {};
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only handle POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Get bio data
    const userBioData = await getAgentBioData();

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
    } as any);

    // Extract the response content
    const responseContent = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    res.status(200).json({
      content: responseContent,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
