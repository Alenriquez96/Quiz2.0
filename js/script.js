window.onload=RequestApi
//Empezamos con el fetch
async function RequestApi(){
    let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
    let data=await response.json()
    console.log(data);
    UsarApi(data)
}  
//Generamos un numero aleatorio
// function generarnumero(){
// let numero = Math.floor((Math.random() * 3));
// if (numero=0){
//     let a=0;
//     let b=1;
//     let c=2;
//     let d=3
// }
// else if (numero=1){
//     let a=1;
//     let b=2;
//     let c=3;
//     let d=0  
// }
// else if (numero=2){
//     let a=2;
//     let b=1;
//     let c=3;
//     let d=0  
// }
// else if (numero=3){
//     let a=3;
//     let b=1;
//     let c=0;
//     let d=2 ;
// }
// }
// generarnumero()
//Metemos lo que va hacer la funcion
function UsarApi(data){
    document.querySelector("#question").innerHTML=`Pregunta: ${data.results[0].question}`
    document.querySelector(`#answer0`).innerHTML=data.results[0].correct_answer
    document.querySelector("#answer1").innerHTML=data.results[0].incorrect_answers[0]
    document.querySelector("#answer2").innerHTML=data.results[0].incorrect_answers[1]
    document.querySelector("#answer3").innerHTML=data.results[0].incorrect_answers[2]
}
//Que pasa cuando toca el boton correcto?
let Correcto = document.querySelector("button");
Correcto.addEventListener("click",function(n){
RequestApi()
})
let a=[]
let b=[]
let c=[]
let d=[]

 function generarnumero(){
     let numero = Math.floor((Math.random() * 3));
     if (numero==0){
         return [a=0,b=1,c=2,d=3]
     }
     else if (numero==1){
        return [a=1,b=0,c=2,d=3]
     }
     else if (numero==2){
         return [a=3,b=1,c=2,d=0]
     }
     else {
        return [a=2,b=2,c=1,d=3]
     }
    }
     generarnumero()
     console.log(a)
       
//     }
//     generarnumero()
//     console.log(a)