const resources = require('./resources');
const pets = require('./routes/pets');
const vets = require('./routes/vets');
const owners = require('./routes/owners');

module.exports = {
    ruta: (data, callback) => { //esto es un handler, se ve mas a detalle en express.js
        callback(200, {message: 'está es /ruta'})
    },

    pets: pets(resources.pets),

    vets: vets(resources.vets),

    owners: owners(resources.owners),

    notFounded: (data, callback) => {
        callback(404, {message: 'no encontrado'});
    },
};