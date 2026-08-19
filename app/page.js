"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        setSubmitStatus({ type: "error", message: errorData.error || "Failed to send message." });
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <img src="/logo.svg" alt="Stack Down Technologies" className="logo-img" />
            <div className="logo-text-group">
              <span className="logo-name">Stack Down</span>
              <span className="logo-tag">Technologies</span>
            </div>
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
              At <span className="brand-text">Stack Down Technologies</span>, we believe in the power of technology to empower businesses. We are a
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
                <span>stackdown.com</span>
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
          <form className="contact-form" onSubmit={handleSubmit} data-reveal="fade-up" data-delay="200">
            <div className="form-group">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5" 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            {submitStatus.message && (
              <div className={`submit-status ${submitStatus.type}`} style={{ 
                marginBottom: '15px', 
                padding: '10px', 
                borderRadius: '5px',
                backgroundColor: submitStatus.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: submitStatus.type === 'success' ? '#22c55e' : '#ef4444',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {submitStatus.message}
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <a href="#home" className="logo-link">
                <img src="/logo.svg" alt="Stack Down Technologies" className="logo-img footer-logo-img" />
                <div className="logo-text-group">
                  <span className="logo-name footer-logo-name">Stack Down</span>
                  <span className="logo-tag footer-logo-tag">Technologies</span>
                </div>
              </a>
            </div>
            <p className="footer-tagline-italic">Transform Your Ideas Into Digital Reality</p>
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
          <p>&copy; 2026 <span className="brand-text">Stack Down Technologies</span> Pvt. Ltd. | All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
