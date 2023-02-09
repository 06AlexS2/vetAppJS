const http = require('node:http'); //si no se guarda en una constante
//no tengo como referenciarme a el para su uso posterior
const url = require('url')
//crear stringDecoder para recibir objetos
const stringDecoder = require('string_decoder').StringDecoder;

//el objeto o prototipo http tiene un método que se llama por el punto .
const serverCallback = (req, res) => {
    //paso 1: obtener la url desde el objeto request "req"
    const currUrl = req.url;
    const parsedUrl = url.parse(currUrl, true);
    console.log({currUrl, parsedUrl});

    //paso 2: obtener la ruta
    const route = parsedUrl.pathname;

    //paso 3: quitar / de ruta
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');

    //paso 3.1: obtener el metodo http
    const method = req.method.toLowerCase();

    //paso 3.2: obtener variables del query url

    //constante hecha con destructuring { constante }
    /* para hacer un query, en cualquier url o ruta, se utiliza un simbolo '?' para representar todos
    los querys implementados, y en el navegador, la ruta dice algo como:
    "http://localhost:8000/ruta?var1=1&var2=2"
    donde los '&' separan a los querys o variables en la url */
    //NOTA: el 'query = {} indica que si no hay busquedas o requests de query devuelva un objeto vacio
    //para evitar errores
    const { query = {} } = parsedUrl;
    console.log({query});

    //paso 3.3: obtener los headers desde el request
    const { headers } = req;
   
    //paso 3.4: obtener payload en el caso de haberlo
    //va a obtener una fuente de información (stream) y la idea es irlos recibiendo e irlos poniendo
    //en su lugar, de forma que yo entiendo el mensaje
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    //3.4.1 ir acumulando la data cuando el request reciba un payload, o
    //request empieza a escuchar cuando le lleguen datos de un payload
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    //3.4.2 terminar de acumular datos y decirle al decoder que finalice
    //o le indico al decoder que ya no reciba más datos
    req.on('end', () => {
        buffer += decoder.end();

        //paso 3.5 ordenar los datos de respuesta
        //estoy creando lo que llega en request pero de una forma legible para el desarrollador
        const data = {
            route: cleanRoute,
            query,
            method,
            headers,
            payload: buffer
        };

        //paso 3.6 elegir el manejador de la respuesta dependiendo de la ruta y asignarle la función que el enrutador tiene (handler)
        let handler;
        //si ruta limpia y enrutador en la posicion de ruta limpia existe:
        if(cleanRoute && router[cleanRoute]){
            //dentro de handler estará la funcion que se mande
            handler = router[cleanRoute];
        } else {
            handler = router.notFounded;
        }

        //paso 4: enviar una respuesta dependiendo de la ruta
        /*NOTA: te daba el error 'ERR_STREAM_WRITE_AFTER_END' porque despues de un res.end()
        debes poner return;, de lo contrario, finalizará el stream de requests en el servidor 
        exhibit A: */
        /*switch(cleanRoute){
            case 'ruta':
                res.end("estas en una ruta conocida")
                return;
            default:
                res.end('esta ruta no es conocida')
                return;
        }*/

        if(typeof handler === 'function') {
            handler(data, (statusCode = 200, message) => {
                const response = JSON.stringify(message);
                res.writeHead(statusCode);
                //linea donde realmente ya estamos respondiendo a la aplicacion cliente
                res.end(response);
            });
        }
    });
};

const router = {
    ruta: (data, callback) => { //esto es un handler, se ve mas a detalle en express.js
        callback(200, {message: 'está es /ruta'})
    },
    users: (data, callback) => { 
        callback(200, [{name: 'user 1'}, {name: 'user 2'}])
    },

    notFounded: (data, callback) => {
        callback(404, {message: 'no encontrado'});
    }
}

//la constante server es lo que va a utilizarse para ejecutar
const server = http.createServer(serverCallback);

//y por ende, server siempre va a estar escuchando en donde uno le indique
server.listen(8000, ()=>{
    console.log("el servidor ahora escucha las peticiones en el servidor localhost:8000");
});

//nota: para matar el proceso debes presionar control+c (NO COMMAND, -->control<--)
/* si corres este codigo mediante "node index.js", y luego entras a un navegador y escribes "localhost:8000"
aparecerá una pagina en blanco, indicando que efectivamente está iniciado el servidor http */

/*  */