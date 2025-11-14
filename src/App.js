import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import "./App.css";
import Guna from "./img/guna.png";
import GunaAbout from "./img/guna-4.jpg";
import work1 from "./img/work1.png";
import work2 from "./img/work2.png";
import work3 from "./img/work3.png";
import work4 from "./img/work4.png";
import work5 from "./img/work5.png";
import work6 from "./img/work6.png";
import work7 from "./img/work7.png";

import emailjs from "@emailjs/browser";

const App = () => {
  useEffect(() => {
    // ScrollReveal setup
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 2000,
      delay: 200,
    });

    sr.reveal(
      ".home__data, .about__img, .skills__subtitle, .skills__text ,.services ",
      {}
    );
    sr.reveal(
      ".home__img, .about__subtitle, .about__text, .about__info, .skills__img, .qualification__section ",
      {
        delay: 400,
      }
    );
    sr.reveal(".home__social-icon  ,.qualification__data", {
      interval: 200,
    });
    sr.reveal(".skills__data, .work__img, .contact__input ", { interval: 200 });

    // Scroll active link logic
    const sections = document.querySelectorAll("section[id]");

    const scrollActive = () => {
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
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
    };
  }, []);

  const [activeModal, setActiveModal] = useState(null);

  // Function to open the modal
  const openModal = (index) => {
    setActiveModal(index);
  };

  // Function to close the modal
  const closeModal = () => {
    setActiveModal(null);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qijomwk",
        "template_ajft70f",
        form.current,
        "3vIQ9tFAchty4PN8u"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Message sent successfully! We will get back to you soon.");
          form.current.reset(); // Reset form after successful submission
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert(
            `Failed to send message: ${error.text}. Please check your input and try again.`
          );
        }
      );
  };

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);

  const texts = [
    "Software Developer",
    "AI-Powered Developer",
    "Front End Developer",
    "Web Developer",
  ];
  const typingSpeed = isDeleting ? 100 : 150;
  const pauseTime = 1000; // Time before starting next text

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[loop % texts.length];
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
  }, [text, index, isDeleting, loop]);

  return (
    <div>
      {/*===== HEADER =====*/}
      <header className="l-header">
        <nav className="nav bd-grid">
          <div>
            <a href="#" className="nav__logo">
              Guna.
            </a>
          </div>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link active-link">
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">
                  About
                </a>
              </li>
              <li className="nav__item">
                <a href="#skills" className="nav__link">
                  Skills
                </a>
              </li>
              <li className="nav__item">
                <a href="#experiance" className="nav__link">
                  Experiance
                </a>
              </li>
              <li className="nav__item">
                <a href="#services" className="nav__link">
                  Services
                </a>
              </li>
              <li className="nav__item">
                <a href="#work" className="nav__link">
                  Work
                </a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">
                  Contact
                </a>
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
              href="https://drive.google.com/file/d/1YmqrDVSlobqqUd-KO7ThgQUgugdj9O4d/view?usp=sharing"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>

          <div className="home__social">
            <a
              href="https://linkedin.com/in/gunasekar-rajeshkumar"
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
                <image class="home__blob-img" x="50" y="60" href={Guna} />
              </g>
            </svg>
          </div>
        </section>
        {/* ==========Scrole========= */}
        <div class="home__scroll bd-grid">
          <a href="#about" class="home__scroll-button button--flex">
            <i class="bx bx-mouse"></i>{" "}
            <span class="home__scroll-name">Scroll Down</span>
            <i class="bx bx-down-arrow-alt"></i>{" "}
          </a>
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
                  <span class="about__info-title">2.8+</span>
                  <span class="about__info-name">
                    Years <br></br> experience
                  </span>
                </div>
                <div className="about_card">
                  <span class="about__info-title">12+</span>
                  <span class="about__info-name">
                    Completed <br></br> certifications
                  </span>
                </div>
                <div className="about_card">
                  <span class="about__info-title">2</span>
                  <span class="about__info-name">
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
        <section class="qualification__section" id="experiance">
          <h2 class="section-title">Experiance</h2>

          <div class="qualification__container bd-grid">
            <div class="qualification__sections">
              {/* <!--==================== Experiance CONTENT 1 ====================--> */}
              <div
                class="qualification__content qualification__active"
                data-content
                id="education"
              >
                {/* <!--==================== experiance ====================-->  */}
                <div class="qualification__data mobile_qualification__data">
                  <div className="qualification__data_Left">
                    <h3 class="qualification__title">Digital Regenesys </h3>
                    <span class="qualification__subtitle">
                      Web Developer (2023)
                    </span>
                    <div class="qualification__calendar passage">
                      <i class="uil uil-calendar-alt"></i>I currently work as a
                      Software and Frontend Developer with 2+ years of
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
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                  </div>
                </div>

                {/* <!--==================== Experiance====================-->  */}
                <div class="qualification__data mobile_qualification__data">
                  <div></div>
                  <div className="mobile_qualification__hide">
                    <span class="qualification__rounder"></span>
                    {/* <!-- <span class="qualification__line"></span> --> */}
                  </div>

                  <div>
                    <h3 class="qualification__title">MavenCart</h3>
                    <span class="qualification__subtitle">
                      Software Developer Intern(2022 - 2023)
                    </span>
                    <div class="qualification__calendar passage">
                      <i class="uil uil-calendar-alt"></i>During my internship,
                      I gained hands-on experience in frontend development,
                      where I worked with HTML, CSS, JavaScript, React.js
                      fundamentals, and component-based architecture. I
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

        {/* <!--==================== SERVICES ====================--> */}
        <section className="services section" id="services">
          <h2 className="section-title">Services</h2>
          <div className="services__container bd-grid">
            {/* Service 2 */}
            <div className="services__content">
              <div>
                <i class="bx bx-code-alt  skills__icon"></i>{" "}
                <h3 className="services__title">
                  Software<br></br> Development
                </h3>
              </div>
              <span
                className="button button--flex button--small button--link services__button"
                onClick={() => openModal(2)}
              >
                View more
                <i className="uil uil-arrow-right button__icon"></i>
              </span>

              {/* Modal for Service 2 */}
              {activeModal === 2 && (
                <div className="services__modal active-modal">
                  <div className="services__modal-content">
                    <h4 className="services__modal-title">Development</h4>
                    <i
                      class="bx bxs-x-square  services__modal-close"
                      onClick={closeModal}
                    ></i>
                    <ul className="services__modal-services grid">
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>
                          I have experience working with React.js and Next.js
                          for front-end development.
                        </p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>
                          I am proficient in full-stack web development and can
                          manage all tasks efficiently, ensuring timely
                          delivery.
                        </p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>
                          I have hands-on experience in digital marketing tasks,
                          including SEO, crawling, Google bot optimization, and
                          using tools like Google Tag Manager (GTM).
                        </p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>
                          I possess a foundational understanding of databases,
                          cloud technologies, deployments, and working on MERN
                          stack projects.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* Service 1 */}
            <div className="services__content">
              <div>
                <i class="bx bx-code-curly skills__icon"></i>
                <h3 className="services__title">
                  Revamp <br></br> Full Websites
                </h3>
              </div>
              <span
                className="button button--flex button--small button--link services__button"
                onClick={() => openModal(1)}
              >
                View more
                <i className="uil uil-arrow-right button__icon"></i>
              </span>

              {/* Modal for Service 1 */}
              {activeModal === 1 && (
                <div className="services__modal active-modal">
                  <div className="services__modal-content">
                    <h4 className="services__modal-title">Revamps</h4>
                    <i
                      class="bx bxs-x-square  services__modal-close"
                      onClick={closeModal}
                    ></i>
                    <ul className="services__modal-services grid">
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>Revamp entire websites.</p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>
                          I have extensive experience in redesigning and
                          revamping projects.
                        </p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>I accurately recreate the UI during development.</p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>Ensure the code is clean and well-structured.</p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>Improve best practices and optimize performance.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* Service 1 */}
            <div className="services__content">
              <div>
                <i class="bx bx-credit-card-alt skills__icon"></i>
                <h3 className="services__title">
                  Creating <br></br> Landing pages
                </h3>
              </div>
              <span
                className="button button--flex button--small button--link services__button"
                onClick={() => openModal(3)}
              >
                View more
                <i className="uil uil-arrow-right button__icon"></i>
              </span>

              {/* Modal for Service 1 */}
              {activeModal === 3 && (
                <div className="services__modal active-modal">
                  <div className="services__modal-content">
                    <h4 className="services__modal-title">Landing Pages</h4>
                    <i
                      class="bx bxs-x-square  services__modal-close"
                      onClick={closeModal}
                    ></i>
                    <ul className="services__modal-services grid">
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>
                          Develop Dynamic Routing for Landing Pages in Next.js
                          and React JS .
                        </p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>Landing Pages for Marketing Purposes</p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>Use or Integrate CMS for Dynamic Content</p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>Portfolio-Based Landing Pages</p>
                      </li>
                      <li className="services__modal-service">
                        <i className="uil uil-check-circle services__modal-icon"></i>
                        <p>Optimize Landing Pages for Conversion</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <!--==================== PROJECT IN MIND ====================--> */}
          <section class="project section bd-grid">
            <div class="project__bg">
              <div class="project__container container grid">
                <div class="project__data">
                  <h2 class="project__title">You have a new project?</h2>
                  <p class="project__description">
                    If you have a web development project in mind, don’t
                    hesitate to reach out!<br></br> I’m here to help bring your
                    ideas to life.
                  </p>
                  <a href="#contact" class="button-contact">
                    Contact me
                    <i class="bx bxs-send"></i>{" "}
                  </a>
                </div>
                {/* <!-- <img src="assets/img/project.png" alt="" class="project__img"> --> */}
              </div>
            </div>
          </section>
        </section>

        {/*===== WORK =====*/}
        <section className="work section" id="work">
          <h2 className="section-title">Work</h2>
          <div className="work__container bd-grid">
            {[
              {
                src: work1,
                link: "https://github.com/Gunasekar16082001/Gym-web-DarkGym",
              },
              {
                src: work2,
                link: "https://github.com/Gunasekar16082001/movie-app-guna.git",
              },
              {
                src: work3,
                link: "https://github.com/Gunasekar16082001/Tn-toursim",
              },
              {
                src: work4,
                link: "https://github.com/Gunasekar16082001/image-search-engine-opearater",
              },
              {
                src: work5,
                link: "https://github.com/Gunasekar16082001/XO-game-gs",
              },
              {
                src: work6,
                link: "https://github.com/Gunasekar16082001/Expense-Tracker.git",
              },
              {
                src: work7,
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
        <section class="qualification__section">
          <h2 class="section-title">Qualification</h2>

          <div class="qualification__container bd-grid">
            <div class="qualification__sections">
              {/* <!--==================== QUALIFICATION CONTENT 1 ====================--> */}
              <div
                class="qualification__content qualification__active"
                data-content
                id="education"
              >
                {/* <!--==================== QUALIFICATION 1 ====================-->  */}
                <div class="qualification__data">
                  <div className="qualification__data_Left">
                    <h3 class="qualification__title">
                      Bachelor of Engineering
                    </h3>
                    <span class="qualification__subtitle">
                      Mechanical Engineering
                    </span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      Velammal college of engineering and technology (2019 -
                      2023)
                    </div>
                  </div>

                  <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                  </div>
                </div>

                {/* <!--==================== QUALIFICATION 2 ====================-->  */}
                <div class="qualification__data">
                  <div></div>
                  <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                  </div>

                  <div>
                    <h3 class="qualification__title">
                      CSC Computer Education{" "}
                    </h3>
                    <span class="qualification__subtitle">
                      Advanced Diploma in Java Programming (ADJP){" "}
                    </span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      2018 - 2019
                    </div>
                  </div>
                </div>

                {/* <!--==================== QUALIFICATION 3 ====================-->  */}
                <div class="qualification__data">
                  <div className="qualification__data_Left">
                    <h3 class="qualification__title">
                      Sethupati Higher Secondary School{" "}
                    </h3>
                    <span class="qualification__subtitle">
                      Computer Science{" "}
                    </span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      2017 - 2019
                    </div>
                  </div>

                  <div>
                    <span class="qualification__rounder"></span>
                    <span class="qualification__line"></span>
                  </div>
                </div>

                {/* <!--==================== QUALIFICATION 4 ====================-->  */}
                <div class="qualification__data">
                  <div></div>
                  <div>
                    <span class="qualification__rounder"></span>
                    {/* <!-- <span class="qualification__line"></span> --> */}
                  </div>

                  <div>
                    <h3 class="qualification__title">
                      Thiagarajar Model Higher Secondary School{" "}
                    </h3>
                    <span class="qualification__subtitle">High School </span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      2017
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--==================== CONTACT ME ====================--> */}
        <section class="contact section" id="contact">
          <h2 class="section-title">Contact me</h2>

          <div class="contact__container bd-grid grid">
            <div>
              <div class="contact__information">
                <i class="uil uil-phone-alt contact__icon"></i>

                <div>
                  <h3 class="contact__title">Call me</h3>
                  <span class="contatc__subtitle">(+91) 6374463809</span>
                </div>
              </div>

              <div class="contact__information">
                <i class="uil uil-envelope contact__icon"></i>

                <div>
                  <h3 class="contact__title">E-mail</h3>
                  <span class="contatc__subtitle">
                    rgunasekar1608@gmail.com
                  </span>
                </div>
              </div>

              <div class="contact__information">
                <i class="uil uil-map-marker contact__icon"></i>

                <div>
                  <h3 class="contact__title">Location</h3>
                  <span class="contatc__subtitle">Madurai, Tamil nadu</span>
                </div>
              </div>
            </div>

            <form
              className="contact__form grid"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="contact__inputs grid">
                <div className="contact__content">
                  <label className="contact__label">Name</label>
                  <input
                    type="text"
                    className="contact__input"
                    name="name"
                    required
                  />
                </div>

                <div className="contact__content">
                  <label className="contact__label">E-mail</label>
                  <input
                    type="email"
                    className="contact__input"
                    name="email"
                    required
                  />
                </div>
              </div>

              <div className="contact__content">
                <label className="contact__label">Phone number</label>
                <input
                  type="text"
                  className="contact__input"
                  name="phone"
                  required
                />
              </div>

              <div className="contact__content">
                <label className="contact__label">Description</label>
                <textarea
                  className="contact__input"
                  name="message"
                  rows="7"
                  required
                ></textarea>
              </div>

              <button type="submit" className="button button--flex">
                Send message
                <i className="uil uil-message button__icon"></i>
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* <!--==================== FOOTER ====================--> */}
      <div class="footer">
        <div class="footer__bg  bd-grid ">
          <div class="footer__container">
            <div>
              <h1 class="footer__title">Gunasekar</h1>
              <span class="footer__subtitle">Front-End Developer</span>
            </div>

            <ul class="footer__links">
              <li>
                <a href="#services" class="footer__link">
                  Services
                </a>
              </li>
              <li>
                <a href="#work" class="footer__link">
                  Works
                </a>
              </li>
              <li>
                <a href="#contact" class="footer__link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <p class="footer__copy">&#169; Guna. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
