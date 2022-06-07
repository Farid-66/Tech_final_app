import React, { useEffect, useState } from 'react'
import { Link, useParams, Outlet } from 'react-router-dom'
import commerce from '../../Ecommerce'
import * as Icons from '../../assets/Icons/Icons'
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function Profile() {

    return (
        <>
            <section id='profilepage'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='profile_nav'>
                                    <h3>Profilim</h3>
                                    <ul className='pnav_items'>
                                        <li className='pnav_item'><i>{Icons.black_basketIcon}</i> <span>Sifarişlərim</span></li>
                                        <li className='pnav_item'><i>{Icons.heartIcon}</i> <span>Favorilərim</span></li>
                                        <li className='pnav_item'><Link to={`/profile/info`}><i>{Icons.userIcon}</i> <span>Şəxsi məlumatlar</span></Link></li>
                                        <li className='pnav_item'><i>{Icons.locationIcon}</i> <span>Çatdırılma ünvanı</span></li>
                                        <li className='pnav_item'><i>{Icons.exitIcon}</i> <span>Çıxış</span></li>
                                    </ul>

                                </div>
                            </div>
                            <div className='col-9'>
                                {/* <MyOrders /> */}
                                {/* <PersonalInformation userdata={userdata} />  */}

                                <Routes>
                                    <Route index element={<MyOrders />} />
                                    <Route path='profile/info' element={<PersonalInformation />} />
                                </Routes>

                            </div>
                        </div>
                    </div>
                </section>
            <Outlet />
        </>
    )
}

export const MyOrders = () => {

    const [orders, setOrders] = useState(true)

    return (
        <>
            <section id='my_orders'>
                <div className='title'>
                    <h3>Sifarişlərim</h3>
                </div>
                {orders ? (
                    <div className='emptyorders'>
                        <img src={require('../../assets/Images/shopping-cart.jpg')} />
                        <p>Səbətinizdə hazırda heç bir sifarişiniz yoxdur</p>
                    </div>
                ) : "ss"}
            </section>
        </>
    )

}

export const PersonalInformation = ({ userdata }) => {
    return (
        <>

            <section id='personalInfo'>
                <div className='title'>
                    <h3>Şəxsi məlumatlar</h3>
                </div>
                <div className='personalinfo'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label className="form-label">Ad</label>
                                    <input
                                        // value={userdata.firstname}
                                        required
                                        type={'text'} className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">E-mail</label>
                                    <input
                                        // value={userdata.email}
                                        required
                                        type={'email'} className="form-control" />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label className="form-label">Soyad</label>
                                    <input
                                        // value={userdata.lastname}
                                        required
                                        type={'text'} className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Mobil nömrə</label>
                                    <div className='phonenumberinput'>
                                        <input
                                            // value={userdata.phone}
                                            // placeholder={userdata.phone == null ? "Məlumat qeyd olunmayıb" : userdata.phone}
                                            required
                                            type={'tel'} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className=' col-12 edit_personalInfo_Btn'>
                                <button>Məlumatları yenilə</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* {userdata == undefined ? (
                
            ) : (
                <div className='container '>
                    <div className='row'>
                        <div className='col-12 profile_page_loading'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    )
}


export default Profile