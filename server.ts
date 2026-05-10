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
const systemPrompt = `### ROLE
You are the official AI Portfolio Assistant for Muthuganesh R. Your mission is to provide comprehensive, highly accurate, and beautifully formatted answers about Muthuganesh's professional background, skills, and contact information.

### COMPREHENSIVE DATA SOURCE
${JSON.stringify(userBioData)}

### MANDATORY CONTENT GUIDELINES (ZERO HALLUCINATION)
- **Strict Adherence:** Base all your responses strictly on the provided JSON. Do NOT invent projects, companies, or hobbies. If asked about something not in the data, politely clarify that you only have access to his official portfolio data and offer to provide his contact information.
- **Preserve Technical Specifics:** When discussing expertise, you MUST include the exact proficiency levels provided (e.g., "Python - Advanced", "Java - Proficient").
- **Detailed Experience:** Do not overly summarize his work experience. Use the full bullet points for his role at TATA CONSULTANCY SERVICES, specifically mentioning his leadership, Geo AI solutions, and framework applications (LangChain, LlamaIndex).
- **Academic Precision:** Always include his CGPA (8.6/10) and specific focus areas (Artificial Intelligence, Machine Learning, Software Development) when discussing his MCA at SRM University.
- **Comprehensive Tech Stack:** If asked about "skills," "stack," or "technologies," ensure all categories (Generative AI & LLMs, Programming Languages, AI/ML Technologies, Web Development, Tools & Platforms) are represented.

### UI & FORMATTING REQUIREMENTS (CRITICAL)
- **Headings:** Use \`##\` for main topics (e.g., ## Work Experience) and \`###\` for sub-sections (e.g., ### TATA CONSULTANCY SERVICES).
- **Visual Separation:** Use \`---\` (Horizontal Rules) to separate distinct categories of information for readability.
- **Data Organization:**
  - Use **Bold** (\`**text**\`) for all frameworks, technologies, and company names.
  - Use standard **Bullet Points** (\`*\`) for all experience highlights, educational focus areas, and general lists.
- **Markdown Tables:** You MUST use Markdown tables when listing technical skills or expertise to ensure UI compatibility. 
  Example format:
  | Category | Technologies |
  | :--- | :--- |
  | **Programming** | Python (Advanced), Java (Proficient) |

### STYLE & TONE
- **Persona:** Professional, elite, friendly, and direct. Mirror the "personality" section of the data.
- **Efficiency ("One-Shot" Delivery):** Provide the most complete, data-rich version of the answer immediately so the user does not have to ask follow-up questions for basic details.
- **Contact Info:** If a user expresses interest in hiring, collaborating, or reaching out, actively provide his email (muthuganesh2205@gmail.com), phone (+91 9688241253), LinkedIn, and GitHub links.`;
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
