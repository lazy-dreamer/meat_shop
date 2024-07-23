import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {CtaSection} from "../pages/MainPage";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

interface IMainPageCta {
  sectionInfo: CtaSection;
}

export const MainPageCta: React.FC<IMainPageCta> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<CtaSection | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>;
  }
  
  let {sectionName, sectionTitle, sectionSubTitle, screenForm} = sectionData;
  
  const ctaSubmit = (data: any) => {
    console.log(data)
  }
  
  return (
    <section className="section-cta remove_pt remove_pb" data-title={sectionName}>
      <div className="bg_noise"/>
      <div className="screen_content">
        <div className="cta_sides">
          <div className="cta_side content_side">
            <div className="simple_text">
              <h2>{sectionTitle}</h2>
              <p>{sectionSubTitle}</p>
            </div>
          </div>
          <div className="cta_side form_side">
            <form className="form_send" onSubmit={handleSubmit(ctaSubmit)} method="post">
              <input type="hidden" name="project_name" value=""/>
              <input type="hidden" name="form_subject" value=""/>
              <div className="form_heading simple_text">
                <h5>{screenForm.formTitle}</h5>
                <p>{screenForm.formSubTitle}</p>
              </div>
              <div className="form_elements">
                <div className="form_element half">
                  <input type='text' {...register('firstName', {
                      required: true,
                      minLength: {
                        value: 3,
                        message: 'Минимум 3 символа.'
                      }
                    }
                  )} placeholder='ВАШЕ ИМЯ'/>
                </div>
                <div className="form_element half">
                  <input type='tel' {...register('phoneNumber', {
                    required: true,
                    minLength: {
                      value: 10,
                      message: 'Минимум 10 символа.'
                    }
                  })} placeholder='НОМЕР ТЕЛЕФОНА'/>
                </div>
                {/* Имя обязательно!*/}
                {errors.firstName && <div className="form_element red">Имя обязательно!</div>}
                {/*{errors.firstName && <div className="form_element red">{errors?.firstName?.message}</div>}*/}
                {errors.phoneNumber && <div className="form_element red">Номер телефона обязателен!</div>}
                <div className="form_element half self_aligned">
                  <div className="mfv_checker"><label className="ch_block">
                    <input className="mfv_checker_input" type="checkbox" name="согласие на обработку данных"/>
                    <div className="ch_block_icon"/>
                    <span className="mfv_checker_text">Я согласен на обработку персональных данных и c  <Link
                      to='/policy'>политикой конфиденциальности</Link></span></label>
                  </div>
                </div>
                <div className="form_element half">
                  <button className="main_btn wide" type="submit">
                    <div className="main_btn_inner">ОТПРАВИТЬ</div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}