//Traemos el resultado parseado y lo pintamos en el DOM de results.html
let datostraidos = JSON.parse(localStorage.getItem("usuario"));
document.getElementById("resultados").innerHTML = `Has acertado: ${datostraidos[0].puntuacion}`;


//---------------Intento de almacenar puntuacion--------------------//
const aciertos = (puntuacion) => {
    firebase
      .auth()
      .createUserWithScore(puntuacion)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`se ha registrado ${user.datostraidos[0].puntuacion} ID:${user.uid}`)
        // ...
        // Guarda El usuario en Firestore
        createUser({
          id:user.uid,
          puntuacion: user.datostraidos[0].puntuacion
        });
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error en el sistema"+errorMessage);
      });
  };