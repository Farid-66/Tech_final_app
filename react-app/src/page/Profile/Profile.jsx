import React, { useEffect, useState } from 'react'
import { Link, useParams, Outlet } from 'react-router-dom'
import commerce from '../../Ecommerce'
import * as Icons from '../../assets/Icons/Icons'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Profile({ user }) {

    if (user != undefined) {
        return (
            <>
                <section id='profilepage'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <ProfileSideBar />
                            </div>
                            <div className='col-9'>
                                <Routes>
                                    <Route path='/'>
                                        <Route index element={<MyOrders userdata={user} />} />
                                        <Route path='order' element={<MyOrders userdata={user} />} />
                                        <Route path='order/:ordId' element={<OrderDetial userdata={user} />} />
                                        <Route path='info' element={<PersonalInformation userdata={user} />} />
                                    </Route>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </section>
                <Outlet />
            </>
        )
    } else {
        return (
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
}

export const ProfileSideBar = () => {
    let navigate = useNavigate()

    function LogOut() {
        commerce.customer.logout();
        navigate("/")
    }

    return (
        <div className='profile_nav'>
            <h3>Profilim</h3>
            <ul className='pnav_items'>
                <li className='pnav_item'><Link to={'order'}><i>{Icons.black_basketIcon}</i> <span>Sifarişlərim</span></Link></li>
                <li className='pnav_item'><i>{Icons.heartIcon}</i> <span>Favorilərim</span></li>
                <li className='pnav_item'> <Link to={'info'}><i>{Icons.userIcon}</i> <span>Şəxsi məlumatlar</span></Link></li>
                <li className='pnav_item'><i>{Icons.locationIcon}</i> <span>Çatdırılma ünvanı</span></li>
                <li className='pnav_item'><button onClick={() => LogOut()}><i>{Icons.exitIcon}</i> <span>Çıxış</span></button></li>
            </ul>
        </div>
    )
}


export const MyOrders = ({ userdata }) => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        commerce.customer.getOrders(userdata.id).then((orders) => setOrders(orders.data));
    }, [])


    const line_items = []
    orders.map((curVal) => {
        let suborder = curVal.order
        suborder.line_items.forEach(el => {
            line_items.push({
                id: curVal.id,
                created: curVal.created,
                status: curVal.status,
                line_item_id: el.id,
                product_id: el.product_id,
                product_name: el.product_name,
                price: el.price.formatted_with_code,
                image: el.image.url
            })
        })
    });


    return (
        <>
            <section id='my_orders'>
                <div className='title'>
                    <h3>{line_items.length > 0 ? ("Sifarişlərim (" + line_items.length + " məhsul)") : ("Sifarişlərim")} </h3>
                </div>
                {line_items.length > 0 ? (
                    <div className='orders'>
                        <div className='row'>
                            {line_items.map((e) => (
                                <div key={e.line_item_id} className='col-6'>
                                    <div className='order_box'>
                                        <div className='order_img'>
                                            <img src={e.image} />
                                        </div>
                                        <div className='order_texts'>
                                            <div className='order_text'>
                                                <span>Sifariş tarixi:</span>
                                                <p>{new Date((e.created) * 1000).toLocaleString()}</p>
                                            </div>
                                            <div className='order_text'>
                                                <span>Status:</span>
                                                <p>{e.status[0].toUpperCase() + e.status.substring(1)}</p>
                                            </div>
                                            <div className='order_text'>
                                                <span>Ümumi məbləğ:</span>
                                                <p>{e.price}</p>
                                            </div>
                                            <Link to={`${e.id}`}>Sifarişin detalları</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='emptyorders'>
                        <img src={require('../../assets/Images/shopping-cart.jpg')} />
                        <p>Səbətinizdə hazırda heç bir sifarişiniz yoxdur</p>
                    </div>
                )}
            </section>
            <Outlet />
        </>
    )

}

export const PersonalInformation = ({ userdata }) => {

    const [firstname, setFirstname] = useState(userdata.firstname);
    const [lastname, setLastname] = useState(userdata.lastname);
    const [email, setEmail] = useState(userdata.email);
    const [phone, setPhone] = useState(userdata.phone)

    const UpdateUserData = () => {
        commerce.customer.update({
            email: email,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            external_id: "CRM_USER_" + ((Math.round(Math.random() * 10000) * 1000) / 10),
        }, userdata.id)
            .then((customer) => Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Məlumat dəyişdirildi',
                showConfirmButton: false,
                timer: 3500
            }));
    }

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
                                        defaultValue={userdata.firstname}
                                        placeholder={userdata.firstname == null ?
                                            "Məlumat qeyd olunmayıb" : userdata.firstname}
                                        required
                                        onChange={(e) => setFirstname(e.target.value)}
                                        type={'text'} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">E-mail</label>
                                    <input
                                        defaultValue={userdata.email}
                                        placeholder={userdata.email == null ?
                                            "Məlumat qeyd olunmayıb" : userdata.email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        type={'email'} className="form-control" />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label className="form-label">Soyad</label>
                                    <input
                                        defaultValue={userdata.lastname}
                                        placeholder={userdata.lastname == null ?
                                            "Məlumat qeyd olunmayıb" : userdata.lastname}
                                        required
                                        onChange={(e) => setLastname(e.target.value)}
                                        type={'text'} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobil nömrə</label>
                                    <div className='phonenumberinput'>
                                        <input
                                            defaultValue={userdata.phone}
                                            placeholder={userdata.phone == null ?
                                                "Məlumat qeyd olunmayıb" : userdata.phone}
                                            required
                                            onChange={(e) => setPhone(e.target.value)}
                                            type={'tel'} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className=' col-12 edit_personalInfo_Btn'>
                                <button onClick={() => UpdateUserData()}>Məlumatları yenilə</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export const OrderDetial = ({ userdata }) => {

    const { ordId } = useParams()
    const [orderDetail, setOrderDetail] = useState([])
    useEffect(() => {
        commerce.customer.getOrders(userdata.id).then((orders) => setOrderDetail(orders.data));
    }, [])

    const thisdetail = orderDetail.find((prod) => prod.id === ordId)

    if (thisdetail != undefined) {
        return (
            <>
                <section id='my_orders'>
                    <div className='title'>
                        <h3><Link to={'/profile/order'}><i className="fa-solid fa-arrow-left"></i></Link> Sifarişin detalları</h3>
                        <div className='orderdetail'>
                            {(thisdetail.order.line_items).map((e) => (
                                <div key={e.id} className='orderdetail_about'>
                                    <div className='orderdetail_image'>
                                        <img src={e.image.url} />
                                    </div>
                                    <div className='orderdetail_name'>
                                        <p>{e.product_name}</p>
                                        <div>
                                            <div>
                                                <span>Sifariş tarixi:</span>
                                                <p>{new Date((thisdetail.created) * 1000).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <span>Status:</span>
                                                <p>{thisdetail.status[0].toUpperCase() + thisdetail.status.substring(1)}</p>
                                            </div>
                                            <div>
                                                <span>Say:</span>
                                                <p>{e.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='orderdetail_address'>
                                <div className='orderdetail_person_info'>
                                    <p>Şəxsi məlumatlar</p>
                                    <ul>
                                        <li>{thisdetail.customer.firstname}</li>
                                        <li>{thisdetail.customer.lastname}</li>
                                        <li>{thisdetail.customer.phone}</li>
                                        <li>{thisdetail.customer.email}</li>
                                    </ul>
                                </div>
                                <div className='orderdetail_address_info'>
                                    <p>Çatdırılma ünvanı</p>
                                    <ul>
                                        <li>{thisdetail.shipping.town_city}</li>
                                        <li>{thisdetail.shipping.street}</li>
                                    </ul>
                                </div>
                                <div></div>
                            </div>
                            <div className='orderdetail_pay'>
                                <p>Ödəmə detalları</p>
                                <ul>
                                    <li><span>Ödəmə metodu</span> <span>Kart ilə</span></li>
                                    <li><span>Toplam məbləğ</span> <span>{thisdetail.order_value.formatted_with_code}</span></li>
                                    <li><span>Təcili çatdırılma</span> <span>4 AZN</span></li>
                                    <li><span>Promo kod</span> <span></span>-60 AZN</li>
                                </ul>
                            </div>
                            <div className='total'>
                                <p>Cəmi</p>
                                <p>{thisdetail.order_value.formatted_with_code}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Outlet />
            </>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}


export default Profile