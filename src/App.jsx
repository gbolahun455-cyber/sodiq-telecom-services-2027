import React, { useEffect, useState } from "react";
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
  Headphones,
  User,
  LogOut,
  Wallet
} from "lucide-react";
import { supabase } from "./supabase";

const services = [
  { name: "Buy Airtime", detail: "Recharge any supported network", icon: Smartphone },
  { name: "Buy Data", detail: "Affordable data bundles", icon: Wifi },
  { name: "Data Gifting", detail: "Send data to another number", icon: Gift },
  { name: "Electricity", detail: "Pay your electricity bills", icon: Zap },
  { name: "Cable TV", detail: "Renew your TV subscription", icon: Tv },
  { name: "Exam Pins", detail: "Education PINs and vouchers", icon: GraduationCap }
];

function App() {
  const [session, setSession] = useState(null);
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadAccount() {
      if (!session?.user) {
        setProfile(null);
        setBalance(0);
        return;
      }

      const userId = session.user.id;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, username, gender, phone, role")
        .eq("id", userId)
        .maybeSingle();

      const { data: walletData } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", userId)
        .maybeSingle();

      setProfile(profileData);
      setBalance(Number(walletData?.balance || 0));
    }

    loadAccount();
  }, [session]);

  function updateForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (busy) return;

    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setMessage("Your passwords do not match.");
        return;
      }

      if (form.password.length < 6) {
        setMessage("Password must contain at least 6 characters.");
        return;
      }

      if (!form.full_name.trim() || !form.username.trim() || !form.phone.trim()) {
        setMessage("Please complete all required fields.");
        return;
      }
    }

    setBusy(true);

    try {
      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            data: {
              full_name: form.full_name.trim(),
              username: form.username.trim(),
              gender: form.gender,
              phone: form.phone.trim()
            },
            emailRedirectTo:
              "https://gbolahun455-cyber.github.io/sodiq-telecom-services-2027/"
          }
        });

        if (error) throw error;

        if (data.session) {
          setMessage("Account created successfully!");
        } else {
          setMessage(
            "Registration successful! Check your email for the confirmation link before logging in."
          );
          setMode("login");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password
        });

        if (error) throw error;

        setMessage("Login successful!");
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setMessage("You have logged out.");
    setMode("login");
  }

  return (
    <div className="app">
      <style>{`
        .account-section {
          padding: 75px 7%;
          background: #0b0b0b;
          color: #fff;
        }
        .account-box {
          max-width: 520px;
          margin: auto;
          padding: 32px;
          border: 1px solid rgba(212,175,55,.35);
          border-radius: 18px;
          background: #141414;
        }
        .account-box h2 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .account-box p {
          color: #aaa;
          line-height: 1.6;
        }
        .account-form {
          display: grid;
          gap: 14px;
          margin-top: 24px;
        }
        .account-form input,
        .account-form select {
          width: 100%;
          padding: 15px;
          border: 1px solid #444;
          border-radius: 9px;
          background: #090909;
          color: white;
          font-size: 15px;
          box-sizing: border-box;
        }
        .account-form button,
        .account-action {
          padding: 15px;
          border: none;
          border-radius: 9px;
          background: #d4af37;
          color: #111;
          font-weight: bold;
          cursor: pointer;
        }
        .account-switch {
          margin-top: 20px;
          color: #d4af37;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
        }
        .account-message {
          margin-top: 18px;
          padding: 12px;
          border-radius: 8px;
          background: #24200f;
          color: #f2d675;
          overflow-wrap: anywhere;
        }
        .dashboard-card {
          max-width: 850px;
          margin: auto;
          padding: 30px;
          border: 1px solid rgba(212,175,55,.35);
          border-radius: 18px;
          background: #141414;
        }
        .wallet-card {
          margin: 25px 0;
          padding: 25px;
          border-radius: 14px;
          background: linear-gradient(120deg,#3b3011,#17130a);
        }
        .wallet-card strong {
          display: block;
          font-size: 32px;
          margin-top: 10px;
          color: #f2d675;
        }
        .dashboard-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .dashboard-actions button {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @media(max-width:600px) {
          .account-section { padding: 45px 5%; }
          .account-box, .dashboard-card { padding: 22px; }
        }
      `}</style>

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

        <a className="login-btn" href="#account">
          {session ? "My Account" : "Get Started"}
          <ArrowUpRight size={16} />
        </a>
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
              <a href="#services" className="gold-btn">
                Explore Services <ArrowUpRight size={18} />
              </a>
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

        <section className="account-section" id="account">
          {loading ? (
            <div className="account-box">
              <p>Checking your account...</p>
            </div>
          ) : session ? (
            <div className="dashboard-card">
              <span className="section-label">CUSTOMER DASHBOARD</span>
              <h2>Welcome, {profile?.full_name || session.user.email}</h2>
              <p>Your SODIQ TELECOM account is active.</p>

              <div className="wallet-card">
                <Wallet size={25} />
                <p>WALLET BALANCE</p>
                <strong>
                  ₦{balance.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </strong>
              </div>

              <p><User size={16} /> Username: {profile?.username || "Loading..."}</p>
              <p>Email: {session.user.email}</p>

              <div className="dashboard-actions">
                <button className="account-action" onClick={handleLogout}>
                  <LogOut size={17} /> Logout
                </button>
              </div>

              {message && <div className="account-message">{message}</div>}
            </div>
          ) : (
            <div className="account-box">
              <span className="section-label">SODIQ CUSTOMER ACCOUNT</span>
              <h2>{mode === "register" ? "Create Your Account" : "Welcome Back"}</h2>
              <p>
                {mode === "register"
                  ? "Register to access SODIQ TELECOM SERVICES."
                  : "Log in to manage your digital services."}
              </p>

              <form className="account-form" onSubmit={handleSubmit}>
                {mode === "register" && (
                  <>
                    <input
                      name="full_name"
                      placeholder="Full name"
                      value={form.full_name}
                      onChange={updateForm}
                      required
                    />

                    <input
                      name="username"
                      placeholder="Choose a username"
                      value={form.username}
                      onChange={updateForm}
                      required
                    />

                    <select
                      name="gender"
                      value={form.gender}
                      onChange={updateForm}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>

                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={updateForm}
                      required
                    />
                  </>
                )}

                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={updateForm}
                  required
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={updateForm}
                  required
                />

                {mode === "register" && (
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={updateForm}
                    required
                  />
                )}

                <button type="submit" disabled={busy}>
                  {busy
                    ? "Please wait..."
                    : mode === "register"
                    ? "Create Account"
                    : "Login"}
                </button>
              </form>

              <button
                className="account-switch"
                onClick={() => {
                  setMode(mode === "register" ? "login" : "register");
                  setMessage("");
                }}
              >
                {mode === "register"
                  ? "Already have an account? Login"
                  : "New customer? Create an account"}
              </button>

              {message && <div className="account-message">{message}</div>}
            </div>
          )}
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
        <span className="copyright">
          © 2027 SODIQ TELECOM SERVICES. Built by Ogunlowo Sodiq.
        </span>
      </footer>
    </div>
  );
}

export default App;
