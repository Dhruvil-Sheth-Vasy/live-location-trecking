// /* global google */

// import React, { useState, useEffect } from "react";
// import { DirectionsRenderer } from "@react-google-maps/api";
// import { useSelector } from "react-redux";

// const data = [
//   { lat: 25.8103146, lng: -80.1751609 },
//   { lat: 27.9947147, lng: -82.5943645 },
//   { lat: 28.4813018, lng: -81.4387899 },
// ];

// function MapDirection(props) {
//   const [directions, setDirections] = useState(null);
//   const [error, setError] = useState(null);

//   const place = useSelector((state) => state.pos.pos);

//   const places = place.length >= 2 ? place : data;

//   useEffect(() => {
//     //   const { places, travelMode } = props;

//     const travelMode = props.travelMode;

//     const waypoints = places.map((p) => ({
//       location: { lat: p.lat, lng: p.lng },
//       stopover: true,
//     }));
//     const origin = waypoints.shift().location;
//     const destination = waypoints.pop().location;

//     const directionsService = new google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: travelMode,
//         waypoints: waypoints,
//       },
//       (result, status) => {
//         console.log(result,'ddddd', status);
//         if (status === google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//           console.log(directions, 'doirrrrr')
//         } else {
//           setError(result);
//           console.log(result,'eeeeeeeee')
//         }
//       }
//     );
//   }, [places]);

//   if (error) {
//     console.log(error,'errrr')
//     return <h1>{error}</h1>;
//   }
//   return directions && <DirectionsRenderer directions={directions} />;
// }

// export default MapDirection;
