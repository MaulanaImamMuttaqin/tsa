import React from 'react'
import '../style/HomeBody.css'
import Logo from "../../../assets/image/logo5.png"
function HomeBody() {
    return (
        <div className="content">
            <div className="container">
                <div className="content-header">
                    <h4>Paling Populer</h4>
                </div>
                <div className="slide-makan">
                    <div id="demo" className="caraousel slide gambar-makan" data-ride="carousel">
                        <ul className="carousel-indicators">
                            <li data-target="#demo" data-slide-to="0" className="active"></li>
                            <li data-target="#demo" data-slide-to="1"></li>
                            <li data-target="#demo" data-slide-to="2"></li>
                        </ul>
                        
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={Logo} alt="Los Angeles"  width="800" height="300"/>
                            </div>
                            <div className="carousel-item">
                                <img src={Logo} alt="Chicago"  width="800" height="300"/>
                            </div>
                            <div className="carousel-item">
                                <img src={Logo} alt="New York" width="800" height="300"/>
                            </div>
                        </div>

                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBody
