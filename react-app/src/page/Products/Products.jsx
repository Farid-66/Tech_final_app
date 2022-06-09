import React, { useEffect, useState } from "react";
import commerce from "../../Ecommerce";
import { Outlet, Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addToFavourite } from '../../Redux/Favourite/favourite-slice'
import { useSelector, useDispatch } from 'react-redux'
import * as Icons from '../../assets/Icons/Icons'

function Products() {
  const { cat } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchProducts = async () => {
    const category = cat ? cat : "phone";
    const { data } = await commerce.products.list({
      category_slug: [category],
    });
    setProduct(data);
    setLoading(true);
  };

  //  Sort=========================

  const getSort = () => {
    let select = document.getElementById('sort');
    let option = select.options[select.selectedIndex].value;
    switch (option) {
      case "1":
        setProduct([...product.sort((a, b) => new Date(b.created) - new Date(a.created))])
        break
      case "2":
        setProduct([...product.sort((a, b) => (a.price.raw > b.price.raw ? 1 : -1))])
        break
      case "3":
        setProduct([...product.sort((a, b) => (a.price.raw > b.price.raw ? -1 : 1))])
        break
    }
  }

  // Favourite =============
  const favourite = useSelector((state) => state.favourite)
  const dispatch = useDispatch()
  // =======================

  useEffect(() => {
    fetchProducts();
    setLoading(false);
  }, [cat]);


  return (
    loading ? (
      <>
        <section id="productspage">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul className="pageHeader">
                  <li>
                    <Link to="/home">
                      {Icons.homeIcon} <i className="fa-solid fa-angle-right"></i>
                    </Link>
                  </li>
                  <li>
                    {cat[0].toUpperCase() + cat.substring(1)}
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3 d-none d-md-block">
                <Filter />
              </div>

              <div className="col-12 col-md-9">
                <div className="select d-flex justify-content-between ">
                  <span>{product.length} məhsul tapıldı</span>
                  <select className="form-select" id="sort" onChange={() => getSort()}>
                    <option value="1">Yenilər</option>
                    <option value="2">Ucuzdan-bahaya</option>
                    <option value="3">Bahadan-ucuza</option>
                  </select>
                </div>

                <div>
                  <div className="row">
                    {product.map((e) => (
                      <div key={e.id} className="col-6 col-md-4">
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
          </div>
        </section>
        <Outlet />
      </>) : (
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
    ));
}


export const Filter = () => {
  const [brand, setBrand] = useState([]);

  const fetchBrand = async () => {
    commerce.categories
      .retrieve("brands", { type: "slug" })
      .then((category) => setBrand(category.children));
  };

  useEffect(() => {
    fetchBrand();
  }, []);


  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Brend ({brand.length})</Accordion.Header>
        <Accordion.Body>
          <ul>
            {brand.map((e) => (
              <div key={e.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {e.name}
                </label>
              </div>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Type</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Category</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dol proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Rəng</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dol proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Qiymət</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dol proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Products;
