import { useEffect, useState } from "react";
import axios from "axios";


export default function UdYourBidding() {
    const userId = localStorage.getItem('signin');
    const [biddings, setBiddings] = useState([]);
    const [myProducts, setMyProduct] = useState([]);

    useEffect(() => {
        fetchBidding();
    },[]);

    const fetchBidding = async () => {  
        try {  
            const response = await axios.get(`http://localhost:5269/api/Bids/${userId}`);  
            if (response.data && response.data.productId) { 
                setBiddings([response.data]); // Assuming response.data is an object with productId 
                userProduct(response.data.productId);  
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
            setMyProduct(response.data);  
        } catch (error) {  
            console.error("Error: ", error);  
        }  
    };  
    return (
        <div class="new-students">
            <div class="title">
                <h2>Your bidding</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {biddings.map((bid, i) => (
                        <tr key={bid.productId}>
                            <td>{myProducts && myProducts.title}</td>
                            <td>{bid.bidAmount}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}