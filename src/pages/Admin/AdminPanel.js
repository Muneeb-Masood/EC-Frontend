import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles.css";
import Notification from "../../components/Notification/Notification";
import axios from "axios";

const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const AdminPanel = ({ kycRequests, onApprove, onReject }) => {
    const [activeTab, setActiveTab] = useState("kyc");
    const [transactions, setTransactions] = useState([]);
    const mapRef = useRef(null);

    const [notification, setNotification] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });
    const [radius, setRadius] = useState(2000);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedKYCRequest, setSelectedKYCRequest] = useState(null);
    const [allClusters, setAllClusters] = useState([]);
    const [mapKey, setMapKey] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(15);

    // Get admin's current location
    // useEffect(() => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const { latitude, longitude } = position.coords;
    //         setUserLocation({ lat: latitude, lng: longitude });
    //         setMapCenter({ lat: latitude, lng: longitude });
    //       },
    //       (error) => {
    //         console.error("Error getting location:", error);
    //         setNotification({ type: 'error', message: 'Could not get your location. Using default map center.' });
    //       }
    //     );
    //   }
    // }, []);

    // Extract all clusters from transactions

    useEffect(() => {
        const fetchClusterData = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/admin/clusterInfo`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "AdminLoginToken"
                            )}`,
                        },
                    }
                );
                console.log(response);

                if (response.data.data) {
                    const clusters = Object.entries(
                        response.data.data.clusters_info
                    )
                        .filter(
                            ([key, value]) =>
                                key.startsWith("cluster") &&
                                key.endsWith("_info")
                        )
                        .map(([key, value]) => ({
                            cluster_id: key,
                            ...value,
                        }));
                    setAllClusters(clusters);
                    console.log(clusters);
                }
            } catch (error) {
                handleApiError(error, "Cannot fetch transaction data");
            }
        };

        fetchClusterData();
        const intervalId = setInterval(fetchClusterData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (allClusters.length > 0 && mapRef.current) {
            mapRef.current.setView([
                allClusters[0].latitude_center,
                allClusters[0].longitude_center,
            ]);
        }
    }, [allClusters]);

    const handleClusterClick = (cluster) => {
        if (mapRef.current) {
            mapRef.current.setView([
                cluster.latitude_center,
                cluster.longitude_center,
            ]);
        }
    };

    // Auto-refresh map every 30 seconds
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setMapKey(prevKey => prevKey + 1);
    //   }, 30000);

    //   return () => clearInterval(interval);
    // }, []);

    // Calculate distance between two coordinates in km
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // return (
    //   <div className="adminPanel">
    //     <h2 className="heading">Admin Dashboard</h2>

    //     {notification && (
    //       <Notification
    //         message={notification.message}
    //         onClose={() => setNotification(null)}
    //         type={notification.type}
    //       />
    //     )}

    //     <div className="adminTabs">
    //       <button
    //         className={`adminTab ${activeTab === 'kyc' ? 'activeAdminTab' : ''}`}
    //         onClick={() => setActiveTab('kyc')}
    //       >
    //         KYC Requests
    //       </button>
    //       <button
    //         className={`adminTab ${activeTab === 'transactions' ? 'activeAdminTab' : ''}`}
    //         onClick={() => setActiveTab('transactions')}
    //       >
    //         Transaction Approvals
    //       </button>
    //     </div>

    //     {activeTab === 'kyc' && (
    //       <div className="adminTabContent">
    //         <h3>KYC Verification Requests</h3>
    //         {kycRequests.length === 0 ? (
    //           <p>No pending KYC requests.</p>
    //         ) : (
    //           <table className="adminTable">
    //             <thead>
    //               <tr>
    //                 <th>Name</th>
    //                 <th>Phone Number</th>
    //                 <th>Document Type</th>
    //                 <th>Document Link</th>
    //                 <th>Status</th>
    //                 <th>Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {kycRequests.map((request, index) => (
    //                 <tr key={index}>
    //                   <td>{request.name}</td>
    //                   <td>{request.phoneNumber}</td>
    //                   <td>{request.documentType}</td>
    //                       <td className="viewDocument">
    //                         <a
    //                           href={request.documentReference}
    //                           target="_blank"
    //                         >
    //                           View Document
    //                         </a>
    //                       </td>
    //                     <td>{request.verificationStatus}</td>
    //                   <td className="actionButtons">
    //                     <button
    //                       onClick={() => onApprove(request.kycID)}
    //                       className="approveButton"
    //                       disabled={request.verificationStatus !== 'pending'}
    //                     >
    //                       Approve
    //                     </button>
    //                     <button
    //                       onClick={() =>  {
    //                         console.log("Button is pressend")
    //                         console.log("Id is " ,  request.kycID);
    //                         openRejectModal(request.kycID)
    //                       } }
    //                       className="rejectButton"
    //                       disabled={request.verificationStatus !== 'pending'}
    //                     >
    //                       Reject
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         )}
    //       </div>
    //     )}

    //     {activeTab === 'transactions' && (
    //       <div className="adminTabContent">
    //         <h3>Pending Transactions</h3>
    //         {transactions.filter(tx => tx.status === 'Pending').length === 0 ? (
    //           <p>No pending transactions.</p>
    //         ) : (
    //           <table className="adminTable">
    //             <thead>
    //               <tr>
    //                 <th>ID</th>
    //                 <th>Type</th>
    //                 <th>User</th>
    //                 <th>Amount</th>
    //                 <th>Date</th>
    //                 <th>Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {transactions.filter(tx => tx.status === 'Pending').map(tx => (
    //                 <tr key={tx.id}>
    //                   <td>{tx.id}</td>
    //                   <td>{tx.type}</td>
    //                   <td>{tx.user}</td>
    //                   <td>{tx.amount}</td>
    //                   <td>{tx.date}</td>
    //                   <td className="actionButtons">
    //                     <button
    //                       onClick={() => handleApproveTransaction(tx.id)}
    //                       className="approveButton"
    //                     >
    //                       Approve
    //                     </button>
    //                     <button
    //                       onClick={() => handleRejectTransaction(tx.id)}
    //                       className="rejectButton"
    //                     >
    //                       Reject
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         )}

    //         <h3>Transaction History</h3>
    //         {transactions.filter(tx => tx.status !== 'Pending').length === 0 ? (
    //           <p>No transaction history.</p>
    //         ) : (
    //           <table className="adminTable">
    //             <thead>
    //               <tr>
    //                 <th>ID</th>
    //                 <th>Type</th>
    //                 <th>User</th>
    //                 <th>Amount</th>
    //                 <th>Status</th>
    //                 <th>Date</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {transactions.filter(tx => tx.status !== 'Pending').map(tx => (
    //                 <tr key={tx.id}>
    //                   <td>{tx.id}</td>
    //                   <td>{tx.type}</td>
    //                   <td>{tx.user}</td>
    //                   <td>{tx.amount}</td>
    //                   <td className={tx.status === 'Approved' ? 'statusApproved' : 'statusRejected'}>
    //                     {tx.status}
    //                   </td>
    //                   <td>{tx.date}</td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         )}
    //       </div>
    //     )}
    //     <div className="adminFooter">
    //       <p>© 2025 Zentron. All rights reserved.</p>
    //       <p>
    //         <a href="#">Terms of Service</a>
    //         <a href="#">Privacy Policy</a>
    //         <a href="#">Contact Us</a>
    //       </p>
    //     </div>
    //   </div>)

    // Filter requests within radius
    const requestsWithinRadius = kycRequests.filter((request) => {
        if (!request.location) return false;
        return (
            calculateDistance(
                mapCenter.lat,
                mapCenter.lng,
                request.location.lat,
                request.location.lng
            ) <=
            radius / 1000
        );
    });

    // const handleRejectTransaction = (id) => {
    //   setTransactions(transactions.map(tx =>
    //     tx.id === id ? { ...tx, status: 'Approved' } : tx
    //   ));
    //   setNotification({ type: 'success', message: 'Transaction approved successfully!' });
    // };

    const handleApproveTransaction = async (
        transactionID,
        senderID,
        destinationWalletAddress,
        amount
    ) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/approveTransaction`,
                {
                    transactionID: transactionID,
                    senderID: senderID,
                    recieverWalletAddress: destinationWalletAddress,
                    amountInETH: amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "AdminLoginToken"
                        )}`,
                    },
                }
            );

            if (response.data) {
                setNotification({
                    type: "success",
                    message: "Transaction approved successfully!",
                });
            }
        } catch (error) {
            handleApiError(error, "Cannot fetch transaction data");
        }
    };

    const handleApproveWithLocationCheck = (index) => {
        const request = kycRequests[index];
        if (!request.location) {
            if (
                !window.confirm(
                    "This request has no location data. Approve anyway?"
                )
            ) {
                return;
            }
        } else {
            const distance = calculateDistance(
                mapCenter.lat,
                mapCenter.lng,
                request.location.lat,
                request.location.lng
            );

            if (distance > radius / 1000) {
                if (
                    !window.confirm(
                        `This request is ${distance.toFixed(
                            1
                        )}km away (outside ${
                            radius / 1000
                        }km radius). Approve anyway?`
                    )
                ) {
                    return;
                }
            }
        }

        onApprove(index);
        setNotification({ type: "success", message: "KYC request approved!" });
    };

    const viewKYCDocuments = (request) => {
        setSelectedKYCRequest(request);
    };

    const handleApiError = (error, defaultMessage) => {
        const errorMessage =
            error.response?.data?.message || error.message || defaultMessage;
        // setError(errorMessage);

        if (process.env.REACT_APP_DEBUG === "true") {
            console.error("API Error:", error);
        }
    };

    const retrievePendingTransactionData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/blockedTransactions`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "AdminLoginToken"
                        )}`,
                    },
                }
            );

            if (response.data) {
                console.log(response.data);
                setTransactions(response.data);
            }
        } catch (error) {
            handleApiError(error, "Cannot fetch transaction data");
        }
    };

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const getCurrentDateFormatted = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const handleGenerateLogs = async () => {
        console.log("Generating logs from", fromDate, "to", toDate);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/getLog`,
                {
                    startDate: "2025-04-15",
                    endDate: "2025-05-19",
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "AdminLoginToken"
                        )}`,
                    },
                }
            );

            if (response.data && typeof response.data === "string") {
                const csvData = response.data;

                const currentDate = getCurrentDateFormatted();

                const fileName = `transaction_log_${currentDate}_from_${fromDate}_to_${toDate}.csv`;

                const blob = new Blob([csvData], {
                    type: "text/csv;charset=utf-8;",
                });

                const link = document.createElement("a");

                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);

                link.style.visibility = "hidden"; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                URL.revokeObjectURL(url);

                setNotification({
                    type: "success",
                    message: `Log "${fileName}" generated and download started.`,
                });
            }
        } catch (error) {
            handleApiError(error, "Cannot fetch transaction data");
        }
    };

    const handleUploadCSV = (e) => {

    };

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const showTransactionDetails = (tx) => {
        setSelectedTransaction(tx);
    };

    const hideTransactionDetails = () => {
        setSelectedTransaction(null);
    };

    const renderClusterInfo = (clusterInfo) => {
        if (!clusterInfo) return null;

        return (
            <div className="clusterInfoContainer">
                <h4>Transaction Cluster Analysis</h4>
                <div className="clusterSummary">
                    <p>
                        <strong>Baseline Density:</strong>{" "}
                        {clusterInfo.baseline_density} transactions/km²
                    </p>
                    <p>
                        <strong>Clusters Identified:</strong>{" "}
                        {clusterInfo.clusters_identified}
                    </p>
                    <p>
                        <strong>This Transaction:</strong>
                        {clusterInfo.this_transaction_is_in_cluster
                            ? ` In cluster ${clusterInfo.transaction_cluster_number} (Density: ${clusterInfo.transaction_cluster_density} transactions/km²)`
                            : " Not in any cluster"}
                    </p>
                    {clusterInfo.distance_from_cluster_center_km && (
                        <p>
                            <strong>Distance from Cluster Center:</strong>{" "}
                            {clusterInfo.distance_from_cluster_center_km} km
                        </p>
                    )}
                </div>

                <div className="clustersDetails">
                    <h5>Cluster Details:</h5>
                    {Object.keys(clusterInfo)
                        .filter(
                            (key) =>
                                key.includes("cluster") &&
                                key.includes("info") &&
                                key !== "clusters_info"
                        )
                        .map((clusterKey, index) => {
                            const cluster = clusterInfo[clusterKey];
                            return (
                                <div
                                    key={index}
                                    className={`clusterDetail ${
                                        cluster.is_suspicious
                                            ? "suspiciousCluster"
                                            : "normalCluster"
                                    }`}
                                >
                                    <h6>
                                        {clusterKey
                                            .replace("_info", "")
                                            .toUpperCase()}
                                    </h6>
                                    <p>
                                        <strong>Density:</strong>{" "}
                                        {cluster.density_per_km2}{" "}
                                        transactions/km²
                                    </p>
                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {cluster.latitude_center},{" "}
                                        {cluster.longitude_center}
                                    </p>
                                    <p>
                                        <strong>Radius:</strong>{" "}
                                        {cluster.radius_km} km
                                    </p>
                                    <p>
                                        <strong>Transactions:</strong>{" "}
                                        {cluster.transaction_count}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>
                                        <span
                                            className={
                                                cluster.is_suspicious
                                                    ? "suspiciousText"
                                                    : "normalText"
                                            }
                                        >
                                            {cluster.is_suspicious
                                                ? "SUSPICIOUS"
                                                : "Normal"}
                                        </span>
                                    </p>
                                    {cluster.is_suspicious && (
                                        <p>
                                            <strong>Reason:</strong>{" "}
                                            {cluster.suspicious_reason}
                                        </p>
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
                    className={`adminTab ${
                        activeTab === "kyc" ? "activeAdminTab" : ""
                    }`}
                    onClick={() => setActiveTab("kyc")}
                >
                    KYC Requests
                </button>
                <button
                    className={`adminTab ${
                        activeTab === "transactions" ? "activeAdminTab" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("transactions");
                        retrievePendingTransactionData();
                    }}
                >
                    Transaction Approvals
                </button>
                <button
                    className={`adminTab ${
                        activeTab === "clusters" ? "activeAdminTab" : ""
                    }`}
                    onClick={() => setActiveTab("clusters")}
                >
                    Clusters
                </button>
                <button
                    className={`adminTab ${
                        activeTab === "transactionLogs" ? "activeAdminTab" : ""
                    }`}
                    onClick={() => setActiveTab("transactionLogs")}
                >
                    Transaction Logs
                </button>
            </div>

            {activeTab === "kyc" && (
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
                                    <th>CNIC Front</th>
                                    <th>CNIC Back</th>
                                    <th>Selfie</th>
                                    <th>Utility Bill</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kycRequests.map((request, index) => {
                                    const distance = request.location
                                        ? calculateDistance(
                                              mapCenter.lat,
                                              mapCenter.lng,
                                              request.location.latitude,
                                              request.location.longitude
                                          )
                                        : null;

                                    const isWithinRadius =
                                        distance !== null &&
                                        distance <= radius / 1000;

                                    return (
                                        <tr key={index}>
                                            <td>{request.name}</td>
                                            <td>{request.phoneNumber}</td>

                                            {/* CNIC Front */}
                                            <td className="viewDocument">
                                                <a
                                                    href={
                                                        request.cnicFrontReference
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: "lightblue",
                                                    }}
                                                >
                                                    View CNIC Front
                                                </a>
                                            </td>

                                            {/* CNIC Back */}
                                            <td className="viewDocument">
                                                <a
                                                    href={
                                                        request.cnicBackReference
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: "lightblue",
                                                    }}
                                                >
                                                    View CNIC Back
                                                </a>
                                            </td>

                                            {/* Selfie */}
                                            <td className="viewDocument">
                                                <a
                                                    href={
                                                        request.selfieReference
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: "lightblue",
                                                    }}
                                                >
                                                    View Selfie
                                                </a>
                                            </td>

                                            {/* Utility Bill */}
                                            <td className="viewDocument">
                                                <a
                                                    href={
                                                        request.utilityBillReference
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: "lightblue",
                                                    }}
                                                >
                                                    View Utility Bill
                                                </a>
                                            </td>

                                            {/* Location */}
                                            <td>
                                                {request.location ? (
                                                    <span
                                                        className={
                                                            isWithinRadius
                                                                ? "inRadius"
                                                                : "outOfRadius"
                                                        }
                                                    >
                                                        {distance
                                                            ? `${distance.toFixed(
                                                                  1
                                                              )} km`
                                                            : "Unknown"}
                                                    </span>
                                                ) : (
                                                    "No location"
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td>
                                                {request.verificationStatus}
                                            </td>
                                            <td className="actionButtons">
                                                <button
                                                    onClick={() =>
                                                        onApprove(request.kycID)
                                                    }
                                                    className="approveButton"
                                                    disabled={
                                                        request.verificationStatus !==
                                                        "pending"
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        console.log(
                                                            "Button is pressend"
                                                        );
                                                        console.log(
                                                            "Id is ",
                                                            request.kycID
                                                        );
                                                        onReject(request.kycID);
                                                    }}
                                                    className="rejectButton"
                                                    disabled={
                                                        request.verificationStatus !==
                                                        "pending"
                                                    }
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

            <>
                {activeTab === "transactions" && (
                    <div className="adminTabContent">
                        <h3>Pending Transactions</h3>
                        {transactions.length === 0 ? (
                            <p>No pending transactions.</p>
                        ) : (
                            <table className="adminTable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Initiation Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.transactionID}>
                                            <td>{tx.transactionID}</td>
                                            <td>{tx.type}</td>
                                            <td>{tx.amount}</td>
                                            <td>
                                                {new Date(
                                                    tx.initiationTimestamp *
                                                        1000
                                                ).toLocaleString()}
                                            </td>
                                            <td className="actionButtons">
                                                <button
                                                    onClick={() =>
                                                        showTransactionDetails(
                                                            tx
                                                        )
                                                    }
                                                    className="showTransactionDetailsButton"
                                                >
                                                    Show More Details
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleApproveTransaction(
                                                            tx.transactionID,
                                                            tx.senderID,
                                                            tx.destinationWalletAddress,
                                                            tx.amount
                                                        )
                                                    }
                                                    className="approveButton"
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <h3>Transaction History</h3>
                    </div>
                )}

                {selectedTransaction && (
                    <div className="TransactionDetailsOverlay">
                        <div className="TransactionDetailsContent">
                            <span
                                className="closeButton"
                                onClick={hideTransactionDetails}
                            >
                                &times;
                            </span>
                            <h3>Transaction Details</h3>
                            <table className="TransactionDetailsTable">
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>ID:</strong>
                                        </td>
                                        <td>
                                            {selectedTransaction.transactionID}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Type:</strong>
                                        </td>
                                        <td>{selectedTransaction.type}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Amount:</strong>
                                        </td>
                                        <td>
                                            {selectedTransaction.amount}{" "}
                                            {selectedTransaction.currency}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Status:</strong>
                                        </td>
                                        <td>{selectedTransaction.status}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Sender ID:</strong>
                                        </td>
                                        <td>{selectedTransaction.senderID}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Source Login ID:</strong>
                                        </td>
                                        <td>
                                            {selectedTransaction.sourceLoginId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                Destination Login ID:
                                            </strong>
                                        </td>
                                        <td>
                                            {selectedTransaction.destinationLoginId ??
                                                "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Source Wallet:</strong>
                                        </td>
                                        <td>
                                            {
                                                selectedTransaction.sourceWalletAddress
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Destination Wallet:</strong>
                                        </td>
                                        <td>
                                            {
                                                selectedTransaction.destinationWalletAddress
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Initiated:</strong>
                                        </td>
                                        <td>
                                            {new Date(
                                                selectedTransaction.initiationTimestamp *
                                                    1000
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Completed:</strong>
                                        </td>
                                        <td>
                                            {selectedTransaction.completionTimestamp
                                                ? new Date(
                                                      selectedTransaction.completionTimestamp *
                                                          1000
                                                  ).toLocaleString()
                                                : "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Fraud Type:</strong>
                                        </td>
                                        <td>{selectedTransaction.fraudType}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Severity:</strong>
                                        </td>
                                        <td>{selectedTransaction.severity}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Email:</strong>
                                        </td>
                                        <td>{selectedTransaction.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </>

            {activeTab === "clusters" && (
                <div className="adminTabContent">
                    <h3>Transaction Clusters</h3>

                    <div className="mapSection">
                        <div className="mapContainer">
                            <MapContainer
                                ref={mapRef}
                                center={mapCenter}
                                zoom={13} // Changed from 1000 to a more reasonable zoom level (typically 1-18)
                                style={{ height: "400px", width: "100%" }}
                                maxBoundsViscosity={1.0}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />

                                {allClusters.map((c, idx) => (
                                    <Circle
                                        key={idx}
                                        center={[
                                            c.latitude_center,
                                            c.longitude_center,
                                        ]}
                                        radius={c.radius_km * 1000}
                                        color={
                                            c.is_suspicious ? "red" : "green"
                                        }
                                        fillOpacity={0.3}
                                    >
                                        <Popup>
                                            <div>
                                                <strong>
                                                    Cluster {c.label}
                                                </strong>
                                                <br />
                                                Suspicious:{" "}
                                                {c.is_suspicious ? "Yes" : "No"}
                                                <br />
                                                Density: {c.density_per_km2}
                                                <br />
                                                Transactions:{" "}
                                                {c.transaction_count}
                                                <br />
                                                Reason: {c.suspicious_reason}
                                            </div>
                                        </Popup>
                                    </Circle>
                                ))}
                            </MapContainer>
                        </div>
                    </div>

                    <h4>All Clusters</h4>
                    {allClusters.length === 0 ? (
                        <p>No clusters found.</p>
                    ) : (
                        <table className="adminTable">
                            <thead>
                                <tr>
                                    <th>Cluster</th>
                                    <th>Density</th>
                                    <th>Location</th>
                                    <th>Radius</th>
                                    <th>Transactions</th>
                                    <th>Status</th>
                                    <th>Source TX</th>
                                    <th>Action</th>{" "}
                                    {/* New header for the button */}
                                </tr>
                            </thead>
                            <tbody>
                                {allClusters.map((cluster, index) => (
                                    <tr key={index}>
                                        <td>{cluster.cluster_id}</td>
                                        <td>{cluster.density_per_km2}</td>
                                        <td>{`${cluster.latitude_center}, ${cluster.longitude_center}`}</td>
                                        <td>{cluster.radius_km} km</td>
                                        <td>{cluster.transaction_count}</td>
                                        <td
                                            style={{
                                                color: cluster.is_suspicious
                                                    ? "red"
                                                    : "green",
                                            }}
                                        >
                                            {cluster.is_suspicious
                                                ? "Suspicious"
                                                : "Normal"}
                                        </td>
                                        <td>{cluster.suspicious_reason}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleClusterClick(cluster)
                                                }
                                            >
                                                Move to Cluster {cluster.label}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {selectedKYCRequest && (
                <div className="modalBackdrop">
                    <div className="kycDocumentsModal">
                        <h3>KYC Documents for {selectedKYCRequest.name}</h3>
                        <div className="documentGrid">
                            <div className="documentItem">
                                <h4>Selfie with ID</h4>
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_BASE_URL ||
                                        "http://localhost:5000"
                                    }/uploads/${selectedKYCRequest.selfie}`}
                                    alt="Selfie with ID"
                                />
                            </div>
                            <div className="documentItem">
                                <h4>ID Front</h4>
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_BASE_URL ||
                                        "http://localhost:5000"
                                    }/uploads/${selectedKYCRequest.idFront}`}
                                    alt="ID Front"
                                />
                            </div>
                            <div className="documentItem">
                                <h4>ID Back</h4>
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_BASE_URL ||
                                        "http://localhost:5000"
                                    }/uploads/${selectedKYCRequest.idBack}`}
                                    alt="ID Back"
                                />
                            </div>
                            <div className="documentItem">
                                <h4>Utility Bill</h4>
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_BASE_URL ||
                                        "http://localhost:5000"
                                    }/uploads/${
                                        selectedKYCRequest.utilityBill
                                    }`}
                                    alt="Utility Bill"
                                />
                            </div>
                        </div>
                        <div className="modalActions">
                            <button
                                onClick={() => setSelectedKYCRequest(null)}
                                className="closeButton"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "transactionLogs" && (
                <>
                    <div className="transaction-logs-container">
                        {/* Date Range Selector */}
                        <div className="date-range-row">
                            <div className="date-input">
                                <label>From:</label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) =>
                                        setFromDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="date-input">
                                <label>To:</label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleGenerateLogs}
                                className="generate-btn"
                            >
                                Generate Logs
                            </button>
                        </div>

                        <div className="upload-section">
                            <label>Upload CSV:</label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleUploadCSV}
                            />
                        </div>
                    </div>
                </>
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
