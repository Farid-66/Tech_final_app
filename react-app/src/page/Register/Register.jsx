import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import * as Icons from '../../assets/Icons/Icons'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Register() {

  let navigate = useNavigate()

  const [passChangetext, setPassChangetext] = useState(true)
  const passwordChangeText = () => {
    passChangetext ? setPassChangetext(false) : setPassChangetext(true)
  }


  const [nameInput, setNameInput] = useState();
  const [surnameInput, setSurnameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [numberInput, setNumberInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  const handleRegister = () => {
    const url = new URL(
      "https://api.chec.io/v1/customers"
    );

    let headers = {
      "X-Authorization": "sk_424315286c0f23285f9dd296cbf3b4ce3b653598609b3",
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    let body = {
      "email": emailInput,
      "phone": numberInput,
      "firstname": nameInput,
      "lastname": surnameInput,
      "external_id": "CRM_USER_" + ((Math.round(Math.random() * 10000) * 1000) / 10),
      "password": passwordInput
    }

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => (data.status_code==422?(
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Eyni e-poçt ünvanı olan müştəri hesabı artıq mövcuddur.',
          footer: '<a href="login">Daxil olun </a>'
        })
      ):(
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Qeydiyyat təsdiq olundu',
          showConfirmButton: false,
          timer: 2500
        },
        navigate("/login"))
      )));
  }

  return (
    <>
      <section id='login_register_page'>
        <div className='container'>
          <div className='row'>

            <div className='col-12 col-md-6 left'>
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
                <label className="form-label">Ad</label>
                <input
                  required
                  onChange={(e) => setNameInput(e.target.value)}
                  type={'text'} className="form-control"
                  placeholder='Adınızı daxil edin' />
              </div>
              <div className="mb-3">
                <label className="form-label">Soyad</label>
                <input
                  required
                  onChange={(e) => setSurnameInput(e.target.value)}
                  type={'text'} className="form-control"
                  placeholder='Soyadınızı daxil edin' />
              </div>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  required
                  onChange={(e) => setEmailInput(e.target.value)}
                  type={'email'} className="form-control"
                  placeholder='nümunə@gmail.com' />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobil nömrə</label>
                <div className='phonenumberinput'>
                  <input
                    required
                    onChange={(e) => setNumberInput(e.target.value)}
                    type={'tel'} className="form-control"
                    placeholder='(000)-000-00-00' />
                </div>
              </div>
              <div className="password_input mb-3">
                <label className="form-label">Şifrə</label>
                <input
                  required
                  onChange={(e) => setPasswordInput(e.target.value)}
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
              <button onClick={() => handleRegister()} className='login_btn'>Qeydiyyat</button>
              <p className='mt-4 d-block d-md-none'>Artıq hesabınız var? <Link to="/login">Daxil olun </Link></p>
            </div>

            <div className='col-12 col-md-6 d-none d-md-block right'>
              <i>{Icons.register_loginImage}</i>
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