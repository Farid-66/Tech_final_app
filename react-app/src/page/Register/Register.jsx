import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import * as Icons from '../../assets/Icons/Icons'

function Register() {

  const [passChangetext, setPassChangetext] = useState(true)

  const passwordChangeText = () => {
    if (passChangetext) {
      setPassChangetext(false)
    }
    else {
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
                  <h3>Qeydiyyat</h3>
                  <div>
                    <button><span>{Icons.facebookIcon}</span> Facebook ilə</button>
                    <button><span>{Icons.googleIcon}</span>Google ilə</button>
                  </div>
                  <p>və ya</p>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Ad, Soyad</label>
                <input
                  required
                  type={'text'} className="form-control"
                  placeholder='Ad və soyadınızı daxil edin' />
              </div>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  required
                  type={'email'} className="form-control"
                  placeholder='nümunə@gmail.com' />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobil nömrə</label>
                <div className='phonenumberinput'>
                  <select required aria-label="Default select example">
                    <option>(000)</option>
                    <option defaultValue="077">077</option>
                    <option defaultValue="070">070</option>
                    <option defaultValue="050">050</option>
                    <option defaultValue="051">051</option>
                    <option defaultValue="010">010</option>
                    <option defaultValue="055">055</option>
                    <option defaultValue="099">099</option>
                  </select>
                  <input
                    required
                    type={'tel'} className="form-control"
                    placeholder='000-00-00' />
                </div>
              </div>
              <div className="password_input mb-3">
                <label className="form-label">Soyad</label>
                <input
                  required
                  type={passChangetext ? 'password' : 'text'} className="form-control"
                  placeholder='Şifrənizi daxil edin' />
                <span onClick={() => passwordChangeText()}>{passChangetext ? Icons.eyeIcon : Icons.eyeOffIcon}</span>
              </div>
              {/* <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                  <label class="form-check-label" for="flexCheckChecked">
                    <a>İstifadəçi şərtləri</a> <p>ilə razıyam</p>
                  </label>
              </div> */}
              <button className='login_btn'>Qeydiyyat</button>
            </div>

            <div className='col-6 right'>
              <img src={require('../../assets/Images/login.png')} />
              <p>Artıq hesabınız var? <Link to="/login">Daxil olun </Link></p>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  )
}

export default Register