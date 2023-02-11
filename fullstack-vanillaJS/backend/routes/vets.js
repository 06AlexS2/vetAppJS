module.exports = function vetsHandler(vets){
    return {
        get: (data, callback) => {
            if(typeof data.index !== "undefined"){
                if(vets[data.index]) {
                    //se utiliza el return para evitar que siga con el callback de abajo
                    return callback(200, vets[data.index]);
                }
                return callback(404, {mensaje: `veterinaria con indice ${data.index} no encontrada`});
            }
            callback(200, vets);
        },
    
        post: (data, callback) => {
            console.log("handler", { data });
            vets.push(data.payload);
            callback(201, data.payload);
        },
    
        put: (data, callback) => {
            if(typeof data.index !== "undefined"){
                if(vets[data.index]) {
                    vets[data.index] = data.payload;
                    //se utiliza el return para evitar que siga con el callback de abajo
                    return callback(200, vets[data.index]);
                }
                return callback(404, {mensaje: `veterinaria con indice ${data.index} no encontrada`});
            }
            callback(400, { message: "index not sended" });
        },
    
        delete: (data, callback) => {
            if(typeof data.index !== "undefined"){
                if(vets[data.index]) {
                    //_pet lleva guion bajo porque se indica que es probable que la variable local no se va a utilizar
                    //aqui indicamos que entregue todos los elementos del objeto excepto el que le indiquemos en el indice
                    vets = vets.filter((_vet, index) => index != data.index);
                    //se utiliza el return para evitar que siga con el callback de abajo
                    return callback(204, { mensaje : `element with index ${data.index} deleted` });
                }
                return callback(404, {mensaje: `veterinaria con indice ${data.index} no encontrada`});
            }
            callback(400, { message: "index not sended" });
        },
    };
}