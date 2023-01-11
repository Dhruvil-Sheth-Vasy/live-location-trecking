/* global google */

import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off, endAt } from "firebase/database";
import { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";

import { useDispatch, useSelector } from "react-redux";

import { posActions } from "../store/pos-slice";
import swal from "sweetalert";

const iconBase =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  const url = 'https://test-d3262-default-rtdb.firebaseio.com'

export default function Map(props) {
  const dispatch = useDispatch();
  
  const pos = useSelector((state) => state.pos.position);
  const center = useMemo(() => pos[0], []);

  
  const [data, setData] = useState(true);
  const [endInfo, setEndInfo] = useState(false);
  const [startInfo, setStartInfo] = useState(false);
  const [lat, setLat]=useState()
  
  const startDate = useSelector((state) => state.pos.date);
  const user = useSelector((state) => state.pos.user);
  const marker = useSelector((state)=> state.pos.marker)


  useEffect(()=> {
    const getData = async()=> {
      const res = await fetch(`${url}/${user}/${startDate}/.json` )
      const data = await res.json()
      console.log(data)
      
      if (!data) {
        // throw new Error('Oops, User data is not availabel')
        setData(false);
        // swal("Oops!", "Something went wrong!", "error");
      } else {
        setData(true);
        setLat(data)
      }

      let a = [];

      for (const key in data) {
        // console.log(data[key].)
        a.push({
          id: key,
          lat: data[key].location.latitude,
          lng: data[key].location.longitude,
        });
      }
      dispatch(posActions.position(a));
      // const a = data.shift()
      // array =  
      // console.log(array)
    }
    getData()

  },[user, startDate])

  useEffect(() => {
    // const onChange =()=> {

    // const db = getDatabase();
    // const starCountRef = ref(db, `${user}/${startDate}/`);
    return onValue(ref(getDatabase(), `${user}/${startDate}/`), (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (!data) {
        // throw new Error('Oops, User data is not availabel')
        // swal("Oops!", "Something went wrong!", "error");
        setData(false);
      } else {
        setData(true);
      }

      let b = [];

      for (const key in data) {
        // console.log(data[key].)
        b.push({
          id: key,
          lat: data[key].location.latitude,
          lng: data[key].location.longitude,
        });
      }
      
      dispatch(posActions.marker(b[b.length-1]))
    });
    // }
    // onChange()
  }, [startDate, user]);

  const lineSymbol = {
    path : iconBase + "parking_lot_maps.png",
    scale : 8 ,
    strokeColor : "#393"
  }


  const icons = 
    {
      icon: lineSymbol,
      offset: "00%",
    }

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
    // icons: [
    //   {
    //     icon: lineSymbol,
    //     offset: "00%",
    //   },
    // ],
  };

  const end = () => {
    setEndInfo((current) => !current);
  };

  const start = () => {
    setStartInfo((current) => !current);
  };
  const endSvgMarker = {
    path: iconBase + "parking_lot_maps.png" ,
    fillColor: "blue",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };
// console.log(pos[0])

  const route = () => {
    return (
      <React.Fragment>
        <div>
          {/* <Marker key={pos.id} position={pos[0]} id={pos.id}></Marker> */}
          <Marker
            // key={pos.id}
            position={marker}
            // id={pos.id}
            onMouseOver={end}
            onMouseOut={end}
            label='E'
            // icon={endSvgMarker}
            // animation = { google.maps.Animation.DROP }
            
          >
            {endInfo && (
              <InfoWindow
                position={marker}
                onCloseClick={() => setEndInfo((current) => !current)}
              >
                <span>
                  <strong>{user}</strong> is here.
                </span>
              </InfoWindow>
            )}
          </Marker>
          <Marker
            key={pos.id}
            position={pos[0]}
            // id={pos.id}
            onMouseOver={start}
            onMouseOut={start}
            icon={svgMarker}
            // label='s'
          >
            {startInfo && (
              <InfoWindow
                position={pos[0]}
                onCloseClick={() => setStartInfo((current) => !current)}
              >
                <span>
                  <strong>{user}</strong> has started his/her journey from here.
                </span>
              </InfoWindow>
            )}
          </Marker>
          {/* <MapDirection data={pos} travelMode={google.maps.TravelMode.DRIVING} /> */}
          <Polyline path={pos} options={options} />
        </div>
      </React.Fragment>
    );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  // console.log(isLoaded);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
      {data && route()}
    </GoogleMap>
  );
}
