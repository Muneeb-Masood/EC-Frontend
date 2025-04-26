import React, { useState } from "react";
import "../../styles.css";
import Notification from '../../components/Notification/Notification';


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
  export default AdminPanel;  