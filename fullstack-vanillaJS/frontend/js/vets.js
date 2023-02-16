//const petList = document.getElementById("pet-list")

const vetCountry = document.getElementById("vet-country")
const vetId = document.getElementById("vet-id")
const vetName = document.getElementById("vet-name")
const vetLName = document.getElementById("vet-lastname")
const inputIndex = document.getElementById("vet-index")
const vetSaveBtn = document.getElementById("vet-savebtn")
const vetList = document.getElementById("vet-list")
const vetForm = document.getElementById("vet-form")
const url = 'http://localhost:8000/vets';


let vets = []

async function listVets() {
    try {
        //la respuesta se obtiene al esperar la comunicacion con el server
    const response  = await fetch(url);
    //las mascotas esperan a ser listadas en forma de JSON
    const serverVets = await response.json();
    //si vienen en forma de array, y no es un array vacio
    if(Array.isArray(serverVets)) {
        vets = serverVets;
    }
    if(vets.length > 0){
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
        Array.from(document.getElementsByClassName('delete-vet')).forEach((deleteBtn, index) => deleteBtn.onclick = deleteVet(index));
        return;
    }
    vetList.innerHTML = 
    `<tr>
        <td colspan="5">No hay veterinarias registradas</td>
    </tr>`
    } catch (error) {
        //alert("show") muestra las alertas desde JS
        $(".alert").show();
        console.log(error);
    }
    
}

async function submitData(event) {
    event.preventDefault();
    try {
        const data = {
            vetId : vetId.value,
            vetName : vetName.value,
            vetLName : vetLName.value,
            vetCountry : vetCountry.value
    
        }
        const action = vetSaveBtn.innerHTML;
        let urlSend = url;
        let method = 'POST';
        if(action === "Editar") {
            //editar
            urlSend += `/${inputIndex.value}`;
            method = 'PUT';
        }
        const response = await fetch(urlSend, { 
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            mode: 'cors',
        });
        if(response.ok) {
            listVets();
            resetModal();
        }
    } catch (error) {
        $(".alert").show();
        console.log(error);
    }
    
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
    const urlSend = `${url}/${index}`
    return async function whenDeleteClicked() {
        try {
            const response = await fetch(urlSend, { 
                method: "DELETE",
                mode: 'cors',
            });
            if(response.ok) {
                listVets();
            }
        } catch (error) {
            $(".alert").show();
            console.log(error);
        }
    }
}

listVets()

vetForm.onsubmit = submitData
vetSaveBtn.onclick = submitData