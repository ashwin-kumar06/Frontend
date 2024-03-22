import '../styles/ProductListing.css'

export default function ProductListing() {
    return (
        <div className="product-listing">
            <nav>
                <div class="navbar navbar-expand-lg pt-4">
                    <div class="container-fluid">
                        <a href="#" class="brand text-decoration-none d-block d-lg-none fw-bold fs-1 ">LOGO</a>
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
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3">About Us</a>
                                </li>
                                <li class="nav-item d-flex justify-content-center h-100">
                                    <div class="searchbar">
                                        <input class="search_input" type="text" name="" placeholder="Search..."/>
                                            <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3">Blog</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link border-hover py-3">Sign up</a>
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
        </div>
    )
}