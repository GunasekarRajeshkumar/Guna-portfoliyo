import React, { useEffect, useState } from "react";
import "./App.css";
import GunaAbout from "./img/guna-4.jpg";
import AIBot from "./components/AIBot";

const TYPING_TEXTS = [
  "Software Developer",
  "Full Stack Developer",
  "Front End Developer",
  "Product Developer",
];

const HERO_TAGS = [
  { icon: "bx bx-code-alt", label: "Frontend" },
  { icon: "bx bx-server", label: "Full Stack" },
  { icon: "bx bxs-rocket", label: "Product Developer" },
  { icon: "bx bx-brain", label: "AI Solutions" },
  { icon: "bx bx-trophy", label: "3+ Years" },
];

const HERO_FLOATING = [
  { icon: "bx bxl-react", label: "React", className: "home__floating-card--1" },
  { icon: "bx bx-code-curly", label: "Next.js", className: "home__floating-card--2" },
  { icon: "bx bx-code-block", label: "TypeScript", className: "home__floating-card--3" },
  { icon: "bx bx-bot", label: "AI Tools", className: "home__floating-card--4" },
  { icon: "bx bxs-magic-wand", label: "Claude", className: "home__floating-card--5" },
];


const SKILLS_GROUPS = [
  {
    title: "Frontend Engineering",
    subtitle: "Modern UI, performant & accessible",
    icon: "bx bxs-paint-roll",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Context API",
      "SSR / SSG",
      "SPA",
      "Component-Based Architecture",
      "Cross-browser Compatibility",
      "WCAG / ARIA Accessibility",
    ],
  },
  {
    title: "Backend & Full Stack",
    subtitle: "APIs, services & data layers",
    icon: "bx bxs-server",
    items: [
      "Node.js",
      "REST API Development",
      "Strapi (Headless CMS)",
      "Firebase",
      "Authentication",
      "JWT",
      "OAuth",
      "Webhooks",
      "Third-party API Integration",
      "Server-side Logic",
      "Database Integration",
    ],
  },
  {
    title: "AI & Automation",
    subtitle: "LLM-powered, intelligent workflows",
    icon: "bx bx-brain",
    items: [
      "LLM API Integration",
      "OpenAI API",
      "Anthropic Claude API",
      "Claude Code",
      "Cursor",
      "GitHub Copilot",
      "v0.dev",
      "AI Agents",
      "Automation Workflows",
      "Prompt Engineering",
      "Retrieval-Augmented Generation (RAG)",
      "AI-assisted Development",
    ],
  },
  {
    title: "Performance & SEO",
    subtitle: "Core Web Vitals & search visibility",
    icon: "bx bxs-bolt-circle",
    items: [
      "Core Web Vitals (LCP, FCP, CLS, INP)",
      "Code Splitting",
      "Lazy Loading",
      "Caching Strategies",
      "Image Optimization",
      "Technical SEO",
      "Schema Markup (JSON-LD)",
      "Open Graph",
      "Google Tag Manager (GTM)",
      "Google Analytics (GA4)",
    ],
  },
  {
    title: "Tools & DevOps",
    subtitle: "Ship fast, collaborate effectively",
    icon: "bx bx-cog",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Version Control",
      "Postman",
      "VS Code",
      "Chrome DevTools",
      "npm",
      "Webpack",
      "Agile / Scrum",
      "Jira",
      "Code Reviews",
    ],
  },
  {
    title: "Core Concepts",
    subtitle: "Engineering fundamentals",
    icon: "bx bxs-chip",
    items: [
      "Data Structures & Algorithms",
      "System Design",
      "Scalability",
      "SDLC",
      "OOP",
      "Design Patterns",
      "Debugging",
      "Performance Tuning",
      "Problem Solving",
    ],
  },
];

const AI_CAPABILITIES = [
  {
    icon: "bx bx-bot",
    title: "LLM Integrations",
    description:
      "Integrating OpenAI, ChatGPT, and other LLM APIs into production applications with structured prompts, function calling, and intelligent fallbacks.",
  },
  {
    icon: "bx bx-conversation",
    title: "Conversational AI",
    description:
      "Designing and building chat UIs, AI assistants, and voice-driven interfaces with smooth, real-time, context-aware interactions.",
  },
  {
    icon: "bx bx-cog",
    title: "AI Agents & Automation",
    description:
      "Building autonomous workflows, AI agents, and automation pipelines that reduce manual work and unlock new product value.",
  },
  {
    icon: "bx bxs-magic-wand",
    title: "Prompt Engineering",
    description:
      "Crafting reliable, reusable prompts and structured outputs that get consistent, production-quality results from LLMs.",
  },
  {
    icon: "bx bx-data",
    title: "RAG & Knowledge Bases",
    description:
      "Retrieval-augmented generation pipelines that ground LLM responses in your own data for trustworthy, context-aware answers.",
  },
  {
    icon: "bx bx-code-curly",
    title: "AI-Powered Dev Workflows",
    description:
      "Using Cursor, GitHub Copilot, and AI assistants to ship faster, debug smarter, and write cleaner, more maintainable code.",
  },
];

const FEATURED_PROJECTS = [
  {
    title: "FridgeChef AI",
    description:
      "An AI-powered recipe assistant that turns the ingredients in your fridge into creative, personalized dishes. Powered by an LLM workflow with a clean, responsive React interface.",
    tech: ["React.js", "LLM API", "AI Integration", "Tailwind CSS", "Vercel"],
    icon: "bx bxs-bowl-hot",
    tag: "AI Project",
    live: "https://fridge-chef-ai-chi.vercel.app/",
  },
  {
    title: "AI Chat Application",
    description:
      "A real-time conversational AI interface with intelligent responses, smooth message streaming, and a polished chat experience powered by generative AI APIs.",
    tech: ["React.js", "OpenAI API", "Chat UI", "Netlify"],
    icon: "bx bx-bot",
    tag: "AI Project",
    live: "https://gu-gu-ai-chat.netlify.app/",
  },
  {
    title: "Juspay Analytics Dashboard",
    description:
      "A pixel-perfect, responsive analytics dashboard built from Figma — reusable components, data visualisation, and a clean TypeScript architecture.",
    tech: ["React.js", "TypeScript", "Dashboard UI", "Responsive Design"],
    icon: "bx bxs-dashboard",
    tag: "Dashboard",
    live: "https://juspay-dashboard-guna.netlify.app/",
  },
  {
    title: "MagLife Water",
    description:
      "A high-performance, SEO-optimized product website with responsive design, smooth animations, and an accessible experience across every device.",
    tech: ["React.js", "SEO", "Responsive Design", "Performance"],
    icon: "bx bxs-droplet-half",
    tag: "Production",
    live: "https://maglifewater.com/",
  },
  {
    title: "Jaisho Web App",
    description:
      "A modern, responsive web application focused on smooth interactions, clean component design, and optimized front-end performance.",
    tech: ["React.js", "JavaScript", "Responsive Design", "Netlify"],
    icon: "bx bxs-store",
    tag: "Web App",
    live: "https://jaisho.netlify.app/",
  },
  {
    title: "Image Search Engine",
    description:
      "A fast image-search experience with on-the-fly querying, infinite scroll, and a polished, responsive UI built around a public image API.",
    tech: ["React.js", "REST API", "Search UX", "Responsive"],
    icon: "bx bx-search-alt",
    tag: "Web App",
    live: "https://github.com/Gunasekar16082001/image-search-engine-opearater",
  },
  {
    title: "Tamil Nadu Tourism",
    description:
      "An immersive tourism website featuring rich visuals, smooth navigation, and SEO-optimized content highlighting destinations across Tamil Nadu.",
    tech: ["React.js", "SEO", "Responsive", "UI/UX"],
    icon: "bx bxs-map",
    tag: "Web App",
    live: "https://github.com/Gunasekar16082001/Tn-toursim",
  },
  {
    title: "Movie Explorer",
    description:
      "A movie discovery app with search, filtering, and detailed views — powered by REST APIs and a clean, fast, responsive React UI.",
    tech: ["React.js", "REST API", "Responsive", "UI/UX"],
    icon: "bx bxs-camera-movie",
    tag: "Web App",
    live: "https://github.com/Gunasekar16082001/movie-app-guna.git",
  },
  {
    title: "Expense Tracker",
    description:
      "A clean personal-finance dashboard for tracking income and expenses with persistent state, smart filtering, and smooth interactions.",
    tech: ["React.js", "LocalStorage", "State Management", "UI/UX"],
    icon: "bx bxs-wallet-alt",
    tag: "Web App",
    live: "https://github.com/Gunasekar16082001/Expense-Tracker.git",
  },
];

const EXPERIENCE = [
  {
    company: "Digital Regenesys",
    role: "Software Developer",
    location: "Mumbai, India",
    date: "Oct 2023 — Present",
    icon: "bx bxs-briefcase",
    current: true,
    bullets: [
      "Designed and developed scalable, high-performance web applications using React.js, Next.js, and TypeScript — delivering pixel-perfect production interfaces with strong accessibility and cross-browser compatibility.",
      "Engineered full stack features and RESTful APIs with Node.js, integrating Strapi (Headless CMS), Firebase, and third-party services into mission-critical production workflows.",
      "Optimized Core Web Vitals (LCP, FCP, CLS) and implemented Technical SEO, Schema Markup (JSON-LD), and Google Tag Manager (GTM) — improving page speed, search visibility, and analytics tracking.",
      "Integrated LLM APIs, AI agents, and automation workflows into production features, building intelligent user experiences and AI-powered internal tooling.",
      "Accelerated delivery using Claude Code, Cursor, and GitHub Copilot for AI-assisted coding, refactoring, debugging, and documentation — maintaining clean, scalable codebases.",
      "Architected reusable component systems and scalable frontend patterns while collaborating with cross-functional product and engineering teams in Agile sprints.",
    ],
  },
  {
    company: "Mavencart (CaratLane Project)",
    role: "Software Developer Intern",
    location: "Madurai, India",
    date: "Jun 2022 — Jan 2023",
    icon: "bx bxs-shopping-bag",
    current: false,
    bullets: [
      "Redesigned key product and seasonal festival landing pages, improving UI consistency, conversion, and user engagement across the product catalog.",
      "Contributed to site-wide performance optimization during a major website revamp, reducing load times on high-traffic pages.",
      "Built reusable React components and resolved cross-browser compatibility and accessibility issues alongside senior engineers.",
    ],
  },
];

const CERTIFICATIONS = [
  "Complete React, Next.js & TypeScript Projects",
  "MERN Stack Development",
  "Full Stack Web Development (Udemy)",
  "UI/UX Design (Coursera)",
  "Frontend Development (GeeksforGeeks)",
  "React.js (HackerRank)",
];

const QUALIFICATIONS = [
  {
    title: "Bachelor of Engineering (B.E.)",
    subtitle:
      "Velammal College of Engineering & Technology, Madurai, India",
    note: "Coursework: Data Structures, Algorithms, DBMS, Operating Systems, Web Technologies. Active in hackathons and competitive coding contests.",
    date: "Aug 2019 — Jun 2023",
    icon: "bx bxs-graduation",
  },
  {
    title: "Advanced Diploma in Java Programming",
    subtitle: "CSC Computer Education",
    note: "Coursework: HTML, CSS, Java, C, C++, Basic Programming & Computer Science fundamentals.",
    date: "2018 — 2019",
    icon: "bx bxs-book-content",
  },
  {
    title: "Higher Secondary School",
    subtitle: "Computer Science — Sethupati Higher Secondary School",
    date: "2017 — 2019",
    icon: "bx bxs-school",
  },
  {
    title: "High School",
    subtitle: "Thiagarajar Model Higher Secondary School",
    date: "2017",
    icon: "bx bxs-school",
  },
];

const CONTACT_METHODS = [
  {
    icon: "bx bxs-envelope",
    label: "Email",
    value: "rgunasekar1608@gmail.com",
    href: "mailto:rgunasekar1608@gmail.com",
  },
  {
    icon: "bx bxs-phone",
    label: "Phone",
    value: "(+91) 63744 63809",
    href: "tel:+916374463809",
  },
  {
    icon: "bxl-whatsapp bx",
    label: "WhatsApp",
    value: "Chat instantly",
    href: "https://wa.me/916374463809",
    external: true,
  },
  {
    icon: "bxl-linkedin bx",
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/guna-sekar-008264290/",
    external: true,
  },
  {
    icon: "bxl-github bx",
    label: "GitHub",
    value: "View my code",
    href: "https://github.com/GunasekarRajeshkumar",
    external: true,
  },
  {
    icon: "bxs-map bx",
    label: "Location",
    value: "Madurai, Tamil Nadu",
    href: null,
  },
];

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    companies: 0,
    freelance: 0,
  });

  // Smooth scroll function without hash in URL
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll-triggered animations for sections and boxes
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -10px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use rAF so the browser commits initial styles before adding .animate
          requestAnimationFrame(() => {
            entry.target.classList.add("animate");
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
      section.classList.add("section");
    });

    // Observe all section boxes for staggered reveals
    const sectionBoxes = document.querySelectorAll(
      ".about__container, .about__content, .about__img, .about__meta-item, .about_card, .tech-stack__container, .ai-cap__container, .qualification__container, .experience__container, .projects__container, .contact__container, .footer__container, .footer__column, .skills__group, .ai-cap__card, .exp__card, .qual__card, .contact__card, .contact__cta, .certifications, .certifications__chip, .project-card, .home__tag, .home__floating-card, .home__badge"
    );
    sectionBoxes.forEach((box) => {
      observer.observe(box);
    });

    // Reveal-on-scroll for arbitrary elements
    const revealEls = document.querySelectorAll("[data-reveal]");
    revealEls.forEach((el) => observer.observe(el));

    // Observe about image separately for smooth animation
    const aboutImages = document.querySelectorAll(".about__img");
    aboutImages.forEach((img) => {
      observer.observe(img);
    });

    // Observe qualification data items
    const qualificationData = document.querySelectorAll(".qualification__data");
    qualificationData.forEach((item) => {
      observer.observe(item);
    });

    // Observe stats info to trigger counter animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsAnimated(true);
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    const aboutInfo = document.querySelector(".about__info");
    if (aboutInfo) statsObserver.observe(aboutInfo);

    // Scroll handler: progress bar, scroll-top button, active link
    const sectionElements = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrollY > 400);

      sectionElements.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute("id");

        const navLink = document.querySelector(
          `.nav__link[href*=${sectionId}]`
        );

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add("active-link");
          } else {
            navLink.classList.remove("active-link");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  // Animated stats counter
  useEffect(() => {
    if (!statsAnimated) return;
    const targets = { years: 3, projects: 15, companies: 2, freelance: 2 };
    const duration = 1600;
    const startTime = performance.now();

    let rafId;
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCounters({
        years: Math.round(targets.years * eased),
        projects: Math.round(targets.projects * eased),
        companies: Math.round(targets.companies * eased),
        freelance: Math.round(targets.freelance * eased),
      });
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [statsAnimated]);

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);

  const typingSpeed = isDeleting ? 100 : 150;
  const pauseTime = 1000; // Time before starting next text

  useEffect(() => {
    const handleTyping = () => {
      const currentText = TYPING_TEXTS[loop % TYPING_TEXTS.length];
      const updatedText = isDeleting
        ? currentText.substring(0, index - 1)
        : currentText.substring(0, index + 1);

      setText(updatedText);
      setIndex(isDeleting ? index - 1 : index + 1);

      if (!isDeleting && updatedText === currentText) {
        setTimeout(() => setIsDeleting(true), pauseTime); // Start deleting after a pause
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoop(loop + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, index, isDeleting, loop, typingSpeed]);

  return (
    <div>
      {/*===== SCROLL PROGRESS =====*/}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      ></div>

      {/*===== HEADER =====*/}
      <header className="l-header">
        <nav className="nav bd-grid">
          <div>
            <button
              onClick={() => scrollToSection("home")}
              className="nav__logo"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Guna.
            </button>
          </div>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("home")}
                  className="nav__link active-link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Home
                </button>
              </li>
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("about")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  About
                </button>
              </li>
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("skills")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Skills
                </button>
              </li>
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("ai")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  AI
                </button>
              </li>
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("experiance")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Experience
                </button>
              </li>
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Projects
                </button>
              </li>
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-menu"></i>
          </div>
        </nav>
      </header>

      <main className="l-main">
        {/*===== HOME =====*/}
        <section className="home" id="home">
          <div className="home__container bd-grid">
            <div className="home__data">
              <span className="home__badge">
                <span className="home__badge-dot"></span>
                Open to work
              </span>
              <h1 className="home__title">
                Hi, I'm <span className="home__title-color">Guna</span>
                <br />
                <span className="typing-text">
                  {text}
                  <span className="blink-cursor">|</span>
                </span>
              </h1>
              <div className="home__tags">
                {HERO_TAGS.map((tag, i) => (
                  <span className="home__tag" key={i}>
                    <i className={tag.icon}></i>
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="home__buttons">
                <a
                  href="https://drive.google.com/file/d/1ko5etRBO5Y9C-r8rRpu0aRWI8d-JqYvU/view?usp=sharing"
                  className="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bx-download"></i> Download Resume
                </a>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="button button--ghost"
                >
                  View Projects <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
              <div className="home__social">
                <a
                  href="https://www.linkedin.com/in/guna-sekar-008264290/"
                  className="home__social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="bx bxl-linkedin"></i>
                </a>
                <a
                  href="https://github.com/GunasekarRajeshkumar"
                  className="home__social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="bx bxl-github"></i>
                </a>
                <a
                  href="mailto:rgunasekar1608@gmail.com"
                  className="home__social-icon"
                  aria-label="Email"
                >
                  <i className="bx bxs-envelope"></i>
                </a>
                <a
                  href="https://wa.me/916374463809"
                  className="home__social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="bx bxl-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="home__img">
              <div className="home__img-glow"></div>
              <svg
                className="home__blob"
                viewBox="0 0 479 467"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="mask0" mask-type="alpha">
                  <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
                </mask>
                <g mask="url(#mask0)">
                  <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
                  <image
                    className="home__blob-img"
                    x="0"
                    y="0"
                    width="479"
                    height="467"
                    href="/guna.jpg"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
              </svg>
              {HERO_FLOATING.map((card, i) => (
                <div
                  key={i}
                  className={`home__floating-card ${card.className}`}
                >
                  <i className={card.icon}></i>
                  <span>{card.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ==========Scrole========= */}
        <div className="home__scroll bd-grid">
          <button
            onClick={() => scrollToSection("about")}
            className="home__scroll-button button--flex"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <i className="bx bx-mouse"></i>{" "}
            <span className="home__scroll-name">Scroll Down</span>
            <i className="bx bx-down-arrow-alt"></i>{" "}
          </button>
        </div>

        {/*===== ABOUT =====*/}
        <section className="about section" id="about">
          <h2 className="section-title">About Me</h2>
          <p className="section-lead">
            Product-minded engineer building user-centric, AI-powered web
            applications across the complete software development lifecycle.
          </p>
          <div className="about__container bd-grid">
            <div className="about__img">
              <div className="about__img-frame">
                <img src={GunaAbout} alt="Gunasekar Rajeshkumar" />
              </div>
              <span className="about__img-badge">
                <i className="bx bxs-check-circle"></i> Open to opportunities
              </span>
            </div>
            <div className="about__content">
              <span className="about__eyebrow">Professional Summary</span>
              <h2 className="about__subtitle">Software Developer</h2>
              <p className="about__text">
                Results-driven Frontend and Full Stack Developer with{" "}
                <strong>3+ years</strong> of experience architecting, building,
                and shipping high-performance, scalable, and user-centric web
                applications across the complete software development
                lifecycle. A product-minded engineer who owns features
                end-to-end — translating product requirements and design
                specifications into production-ready interfaces, integrating
                backend services and APIs, deploying to production, and
                continuously optimizing for performance, accessibility, and
                search visibility.
              </p>
              <p className="about__text">
                Driven by <strong>clean architecture, performance</strong>, and
                a <strong>product-first mindset</strong>, I bring cutting-edge
                AI capabilities — Claude, OpenAI APIs, AI agents, and RAG
                pipelines — into real, polished products. I love crafting
                experiences that feel fast, intuitive, and intelligent, and I
                thrive in collaborative Agile teams shipping features that
                scale and create measurable impact.
              </p>
              <div className="about__info">
                <div className="about_card">
                  <span className="about__info-title">
                    {counters.years}
                    <span className="about__info-plus">+</span>
                  </span>
                  <span className="about__info-name">
                    Years <br></br> experience
                  </span>
                </div>
                <div className="about_card">
                  <span className="about__info-title">
                    {counters.projects}
                    <span className="about__info-plus">+</span>
                  </span>
                  <span className="about__info-name">
                    Projects <br></br> delivered
                  </span>
                </div>
                <div className="about_card">
                  <span className="about__info-title">{counters.companies}</span>
                  <span className="about__info-name">
                    Companies<br></br>worked
                  </span>
                </div>
                <div className="about_card">
                  <span className="about__info-title">{counters.freelance}</span>
                  <span className="about__info-name">
                    Freelance <br></br> projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*===== SKILLS / TECH ARCHITECTURE =====*/}
        <section className="skills section" id="skills">
          <h2 className="section-title">Tech Stack &amp; Architecture</h2>
          <div className="tech-stack__container bd-grid">
            <div className="skills__groups">
              {SKILLS_GROUPS.map((group, gi) => (
                <article className="skills__group" key={gi}>
                  <div className="skills__group-header">
                    <div className="skills__group-icon">
                      <i className={group.icon}></i>
                    </div>
                    <div>
                      <h3 className="skills__group-title">{group.title}</h3>
                      <p className="skills__group-subtitle">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="skills__group-badges">
                    {group.items.map((item, i) => (
                      <span className="tech-stack__badge" key={i}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/*===== AI CAPABILITIES =====*/}
        <section className="ai-cap section" id="ai">
          <h2 className="section-title">AI Capabilities</h2>
          <p className="ai-cap__lead">
            AI-driven engineering across the stack — from LLM-powered features
            and conversational interfaces to agents, automation, and smarter
            developer workflows.
          </p>
          <div className="ai-cap__container bd-grid">
            <div className="ai-cap__grid">
              {AI_CAPABILITIES.map((cap, i) => (
                <article className="ai-cap__card" key={i}>
                  <div className="ai-cap__icon-wrap">
                    <i className={cap.icon}></i>
                  </div>
                  <h3 className="ai-cap__title">{cap.title}</h3>
                  <p className="ai-cap__desc">{cap.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/*===== EXPERIENCE =====*/}
        <section className="experience section" id="experiance">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-lead">
            3+ years architecting, building, and shipping production-grade
            frontend, full stack, and AI-powered applications.
          </p>
          <div className="experience__container bd-grid">
            <div className="exp__stack">
              {EXPERIENCE.map((item, i) => (
                <article className="exp__card" key={i}>
                  <aside className="exp__side">
                    <div className="exp__side-icon">
                      <i className={item.icon}></i>
                    </div>
                    {item.current && (
                      <span className="exp__current">
                        <span className="exp__current-dot"></span> Current
                      </span>
                    )}
                    <span className="exp__date">
                      <i className="bx bx-calendar"></i> {item.date}
                    </span>
                    <span className="exp__location">
                      <i className="bx bxs-map"></i> {item.location}
                    </span>
                  </aside>
                  <div className="exp__body">
                    <span className="exp__role-tag">{item.role}</span>
                    <h3 className="exp__company">{item.company}</h3>
                    <ul className="exp__bullets">
                      {item.bullets.map((b, bi) => (
                        <li className="exp__bullet" key={bi}>
                          <span className="exp__bullet-icon">
                            <i className="bx bx-check"></i>
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/*===== FEATURED PROJECTS =====*/}
        <section className="projects section" id="projects">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects__container bd-grid">
            <div className="projects__grid">
              {FEATURED_PROJECTS.map((project, index) => (
                <article className="project-card" key={index}>
                  <div className="project-card__banner">
                    <i className={`${project.icon} project-card__icon`}></i>
                    <span className="project-card__tag">{project.tag}</span>
                  </div>
                  <div className="project-card__body">
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.description}</p>
                    <div className="project-card__tech">
                      {project.tech.map((item, i) => (
                        <span key={i}>{item}</span>
                      ))}
                    </div>
                    <div className="project-card__links">
                      <a
                        href={project.live}
                        className="project-card__link project-card__link--primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bx bx-link-external"></i> Live Demo
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/*===== QUALIFICATION =====*/}
        <section className="qualification section" id="qualification">
          <h2 className="section-title">Education &amp; Qualifications</h2>
          <p className="section-lead">
            A foundation built across engineering, computer science, and
            continuous self-learning in modern software development.
          </p>
          <div className="qualification__container bd-grid">
            <div className="qual__grid">
              {QUALIFICATIONS.map((item, i) => (
                <article className="qual__card" key={i}>
                  <div className="qual__icon-wrap">
                    <i className={item.icon}></i>
                  </div>
                  <div className="qual__body">
                    <span className="qual__date">
                      <i className="bx bx-calendar"></i> {item.date}
                    </span>
                    <h3 className="qual__title">{item.title}</h3>
                    <p className="qual__subtitle">{item.subtitle}</p>
                    {item.note && (
                      <p className="qual__note">{item.note}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="certifications">
              <div className="certifications__header">
                <div className="certifications__icon">
                  <i className="bx bxs-award"></i>
                </div>
                <div>
                  <h3 className="certifications__title">Certifications</h3>
                  <p className="certifications__subtitle">
                    Continuous learning across modern frontend, full stack &amp; design.
                  </p>
                </div>
              </div>
              <div className="certifications__list">
                {CERTIFICATIONS.map((c, i) => (
                  <span className="certifications__chip" key={i}>
                    <i className="bx bxs-check-shield"></i> {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/*===== CONTACT =====*/}
        <section className="contact section" id="contact">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-lead">
            Open to Software Developer, Full Stack, and AI Engineering roles —
            and excited to help build impactful products. Reach out through any
            channel below.
          </p>
          <div className="contact__container bd-grid">
            <div className="contact__cta">
              <div className="contact__cta-content">
                <span className="contact__cta-tag">
                  <span className="home__badge-dot"></span> Available for work
                </span>
                <h3 className="contact__cta-title">
                  Have a project, role, or idea in mind?
                </h3>
                <p className="contact__cta-desc">
                  I usually reply within a few hours. Whether it's a
                  full-time role, freelance project, or AI-powered product
                  build — let's talk.
                </p>
                <div className="contact__cta-buttons">
                  <a
                    href="mailto:rgunasekar1608@gmail.com"
                    className="button"
                  >
                    <i className="bx bxs-envelope"></i> Send a message
                  </a>
                  <a
                    href="https://wa.me/916374463809"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button--ghost button--ghost-dark"
                  >
                    <i className="bx bxl-whatsapp"></i> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="contact__grid">
              {CONTACT_METHODS.map((c, i) => {
                const Inner = (
                  <>
                    <div className="contact__card-icon">
                      <i className={c.icon}></i>
                    </div>
                    <div className="contact__card-body">
                      <span className="contact__card-label">{c.label}</span>
                      <span className="contact__card-value">{c.value}</span>
                    </div>
                    {c.href && <i className="bx bx-right-arrow-alt contact__card-arrow"></i>}
                  </>
                );
                if (c.href) {
                  return (
                    <a
                      key={i}
                      href={c.href}
                      className="contact__card"
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                    >
                      {Inner}
                    </a>
                  );
                }
                return (
                  <div key={i} className="contact__card contact__card--static">
                    {Inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* <!--==================== FOOTER ====================--> */}
      <div className="footer">
        <div className="footer__bg  bd-grid ">
          <div className="footer__container">
            <div className="footer__column">
              <h1 className="footer__title">Gunasekar</h1>
              <span className="footer__subtitle">
                Software &amp; Full Stack Developer
              </span>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                Building scalable, high-performance web applications with
                modern frontend, full stack, and AI-powered solutions.
              </p>
              <div className="footer__social-links">
                <a
                  href="https://github.com/GunasekarRajeshkumar"
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <i className="uil uil-github-alt"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/guna-sekar-008264290/"
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <i className="uil uil-linkedin-alt"></i>
                </a>
                <a
                  href="mailto:rgunasekar1608@gmail.com"
                  className="footer__social-link"
                  title="Email"
                >
                  <i className="uil uil-envelope-alt"></i>
                </a>
                <a
                  href="https://wa.me/916374463809"
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                >
                  <i className="uil uil-whatsapp"></i>
                </a>
                <a
                  href="tel:+916374463809"
                  className="footer__social-link"
                  title="Phone"
                >
                  <i className="uil uil-phone-alt"></i>
                </a>
              </div>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Quick Links</h3>
              <ul className="footer__links">
                <li>
                  <a href="#home" className="footer__link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="footer__link">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="footer__link">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" className="footer__link">
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Services</h3>
              <ul className="footer__links">
                <li>
                  <a href="#experiance" className="footer__link">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#contact" className="footer__link">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://drive.google.com/file/d/1ko5etRBO5Y9C-r8rRpu0aRWI8d-JqYvU/view?usp=sharing"
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Contact Info</h3>
              <ul className="footer__links">
                <li
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.9rem",
                  }}
                >
                  <i
                    className="uil uil-phone"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  (+91) 6374463809
                </li>
                <li
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.9rem",
                  }}
                >
                  <i
                    className="uil uil-envelope"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  rgunasekar1608@gmail.com
                </li>
                <li
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.9rem",
                  }}
                >
                  <i
                    className="uil uil-map-marker"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Madurai, Tamil Nadu
                </li>
              </ul>
            </div>
          </div>
          <p className="footer__copy" data-reveal>
            &#169; 2026 Gunasekar. All rights reserved.
          </p>
        </div>
      </div>

      {/*===== SCROLL TO TOP =====*/}
      <button
        className={`scroll-top ${showScrollTop ? "scroll-top--visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="bx bx-up-arrow-alt"></i>
      </button>

      {/* <!--==================== AI BOT ====================--> */}
      <AIBot />
    </div>
  );
};

export default App;
