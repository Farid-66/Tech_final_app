import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import * as Icons from '../../assets/Icons/Icons'
import commerce from '../../Ecommerce'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Spinner } from "react-bootstrap";

function Checkout({ cart }) {

  let navigate = useNavigate()

  const [stepform, setStepForm] = useState(1)
  const [data, setData] = useState({
    personalInfo: {},
    addressInfo: {},
    pay_type: "",
  });
  const [checkoutToken, setcheCkoutToken] = useState({})

  const generateCheckoutToken = async () => {
    if (cart.total_items > 0) {
      await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        .then((token) => {
          setcheCkoutToken(token)
        })
    }
  }

  const refreshCart = () => {
    commerce.cart.refresh().then((newCart) => {
      setcheCkoutToken({ cart: newCart })
    })
  };

  let line_items = checkoutToken.line_items
  let line_items_new = []

  if (line_items != undefined ) {
    line_items.forEach(e => {
      line_items_new.push({ [e.id]: { quantity: e.quantity } })
    });
  }
  
  const [bntloading, setBtnloading] = useState(true)

  const handleCaptureCheckout = () => {
    setBtnloading(false)
    commerce.checkout.capture(`${checkoutToken.id}`, {
      line_items: {
        ...line_items_new
      },
      customer: {
        firstname: data.personalInfo.name,
        lastname: data.personalInfo.surname,
        email: data.personalInfo.email,
      },
      shipping: {
        name: data.personalInfo.name + data.personalInfo.surname,
        street: data.addressInfo.apartment,
        town_city: data.addressInfo.address
      },
      payment: {
        gateway: 'test_gateway',
        card: {
          number: '4242 4242 4242 4242',
          expiry_month: '01',
          expiry_year: '2023',
          cvc: '123',
          postal_zip_code: '94103',
        },
      }
    })
      .then(response => {
        setBtnloading(true)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sifariş qeydə alındı',
          showConfirmButton: false,
          timer: 3500
        })
        setTimeout(() => {
          navigate('/')
        }, 4000);

      })
      .catch(error =>
        console.log(error)
      );
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
              <div className="col-12 col-md-9">
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
                      bntloading={bntloading}
                      handleCaptureCheckout={handleCaptureCheckout}
                      data={data} /> : null}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
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
    <div id="stepOneData">
      <p>
        {data.personalInfo.name} {data.personalInfo.surname}
      </p>
      <p>
        ({data.personalInfo.phone_number.provayder}){" "}
        {data.personalInfo.phone_number.number}
      </p>
      <p>{data.personalInfo.email}</p>
    </div>
  )
}

export const StepTwoData = ({ data }) => {
  return (
    <div id='stepTwoData'>
      <p>{data.addressInfo.address}</p>
      <p>{data.addressInfo.apartment}</p>
      <p>{data.addressInfo.courier_message}</p>
    </div>
  )
}

export const StepOne = ({ setStepForm, setData, data }) => {

  const [nameInput, setNameInput] = useState(data.personalInfo.name);
  const [surnameInput, setSurnameInput] = useState(data.personalInfo.surname);
  const [emailInput, setEmailInput] = useState(data.personalInfo.email);
  const [provayderInput, setProvayderInput] = useState(
    data.personalInfo.phone_number?.provayder
  );
  const [numberInput, setNumberInput] = useState(
    data.personalInfo.phone_number?.number
  );

  const saveButton = () => {
    setStepForm((step) => step + 1);
    setData({
      ...data,
      personalInfo: {
        name: nameInput,
        surname: surnameInput,
        phone_number: {
          provayder: provayderInput,
          number: numberInput,
        },
        email: emailInput,
      },
    });
  };

  return (
    <>
      <div className='body_formsteps'>
        <div className='form'>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <div className="mb-3">
                <label className="form-label">Ad</label>
                <input
                  defaultValue={data.personalInfo.name}
                  name='name'
                  required
                  onChange={(e) => setNameInput(e.target.value)}
                  type={'text'} className="form-control"
                  placeholder='Adınızı daxil edin' />
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className="mb-3">
                <label className="form-label">Soyad</label>
                <input
                  name='surname'
                  defaultValue={data.personalInfo.surname}
                  required
                  onChange={(e) => setSurnameInput(e.target.value)}
                  type={'text'} className="form-control"
                  placeholder='Soyadınızı daxil edin' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <div className="mb-3">
                <label className="form-label">Mobil nömrə</label>
                <div className='phonenumberinput'>
                  <select required
                    onChange={(e) => setProvayderInput(e.target.value)}
                    value={provayderInput}
                    aria-label="Default select example">
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
                    value={numberInput}
                    placeholder='000-00-00' />
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  required
                  defaultValue={data.personalInfo.email}
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

  const [address, setAddress] = useState(data.addressInfo.address);
  const [apartment, setApartment] = useState(data.addressInfo.apartment);
  const [couriermessage, setCourierMessage] = useState(
    data.addressInfo.courier_message
  );

  const saveButton = () => {
    setStepForm((step) => step + 1);

    let addData = {};

    addData = {
      address: address,
      apartment: apartment,
      courier_message: couriermessage,
    };
    setData({
      ...data,
      addressInfo: addData,
    });
  };

  return (
    <div className='body_formsteps'>
      <div className='form'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <div className="mb-3">
              <label className="form-label">Ünvan</label>
              <input
                defaultValue={data.addressInfo.address}
                type={'text'} onChange={(e) => setAddress(e.target.value)}
                className="form-control" placeholder='Ünvanı daxil edin' />
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className="mb-3">
              <label className="form-label">Bina/Mənzil</label>
              <input
                defaultValue={data.addressInfo.apartment} type={'text'}
                onChange={(e) => setApartment(e.target.value)}
                className="form-control" placeholder='Daxil edin' />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <label className="form-label">Kuryer üçün əlavə qeydlər</label>
            <textarea
              defaultValue={data.addressInfo.courier_message}
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

export const StepThree = ({ setData, handleCaptureCheckout, data, bntloading }) => {
  const selectPaymentType = (e) => {
    let btns = document.querySelectorAll(".pay_type_btn");
    [...btns].forEach((btn) => btn.classList.remove("active_payTypeBtn"));
    e.target.classList.add("active_payTypeBtn");
    setData((data) => ({ ...data, pay_type: e.target.name }));
  };

  return (
    <div className='body_formsteps'>
      <div className='form'>
        <div className='pay_type_btns'>
          <button onClick={selectPaymentType}
            className={
              data.pay_type === "card"
                ? "pay_type_btn active_payTypeBtn"
                : "pay_type_btn"
            }
            name="card"> {Icons.cardIcon} Onlayn kart ilə ödəmə </button>
          <button onClick={selectPaymentType}
            className={
              data.pay_type === "cash"
                ? "pay_type_btn active_payTypeBtn"
                : "pay_type_btn"
            }
            name="cash"> {Icons.moneyIcon} Qapıda nağd ödəmə</button>
        </div>
        <div className='d-flex justify-content-center'>
          <button
            onClick={() => handleCaptureCheckout()}
            className='save_btn'>
            {bntloading ? "Təsdiq et" : (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </button>
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