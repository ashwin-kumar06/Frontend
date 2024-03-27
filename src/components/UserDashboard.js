import '../styles/UserDashboard.css'
import UdYourBidding from './UdYourBidding';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProductReport from './ProductReport';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
    const userId = localStorage.getItem('signin');
    const [products, setProducts] = useState([]);
    const [userdetails, setUserDetails] = useState([]);

    useEffect(() => {
        fetchProduct();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5269/api/PersonalDetails/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error()
        }
    }

    const fetchProduct = async () => {
        try {
            const sellerResponse = await axios.get(`http://localhost:5269/api/Products/BySeller/${userId}`);
            console.log("seller product", sellerResponse.data)
            setProducts(sellerResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error)
        }

    }
    const navigate = useNavigate();
    const handleLogout = async () => {
        navigate("/login")
        try {
            const cleanupLocalStorage = () => {
                localStorage.removeItem('signin'); // Remove userId from local storage 
            };
            window.addEventListener('beforeunload', cleanupLocalStorage);
            return () => {
                window.removeEventListener('beforeunload', cleanupLocalStorage);
            };

        } catch (error) {
            console.error('Error:', error);
        } finally {
            window.location.reload();
            

        }
    }


    return (
        <div>
            <div class="side-menu">
                <div class="brand-name">
                    <h1>AAA</h1>
                </div>
                <ul>
                    <li><span><a href='/'>Home</a></span> </li>
                    <li><span><a href='/productlisting'>Buy</a></span> </li>
                    <li><span><a href='/addproducts'>Sell</a></span> </li>
                    <li><span>Settings</span> </li>
                </ul>
            </div>
            <div class="container dashboard">
                <div class="header">
                    <div class="nav">
                        <div class="search">
                            <input type="text" placeholder="Search.." />
                            <button type="submit"><i class="bi bi-search"></i></button>
                        </div>
                        <div class="user">

                            <div class="img-case d-flex">
                                {userId ? <h3>{userdetails.name}</h3> : <p></p>}

                            </div>
                        </div>
                        {userId ? <a onClick={handleLogout} className='btn'>Logout</a> : <a href="/login" class="btn">Sign in</a>}
                    </div>
                </div>
                <div class="content">
                    <div class="cards">
                        <div class="card">
                            <div class="box">
                                <h1>₹ 219400</h1>
                                <h3>Earned</h3>
                            </div>
                            <div class="icon-case">
                                <img src="students.png" alt="" />
                            </div>
                        </div>
                        <div class="card">
                            <div class="box">
                                <h1>₹ 350000</h1>
                                <h3>Spend</h3>
                            </div>
                            <div class="icon-case">
                                <img src="income.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="content-2">
                        <div class="recent-payments">
                            <div class="title">
                                <h2>Added Products</h2>
                            </div>
                            <table>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Heighest Bid</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                </tr>
                                {products.map((product, index) => (
                                    <tr key={product.productId}>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>₹{product.startingPrice}</td>
                                        <td>{product.endingDate}</td>
                                        <td>{product.status}</td>
                                        <td><a className='btn' href={`/viewbids/${product.productId}`}>View Bids</a></td>
                                    </tr>
                                ))}
                            </table>
                            <PDFDownloadLink document={<ProductReport products={products} />} fileName="product_report.pdf">

                            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download Product Report')}

                        </PDFDownloadLink>
                        </div>
                        
                        <UdYourBidding />
                    </div>

                </div>
            </div>
        </div>
    )
}