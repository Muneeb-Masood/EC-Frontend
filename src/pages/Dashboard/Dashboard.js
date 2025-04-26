import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../../styles.css";
import Notification from "../../components/Notification/Notification";
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';


import s1 from '../../assets/s1.png';
import s2 from '../../assets/s2.png';
import s3 from '../../assets/s3.png';
import bnbLogo from '../../assets/bnb-logo.png';
import btcLogo from '../../assets/btc-logo.png';
import ethLogo from '../../assets/eth-logo.png';
import partiLogo from '../../assets/parti-logo.png';
import solLogo from '../../assets/sol-logo.png';
import bananaLogo from '../../assets/banana-logo.png';
import broccoliLogo from '../../assets/broccoli-logo.png';
import tutLogo from '../../assets/tut-logo.png';
import nilLogo from '../../assets/nil-logo.png';
import xusdLogo from '../../assets/xusd-logo.png';
import transferIcon from '../../assets/transfer-icon.png';
import eWalletIcon from '../../assets/e-wallet.png';
import historyIcon from '../../assets/history-icon.png';
import conversionIcon from '../../assets/conversion-icon.png';
import depositIcon from '../../assets/deposit-icon.png';
import withdrawIcon from '../../assets/withdraw-icon.png';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


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
    const [isUpdating2FA, setIsUpdating2FA] = useState(false);
  
    const ETH_TO_USD_RATE = 2000; // Fixed conversion rate: 1 ETH = $2000
  
    // Error handling utility function
    const handleApiError = (error, defaultMessage) => {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          defaultMessage;
      setNotification(errorMessage);
      
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.error('API Error:', error);
      }
    };
  
    // Initialize 2FA status from backend
    useEffect(() => {
      const check2FAStatus = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_BASE_URL}/api/user/2fa-status`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIs2FAEnabled(response.data.is2FAEnabled);
        } catch (error) {
          console.error("Could not fetch 2FA status:", error);
        }
      };
      
      check2FAStatus();
    }, []);
  
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
      setIsUpdating2FA(true);
      
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
        handleApiError(error, "Failed to update 2FA settings. Please try again.");
      } finally {
        setIsUpdating2FA(false);
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
      src={s1} 
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
      src={s2} 
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
      src={s3} 
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
                <img src={bnbLogo} alt="BNB" className="cryptoLogo" />
                BNB
                </span>
                <span className="cryptoPrice">лв1,148.33</span>
                <span className="cryptoChange positive">+0.67%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={btcLogo} alt="BTC" className="cryptoLogo" />
                BTC
                </span>
                <span className="cryptoPrice">лв155,138.40</span>
                <span className="cryptoChange negative">-1.98%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={ethLogo} alt="ETH" className="cryptoLogo" />
                ETH
                </span>
                <span className="cryptoPrice">лв3,436.51</span>
                <span className="cryptoChange negative">-6.39%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={partiLogo} alt="PARTI" className="cryptoLogo" />
                PARTI
                </span>
                <span className="cryptoPrice">лв0.574938</span>
                <span className="cryptoChange negative">-5.90%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={solLogo} alt="SOL" className="cryptoLogo" />
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
                <img src={bananaLogo} alt="BANANAS" className="cryptoLogo" />
                BANANAS31
                </span>
                <span className="cryptoPrice">лв0.00967964</span>
                <span className="cryptoChange positive">+1.15%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={broccoliLogo} alt="BROCCOLI" className="cryptoLogo" />
                BROCCOLI714
                </span>
                <span className="cryptoPrice">лв0.0540052</span>
                <span className="cryptoChange negative">-7.92%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={tutLogo} alt="TUT" className="cryptoLogo" />
                TUT
                </span>
                <span className="cryptoPrice">лв0.045212</span>
                <span className="cryptoChange negative">-13.69%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={nilLogo} alt="NIL" className="cryptoLogo" />
                NIL
                </span>
                <span className="cryptoPrice">лв0.78498</span>
                <span className="cryptoChange negative">-4.96%</span>
              </div>
              <div className="cryptoItem">
                <span className="cryptoName">
                <img src={xusdLogo} alt="XUSD" className="cryptoLogo" />
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
    onClick={() => setDashboardTab("transfer")}
    className={dashboardTab === "transfer" ? "activeTab" : "tab"}
  >
    <img 
      src={transferIcon} 
      alt="Transfer" 
      className="tabIcon" 
    />
    Transfer ETH
  </button>
  
  <button 
    onClick={() => setDashboardTab("total")}
    className={dashboardTab === "total" ? "activeTab" : "tab"}
  >
    <img 
      src={eWalletIcon} 
      alt="Total" 
      className="tabIcon" 
    />
    Total ETH
  </button>
  
  <button 
    onClick={() => setDashboardTab("history")}
    className={dashboardTab === "history" ? "activeTab" : "tab"}
  >
    <img 
      src={historyIcon} 
      alt="History" 
      className="tabIcon" 
    />
    Transaction History
  </button>
  
  <button 
    onClick={() => setDashboardTab("conversion")}
    className={dashboardTab === "conversion" ? "activeTab" : "tab"}
  >
    <img 
      src={conversionIcon} 
      alt="Conversion" 
      className="tabIcon" 
    />
    ETH Conversion
  </button>
  
  <button 
    onClick={() => setDashboardTab("deposit")}
    className={dashboardTab === "deposit" ? "activeTab" : "tab"}
  >
    <img 
      src={depositIcon} 
      alt="Deposit" 
      className="tabIcon" 
    />
    Deposit
  </button>
  
  <button 
    onClick={() => setDashboardTab("withdraw")}
    className={dashboardTab === "withdraw" ? "activeTab" : "tab"}
  >
    <img 
      src={withdrawIcon} 
      alt="Withdraw" 
      className="tabIcon" 
    />
    Withdraw
  </button>
</div>

  
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
  export default Dashboard;