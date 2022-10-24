/**codigo para guardar el listado de mascotas
 * dentro de un array, para hacer la lista
 * dinamica dentro de la pagina
 * pets: array de mascotas
 * pet: mascota singular
 */

const petList = document.getElementById("pet-list")
const petType = document.getElementById("pet-type")
const petName = document.getElementById("pet-name")
const petOwner = document.getElementById("pet-owner")
const petForm = document.getElementById("pet-form")
const petSaveBtn = document.getElementById("pet-savebtn")
const inputIndex = document.getElementById("pet-index")


let pets = [
    {
        petType: "Gato",
        petName : "Manchas",
        petOwner : "Miguel"
    },
    {
        petType: "Perro",
        petName : "Firulais",
        petOwner : "Alejandro"
    },
    {
        petType: "Pájaro",
        petName : "Pacho",
        petOwner : "Oscar"
    }
]

function listPets() {
    const htmlPets = pets.map((pet, index) => 
    `<tr>
        <th scope="row">${index}</th>
        <td>${pet.petType}</td>
        <td>${pet.petName}</td>
        <td>${pet.petOwner}</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info edit" data-toggle="modal" data-target="#exampleModalCenter">Editar</button>
            <button type="button" class="btn btn-danger delete-pet">Eliminar</button>
        </div>
        </td>
     </tr>`).join("");
     petList.innerHTML = htmlPets
     Array.from(document.getElementsByClassName('edit')).forEach((editBtn, index) => editBtn.onclick = edit(index))
     Array.from(document.getElementsByClassName('delete-pet')).forEach((deleteBtn, index) => deleteBtn.onclick = deletePet(index))
}

function submitData(event) {
    event.preventDefault()
    const data = {
        petType: petType.value,
        petName: petName.value,
        petOwner: petOwner.value

    }
    const action = petSaveBtn.innerHTML
    switch(action) {
        case "Editar":
            //editar
            pets[inputIndex.value] = data
            break;
        default:
            //crear
            pets.push(data)
            break;

    }
    listPets()
    resetModal()
}

function edit(index) {
    return function whenClicked() {
        petSaveBtn.innerHTML = 'Editar'
        $('#exampleModalCenter').modal('toggle')
        const pet = pets[index]
        petType.value = pet.petType
        petName.value = pet.petName
        petOwner.value = pet.petOwner
        inputIndex.value = index
    }
}

function resetModal() {
    petType.value = ""
    petName.value = ""
    petOwner.value = ""
    inputIndex.value = ""
    petSaveBtn.innerHTML = 'Crear'
}

function deletePet(index) {
    return function whenDeleteClicked() {
        pets = pets.filter((pet, petIndex)=> petIndex !== index)
        listPets()
    }
}

listPets()

petForm.onsubmit = submitData
petSaveBtn.onclick = submitData