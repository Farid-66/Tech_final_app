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
                <li className='pnav_item'><Link to={'order'}><i>{Icons.black_basketIcon}</i> <span>Sifari??l??rim</span></Link></li>
                <li className='pnav_item'><i>{Icons.heartIcon}</i> <span>Favoril??rim</span></li>
                <li className='pnav_item'> <Link to={'info'}><i>{Icons.userIcon}</i> <span>????xsi m??lumatlar</span></Link></li>
                <li className='pnav_item'><i>{Icons.locationIcon}</i> <span>??atd??r??lma ??nvan??</span></li>
                <li className='pnav_item'><button onClick={() => LogOut()}><i>{Icons.exitIcon}</i> <span>????x????</span></button></li>
            </ul>
        </div>
    )
}


export const MyOrders = ({ userdata }) => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        commerce.customer.getOrders(userdata.id).then((orders) => setOrders(orders.data));
    }, [])

    if (orders != undefined) {
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
                        <h3>{("Sifari??l??rim (" + line_items.length + " m??hsul)")}</h3>
                    </div>
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
                                                <span>Sifari?? tarixi:</span>
                                                <p>{new Date((e.created) * 1000).toLocaleString()}</p>
                                            </div>
                                            <div className='order_text'>
                                                <span>Status:</span>
                                                <p>{e.status[0].toUpperCase() + e.status.substring(1)}</p>
                                            </div>
                                            <div className='order_text'>
                                                <span>??mumi m??bl????:</span>
                                                <p>{e.price}</p>
                                            </div>
                                            <Link to={`${e.id}`}>Sifari??in detallar??</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Outlet />
            </>
        )
    }
    else {
        return (
            <section id='my_orders'>
                <div className='title'>
                    <h3>Sifari??l??rim</h3>
                </div>
                <div className='emptyorders'>
                    <img src={require('../../assets/Images/shopping-cart.jpg')} />
                    <p>S??b??tinizd?? haz??rda he?? bir sifari??iniz yoxdur</p>
                </div>
            </section>
        )
    }
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
                title: 'M??lumat d??yi??dirildi',
                showConfirmButton: false,
                timer: 3500
            }));
    }

    return (
        <>

            <section id='personalInfo'>
                <div className='title'>
                    <h3>????xsi m??lumatlar</h3>
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
                                            "M??lumat qeyd olunmay??b" : userdata.firstname}
                                        required
                                        onChange={(e) => setFirstname(e.target.value)}
                                        type={'text'} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">E-mail</label>
                                    <input
                                        defaultValue={userdata.email}
                                        placeholder={userdata.email == null ?
                                            "M??lumat qeyd olunmay??b" : userdata.email}
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
                                            "M??lumat qeyd olunmay??b" : userdata.lastname}
                                        required
                                        onChange={(e) => setLastname(e.target.value)}
                                        type={'text'} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobil n??mr??</label>
                                    <div className='phonenumberinput'>
                                        <input
                                            defaultValue={userdata.phone}
                                            placeholder={userdata.phone == null ?
                                                "M??lumat qeyd olunmay??b" : userdata.phone}
                                            required
                                            onChange={(e) => setPhone(e.target.value)}
                                            type={'tel'} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className=' col-12 edit_personalInfo_Btn'>
                                <button onClick={() => UpdateUserData()}>M??lumatlar?? yenil??</button>
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

    return (
        <>
            <section id='my_orders'>
                <div className='title'>
                    <h3><Link to={'/profile/order'}><i className="fa-solid fa-arrow-left"></i></Link> Sifari??in detallar??</h3>
                    {thisdetail != undefined ? (
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
                                                <span>Sifari?? tarixi:</span>
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
                                    <p>????xsi m??lumatlar</p>
                                    <ul>
                                        <li>{thisdetail.customer.firstname}</li>
                                        <li>{thisdetail.customer.lastname}</li>
                                        <li>{thisdetail.customer.phone}</li>
                                        <li>{thisdetail.customer.email}</li>
                                    </ul>
                                </div>
                                <div className='orderdetail_address_info'>
                                    <p>??atd??r??lma ??nvan??</p>
                                    <ul>
                                        <li>{thisdetail.shipping.town_city}</li>
                                        <li>{thisdetail.shipping.street}</li>
                                    </ul>
                                </div>
                                <div></div>
                            </div>
                            <div className='orderdetail_pay'>
                                <p>??d??m?? detallar??</p>
                                <ul>
                                    <li><span>??d??m?? metodu</span> <span>Kart il??</span></li>
                                    <li><span>Toplam m??bl????</span> <span>{thisdetail.order_value.formatted_with_code}</span></li>
                                    <li><span>T??cili ??atd??r??lma</span> <span>4 AZN</span></li>
                                    <li><span>Promo kod</span> <span></span>-60 AZN</li>
                                </ul>
                            </div>
                            <div className='total'>
                                <p>C??mi</p>
                                <p>{thisdetail.order_value.formatted_with_code}</p>
                            </div>
                        </div>
                    ) : (
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
                    )}
                </div>
            </section>
            <Outlet />
        </>
    )
}


export default Profile