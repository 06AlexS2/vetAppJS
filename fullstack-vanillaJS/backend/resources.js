//NOTA: CONSERVAR EL MISMO NOMBRE DE OBJETOS TANTO EN RESOURCES COMO EN EL JS

module.exports = {
    pets: [
        {petType: 'Perro', petName: 'Pimo', petOwner: 'Melissa'},
        {petType: 'Perro', petName: 'Mumi', petOwner: 'Alejandro'},

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