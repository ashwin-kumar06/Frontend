import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import BidReport from "./BidReport";
import { useNavigate } from "react-router-dom";

export default function UdYourBidding() {
    const userId = localStorage.getItem('signin');
    const [biddings, setBiddings] = useState([]);
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        fetchBidding();
    }, []);

    const fetchBidding = async () => {
        try {
            const response = await axios.get(`http://localhost:5269/api/Bids/BidderId/${userId}`);
            console.log("bids", response.data);
            if (response.data && response.data.length > 0) {
                setBiddings(response.data); // Assuming response.data is an array of bids 
                response.data.forEach(bid => {
                    userProduct(bid.productId);
                });
            } else {
                console.error("Error: response.data is not valid");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const userProduct = async (productId) => {

        try {
            const response = await axios.get(`http://localhost:5269/api/Products/${productId}`);
            setMyProducts(prevProducts => [...prevProducts, response.data]);
        } catch (error) {
            console.error("Error: ", error);
        }
    };
    const navigate = useNavigate();
    const handleBuyNow = async () => {
        navigate('/cardpayment')
    }

    return (
        <div className="new-students">
            <div className="title">
                <h2>Your bidding</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {biddings.map((bid, i) => (
                        <tr key={i}>
                            <td>{myProducts[i] && myProducts[i].title}</td>
                            <td>{bid.bidAmount}</td>
                            <td>
                                {bid.bidStatus === "waiting" ? (
                                    "Waiting"
                                ) : bid.bidStatus === "Buy Now" ? (
                                    <button className="btn" onClick={() => handleBuyNow(bid)}>Buy Now</button>
                                ) : (
                                    bid.bidStatus
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PDFDownloadLink document={<BidReport biddings={biddings} myProducts={myProducts} />} fileName="bid_report.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>        </div>
    );
} 