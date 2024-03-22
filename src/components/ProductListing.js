import '../styles/ProductListing.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5269/api/Products'); // Assuming the API endpoint is correct 
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductDetails = (product) => {
        setSelectedProduct(product);
    }

    return (
        <div className="product-listing">
            <nav>
                <div class="navbar navbar-expand-lg pt-4">
                    <div class="container-fluid">
                        <a href="#" class="brand text-decoration-none">AAA</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul id="nav-length" class="navbar-nav justify-content-between border-top border-2 text-center">
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3">Home</a>
                                </li>
                                <li class="nav-item d-flex justify-content-center h-100">
                                    <div class="searchbar">
                                        <input class="search_input" type="text" name="" placeholder="Search..." />
                                        <a href="#" class="search_icon"><i class="bi bi-search"></i></a>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3">About</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3">Contact</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" id="sign-in" class="nav-link my-2 px-4 text-white">
                                        Sign In
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='cate-list d-flex '>
                <div className="cate-recent">
                    <div className='cate'>
                        <h5>Categories</h5>
                        <ul>
                            <li><a href="">Electronics</a></li>
                            <li><a href="">Art</a></li>
                            <li><a href="">Fashion</a></li>
                            <li><a href="">Education</a></li>
                            <li><a href="">Entertainment</a></li>
                        </ul>
                    </div>
                    <div className='recent'>
                        <h5>Recent Bidders</h5>
                        <ul>
                            <li><a href="">Marketing Stratergies</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Marketing Stratergies</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Marketing Stratergies</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                            <li><a href="">Analytics</a></li>
                        </ul>
                    </div>
                </div>

                <div className='d-flex'>
              
                    <div className='listing'>
                    <h1 >Products List</h1>
                        <div className="products-container">
                            {products.map((product, index) => (
                                <div key={product.productId} className="product-item">
                                    <h3>{product.title}</h3>
                                    <p>Top Price: {product.startingPrice}</p>
                                    <p>Ending Date: {product.endingDate}</p>
                                    <div className="start-auction">
                                        <button className="btn btn-primary" type='button' onClick={() => handleProductDetails(product)}>Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='product-detail bg-warning'>
                        {selectedProduct && (
                            <div>
                                <h2>{selectedProduct.title}</h2>
                                <p>Description: {selectedProduct.description}</p>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}