import React from "react";
import {
  Smartphone,
  Wifi,
  Tv,
  Zap,
  GraduationCap,
  Gift,
  ArrowUpRight,
  ShieldCheck,
  Menu,
  Globe,
  Headphones
} from "lucide-react";

const services = [
  { name: "Buy Airtime", detail: "Recharge any supported network", icon: Smartphone },
  { name: "Buy Data", detail: "Affordable data bundles", icon: Wifi },
  { name: "Data Gifting", detail: "Send data to another number", icon: Gift },
  { name: "Electricity", detail: "Pay your electricity bills", icon: Zap },
  { name: "Cable TV", detail: "Renew your TV subscription", icon: Tv },
  { name: "Exam Pins", detail: "Education PINs and vouchers", icon: GraduationCap }
];

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon">S</span>
          <span>
            <strong>SODIQ <b>TELECOM</b></strong>
            <small>SERVICES 2027</small>
          </span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#support">Support</a>
        </nav>

        <a className="login-btn" href="#account">Get Started <ArrowUpRight size={16} /></a>
        <button className="menu-btn" aria-label="Menu"><Menu /></button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="live-dot"></span>
              THE NEXT GENERATION OF DIGITAL SERVICES
            </div>

            <h1>
              Your Digital Life.<br />
              <span>One Platform.</span>
            </h1>

            <p>
              Welcome to a smarter way to stay connected.
              Explore digital services, manage transactions
              and enjoy a simpler experience.
            </p>

            <div className="hero-actions">
              <a href="#services" className="gold-btn">Explore Services <ArrowUpRight size={18} /></a>
              <a href="#about" className="outline-btn">Discover SODIQ</a>
            </div>

            <div className="hero-note">
              <ShieldCheck size={17} />
              Built for a smarter digital experience
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="logo-glow">
              <span>S</span>
            </div>
            <div className="floating-card card-top">
              <Wifi size={18} />
              <span>Stay Connected</span>
            </div>
            <div className="floating-card card-bottom">
              <ShieldCheck size={18} />
              <span>Digital Convenience</span>
            </div>
          </div>
        </section>

        <section className="stats">
          <div><strong>01</strong><span>One platform</span></div>
          <div><strong>24/7</strong><span>Digital access</span></div>
          <div><strong>₦</strong><span>Naira payments</span></div>
          <div><strong>∞</strong><span>Possibilities</span></div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <div>
              <span className="section-label">WHAT WE OFFER</span>
              <h2>Explore Our <span>Services</span></h2>
              <p>Everyday digital services, brought together in one place.</p>
            </div>
            <span className="service-count">OUR SERVICE HUB / 2027</span>
          </div>

          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.name}>
                  <div className="service-number">0{index + 1}</div>
                  <div className="service-icon"><Icon size={25} /></div>
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                  <span className="service-arrow"><ArrowUpRight size={19} /></span>
                </article>
              );
            })}
          </div>
          <p className="catalogue-note">
            Service availability and supported products will be confirmed before transactions are enabled.
          </p>
        </section>

        <section className="divisions" id="about">
          <span className="section-label">THE SODIQ ECOSYSTEM</span>
          <h2>More Than A <span>Telecom Platform.</span></h2>
          <p className="division-intro">
            A connected ecosystem designed for customers, businesses and developers.
          </p>

          <div className="division-grid">
            <a href="/business" className="division-card">
              <Globe size={25} />
              <h3>SODIQ BUSINESS</h3>
              <p>Business and reseller services.</p>
              <ArrowUpRight />
            </a>
            <a href="/developers" className="division-card">
              <Smartphone size={25} />
              <h3>SODIQ API HUB</h3>
              <p>Tools and integrations for developers.</p>
              <ArrowUpRight />
            </a>
            <a href="/admin" className="division-card">
              <ShieldCheck size={25} />
              <h3>SODIQ ADMIN</h3>
              <p>Central platform administration.</p>
              <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="support-banner" id="support">
          <div>
            <Headphones size={30} />
            <h2>We're Here To Help.</h2>
            <p>Need assistance? Contact our support team.</p>
          </div>
          <a
            href="https://wa.me/2348114095631"
            target="_blank"
            rel="noreferrer"
            className="gold-btn"
          >
            Contact Support <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#">
          <span className="brand-icon">S</span>
          <span>
            <strong>SODIQ <b>TELECOM</b></strong>
            <small>SERVICES 2027</small>
          </span>
        </a>
        <p>A New Generation of Digital Services.</p>
        <span className="copyright">© 2027 SODIQ TELECOM SERVICES. Built by Ogunlowo Sodiq.</span>
      </footer>
    </div>
  );
}

export default App;
