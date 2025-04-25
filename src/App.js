import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
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
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';





// Notification Component
const Notification = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Determine notification class based on type
  const notificationClass = type === 'success' ? 'success' : 'error';
  
  // Special handling for 2FA notifications
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


// Home Page Component
import Header from './Header'; 
import qrCode from './assets/AIM-Binance.png';
import macosImage from './assets/macos.png'; 
import linuxImage from './assets/linux.png'; 
import windowsImage from './assets/windows.png'; 
import registerImg from './assets/register.png';
import teamMgmtImg from './assets/team-management.png';
import walletImg from './assets/wallet.png';
import collaborativeGrowthIcon from './assets/collaborative-growth.png'; 

// Sample data for charts
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
      {/* Header */}
      <Header />

      <h3 className="heading">The Future of Trading Starts Here!</h3>

    {/* Getting Started Steps Section */}
    <div className="stepsContainer">
      <h2 className="sectionTitle">Get Started in 3 Easy Steps</h2>
      <div className="stepsGrid">
        <div className="stepCard">
          <div className="stepImageContainer">
            <img 
              src={registerImg} 
              alt="Register" 
              className="stepImage"
            />
          </div>
          <div className="stepNumber">1</div>
          <h3 className="stepTitle">Register & Verify Account</h3>
          <p className="stepDescription">
          Create your account by registering with your email or phone number. Set a strong password to secure your access to the platform.
          </p>
        </div>
        
        <div className="stepCard">
          <div className="stepImageContainer">
            <img 
              src={teamMgmtImg} 
              alt="Questionnaire" 
              className="stepImage"
            />
          </div>
          <div className="stepNumber">2</div>
          <h3 className="stepTitle">Complete KYC Verification</h3>
          <p className="stepDescription">
          Complete identity verification by submitting required documents (like ID proof and selfie) to comply with security regulations and unlock full platform access.
          </p>
        </div>
        
        <div className="stepCard">
          <div className="stepImageContainer">
            <img 
              src={walletImg} 
              alt="Deposit" 
              className="stepImage"
            />
          </div>
          <div className="stepNumber">3</div>
          <h3 className="stepTitle">Deposit Funds</h3>
          <p className="stepDescription">
            Add funds to your Zentron account via a variety of methods and 
            follow two-factor-authentication to secure your account.
          </p>
        </div>
      </div>
    </div>

                 {/* Marketoverview, trending coins */}
                 <div className="tradeOnTheGo">
        <h3 className="tradeOnTheGoText">₿ BTC | ⟠ ETH — Hourly Trends, Infinite Possibilities</h3>
      </div>

                  {/* User Count and Trust Us Text */}
                  <div className="user-count">
        <span>{userCount.toLocaleString()}</span> USERS 
      </div>
      <div className="trust-us">TRUST US</div>

{/* Charts Container */}
<div className="chartsRow">
  {/* BTC/USDT Chart */}
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

  {/* ETH/USDT Chart */}
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

                 {/* Marketoverview, trending coins */}
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
              src={qrCode} 
              alt="QR Code to Download App"
              className="qrCode"
            />
            <div className="platforms">
              <div className="platformItem">
                <img src={macosImage} alt="MacOS" className="platformIcon" />
                <span>MacOS</span>
              </div>
              <div className="platformItem">
                <img src={windowsImage} alt="Windows" className="platformIcon" />
                <span>Windows</span>
              </div>
              <div className="platformItem">
                <img src={linuxImage} alt="Linux" className="platformIcon" />
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

       {/* Trade On The Go Section */}
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

             {/* Saty informed Section */}
             <div className="tradeOnTheGo">
        <h3 className="tradeOnTheGoText">Breaking Stories, Timely Updates – Stay Informed.</h3>
      </div>

            {/* News & Updates Section */}
      <div className="newsContainer">
      <div className="sectionTitle">
    <img 
      src={require('./assets/news-icon.png')} 
      alt="News" 
      className="sectionTitleIcon" 
    />
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
    <img 
      src={collaborativeGrowthIcon} 
      alt="Member Growth" 
      className="growthIcon"
    />
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
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </div>
  );
};


// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    // Get geolocation if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        () => {
          setGeoLocation({ latitude: "10", longitude: "20" }); // Default values
        }
      );
    }
  }, []);

  const generateFingerprint = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const fingerprint = generateFingerprint();
      const response = await axios.post(`${API_BASE_URL}/api/login/login`, {
        email,
        password,
        fingerprint,
        latitude: geoLocation.latitude,
        longitude: geoLocation.longitude
      });

      if (response.data.otpToken) {
        setOtpToken(response.data.otpToken);
        setShowOtpField(true);
        setSuccessMessage("An OTP has been sent to your email.");
      } else {
        setSuccessMessage("Login successful!");
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
          onLogin();
          resetForm();
        }, 2000);
      }
    } catch (error) {
      handleApiError(error, "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("OTP must be a 4-digit number.");
      return;
    }

    setIsLoading(true);
    
    try {
      const fingerprint = generateFingerprint();
      const response = await axios.post(`${API_BASE_URL}/api/login/verify-2fa`, {
        otp,
        otpToken,
        fingerprint,
        latitude: geoLocation.latitude,
        longitude: geoLocation.longitude
      });

      setSuccessMessage("OTP Verified! Logging you in...");
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        onLogin();
        resetForm();
      }, 2000);
    } catch (error) {
      handleApiError(error, "OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setShowOtpField(false);
  };

  const handleApiError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        defaultMessage;
    setError(errorMessage);
    
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    if (email && validateEmail(email)) {
      setError("");
    }
  }, [email]);

  return (
    <div className="loginPage">
      <h2 className="heading">🔒Login</h2>
      <p>Enter your email and password to login to your account.</p>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      
      {!showOtpField ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            autoComplete="current-password"
          />
        </>
      ) : (
        <>
          <p>Enter OTP:</p>
          <OtpInput value={otp} onChange={setOtp} />
        </>
      )}
      
      <button
        onClick={showOtpField ? handleOtpVerification : handleLogin}
        className={`button ${isLoading ? 'loading' : ''}`}
        disabled={
          isLoading || 
          (showOtpField ? otp.length !== 4 : !email || !password)
        }
      >
        {isLoading ? (
          <span className="spinner"></span>
        ) : showOtpField ? "Verify OTP" : "Login"}
      </button>
      
      <div className="auth-links">
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


//Support page 
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
      
      {/* Contact Info - No container div */}
      <h3 className="contactHeading">Contact Us</h3>
      <p className="contactInfo">Email: support@Zentron.com</p>
      <p className="contactInfo">Phone: +92 79074707</p>
      <p className="contactInfo">Live Chat: Available 24/7</p>
      
      {/* Form - No wrapper div */}
      <form onSubmit={handleSubmit} className="supportForm">
        <h3 className="formHeading">Send us a message</h3>
        
        {notification && (
          <div className={notification.type === 'success' ? 'success' : 'error'}>
            {notification.message}
          </div>
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

// Forgot Password Page
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      await axios.post(`${API_BASE_URL}/api/auth/sendPwdOtp`, { email });
      setShowOtpField(true);
      setSuccess("A recovery OTP has been sent to your email.");
    } catch (error) {
      handleApiError(error, "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("OTP must be a 4-digit number.");
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, you would verify the OTP with the server here
      setIsOtpVerified(true);
      setSuccess("OTP verified. Please enter your new password.");
      setError("");
    } catch (error) {
      handleApiError(error, "OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    
    try {
      await axios.post(`${API_BASE_URL}/api/auth/resetPwd`, {
        email,
        otp,
        newPassword
      });

      setSuccess("Password reset successfully. You can now log in with your new password.");
      resetForm();
    } catch (error) {
      handleApiError(error, "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOtpField(false);
    setIsOtpVerified(false);
  };

  const handleApiError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        defaultMessage;
    setError(errorMessage);
    
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    if (email && validateEmail(email)) {
      setError("");
    }
  }, [email]);

  return (
    <div className="forgotPasswordPage">
      <h2 className="heading">🔓Trouble logging in?</h2>
      <p>Enter your email and we'll send you an OTP to reset your password.</p>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      {!showOtpField && !isOtpVerified && (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          autoComplete="email"
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
            placeholder="New Password (min 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            autoComplete="new-password"
          />
        </>
      )}

      <button
        onClick={
          isOtpVerified
            ? handlePasswordReset
            : showOtpField
            ? handleOtpVerification
            : handleSubmit
        }
        className={`button ${isLoading ? 'loading' : ''}`}
        disabled={
          isLoading ||
          (isOtpVerified
            ? !newPassword || !confirmPassword
            : showOtpField
            ? otp.length !== 4
            : !email)
        }
      >
        {isLoading ? (
          <span className="spinner"></span>
        ) : isOtpVerified ? "Reset Password" : showOtpField ? "Verify OTP" : "Send Recovery OTP"}
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


// Signup Page
const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
    return re.test(phone);
  };

  const handleSignup = async () => {
    if (!email || !password || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Invalid phone number. Please use the format +92XXXXXXXXX, +92 (XXX) XXXXXXX, +92-XXX-XXXXXXX, or +92 XXX XXXXXXX.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signUp`, {
        email,
        password,
        phone
      });

      setShowOtpField(true);
      setSuccessMessage("A verification OTP has been sent to your email.");
    } catch (error) {
      handleApiError(error, "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("OTP must be a 4-digit number.");
      return;
    }

    setIsLoading(true);
    
    try {
      setSuccessMessage("OTP Verified! Account created successfully.");
      setTimeout(() => {
        onSignup({ email, password, phone });
        resetForm();
      }, 2000);
    } catch (error) {
      handleApiError(error, "OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setPhone("");
    setOtp("");
    setShowOtpField(false);
  };

  const handleApiError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        defaultMessage;
    setError(errorMessage);
    
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    if (email && validateEmail(email)) {
      setError("");
    }
    if (phone && validatePhone(phone)) {
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            autoComplete="new-password"
          />
          <input
            type="tel"
            placeholder="Phone Number (+92XXXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            autoComplete="tel"
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
        className={`button ${isLoading ? 'loading' : ''}`}
        disabled={
          isLoading || 
          (showOtpField ? otp.length !== 4 : !email || !password || !phone)
        }
      >
        {isLoading ? (
          <span className="spinner"></span>
        ) : showOtpField ? "Verify OTP" : "Sign Up"}
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

// Admin Panel Component
const AdminPanel = ({ kycRequests, onApprove, onReject }) => {
  const [activeTab, setActiveTab] = useState('kyc');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Withdrawal', user: 'user1@example.com', amount: '0.5 ETH', status: 'Pending', date: '2023-05-15 14:30' },
    { id: 2, type: 'Deposit', user: 'user2@example.com', amount: '1000 USD', status: 'Pending', date: '2023-05-15 15:45' },
    { id: 3, type: 'Transfer', user: 'user3@example.com', amount: '1.2 ETH', status: 'Pending', date: '2023-05-16 09:15' },
  ]);
  
  const [deposits, setDeposits] = useState([
    { id: 1, user: 'user4@example.com', amount: '500 USD', bankAccount: '****1234', status: 'Pending', date: '2023-05-14 11:20' },
    { id: 2, user: 'user5@example.com', amount: '750 USD', bankAccount: '****5678', status: 'Pending', date: '2023-05-15 16:30' },
  ]);
  
  const [notification, setNotification] = useState(null);

  const handleApproveTransaction = (id) => {
    setTransactions(transactions.map(tx => 
      tx.id === id ? { ...tx, status: 'Approved' } : tx
    ));
    setNotification({ type: 'success', message: 'Transaction approved successfully!' });
  };

  const handleRejectTransaction = (id) => {
    setTransactions(transactions.map(tx => 
      tx.id === id ? { ...tx, status: 'Rejected' } : tx
    ));
    setNotification({ type: 'error', message: 'Transaction rejected.' });
  };

  const handleApproveDeposit = (id) => {
    setDeposits(deposits.map(deposit => 
      deposit.id === id ? { ...deposit, status: 'Approved' } : deposit
    ));
    setNotification({ type: 'success', message: 'Deposit approved successfully!' });
  };

  const handleRejectDeposit = (id) => {
    setDeposits(deposits.map(deposit => 
      deposit.id === id ? { ...deposit, status: 'Rejected' } : deposit
    ));
    setNotification({ type: 'error', message: 'Deposit rejected.' });
  };

  return (
    <div className="adminPanel">
      <h2 className="heading">Admin Dashboard</h2>
      
      {notification && (
        <Notification
          message={notification.message}
          onClose={() => setNotification(null)}
          type={notification.type}
        />
      )}
      
      <div className="adminTabs">
        <button
          className={`adminTab ${activeTab === 'kyc' ? 'activeAdminTab' : ''}`}
          onClick={() => setActiveTab('kyc')}
        >
          KYC Requests
        </button>
        <button
          className={`adminTab ${activeTab === 'transactions' ? 'activeAdminTab' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transaction Approvals
        </button>
        <button
          className={`adminTab ${activeTab === 'deposits' ? 'activeAdminTab' : ''}`}
          onClick={() => setActiveTab('deposits')}
        >
          Deposit Approvals
        </button>
      </div>
      
      {activeTab === 'kyc' && (
        <div className="adminTabContent">
          <h3>KYC Verification Requests</h3>
          {kycRequests.length === 0 ? (
            <p>No pending KYC requests.</p>
          ) : (
            <table className="adminTable">
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
                    <td className="actionButtons">
                      <button 
                        onClick={() => onApprove(index)} 
                        className="approveButton"
                        disabled={request.status !== 'Pending'}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => onReject(index)} 
                        className="rejectButton"
                        disabled={request.status !== 'Pending'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      {activeTab === 'transactions' && (
        <div className="adminTabContent">
          <h3>Pending Transactions</h3>
          {transactions.filter(tx => tx.status === 'Pending').length === 0 ? (
            <p>No pending transactions.</p>
          ) : (
            <table className="adminTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.filter(tx => tx.status === 'Pending').map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.id}</td>
                    <td>{tx.type}</td>
                    <td>{tx.user}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.date}</td>
                    <td className="actionButtons">
                      <button 
                        onClick={() => handleApproveTransaction(tx.id)} 
                        className="approveButton"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectTransaction(tx.id)} 
                        className="rejectButton"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          <h3>Transaction History</h3>
          {transactions.filter(tx => tx.status !== 'Pending').length === 0 ? (
            <p>No transaction history.</p>
          ) : (
            <table className="adminTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.filter(tx => tx.status !== 'Pending').map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.id}</td>
                    <td>{tx.type}</td>
                    <td>{tx.user}</td>
                    <td>{tx.amount}</td>
                    <td className={tx.status === 'Approved' ? 'statusApproved' : 'statusRejected'}>
                      {tx.status}
                    </td>
                    <td>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      {activeTab === 'deposits' && (
        <div className="adminTabContent">
          <h3>Pending Deposits</h3>
          {deposits.filter(deposit => deposit.status === 'Pending').length === 0 ? (
            <p>No pending deposits.</p>
          ) : (
            <table className="adminTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Bank Account</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.filter(deposit => deposit.status === 'Pending').map(deposit => (
                  <tr key={deposit.id}>
                    <td>{deposit.id}</td>
                    <td>{deposit.user}</td>
                    <td>{deposit.amount}</td>
                    <td>{deposit.bankAccount}</td>
                    <td>{deposit.date}</td>
                    <td className="actionButtons">
                      <button 
                        onClick={() => handleApproveDeposit(deposit.id)} 
                        className="approveButton"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectDeposit(deposit.id)} 
                        className="rejectButton"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          <h3>Deposit History</h3>
          {deposits.filter(deposit => deposit.status !== 'Pending').length === 0 ? (
            <p>No deposit history.</p>
          ) : (
            <table className="adminTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Bank Account</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {deposits.filter(deposit => deposit.status !== 'Pending').map(deposit => (
                  <tr key={deposit.id}>
                    <td>{deposit.id}</td>
                    <td>{deposit.user}</td>
                    <td>{deposit.amount}</td>
                    <td>{deposit.bankAccount}</td>
                    <td className={deposit.status === 'Approved' ? 'statusApproved' : 'statusRejected'}>
                      {deposit.status}
                    </td>
                    <td>{deposit.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      <div className="adminFooter">
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


// AdminLogin Component
const AdminLogin = ({ onAdminLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (username === "admin" && password === "admin123") {
      onAdminLogin();
      // Clear fields after successful login
      setUsername("");
      setPassword("");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="adminLogin">
      <h2 className="heading"> 🗝️Admin Login</h2>
      <h5>Restricted Access – Authorized Personnel Only</h5>
      <p>Enter Your Admin Credentials to Proceed</p>
      {error && <div className="error">{error}</div>}
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
          {/* Footer */}
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
  // State for dashboard tabs (Transfer, Total, History, etc.)
  const [dashboardTab, setDashboardTab] = useState("transfer");
  
  // State for Hot Cryptos tabs (Popular, New Listing)
  const [hotCryptosTab, setHotCryptosTab] = useState("popular");
  
  const [walletId, setWalletId] = useState("");
  const [receiverWalletId, setReceiverWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [totalCoins, setTotalCoins] = useState(1000); // Total ETH balance
  const [notification, setNotification] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [conversionType, setConversionType] = useState("coinToUsd");
  const [conversionAmount, setConversionAmount] = useState("");
  const [conversionResult, setConversionResult] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositBankAccount, setDepositBankAccount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBankAccount, setWithdrawBankAccount] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false); // 2FA state
  const [showSettings, setShowSettings] = useState(false); // Settings menu visibility
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const ETH_TO_USD_RATE = 2000; // Fixed conversion rate: 1 ETH = $2000

  // Track user activity
  const updateLastActivityTime = () => {
    setLastActivityTime(Date.now());
  };

  // Check for idle time
  useEffect(() => {
    const checkIdleTime = () => {
      const currentTime = Date.now();
      const idleTime = currentTime - lastActivityTime;
      
      // Show session expired modal after 30 seconds of inactivity
      if (idleTime > 30000 && !isSessionExpired) {
        setIsSessionExpired(true);
      }
    };

    const activityInterval = setInterval(checkIdleTime, 1000); // Check every second

    return () => clearInterval(activityInterval);
  }, [lastActivityTime, isSessionExpired]);

  // Reset timer on any user activity
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

  // Handle session expired modal close
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

    // Convert USD to ETH
    const ethAmount = usdAmount / ETH_TO_USD_RATE;
    setTotalCoins(totalCoins + ethAmount);

    // Add deposit transaction to history
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

    // Convert ETH to USD
    const usdAmount = ethAmount * ETH_TO_USD_RATE;
    setTotalCoins(totalCoins - ethAmount);

    // Add withdrawal transaction to history
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
      const token = localStorage.getItem('token');
      
      if (new2FAStatus) {
        // Enable 2FA
        await axios.post(
          `${API_BASE_URL}/api/login/verify-2fa`, 
          {}, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setNotification("2FA has been enabled successfully");
      } else {
        // Disable 2FA
        await axios.delete(
          `${API_BASE_URL}/api/auth/disable2FA`, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setNotification("2FA has been disabled successfully");
      }
      
      setIs2FAEnabled(new2FAStatus);
      setShowSettings(false);
      
    } catch (error) {
      setNotification("Failed to update 2FA settings. Please try again.");
      console.error("2FA toggle error:", error);
    }
  };

  return (
    <div className="dashboard" onClick={updateLastActivityTime}>
      <h2 className="heading"> User Dashboard</h2>

      {/* Session Expired Modal */}
      {isSessionExpired && <SessionExpiredModal onClose={handleSessionExpiredClose} />}

      {/* How to Buy Crypto Section */}
      <h2 className="buyCryptoTitle">How to Buy/Sell Crypto</h2>
      <div className="buyCryptoSteps">
        <div className="buyCryptoStep">
          <img 
            src={require('./assets/s1.png')} 
            alt="Enter Amount & Select Payment"
            className="stepImage"
          />
          <h3 className="stepTitle">1. Enter Amount & Select Payment</h3>
          <p className="stepDescription">
          Choose the amount and select a payment method (for buying) or a receiving account (for selling).
          </p>
        </div>
        
        <div className="buyCryptoStep">
          <img 
            src={require('./assets/s2.png')} 
            alt="Confirm Order"
            className="stepImage"
          />
          <h3 className="stepTitle">2. Confirm Order</h3>
          <p className="stepDescription">
          Review transaction details, including exchange rates, fees, and other relevant information.
          </p>
        </div>
        
        <div className="buyCryptoStep">
          <img 
            src={require('./assets/s3.png')} 
            alt="Receive Crypto"
            className="stepImage"
          />
          <h3 className="stepTitle">3. Complete Transaction</h3>
          <p className="stepDescription">
          Receive crypto in your wallet (for buying) or cash in your payment account (for selling).
          </p>
        </div>
      </div>

      {/* Hot Cryptos Section */}
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
                <img src={require('./assets/bnb-logo.png')} alt="BNB" className="cryptoLogo" />
                BNB
              </span>
              <span className="cryptoPrice">лв1,148.33</span>
              <span className="cryptoChange positive">+0.67%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/btc-logo.png')} alt="BTC" className="cryptoLogo" />
                BTC
              </span>
              <span className="cryptoPrice">лв155,138.40</span>
              <span className="cryptoChange negative">-1.98%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/eth-logo.png')} alt="ETH" className="cryptoLogo" />
                ETH
              </span>
              <span className="cryptoPrice">лв3,436.51</span>
              <span className="cryptoChange negative">-6.39%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/parti-logo.png')} alt="PARTI" className="cryptoLogo" />
                PARTI
              </span>
              <span className="cryptoPrice">лв0.574938</span>
              <span className="cryptoChange negative">-5.90%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/sol-logo.png')} alt="SOL" className="cryptoLogo" />
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
                <img src={require('./assets/banana-logo.png')} alt="BANANAS" className="cryptoLogo" />
                BANANAS31
              </span>
              <span className="cryptoPrice">лв0.00967964</span>
              <span className="cryptoChange positive">+1.15%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/broccoli-logo.png')} alt="BROCCOLI" className="cryptoLogo" />
                BROCCOLI714
              </span>
              <span className="cryptoPrice">лв0.0540052</span>
              <span className="cryptoChange negative">-7.92%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/tut-logo.png')} alt="TUT" className="cryptoLogo" />
                TUT
              </span>
              <span className="cryptoPrice">лв0.045212</span>
              <span className="cryptoChange negative">-13.69%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/nil-logo.png')} alt="NIL" className="cryptoLogo" />
                NIL
              </span>
              <span className="cryptoPrice">лв0.78498</span>
              <span className="cryptoChange negative">-4.96%</span>
            </div>
            <div className="cryptoItem">
              <span className="cryptoName">
                <img src={require('./assets/xusd-logo.png')} alt="XUSD" className="cryptoLogo" />
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
          onClose={() => setNotification("")}
          color={is2FAEnabled ? "green" : "red"} 
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
          <img 
            src={require('./assets/transfer-icon.png')} 
            alt="Transfer" 
            className="tabIcon" 
          />
          Transfer ETH
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("total");
          }}
          className={dashboardTab === "total" ? "activeTab" : "tab"}
        >
          <img 
            src={require('./assets/e-wallet.png')} 
            alt="Total" 
            className="tabIcon" 
          />
          Total ETH
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("history");
          }}
          className={dashboardTab === "history" ? "activeTab" : "tab"}
        >
          <img 
            src={require('./assets/history-icon.png')} 
            alt="History" 
            className="tabIcon" 
          />
          Transaction History
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("conversion");
          }}
          className={dashboardTab === "conversion" ? "activeTab" : "tab"}
        >
          <img 
            src={require('./assets/conversion-icon.png')} 
            alt="Conversion" 
            className="tabIcon" 
          />
          ETH Conversion
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("deposit");
          }}
          className={dashboardTab === "deposit" ? "activeTab" : "tab"}
        >
          <img 
            src={require('./assets/deposit-icon.png')} 
            alt="Deposit" 
            className="tabIcon" 
          />
          Deposit
        </button>
        <button
          onClick={() => {
            updateLastActivityTime();
            setDashboardTab("withdraw");
          }}
          className={dashboardTab === "withdraw" ? "activeTab" : "tab"}
        >
          <img 
            src={require('./assets/withdraw-icon.png')} 
            alt="Withdraw" 
            className="tabIcon" 
          />
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

      {/* Footer */}
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleSignup = (userData) => {
    console.log("User signed up:", userData);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleKYCSubmit = (kycData) => {
    setKycRequests([...kycRequests, { ...kycData, status: "Pending" }]);
    setIsKYCSubmitted(true);
  };

  const handleApprove = (index) => {
    const updatedRequests = [...kycRequests];
    updatedRequests[index].status = "Approved";
    setKycRequests(updatedRequests);
    setKycStatus("Approved");
  };

  const handleReject = (index) => {
    const updatedRequests = [...kycRequests];
    updatedRequests[index].status = "Rejected";
    setKycRequests(updatedRequests);
    setKycStatus("Rejected");
  };

  return (
    <Router>
      <div className="app">
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

