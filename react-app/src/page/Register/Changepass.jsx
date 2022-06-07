import React from 'react'
import * as Icons from '../../assets/Icons/Icons'

function Changepass() {
  return (
    <>
      <section id='login_register_page'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-6 left'>
              <div className='row'>
                <div className='col-12'>
                  <h3>Şifrəmi unutdum</h3>
                  <p>Doğrulama kodunu almaq üçün e - poçt ünvanınızı daxil edin</p>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  required
                  type={'email'} className="form-control"
                  placeholder='nümunə@gmail.com' />
              </div>
              <button className='login_btn'>Göndər</button>
            </div>

            <div className='col-12 col-md-6 d-none d-md-block right'>
              <i>{Icons.letterIamge}</i>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Changepass