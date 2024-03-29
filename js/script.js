//Este es nuestro contador de respuestas correctas:
let respuestasCorrectas=0;
//numero que iremos aumentando
let numero = 0;
//Esta lista nos sirve para cambiar el orden de las respuestas de forma que no esté la correcta siempre en la misma posición:
let lista = [1,3,2,0];
lista=lista.sort(function(){return Math.random()-0.5});        
//Traemos los datos del localstorage
let datostraidos = JSON.parse(localStorage.getItem("email"));

async function generarPreguntas() {
    let f = await fetch ("https://opentdb.com/api.php?amount=10&type=multiple")
    let data = await f.json()
    return data
}
//Llamamos a la función asíncrona:
generarPreguntas().then(function(data) {
    let results = data.results;
    
    //Mapeamos los titulos de las preguntas para después pintarlas en el DOM:
    let preguntas = results.map(title=>title.question);

  
    //Hacemos una función que pinte los títulos y le pasamos por parámetro un número que vaya subiendo a través del addeventlistener:
    function escogerPreguntas(incremento) {
        let h2 = document.getElementById("h2")
        h2.innerHTML = preguntas[incremento]; 
    }
    escogerPreguntas(numero);
    
    //Hacemos una función que pinte las respuestas, y a través de templates le pasamos la lista desordenada, además le pasamos un value:
    function escogerRespuestas(incorrecta,correcta) {
        let label0 = document.getElementById(`label${lista[0]}`)
        label0.innerHTML = incorrecta[0];
        label0.value = incorrecta[0];
        
        let label1 = document.getElementById(`label${lista[1]}`)
        label1.innerHTML = incorrecta[1];
        label1.value = incorrecta[1];

        let label2 = document.getElementById(`label${lista[2]}`)
        label2.innerHTML = incorrecta[2];
        label2.value = incorrecta[2];

        let label3 = document.getElementById(`label${lista[3]}`)
        label3.innerHTML = correcta;
        label3.value = correcta;
    }
    escogerRespuestas(results[numero].incorrect_answers, results[numero].correct_answer);

    //Estas funciones sirven para checkear la correcta y que el contador sume:
    let botones = document.querySelectorAll("button");
    for(let i=0;i<botones.length;i++){
        botones[i].onclick = respuestasclick; 
    }
    function respuestasclick(){
        for (let i = 0; i < results.length; i++) {
            if(this.value == results[i].correct_answer){
            respuestasCorrectas++;
            }                 
        }
    }


    //Nuestro addeventlistener que tendrá dentro: el número para que suba con cada click y las llamadas a las funciones:
    document.getElementById("form1").addEventListener("click", function suma(e){
        e.preventDefault();
        numero+=1;

        //Este if hace que cuando lleguemos a la pregunta 9 me redirija a la página results.html
        if (numero>9) {             
            setTimeout( function() { window.location.href = "results.html"; }, 0 );
            datostraidos[0].Puntuacion=respuestasCorrectas;
            localStorage.setItem("email",JSON.stringify(datostraidos));
        }
        
        escogerPreguntas(numero);
        escogerRespuestas(results[numero].incorrect_answers,results[numero].correct_answer);
        lista=lista.sort(function(){return Math.random()-0.5});
    });
})