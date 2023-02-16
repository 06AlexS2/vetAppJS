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
const url = "http://localhost:8000/pets";


let pets = []

//como la funcion listar es asincrona, debe declararse como tal
async function listPets() {
    //obten de la ruta origen, y cuando obtengas, entonces haz la funcion
    try {
        //la respuesta se obtiene al esperar la comunicacion con el server
        const response  = await fetch(url);
        //las mascotas esperan a ser listadas en forma de JSON
        const serverPets = await response.json();
        //si vienen en forma de array, y no es un array vacio
        if(Array.isArray(serverPets) && serverPets.length > 0) {
            pets = serverPets;
        }
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
        petList.innerHTML = htmlPets;
        Array.from(document.getElementsByClassName('edit')).forEach((editBtn, index) => editBtn.onclick = edit(index));
        Array.from(document.getElementsByClassName('delete-pet')).forEach((deleteBtn, index) => deleteBtn.onclick = deletePet(index));

    } catch (error) {
        throw error;
    }
    
    
}

async function submitData(event) {
    event.preventDefault()
    try {
        const data = {
            petType: petType.value,
            petName: petName.value,
            petOwner: petOwner.value
    
        }
        let method = "POST";
        let urlSend = url;
        const action = petSaveBtn.innerHTML
        if(action === 'Editar') {
            //editar
            method = "PUT";
            pets[inputIndex.value] = data;
            //nota: ojo con la notación
            urlSend = `${url}/${inputIndex.value}`;
        }
    
        const response = await fetch(urlSend, { 
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if(response.ok) {
            listPets();
            resetModal();
        }
    } catch (error) {
        //throw significa lanzar, lo que hace es mostrar el error en la consola con alertas rojas
        throw error;
    }
    
    
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

listPets();

petForm.onsubmit = submitData
petSaveBtn.onclick = submitData