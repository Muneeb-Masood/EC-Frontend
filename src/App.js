// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Cell,
  LabelList,
} from 'recharts';
import "./styles.css";

// Base URL for API
const API_BASE_URL = 'http://localhost:5000/api';

// Notification Component
const Notification = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationClass = type === 'success' ? 'success' : 'error';
  const is2FANotification = message.includes('2FA');
  const twoFAClass = is2FANotification ? 
    (message.includes('Enabled') ? 'twofa-enabled' : 'twofa-disabled') : '';

  return (
    <div className={`notification ${notificationClass} ${twoFAClass}`}>
      {message}
      <span className="notification-close" onClick={onClose}>&times;</span>
    </div>
  );
};

// Custom OTP Input Component
const OtpInput = ({ value, onChange }) => {
  const handleChange = (index, event) => {
    const newValue = event.target.value;
    if (newValue.length <= 1 && !isNaN(newValue)) {
      const updatedOtp = value.split("");
      updatedOtp[index] = newValue;
      onChange(updatedOtp.join(""));
    }
  };

  return (
    <div className="otp-input">
      {Array.from({ length: 4 }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          className="otp-digit"
        />
      ))}
    </div>
  );
};

// Home Page Component
const Header = () => (
  <header className="header">
    <div className="logoContainer">
      <img src="/logo.png" alt="Zentron Logo" className="logo" />
      <span className="brandName">Zentron</span>
    </div>
    <nav className="nav">
      <ul className="navList">
        <li className="navItem"><Link to="/" className="navLink">Home</Link></li>
        <li className="navItem"><Link to="/login" className="navLink">Login</Link></li>
        <li className="navItem"><Link to="/signup" className="navLink">Sign Up</Link></li>
        <li className="navItem"><Link to="/support" className="navLink">Support</Link></li>
      </ul>
    </nav>
  </header>
);

const HomePage = () => {
  const [userCount, setUserCount] = useState(265603864);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserCount(265603975);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const btcData = [
    { time: '10:00', price: 58000 },
    { time: '11:00', price: 48234 },
    { time: '12:00', price: 38100 },
    { time: '13:00', price: 28300 },
    { time: '14:00', price: 58400 },
  ];

  const ethData = [
    { time: '10:00', price: 1800 },
    { time: '11:00', price: 300 },
    { time: '12:00', price: 1820 },
    { time: '13:00', price: 740 },
    { time: '14:00', price: 1850 },
  ];

  const subscriptionData = [
    { name: 'Jan', value: 800 },
    { name: 'Feb', value: 900 },
    { name: 'Mar', value: 1000 },
    { name: 'Apr', value: 2100 },
    { name: 'May', value: 3050 },
    { name: 'Jun', value: 5400 },
  ];

  const faqs = [
    {
      question: "1. What is a cryptocurrency exchange?",
      answer: "Cryptocurrency exchanges are digital marketplaces that enable users to buy and sell cryptocurrencies like Bitcoin, Ethereum, and Tether. The Zentron exchange is the largest crypto exchange by trade volume."
    },
    {
      question: "2. What products does Zentron provide?",
      answer: "Zentron offers spot trading, futures trading, staking, lending, launchpad, savings accounts, and various other crypto financial services."
    },
    {
      question: "3. How to buy Bitcoin and other cryptocurrencies on Zentron",
      answer: "You can buy cryptocurrencies on Zentron using credit/debit cards, bank transfers, P2P trading, or by converting other cryptocurrencies."
    },
    {
      question: "4. How to track cryptocurrency prices",
      answer: "Zentron provides real-time price charts with technical indicators, market depth data, and price alerts for all listed cryptocurrencies."
    },
    {
      question: "5. How to trade cryptocurrencies on Zentron",
      answer: "After account verification and depositing funds, use the trading interface to place market, limit, or stop-limit orders with advanced charting tools."
    },
    {
      question: "6. How to earn from crypto on Zentron",
      answer: "Earn through trading, staking, savings products, launchpool, liquidity farming, or referral programs with competitive APYs."
    }
  ];

  return (
    <div className="homePage">
      <Header />
      <h3 className="heading">The Future of Trading Starts Here!</h3>

      {/* Getting Started Steps Section */}
      <div className="stepsContainer">
        <h2 className="sectionTitle">Get Started in 3 Easy Steps</h2>
        <div className="stepsGrid">
          <div className="stepCard">
            <div className="stepImageContainer">
              <img src="/register.png" alt="Register" className="stepImage" />
            </div>
            <div className="stepNumber">1</div>
            <h3 className="stepTitle">Register & Verify Account</h3>
            <p className="stepDescription">
              Create your account by registering with your email or phone number. Set a strong password to secure your access to the platform.
            </p>
          </div>
          
          <div className="stepCard">
            <div className="stepImageContainer">
              <img src="/team-management.png" alt="Questionnaire" className="stepImage" />
            </div>
            <div className="stepNumber">2</div>
            <h3 className="stepTitle">Complete KYC Verification</h3>
            <p className="stepDescription">
              Complete identity verification by submitting required documents (like ID proof and selfie) to comply with security regulations and unlock full platform access.
            </p>
          </div>
          
          <div className="stepCard">
            <div className="stepImageContainer">
              <img src="/wallet.png" alt="Deposit" className="stepImage" />
            </div>
            <div className="stepNumber">3</div>
            <h3 className="stepTitle">Deposit Funds</h3>
            <p className="stepDescription">
              Add funds to your Zentron account via a variety of methods and follow two-factor-authentication to secure your account.
            </p>
          </div>
        </div>
      </div>

      <div className="tradeOnTheGo">
        <h3 className="tradeOnTheGoText">₿ BTC | ⟠ ETH — Hourly Trends, Infinite Possibilities</h3>
      </div>

      <div className="user-count">
        <span>{userCount.toLocaleString()}</span> USERS 
      </div>
      <div className="trust-us">TRUST US</div>

      {/* Charts Container */}
      <div className="chartsRow">
        <div className="chartContainer">
          <h2 className="chartTitle"> ₿ BTC/USDT Price Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={btcData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#f7931a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chartContainer">
          <h2 className="chartTitle"> ⟠ ETH/USDT Price Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ethData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#627eea" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="tradeOnTheGo">
        <h3 className="tradeOnTheGoText">Stay Ahead, Trade Smart – Real-Time Crypto Insights</h3>
      </div>

      {/* Market Overview and Trending Coins */}
      <div className="marketContainer">
        <div className="marketOverview">
          <h2 className="sectionTitle"> 💸 Market Overview</h2>
          <div className="marketGrid">
            <div className="marketItem">
              <div className="coinPair">BTC/USDT</div>
              <div className="coinPrice">$56,789.00</div>
              <div className="coinChange positive">+2.5%</div>
            </div>
            <div className="marketItem">
              <div className="coinPair">ETH/USDT</div>
              <div className="coinPrice">$1,789.00</div>
              <div className="coinChange positive">+1.8%</div>
            </div>
            <div className="marketItem">
              <div className="coinPair">BNB/USDT</div>
              <div className="coinPrice">$389.00</div>
              <div className="coinChange negative">-0.3%</div>
            </div>
            <div className="marketItem">
              <div className="coinPair">DOGE/USDT</div>
              <div className="coinPrice">$0.06</div>
              <div className="coinChange positive">+5.2%</div>
            </div>
          </div>
        </div>

        <div className="trendingCoins">
          <h2 className="sectionTitle"> 💰Trending Coins</h2>
          <div className="trendingGrid">
            <div className="trendingItem">
              <div className="coinName">Bitcoin</div>
              <div className="coinChange positive">+2.5%</div>
              <div className="coinSymbol">BTC</div>
            </div>
            <div className="trendingItem">
              <div className="coinName">Ethereum</div>
              <div className="coinChange positive">+1.8%</div>
              <div className="coinSymbol">ETH</div>
            </div>
            <div className="trendingItem">
              <div className="coinName">Zentron Coin</div>
              <div className="coinChange negative">-0.3%</div>
              <div className="coinSymbol">BNB</div>
            </div>
            <div className="trendingItem">
              <div className="coinName">Dogecoin</div>
              <div className="coinChange positive">+5.2%</div>
              <div className="coinSymbol">DOGE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Earning Today and Sign Up Now */}
      <div className="start-earning-section">
        <h2 className="start-earning-text">Start earning today</h2>
        <Link to="/signup" className="sign-up-button">
          Sign Up Now
        </Link>
      </div>

      <div className="parallelSections">
        {/* Scan to Download App Section */}
        <div className="downloadSection">
          <h2 className="sectionTitle">Scan to Download App</h2>
          <div className="downloadOptions">
            <img 
              src="/qr-code.png" 
              alt="QR Code to Download App"
              className="qrCode"
            />
            <div className="platforms">
              <div className="platformItem">
                <img src="/macos.png" alt="MacOS" className="platformIcon" />
                <span>MacOS</span>
              </div>
              <div className="platformItem">
                <img src="/windows.png" alt="Windows" className="platformIcon" />
                <span>Windows</span>
              </div>
              <div className="platformItem">
                <img src="/linux.png" alt="Linux" className="platformIcon" />
                <span>Linux</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Overview Section */}
        <div className="accountOverview">
          <h2 className="overviewHeading"> $  Average Account Overview</h2>
          <div className="overviewItem">
            <span>Balance</span>
            <span>$12,345.67</span>
          </div>
          <div className="overviewItem">
            <span>Available</span>
            <span>$10,987.65</span>
          </div>
          <div className="overviewItem">
            <span>Unrealized P/L</span>
            <span className="positive">+$1,234.56</span>
          </div>
          <div className="overviewItem">
            <span>Margin Level</span>
            <span>125%</span>
          </div>
          <div className="overviewActions">
            <button className="buyButton">Buy</button>
            <button className="sellButton">Sell</button>
          </div>
        </div>
      </div>

      <div className="tradeOnTheGo">
        <h3 className="tradeOnTheGoText">Trade on the go. Anywhere, anytime.</h3>
      </div>

      {/* Statistics Section */}
      <div className="statsContainer">
        <div className="statCard">
          <div className="statHeader">BTC/USDT</div>
          <div className="statName">Bitcoin</div>
          <div className="statValue">58,234.56</div>
          <div className="statChange positive">+2.34%</div>
        </div>
        <div className="statCard">
          <div className="statHeader">ETH/USDT</div>
          <div className="statName">Ethereum</div>
          <div className="statValue">1,834.56</div>
          <div className="statChange negative">-1.23%</div>
        </div>
        <div className="statCard">
          <div className="statHeader">BNB/USDT</div>
          <div className="statName">Zentron Coin</div>
          <div className="statValue">334.56</div>
          <div className="statChange positive">+0.87%</div>
        </div>
        <div className="statCard">
          <div className="statHeader">DOGE/USDT</div>
          <div className="statName">Dogecoin</div>
          <div className="statValue">0.0567</div>
          <div className="statChange negative">-2.45%</div>
        </div>
        <div className="statCard">
          <div className="statHeader">LINK/USDT</div>
          <div className="statName">Chainlink</div>
          <div className="statValue">24.56</div>
          <div className="statChange positive">+3.12%</div>
        </div>
        <div className="statCard">
          <div className="statHeader">ADA/USDT</div>
          <div className="statName">Cardano</div>
          <div className="statValue">1.23</div>
          <div className="statChange negative">-0.78%</div>
        </div>
      </div>

      <div className="tradeOnTheGo">
        <h3 className="tradeOnTheGoText">Breaking Stories, Timely Updates – Stay Informed.</h3>
      </div>

      {/* News & Updates Section */}
      <div className="newsContainer">
        <div className="sectionTitle">
          <img src="/news-icon.png" alt="News" className="sectionTitleIcon" />
          News & Updates
        </div>
        <div className="newsGrid">
          <div className="newsItem">
            <h3>Zentron Launches New Staking Feature</h3>
            <p>Zentron has just released a new staking feature, allowing users to earn passive income on their cryptocurrency holdings.</p>
            <div className="newsTimestamp">2 hours ago</div>
          </div>
          <div className="newsItem">
            <h3>Zentron Adds Support for New Trading Pairs</h3>
            <p>Zentron has added support for several new trading pairs, including BTC/GBP, ETH/JPY, and BNB/AUD.</p>
            <div className="newsTimestamp">1 day ago</div>
          </div>
          <div className="newsItem">
            <h3>Zentron Announces Upcoming Mainnet Upgrade</h3>
            <p>Zentron has announced an upcoming mainnet upgrade, which will bring new features and improvements to the platform.</p>
            <div className="newsTimestamp">3 days ago</div>
          </div>
        </div>
      </div>

      {/* Member Growth Section */}  
      <div className="memberGrowthContainer">
        <div className="sectionTitleContainer">
          <img src="/collaborative-growth.png" alt="Member Growth" className="growthIcon" />
          <h2 className="sectionTitle">Member Growth</h2>
        </div>
        <div className="growthStats">
          <div className="growthNumber">+2350</div>
          <div className="growthRate">+180.1% from last month</div>
        </div>
        <div className="growthChart">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subscriptionData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#ffffff', fontSize: 12 }}
              />
              <YAxis hide={true} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                animationDuration={2000}
              >
                {subscriptionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === subscriptionData.length - 1 ? '#f5d742' : 'rgba(255, 255, 255, 0.9)'} 
                  />
                ))}
                <LabelList 
                  dataKey="value" 
                  position="top" 
                  fill="#ffffff"
                  fontSize={12}
                  fontWeight="bold"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faqContainer">
        <h2 className="sectionTitle">Frequently Asked Questions</h2>
        
        {faqs.map((faq, index) => (
          <div key={index} className="faqItem">
            <div className="faqQuestion" onClick={() => toggleFaq(index)}>
              <h3>{faq.question}</h3>
              <span className={`caret ${expandedFaq === index ? 'open' : ''}`}>^</span>
            </div>
            {expandedFaq === index && (
              <div className="faqAnswer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footerSection">
          <h3>Zentron</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/fees">Fees</Link></li>
          </ul>
        </div>
        <div className="footerSection">
          <h3>Products</h3>
          <ul>
            <li><Link to="/spot">Spot</Link></li>
            <li><Link to="/futures">Futures</Link></li>
            <li><Link to="/earn">Earn</Link></li>
            <li><Link to="/launchpad">Launchpad</Link></li>
          </ul>
        </div>
        <div className="footerSection">
          <h3>Support</h3>
          <ul>
            <li><Link to="/help-center">Help Center</Link></li>
            <li><Link to="/submit-request">Submit a Request</Link></li>
            <li><Link to="/api-docs">API Documentation</Link></li>
            <li><Link to="/status">Status</Link></li>
          </ul>
        </div>
        <div className="footerSection">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/risk-warnings">Risk Warnings</Link></li>
            <li><Link to="/aml-kyc">AML/KYC</Link></li>
          </ul>
        </div>
        <div className="footerSection">
          <h3>Follow Us</h3>
          <ul className="socialLinks">
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer">Telegram</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fingerprint] = useState("3f6b5d7e9a0c1b2d8e4f6a3b7c9d5e0g");
  const [latitude] = useState("10");
  const [longitude] = useState("20");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login/login`, {
        email,
        password,
        fingerprint,
        latitude,
        longitude
      });

      if (response.data.message === "OTP sent. Please verify to complete login.") {
        setShowOtpField(true);
        setOtpToken(response.data.otpToken);
        setSuccessMessage(response.data.message);
        setIs2FAEnabled(true);
      } else {
        localStorage.setItem('token', response.data.token);
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          onLogin();
        }, 2000);
      }
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("OTP must be a 4-digit number.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login/verify-2fa`, {
        otp,
        otpToken,
        fingerprint,
        latitude,
        longitude
      });

      localStorage.setItem('token', response.data.token);
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        onLogin();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  useEffect(() => {
    if (email.includes('@') && email.includes('.com')) {
      setError("");
    }
  }, [email]);

  return (
    <div className="loginPage">
      <h2 className="heading">🔒Login</h2>
      <p>Enter your email and password to login to your account.</p>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      {notification && (
        <Notification 
          message={notification.message} 
          onClose={() => setNotification(null)} 
          type={notification.type}
        />
      )}
      
      {!showOtpField && (
        <>
          <input
            type="text"
            placeholder="Email (must contain @ and .com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </>
      )}
      
      {showOtpField && (
        <>
          <p>Enter OTP:</p>
          <OtpInput value={otp} onChange={setOtp} />
        </>
      )}
      
      <button
        onClick={showOtpField ? handleOtpVerification : handleLogin}
        className="button"
        disabled={showOtpField ? otp.length !== 4 : !email || !password}
      >
        {showOtpField ? "Verify OTP" : "Login"}
      </button>
      
      <p className="linkText">
        <Link to="/forgot-password" className="link">
          Forgot Password?
        </Link>
      </p>
      <p className="linkText">
        Don't have an account?{" "}
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </p>
      <div className="footer">
        <p>© 2025 Zentron. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

// Support Page Component
const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (name === 'email' && value.includes('@') && errors.email) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setNotification({
      type: 'success',
      message: 'Your message has been sent successfully!'
    });

    setFormData({
      name: '',
      email: '',
      message: ''
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="supportPage">
      <h2 className="heading">📞Customer Support</h2>
      <p>We're here to help you with any issues or questions you may have.</p>
      
      <h3 className="contactHeading">Contact Us</h3>
      <p className="contactInfo">Email: support@Zentron.com</p>
      <p className="contactInfo">Phone: +92 79074707</p>
      <p className="contactInfo">Live Chat: Available 24/7</p>
      
      <form onSubmit={handleSubmit} className="supportForm">
        <h3 className="formHeading">Send us a message</h3>
        
        {notification && (
          <Notification 
            message={notification.message} 
            onClose={() => setNotification(null)} 
            type={notification.type}
          />
        )}
        
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
        
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="input"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        
        <textarea
          name="message"
          placeholder="Your Message"
          className="input"
          rows="5"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <div className="error">{errors.message}</div>}
        
        <button 
          type="submit"
          className="button"
          disabled={!formData.name || !formData.email || !formData.message || errors.email}
        >
          Send Message
        </button>
      </form>
      
      <div className="footer">
        <p>© 2025 Zentron. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

// Forgot Password Page Component
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/sendPwdOtp`, { email });
      setShowOtpField(true);
      setSuccess("A recovery OTP has been sent to your email.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("OTP must be a 4-digit number.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/verifyPwdOtp`, { email, otp });
      setIsOtpVerified(true);
      setSuccess("OTP verified. Please enter your new password.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/resetPwd`, { 
        email, 
        otp, 
        newPassword 
      });
      setSuccess("Password reset successfully.");
      setError("");
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setShowOtpField(false);
      setIsOtpVerified(false);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed. Please try again.");
    }
  };

  useEffect(() => {
    if (email.includes('@') && email.includes('.com')) {
      setError("");
    }
  }, [email]);

  return (
    <div className="forgotPasswordPage">
      <h2 className="heading"> 🔓Trouble logging in?</h2>
      <p>Enter your email and we'll send you an OTP to reset your password.</p>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      {!showOtpField && !isOtpVerified && (
        <input
          type="text"
          placeholder="Email (must contain @ and .com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      )}

      {showOtpField && !isOtpVerified && (
        <>
          <p>Enter OTP:</p>
          <OtpInput value={otp} onChange={setOtp} />
        </>
      )}

      {isOtpVerified && (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
        </>
      )}

      <button
        onClick={
          isOtpVerified
            ? handlePasswordReset
            : showOtpField
            ? handleOtpVerification
            : handleSendOtp
        }
        className="button"
        disabled={
          isOtpVerified
            ? !newPassword || !confirmPassword
            : showOtpField
            ? otp.length !== 4
            : !email
        }
      >
        {isOtpVerified
          ? "Reset Password"
          : showOtpField
          ? "Verify OTP"
          : "Send Recovery OTP"}
      </button>

      <p className="linkText">
        <Link to="/login" className="link">
          Back to Login
        </Link>
      </p>

      <div className="footer">
        <p>© 2025 Zentron. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

// Signup Page Component
const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number. Please use the format +92XXXXXXXXX, +92 (XXX) XXXXXXX, +92-XXX-XXXXXXX, or +92 XXX XXXXXXX.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/signUp`, {
        email,
        password,
        phone
      });
      setShowOtpField(true);
      setSuccessMessage("A verification OTP has been sent to your email.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("OTP must be a 4-digit number.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verifySignupOtp`, { 
        email, 
        otp 
      });
      setSuccessMessage("Account created successfully!");
      setTimeout(() => {
        onSignup({ email, password, phone });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  useEffect(() => {
    if (email.includes('@') && email.includes('.com')) {
      setError("");
    }

    const phoneRegex = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
    if (phoneRegex.test(phone)) {
      setError("");
    }
  }, [email, phone]);

  return (
    <div className="signupPage">
      <h2 className="heading">🔐Sign Up</h2>
      <p>Create a new account by filling out the fields below.</p>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      
      {!showOtpField ? (
        <>
          <input
            type="email"
            placeholder="Email (must contain @ and .com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Phone Number (+92XXXXXXXXX format)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
        </>
      ) : (
        <>
          <p>Enter OTP:</p>
          <OtpInput value={otp} onChange={setOtp} />
        </>
      )}

      <button
        onClick={showOtpField ? handleOtpVerification : handleSignup}
        className="button"
        disabled={showOtpField ? otp.length !== 4 : !email || !password || !phone}
      >
        {showOtpField ? "Verify OTP" : "Sign Up"}
      </button>
      
      <p className="linkText">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </p>
      
      <div className="footer">
        <p>© 2025 Zentron. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

// KYC Form Component
const KYCForm = ({ onKYCSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentType, setDocumentType] = useState("passport");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSubmit = () => {
    if (!name || !phoneNumber || !documentType || !picture) {
      setError("Must fill every field before submitting.");
      return;
    }

    const phoneRegex = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Invalid phone number. Please use the format +92XXXXXXXXX, +92 (XXX) XXXXXXX, +92-XXX-XXXXXXX, or +92 XXX XXXXXXX.");
      return;
    }

    setNotification({
      type: 'success',
      message: 'KYC submitted successfully!'
    });

    onKYCSubmit();

    setName("");
    setPhoneNumber("");
    setDocumentType("passport");
    setPicture(null);
    setError("");
  };

  useEffect(() => {
    const phoneRegex = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
    if (phoneRegex.test(phoneNumber)) {
      setError("");
    }
  }, [phoneNumber]);

  return (
    <div className="kycPage">
      <h2 className="heading">KYC Verification</h2>
      <p>
        Enter your details, select ID type, upload the document, and submit for
        KYC verification
      </p>
      {error && <div className="error">{error}</div>}
      {notification && (
        <Notification 
          message={notification.message} 
          onClose={() => setNotification(null)} 
          type={notification.type}
        />
      )}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Phone Number (+92XXXXXXXXX format)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="input"
      />
      <select
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        className="input"
      >
        <option value="passport">Passport</option>
        <option value="driver_license">Driver's License</option>
        <option value="ID_card">ID Card</option>
        <option value="picture">Picture</option>
      </select>
      <input
        type="file"
        onChange={(e) => setPicture(e.target.files[0])}
        className="input"
      />
      <button
        onClick={handleSubmit}
        className="button"
        disabled={!name || !phoneNumber || !documentType || !picture}
      >
        Submit
      </button>
      <div className="footer">
        <p>© 2025 Zentron. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ kycRequests, onApprove, onReject }) => {
  const [notification, setNotification] = useState(null);

  const handleApprove = async (index) => {
    try {
      const request = kycRequests[index];
      await axios.post(`${API_BASE_URL}/admin/approveKyc`, { 
        userId: request.userId 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      onApprove(index);
      setNotification({
        type: 'success',
        message: 'KYC approved successfully!'
      });
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to approve KYC'
      });
    }
  };

  const handleReject = async (index) => {
    try {
      const request = kycRequests[index];
      await axios.post(`${API_BASE_URL}/admin/rejectKyc`, { 
        userId: request.userId 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      onReject(index);
      setNotification({
        type: 'success',
        message: 'KYC rejected successfully!'
      });
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to reject KYC'
      });
    }
  };

  return (
    <div className="adminPanel">
      <h2 className="heading">Admin Panel - KYC Requests</h2>
      {notification && (
        <Notification 
          message={notification.message} 
          onClose={() => setNotification(null)} 
          type={notification.type}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kycRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.name}</td>
              <td>{request.phoneNumber}</td>
              <td>{request.documentType}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleApprove(index)} className="button">
                  Approve
                </button>
                <button onClick={() => handleReject(index)} className="button">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// AdminLogin Component
const AdminLogin = ({ onAdminLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, { 
        username, 
        password 
      });
      
      localStorage.setItem('adminToken', response.data.token);
      setNotification({
        type: 'success',
        message: 'Admin login successful!'
      });
      
      setTimeout(() => {
        onAdminLogin();
        setUsername("");
        setPassword("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="adminLogin">
      <h2 className="heading"> 🗝️Admin Login</h2>
      <h5>Restricted Access – Authorized Personnel Only</h5>
      <p>Enter Your Admin Credentials to Proceed</p>
      {error && <div className="error">{error}</div>}
      {notification && (
        <Notification 
          message={notification.message} 
          onClose={() => setNotification(null)} 
          type={notification.type}
        />
      )}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button
        onClick={handleLogin}
        className="button"
        disabled={!username || !password}
      >
        Login
      </button>
      <p className="linkText">
        <Link to="/" className="link">
          Back to Home
        </Link>
      </p>
      <div className="footer">
        <p>© 2025 Zentron. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

// Session Expired Modal Component
const SessionExpiredModal = ({ onClose }) => {
  return (
    <div className="session-expired-modal">
      <div className="modal-content">
        <h3>Session Expired</h3>
        <p>Your session has expired due to inactivity. Please log in again.</p>
        <button onClick={onClose} className="button">
          OK
        </button>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ user, kycStatus, accountStatus }) => {
  const [dashboardTab, setDashboardTab] = useState("transfer");
  const [hotCryptosTab, setHotCryptosTab] = useState("popular");
  const [walletId, setWalletId] = useState("");
  const [receiverWalletId, setReceiverWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [totalCoins, setTotalCoins] = useState(1000);
  const [notification, setNotification] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [conversionType, setConversionType] = useState("coinToUsd");
  const [conversionAmount, setConversionAmount] = useState("");
  const [conversionResult, setConversionResult] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositBankAccount, setDepositBankAccount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBankAccount, setWithdrawBankAccount] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const ETH_TO_USD_RATE = 2000;

  const updateLastActivityTime = () => {
    setLastActivityTime(Date.now());
  };

  useEffect(() => {
    const checkIdleTime = () => {
      const currentTime = Date.now();
      const idleTime = currentTime - lastActivityTime;
      
      if (idleTime > 30000 && !isSessionExpired) {
        setIsSessionExpired(true);
      }
    };

    const activityInterval = setInterval(checkIdleTime, 1000);

    return () => clearInterval(activityInterval);
  }, [lastActivityTime, isSessionExpired]);

  useEffect(() => {
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateLastActivityTime();
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  const handleSessionExpiredClose = () => {
    setIsSessionExpired(false);
    window.location.href = '/login';
  };

  const handleTransfer = () => {
    updateLastActivityTime();
    if (!walletId || !receiverWalletId || !amount) {
      setNotification("Please fill all fields.");
      return;
    }

    if (parseInt(amount) > totalCoins) {
      setNotification("Insufficient ETH.");
      return;
    }

    const newTransaction = {
      id: transactionHistory.length + 1,
      from: walletId,
      to: receiverWalletId,
      amount: parseInt(amount),
      date: new Date().toLocaleString(),
      type: "Transfer",
      status: "Completed",
    };

    setTransactionHistory([...transactionHistory, newTransaction]);
    setTotalCoins(totalCoins - parseInt(amount));
    setNotification("Transfer successful!");
    setWalletId("");
    setReceiverWalletId("");
    setAmount("");
  };

  const handleConversion = () => {
    updateLastActivityTime();
    if (!conversionAmount) {
      setNotification("Please enter an amount.");
      return;
    }

    if (conversionType === "coinToUsd") {
      setConversionResult(`$${(conversionAmount * ETH_TO_USD_RATE).toFixed(2)}`);
    } else {
      setConversionResult(`${(conversionAmount / ETH_TO_USD_RATE).toFixed(6)} ETH`);
    }
    setConversionAmount("");
  };

  const handleDeposit = () => {
    updateLastActivityTime();
    if (!depositAmount || !depositBankAccount) {
      setNotification("Please fill all fields.");
      return;
    }

    const usdAmount = parseFloat(depositAmount);
    if (isNaN(usdAmount) || usdAmount <= 0) {
      setNotification("Invalid deposit amount.");
      return;
    }

    const ethAmount = usdAmount / ETH_TO_USD_RATE;
    setTotalCoins(totalCoins + ethAmount);

    const newTransaction = {
      id: transactionHistory.length + 1,
      from: "Bank Account",
      to: "ETH Wallet",
      amount: ethAmount.toFixed(6),
      date: new Date().toLocaleString(),
      type: "Deposit",
      status: "Completed",
    };
    setTransactionHistory([...transactionHistory, newTransaction]);

    setNotification(`Successful Deposit: ${ethAmount.toFixed(6)} ETH added.`);
    setDepositAmount("");
    setDepositBankAccount("");
  };

  const handleWithdraw = () => {
    updateLastActivityTime();
    if (!withdrawAmount || !withdrawBankAccount) {
      setNotification("Please fill all fields.");
      return;
    }

    const ethAmount = parseFloat(withdrawAmount);
    if (isNaN(ethAmount) || ethAmount <= 0 || ethAmount > totalCoins) {
      setNotification("Invalid or insufficient ETH.");
      return;
    }

    const usdAmount = ethAmount * ETH_TO_USD_RATE;
    setTotalCoins(totalCoins - ethAmount);

    const newTransaction = {
      id: transactionHistory.length + 1,
      from: "ETH Wallet",
      to: "Bank Account",
      amount: ethAmount.toFixed(6),
      date: new Date().toLocaleString(),
      type: "Withdrawal",
      status: "Completed",
    };
    setTransactionHistory([...transactionHistory, newTransaction]);

    setNotification(`Successful Withdrawal: $${usdAmount.toFixed(2)} sent to your bank account.`);
    setWithdrawAmount("");
    setWithdrawBankAccount("");
  };

  const toggle2FA = async () => {
    updateLastActivityTime();
    const new2FAStatus = !is2FAEnabled;
    
    try {
      if (new2FAStatus) {
        await axios.post(`${API_BASE_URL}/login/verify-2fa`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setNotification("2FA Enabled Successfully");
      } else {
        await axios.delete(`${API_BASE_URL}/auth/disable2FA`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setNotification("2FA Disabled Successfully");
      }
      
      setIs2FAEnabled(new2FAStatus);
      setShowSettings(false);
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to update 2FA settings");
    }
  };

  return (
    <div className="dashboard" onClick={updateLastActivityTime}>
      <h2 className="heading"> User Dashboard</h2>

      {isSessionExpired && <SessionExpiredModal onClose={handleSessionExpiredClose} />}

      <h2 className="buyCryptoTitle">How to Buy/Sell Crypto</h2>
      <div className="buyCryptoSteps">
        <div className="buyCryptoStep">
          <img src="/s1.png" alt="Enter Amount & Select Payment" className="stepImage" />
          <h3 className="stepTitle">1. Enter Amount & Select Payment</h3>
          <p className="stepDescription">
            Choose the amount and select a payment method (for buying) or a receiving account (for selling).
          </p>
        </div>
        
        <div className="buyCryptoStep">
          <img src="/s2.png" alt="Confirm Order" className="stepImage" />
          <h3 className="stepTitle">2. Confirm Order</h3>
          <p className="stepDescription">
            Review transaction details, including exchange rates, fees, and other relevant information.
          </p>
        </div>
        
        <div className="buyCryptoStep">
          <img src="/s3.png" alt="Receive Crypto" className="stepImage" />
          <h3 className="stepTitle">3. Complete Transaction</h3>
          <p className="stepDescription">
            Receive crypto in your wallet (for buying) or cash in your payment account (for selling).
          </p>
        </div>
      </div>

      <div className="hotCryptosContainer">
        <div className="hotCryptosHeader">
          <h2 className="hotCryptosTitle">Hot Cryptos</h2>
          <div className="hotCryptosTabs">
            <button 
              className={`tabButton ${hotCryptosTab === 'popular' ? 'active' : ''}`}
              onClick={() => {
                updateLastActivityTime();
                setHotCryptosTab('popular');
              }}
            >
              Popular
            </button>
            <button 
              className={`tabButton ${hotCryptosTab === 'newListing' ? 'active' : ''}`}
              onClick={() => {
                updateLastActivityTime();
                setHotCryptosTab('newListing');
              }}
            >
              New Listing
            </button>
          </div>
        </div>

        {hotCryptosTab === 'popular' && (
          <div className="hotCryptosList">
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/bnb-logo.png" alt="BNB" className="cryptoLogo" />
                BNB
              </span>
              <span className="cryptoPrice">лв1,148.33</span>
              <span className="cryptoChange positive">+0.67%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/btc-logo.png" alt="BTC" className="cryptoLogo" />
                BTC
              </span>
              <span className="cryptoPrice">лв155,138.40</span>
              <span className="cryptoChange negative">-1.98%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/eth-logo.png" alt="ETH" className="cryptoLogo" />
                ETH
              </span>
              <span className="cryptoPrice">лв3,436.51</span>
              <span className="cryptoChange negative">-6.39%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/parti-logo.png" alt="PARTI" className="cryptoLogo" />
                PARTI
              </span>
              <span className="cryptoPrice">лв0.574938</span>
              <span className="cryptoChange negative">-5.90%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/sol-logo.png" alt="SOL" className="cryptoLogo" />
                SOL
              </span>
              <span className="cryptoPrice">лв239.46</span>
              <span className="cryptoChange negative">-4.39%</span>
            </div>
          </div>
        )}

        {hotCryptosTab === 'newListing' && (
          <div className="hotCryptosList">
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/banana-logo.png" alt="BANANAS" className="cryptoLogo" />
                BANANAS31
              </span>
              <span className="cryptoPrice">лв0.00967964</span>
              <span className="cryptoChange positive">+1.15%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/broccoli-logo.png" alt="BROCCOLI" className="cryptoLogo" />
                BROCCOLI714
              </span>
              <span className="cryptoPrice">лв0.0540052</span>
              <span className="cryptoChange negative">-7.92%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/tut-logo.png" alt="TUT" className="cryptoLogo" />
                TUT
              </span>
              <span className="cryptoPrice">лв0.045212</span>
              <span className="cryptoChange negative">-13.69%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/nil-logo.png" alt="NIL" className="cryptoLogo" />
                NIL
              </span>
              <span className="cryptoPrice">лв0.78498</span>
              <span className="cryptoChange negative">-4.96%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src="/xusd-logo.png" alt="XUSD" className="cryptoLogo" />
                XUSD
              </span>
              <span className="cryptoPrice">лв1.78</span>
              <span className="cryptoChange negative">-0.02%</span>
            </div>
          </div>
        )}
      </div>

      {accountStatus === "blocked" && (
        <div className="blockedBanner">
          Your account is blocked. Contact support.
        </div>
      )}

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
          type={is2FAEnabled ? "success" : "error"}
        />
      )}
      
      <div className="tabs">
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("transfer");
          }}
          className={dashboardTab === "transfer" ? "activeTab" : "tab"}
        >
          <img src="/transfer-icon.png" alt="Transfer" className="tabIcon" />
          Transfer ETH
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("total");
          }}
          className={dashboardTab === "total" ? "activeTab" : "tab"}
        >
          <img src="/e-wallet.png" alt="Total" className="tabIcon" />
          Total ETH
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("history");
          }}
          className={dashboardTab === "history" ? "activeTab" : "tab"}
        >
          <img src="/history-icon.png" alt="History" className="tabIcon" />
          Transaction History
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("conversion");
          }}
          className={dashboardTab === "conversion" ? "activeTab" : "tab"}
        >
          <img src="/conversion-icon.png" alt="Conversion" className="tabIcon" />
          ETH Conversion
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("deposit");
          }}
          className={dashboardTab === "deposit" ? "activeTab" : "tab"}
        >
          <img src="/deposit-icon.png" alt="Deposit" className="tabIcon" />
          Deposit
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("withdraw");
          }}
          className={dashboardTab === "withdraw" ? "activeTab" : "tab"}
        >
          <img src="/withdraw-icon.png" alt="Withdraw" className="tabIcon" />
          Withdraw
        </button>
      </div>

      {dashboardTab === "transfer" && (
        <div className="transferTab">
          <h3>Transfer ETH</h3>
          <div className="tab-input-row">
            <input
              type="text"
              placeholder="Your Wallet ID"
              value={walletId}
              onChange={(e) => {
                updateLastActivityTime();
                setWalletId(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Receiver Wallet ID"
              value={receiverWalletId}
              onChange={(e) => {
                updateLastActivityTime();
                setReceiverWalletId(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => {
                updateLastActivityTime();
                setAmount(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleTransfer}
            className="button"
            disabled={!walletId || !receiverWalletId || !amount}
          >
            Transfer
          </button>
        </div>
      )}

      {dashboardTab === "total" && (
        <div className="totalTab">
          <h3>Total ETH</h3>
          <p>You have {totalCoins.toFixed(6)} ETH.</p>
        </div>
      )}

      {dashboardTab === "history" && (
        <div className="historyTab">
          <h3>Transaction History</h3>
          {transactionHistory.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date/Time</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.from}</td>
                    <td>{transaction.to}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {dashboardTab === "conversion" && (
        <div className="conversionTab">
          <h3>ETH Conversion</h3>
          <p>Total ETH: {totalCoins.toFixed(6)}</p>
          <div className="tab-input-row">
            <select
              value={conversionType}
              onChange={(e) => {
                updateLastActivityTime();
                setConversionType(e.target.value);
              }}
            >
              <option value="coinToUsd">ETH to USD</option>
              <option value="usdToCoin">USD to ETH</option>
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={conversionAmount}
              onChange={(e) => {
                updateLastActivityTime();
                setConversionAmount(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleConversion}
            className="button"
            disabled={!conversionAmount}
          >
            Convert
          </button>
          {conversionResult && <p>Result: {conversionResult}</p>}
        </div>
      )}

      {dashboardTab === "deposit" && (
        <div className="depositTab">
          <h3>Deposit</h3>
          <p>Total ETH: {totalCoins.toFixed(6)}</p>
          <div className="tab-input-row">
            <input
              type="text"
              placeholder="Bank Account Number"
              value={depositBankAccount}
              onChange={(e) => {
                updateLastActivityTime();
                setDepositBankAccount(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Amount in USD"
              value={depositAmount}
              onChange={(e) => {
                updateLastActivityTime();
                setDepositAmount(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleDeposit}
            className="button"
            disabled={!depositAmount || !depositBankAccount}
          >
            Deposit
          </button>
        </div>
      )}

      {dashboardTab === "withdraw" && (
        <div className="withdrawTab">
          <h3>Withdraw</h3>
          <p>Total ETH: {totalCoins.toFixed(6)}</p>
          <div className="tab-input-row">
            <input
              type="text"
              placeholder="Bank Account Number"
              value={withdrawBankAccount}
              onChange={(e) => {
                updateLastActivityTime();
                setWithdrawBankAccount(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Amount in ETH"
              value={withdrawAmount}
              onChange={(e) => {
                updateLastActivityTime();
                setWithdrawAmount(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleWithdraw}
            className="button"
            disabled={!withdrawAmount || !withdrawBankAccount}
          >
            Withdraw
          </button>
        </div>
      )}

      <div className="kycStatus">
        <h3>KYC Status</h3>
        <p>{kycStatus}</p>
      </div>

      {/* Settings Menu */}
      <div className="settingsMenu">
        <button
          className="settingsButton"
          onClick={() => {
            updateLastActivityTime();
            setShowSettings(!showSettings);
          }}
        >
          ⚙️
        </button>
        {showSettings && (
          <div className="settingsContent">
            <h3>Settings</h3>
            <div className="settingItem">
              <label>Enable 2FA</label>
              <div
                className={`toggleSwitch ${is2FAEnabled ? "active" : ""}`}
                onClick={toggle2FA}
              >
                <div className="toggleSlider"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <p>© 2025 Zentron. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

// App Component 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isKYCSubmitted, setIsKYCSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [kycRequests, setKycRequests] = useState([]);
  const [kycStatus, setKycStatus] = useState("Pending");
  const [accountStatus, setAccountStatus] = useState("active");
  const [notification, setNotification] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setNotification({
      type: 'success',
      message: 'Login successful!'
    });
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setNotification({
      type: 'success',
      message: 'Admin login successful!'
    });
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setNotification({
      type: 'success',
      message: 'Account created successfully!'
    });
  };

  const handleKYCSubmit = (kycData) => {
    const newRequest = { 
      ...kycData, 
      status: "Pending",
      userId: Math.floor(Math.random() * 1000) // Mock user ID
    };
    setKycRequests([...kycRequests, newRequest]);
    setIsKYCSubmitted(true);
    setNotification({
      type: 'success',
      message: 'KYC submitted successfully!'
    });
  };

  const handleApprove = (index) => {
    const updatedRequests = [...kycRequests];
    updatedRequests[index].status = "Approved";
    setKycRequests(updatedRequests);
    setKycStatus("Approved");
    setNotification({
      type: 'success',
      message: 'KYC approved successfully!'
    });
  };

  const handleReject = (index) => {
    const updatedRequests = [...kycRequests];
    updatedRequests[index].status = "Rejected";
    setKycRequests(updatedRequests);
    setKycStatus("Rejected");
    setNotification({
      type: 'success',
      message: 'KYC rejected successfully!'
    });
  };

  return (
    <Router>
      <div className="app">
        {notification && (
          <Notification 
            message={notification.message} 
            onClose={() => setNotification(null)} 
            type={notification.type}
          />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/kyc" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/admin-login" element={isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminLogin onAdminLogin={handleAdminLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/kyc" /> : <SignupPage onSignup={handleSignup} />} />
          <Route path="/kyc" element={isKYCSubmitted ? <Navigate to="/dashboard" /> : isLoggedIn ? <KYCForm onKYCSubmit={handleKYCSubmit} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isKYCSubmitted ? <Dashboard user={user} kycStatus={kycStatus} accountStatus={accountStatus} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAdminLoggedIn ? <AdminPanel kycRequests={kycRequests} onApprove={handleApprove} onReject={handleReject} /> : <Navigate to="/admin-login" />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;