import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import commerce from "../Ecommerce";
import * as Icons from '../assets/Icons/Icons'
import { useSelector, useDispatch } from 'react-redux'

function Navbar({ cartTotalItems }) {
    const [isOpen, setIsOpen] = useState("onHoverCloseMenuPage")
    const [brand, setBrand] = useState([])
    const [Id, setId] = useState()

    const favourite = useSelector((state) => state.favourite)

    // useEffect(() => {
    //     commerce.categories.retrieve('mobile', { type: 'slug' })
    //         .then((category) => setBrand(category.children));
    // }, [])


    const onHover = (id) => {
        setIsOpen("onHoverOpenMenuPge")
        setId(id)
    }

    const url = new URL(
        "https://api.chec.io/v1/categories/cat_ZM8X5n6BJ5pv4q"
    );

    let params = {
        "depth": "2",
    };

    Object.keys(params)
        .forEach(key => url.searchParams.append(key, params[key]));

    let headers = {
        "X-Authorization": "sk_424315286c0f23285f9dd296cbf3b4ce3b653598609b3",
        "Accept": "application/json",
        "Content-Type": "application/json",
    };



    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: headers,
        })
            .then(response => response.json())
            .then(json => setBrand(json.children));
    }, [])

    return (
        <>
            <nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='d-flex'>
                                <button className='menu-btn'><i class="fa-solid fa-bars"></i></button>
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
                                <User cartTotalItems={cartTotalItems} favouriteLength = {favourite.length} />
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

    const url = new URL(
        `https://api.chec.io/v1/categories/${id}`
    );

    let params = {
        "depth": "2",
    };

    Object.keys(params)
        .forEach(key => url.searchParams.append(key, params[key]));

    let headers = {
        "X-Authorization": "sk_424315286c0f23285f9dd296cbf3b4ce3b653598609b3",
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    // console.log(url)
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: headers,
        })
            .then(response => response.json())
            .then(json => setSubItem(json));
    }, [])

    // console.log(subItem)
    return (
        <div className={isOpen}
            onMouseEnter={() => setIsOpen("onHoverOpenMenuPge")}
            onMouseLeave={() => setIsOpen("onHoverCloseMenuPage")}>
            <ul>
                {/* {subItem!=undefined?subItem.children.map((e)=>(<li>{e.name}</li>)):""} */}
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


function User({ cartTotalItems, favouriteLength }) {
    return (
        <>
            <div className='users'>
                <ul>
                    <li className='user'><Link to="/login">{Icons.userIcon} </Link></li>
                    <li className='favourite'><Link to={'/favourite'}>{Icons.heartIcon} {favouriteLength>0?<span>{favouriteLength}</span>:""} </Link></li>
                    <li className='cart'>
                        <Link to="/cart">
                            {Icons.black_basketIcon} {cartTotalItems>0?<span>{cartTotalItems}</span>:""}
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}




export default Navbar