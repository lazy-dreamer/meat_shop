import React, {useEffect, useRef, useState} from "react";
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

export const ContactsSection: React.FC<IContacts> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<IContactSection | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  const isMounted = useRef(true);
  
  useEffect(() => {
    isMounted.current = true;
    
    if (isMounted.current) {
      setSectionData(sectionInfo);
      setSpinner(false);
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [sectionInfo]);
  
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let {sectionName, sectionTitle, sectionSubTitle, textLines, map} = sectionData;
  
  return (
    <section className="section-contacts" data-title={sectionName}>
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
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}>
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