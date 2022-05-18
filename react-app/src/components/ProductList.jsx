import { Outlet, Link } from "react-router-dom";
import * as Icons from '../assets/Icons/Icons'

function ProtuctList(props) {

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
                        <Link key={e.id} to={`/prducts/${e.id}`}>
                          <div  div className="product-card">
                            <div className="product-fovarite">
                              <button>{Icons.heartIcon}</button>
                            </div>
                            <div className="prodct-img">
                              <img src={e.image.url} alt="not found" />
                            </div>
                            <div className="prodct-title">
                              <h3>{e.name}</h3>
                            </div>
                            <div className="prodct-price">
                              <span>{e.price.formatted_with_code}</span>
                            </div>
                          </div>
                        </Link>
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
