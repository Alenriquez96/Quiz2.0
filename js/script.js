window.onload = RequestApi
//Empezamos con el fetch

async function RequestApi() {
    let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
    let data = await response.json()
    console.log(data);
    UsarApi(data)
}



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




//GRÁFICA

let grafica = {
    labels: [0,1,2,3,4,5],
    series: [
      [5, 2, 4, 2, 0]
    ]
  };
  new Chartist.Line('.ct-chart', grafica);