window.onload = RequestApi
//Empezamos con el fetch

async function RequestApi() {
    let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
    let data = await response.json()
    console.log(data);
    UsarApi(data)
}
//Generamos un numero aleatorio
// function generarnumero(){
// let numero = Math.floor((Math.random() * 3));
// if (numero=0){
//     a=0;
//     b=1;
//     c=2;
//     d=3
// }
// else if (numero=1){
//     a=1;
//     b=2;
//     c=3;
//     d=0  
// }
// else if (numero=2){
//     a=2;
//     b=1;
//     c=3;
//     d=0  
// }
// else if (numero=3){
//     a=3;
//     b=1;
//     c=0;
//     d=2 ;
// }
// }
// generarnumero()
//Metemos lo que va hacer la funcion
let respuestascorrectas=0
let numeropreguntas=0 

function UsarApi(data) {
    let lista=[0,1,2,3];
    lista=lista.sort(function(){return Math.random()-0.5});
    console.log(lista);
    document.querySelector("#question").innerHTML = `Pregunta: ${data.results[0].question}`
    let button=document.querySelector(`#answer${lista[0]}`);
    button.innerHTML = data.results[0].correct_answer
    button.respuesta=1;
    button=document.querySelector(`#answer${lista[1]}`);

    button.innerHTML = data.results[0].incorrect_answers[0];
    button.respuesta=0
    button=document.querySelector(`#answer${lista[2]}`);

    button.innerHTML = data.results[0].incorrect_answers[1]
    button.respuesta=0

    button=document.querySelector(`#answer${lista[3]}`);
    
    button.innerHTML = data.results[0].incorrect_answers[2]
    button.respuesta=0
}
//Que pasa cuando toca el boton correcto?
let Correcto = document.querySelectorAll("button");
for(let i=0;i<Correcto.length;i++){
    Correcto[i].onclick=respuestasclick; 
    console.log(Correcto[i]); 
}
//console.log(Correcto);
//Correcto.onclick=respuestasclick;
    


function respuestasclick(){
    if(this.respuesta==1){
     respuestascorrectas++
    }
    numeropreguntas++
    if(numeropreguntas<10){
     RequestApi()
    }
    else MostrarResultado()
}
function MostrarResultado(){
alert("total aciertos="+respuestascorrectas)
}
// let a = []
// let b = []
// let c = []
// let d = []

// function generarnumero() {
//     let numero = Math.floor((Math.random() * 3));
//     if (numero == 0) {
//         return [a = 0, b = 1, c = 2, d = 3]
//     }
//     else if (numero == 1) {
//         return [a = 1, b = 0, c = 2, d = 3]
//     }
//     else if (numero == 2) {
//         return [a = 3, b = 1, c = 2, d = 0]
//     }
//     else {
//         return [a = 2, b = 2, c = 1, d = 3]
//     }
// }
// generarnumero()
// console.log(a)

//     }
//     generarnumero()
//     console.log(a)