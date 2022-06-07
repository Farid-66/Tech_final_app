import React, { useEffect, useState } from 'react'
import * as Icons from '../../assets/Icons/Icons'
import { useParams } from 'react-router-dom'
import commerce from '../../Ecommerce'
import { Outlet, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'


function Details({ addToCart }) {
  const { productsId } = useParams()
  const [details, setDetails] = useState([])

  const fetchDetails = async () => {
    const { data } = await commerce.products.list()
    setDetails(data)
  }

  const thisProduct = details.find((prod) => prod.id === productsId)

  useEffect(() => {
    fetchDetails()
  }, [])

  // ==============# Cart Qty #================

  const [item_qty, setItemQty] = useState(1)

  const increaseQty = () => {
    setItemQty((qty) => qty += 1)
  }
  const decreaseQty = () => {
    setItemQty((qty) => qty -= 1)
  }

  // =========================================



  // ===============# Comment Page #==========
  const [comment_techSpecific_Pages, setComment_techSpecific_Pages] = useState(true)

  const acticeCommentPage = () => {
    setComment_techSpecific_Pages(false)
  }
  const activeTechSpecificationsPage = () => {
    setComment_techSpecific_Pages(true)
  }

  let tech_btn = document.getElementsByClassName("techsbtn")[0]
  let comment_btn = document.getElementsByClassName("commentbtn")[0]


  if (tech_btn !== undefined && comment_btn !== undefined) {
    if (comment_techSpecific_Pages) {
      comment_btn.classList.remove("active_btn")
      tech_btn.classList.add("active_btn")
    }
    else {
      comment_btn.classList.add("active_btn")
      tech_btn.classList.remove("active_btn")
    }
  }

  // ==========================================

  const memory = []
  const colors = []

  if (thisProduct !== undefined) {
    thisProduct.variant_groups.forEach(e => {
      if (e.name == "Memory") {
        e.options.forEach(element => {
          memory.push(element.name)
        });
      }

      if (e.name == "Colors") {
        e.options.forEach(element => {
          colors.push(element.name)
        });
      }
    });
  }


  return (
    <>
      {
        thisProduct !== undefined ? (
          <section id="detailsPage">
            <div className="container">

              <div className="row">
                <div className="col-12">
                  <ul className='pageHeader'>
                    <li>
                      <Link to="/home">
                        {Icons.homeIcon} <i className="fa-solid fa-angle-right"></i>
                      </Link>{' '}
                    </li>
                    <li>
                      <a href="#">
                        Telefonlar <i className="fa-solid fa-angle-right"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Apple <i className="fa-solid fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6 detail-image">
                  <div className='slider-images'>
                    <div className='slider-image'>
                      <ProductIamgeSlider images={thisProduct.assets} />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 detail-text">
                  <h3 className='prodname'>{thisProduct.name}</h3>
                  <div className='comment_stars'>
                    <i>{Icons.starIcon}</i>
                    <i>{Icons.starIcon}</i>
                    <i>{Icons.starIcon}</i>
                    <i>{Icons.starIcon}</i>
                    <i>{Icons.starIcon}</i>
                    <span>(226)</span>
                    <p>57 rey</p>
                  </div>
                  <p className='prodprice'>{thisProduct.price.formatted_with_code}</p>
                  <hr />
                  <div className="colors">
                    {
                      colors.length ? (
                        <>
                          <p>Rəng:</p>
                          {
                            colors.map((e) => (
                              <span style={{ backgroundColor: `${e}` }}></span>
                            ))
                          }
                        </>
                      ) : ("")
                    }
                  </div>
                  <div className="memory">
                    {
                      memory.length ? (
                        <>
                          <p>Yaddaş:</p>
                          {
                            memory.map((e) => (
                              <span>{e}</span>
                            ))
                          }
                          <hr className='d-none d-md-block' />
                        </>
                      ) : ("")
                    }
                  </div>

                  <div className="quantity">
                    <p className='d-md-none'>Miqdar:</p>
                    <button className='btn' disabled={item_qty <= 1 ? true : false} onClick={() => decreaseQty()}><i className="fa-solid fa-minus"></i></button>
                    <span>{item_qty}</span>
                    <button className='btn' onClick={() => increaseQty()}><i className="fa-solid fa-plus"></i></button>
                  </div>

                  <div className='addtocart'>
                    <button onClick={() => addToCart(productsId, item_qty)}>
                      {Icons.basketIcon}
                      Səbətə at
                    </button>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-12'>
                  <div className='tech_comment_btns'>
                    <button className='techsbtn' onClick={() => activeTechSpecificationsPage()}>Texniki Xüsusiyyətləri</button>
                    <button className='commentbtn' onClick={() => acticeCommentPage()}>Rəylər</button>
                  </div>
                  <hr />
                </div>
              </div>

              {
                comment_techSpecific_Pages ? <TechSpecifications thisProduct={thisProduct} /> : <CommentPage />
              }

            </div>
          </section>
        ) : (
          <div className='container loading-detailpage'>
            <div className='row'>
              <div className='col-12'>
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <Outlet />
    </>
  )
}


const TechSpecifications = ({ thisProduct }) => {

  function createMarkup() {
    return { __html: thisProduct.description };
  }

  return (
    <section id='techSpecifications' className='techSpecifications'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <h3>Əsas göstəricilər</h3>
            <ul>
              {
                thisProduct.extra_fields.map((e) => (
                  <li><span>{e.name}</span> <span>{e.required ? "Var" : "Məlumat yoxdur"}</span></li>
                ))
              }
            </ul>
          </div>
          <div className='col-12 col-md-6'>
            <div>
              <h3>Məhsul haqqında</h3>
              <p dangerouslySetInnerHTML={createMarkup()} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CommentPage = () => {
  return (
    <section id='commentPage' className='commentPage'>
      <div className='container'>
        <div className='row '>
          <div className='col-12'>
            <ul className='commentItems'>
              <li className='commentItem'>
                <div className='left'>
                  <p>4</p>
                  <div>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                  </div>
                </div>
                <div className='right'>
                  <div className='commentItemHeader'>
                    <div className='text-center'>
                      <p>Gunel Mammadova</p>
                      <small>Yaddaş - 64, Rəng - Qara</small>
                    </div>
                    <span className='d-none d-md-block'>5 gün əvvəl</span>
                  </div>
                  <div className='commentItemBody'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                      mattis viverra lacus ut et, etiam. Vel ut in nunc nunc ut sit nibh
                      tortor sit. Consectetur sit auctor odio quis suspendisse tincidunt quis.
                      Et tristique amet aenean nibh porttitor quis aliquam integer.
                      Consectetur lacus, volutpat malesuada libero. Sollicitudin libero pharetra a.
                    </p>
                  </div>
                </div>
              </li>
              <li className='commentItem'>
                <div className='left'>
                  <p>4</p>
                  <div>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                    <i>{Icons.starIconWidth27}</i>
                  </div>
                </div>
                <div className='right'>
                  <div className='commentItemHeader'>
                    <div className='text-center'>
                      <p>Gunel Mammadova</p>
                      <small>Yaddaş - 64, Rəng - Qara</small>
                    </div>
                    <span className='d-none d-md-block'>5 gün əvvəl</span>
                  </div>
                  <div className='commentItemBody'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                      mattis viverra lacus ut et, etiam. Vel ut in nunc nunc ut sit nibh
                      tortor sit. Consectetur sit auctor odio quis suspendisse tincidunt quis.
                      Et tristique amet aenean nibh porttitor quis aliquam integer.
                      Consectetur lacus, volutpat malesuada libero. Sollicitudin libero pharetra a.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <div className='commentForm'>
              <h4>Rəy Bildir</h4>
              <form>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <div className="mb-3">
                      <label className="form-label">Ad</label>
                      <input type={'text'} className="form-control" placeholder='Adınızı daxil edin' />
                    </div>
                  </div>

                  <div className='col-12 col-md-6'>
                    <div className="mb-3">
                      <label className="form-label">Soyad</label>
                      <input type={'text'} className="form-control" placeholder='Soyadınızı daxil edin' />
                    </div>
                  </div>

                </div>

                <div className='row'>
                  <div className='col-12'>
                    <label className="form-label">Rəy bildirdiyiniz məhsulu seçin</label>
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Məhsulu seçin</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <label className="form-label">Rəyinizi yazın</label>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Rəyini bildir</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



const ProductIamgeSlider = ({ images }) => {

  const [activeThumb, setActiveThumb] = useState()


  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        // thumbs={{ swiper: activeThumb }}
        className='product-images-slider'
      >
        {
          images.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.url} alt="product images" />
            </SwiperSlide>
          ))
        }

      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
      >
        {/* {
          images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="product-images-slider-thumbs-wrapper">
                <img src={item.url} alt="product images" />
              </div>
            </SwiperSlide>
          ))
        } */}
      </Swiper>
    </div>
  )
}

export default Details
