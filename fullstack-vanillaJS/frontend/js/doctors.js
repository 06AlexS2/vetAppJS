//const petList = document.getElementById("pet-list")

const vetCountry = document.getElementById("vet-country")
const vetId = document.getElementById("vet-id")
const vetName = document.getElementById("vet-name")
const vetLName = document.getElementById("vet-lastname")
const inputIndex = document.getElementById("vet-index")
const vetSaveBtn = document.getElementById("vet-savebtn")
const vetList = document.getElementById("vet-list")
const vetForm = document.getElementById("vet-form")



let vets = [
    {
        vetId : "02381123",
        vetName : "Idelfonso",
        vetLName : "Ballote",
        vetCountry : "Francisco de Montejo"
    },
    {
        vetId : "12345678",
        vetName : "Johnny",
        vetLName : "Kisiera",
        vetCountry : "Gran Santa Fé Norte"
    },
    {
        vetId : "48151623",
        vetName : "Cosme",
        vetLName : "Fulanito",
        vetCountry : "Residencial del Norte"
    }
]

function listVets() {
    const htmlVets = vets.map((vet, index) => 
    `<tr>
        <th scope="row">${index}</th>
        <td>${vet.vetId}</td>
        <td>${vet.vetName}</td>
        <td>${vet.vetLName}</td>
        <td>${vet.vetCountry}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info edit" data-toggle="modal" data-target="#exampleModalCenter">Editar</button>
                <button type="button" class="btn btn-danger delete-vet">Eliminar</button>
            </div>
        </td>
     </tr>`).join("");
     vetList.innerHTML = htmlVets
     Array.from(document.getElementsByClassName('edit')).forEach((editBtn, index) => editBtn.onclick = edit(index))
     Array.from(document.getElementsByClassName('delete-vet')).forEach((deleteBtn, index) => deleteBtn.onclick = deleteVet(index))
}

function submitData(event) {
    event.preventDefault()
    const data = {
        vetId : vetId.value,
        vetName : vetName.value,
        vetLName : vetLName.value,
        vetCountry : vetCountry.value

    }
    const action = vetSaveBtn.innerHTML
    switch(action) {
        case "Editar":
            //editar
            vets[inputIndex.value] = data
            break;
        default:
            //crear
            vets.push(data)
            break;

    }
    listVets()
    resetModal()
}

function edit(index) {
    return function whenClicked() {
        vetSaveBtn.innerHTML = 'Editar'
        $('#exampleModalCenter').modal('toggle')
        const vet = vets[index]
        vetId.value = vet.vetId
        vetName.value = vet.vetName
        vetLName.value = vet.vetLName
        vetCountry.value = vet.vetCountry
        inputIndex.value = index
    }
}

function resetModal() {
    vetId.value = ""
    vetName.value = ""
    vetLName.value = ""
    vetCountry.value = ""
    inputIndex.value = ""
    vetSaveBtn.innerHTML = 'Crear'
}

function deleteVet(index) {
    return function whenDeleteClicked() {
        vets = vets.filter((vet, vetIndex)=> vetIndex !== index)
        listVets()
    }
}

listVets()

vetForm.onsubmit = submitData
vetSaveBtn.onclick = submitData