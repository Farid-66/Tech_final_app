import React from 'react'

function Header() {
    return (
        <header>
            <div className='container'>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className='row'>
                                <div className='col-12 col-md-6 col-xl-6'>
                                    <h2>Buy & Sell</h2>
                                    <h2>What's Now & Next</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis malesuada et leo faucibus </p>
                                </div>
                                <div className='col-12 col-md-6 col-xl-6'>
                                    <img src={require('../../src/assets/Images/image1.jpg')} alt="not found"/>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='row'>
                                <div className='col-12 col-md-6 col-xl-6'>
                                    <h2>Buy & Sell</h2>
                                    <h2>What's Now & Next</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis malesuada et leo faucibus </p>
                                </div>
                                <div className='col-12 col-md-6 col-xl-6'>
                                    <img src={require('../../src/assets/Images/image1.jpg')} alt="not found"/>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='row'>
                                <div className='col-12 col-md-6 col-xl-6'>
                                    <h2>Buy & Sell</h2>
                                    <h2>What's Now & Next</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis malesuada et leo faucibus </p>
                                </div>
                                <div className='col-12 col-md-6 col-xl-6'>
                                    <img src={require('../../src/assets/Images/image1.jpg')} alt="not found"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header