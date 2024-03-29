import photo3 from '../home-back.jpg'
import photo11 from '../register.jpg'
import photo12 from '../sell bid.jpg'
import photo13 from '../win.png'
import photo14 from '../repeat.png'
import photo15 from '../img/testimonial-1.jpg'
import photo16 from '../img/testimonial-2.jpg'
import photo17 from '../img/testimonial-3.jpg'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/Homepage.css'


export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userdetails, setUserDetails] = useState([]);
    const userId = localStorage.getItem('signin');
    
    console.log("user", userId)
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Homepage"
        fetchProducts();
        fetchUser();

    },[]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5269/api/PersonalDetails/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5269/api/Products'); // Assuming the API endpoint is correct  

            const productsWithImages = await Promise.all(response.data.map(async (product) => {
                try {
                    const imageResponse = await axios.get(`http://localhost:5269/api/Products/${product.productId}/Image`, {
                        responseType: 'arraybuffer',
                    });
                    const imageUrl = URL.createObjectURL(new Blob([imageResponse.data], { type: 'image/jpeg' }));
                    return { ...product, imageUrl };
                } catch (error) {
                    console.error('Error fetching image for product:', product.productId, error);
                    return product;
                }
            }));
            setProducts(productsWithImages);
            setSelectedProduct(productsWithImages[0])
        } catch (error) {
            console.error('Error fetching products:', error);
        }
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
        }finally{
            window.location.reload();
            
        }
    }
    const handleLogin = () =>{
        navigate("/login")
    };
    const handleSell=() =>{
        navigate("/addproducts")
    };


    return (
        <div>
            <div className="container-fluid px-0 wow bg-primary" data-wow-delay="0.1s">

                <nav className="navbar navbar-expand-lg navbar-dark py-lg-0 px-lg-5 wow" data-wow-delay="0.1s">
                    <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
                        <h1 className="fw-bold m-0" data-testid="slogan">Anytime Anyone<span className="text-white"> Anywhere</span></h1>
                    </a>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <a href="index.html" className="nav-item nav-link active">Home</a>
                            <a href='/productlisting' className="nav-item nav-link" >Buy</a>
                            <a href='#' className="nav-item nav-link" onClick={()=>{userId? handleSell():handleLogin()}} >Sell</a>
                            <a href="" className="nav-item nav-link" onClick={()=>{userId? navigate('/userdashboard'):handleLogin()}}>Profile</a>
                        </div>
                        <div className="d-none d-lg-flex ms-2">
                            <p className='ms-2' style={{ color: 'white' }}>{userId ? userdetails.name : <a href='/login' style={{ color: 'white' }}>Sign in</a>}</p>
                        </div>
                        {userId ? <div className="d-none d-lg-flex ms-4 mb-3">
                            <a style={{ color: 'white', cursor:'pointer'}} onClick={handleLogout} >Log out</a>
                        </div> : <p></p>}

                    </div>
                </nav>
            </div>

            <div className="container-fluid p-0 mb-5">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src={photo3} alt="Image" />
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-7 pt-5">
                                            <h1 className="display-4 text-white mb-3 animated slideInDown">Opportunity knocks anytime, for anyone, anywhere</h1>
                                            <p className="fs-5 text-white-50 mb-5 animated slideInDown">Seize it with online auctions. #anytimeanyoneanywhere</p>
                                            <a className="btn btn-primary py-2 px-3 animated slideInDown" href="/signup">
                                                <button className="btn" data-testid='Register'>Register</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container-xxl bg-light my-5 py-5">
                <h2 data-testid='current'>Current Auctions</h2>
                <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {products.map((product, index) => (
                            <div key={product.productId} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="container py-5">
                                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                                        <h1 className="display-6 mb-5">{product.title}</h1>
                                    </div>
                                    <div className="row g-4 justify-content-center">
                                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="causes-item d-flex flex-column bg-white border-top border-5 border-primary rounded-top overflow-hidden h-100">
                                                <div className="text-center p-4 pt-0">
                                                    <div className="d-inline-block bg-primary text-white rounded-bottom fs-5 pb-1 px-3 mb-4">
                                                        <small>{product.description}</small>
                                                    </div>
                                                    <div className="causes-progress bg-light p-3 pt-2">
                                                        <div className="d-flex justify-content-between">
                                                            <p className="text-dark">Rs {product.startingPrice}</p>
                                                            <p className="text-dark">Ending Date: {product.endingDate}</p>
                                                        </div>
                                                        <div className="progress">
                                                            <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                                                                <span>100%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="position-relative mt-auto">
                                                    <img className="img-fluid" src={product.imageUrl} alt="" />
                                                    <div className="causes-overlay">
                                                        <a className="btn btn-outline-primary" href="#">
                                                            <button className='btn' >Bid Now</button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                        <h1 class="display-6 mb-5">Let's see how auction works</h1>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="team-item position-relative rounded overflow-hidden">
                                <div class="overflow-hidden">
                                    <img class="img-fluid" src={photo11} alt="" />
                                </div>
                                <div class="team-text bg-light text-center p-4">
                                    <h5>Register</h5>
                                    <p class="text-primary">User friendly registration</p>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="team-item position-relative rounded overflow-hidden">
                                <div class="overflow-hidden">
                                    <img class="img-fluid" src={photo12} alt="" />
                                </div>
                                <div class="team-text bg-light text-center p-4">
                                    <h5>Bid or Sell</h5>
                                    <p class="text-primary">Win both sides</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div class="team-item position-relative rounded overflow-hidden">
                                <div class="overflow-hidden">
                                    <img class="img-fluid" src={photo13} alt="" />
                                </div>
                                <div class="team-text bg-light text-center p-4">
                                    <h5>Win</h5>
                                    <p class="text-primary">The Money is yours</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div class="team-item position-relative rounded overflow-hidden">
                                <div class="overflow-hidden">
                                    <img class="img-fluid" src={photo14} alt="" />
                                </div>
                                <div class="team-text bg-light text-center p-4">
                                    <h5>Repeat</h5>
                                    <p class="text-primary">Win Again</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                        <h1 class="display-6 mb-5">Trusted By Thousands Of People And Nonprofits</h1>
                    </div>
                    <div class="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
                        <div class="testimonial-item text-center">
                            <img class="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src={photo15}
                                style={{ width: 100, height: 100 }} />
                            <div class="testimonial-text rounded text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna
                                    ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea
                                    clita.</p>
                            </div>
                        </div>
                        <div class="testimonial-item text-center">
                            <img class="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src={photo16}
                                style={{ width: 100, height: 100 }} />
                            <div class="testimonial-text rounded text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna
                                    ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea
                                    clita.</p>
                            </div>
                        </div>
                        <div class="testimonial-item text-center">
                            <img class="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src={photo17} style={{ width: 100, height: 100 }} />
                            <div class="testimonial-text rounded text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna
                                    ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea
                                    clita.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid bg-dark text-white-50 footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="row g-5">
                        <div class="col-lg-3 col-md-6">
                            <h1 class="fw-bold text-primary mb-4">Anyone Anytime<span class="text-white"> Anywhere</span></h1>
                            <p>Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed
                                stet lorem sit clita</p>
                            <div class="d-flex pt-2">
                                <a class="btn btn-square me-1" href=""><i class="bi bi-twitter-x"></i></a>
                                <a class="btn btn-square me-1" href=""><i class="bi bi-facebook"></i></a>
                                <a class="btn btn-square me-1" href=""><i class="bi bi-youtube"></i></a>
                                <a class="btn btn-square me-0" href=""><i class="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5 class="text-light mb-4">Address</h5>
                            <p><i class="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                            <p><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p><i class="fa fa-envelope me-3"></i>info@example.com</p>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5 class="text-light mb-4">Quick Links</h5>
                            <a class="btn btn-link" href="">About Us</a>
                            <a class="btn btn-link" href="">Contact Us</a>
                            <a class="btn btn-link" href="">Our Services</a>
                            <a class="btn btn-link" href="">Terms & Condition</a>
                            <a class="btn btn-link" href="">Support</a>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5 class="text-light mb-4">Newsletter</h5>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <div class="position-relative mx-auto" style={{ maxWidth: 400 }}>
                                <input class="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text"
                                    placeholder="Your email" />
                                <button type="button"
                                    class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid copyright">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a href="#">AAA</a>, All Right Reserved.
                            </div>
                            <div class="col-md-6 text-center text-md-end">
                                Designed By <a href="https://htmlcodex.com">Ashwin Kumar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}