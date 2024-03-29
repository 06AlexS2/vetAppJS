module.exports = function consultsHandler({consults, vets, pets}){
    return {
        get: (data, callback) => {
            if(typeof data.index !== "undefined"){
                if(consults[data.index]) {
                    //se utiliza el return para evitar que siga con el callback de abajo
                    return callback(200, consults[data.index]);
                }
                return callback(404, {mensaje: `consulta con indice ${data.index} no encontrada`});
            }
            //esto no es necesario si tienes una base de datos, es solo si manejas toda la data en la memoria
            const consultsWithRel = consults.map((indConsult) =>({
                ...indConsult, 
                pet: { ...pets[indConsult.pet], id: indConsult.pet },
                vet: { ...vets[indConsult.vet], id: indConsult.vet },
            }));

            callback(200, consultsWithRel);
        },
        
        //IMPORTANTE: NO MUTAR CON .push(), DESTRUCTURAR Y AGREGAR como var = [...var, newAddtoVar]
        post: (data, callback) => {
            let newConsult = data.payload;
            newConsult.createdDate = new Date();
            newConsult.editedDate = null;
            consults = [...consults, newConsult];
            callback(201, data.payload);
        },
    
        put: (data, callback) => {
            if(typeof data.index !== "undefined"){
                if(consults[data.index]) {
                    const { createdDate } = consults[data.index];
                    consults[data.index] = {...data.payload, createdDate, editedDate: new Date()};
                    //se utiliza el return para evitar que siga con el callback de abajo
                    return callback(200, consults[data.index]);
                }
                return callback(404, {mensaje: `consulta con indice ${data.index} no encontrada`});
            }
            callback(400, { message: "index not sended" });
        },
    
        delete: (data, callback) => {
            if(typeof data.index !== "undefined"){
                if(consults[data.index]) {
                    //_pet lleva guion bajo porque se indica que es probable que la variable local no se va a utilizar
                    //aqui indicamos que entregue todos los elementos del objeto excepto el que le indiquemos en el indice
                    consults = consults.filter((_consult, index) => index != data.index);
                    //se utiliza el return para evitar que siga con el callback de abajo
                    return callback(204, { mensaje : `element with index ${data.index} deleted` });
                }
                return callback(404, {mensaje: `consulta con indice ${data.index} no encontrada`});
            }
            callback(400, { message: "index not sended" });
        },
    };
}