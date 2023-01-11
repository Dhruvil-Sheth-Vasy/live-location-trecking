/* global google */

import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
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

const iconBase =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
const emp = ["default", 1, 2];

export default function MultipleUser(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const dispatch = useDispatch();
  const pos = useSelector((state) => state.pos.pos);

  // console.log(pos);
  const center = useMemo(() => pos[0], []);

  const [data, setData] = useState(false);
  const [endInfo, setEndInfo] = useState(false);
  const [startInfo, setStartInfo] = useState(false);
  const [iD, setID] = useState();

  const startDate = useSelector((state) => state.pos.date);
  const us = useSelector((state) => state.pos.user);
  const user = us === "all" ? emp : [us];
  // console.log(user);
  let a = [];

  function getDarkColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }
  
  useEffect(() => {
    // const onChange =()=> {

    // const db = getDatabase();
    // const starCountRef = ref(db, user.length > 1 ? `/` : `${us}/${startDate}/`);
    return onValue(
      ref(getDatabase(), user.length > 1 ? `/` : `${us}/${startDate}/`),
      (snapshot) => {
        const coord = snapshot.val();

        if (!coord) {
          setData(false);
          // throw new Error('Oops, User data is not availabel')
        } else {
          setData(true);
        }
        if (user.length === 1 && coord) {
          a = [];
          // let interim = data[user][startDate];
          for (const key in coord) {
            // console.log(key);
            a.push({
              id: key,
              lat: +coord[key].location.latitude.toFixed(4),
              lng: +coord[key].location.longitude.toFixed(4),
            });
          }
          // console.log(a);
          dispatch(posActions.position(a));
        } else {
          coord && dispatch(posActions.position(coord));
        }
      }
    );
  }, [startDate, us]);

  const lineSymbol = {
    path: iconBase + "parking_lot_maps.png",
    // scale : 8 ,
    // strokeColor : "#393"
  };

  const icons = {
    icon: image,
    offset: "100%",
  };

  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "RED",
    fillOpacity: 0.8,
    strokeWeight: 1,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  const options = {
    strokeColor: "blue",
    strokeOpacity: 0.8,
    strokeWeight: 6,
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
    //     icon: image,
    //     offset: "100%",
    //   },
    // ],
  };

  const end = (event) => {
    setEndInfo((current) => !current);
    setID(event);
    console.log(event);
  };

  const start = (event) => {
    setStartInfo((current) => !current);
    setID(event);
  };

  // console.log(isLoaded);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
      {
        data &&
          user.map((e) => {
            const checkMultiUser = pos[e] && pos[e][startDate];

            if (checkMultiUser) {
              a = [];

              let interimData = pos[e][startDate];
              for (const key in interimData) {
                a.push({
                  id: key,
                  lat: +interimData[key].location.latitude,
                  lng: +interimData[key].location.longitude,
                });
              }
            } else if (user.length === 1 && data && pos.length > 1) {
              a = pos;
            }

            return (
              <React.Fragment>
                <div>
                  {/* <Marker key={a.id} aition={a[0]} id={a.id}></Marker> */}
                  <Marker
                    // key={user.length === 1 ? a[0].id : a[0].id}
                    position={a[a.length - 1]}
                    id={e}
                    onClick={() => end(e)}
                    // onMouseOut={end}
                    label={"E " + e}
                    value={e}
                    // animation = { google.maps.Animation.DROP }
                  >
                    {endInfo && e === iD && (
                      <InfoWindow
                        position={a[a.length - 1]}
                        onCloseClick={() => setEndInfo((current) => !current)}
                      >
                        <span>
                          <strong>{e}</strong> is here.
                        </span>
                      </InfoWindow>
                    )}
                  </Marker>
                  <Marker
                    // key={a.id}
                    // key={user.length === 1 ? a[3].id : a[3].id}
                    position={a[0]}
                    id={e}
                    onClick={() => start(e)}
                    // onMouseOut={start}
                    icon={svgMarker}
                    // label='s'
                  >
                    {startInfo && e === iD && (
                      <InfoWindow
                        position={a[0]}
                        onCloseClick={() => setStartInfo((current) => !current)}
                      >
                        <span>
                          <strong>{e}</strong> has started his/her journey from
                          here.
                        </span>
                      </InfoWindow>
                    )}
                  </Marker>
                  {/* <MapDirection data={pos} travelMode={google.maps.TravelMode.DRIVING} /> */}
                  <Polyline path={a} options={options} />
                </div>
              </React.Fragment>
            );
          })
        // }})
      }
    </GoogleMap>
  );
}
