//NOTA: CONSERVAR EL MISMO NOMBRE DE OBJETOS TANTO EN RESOURCES COMO EN EL JS

module.exports = {
    pets: [
        {petType: 'Perro', petName: 'Pimo', petOwner: 'Melissa'},
        {petType: 'Perro', petName: 'Mumi', petOwner: 'Alejandro'},

    ],

    vets: [
        {vetName: "Miguel", vetLName: "Monroy", vetId: "12301231", vetCountry: "Mexico"},
        {vetName: "Luis", vetLName: "Ucan", vetId: "98348234", vetCountry: "Mexico"},
        {vetName: "Aaron", vetLName: "Dominguez", vetId: "92843612", vetCountry: "Mexico"},
        {vetName: "Arvin", vetLName: "Balam", vetId: "928374", vetCountry: "Mexico"},
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