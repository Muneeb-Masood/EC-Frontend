import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../../styles.css";
import Notification from '../../components/Notification/Notification';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const AdminPanel = ({ kycRequests, onApprove, onReject }) => {
  const [activeTab, setActiveTab] = useState('kyc');
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      type: 'Withdrawal', 
      user: 'user1@example.com', 
      amount: '0.5 ETH', 
      status: 'Pending', 
      date: '2023-05-15 14:30',
      clusters_info: {
        baseline_density: 3.23,
        cluster1_info: {
          density_per_km2: 1.35,
          is_suspicious: false,
          label: 0,
          latitude_center: 12.320545,
          longitude_center: 120.300182,
          radius_km: 1.609,
          suspicious_reason: "Normal",
          transaction_count: 11
        },
        cluster2_info: {
          density_per_km2: 3.08,
          is_suspicious: false,
          label: 1,
          latitude_center: 12.3506,
          longitude_center: 120.5013,
          radius_km: 1.016,
          suspicious_reason: "Normal",
          transaction_count: 10
        },
        cluster3_info: {
          density_per_km2: 3.38,
          is_suspicious: false,
          label: 2,
          latitude_center: 12.5678,
          longitude_center: 120.6788,
          radius_km: 0.971,
          suspicious_reason: "Normal",
          transaction_count: 10
        },
        cluster4_info: {
          density_per_km2: 2583.71,
          is_suspicious: true,
          label: 3,
          latitude_center: 12.40014,
          longitude_center: 120.40014,
          radius_km: 0.025,
          suspicious_reason: "Absolute threshold exceeded (100.0)",
          transaction_count: 5
        },
        cluster5_info: {
          density_per_km2: 22.87,
          is_suspicious: true,
          label: 4,
          latitude_center: 12.1997,
          longitude_center: 120.1997,
          radius_km: 0.264,
          suspicious_reason: "Relative threshold (5.0x baseline)",
          transaction_count: 5
        },
        clusters_identified: 5,
        distance_from_cluster_center_km: 0.063,
        this_transaction_is_in_cluster: true,
        transaction_cluster_density: 1.35,
        transaction_cluster_number: "cluster1"
      }
    },
    { 
      id: 2, 
      type: 'Deposit', 
      user: 'user2@example.com', 
      amount: '1000 USD', 
      status: 'Pending', 
      date: '2023-05-15 15:45' 
    },
    { 
      id: 3, 
      type: 'Transfer', 
      user: 'user3@example.com', 
      amount: '1.2 ETH', 
      status: 'Pending', 
      date: '2023-05-16 09:15' 
    },
  ]);
  
  const [deposits, setDeposits] = useState([
    { id: 1, user: 'user4@example.com', amount: '500 USD', bankAccount: '****1234', status: 'Pending', date: '2023-05-14 11:20' },
    { id: 2, user: 'user5@example.com', amount: '750 USD', bankAccount: '****5678', status: 'Pending', date: '2023-05-15 16:30' },
  ]);
  
  const [notification, setNotification] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 }); // Default center (London)
  const [radius, setRadius] = useState(2000); // 2km in meters
  const [userLocation, setUserLocation] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Get admin's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          setNotification({ type: 'error', message: 'Could not get your location. Using default map center.' });
        }
      );
    }
  }, []);

  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filter requests within radius
  const requestsWithinRadius = kycRequests.filter(request => {
    if (!request.location) return false;
    return calculateDistance(
      mapCenter.lat, 
      mapCenter.lng, 
      request.location.lat, 
      request.location.lng
    ) <= (radius / 1000); 
  });

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

  const handleApproveWithLocationCheck = (index) => {
    const request = kycRequests[index];
    if (!request.location) {
      if (!window.confirm("This request has no location data. Approve anyway?")) {
        return;
      }
    } else {
      const distance = calculateDistance(
        mapCenter.lat,
        mapCenter.lng,
        request.location.lat,
        request.location.lng
      );
      
      if (distance > (radius / 1000)) {
        if (!window.confirm(`This request is ${distance.toFixed(1)}km away (outside ${radius/1000}km radius). Approve anyway?`)) {
          return;
        }
      }
    }
    
    onApprove(index);
    setNotification({ type: 'success', message: 'KYC request approved!' });
  };

  const renderClusterInfo = (clusterInfo) => {
    if (!clusterInfo) return null;
    
    return (
      <div className="clusterInfoContainer">
        <h4>Transaction Cluster Analysis</h4>
        <div className="clusterSummary">
          <p><strong>Baseline Density:</strong> {clusterInfo.baseline_density} transactions/km²</p>
          <p><strong>Clusters Identified:</strong> {clusterInfo.clusters_identified}</p>
          <p><strong>This Transaction:</strong> 
            {clusterInfo.this_transaction_is_in_cluster ? 
              ` In cluster ${clusterInfo.transaction_cluster_number} (Density: ${clusterInfo.transaction_cluster_density} transactions/km²)` : 
              ' Not in any cluster'}
          </p>
          {clusterInfo.distance_from_cluster_center_km && (
            <p><strong>Distance from Cluster Center:</strong> {clusterInfo.distance_from_cluster_center_km} km</p>
          )}
        </div>
        
        <div className="clustersDetails">
          <h5>Cluster Details:</h5>
          {Object.keys(clusterInfo)
            .filter(key => key.includes('cluster') && key.includes('info') && key !== 'clusters_info')
            .map((clusterKey, index) => {
              const cluster = clusterInfo[clusterKey];
              return (
                <div key={index} className={`clusterDetail ${cluster.is_suspicious ? 'suspiciousCluster' : 'normalCluster'}`}>
                  <h6>{clusterKey.replace('_info', '').toUpperCase()}</h6>
                  <p><strong>Density:</strong> {cluster.density_per_km2} transactions/km²</p>
                  <p><strong>Location:</strong> {cluster.latitude_center}, {cluster.longitude_center}</p>
                  <p><strong>Radius:</strong> {cluster.radius_km} km</p>
                  <p><strong>Transactions:</strong> {cluster.transaction_count}</p>
                  <p><strong>Status:</strong> 
                    <span className={cluster.is_suspicious ? 'suspiciousText' : 'normalText'}>
                      {cluster.is_suspicious ? 'SUSPICIOUS' : 'Normal'}
                    </span>
                  </p>
                  {cluster.is_suspicious && (
                    <p><strong>Reason:</strong> {cluster.suspicious_reason}</p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
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
          
          {/* Map Section */}
          <div className="mapSection">
            <h4>Requests within {radius/1000}km Radius</h4>
            <div className="mapControls">
              <label>
                Radius: 
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                />
                {radius/1000} km
              </label>
              {userLocation && (
                <button 
                  onClick={() => setMapCenter(userLocation)}
                  className="locationButton"
                >
                  Reset to My Location
                </button>
              )}
            </div>
            
            <div className="mapContainer">
              <MapContainer 
                center={mapCenter} 
                zoom={15} 
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Draw radius circle */}
                <Circle 
                  center={mapCenter} 
                  radius={radius} 
                  color="blue" 
                  fillOpacity={0.1} 
                />
                
                {/* Plot admin's location */}
                {userLocation && (
                  <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>Your Location</Popup>
                  </Marker>
                )}
                
                {/* Plot KYC request markers */}
                {kycRequests.map((request, index) => {
                  if (!request.location) return null;
                  return (
                    <Marker 
                      key={index} 
                      position={[request.location.lat, request.location.lng]}
                    >
                      <Popup>
                        <div>
                          <strong>{request.name}</strong>
                          <p>Phone: {request.phoneNumber}</p>
                          <p>Document: {request.documentType}</p>
                          <p>Status: {request.status}</p>
                          <div className="popupActions">
                            <button 
                              onClick={() => handleApproveWithLocationCheck(index)}
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
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
          
          {/* KYC Requests Table */}
          {kycRequests.length === 0 ? (
            <p>No pending KYC requests.</p>
          ) : (
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Document</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {kycRequests.map((request, index) => {
                  const distance = request.location ? 
                    calculateDistance(mapCenter.lat, mapCenter.lng, request.location.lat, request.location.lng) : 
                    null;
                  
                  const isWithinRadius = distance !== null && distance <= (radius / 1000);
                  
                  return (
                    <tr key={index}>
                      <td>{request.name}</td>
                      <td>{request.phoneNumber}</td>
                      <td>{request.documentType}</td>
                      <td>
                        {request.location ? (
                          <span className={isWithinRadius ? 'inRadius' : 'outOfRadius'}>
                            {distance ? `${distance.toFixed(1)}km` : 'Unknown'}
                          </span>
                        ) : 'No location'}
                      </td>
                      <td>{request.status}</td>
                      <td className="actionButtons">
                        <button 
                          onClick={() => handleApproveWithLocationCheck(index)} 
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
                  );
                })}
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
                  <th>Cluster Status</th>
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
                    <td>
                      {tx.clusters_info ? (
                        tx.clusters_info.this_transaction_is_in_cluster ? (
                          <span className={tx.clusters_info.transaction_cluster_number.includes('4') || 
                                          tx.clusters_info.transaction_cluster_number.includes('5') ? 
                                          'suspiciousText' : 'normalText'}>
                            {tx.clusters_info.transaction_cluster_number}
                          </span>
                        ) : 'No cluster'
                      ) : 'No data'}
                    </td>
                    <td className="actionButtons">
                      <button 
                        onClick={() => {
                          setSelectedTransaction(tx);
                        }} 
                        className="infoButton"
                      >
                        Details
                      </button>
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
          
          {selectedTransaction && (
            <div className="transactionDetailsModal">
              <div className="modalContent">
                <h3>Transaction Details</h3>
                <p><strong>ID:</strong> {selectedTransaction.id}</p>
                <p><strong>Type:</strong> {selectedTransaction.type}</p>
                <p><strong>User:</strong> {selectedTransaction.user}</p>
                <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                <p><strong>Date:</strong> {selectedTransaction.date}</p>
                
                {selectedTransaction.clusters_info && renderClusterInfo(selectedTransaction.clusters_info)}
                
                <div className="modalButtons">
                  <button 
                    onClick={() => handleApproveTransaction(selectedTransaction.id)}
                    className="approveButton"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleRejectTransaction(selectedTransaction.id)}
                    className="rejectButton"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => setSelectedTransaction(null)}
                    className="closeButton"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
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
                  <th>Cluster Status</th>
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
                    <td>
                      {tx.clusters_info ? (
                        tx.clusters_info.this_transaction_is_in_cluster ? (
                          <span className={tx.clusters_info.transaction_cluster_number.includes('4') || 
                                          tx.clusters_info.transaction_cluster_number.includes('5') ? 
                                          'suspiciousText' : 'normalText'}>
                            {tx.clusters_info.transaction_cluster_number}
                          </span>
                        ) : 'No cluster'
                      ) : 'No data'}
                    </td>
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