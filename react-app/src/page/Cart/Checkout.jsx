import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import * as Icons from '../../assets/Icons/Icons'
import commerce from '../../Ecommerce'

function Checkout({ cart }) {

  const [stepform, setStepForm] = useState(1)
  const [data, setData] = useState({})
  const [checkoutToken, setcheCkoutToken] = useState({})

  const generateCheckoutToken = async () => {
    if (cart.total_items > 0) {
      await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        .then((token) => { setcheCkoutToken({ checkoutToken: token }) })
    }
  }

  const refreshCart = () => {
    commerce.cart.refresh().then((newCart) => {setcheCkoutToken({cart: newCart})})
  };

  const handleCaptureCheckout = () => {
    const orderData = {
      line_items: cart.line_items,
      customer: {
        firstname: data.name,
        lastname: data.surname,
        email: data.email,
        phone_number: {
          provayder: data.phone_number.provayder,
          number: data.phone_number.number
        }
      },
      shipping: {
        street: data.address,
        apartment: data.apartment,
        courier_message: data.courier_message
      },
      fulfillment: {
        shipping_method: data.pay_type
      }
    };
    setcheCkoutToken(data => ({ ...data, orderData }));
    window.sessionStorage.setItem('order_receipt', JSON.stringify(checkoutToken)); 
    refreshCart();
  };


  useEffect(() => {
    generateCheckoutToken()
  }, [])

  return (
    <>
      {cart.total_unique_items ? (
        <section id="chckoutPage">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul className="pageHeader">
                  <li>
                    <Link to="/home">
                      {Icons.homeIcon}
                      <i className="fa-solid fa-angle-right"></i>
                    </Link>{" "}
                  </li>
                  <li>
                    <a href="#">Sifarişin qeydə alınması</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-9">
                <span>Ödəmə</span>
                <div className="steps">
                  <div id="stepOne" className="formSteps">
                    <div className="title_formsteps">
                      <h2>1. Şəxsi məlumatlar</h2>
                      <div>
                        {stepform > 1 ? <button onClick={() => setStepForm(1)}>Düzəliş et</button> : null}
                      </div>
                    </div>
                    {stepform === 1 ? <StepOne setData={setData} data={data} setStepForm={setStepForm} /> : <StepOneData data={data} />}
                  </div>
                  <div id="stepTwo" className="formSteps">
                    <div className="title_formsteps">
                      <h2>2. Çatdırılma</h2>
                      <div>
                        {stepform > 2 ? <button onClick={() => setStepForm(2)}>Düzəliş et</button> : null}
                      </div>
                    </div>
                    {stepform === 2 ? <StepTwo setStepForm={setStepForm} data={data} setData={setData} /> : null}
                    {stepform > 2 ? <StepTwoData data={data} /> : null}
                  </div>
                  <div id="stepThree" className="formSteps">
                    <div className="title_formsteps">
                      <h2>3. Ödəmə üsulu</h2>
                    </div>
                    {stepform === 3 ? <StepThree
                      setData={setData}
                      handleCaptureCheckout={handleCaptureCheckout} /> : null}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <Amounts subTotal={cart.subtotal} />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="container loading-detailpage">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export const StepOneData = ({ data }) => {
  return (
    <div id='stepOneData'>
      <p>{data.name} {data.surname}</p>
      <p>({data.phone_number.provayder}) {data.phone_number.number}</p>
      <p>{data.email}</p>
    </div>
  )
}

export const StepTwoData = ({ data }) => {
  return (
    <div id='stepTwoData'>
      <p>{data.address}</p>
      <p>{data.apartment}</p>
      <p>{data.courier_message}</p>
    </div>
  )
}

export const StepOne = ({ setStepForm, setData, data }) => {

  const [nameInput, setNameInput] = useState('')
  const [surnameInput, setSurnameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [provayderInput, setProvayderInput] = useState('')
  const [numberInput, setNumberInput] = useState('')

  const saveButton = () => {
    setStepForm((step) => step + 1)

    setData(
      {
        name: nameInput,
        surname: surnameInput,
        phone_number: {
          provayder: provayderInput,
          number: numberInput
        },
        email: emailInput
      }
    )
  }

  // console.log(data)

  return (
    <>
      <div className='body_formsteps'>
        <div className='form'>
          <div className='row'>
            <div className='col-6'>
              <div className="mb-3">
                <label className="form-label">Ad</label>
                <input
                  defaultValue={data.name}
                  name='name'
                  required
                  onChange={(e) => setNameInput(e.target.value)}
                  type={'text'} className="form-control"
                  placeholder='Adınızı daxil edin' />
              </div>
            </div>
            <div className='col-6'>
              <div className="mb-3">
                <label className="form-label">Soyad</label>
                <input
                  name='surname'
                  defaultValue={data.surname}
                  required
                  onChange={(e) => setSurnameInput(e.target.value)}
                  type={'text'} className="form-control"
                  placeholder='Soyadınızı daxil edin' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <div className="mb-3">
                <label className="form-label">Mobil nömrə</label>
                <div className='phonenumberinput'>
                  <select required onChange={(e) => setProvayderInput(e.target.value)} aria-label="Default select example">
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
                    onChange={(e) => setNumberInput(e.target.value)}
                    type={'tel'} className="form-control"
                    placeholder='000-00-00' />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  required
                  defaultValue={data.email}
                  onChange={(e) => setEmailInput(e.target.value)}
                  type={"email"} className="form-control"
                  placeholder='nümunə@gmail.com' />
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => saveButton()} className='save_btn'>Yadda Saxla</button>
          </div>
        </div>
      </div>
    </>
  )
}

export const StepTwo = ({ setStepForm, setData, data }) => {

  const [address, setAddress] = useState()
  const [apartment, setApartment] = useState()
  const [couriermessage, setCourierMessage] = useState()

  const saveButton = () => {
    setStepForm((step) => step + 1)

    let addData = {};

    addData = {
      address: address,
      apartment: apartment,
      courier_message: couriermessage
    };
    setData(data => ({
      ...data,
      ...addData
    }));
  }

  return (
    <div className='body_formsteps'>
      <div className='form'>
        <div className='row'>
          <div className='col-6'>
            <div className="mb-3">
              <label className="form-label">Ünvan</label>
              <input
                defaultValue={data.address}
                type={'text'} onChange={(e) => setAddress(e.target.value)}
                className="form-control" placeholder='Ünvanı daxil edin' />
            </div>
          </div>
          <div className='col-6'>
            <div className="mb-3">
              <label className="form-label">Bina/Mənzil</label>
              <input
                defaultValue={data.apartment} type={'text'}
                onChange={(e) => setApartment(e.target.value)}
                className="form-control" placeholder='Daxil edin' />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <label className="form-label">Kuryer üçün əlavə qeydlər</label>
            <textarea
              defaultValue={data.courier_message}
              className="form-control" onChange={(e) => setCourierMessage(e.target.value)}
              placeholder="Mətni daxil edin..." id="floatingTextarea"></textarea>
          </div>
        </div>

        <div>
          <button onClick={() => saveButton()} className='save_btn'>Yadda Saxla</button>
        </div>
      </div>
    </div>
  )
}

export const StepThree = ({ setData, handleCaptureCheckout }) => {
  let card_btn = document.getElementsByClassName('pay_type_btn')[0]
  let cash_btn = document.getElementsByClassName('pay_type_btn')[1]

  const payTypeCash = () => {

    if (card_btn !== undefined && cash_btn !== undefined) {
      card_btn.classList.remove("active_payTypeBtn")
      cash_btn.classList.add('active_payTypeBtn')
    }
    setData(data => ({ ...data, ...{ pay_type: 'cash' } }));
  }

  const payTypeCard = () => {
    if (card_btn !== undefined && cash_btn !== undefined) {
      card_btn.classList.add("active_payTypeBtn")
      cash_btn.classList.remove("active_payTypeBtn")
    }
    setData(data => ({ ...data, ...{ pay_type: 'card' } }));
  }

  return (
    <div className='body_formsteps'>
      <div className='form'>
        <div className='pay_type_btns'>
          <button onClick={() => payTypeCard()} className='pay_type_btn'> {Icons.cardIcon} Onlayn kart ilə ödəmə </button>
          <button onClick={() => payTypeCash()} className='pay_type_btn'> {Icons.moneyIcon} Qapıda nağd ödəmə</button>
        </div>
        <div className='d-flex justify-content-center'>
          <button onClick={()=>handleCaptureCheckout()} className='save_btn'>Təsdiq et</button>
        </div>
      </div>
    </div>
  )
}

export const Amounts = ({ subTotal }) => {
  return (
    <>
      <div className='common-amounts'>
        <p>Ümumi</p>
        <div className='amount'>
          <span>Məbləğ</span>
          <span>{subTotal.formatted_with_symbol}</span>
        </div>
        <div className='amount'>
          <span>Çatdırılma</span>
          <span>0.00</span>
        </div>
        <div className='amount'>
          <span>Hədiyyə paketi</span>
          <span>4.00</span>
        </div>
        <div className='amount'>
          <span>Promo kod</span>
          <span>-10.00</span>
        </div>
        <hr />
        <div className='total'>
          <span>Cəmi</span>
          <span>{subTotal.formatted_with_symbol}</span>
        </div>
      </div>
    </>
  )
}


export default Checkout