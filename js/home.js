       //----------------------FIREBASE AUTH GOOGLE-------------------------//

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
    db.collection("users")
        .add(user)
        .then((docRef) => console.log("Document written with ID: ", docRef.id))
        .catch((error) => console.error("Error adding document: ", error));
    };


    //PASOS PARA QUE SALGA EL LOG CON GOOGLE
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().languageCode = 'es';

    async function login (){
        try{
            const response = await firebase.auth().signInWithPopup(provider);
            console.log(response);
            return response.user;
        }catch(error){
            throw new Error(error);
        }
    }


    //LOGUEARSE CON GOOGLE
    const buttonLogin = document.getElementById("google");
    if(buttonLogin != null){
        buttonLogin.addEventListener("click", async ()=>{
            try{
                await login();
                document.getElementById("divGoogle").style.display= "none";
                document.getElementById("comenzar").style.display = "flex";
                document.getElementById("comenzar").style.justifyContent = "center";

            } catch(error) {}
        });
    }
    

   //----------------------FIREBASE AUTH EMAIL+PASS-------------------------//


   const signUpUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`se ha registrado ${user.email} ID:${user.uid}`)
        alert(`se ha registrado ${user.email} ID:${user.uid}`)
        // ...
        // Guarda El usuario en Firestore
        createUser({
          id:user.uid,
          email:user.email
        });
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error en el sistema"+errorMessage);
      });
  };
  //"alex@demo.com","123456"
  document.getElementById("form1").addEventListener("submit",function(event){
      event.preventDefault();
      let email = event.target.elements.email.value;
      let pass = event.target.elements.pass.value;
      let pass2 = event.target.elements.pass2.value;
      function check(emailtxt,passtxt){
        let reEmail = /[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/
        let rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if(reEmail.test(emailtxt) === true && rePass.test(passtxt) === true && pass===pass2){
          signUpUser(email,pass)
        } else if(reEmail.test(emailtxt) === false){
          alert("Email no válido")
        } else if(pass != pass2){
          alert("Las contraseñas no coinciden")
        } else if(rePass.test(passtxt) === false){
          alert("la contraseña es demasiado débil")
        }
      }
      check(email,pass);
      //<---código de validación de email y contraseñas--->//

  })

//LOGUEARSE
  const signInUser = (email,password) =>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`se ha logado ${user.email} ID:${user.uid}`)
        alert(`se ha logado ${user.email} ID:${user.uid}`)
        console.log(user);
        document.getElementById("comenzar").style.display = "flex";
        document.getElementById("comenzar").style.justifyContent = "center"; 
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
}

document.getElementById("form2").addEventListener("submit",function(event){
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email,pass)
})

//DESLOGUEARSE
const signOut = () => {
  let user = firebase.auth().currentUser;
  firebase.auth().signOut().then(() => {
      console.log("Sale del sistema: "+user.email)
    }).catch((error) => {
      console.log("hubo un error: "+error);
    });
}
document.getElementById("salir").addEventListener("click", signOut);


// // Listener de usuario en el ssitema
//   // Controlar usuario logado
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       console.log(`Está en el sistema:${user.email} ${user.uid}`);
//     } else {
//       console.log("no hay usuarios en el sistema");
//     }
//   });
