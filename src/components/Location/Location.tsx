import React from 'react'
import {YMaps, Map, Placemark, ZoomControl} from 'react-yandex-maps'
import myIcon from '../../assets/images/map_logo.png'
import './Location.scss'

const Location: React.FC = () => {
  //TODO: проставить типы
  const mapState: any = {
    center: [44.550921, 33.957080],
    zoom: 18,
    mapAutoFocus: false,
    controls: ['zoomControl'],
    disable: 'scrollZoom',
    behaviors: ["disable('scrollZoom')"]
  };

  const placeMarkState: any = {
    geometry: [44.550896, 33.957255],
    options: {
      iconLayout: 'default#image',
      iconImageHref: myIcon,
      iconImageSize: [32, 32],
      iconImageOffset: [-16, -16],
    },
  }

  return (
    <div className="Location" id="Location">
      <YMaps query={{ load: 'control.ZoomControl' }}>
        <div className="text">
          <h2>Локация</h2>
          <p>Крым, Бахчисарайский район,<br />
            с. Соколиное, ул. Ленина, д. 6</p>
        </div>
        <Map
          width="100%"
          height="100%"
          state={mapState}
        >
          <ZoomControl/>
          <Placemark {...placeMarkState}/>
        </Map>
      </YMaps>
    </div>
  )
}

export default Location
