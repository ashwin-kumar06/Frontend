import '../styles/ViewBids.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewBids() {
    const { productId } = useParams();
    console.log("prod id", productId);
    const userId = localStorage.getItem('signin');
    const [product, setProduct] = useState([]);
    const [bidding, setBidding] = useState([]);
    const [bidders, setBidders] = useState({});

    useEffect(() => {
        fetchProduct(productId);
        fetchBid(productId);
    }, []);

    const fetchProduct = async (productId) => {
        console.log("submit prod id", productId)
        try {
            const response = await axios.get(`http://localhost:5269/api/Products/${productId}`);
            console.log("my product", response.data)
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product data:', error)
        }
    }

    const fetchBid = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:5269/api/Bids/ProductId/${productId}`)
            console.log("bid by prodid", response.data);
            setBidding(response.data);
            response.data.forEach(bid => {
                fetchUser(bid.bidderId);
            });
        } catch (error) {
            console.error('Error fetching bid data: ', error)
        }
    }

    const fetchUser = async (personId) => {
        try {
            const response = await axios.get(`http://localhost:5269/api/PersonalDetails/${personId}`)
            console.log("personal", response.data);
            setBidders(prevState => ({
                ...prevState,
                [personId]: response.data.name // Assuming name is the property to display 
            }));
        } catch (error) {
            console.error('Error fetching user data: ', error)

        }
    }
    const navigate = useNavigate()
    const updateBidStatus = async (bidderId, bidAmount) => {
        try {
            const response = await axios.put(`http://localhost:5269/api/Bids/BidStatus/${bidderId}?productId=${productId}&bidAmount=${bidAmount}`);
            navigate('/viewbids')
        } catch (error) {
            console.error('Error updating: ', error)
        }
    }

    const updateProductStatus = async (productId) =>{
        try{
            const response = await axios.put(`http://localhost:5269/api/Products/ProductStatus/${productId}`);
        }catch(error){
            console.error('product status:', error)
        }
    }

    return (
        <div> 
            <a className='btn'>Logout</a>
            <section className='viewbid-main'>
                <h1>{product.title}</h1>
                <div className="tbl-header">

                    <table className='viewbid' cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Bidders Name</th>
                                <th>Bidding Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table className='viewbid' cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {bidding.map(bid => (
                                <tr key={bid.id}>
                                    <td>{bidders[bid.bidderId]}</td>
                                    <td>{bid.bidAmount}</td>
                                    <td>
                                        {bid.approved ? (
                                            <p data-testid="Approved">Approved</p>
                                        ) : (
                                            <a className='btn' onClick={() => {updateBidStatus(bid.bidderId, bid.bidAmount); updateProductStatus(productId)}} data-testid='Approve'>Approve</a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

    )
} 