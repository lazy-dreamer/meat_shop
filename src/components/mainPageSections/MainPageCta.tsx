import React, {useEffect, useState} from "react";
import {Preloader} from "../Preloader";

export function MainPageCta(sectionInfo) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, sectionTitle, sectionSubTitle, screenForm} = sectionData;
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <section className="section-cta remove_pt remove_pb" data-title={sectionName}>
      <div className="bg_noise"></div>
      <div className="screen_content">
        <div className="cta_sides">
          <div className="cta_side content_side">
            <div className="simple_text">
              <h2>{sectionTitle}</h2>
              <p>{sectionSubTitle}</p>
            </div>
          </div>
          <div className="cta_side form_side">
            <form className="form_send" action="mail.php" method="post"><input type="hidden" name="project_name" value=""/><input type="hidden" name="form_subject" value=""/>
              <div className="form_heading simple_text">
                <h5>{screenForm.formTitle}</h5>
                <p>{screenForm.formSubTitle}</p>
              </div>
              <div className="form_elements">
                {
                  screenForm.formFields.map((formField, index) => <div key={index} className="form_element half"><input type={formField.fieldType} placeholder={formField.fieldPlaceholder} name={formField.fieldName}/></div>)
                }
                <div className="form_element half self_aligned">
                  <div className="mfv_checker"><label className="ch_block"><input className="mfv_checker_input" type="checkbox" name="согласие на обработку данных"/>
                    <div className="ch_block_icon"></div>
                    <span className="mfv_checker_text">Я согласен на обработку персональных данных и c  <a href="#">политикой конфиденциальности</a></span></label>
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