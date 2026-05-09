# AI Chatbot Setup Guide

## Overview
Your portfolio now includes a wonderful voice and text-enabled AI chatbot powered by NVIDIA's Nemotron-3 Super 120B model. The chatbot can answer any kind of question without restrictions.

## Features
- 💬 **Text Chat**: Type messages and get intelligent responses
- 🎤 **Voice Input**: Speak your questions using the microphone button
- 🔊 **Voice Output**: AI responses are automatically read aloud
- 🎨 **Beautiful UI**: Modern, responsive chat interface
- ⚡ **Fast Responses**: Powered by NVIDIA's advanced LLM

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Get NVIDIA API Key
1. Visit [NVIDIA Build](https://build.nvidia.com/)
2. Sign up or log in to your account
3. Navigate to the API keys section
4. Create a new API key for the `nvidia/nemotron-3-super-120b-a12b` model
5. Copy your API key

### 3. Configure Environment Variables
1. Create a `.env` file in the root directory (or rename `.env.example` to `.env`)
2. Add your NVIDIA API key:
   ```
   NVIDIA_API_KEY=your_api_key_here
   PORT=3001
   ```

### 4. Run the Development Server
You have two options:

**Option A: Run both frontend and backend together (recommended)**
```bash
npm run dev:all
```
This starts both the Vite development server and the Node.js backend server.

**Option B: Run them separately**
- Terminal 1 (Backend):
  ```bash
  npm run server
  ```
- Terminal 2 (Frontend):
  ```bash
  npm run dev
  ```

### 5. Access the Chatbot
- Open your portfolio in your browser (usually `http://localhost:5173`)
- Click the purple robot button in the bottom-right corner
- Start chatting!

## Using the Chatbot

### Text Chat
1. Click the chatbot button to open the interface
2. Type your question in the input field
3. Press Enter or click the send button

### Voice Chat
1. Click the microphone button to start listening
2. Speak your question clearly
3. Your speech will be transcribed and sent automatically
4. The AI response will be read aloud

## Browser Compatibility
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- Web Speech API support required for voice features

## Troubleshooting

### "API Error" Message
- Ensure your NVIDIA_API_KEY is correctly set in `.env`
- Check that the backend server is running on port 3001
- Verify your API key has valid credits

### Voice Input Not Working
- Ensure you're using a modern browser with Web Speech API support
- Check that microphone permissions are granted
- Try a different browser if issues persist

### CORS Errors
- The Vite dev server should proxy API requests automatically
- If using a different API backend, ensure CORS is configured properly

## API Integration Details

The chatbot uses the following NVIDIA API configuration:
- **Model**: `nvidia/nemotron-3-super-120b-a12b`
- **Base URL**: `https://integrate.api.nvidia.com/v1`
- **Temperature**: 1 (for varied responses)
- **Max Tokens**: 1024
- **Reasoning Budget**: 1024

## Building for Production

When ready to deploy:

```bash
npm run build
```

This will:
1. Compile TypeScript
2. Build the React frontend with Vite

**Note**: Remember to deploy the backend server (`server.ts`) as well, or use a serverless alternative for production deployment.

## Customization

### Change Chatbot Colors
Edit `src/styles/Chatbot.css` and modify the gradient colors in `.chatbot-button` and `.chatbot-header`.

### Change Model or Parameters
Edit `server.ts` and update the `openai.chat.completions.create()` parameters.

### Change Initial Message
Edit `src/Contents/Chatbot.tsx` and modify the initial state in `useState`.

## Support
For issues or questions about the NVIDIA API, visit [NVIDIA Developer Documentation](https://docs.nvidia.com/).
