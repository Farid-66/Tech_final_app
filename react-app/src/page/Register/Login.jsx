import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import * as Icons from '../../assets/Icons/Icons'
import commerce from "../../Ecommerce";
import Swal from 'sweetalert2'

function Login() {

    const [passChangetext, setPassChangetext] = useState(true)

    const passwordChangeText = () => {
        if (passChangetext) {
            setPassChangetext(false)
        }
        else {
            setPassChangetext(true)
        }
    }

    const [emailInput, setEmailInput] = useState()

    const LogIn = () => {
        commerce.customer.login(emailInput, `http://localhost:3000/auth/`)
            .then((token) => (token.success ? (
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Təsdiq linki e-poçtunuza göndərildi. Zəhmət olmasa təsdiqləyin',
                    showConfirmButton: false,
                    timer: 3500
                })) : ("")));
    }

    return (
        <>
            <section id='login_register_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 left'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h3>Daxil ol</h3>
                                    <div>
                                        <button><span>{Icons.facebookIcon}</span> Facebook ilə</button>
                                        <button><span>{Icons.googleIcon}</span>Google ilə</button>
                                    </div>
                                    <p>və ya</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">E-mail</label>
                                <input
                                    required
                                    type={'email'} className="form-control"
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    placeholder='nümunə@gmail.com' />
                            </div>
                            <div className="password_input mb-3">
                                <label className="form-label">Şifrə</label>
                                <input
                                    required
                                    type={passChangetext ? 'password' : 'text'} className="form-control"
                                    placeholder='Şifrənizi daxil edin' />
                                <span onClick={() => passwordChangeText()}>{passChangetext ? Icons.eyeIcon : Icons.eyeOffIcon}</span>
                                <Link to='/changepassword'>Şifrəni unutmusunuz?</Link>
                            </div>
                            <button onClick={() => LogIn()} className='login_btn'>Daxil ol</button>
                            <p className='d-block d-md-none'><span>Hesabınız yoxdur?</span>  <Link to="/register">Qeydiyyatdan keçin</Link></p>
                        </div>

                        <div className='col-12 col-md-6 d-none d-md-block right'>
                            <i>{Icons.register_loginImage}</i>
                            <p>Hesabınız yoxdur? <Link to="/register">Qeydiyyatdan keçin</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <Outlet />
        </>
    )
}

export default Login