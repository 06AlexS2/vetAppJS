const ownerCountry = document.getElementById("owner-country")
//const ownerId = document.getElementById("vet-id")
const ownerName = document.getElementById("owner-name")
const ownerLName = document.getElementById("owner-lastname")
const inputIndex = document.getElementById("owner-index")
const ownerSaveBtn = document.getElementById("owner-savebtn")
const ownerList = document.getElementById("owner-list")
const ownerForm = document.getElementById("owner-form")



let owners = [
    {
        ownerName : "Alejandro",
        ownerLName : "Sánchez",
        ownerCountry : "Gran Santa Fé Norte"
    },
    {
        ownerName : "Meliisa",
        ownerLName : "Cetina",
        ownerCountry : "Gran Santa Fé Norte"
    },
    {
        ownerName : "Oscar",
        ownerLName : "Sánchez",
        ownerCountry : "Gran Santa Fé Norte"
    },
    {
        ownerName : "Jenny",
        ownerLName : "Azarcoya",
        ownerCountry : "Gran Santa Fé Norte"
    },
]

function listOwners() {
    const htmlOwners = owners.map((owner, index) => 
    `<tr>
        <th scope="row">${index}</th>
        <td>${owner.ownerName}</td>
        <td>${owner.ownerLName}</td>
        <td>${owner.ownerCountry}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info edit" data-toggle="modal" data-target="#exampleModalCenter">Editar</button>
                <button type="button" class="btn btn-danger delete-owner">Eliminar</button>
            </div>
        </td>
     </tr>`).join("");
     ownerList.innerHTML = htmlOwners
     Array.from(document.getElementsByClassName('edit')).forEach((editBtn, index) => editBtn.onclick = edit(index))
     Array.from(document.getElementsByClassName('delete-owner')).forEach((deleteBtn, index) => deleteBtn.onclick = deleteVet(index))
}

function submitData(event) {
    event.preventDefault()
    const data = {
        ownerName : ownerName.value,
        ownerLName : ownerLName.value,
        ownerCountry : ownerCountry.value

    }
    const action = ownerSaveBtn.innerHTML
    switch(action) {
        case "Editar":
            //editar
            owners[inputIndex.value] = data
            break;
        default:
            //crear
            owners.push(data)
            break;

    }
    listOwners()
    resetModal()
}

function edit(index) {
    return function whenClicked() {
        ownerSaveBtn.innerHTML = 'Editar'
        $('#exampleModalCenter').modal('toggle')
        const owner = owners[index]
        ownerName.value = owner.ownerName
        ownerLName.value = owner.ownerLName
        ownerCountry.value = owner.ownerCountry
        inputIndex.value = index
    }
}

function resetModal() {
    ownerName.value = ""
    ownerLName.value = ""
    ownerCountry.value = ""
    inputIndex.value = ""
    ownerSaveBtn.innerHTML = 'Crear'
}

function deleteOwner(index) {
    return function whenDeleteClicked() {
        owners = owners.filter((owner, ownerIndex)=> ownerIndex !== index)
        listOwners()
    }
}

listOwners()

ownerForm.onsubmit = submitData
ownerSaveBtn.onclick = submitData