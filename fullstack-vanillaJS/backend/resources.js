module.exports = {
    pets: [
        {type: 'perro', name: 'mimo', owner: 'Melissa'},
        {type: 'gato', name: 'shawn', owner: 'Alejandro'},
        {type: 'pajaro', name: 'trini', owner: 'Oscar'},
        {type: 'becerro', name: 'jackson', owner: 'Jenny'},

    ],

    vets: [
        {name: "Miguel", lastname: "Monroy", document: "123456"},
        {name: "Luis", lastname: "Ucan", document: "654321"},
        {name: "Aaron", lastname: "Dominguez", document: "123321"},
        {name: "Arvin", lastname: "Balam", document: "321123"},
    ],

    owners: [
        {name: "Trini", lastname: "Tobago", document: "INE1"},
        {name: "Kikin", lastname: "Fonseca", document: "INE2"},
        {name: "Galaxia", lastname: "Firestone", document: "INE3"},
        {name: "Ba", lastname: "Boni", document: "INE4"},
    ],

    consults: [
        {pet: 0, 
         vet: 0, 
         createdDate: new Date(),
         editedDate: new Date(),
         record: '',
         diagnosis: ''},
    ]
}