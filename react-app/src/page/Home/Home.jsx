import React, { useState, useEffect } from 'react'
import commerce from "../../Ecommerce";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "swiper/css";


function Home({cart}) {
    const [brands, setBrands] = useState([])
    const [mostselled, setMostselled] = useState([])
    const [newPhone, setNewPhone] = useState([])
    const [accessories, setNewAccessories] = useState([])
    const [loading, setLoading] = useState(false)
    

    // =========# Home Page Products #=========

    const fetchProducts = async () => {
        const { data } = await commerce.products.list({ category_slug: ['phone'] });
        setMostselled(data.slice(0, 4))
        setLoading(true)
    }

    const fetchNewPhone = async () => {
        const { data } = await commerce.products.list({ category_slug: ['newphone'] });
        setNewPhone(data.slice(0, 4))
        setLoading(true)
    }

    const fetchNewAccessories = async () => {
        const { data } = await commerce.products.list({ category_slug: ['accessories'] });
        setNewAccessories(data.slice(0, 4))
        setLoading(true)
    }

    // =====================================

    useEffect(() => {
        commerce.products.list({ category_slug: ['brands'] }).then((product) => setBrands(product.data));

        fetchProducts()
        fetchNewPhone()
        fetchNewAccessories()
    }, [])

    return (
        <div>
            <Header />
            <ProductList title="Ən çox satılan məhsullar" products={mostselled} loading={loading} cat={"phone"}/>
            <ProductList title="Yeni gələn məhsullar" products={newPhone} loading={loading} cat={'newphone'}/>
            <Advertise />
            <ProductList title="Yeni gələn aksessuarlar" products={accessories} loading={loading} cat={'accessories'}/>
            <Count />
            <Advantages />
            <Brands brands={brands} />
        </div>
    );
}

export const Advantages = () => {
    return (
      <section id="advantages" className="container">
        <div>
          <img src={require('../../assets/Images/box.png')} alt="" />
          <span>Çatdirilma</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
        </div>
        <div> 
        <img src={require('../../assets/Images/credit.png')} alt="" />
          <span>Kredit</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
        </div>
        <div>
        <img src={require('../../assets/Images/achievement.png')} alt="" />
          <span>Zəmanət</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
        </div>
      </section>
    );
  };

export const Advertise = () => {
    return (
        <section id="advertise">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <img src={require("../../assets/Images/Rectangle168.jpg")} alt="page not found" />
                    </div>
                    <div className="col-12 col-lg-6">
                        <img src={require("../../assets/Images/Rectangle169.jpg")} alt="page not found"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Count = () => {
    return (
      <section id="count" className='container'>
        <div className="count_first">
          <div>
            <h3>Telefon</h3>
            <span>Məhsul sayi: 322</span>
            <a href="##">Məhsullara keçid {">"} </a>
          </div>
        </div>
        <div className="count_second">
          <div>
            <h3>Smart saat</h3>
            <span>Məhsul sayi: 46</span>
            <a href="##">Məhsullara keçid {">"} </a>
          </div>
          <div>
            <h3>Aksesuar</h3>
            <span>Məhsul sayi: 891</span>
            <a href="##">Məhsullara keçid {">"} </a>
           </div>
        </div>
      </section>
    )
  }


export const Brands = ({ brands }) => {
    return (
        <section id="brands">
            <div className="container">
                <Swiper
                    slidesPerView={6}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {brands.map((el, index) => (
                        <SwiperSlide key={el.id}>
                            <div key={index} className="swiperslide">
                                <img src={el.image.url} alt="logo" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Home;
