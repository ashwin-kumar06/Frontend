import '../styles/ProductListing.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function ProductListing() {
    const userId = localStorage.getItem('signin');
    console.log("user", userId);
    const [formData, setFormData] = useState({ bidAmount: '' });
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleBidNow = async (e) => {

        const currentDate = new Date();
        const time = currentDate.getTime();
        setFormData(formData.timeStamp = time);
        try {
            const response = await axios.post(`http://localhost:5269/api/Bids?userId=${userId}&productId=${e}&bidAmount=${formData.bidAmount}`, formData);
            setShowModal(true);
            console.log('bid:', response.data);
        } catch (error) {
            console.error('Error creating user:', error.response.data);
        }

    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5269/api/Products');
            const productsWithImages = await Promise.all(response.data.map(async (product) => {
                try {
                    const imageResponse = await axios.get(`http://localhost:5269/api/Products/${product.productId}/Image`, {
                        responseType: 'arraybuffer',
                    });
                    const imageUrl = URL.createObjectURL(new Blob([imageResponse.data], { type: 'image/jpeg' }));

                    // Check if the sellerId is not equal to userId 
                    if (product.sellerId !== userId) {
                        return { ...product, imageUrl }; // Return the product if sellerId is not equal to userId  
                    }
                    return null; // Return null if sellerId matches userId  
                } catch (error) {
                    console.error('Error fetching image for product:', product.productId, error);
                    return null;
                }

            }));

            const filteredProducts = productsWithImages.filter(product => product !== null);
            setProducts(filteredProducts);
            setFilteredProducts(filteredProducts);
            setSelectedProduct(filteredProducts[0]); // Update selectedProduct with filtered products  
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const handleProductDetails = (product) => {
        setSelectedProduct(product);
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = products.filter(product => product.title.toLowerCase().includes(query));
        setFilteredProducts(filtered);
    };

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
    const handlelogin = () => {
        navigate("/login")
    };

    return (
        <div className="product-listing">
            <nav>
                <div class="navbar navbar-expand-lg pt-4 mt-4">
                    <div class="container-fluid">
                        <a href="/homepage" class="brand text-decoration-none">AAA</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul id="nav-length" class="navbar-nav justify-content-between border-top border-2 text-center">
                                <li class="nav-item">
                                    <a href='/' class="nav-link border-hover py-3" style={{ color: 'black' }}>Home</a>
                                </li>
                                <li class="nav-item d-flex justify-content-center h-100">
                                    <div class="searchbar">
                                        <input class="search_input" type="text" name="searchQuery" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
                                        <a href="#" class="search_icon"><i class="bi bi-search"></i></a>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3" style={{ color: 'black' }}>About</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3" style={{ color: 'black' }}>Contact</a>
                                </li>
                                <li class="nav-item">
                                    {userId ? <a href="#" id="sign-in" class="nav-link my-2 px-4 text-white" onClick={handleLogout}>Logout</a> : <a href="/login" id="sign-in" class="nav-link my-2 px-4 text-white" data-testid="sign-in">signin</a>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='cate-list d-flex '>
                <div className="cate-recent">
                    <div className='cate'>
                        <h5 data-testid="Categories">Categories</h5>
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
                            <li><a href="">Ramesh</a></li>
                            <li><a href="">Suresh</a></li>
                            <li><a href="">Dinesh</a></li>
                            <li><a href="">Ganesh</a></li>
                            <li><a href="">Vimal</a></li>
                            <li><a href="">Kamal</a></li>
                            <li><a href="">Naruto</a></li>
                            <li><a href="">Sasuke</a></li>
                            <li><a href="">Luffy</a></li>
                            <li><a href="">Madara</a></li>
                            <li><a href="">Ichigo</a></li>
                            <li><a href="">Lee</a></li>
                        </ul>
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='listing'>
                        <h1 data-testid="Products List">Products List</h1>
                        <div className="products-container">
                            {filteredProducts
                                .filter(product => product && product.sellerId !== userId) // Filter out null/undefined products 
                                .map((product, index) => (
                                    <div key={product.productId} className="product-item">
                                        <h3 onClick={() => handleProductDetails(product)}>{product.title}</h3>
                                        <p data-testid="Top Price">Top Price: {product.startingPrice}</p>
                                        <p data-testid="Ending Date">Ending Date: {product.endingDate}</p>
                                        <img src={product.imageUrl} alt={product.title} />
                                        <div className="start-auction">
                                            <button className="btn btn-primary" type='button' onClick={() => handleProductDetails(product)}>Details</button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                   </div>

                    <div className='product-detail'>
                        {selectedProduct && (
                            <div className='product-detail-item'>
                                <div className='img'>
                                    <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className='img-main' />
                                </div>
                                <div className='price'>
                                    <h2 className='price-main__heading'>{selectedProduct.title}</h2>
                                    <p className='price-txt'>{selectedProduct.description}</p>
                                    <p className='price-txt'>Category: {selectedProduct.category}</p>
                                    <p className='price-txt'>Condition: {selectedProduct.condition}</p>
                                    <div class="price-box">
                                        <div class="price-box__main">
                                            <span class="price-box__main-new"><p>Highest Bid: ₹{selectedProduct.startingPrice}</p></span>
                                            <span class="price-box__main-discount">Ending Date: {selectedProduct.endingDate}</span>
                                        </div>
                                        <span class="price-box__old">Status: {selectedProduct.status}</span>
                                    </div>
                                    <div className="price-btnbox row">
                                        <div className="price-btns col">
                                            <input type="text" className="form-control" placeholder="Enter your amount" name="bidAmount" value={formData.bidAmount} onChange={handleChange} />
                                        </div>
                                        <div className="start-auction col">
                                            {selectedProduct && selectedProduct.status !== "Close" && ( // Add this condition 
                                                <button className="btn btn-primary" type="button" onClick={() => { userId ? handleBidNow(selectedProduct.productId) : handlelogin() }} data-testid="BidNow">Bid Now</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div id="myModal" className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="icon-box">
                                <i className="material-icons">&#xE876;</i>
                            </div>
                            <h4 className="modal-title w-100" data-testid="Awesome!">Awesome!</h4>
                        </div>
                        <div className="modal-body">
                            <p className="text-center" data-testid="confirm">Your Bidding has been confirmed</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success btn-block" onClick={() => { setShowModal(false); window.location.reload(); }}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}