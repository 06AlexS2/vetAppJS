module.exports = {
    ruta: (data, callback) => { //esto es un handler, se ve mas a detalle en express.js
        callback(200, {message: 'está es /ruta'})
    },
    pets: {
        get: (data, callback) => {
            if(typeof data.index !== "undefined"){
                if(global.resources.pets[data.index]) {
                    //se utiliza el return para evitar que siga con el callback de abajo
                    return callback(200, global.resources.pets[data.index]);
                }
                return callback(404, {mensaje: `mascota con indice ${data.index} no encontrada`});
            }
            callback(200, global.resources.pets);
        },

        post: (data, callback) => {
            console.log("handler", { data });
            global.resources.pets.push(data.payload);
            callback(201, data.payload);
        },
    },

    notFounded: (data, callback) => {
        callback(404, {message: 'no encontrado'});
    },
};