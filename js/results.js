//Traemos el resultado parseado y lo pintamos en el DOM de results.html
let datostraidos = JSON.parse(localStorage.getItem("email"));
document.getElementById("resultados").innerHTML = `Has acertado: <span id="span">${datostraidos[0].Puntuacion}</span>`;


//------------Actualizar datos firebase----------------------//

const firebaseConfig = {
  apiKey: "AIzaSyCtrwnz2oq0OR-CgpNNXntnUoES7LcZ7GQ",
  authDomain: "quiz2-28eff.firebaseapp.com",
  projectId: "quiz2-28eff",
  storageBucket: "quiz2-28eff.appspot.com",
  messagingSenderId: "957618801231",
  appId: "1:957618801231:web:47bbe716a3abb9ab45b83a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();// db representa mi BBDD
const createUser = (user) => {
db.collection("score")
  .add(user)
  .then((docRef) => console.log("Document written with ID: ", docRef.id))
  .catch((error) => console.error("Error adding document: ", error));
};
const ref = db.collection('score').doc();
ref.set({"email": datostraidos[0].email,
  "fecha": datostraidos[0].Fecha,
  "Puntuacion": datostraidos[0].Puntuacion});