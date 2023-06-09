const { getPreguntas, getRespuestas } = require("./database")

// Formato preguntas
// preguntas:[
//    {
//        id: 0,
//        enunciado: "Enunciado pregunta 1",
//        opciones : ["opcion 0", "opcion 1", "opcion 2"],
//        respuesta: 0
//    }, ...
// ]

const questionMiddleware = async (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.questionContext = await getPreguntas()
    next()
}


// Formato respuestas
// respuestas:{
//    "example@mail.com":{
//          fechaUltimaRes: "04/4/2023 12:38:08",
//          numRes: 4
//    }, ...
// }

const responseMiddleware = async (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.responseContext = await getRespuestas()
    next()
}

const respuestasCorrectas = async (respuestas) => {
    preguntas = await getPreguntas()

    let correctas = true
    for(let id in preguntas){
        respuestaCorrecta = preguntas[id].respuesta
        
        // Buscamos la respuesta dada a esta pregunta
        respuestaDada = respuestas["respuesta-" + id]
        
        if(respuestaDada != null && respuestaCorrecta == respuestaDada) continue

        correctas = false
        break
    }

    return correctas
}

module.exports.questionMiddleware = questionMiddleware
module.exports.responseMiddleware = responseMiddleware
module.exports.respuestasCorrectas = respuestasCorrectas