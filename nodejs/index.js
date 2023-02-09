const http = require('node:http'); //si no se guarda en una constante
//no tengo como referenciarme a el para su uso posterior
const url = require('url')

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
    console.log({ headers });

    //paso 4: enviar una respuesta dependiendo de la ruta
    /*NOTA: te daba el error 'ERR_STREAM_WRITE_AFTER_END' porque despues de un res.end()
     debes poner return;, de lo contrario, finalizará el stream de requests en el servidor 
     exhibit A: */
    switch(cleanRoute){
        case 'ruta':
            res.end("estas en una ruta conocida")
            return;
        default:
            res.end('esta ruta no es conocida')
            return;
    }

    res.end("hola mundo en un server http")
};

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