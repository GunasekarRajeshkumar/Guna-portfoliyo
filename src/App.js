import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import GunaAbout from "./img/guna-4.jpg";
import work1 from "./img/work1.png";
import work2 from "./img/work2.png";
import work3 from "./img/work3.png";
import work4 from "./img/work4.png";
import work5 from "./img/work5.png";
import work6 from "./img/work6.png";
import work7 from "./img/work7.png";
import AIBot from "./components/AIBot";


const TYPING_TEXTS = [
  "Software Developer",
  "AI-Powered Developer",
  "Front End Developer",
  "Web Developer",
];

const App = () => {
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

  useEffect(() => {
    // ScrollReveal setup - removed for custom animations
    // Home section animations are handled via CSS animations

    // Scroll-triggered animations for sections and boxes
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
      section.classList.add("section");
    });

    // Observe all section boxes
    const sectionBoxes = document.querySelectorAll(
      ".about__container, .tech-stack__container, .qualification__container, .work__container, .contact__container"
    );
    sectionBoxes.forEach((box) => {
      observer.observe(box);
    });

    // Observe about image separately for smooth animation
    const aboutImages = document.querySelectorAll(".about__img");
    aboutImages.forEach((img) => {
      observer.observe(img);
    });

    // Observe qualification data items
    const qualificationData = document.querySelectorAll(".qualification__data");
    qualificationData.forEach((item, index) => {
      observer.observe(item);
    });

    // Scroll active link logic
    const sectionElements = document.querySelectorAll("section[id]");

    const scrollActive = () => {
      const scrollY = window.pageYOffset;

      sectionElements.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute("id");

        // Select the corresponding nav link
        const navLink = document.querySelector(
          `.nav__link[href*=${sectionId}]`
        );

        // Check if navLink exists before trying to access classList
        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add("active-link");
          } else {
            navLink.classList.remove("active-link");
          }
        }
      });
    };

    window.addEventListener("scroll", scrollActive);

    return () => {
      window.removeEventListener("scroll", scrollActive);
      observer.disconnect();
    };
  }, []);


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
                  onClick={() => scrollToSection("experiance")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Experiance
                </button>
              </li>
              <li className="nav__item">
                <button
                  onClick={() => scrollToSection("work")}
                  className="nav__link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Work
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
        <section className="home bd-grid" id="home">
          <div className="home__data">
            <h1 className="home__title">
              Hi,
              <br />
              I'm <span className="home__title-color">Guna</span>
              <br />
              <span className="typing-text">
                {text}
                <span className="blink-cursor">|</span>
              </span>
            </h1>
            <a
              href="https://drive.google.com/file/d/1e00E22eEnqTzX30jjRWTsK1v517t-LAG/view?usp=sharing"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>

          <div className="home__social">
            <a
              href="https://www.linkedin.com/in/guna-sekar-008264290/"
              className="home__social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
            <a
              href="https://github.com/GunasekarRajeshkumar"
              className="home__social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-github"></i>
            </a>
          </div>

          <div className="home__img">
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
          <h2 className="section-title">About</h2>
          <div className="about__container bd-grid">
            <div className="about__img">
              <img src={GunaAbout} alt="" />
            </div>
            <div>
              <h2 className="about__subtitle">I'm Guna</h2>
              <p className="about__text">
                I am a dedicated Software and Frontend Developer with 2.8+ years
                of experience building fast, responsive, and SEO-friendly web
                applications using React.js, Next.js, TypeScript, and modern UI
                frameworks. I also work with AI-driven features, integrating
                intelligent APIs and automation workflows to enhance user
                experiences and create smarter interfaces. I have developed and
                maintained multiple production-level websites with a strong
                focus on performance optimization, clean architecture, and
                scalable component design. I enjoy combining frontend
                engineering with AI innovation to build modern, impactful, and
                user-centric digital products.
              </p>
              <div className="about__info">
                <div className="about_card">
                  <span className="about__info-title">2.8+</span>
                  <span className="about__info-name">
                    Years <br></br> experience
                  </span>
                </div>
                <div className="about_card">
                  <span className="about__info-title">12+</span>
                  <span className="about__info-name">
                    Completed <br></br> certifications
                  </span>
                </div>
                <div className="about_card">
                  <span className="about__info-title">2</span>
                  <span className="about__info-name">
                    companies<br></br>worked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*===== SKILLS =====*/}
        <section className="skills section" id="skills">
          <h2 className="section-title">Core Skills</h2>
          <div className="tech-stack__container bd-grid">
            <div className="tech-stack__wrapper">
              {[
                "React.js",
                "Next.js",
                "Angular",
                "TypeScript",
                "JavaScript (ES6+)",
                "Python",
                "Front End Development",
                "Web Development",
                "Full Stack Development",
                "AI Powered Development",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Material UI",
                "Bootstrap",
                "Performance Optimization",
                "REST API Integration",
                "Strapi (Headless CMS)",
                "Firebase (Realtime DB, Auth, Hosting)",
                "PostGraph",
                "Generative AI (OpenAI / ChatGPT API)",
                "AI Chat UI & Voice Assistant Design",
                "Prompt Engineering",
                "Git & GitHub",
                "NPM / Yarn",
                "Postman / Thunder Client",
                "Netlify",
                "Cursor",
                "GitHub Copilot",
                "V0",
                "Lovely AI Tools & More",
              ].map((skill, index) => (
                <div className="tech-stack__badge" key={index}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <!--==================== Experiance ====================--> */}
        <section className="qualification__section section" id="experiance">
          <h2 className="section-title">Experiance</h2>

          <div className="qualification__container bd-grid">
            <div className="qualification__sections">
              {/* <!--==================== Experiance CONTENT 1 ====================--> */}
              <div
                className="qualification__content qualification__active"
                data-content
                id="education"
              >
                {/* <!--==================== experiance ====================-->  */}
                <div className="qualification__data mobile_qualification__data">
                  <div className="qualification__data_Left">
                    <h3 className="qualification__title">Digital Regenesys </h3>
                    <span className="qualification__subtitle">
                      Software Developer (2023)
                    </span>
                    <div className="qualification__calendar passage">
                      I currently work
                      as a Software and Frontend Developer with 2+ years of
                      experience, specializing in React.js, Next.js, TypeScript,
                      JavaScript, and modern UI/UX implementation. I actively
                      leverage AI tools and integrations to boost
                      productivity—using AI for faster debugging, code
                      optimization, component generation, performance analysis,
                      and smarter development workflows. In my projects, I build
                      high-performance, responsive, and SEO-optimized web
                      applications while implementing AI-driven features such as
                      intelligent automation, predictive user interactions,
                      smart UI components, and API-based enhancements. I focus
                      deeply on code quality, DOM and performance optimization,
                      page-speed improvements, and delivering production-ready
                      solutions that are scalable, secure, and aligned with
                      modern industry standards.
                    </div>
                  </div>

                  <div className="mobile_qualification__hide">
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                  </div>
                </div>

                {/* <!--==================== Experiance====================-->  */}
                <div className="qualification__data mobile_qualification__data">
                  <div></div>
                  <div className="mobile_qualification__hide">
                    <span className="qualification__rounder"></span>
                    {/* <!-- <span className="qualification__line"></span> --> */}
                  </div>

                  <div>
                    <h3 className="qualification__title">MavenCart</h3>
                    <span className="qualification__subtitle">
                      Software Developer Intern(2022 - 2023)
                    </span>
                    <div className="qualification__calendar passage">
                      During my
                      internship, I gained hands-on experience in frontend
                      development, where I worked with HTML, CSS, JavaScript,
                      React.js fundamentals, and component-based architecture. I
                      contributed to building small modules, fixing UI bugs,
                      improving layouts, and understanding real-world
                      development workflows such as API integration, Git version
                      control, and responsive design. My internship helped me
                      build a strong foundation in frontend technologies,
                      problem-solving, and clean coding practices, which shaped
                      my transition into a full-time role where I now combine
                      frontend engineering with AI-driven development.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*===== WORK =====*/}
        <section className="work section" id="work">
          <h2 className="section-title">Work</h2>
          <div className="work__container bd-grid">
            {[
              {
                src: "/megnisiam.png",
                link: "https://maglifewater.com/",
              },
              {
                src: "/jaiso.png",
                link: "https://jaisho.netlify.app/",
              },
              {
                src: "/ai-chat.png",
                link: "https://gu-gu-ai-chat.netlify.app/",
              },
              {
                src: "/dashboard.png",
                link: "https://juspay-dashboard-guna.netlify.app/",
              },
              {
                src: work5,
                link: "https://github.com/Gunasekar16082001/Gym-web-DarkGym",
              },
              {
                src: work6,
                link: "https://github.com/Gunasekar16082001/movie-app-guna.git",
              },
              {
                src: work7,
                link: "https://github.com/Gunasekar16082001/Tn-toursim",
              },
              {
                src: work1,
                link: "https://github.com/Gunasekar16082001/image-search-engine-opearater",
              },
              {
                src: work2,
                link: "https://github.com/Gunasekar16082001/XO-game-gs",
              },
              {
                src: work3,
                link: "https://github.com/Gunasekar16082001/Expense-Tracker.git",
              },
              {
                src: work4,
                link: "https://github.com/Gunasekar16082001/Baby-car-web.git",
              },
            ].map((work, index) => (
              <a href={work.link} className="work__img" key={index}>
                <img src={work.src} alt={`Work ${index + 1}`} />
              </a>
            ))}
          </div>
        </section>

        {/* <!--==================== QUALIFICATION ====================--> */}
        <section className="qualification__section section">
          <h2 className="section-title">Qualification</h2>

          <div className="qualification__container bd-grid">
            <div className="qualification__sections">
              {/* <!--==================== QUALIFICATION CONTENT 1 ====================--> */}
              <div
                className="qualification__content qualification__active"
                data-content
                id="education"
              >
                {/* <!--==================== QUALIFICATION 1 ====================-->  */}
                <div className="qualification__data">
                  <div className="qualification__data_Left">
                    <h3 className="qualification__title">
                      Bachelor of Engineering
                    </h3>
                    <span className="qualification__subtitle">
                      Mechanical Engineering
                    </span>
                    <div className="qualification__calendar">
                      <i className="uil uil-calendar-alt"></i>
                      Velammal college of engineering and technology (2019 -
                      2023)
                    </div>
                  </div>

                  <div>
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                  </div>
                </div>

                {/* <!--==================== QUALIFICATION 2 ====================-->  */}
                <div className="qualification__data">
                  <div></div>
                  <div>
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                  </div>

                  <div>
                    <h3 className="qualification__title">
                      CSC Computer Education{" "}
                    </h3>
                    <span className="qualification__subtitle">
                      Advanced Diploma in Java Programming (ADJP){" "}
                    </span>
                    <div className="qualification__calendar">
                      <i className="uil uil-calendar-alt"></i>
                      2018 - 2019
                    </div>
                  </div>
                </div>

                {/* <!--==================== QUALIFICATION 3 ====================-->  */}
                <div className="qualification__data">
                  <div className="qualification__data_Left">
                    <h3 className="qualification__title">
                      Sethupati Higher Secondary School{" "}
                    </h3>
                    <span className="qualification__subtitle">
                      Computer Science{" "}
                    </span>
                    <div className="qualification__calendar">
                      <i className="uil uil-calendar-alt"></i>
                      2017 - 2019
                    </div>
                  </div>

                  <div>
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                  </div>
                </div>

                {/* <!--==================== QUALIFICATION 4 ====================-->  */}
                <div className="qualification__data">
                  <div></div>
                  <div>
                    <span className="qualification__rounder"></span>
                    {/* <!-- <span className="qualification__line"></span> --> */}
                  </div>

                  <div>
                    <h3 className="qualification__title">
                      Thiagarajar Model Higher Secondary School{" "}
                    </h3>
                    <span className="qualification__subtitle">
                      High School{" "}
                    </span>
                    <div className="qualification__calendar">
                      <i className="uil uil-calendar-alt"></i>
                      2017
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--==================== CONTACT ME ====================--> */}
        <section className="contact section" id="contact">
          <h2 className="section-title">Contact me</h2>

          <div className="contact__container bd-grid grid">
            <div className="contact__info-wrapper">
              <div className="contact__information">
                <i className="uil uil-phone-alt contact__icon"></i>

                <div>
                  <h3 className="contact__title">Call me</h3>
                  <span className="contatc__subtitle">(+91) 6374463809</span>
                </div>
              </div>

              <div className="contact__information">
                <i className="uil uil-envelope contact__icon"></i>

                <div>
                  <h3 className="contact__title">E-mail</h3>
                  <span className="contatc__subtitle">
                    rgunasekar1608@gmail.com
                  </span>
                </div>
              </div>

              <div className="contact__information">
                <i className="uil uil-map-marker contact__icon"></i>

                <div>
                  <h3 className="contact__title">Location</h3>
                  <span className="contatc__subtitle">Madurai, Tamil nadu</span>
                </div>
              </div>
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
              <span className="footer__subtitle">Software Developer</span>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                Building modern, responsive web applications with AI-powered
                features.
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
                  <a href="#work" className="footer__link">
                    Works
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
                    href="https://drive.google.com/file/d/1e00E22eEnqTzX30jjRWTsK1v517t-LAG/view?usp=sharing"
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
          <p className="footer__copy">
            &#169; 2024 Gunasekar. All rights reserved.
          </p>
        </div>
      </div>

      {/* <!--==================== AI BOT ====================--> */}
      <AIBot />
    </div>
  );
};

export default App;
