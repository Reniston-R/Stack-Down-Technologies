"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);

  useEffect(() => {
    // Navbar background on scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavScrolled(true);
      } else {
        setIsNavScrolled(false);
      }

      // Scroll Reveal Animation
      const revealElements = document.querySelectorAll("[data-reveal]");
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const delay = element.getAttribute("data-delay") || 0;

        if (elementTop < windowHeight - revealPoint) {
          setTimeout(() => {
            element.classList.add("revealed");
          }, delay);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <>
      <nav
        className="navbar"
        style={{
          background: isNavScrolled ? "rgba(5, 5, 8, 0.95)" : "rgba(5, 5, 8, 0.8)",
          boxShadow: isNavScrolled ? "0 4px 20px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <div className="logo">
          <a href="#home" className="logo-link">
            <svg
              className="logo-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 300 65"
              role="img"
              aria-label="Stack Down Technologies"
            >
              {/* Bars left of square */}
              <rect x="4" y="24" width="2.2" height="17" rx="1" fill="#FF6B00" opacity="0.20" />
              <rect x="9" y="19" width="2.2" height="27" rx="1" fill="#FF6B00" opacity="0.36" />
              <rect x="14" y="15" width="2.2" height="35" rx="1" fill="#FF6B00" opacity="0.52" />
              <rect x="19" y="10" width="2.2" height="45" rx="1" fill="#FF6B00" opacity="0.70" />
              <rect x="24" y="6" width="2.2" height="53" rx="1" fill="#FF6B00" opacity="0.88" />
              {/* Solid orange square */}
              <rect x="29" y="3" width="44" height="59" rx="2" fill="#FF6B00" />
              {/* Bars right of square */}
              <rect x="76" y="6" width="2.2" height="53" rx="1" fill="#FF6B00" opacity="0.88" />
              <rect x="81" y="10" width="2.2" height="45" rx="1" fill="#FF6B00" opacity="0.70" />
              <rect x="86" y="15" width="2.2" height="35" rx="1" fill="#FF6B00" opacity="0.52" />
              <rect x="91" y="19" width="2.2" height="27" rx="1" fill="#FF6B00" opacity="0.36" />
              <rect x="96" y="24" width="2.2" height="17" rx="1" fill="#FF6B00" opacity="0.20" />
              {/* Stack Down */}
              <text x="110" y="31" fontFamily="Raleway, sans-serif" fontWeight="800" fontSize="21" fill="#FFFFFF">
                Stack Down
              </text>
              {/* Technologies */}
              <text x="110" y="54" fontFamily="Raleway, sans-serif" fontWeight="700" fontSize="17" fill="#FFFFFF">
                Technologies
              </text>
            </svg>
          </a>
        </div>
        <ul className={`nav-links ${isNavActive ? "active" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#vision">Vision</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#contact" className="btn btn-primary">
              Get Started
            </a>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleNav}>
          <i className={`fas ${isNavActive ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero-content">
          <h1>
            Transforming Your ideas into
            <br />
            <span className="gradient-text">digital reality</span>
          </h1>
          <p className="subtitle">Empowering growth from small businesses to high-scale enterprises.</p>
          <div className="cta-buttons">
            <a href="#services" className="btn btn-primary">
              Our Services
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
        <div className="hero-graphics">
          <div className="glass-card float-1">
            <i className="fas fa-chart-line"></i>
            <p>Growth +124%</p>
          </div>
          <div className="glass-card float-2">
            <i className="fas fa-robot"></i>
            <p>AI Agents Active</p>
          </div>
          <div className="wave-circle"></div>
        </div>
      </header>

      <section id="vision" className="vision">
        <div className="vision-container glass-panel" data-reveal="zoom-in">
          <h2>
            Our Company <span className="highlight">Vision</span>
          </h2>
          <p className="vision-statement">&quot;Transforming Your ideas into digital reality&quot;</p>
          <p className="vision-desc">
            We bridge the gap between imagination and execution. Whether you are a small business taking your first step
            or a high-scale enterprise pushing technological boundaries, we provide the ultimate SaaS infrastructure to
            fuel your digital journey.
          </p>
        </div>
      </section>

      <section id="services" className="services">
        <div className="section-header">
          <h2>
            Our <span className="highlight">Services</span>
          </h2>
          <p>Comprehensive digital solutions tailored for your scale.</p>
        </div>
        <div className="services-grid">
          <div className="service-card" data-reveal="fade-up">
            <div className="icon-wrapper">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3>Digital Marketing</h3>
            <p>Data-driven strategies to elevate your brand presence and drive high-quality conversions.</p>
          </div>
          <div className="service-card" data-reveal="fade-up" data-delay="400">
            <div className="icon-wrapper">
              <i className="fas fa-code"></i>
            </div>
            <h3>Web Development</h3>
            <p>
              Custom, high-performance websites and web applications built with modern technologies to deliver exceptional
              user experiences.
            </p>
          </div>
          <div className="service-card" data-reveal="fade-up" data-delay="100">
            <div className="icon-wrapper">
              <i className="fas fa-cogs"></i>
            </div>
            <h3>Automations</h3>
            <p>Streamline your workflow with robust automation tools, freeing up time for what matters.</p>
          </div>
          <div className="service-card" data-reveal="fade-up" data-delay="200">
            <div className="icon-wrapper">
              <i className="fas fa-paint-brush"></i>
            </div>
            <h3>Graphic Design</h3>
            <p>Visual storytelling crafted by experts to make your digital identity unforgettable.</p>
          </div>
          <div className="service-card" data-reveal="fade-up" data-delay="300">
            <div className="icon-wrapper">
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI Agents</h3>
            <p>Intelligent AI systems integrated into your business to enhance efficiency and customer support.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="section-header">
          <h2>
            About <span className="highlight">Us</span>
          </h2>
          <p>Who we are and what drives us.</p>
        </div>
        <div className="about-grid">
          <div className="about-text" data-reveal="fade-up">
            <p>
              At Stack Down Technologies, we believe in the power of technology to empower businesses. We are a
              passionate team of developers, designers, and strategists dedicated to delivering high-quality SaaS
              solutions and digital marketing strategies.
            </p>
            <p>
              Whether you&apos;re a small startup or a large enterprise, we provide the tools and expertise to scale your
              operations efficiently and sustainably.
            </p>
          </div>
          <div className="about-stats" data-reveal="fade-up" data-delay="200">
            <div className="stat-box">
              <h3>500+</h3>
              <p>Projects Delivered</p>
            </div>
            <div className="stat-box">
              <h3>98%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="section-header">
          <h2>
            Contact <span className="highlight">Us</span>
          </h2>
          <p>Let&apos;s turn your vision into reality.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info" data-reveal="fade-up">
            <h3>Get In Touch</h3>
            <p>We&apos;d love to hear from you. Drop us a message and our team will get back to you shortly.</p>
            <div className="info-items">
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <span>stackdowntechnologies.com</span>
              </div>
              <div className="info-item">
                <i className="fas fa-phone-alt"></i>
                <span>+91 8883793681</span>
              </div>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Tuticorin City</span>
              </div>
            </div>
          </div>
          <form className="contact-form" data-reveal="fade-up" data-delay="200">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <svg
              className="footer-logo-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 340 88"
              role="img"
              aria-label="Stack Down Technologies"
            >
              <rect x="4" y="29" width="2.5" height="22" rx="1" fill="#FF6B00" opacity="0.20" />
              <rect x="10" y="23" width="2.5" height="34" rx="1" fill="#FF6B00" opacity="0.36" />
              <rect x="16" y="17" width="2.5" height="46" rx="1" fill="#FF6B00" opacity="0.52" />
              <rect x="22" y="11" width="2.5" height="58" rx="1" fill="#FF6B00" opacity="0.70" />
              <rect x="28" y="6" width="2.5" height="68" rx="1" fill="#FF6B00" opacity="0.88" />
              <rect x="34" y="3" width="52" height="74" rx="2" fill="#FF6B00" />
              <rect x="89" y="6" width="2.5" height="68" rx="1" fill="#FF6B00" opacity="0.88" />
              <rect x="95" y="11" width="2.5" height="58" rx="1" fill="#FF6B00" opacity="0.70" />
              <rect x="101" y="17" width="2.5" height="46" rx="1" fill="#FF6B00" opacity="0.52" />
              <rect x="107" y="23" width="2.5" height="34" rx="1" fill="#FF6B00" opacity="0.36" />
              <rect x="113" y="29" width="2.5" height="22" rx="1" fill="#FF6B00" opacity="0.20" />
              <text x="130" y="38" fontFamily="Raleway, sans-serif" fontWeight="800" fontSize="26" fill="#FFFFFF">
                Stack Down
              </text>
              <text x="130" y="64" fontFamily="Raleway, sans-serif" fontWeight="700" fontSize="21" fill="#FFFFFF">
                Technologies
              </text>
              <text
                x="130"
                y="82"
                fontFamily="Raleway, sans-serif"
                fontWeight="500"
                fontSize="11"
                fontStyle="italic"
                fill="#FF8C00"
              >
                Transform Your Ideas Into Digital Reality
              </text>
            </svg>
            <p>Empowering the future of business with cutting-edge tech.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#vision">Vision</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Stack Down Technologies Pvt. Ltd. | All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
