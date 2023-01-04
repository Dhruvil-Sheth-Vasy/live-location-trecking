/* global google */

import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

import { useDispatch, useSelector } from "react-redux";

import { posActions } from "../store/pos-slice";

export default function Map(props) {
  const dispatch = useDispatch();
  const pos = useSelector((state) => state.pos.pos);

  // console.log(pos);
  const center = useMemo(() => pos[0], []);

  const [data, setData] = useState(true);

  const startDate = useSelector((state) => state.pos.date);
  const user = useSelector((state) => state.pos.user);
  // console.log(startDate, user);

  useEffect(() => {
    // const onChange =()=> {

    // const db = getDatabase();
    // const starCountRef = ref(db, `${user}/${startDate}/`);
    return onValue(ref(getDatabase(), `${user}/${startDate}/`), (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (!data) {
        // throw new Error('Oops, User data is not availabel')
        setData(false);
      } else {
        setData(true);
      }

      let a = [];

      for (const key in data) {
        a.push({
          id: key,
          lat: data[key].location.latitude,
          lng: data[key].location.longitude,
        });
      }
      // console.log(a);
      dispatch(posActions.position(a));
    });
    // }
    // onChange()
  }, [startDate, user]);

  // const lineSymbol = {
  //   path : google.maps.SymbolPath.CIRCLE,
  //   scale : 8 ,
  //   strokeColor : "#393"
  // }

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

  const route = () => {
    return (
      <React.Fragment>
        <div>
          {/* <Marker key={pos.id} position={pos[0]} id={pos.id}></Marker> */}
          <Marker
            key={pos.id}
            position={pos[pos.length - 1]}
            id={pos.id}
          ></Marker>
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
      {route()}
    </GoogleMap>
  );
}
