import React, { useState, useRef, useEffect } from "react";
import "./AIBot.css";

const AIBot = () => {
  const [botOpen, setBotOpen] = useState(false);
  const [botMessages, setBotMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick options for dropdown
  const quickOptions = [
    { label: "About Guna", value: "about" },
    { label: "Skills & Technologies", value: "skills" },
    { label: "Experience", value: "experience" },
    { label: "Projects & Work", value: "projects" },
    { label: "GitHub Profile", value: "github" },
    { label: "Contact Information", value: "contact" },
    { label: "Education", value: "education" },
    { label: "AI & Tools", value: "ai" },
  ];

  useEffect(() => {
    if (botMessages.length > 0 && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [botMessages, isTyping]);

  // Add messages one by one with delay
  const addMessagesSequentially = (messages) => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        setBotMessages((prev) => [...prev, message]);
      }, index * 800);
    });
  };

  // Get AI response with better understanding
  const getAIResponse = (userQuestion) => {
    const question = userQuestion.toLowerCase().trim();

    // Greetings
    if (
      question.match(
        /^(hi|hello|hey|hai|hii|helloo|hellooo|greetings|good morning|good afternoon|good evening)$/i
      )
    ) {
      return {
        text: "Hello! 👋 I'm Guna's AI assistant. How can I help you today? You can ask me about his experience, skills, projects, or anything else!",
        suggestions: [
          "Tell me about Guna",
          "What are his skills?",
          "Show me his projects",
        ],
      };
    }

    // About Guna
    if (
      question.includes("about") ||
      question.includes("who is") ||
      question.includes("tell me") ||
      question.includes("guna") ||
      question === "about"
    ) {
      return {
        text: "Gunasekar is a Software and Frontend Developer with 2.8+ years of experience. He specializes in React.js, Next.js, TypeScript, and modern UI frameworks. He builds fast, responsive, and SEO-friendly web applications with AI-powered features. He currently works at Digital Regenesys as a Software Developer.",
        suggestions: [
          "What are his skills?",
          "Show me his experience",
          "What projects has he done?",
        ],
      };
    }

    // Experience
    if (
      question.includes("experience") ||
      question.includes("work") ||
      question.includes("job") ||
      question.includes("company") ||
      question.includes("worked") ||
      question === "experience"
    ) {
      return {
        text: "Gunasekar has 2.8+ years of experience:\n\n🏢 **Digital Regenesys** (2023 - Present)\nSoftware Developer - Specializes in React.js, Next.js, TypeScript, and modern UI/UX. Works with AI tools for productivity and builds high-performance, SEO-optimized web applications.\n\n🏢 **MavenCart** (2022 - 2023)\nSoftware Developer Intern - Gained hands-on experience in frontend development, HTML, CSS, JavaScript, React.js fundamentals, and component-based architecture.",
        suggestions: [
          "What are his skills?",
          "Show me his projects",
          "Where can I contact him?",
        ],
      };
    }

    // Skills
    if (
      question.includes("skill") ||
      question.includes("technology") ||
      question.includes("tech") ||
      question.includes("expertise") ||
      question.includes("what can") ||
      question === "skills"
    ) {
      return {
        text: "Gunasekar's core skills include:\n\n**Frontend:** React.js, Next.js, Angular, TypeScript, JavaScript (ES6+), HTML5, CSS3\n**Styling:** Tailwind CSS, Material UI, Bootstrap\n**Backend:** Python, REST API Integration\n**Tools:** Git & GitHub, NPM/Yarn, Postman, Netlify\n**AI & Tools:** Generative AI (OpenAI/ChatGPT API), AI Chat UI Design, Prompt Engineering, Cursor, GitHub Copilot, V0\n**CMS:** Strapi (Headless CMS)\n**Database:** Firebase, PostGraph\n\nHe focuses on performance optimization, clean architecture, and scalable component design.",
        suggestions: [
          "Show me his projects",
          "What's his experience?",
          "GitHub profile",
        ],
      };
    }

    // Projects
    if (
      question.includes("project") ||
      question.includes("portfolio") ||
      question.includes("built") ||
      question.includes("work") ||
      question.includes("what did") ||
      question === "projects"
    ) {
      return {
        text: "Gunasekar has developed multiple production-level projects:\n\n🌐 **Live Projects:**\n• MagLife Water - maglifewater.com\n• Jaisho - jaisho.netlify.app\n• AI Chat Application - gu-gu-ai-chat.netlify.app\n• Juspay Dashboard - juspay-dashboard-guna.netlify.app\n\n💻 **GitHub Projects:**\n• Gym Web Application\n• Movie App\n• TN Tourism Website\n• Image Search Engine\n• XO Game\n• Expense Tracker\n• Baby Car Website\n\nCheck the Work section to see all his projects!",
        suggestions: [
          "GitHub profile",
          "What technologies did he use?",
          "Contact information",
        ],
      };
    }

    // GitHub
    if (
      question.includes("github") ||
      question.includes("git") ||
      question.includes("code") ||
      question.includes("repository") ||
      question.includes("repo") ||
      question === "github"
    ) {
      return {
        text: "🔗 **GitHub Profile:**\nhttps://github.com/GunasekarRajeshkumar\n\nYou can find all his code repositories, projects, and contributions there!",
        suggestions: [
          "Show me his projects",
          "What are his skills?",
          "LinkedIn profile",
        ],
        link: "https://github.com/GunasekarRajeshkumar",
      };
    }

    // LinkedIn
    if (
      question.includes("linkedin") ||
      question.includes("linked in") ||
      question === "linkedin"
    ) {
      return {
        text: "🔗 **LinkedIn Profile:**\nhttps://www.linkedin.com/in/guna-sekar-008264290/\n\nConnect with him on LinkedIn!",
        suggestions: [
          "GitHub profile",
          "Contact information",
          "Show me his experience",
        ],
        link: "https://www.linkedin.com/in/guna-sekar-008264290/",
      };
    }

    // Contact
    if (
      question.includes("contact") ||
      question.includes("email") ||
      question.includes("phone") ||
      question.includes("reach") ||
      question.includes("connect") ||
      question.includes("how to") ||
      question === "contact"
    ) {
      return {
        text: "📧 **Email:** rgunasekar1608@gmail.com\n📱 **Phone:** (+91) 6374463809\n📍 **Location:** Madurai, Tamil Nadu\n\nYou can also reach him via:\n• WhatsApp: +91 6374463809\n• LinkedIn: https://www.linkedin.com/in/guna-sekar-008264290/\n• GitHub: https://github.com/GunasekarRajeshkumar",
        suggestions: [
          "Show me his projects",
          "What's his experience?",
          "GitHub profile",
        ],
      };
    }

    // Education
    if (
      question.includes("education") ||
      question.includes("degree") ||
      question.includes("qualification") ||
      question.includes("study") ||
      question.includes("college") ||
      question === "education"
    ) {
      return {
        text: "🎓 **Education:**\nBachelor of Engineering\n\nCheck the Qualification section for more details about his educational background!",
        suggestions: [
          "What's his experience?",
          "What are his skills?",
          "Show me his projects",
        ],
      };
    }

    // AI
    if (
      question.includes("ai") ||
      question.includes("artificial intelligence") ||
      question.includes("chatgpt") ||
      question.includes("openai") ||
      question.includes("tools") ||
      question === "ai"
    ) {
      return {
        text: "🤖 **AI & Tools:**\nYes! Gunasekar works extensively with AI-driven features:\n\n• Generative AI (OpenAI/ChatGPT API)\n• AI Chat UI & Voice Assistant Design\n• Prompt Engineering\n• AI-powered code optimization\n• Intelligent automation workflows\n• AI tools: Cursor, GitHub Copilot, V0\n\nHe integrates AI to enhance productivity and create smarter interfaces!",
        suggestions: [
          "Show me his projects",
          "What are his skills?",
          "GitHub profile",
        ],
      };
    }

    // Resume
    if (
      question.includes("resume") ||
      question.includes("cv") ||
      question.includes("download")
    ) {
      return {
        text: "📄 **Resume:**\nYou can download Guna's resume from:\nhttps://drive.google.com/file/d/1e00E22eEnqTzX30jjRWTsK1v517t-LAG/view?usp=sharing",
        suggestions: [
          "Contact information",
          "Show me his experience",
          "What are his skills?",
        ],
        link: "https://drive.google.com/file/d/1e00E22eEnqTzX30jjRWTsK1v517t-LAG/view?usp=sharing",
      };
    }

    // Suggestion for unclear questions
    const suggestions = [];
    if (question.length > 0) {
      if (question.includes("h") || question.includes("w")) {
        suggestions.push("Try: 'Tell me about Guna' or 'What are his skills?'");
      }
      return {
        text: `I'm not sure I understood that. 🤔\n\nDid you mean to ask about:\n• About Guna\n• Skills & Technologies\n• Experience\n• Projects & Work\n• GitHub Profile\n• Contact Information\n\nTry asking: "Tell me about Guna" or "What are his skills?" or use the dropdown menu above!`,
        suggestions: ["About Guna", "Skills", "Experience", "Projects"],
      };
    }

    return {
      text: "Hello! 👋 How can I help you? You can ask me about Guna's experience, skills, projects, or contact information. Or use the dropdown menu above for quick options!",
      suggestions: ["About Guna", "Skills", "Experience", "Projects"],
    };
  };

  // Handle quick option selection
  const handleQuickOption = (value) => {
    setShowDropdown(false);
    const optionMap = {
      about: "about",
      skills: "skills",
      experience: "experience",
      projects: "projects",
      github: "github",
      contact: "contact",
      education: "education",
      ai: "ai",
    };
    handleSendMessage(null, optionMap[value]);
  };

  // Handle user message submission
  const handleSendMessage = (e, quickValue = null) => {
    if (e) e.preventDefault();
    const messageText = quickValue || userInput.trim();
    if (!messageText || isTyping) return;

    const userMessage = {
      type: "user",
      text: quickValue
        ? quickOptions.find((opt) => opt.value === quickValue)?.label
        : messageText,
    };

    setBotMessages((prev) => [...prev, userMessage]);
    if (!quickValue) setUserInput("");
    setIsTyping(true);

    // Get AI response
    const response = getAIResponse(messageText);

    // Show typing indicator, then response after delay
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        type: "bot",
        text: response.text,
        link: response.link,
        suggestions: response.suggestions || [],
      };
      setBotMessages((prev) => [...prev, botMessage]);
      // Auto-scroll after message is added
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }, 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
    handleSendMessage(null, null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Format message text - convert markdown to HTML
  const formatMessage = (text) => {
    if (!text) return "";

    // Escape HTML first
    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Convert **text** to <strong>text</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert *text* to <em>text</em> (only if not already bold)
    formatted = formatted.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>");

    // Convert line breaks
    formatted = formatted.replace(/\n/g, "<br />");

    // Convert bullet points (• or -)
    formatted = formatted.replace(/^[•-]\s+(.+)$/gm, "• $1");

    return formatted;
  };

  return (
    <div className="ai-bot-container">
      <div className={`ai-bot-chat ${botOpen ? "active" : ""}`}>
        <div className="ai-bot-header">
          <h3>Hi! I'm Guna's AI Assistant</h3>
          <button className="ai-bot-close" onClick={() => setBotOpen(false)}>
            <i className="uil uil-times"></i>
          </button>
        </div>

        {/* Quick Options Dropdown */}
        <div className="ai-bot-quick-options">
          <button
            className="ai-bot-dropdown-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="uil uil-list-ul"></i> Quick Options
            <i className={`uil uil-angle-${showDropdown ? "up" : "down"}`}></i>
          </button>
          {showDropdown && (
            <div className="ai-bot-dropdown-menu">
              {quickOptions.map((option) => (
                <button
                  key={option.value}
                  className="ai-bot-dropdown-item"
                  onClick={() => handleQuickOption(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ai-bot-messages" ref={messagesEndRef}>
          {botMessages.map((msg, idx) => (
            <div key={idx} className={`ai-bot-message ${msg.type}`}>
              <div
                className="ai-bot-message-text"
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
              />
              {msg.link && (
                <a
                  href={msg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ai-bot-link"
                >
                  {msg.link}
                  <i className="uil uil-external-link-alt"></i>
                </a>
              )}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="ai-bot-suggestions">
                  {msg.suggestions.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      className="ai-bot-suggestion-btn"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="ai-bot-message bot">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          )}
        </div>

        <form className="ai-bot-input-form" onSubmit={handleSendMessage}>
          <input
            ref={inputRef}
            type="text"
            className="ai-bot-input"
            placeholder="Ask me anything about Guna..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="ai-bot-send-btn"
            disabled={!userInput.trim() || isTyping}
          >
            <i className="uil uil-message"></i>
          </button>
        </form>

        <div className="ai-bot-actions">
          <a href="tel:+916374463809" className="ai-bot-action-btn">
            <i className="uil uil-phone"></i>
            Call
          </a>
          <a
            href="https://wa.me/916374463809"
            className="ai-bot-action-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="uil uil-whatsapp"></i>
            WhatsApp
          </a>
          <a
            href="mailto:rgunasekar1608@gmail.com"
            className="ai-bot-action-btn"
          >
            <i className="uil uil-envelope"></i>
            Email
          </a>
        </div>
      </div>
      <button
        className="ai-bot-button"
        onClick={() => {
          setBotOpen(!botOpen);
          if (!botOpen && botMessages.length === 0) {
            const introMessages = [
              {
                type: "bot",
                text: "Hello! 👋 I'm Guna's AI assistant. How can I help you today?",
              },
              {
                type: "bot",
                text: "You can ask me about his experience, skills, projects, GitHub, contact info, or anything else!",
              },
              {
                type: "bot",
                text: "Try saying 'Hi', 'Tell me about Guna', 'Show me his projects', or use the Quick Options menu above! 👆",
                suggestions: ["About Guna", "Skills", "Experience", "Projects"],
              },
            ];
            addMessagesSequentially(introMessages);
            setTimeout(() => {
              inputRef.current?.focus();
            }, introMessages.length * 800 + 500);
          } else if (botOpen) {
            inputRef.current?.focus();
          }
        }}
      >
        <i className="uil uil-comment-dots"></i>
      </button>
    </div>
  );
};

export default AIBot;
