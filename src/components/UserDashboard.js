import '../styles/UserDashboard.css'
import UdYourBidding from './UdYourBidding';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserDashboard() {
    const userId = localStorage.getItem('signin');
    const [products, setProducts] = useState([]);
    console.log(userId)

    useEffect(() => {
        fetchProduct();
        
    },[]);

    const fetchProduct = async () => {
        try{
            const sellerResponse = await axios.get(`http://localhost:5269/api/Products/BySeller/${userId}`);
            console.log("seller product",sellerResponse.data)
            setProducts(sellerResponse.data);
        }catch(error){
            console.error('Error fetching data:',error)
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
                            <a href="#" class="btn">Logout</a>
                            <img src="notifications.png" alt="" />
                            <div class="img-case">
                                <img src="user.png" alt="" />
                            </div>
                        </div>
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
                                    <th>Amount</th>
                                    <th>Expiry Date</th>
                                </tr>
                                {products.map((product, index) => (
                                    <tr key={product.productId}>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>₹{product.startingPrice}</td>
                                        <td>{product.endingDate}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <UdYourBidding/>
                    </div>
                </div>
            </div>
        </div>
    )
}