//Obtenemos la Fecha y la hora, y la guardamos en un JSON para meterlas en localStorage.
let date = new Date();
let save = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()+" a las "+date.getHours() + ":" + date.getMinutes();

let datostraidos = JSON.parse(localStorage.getItem("email"));


     //----------------------FIREBASE INITIALIZE-------------------------//

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


         //----------------------FIREBASE AUTH CON GOOGLE-------------------------//

    //PASOS PARA QUE SALGA EL LOG CON GOOGLE
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().languageCode = 'es';

    async function login (){
        try{
            const response = await firebase.auth().signInWithPopup(provider);
            console.log(response);
            console.log(response.additionalUserInfo);
            let emailAuth = response.additionalUserInfo.profile.email;
            let correo =[
              {
                "email": emailAuth,
                "Fecha": save
              }
            ];
      
            localStorage.setItem("email", JSON.stringify(correo));

            document.getElementById("logout").style.display = "flex";
            document.getElementById("logout").style.justifyContent = "center";
            document.getElementById("logout").style.flexDirection = "column";
            document.getElementById("logout").style.alignItems = "center";
            document.getElementById("form1").style.display = "none"
            document.getElementById("form2").style.display = "none"

//--------------------------------PRIMERA gRÁFICA: ULTIMAS PARTIDAS JUGADAS------------------------------------//

            let puntuaciones = [];
            let fechas = [];
            async function recuperarDatos() {
              await db.collection("score")
                .where("email", "==", datostraidos[0].email)
                .limit(5)
          
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    puntuaciones.push(doc.data().Puntuacion);
                    fechas.push(doc.data().fecha);
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            }
            recuperarDatos().then(() => {
              crearGrafico(puntuaciones, fechas)
            });
          
            function crearGrafico(puntuaciones, fechas){
              new Chartist.Bar(
                ".ct-chart",
                {
                  labels: fechas,
                  series: [puntuaciones],
                },
                {
                  seriesBarDistance: 10,
                  low: 0,
                  high: 10,
                }
              );            
            }

            //------------------------SEGUNDA GRÁFICA: RANKING DE PARTIDAS----------------------------//
            puntuaciones1=[];
            emails=[];

            async function recuperarDatos2() {
              await db.collection("score")
                .orderBy("Puntuacion","desc")
                .limit(10)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    puntuaciones1.push(doc.data().Puntuacion);
                    emails.push(doc.data().email);
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            }
            recuperarDatos2().then(() => {
              crearGrafico1(puntuaciones1, emails)
            });

            function crearGrafico1(puntuaciones1, emails){
            console.log(puntuaciones1)
              new Chartist.Bar(
                ".ct-chart1",
                {
                  labels: emails,
                  series: [puntuaciones1],
                },
                {
                  seriesBarDistance: 1,
                  low: 0,
                  high: 10,
                }
              );
            }

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

        document.getElementById("form1").style.display = "none";
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
        } else if (pass == 0 || pass2 == 0 || email == 0) {
          alert("No pueden quedar campos vacios");
        }else if(reEmail.test(emailtxt) === false){
          alert("Email no válido. Debe contener un @ y un .")
        } else if(pass != pass2){
          alert("Las contraseñas no coinciden")
        } else if(rePass.test(passtxt) === false){
          alert("la contraseña es demasiado débil. Debe contener un carácter minúsculo, otro mayúsculo, uno alfanumérico y un símbolo especial(*#$%&)")
        }
      }
      check(email,pass);
      //<---código de validación de email y contraseñas--->//
      let correo =[
        {
          "email": document.getElementById("email").value,
          "Fecha": save
        }
      ];

      localStorage.setItem("email", JSON.stringify(correo));
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

        document.getElementById("logout").style.display = "flex";
        document.getElementById("logout").style.justifyContent = "center";
        document.getElementById("logout").style.flexDirection = "column";
        document.getElementById("logout").style.alignItems = "center";

        document.getElementById("divGoogle").style.display = "none";
        document.getElementById("form1").style.display = "none";
        document.getElementById("form2").style.display = "none";


        
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
  signInUser(email,pass);
  let correo =[
    {
      "email": document.getElementById("email2").value,
      "Fecha": save
    }
  ];

  localStorage.setItem("email", JSON.stringify(correo));


  //-----------------------------PRIMERA grÄFICA: ULTIMAS PARTIDAS JUGADAS--------------------------------//
  let puntuaciones = [];
  let fechas = [];
  async function recuperarDatos() {
    await db.collection("score")
      .where("email", "==", datostraidos[0].email)
      .limit(5)

      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          puntuaciones.push(doc.data().Puntuacion);
          fechas.push(doc.data().fecha);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  recuperarDatos().then(() => {
    crearGrafico(puntuaciones, fechas)
  });

  function crearGrafico(puntuaciones, fechas){
    new Chartist.Bar(
      ".ct-chart",
      {
        labels: fechas,
        series: [puntuaciones],
      },
      {
        seriesBarDistance: 10,
        low: 0,
        high: 10,
      }
    );
  }

  //------------------------SEGUNDA GRÁFICA: RANKING DE PARTIDAS----------------------------//
  puntuaciones1=[];
  emails=[];

  async function recuperarDatos2() {
    await db.collection("score")
      .orderBy("Puntuacion","desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          puntuaciones1.push(doc.data().Puntuacion);
          emails.push(doc.data().email);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  recuperarDatos2().then(() => {
    crearGrafico1(puntuaciones1, emails)
  });

  function crearGrafico1(puntuaciones1, emails){
  console.log(puntuaciones1)
    new Chartist.Bar(
      ".ct-chart1",
      {
        labels: emails,
        series: [puntuaciones1],
      },
      {
        seriesBarDistance: 1,
        low: 0,
        high: 10,
      }
    );
  }
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