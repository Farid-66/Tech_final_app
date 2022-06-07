import React from 'react'
import { Outlet, Link } from "react-router-dom";
import * as Icons from '../../assets/Icons/Icons'
import { useSelector, useDispatch } from 'react-redux'
import { addToFavourite } from '../../Redux/Favourite/favourite-slice'



function Favourite() {

  const favourite = useSelector((state) => state.favourite)
  const dispatch = useDispatch()
  let favouriteLength = favourite.length
  console.log(favourite)
  return (
    favouriteLength > 0 ? (<>
      <section id="productspage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="pageHeader">
                <li>
                  <Link to="/home">
                    {Icons.homeIcon} <i class="fa-solid fa-angle-right"></i>
                  </Link>{" "}
                </li>
                <li>
                  <a href="#">
                    Seçilmişlər
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="row">
                {favourite.map((e) => (
                  <div className='col-6 col-md-3'>
                    <div div className="product-card">
                      <div className="product-fovarite">
                        <button
                          onClick={() => dispatch(addToFavourite(e))}>
                          {favourite.find((prod) => prod.id == e.id) ? Icons.redheartIcon : Icons.heartIcon}
                        </button>
                      </div>
                      <Link key={e.id} to={`/prducts/${e.id}`}>
                        <div className="prodct-img">
                          <img src={e.image.url} alt="not found" />
                        </div>
                        <div className="prodct-title">
                          <h3>{e.name}</h3>
                        </div>
                        <div className="prodct-price">
                          <span>{e.price.formatted_with_code}</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>) :
      ("secilmi.ler bosdur")
  )
}

export default Favourite