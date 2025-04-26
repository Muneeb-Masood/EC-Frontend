import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import '../../styles.css'; 
import Header from "../../components/Header/Header";
import qrCode from "../../assets/AIM-Binance.png";
import macosImage from "../../assets/macos.png"; 
import linuxImage from "../../assets/linux.png"; 
import windowsImage from "../../assets/windows.png"; 
import registerImg from "../../assets/register.png";
import teamMgmtImg from "../../assets/team-management.png";
import walletImg from "../../assets/wallet.png";
import collaborativeGrowthIcon from "../../assets/collaborative-growth.png";
import newsIcon from '../../assets/news-icon.png';


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
      <img src={newsIcon} alt="News" className="sectionTitleIcon" />
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

export default HomePage;