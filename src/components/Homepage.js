import { useEffect } from "react";
import photos from "../photos";

export default function Homepage() {
    useEffect(() => {
        document.title = "Homepage"
    })
    return (
        <div className="home">
            <nav class="navbar navbar-expand-sm">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Logo</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Dropdown</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Link</a></li>
                                    <li><a class="dropdown-item" href="#">Another link</a></li>
                                    <li><a class="dropdown-item" href="#">A third link</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="home-main">
                <div className="gallery container-fluid">
                    <div className="row ">
                        <div className="col-4">
                            <img src={photos.image1} alt="1" />
                            <img src={photos.image2} alt="2" />
                            <img src={photos.image3} alt="3" />
                            <img src={photos.image4} alt="4" />
                            <img src={photos.image11} alt="11" />
                            <img src={photos.image14} alt="14" />
                            <img src={photos.image17} alt="17" />
                        </div>
                        <div className="col-4">
                            <img src={photos.image5} alt="5" />
                            <img src={photos.image6} alt="6" />
                            <img src={photos.image7} alt="7" />
                            <img src={photos.image12} alt="12" />
                            <img src={photos.image15} alt="15" />
                            <img src={photos.image18} alt="18" />
                        </div>
                        <div className="col-4">
                            <img src={photos.image8} alt="8" />
                            <img src={photos.image9} alt="9" />
                            <img src={photos.image10} alt="10" />
                            <img src={photos.image13} alt="13" />
                            <img src={photos.image16} alt="16" />
                            <img src={photos.image19} alt="19" />
                            <img src={photos.image20} alt="20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}