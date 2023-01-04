const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
// import { getDatabase, ref, set, child, get } from "firebase/database";


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBa3Y-tWkKoNBHsdfPp-_29s_cM7HGOgNY",
//   authDomain: "ems-project1.firebaseapp.com",
//   databaseURL: "https://ems-project1-default-rtdb.firebaseio.com",
//   projectId: "ems-project1",
//   storageBucket: "ems-project1.appspot.com",
//   messagingSenderId: "645888809000",
//   appId: "1:645888809000:web:06d3a6953f96e0308afd1d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// exports const onUpdate = functions.database
// .ref(`/{id}`)
// .onUpdate((change,context ) => {

//     const after = change.after.val()
//     const before = change.before.val()
//     if (before.lat === after.lat) {
//         console.log('text did not change.')
//         return null
//     }
//     const text = 'dhruvil'
//     const timeEdited = Date.now()
//     return change.after.ref.update({text})
// })


