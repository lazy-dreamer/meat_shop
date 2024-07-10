import React, {useEffect, useState} from "react";
import {Preloader} from "../Preloader";
import {Link} from "react-router-dom";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


const stylers = [{
  "featureType": "administrative",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#444444"
  }]
}, {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "color": "#f2f2f2"
  }]
}, {
  "featureType": "landscape.natural.landcover",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry.fill",
  "stylers": [{
    "saturation": "-100"
  }, {
    "lightness": "57"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry.stroke",
  "stylers": [{
    "lightness": "1"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.attraction",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.attraction",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.business",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.government",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.medical",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.place_of_worship",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road",
  "elementType": "all",
  "stylers": [{
    "saturation": -100
  }, {
    "lightness": 45
  }]
}, {
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [{
    "visibility": "simplified"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.text.fill",
  "stylers": [{
    "visibility": "off"
  }, {
    "color": "#484848"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit.station.airport",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "labels.text.fill",
  "stylers": [{
    "saturation": "0"
  }, {
    "lightness": "0"
  }, {
    "gamma": "1.00"
  }, {
    "weight": "1"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "labels.icon",
  "stylers": [{
    "saturation": "-100"
  }, {
    "weight": "1"
  }, {
    "lightness": "0"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "geometry.fill",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "labels.text.fill",
  "stylers": [{
    "gamma": "1"
  }, {
    "lightness": "40"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "labels.icon",
  "stylers": [{
    "saturation": "-100"
  }, {
    "lightness": "30"
  }]
}, {
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
    "color": "#d2d2d2"
  }, {
    "visibility": "on"
  }]
}];

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 32.05994749209159, lng: 34.833281721141695 }}
    defaultOptions={{ styles: stylers}}
  >
    <Marker
      position={{ lat: 32.05994749209159, lng: 34.833281721141695 }}
      icon={'img/map_pin.svg'}
      title={'Map location'}
    />
  </GoogleMap>
));

export function ContactsSection(sectionInfo) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo);
    setSpinner(false);
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, sectionTitle, sectionSubTitle, textLines, links, map} = sectionData;
  
  // console.log(sectionData)
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <section className="section-contacts" data-title={sectionName}>
      <div className="section_bg lighter_bg">
        <div className="bg_noise"></div>
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
                  textLines.map((line, index) => <p key={index}>{line}</p>)
                }
              </div>
            </div>
          </div>
          <div className="contacts_side map_side">
            {/*<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7LVCyW7d9OQl4xjsr_j6fPHvGiTV6ZDI&amp;;libraries=places"></script>*/}
            {/*<div className="map" id="map" data-latitude="32.05994749209159" data-longitude="34.833281721141695"></div>*/}
            {/*<GoogleMap defaultZoom={16} defaultCenter={{ lat: 32.05994749209159, lng: 34.833281721141695 }} >*/}
            {/*  {true && <Marker position={{ lat: -34.397, lng: 150.644 }} />}*/}
            {/*</GoogleMap>*/}
            

            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzK55kcXPWl0uve6n5n4zhcElQvwtk7lo&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div id="map" style={{ height: `100%` }} />}
              mapElement={<div  style={{ height: `100%` }} />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}