import { Outlet, Link } from "react-router-dom";
import * as Icons from '../assets/Icons/Icons'
import { addToFavourite } from '../Redux/Favourite/favourite-slice.js'
import { useSelector, useDispatch } from 'react-redux'
function ProtuctList(props) {

  // Favourite =============
  const favourite = useSelector((state) => state.favourite)
  const dispatch = useDispatch()
  // =======================





  return (
    <>
      <section id="products">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <div className="header-product">
                <p>{props.title}</p>
                <Link to={`/products/${props.cat}`}>
                  Hamısına bax <i class="fa-solid fa-angle-right"></i>
                </Link>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="productlist">
                    {props.loading ? (
                      props.products.map((e) => (
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
                      ))
                    ) : (
                      <div className="loading">
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}

export default ProtuctList;
