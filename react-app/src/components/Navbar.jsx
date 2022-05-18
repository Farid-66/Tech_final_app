import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import commerce from "../Ecommerce";
import * as Icons from '../assets/Icons/Icons'


function Navbar({cartTotalItems}) {
    const [isOpen, setIsOpen] = useState("onHoverCloseMenuPage")
    const [brand, setBrand] = useState([])
    const [Id, setId] = useState()

    useEffect(() => {
        commerce.categories.retrieve('mobile', { type: 'slug' })
            .then((category) => setBrand(category.children));
    }, [])


    const onHover = (id) => {
        setIsOpen("onHoverOpenMenuPge")
        setId(id)
    }

    return (
        <>
            <nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='d-flex'>
                                <button className='menu-btn'><i class="fa-solid fa-bars"></i></button>
                                <div className='logo'>
                                    <img src={require('../../src/assets/Images/Tello.png')} alt="not found" />
                                    <span>Tello</span>
                                </div>
                            </div>
                            <div>
                                <Search />
                            </div>
                            <div>
                                <User cartTotalItems={cartTotalItems}/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <div className='navbar' >
                                <ul className='nav-items' >
                                    {
                                        brand.map((e) => (
                                            <li key={e.id}
                                                className='nav-item' onMouseEnter={() => onHover(e.id)} onMouseLeave={() => setIsOpen("onHoverCloseMenuPage")} >
                                                {e.name}
                                            </li>
                                        ))
                                    }
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
                            <MenuPape isOpen={isOpen} id={Id} setIsOpen={setIsOpen} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



function MenuPape({ isOpen, id, setIsOpen }) {

    const [subItem, setSubItem] = useState([])

    return (
        <div className={isOpen} onMouseEnter={() => setIsOpen("onHoverOpenMenuPge")} onMouseLeave={() => setIsOpen("onHoverCloseMenuPage")}>
            <ul>
                <li>Ferid</li>
                <li>Ferid</li>
                <li>Ferid</li>
                <li>Ferid</li>
                <li>Ferid</li>
            </ul>
        </div>
    )
}


function Search() {
    return (
        <div className='search'>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type={'text'} placeholder="Axtarış..." />
        </div>
    )
}


function User({cartTotalItems}) {
    return (
        <>
            <div className='users'>
                <ul>
                    <li className='user'><Link to="/login">{Icons.userIcon}</Link></li>
                    <li className='favorite'>{Icons.heartIcon}</li>
                    <li className='cart'>
                        <Link to="/cart">
                            {Icons.black_basketIcon} <span>{cartTotalItems}</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}




export default Navbar