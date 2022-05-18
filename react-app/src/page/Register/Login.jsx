import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import * as Icons from '../../assets/Icons/Icons'

function Login() {

    const [passChangetext,setPassChangetext] = useState(true)

    const passwordChangeText = () =>{
        if(passChangetext){
            setPassChangetext(false)
        }
        else{
            setPassChangetext(true)
        }
    }

    return (
        <>
            <section id='login_register_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 left'>
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
                                    placeholder='nümunə@gmail.com' />
                            </div>
                            <div className="password_input mb-3">
                                <label className="form-label">Soyad</label>
                                <input
                                    required
                                    type={passChangetext?'password':'text'} className="form-control"
                                    placeholder='Şifrənizi daxil edin' />
                                <span onClick={()=>passwordChangeText()}>{passChangetext?Icons.eyeIcon:Icons.eyeOffIcon}</span>
                                <Link to='/changepassword'>Şifrəni unutmusunuz?</Link>
                            </div>
                            <button className='login_btn'>Daxil ol</button>
                        </div>

                        <div className='col-6 right'>
                            <img src={require('../../assets/Images/login.png')} />
                            <p>Hesabınız yoxdur? <Link to="/register">Qeydiyyatdan keçin</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <Outlet/>
        </>
    )
}

export default Login