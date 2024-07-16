import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {Link} from "react-router-dom";
import {stylers} from '../services/map_styler'
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import {IContactSection} from "../pages/Contacts";


const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 32.05994749209159, lng: 34.833281721141695
};

interface IContacts {
  sectionInfo: IContactSection
}

export const ContactsSection: React.FC<IContacts> = (sectionInfo) => {
  const [sectionData, setSectionData] = useState<IContactSection>({
    sectionName: '',
    sectionTitle: '',
    sectionSubTitle: '',
    textLines: [],
    links: [
      {name: '', url: ''}
    ],
    map: {
      center: ['', ''],
      pin: ''
    }
  });
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo);
    setSpinner(false);
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, sectionTitle, sectionSubTitle, textLines, map} = sectionData;
  
  return (
    spinner ? <Preloader customClass={spinnerClass}/> : <section className="section-contacts" data-title={sectionName}>
      <div className="section_bg lighter_bg">
        <div className="bg_noise"/>
      </div>
      <div className="screen_content">
        <ul className="breadcrumbs_list negative_top with_offset">
          <li><Link to="/">Главная</Link></li>
          <li><span>Контакты</span></li>
        </ul>
        <div className="contacts_sides">
          <div className="contacts_side content_side">
            <div className="main_title_wrapper small_offset">
              <div className="main_title">{sectionTitle}</div>
            </div>
            <div className="contacts_info_frame">
              <div className="simple_text">
                <p>{sectionSubTitle}</p>
              </div>
              <div className="contacts_info">
                {
                  textLines.map((line: string, index: number) => <p key={index}>{line}</p>)
                }
              </div>
            </div>
          </div>
          <div className="contacts_side map_side">
            <LoadScript googleMapsApiKey="AIzaSyDzK55kcXPWl0uve6n5n4zhcElQvwtk7lo">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                options={{
                  styles: stylers
                }}
                zoom={10}
              >
                <Marker position={center} icon={map.pin}/>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  )
}