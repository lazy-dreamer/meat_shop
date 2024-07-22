import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Modal} from "./Modal";
import {IOrderInfo} from "../pages/Checkout";

const checkoutDefaultData = {
  userData: {
    name: {
      value: '',
      description: "Имя",
      isRequired: true,
      isError: false
    },
    surname: {
      value: '',
      description: "Фамилия",
      isRequired: true,
      isError: false
    },
    fathersName: {
      value: '',
      description: "Отчество",
      isRequired: false,
      isError: false
    },
    city: {
      value: '',
      description: "Город",
      isRequired: true,
      isError: false
    },
    phone: {
      value: '',
      description: "Телефон",
      isRequired: true,
      isError: false
    },
    email: {
      value: '',
      description: "Email",
      isRequired: false,
      isError: false
    }
  },
  delivery: {
    deliveryType: 'pickup',
    variantDescription: {
      pickup: "Самовывоз",
      postService: "Почта",
      courier: "Курьер"
    },
    address: {
      value: '',
      isRequired: false,
      isError: false
    }
  },
  payment: {
    paymentType: 'personal',
    variantDescription: {
      personal: "При получиении",
      online: "Онлайн на сайте"
    },
    isOnline: false,
    isError: false,
    isPaid: false
  }
}

interface IInfo {
  info: IOrderInfo
}

export const CheckoutForm: React.FC<IInfo> = ({info}) => {
  const [checkoutInfo, setCheckoutInfo] = useState(checkoutDefaultData)
  const [modalShow, setModalShow] = useState(false)
  
  const navigate = useNavigate();
  
  function paymentError() {
    setCheckoutInfo(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        isError: true
      }
    }));
    setTimeout(function () {
      setCheckoutInfo(prevState => ({
        ...prevState,
        payment: {
          ...prevState.payment,
          isError: false
        }
      }));
    }, 2000)
  }
  
  const handleChangeDeliveryType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    let addressRequired = false;
    if (value !== "pickup") {
      addressRequired = true;
    }
    setCheckoutInfo(prevState => ({
      ...prevState,
      delivery: {
        ...prevState.delivery,
        deliveryType: value,
        address: {
          ...prevState.delivery.address,
          isRequired: addressRequired
        }
      }
    }));
  };
  const handleChangePaymentType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    let isOnlineValue = false;
    if (value === "online") {
      isOnlineValue = true;
    }
    setCheckoutInfo(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        paymentType: value,
        isOnline: isOnlineValue
      }
    }));
  };
  const paymentToggler = () => {
    let toggleState = checkoutInfo.payment.isPaid;
    
    setCheckoutInfo(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        isPaid: !toggleState
      }
    }));
  }
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkoutInfo.payment.isOnline) {
      if (checkoutInfo.payment.isPaid) {
        modalToggle()
      } else {
        paymentError()
      }
    } else {
      modalToggle()
    }
  }
  const orderSubmit = () => {
    setModalShow(false)
    navigate("/success");
  }
  
  function modalToggle() {
    setModalShow(prev => !prev)
  }
  
  return (
    <>
      <form className="checkout_lines" action="" onSubmit={formSubmit} autoComplete="off">
        <div className="checkout_line bottom_offset">
          <div className="aside_side_frame_title">Контактные данные</div>
          <div className="form_elements">
            <div className="form_element half">
              <input type="text" placeholder="Имя" name="name" required={checkoutInfo.userData.name.isRequired}
                     onChange={(e) => setCheckoutInfo(prev => ({
                       ...prev, userData: {
                         ...prev.userData,
                         name: {
                           ...prev.userData.name,
                           value: e.target.value
                         }
                       }
                     }))} autoComplete="none"/>
            </div>
            <div className="form_element half">
              <input type="text" placeholder="Фамилия" name="surname"
                     required={checkoutInfo.userData.surname.isRequired} onChange={(e) => setCheckoutInfo(prev => ({
                ...prev, userData: {
                  ...prev.userData,
                  surname: {
                    ...prev.userData.surname,
                    value: e.target.value
                  }
                }
              }))} autoComplete="none"/>
            </div>
            <div className="form_element half">
              <input type="text" placeholder="Отчество" name="fathersName"
                     required={checkoutInfo.userData.fathersName.isRequired} onChange={(e) => setCheckoutInfo(prev => ({
                ...prev, userData: {
                  ...prev.userData,
                  fathersName: {
                    ...prev.userData.fathersName,
                    value: e.target.value
                  }
                }
              }))} autoComplete="none"/>
            </div>
            <div className="form_element half">
              <input type="text" placeholder="Город" name="city" required={checkoutInfo.userData.city.isRequired}
                     onChange={(e) => setCheckoutInfo(prev => ({
                       ...prev, userData: {
                         ...prev.userData,
                         city: {
                           ...prev.userData.city,
                           value: e.target.value
                         }
                       }
                     }))} autoComplete="none"/>
            </div>
            <div className="form_element half">
              <input type="tel" placeholder="Номер телефона" name="phone"
                     required={checkoutInfo.userData.phone.isRequired} onChange={(e) => setCheckoutInfo(prev => ({
                ...prev, userData: {
                  ...prev.userData,
                  phone: {
                    ...prev.userData.phone,
                    value: e.target.value
                  }
                }
              }))} autoComplete="none"/>
            </div>
            <div className="form_element half">
              <input type="email" placeholder="E-mail" name="email" required={checkoutInfo.userData.email.isRequired}
                     onChange={(e) => setCheckoutInfo(prev => ({
                       ...prev, userData: {
                         ...prev.userData,
                         email: {
                           ...prev.userData.email,
                           value: e.target.value
                         }
                       }
                     }))} autoComplete="none"/>
            </div>
          </div>
        </div>
        
        <div className="checkout_line bottom_offset">
          <div className="aside_side_frame_title">Доставка</div>
          <div className="form_elements">
            <div className="form_element half">
              <div className="select_wrapper">
                <select className="select" defaultValue='pickup' name="" onChange={handleChangeDeliveryType}>
                  <option value="pickup">Самовывоз</option>
                  <option value="postService">Почта</option>
                  <option value="courier">Курьер</option>
                </select>
              </div>
            </div>
            {
              checkoutInfo.delivery.deliveryType !== "pickup" && (
                <div className="form_element half">
                  <input type="text" placeholder="АДРЕС ДОСТАВКИ" name="address"
                         required={checkoutInfo.delivery.address.isRequired} onChange={(e) => setCheckoutInfo(prev => ({
                    ...prev, delivery: {
                      ...prev.delivery,
                      address: {
                        ...prev.delivery.address,
                        value: e.target.value
                      }
                    }
                  }))} autoComplete="none"/>
                </div>
              )
            }
          </div>
        </div>
        
        <div className="checkout_line bottom_offset">
          <div className="aside_side_frame_title">Оплата</div>
          <div className="form_elements">
            <div className="form_element half">
              <div className="select_wrapper">
                <select className="select" defaultValue='personal' name="" onChange={handleChangePaymentType}>
                  <option value="personal">При получиении</option>
                  <option value="online">Онлайн на сайте</option>
                </select>
              </div>
            </div>
            {
              checkoutInfo.payment.isOnline && (
                checkoutInfo.payment.isPaid ? <div className="form_element half">
                  <div className="main_btn wide label_button"><span className="main_btn_inner">Оплачено</span></div>
                </div> : <div className="form_element half">
                  <button className={`main_btn wide ` + (checkoutInfo.payment.isError && 'error')} type="button"
                          onClick={paymentToggler}><span className="main_btn_inner">Оплатить</span></button>
                </div>
              )
            }
          </div>
        </div>
        <div className="controll_buttons">
          <Link className="main_btn filled" to="/cart"><span
            className="main_btn_inner">К корзине</span></Link>
          <button className="main_btn" type="submit"><span
            className="main_btn_inner">Оформить</span></button>
        </div>
      </form>
      
      
      <Modal show={modalShow} setShow={setModalShow}>
        <div className="modal_win checkout_lines">
          <div className="main_title_wrapper">
            <div className="main_title">Оформление заказа</div>
          </div>
          <div className="checkout_line bottom_offset">
            <div className="aside_side_frame_title">Вы заказали:</div>
            <div className="simple_text">
              <ol className="product_count_list">
                {
                  info.cartItems.map((item, index) => <li key={index}>{item}</li>)
                }
              </ol>
              <p>На общую стоимость: <strong>{info.cartTotalWithDiscount} ₪</strong></p>
            </div>
          </div>
          <div className="checkout_line bottom_offset">
            <div className="aside_side_frame_title">Контактные данные</div>
            <div className="simple_text">
              <ul className="product_count_list">
                {
                  Object.entries(checkoutInfo.userData).map(([key, {description, value}], index) => (
                    <li key={index}>
                      {description}: {value.length > 0 ? value : "Не указано"}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="checkout_line bottom_offset">
            <div className="aside_side_frame_title">Доставка</div>
            <p>Способ
              доставки: {checkoutInfo.delivery.variantDescription[checkoutInfo.delivery.deliveryType as keyof typeof checkoutInfo.delivery.variantDescription]}</p>
            <p>Адрес
              доставки: {checkoutInfo.delivery.address.value.length > 0 ? checkoutInfo.delivery.address.value : 'Не указано'}</p>
          </div>
          <div className="checkout_line bottom_offset">
            <div className="aside_side_frame_title">Оплата</div>
            <p>Способ
              оплаты: {checkoutInfo.payment.variantDescription[checkoutInfo.payment.paymentType as keyof typeof checkoutInfo.payment.variantDescription]}</p>
            <p>Статус оплаты: {checkoutInfo.payment.isPaid ? "Оплачено" : "Не оплачено"}</p>
          </div>
          <div className="checkout_line">
            <div className="controll_buttons">
              <button className="main_btn filled" type="button" onClick={() => setModalShow(false)}><span
                className="main_btn_inner">Отмена</span></button>
              <button className="main_btn" type="button" onClick={orderSubmit}><span
                className="main_btn_inner">Подтверждаю</span></button>
            </div>
          </div>
        
        </div>
      </Modal>
    </>
  )
}