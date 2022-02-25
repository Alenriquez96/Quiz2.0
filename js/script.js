let urlRandom = "https://opentdb.com/api.php?amount=10"
let rincorrecta1=[];
let rincorrecta2=[];
let rincorrecta3=[];
async function generarPreguntas(){
    try{
        let f = await fetch(urlRandom);
        let data = await f.json()
        return data
        // for(let i=0;i<data.results.length;i++){
        //     for (let j = 0; j < data.results[i].incorrect_answers.length; j++) {
        //         y=data.results[i].incorrect_answers[j];
        //         console.log(y);
        //         let Array= []
        //         Array.push(y)
        //         let r1=Array[0];
        //         console.log(r1);
        //         let r2=Array[1];
        //         let r3=Array[2];
        //         rincorrecta1.push(r1)
        //         rincorrecta2.push(r2)
        //         rincorrecta3.push(r3)
        //         console.log(rincorrecta1);
        //         }               
        //     }
    }
    catch{
        console.error("error");
    }
}
// let random = Math.floor(Math.random()*(11-1))+1;
// let p=1
generarPreguntas().then(function(data){
    // let urlRandom = data.results[random];
    // let titulo = document.createTextNode(`${urlRandom.question}`);      
    // let h3 = document.getElementById("tituloPregunta");
    // h3.appendChild(titulo);
    // let aleatoria_correcta=Math.floor(Math.random()*3);
    // let respuestaCorrecta = document.createTextNode("holacapo");
    // let labelCorrecto = document.getElementById("resp1")
    // labelCorrecto.appendChild(respuestaCorrecta);
})