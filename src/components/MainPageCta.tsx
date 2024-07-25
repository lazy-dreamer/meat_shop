import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {CtaSection} from "../pages/MainPage";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Fancybox} from "@fancyapps/ui";

interface IMainPageCta {
  sectionInfo: CtaSection;
}

interface IFormFields {
  firstName: string;
  phoneNumber: string;
  agree: boolean;
}

export const MainPageCta: React.FC<IMainPageCta> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<CtaSection | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IFormFields>({});
  
  
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>;
  }
  
  let {sectionName, sectionTitle, sectionSubTitle, screenForm} = sectionData;
  
  const ctaSubmit = (data: IFormFields) => {
    const modal = '<div><div class="cta_modal"><div class="simple_text"><h2>Modal info:</h2><p>First name : ' + data.firstName + '</p><p>Phone number : ' + data.phoneNumber + '</p></div></div></div>';
    Fancybox.show(
      [
        {
          src: modal,
          type: "html",
        }
      ],
      {
        on: {
          close: () => {
            reset()
          }
        }
      }
    )
  }
  const phoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
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
                      minLength: 3
                    }
                  )} className={errors.firstName && 'error'} placeholder='ВАШЕ ИМЯ'/>
                </div>
                <div className="form_element half">
                  <input type='number' {...register('phoneNumber', {
                    required: true,
                    minLength: 10,
                    maxLength: 12,
                  })} className={errors.phoneNumber && 'error'} onKeyDown={phoneKeyPress} placeholder='НОМЕР ТЕЛЕФОНА'/>
                </div>
                <div className="form_element half self_aligned">
                  <div className={errors.agree ? 'error mfv_checker' : 'mfv_checker'}>
                    <label className="ch_block">
                      <input className={errors.agree ? 'error ' : ''}
                             type="checkbox" {...register('agree', {required: true}
                      )} />
                      <div className="ch_block_icon"/>
                      <span className="mfv_checker_text">Я согласен на обработку персональных данных и c  <Link
                        to='/policy'>политикой конфиденциальности</Link></span>
                    </label>
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