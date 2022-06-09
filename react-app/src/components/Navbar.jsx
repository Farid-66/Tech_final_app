import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import commerce from "../Ecommerce";
import * as Icons from '../assets/Icons/Icons'
import { useSelector, useDispatch } from 'react-redux'

function Navbar({ cartTotalItems, user }) {
    const [isOpen, setIsOpen] = useState("onHoverCloseMenuPage")
    const [brand, setBrand] = useState([])
    const [slug, setSlug] = useState()

    const favourite = useSelector((state) => state.favourite)

    useEffect(() => {
        commerce.categories.retrieve('brands', { type: 'slug' })
            .then((category) => setBrand(category.children));
    }, [])


    const onHover = (slug) => {
        setIsOpen("onHoverOpenMenuPge")
        setSlug(slug)
    }

    return (
        <>
            <nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='d-flex'>
                                <button className='menu-btn'><i className="fa-solid fa-bars"></i></button>
                                <div className='logo'>
                                    <Link to={'/home'}><img src={require('../../src/assets/Images/Tello.png')} alt="not found" />
                                        <span>Tello</span>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <Search />
                            </div>
                            <div>
                                <User
                                    cartTotalItems={cartTotalItems}
                                    favouriteLength={favourite.length}
                                    user = {user}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='navbar' >
                                <ul className='nav-items' >
                                    <li
                                        className='nav-item' >
                                        <Link to={`/products/newPhone`}>Yeni</Link>
                                    </li>
                                    {
                                        brand.map((e) => (
                                            <li key={e.id}
                                                className='nav-item'
                                                onMouseEnter={() => onHover(e.slug)}
                                                onMouseLeave={() => setIsOpen("onHoverCloseMenuPage")} >
                                                <Link to={`/products/${e.slug}`}>{e.name}</Link>
                                            </li>
                                        ))
                                    }
                                    <li
                                        className='nav-item' >
                                        <Link to={`/products/accessories`}>Aksessuarlar</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div id='menu'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <MenuPape
                                isOpen={isOpen}
                                slug={slug}
                                setIsOpen={setIsOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



function MenuPape({ isOpen, slug, setIsOpen }) {

    return (
        <div className={isOpen}
            onMouseEnter={() => setIsOpen("onHoverOpenMenuPge")}
            onMouseLeave={() => setIsOpen("onHoverCloseMenuPage")}>
            <ul>
                {/* {subItem!=undefined?(subItem.map((e)=>(<li>{e.name}</li>))):""} */}
            </ul>
        </div>
    )
}


function Search() {
    return (
        <div className='search'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type={'text'} placeholder="Axtarış..." />
        </div>
    )
}


function User({ cartTotalItems, favouriteLength , user}) {
    return (
        <>
            <div className='users'>
                <ul>
                    {(localStorage.getItem("commercejs_customer_token")? 
                    <li className='user'><Link to="/profile">Salam {user!=undefined? user.firstname:""} <i className="fa-solid fa-angle-right"></i></Link></li> 
                    : <li className='user'><Link to="/login">{Icons.userIcon} </Link></li>)}
                    
                    <li className='favourite'><Link to={'/favourite'}>{Icons.heartIcon} {favouriteLength > 0 ? <span>{favouriteLength}</span> : ""} </Link></li>
                    <li className='cart'>
                        <Link to="/cart">
                            {Icons.black_basketIcon} {cartTotalItems > 0 ? <span>{cartTotalItems}</span> : ""}
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}


export default Navbar