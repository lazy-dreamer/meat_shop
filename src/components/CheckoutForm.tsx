import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {IOrderInfo} from "../pages/Checkout";
import {useForm, Controller} from "react-hook-form";
import Select from "react-select";
import {ISelectOption} from "./CategorySection";
import {Fancybox} from "@fancyapps/ui";
import {createRoot} from "react-dom/client";


const checkoutTitles = {
  name: "Имя",
  surname: "Фамилия",
  parents_name: "Отчество",
  city: "Город",
  phone: "Телефон",
  email: "e-mail",
  delivery: "Способ доставки",
  payment: "Способ оплаты",
  address: "Адрес доставки",
  payment_status: "Статус оплаты"
}

interface IInfo {
  info: IOrderInfo
}

const deliveryOptions = [
  {value: 'undefined', label: 'Доставка', isDisabled: true},
  {value: 'pickup', label: 'Самовывоз'},
  {value: 'postService', label: 'Почта'},
  {value: 'courier', label: 'Курьер'}
]
const paymentOptions = [
  {value: 'undefined', label: 'Оплата', isDisabled: true},
  {value: 'personal', label: 'При получиении'},
  {value: 'online', label: 'Онлайн на сайте'}
]

export const CheckoutForm: React.FC<IInfo> = ({info}) => {
  const [deliveryField, setDeliveryField] = useState(false)
  const [paymentShow, setPaymentShow] = useState(false)
  const [isPayed, setIsPayed] = useState(false)
  const [isPaymentError, setIsPaymentError] = useState(false)
  
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({
    mode: "onSubmit"
  });
  
  function paymentError() {
    setIsPaymentError(true)
    setTimeout(function () {
      setIsPaymentError(false)
    }, 2000)
  }
  
  const handleChangeDeliveryType = (val: ISelectOption) => {
    const value = val.value;
    if (value !== "pickup") {
      setDeliveryField(true)
    } else {
      setDeliveryField(false)
    }
  };
  const handleChangePaymentType = (val: ISelectOption) => {
    const value = val.value;
    if (value === "online") {
      setPaymentShow(true)
    } else {
      setPaymentShow(false)
    }
  };
  const paymentToggler = () => {
    setIsPayed(true)
  }
  
  const formSubmit = (data: any) => {
    if (paymentShow) {
      if (isPayed) {
        modalOpen(data)
      } else {
        paymentError()
      }
    } else {
      modalOpen(data)
    }
  }
  
  function closePopup() {
    Fancybox.close();
  }
  
  const modalOpen = (data: any) => {
    Fancybox.show(
      [
        {
          src: '<div></div>',
          type: "html",
        }
      ],
      {
        on: {
          reveal: (_fancybox, slide) => {
            const root = createRoot(
              slide.contentEl.appendChild(document.createElement("div"))
            );
            
            root.render(
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
                        Object.entries(data).map(([key, value], index) => (
                          <li key={index}>
                            {checkoutTitles[key as keyof typeof checkoutTitles]}: {
                            typeof data[key] === 'object' && data[key] !== null ? data[key].label :
                              data[key].length > 0 ? data[key] : "Не указано"
                          }
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="checkout_line">
                  <div className="controll_buttons">
                    <button className="main_btn filled" type="button" onClick={closePopup}><span
                      className="main_btn_inner">Отмена</span></button>
                    <button className="main_btn" type="button" onClick={orderSubmit}><span
                      className="main_btn_inner">Подтверждаю</span></button>
                  </div>
                </div>
              </div>
            );
          }
        }
      }
    )
  }
  
  const orderSubmit = () => {
    window.scrollTo(0, 0)
    closePopup()
    reset()
    navigate("/success");
  }
  
  return (
    <>
      <form className="checkout_lines" onSubmit={handleSubmit(formSubmit)} autoComplete="off">
        <div className="checkout_line bottom_offset">
          <div className="aside_side_frame_title">Контактные данные</div>
          <div className="form_elements">
            <div className="form_element half">
              <input type='text' {...register('name', {
                  required: true,
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа.'
                  }
                }
              )} autoComplete='none' className={errors.name && 'error'} placeholder='Имя'/>
            </div>
            <div className="form_element half">
              <input type='text' {...register('surname', {
                  required: true,
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа.'
                  }
                }
              )} autoComplete='none' className={errors.surname && 'error'} placeholder='Фамилия'/>
            </div>
            <div className="form_element half">
              
              <input type='text' {...register('parents_name')} autoComplete='none' placeholder='Отчество'/>
            </div>
            <div className="form_element half">
              <input type='text' {...register('city')} autoComplete='none' placeholder='Город'/>
            </div>
            <div className="form_element half">
              <input type='number' {...register('phone', {
                required: true,
                minLength: {
                  value: 10,
                  message: 'Минимум 3 символа.'
                },
                maxLength: 12,
              })} autoComplete='none' className={errors.phone && 'error'} placeholder='Номер телефона'/>
            </div>
            <div className="form_element half">
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                })}
                type="email" autoComplete='none' className={errors.email && 'error'} placeholder="E-mail"/>
            </div>
          </div>
        </div>
        
        <div className="checkout_line bottom_offset">
          <div className="aside_side_frame_title">Доставка</div>
          <div className="form_elements">
            <div className="form_element half">
              <div className="select_wrapper">
                <Controller
                  name="delivery"
                  control={control}
                  render={({field: {onChange}}) => (
                    <Select
                      defaultValue={deliveryOptions[0]}
                      onChange={(val) => {
                        if (val) {
                          onChange(val)
                          handleChangeDeliveryType(val)
                        }
                      }}
                      classNamePrefix="react-select"
                      placeholder="Доставка"
                      options={deliveryOptions}
                      className={errors.delivery && 'select_error'}
                    />
                  )}
                  rules={{required: true}}
                />
              </div>
            </div>
            {
              deliveryField && (
                <div className="form_element half">
                  <input type='text' {...register('address', {
                      required: deliveryField,
                      minLength: {
                        value: 3,
                        message: 'Минимум 3 символа.'
                      }
                    }
                  )} className={errors.address && 'error'} autoComplete='none' placeholder='Адрес доставки'/>
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
                <Controller
                  name="payment"
                  control={control}
                  render={({field: {onChange}}) => (
                    <Select
                      defaultValue={paymentOptions[0]}
                      onChange={(val) => {
                        if (val) {
                          handleChangePaymentType(val)
                          onChange(val)
                        }
                      }}
                      classNamePrefix="react-select"
                      placeholder="Оплата"
                      options={paymentOptions}
                      className={errors.payment && 'select_error'}
                    />
                  )}
                  rules={{required: true}}
                />
              </div>
            </div>
            {
              paymentShow && (
                isPayed ? <div className="form_element half">
                  <div className="main_btn wide label_button">
                    <input type='hidden' {...register('payment_status')} value={isPayed ? 'Оплачено' : 'Не оплачено'}/>
                    <span className="main_btn_inner">Оплачено</span></div>
                </div> : <div className="form_element half">
                  <button className={`main_btn wide ` + (isPaymentError && 'error')} type="button"
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
    </>
  )
}