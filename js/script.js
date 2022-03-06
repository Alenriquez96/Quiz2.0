async function generarPreguntas() {
    let f = await fetch ("https://opentdb.com/api.php?amount=10&type=multiple")
    let data = await f.json()
    return data
}
//Llamamos a la función asíncrona:
generarPreguntas().then(function(data) {
    let results = data.results;
    
    //Mapeamos las correctas para hacer log y que nos diga cuales son:
    let correctas = results.map(x=>x.correct_answer);
    console.log(correctas);

    //Mapeamos los titulos de las preguntas para después pintarlas en el DOM:
    let preguntas = results.map(x=>x.question);
    console.log(preguntas);
  
    //Hacemos una función que pinte los títulos y le pasamos por parámetro un número que vaya subiendo a través del addeventlistener:
    let numero = 0;
    function escogerPreguntas(n) {
        let h2 = document.getElementById("h2")
        h2.innerHTML = preguntas[n]; 
    }
    escogerPreguntas(numero);

    //Esta lista nos sirve para cambiar el orden de las respuestas de forma que no esté la correcta siempre en la misma posición:
    let lista = [1,3,2,0];
    lista=lista.sort(function(){return Math.random()-0.5});
    
    //Hacemos una función que pinte las respuestas, y a través de templates le pasamos la lista desordenada, además le pasamos un value:
    function escogerRespuestas(n,o) {
        let label0 = document.getElementById(`label${lista[0]}`)
        label0.innerHTML = n[0];
        label0.value = n[0];
        
        let label1 = document.getElementById(`label${lista[1]}`)
        label1.innerHTML = n[1];
        label1.value = n[1];

        let label2 = document.getElementById(`label${lista[2]}`)
        label2.innerHTML = n[2];
        label2.value = n[2];

        let label3 = document.getElementById(`label${lista[3]}`)
        label3.innerHTML = o;
        label3.value = o;
    }
    escogerRespuestas(results[numero].incorrect_answers, results[numero].correct_answer);

    //Este es nuestro contador de respuestas correctas:
    let respuestasCorrectas=0;

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

        //Este if hace que cuando lleguemos a la pregunta 9 me redirija a la página results.html
        if (numero>=9) {
            setTimeout( function() { window.location.href = "results.html"; }, 0 ); 
        }
     
        numero++;
        console.log(numero);
        escogerPreguntas(numero);
        escogerRespuestas(results[numero].incorrect_answers,results[numero].correct_answer);
        lista=lista.sort(function(){return Math.random()-0.5});

        console.log(lista);

        console.log(respuestasCorrectas);


        //Obtenemos la Fecha y la hora, y la guardamos en un JSON para meterlas en localStorage.
        let date = new Date();
        let save = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()+" a las "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let puntuacionYFecha = [
            {
                "puntuacion": `${respuestasCorrectas}`,
                "fecha": `${save}`
            }
        ]   
        localStorage.setItem("usuario", JSON.stringify(puntuacionYFecha));
    });
})




