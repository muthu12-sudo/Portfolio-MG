import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaMicrophone, FaPaperPlane, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "../styles/Chatbot.css";

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Parse and render markdown content
const parseMarkdown = (content: string) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType = '';

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === 'ordered') {
        elements.push(
          <ol key={`list-${elements.length}`}>
            {listItems.map((item, i) => (
              <li key={i}>{parseInlineMarkdown(item.replace(/^\d+\.\s/, ''))}</li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`list-${elements.length}`}>
            {listItems.map((item, i) => (
              <li key={i}>{parseInlineMarkdown(item.replace(/^[\-•*]\s/, ''))}</li>
            ))}
          </ul>
        );
      }
      listItems = [];
      listType = '';
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check for ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'ordered') {
        flushList();
        listType = 'ordered';
      }
      listItems.push(trimmed);
      return;
    }

    // Check for unordered list
    if (/^[\-•*]\s/.test(trimmed)) {
      if (listType !== 'unordered') {
        flushList();
        listType = 'unordered';
      }
      listItems.push(trimmed);
      return;
    }

    // Flush list if we hit a non-list line
    if (listItems.length > 0) {
      flushList();
    }

    // Empty line
    if (trimmed === '') {
      elements.push(<div key={`empty-${idx}`} style={{ height: '8px' }}></div>);
      return;
    }

    // Regular paragraph
    elements.push(
      <div key={`para-${idx}`}>{parseInlineMarkdown(trimmed)}</div>
    );
  });

  // Flush any remaining list
  flushList();

  return elements;
};

// Parse inline markdown (bold, italic, code, etc.)
const parseInlineMarkdown = (text: string) => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    // Bold text **text** or __text__
    const boldMatch = remaining.match(/^\*\*(.*?)\*\*/) || remaining.match(/^__(.*?)__/);
    if (boldMatch) {
      parts.push(<strong key={key++}>{parseInlineMarkdown(boldMatch[1])}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic text *text* or _text_
    const italicMatch = remaining.match(/^\*(.*?)\*/) || remaining.match(/^_(.*?)_/);
    if (italicMatch && !remaining.match(/^\*\*/)) {
      parts.push(<em key={key++}>{parseInlineMarkdown(italicMatch[1])}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Inline code `text`
    const codeMatch = remaining.match(/^`([^`]*)`/);
    if (codeMatch) {
      parts.push(<code key={key++}>{codeMatch[1]}</code>);
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Links [text](url)
    const linkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      parts.push(
        <a key={key++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{color: '#0056b3', textDecoration: 'underline'}}>
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Regular text (until next markdown)
    const nextMatch = remaining.match(/(\*\*|__|_|\*|`|\[)/);
    if (nextMatch) {
      parts.push(remaining.slice(0, nextMatch.index));
      remaining = remaining.slice(nextMatch.index);
    } else {
      parts.push(remaining);
      remaining = '';
    }
  }

  return parts;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm Muthuganesh R. Welcome to my portfolio! What you want to know about me?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("");
          setInputValue(transcript);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
  };

  const speak = (text: string) => {
    if (isMuted) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      // Use full Vercel URL for production, relative path for development
      const apiUrl = typeof window !== 'undefined' && window.location.hostname.includes('github.io')
        ? 'https://portfolio-mg-main.vercel.app/api/chat'
        : '/api/chat';

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      speak(data.content);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please make sure the API is configured correctly and try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button - Hide when chat is open */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          title="Open Chat"
        >
          <FaRobot />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaRobot className="header-icon" />
              <span>AI Assistant</span>
            </div>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              title="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">
                  {parseMarkdown(msg.content)}
                </div>
                {msg.role === "assistant" && (
                  <button
                    className="mute-button"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute read aloud" : "Mute read aloud"}
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-area">
            <div className="input-group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                disabled={loading}
                className="chat-input"
              />
              <button
                className={`voice-button ${isListening ? "listening" : ""}`}
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop listening" : "Start listening"}
              >
                <FaMicrophone />
              </button>
              <button
                className="send-button"
                onClick={sendMessage}
                disabled={loading || !inputValue.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
