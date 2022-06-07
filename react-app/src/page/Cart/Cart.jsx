import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import * as Icons from '../../assets/Icons/Icons'



function Cart({ cart, removeFromCart, updateCartQty }) {

    return (
        <>
            <section id='cartPage'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 cartpageheader'>
                            <ul className='pageHeader'>
                                <li>
                                    <Link to="/home">
                                        {Icons.homeIcon} <i className="fa-solid fa-angle-right"></i>
                                    </Link>{' '}
                                </li>
                                <li>
                                    <a href="#">
                                    Səbət 
                                    </a>
                                </li>
                            </ul>
                            <span>Səbət ({cart.total_items} məhsul)</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 cartpagebody'>
                            {cart.total_unique_items > 0 ?
                                <CartProducts
                                    carttLineItems={cart.line_items}
                                    subTotal={cart.subtotal}
                                    removeFromCart={removeFromCart}
                                    updateCartQty={updateCartQty}
                                />
                                :
                                <EmptyCartPage />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export const EmptyCartPage = () => {
    return (
        <>
            <div id='emptycartpage'>
                <img src={require('../../assets/Images/shopping-cart.jpg')} />
                <p>Səbətiniz halhazırda boşdur</p>
                <Link to="/home">Alış-verişə davam et</Link>
            </div>
            <Outlet />
        </>
    )
}



export const CartProducts = ({ carttLineItems, subTotal, removeFromCart, updateCartQty }) => {

    const increaseQty = (item_id, item_qty) => {
        updateCartQty(item_id, item_qty += 1)
    }

    const decreaseQty = (item_id, item_qty) => {
        updateCartQty(item_id, item_qty > 0 ? item_qty -= 1 : 0)
    }

    return (
        <>
            <div id='cartproductspage'>
                <div className='row'>
                    <div className='col-12 col-md-9'>
                        <div className='cart-product-items'>
                            <ul>
                                {
                                    carttLineItems.map((e) => (
                                        <li key={e.id} className='cart-product-item'>
                                            <Link to={`/prducts/${e.product_id}`}>
                                                <div className='cart-product-item-text'>
                                                    <div className='cart-product-item-img'><img src={e.image.url} /></div>

                                                    <div className='cart-product-item-about'>
                                                        <p>{e.name}</p>
                                                        <span>Rəng: Bənövşəyi</span>
                                                        <b>{e.line_total.formatted_with_code}</b>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="quantity_cart">
                                                <button  onClick={() => decreaseQty(e.id, e.quantity)}><i className="fa-solid fa-minus"></i></button>
                                                <span>{e.quantity}</span>
                                                <button onClick={() => increaseQty(e.id, e.quantity)}><i className="fa-solid fa-plus"></i></button>
                                            </div>
                                            <button className='removeBtn' onClick={() => removeFromCart(e.id)}><i className="fa-solid fa-trash-can"></i></button>

                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className='col-12 col-md-3'>
                        <Amounts subTotal={subTotal} />
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export const Amounts = ({ subTotal }) => {
    return (
        <>
            <div className='common-amounts'>
                <p>Ümumi</p>
                <div className='amount'>
                    <span>Məbləğ</span>
                    <span>{subTotal.formatted_with_symbol}</span>
                </div>
                <div className='amount'>
                    <span>Çatdırılma</span>
                    <span>0.00</span>
                </div>
                <div className='amount'>
                    <span>Hədiyyə paketi</span>
                    <span>4.00</span>
                </div>
                <div className='amount'>
                    <span>Promo kod</span>
                    <span>-10.00</span>
                </div>
                <hr />
                <div className='total'>
                    <span>Cəmi</span>
                    <span>{subTotal.formatted_with_symbol}</span>
                </div>
                <div className='checkoutbtn'>
                    <Link to='/checkout'>Sifariş ver</Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}



export default Cart