const ownerDocument = document.getElementById("owner-document")
//const ownerId = document.getElementById("vet-id")
const ownerName = document.getElementById("owner-name")
const ownerLName = document.getElementById("owner-lastname")
const inputIndex = document.getElementById("owner-index")
const ownerSaveBtn = document.getElementById("owner-savebtn")
const ownerList = document.getElementById("owner-list")
const ownerForm = document.getElementById("owner-form")
const url = "http://localhost:8000/owners";


let owners = [];

async function listOwners() {
    try {
        const response = await fetch(url);
        const serverOwners = await response.json();

        if(Array.isArray(serverOwners)) {
            owners = serverOwners;
        }

        if(owners.length > 0){
            const htmlOwners = owners.map((owner, index) => 
            `<tr>
                <th scope="row">${index}</th>
                <td>${owner.ownerName}</td>
                <td>${owner.ownerLName}</td>
                <td>${owner.ownerDocument}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info edit" data-toggle="modal" data-target="#exampleModalCenter">Editar</button>
                        <button type="button" class="btn btn-danger delete-owner">Eliminar</button>
                    </div>
                </td>
            </tr>`).join("");
            ownerList.innerHTML = htmlOwners
            Array.from(document.getElementsByClassName('edit')).forEach((editBtn, index) => editBtn.onclick = edit(index))
            Array.from(document.getElementsByClassName('delete-owner')).forEach((deleteBtn, index) => deleteBtn.onclick = deleteOwner(index));
            return;
        }

        ownerList.innerHTML = 
        `<tr>
            <td colspan="5">No hay dueños registrados.</td>
        </tr>`;
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
            ownerName : ownerName.value,
            ownerLName : ownerLName.value,
            ownerDocument : ownerDocument.value
    
        }
        const action = ownerSaveBtn.innerHTML;
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
            listOwners();
            resetModal();
        }
    } catch (error) {
        $(".alert").show();
        console.log(error);
    }
    
}

function edit(index) {
    return function whenClicked() {
        ownerSaveBtn.innerHTML = 'Editar'
        $('#exampleModalCenter').modal('toggle')
        const owner = owners[index]
        ownerName.value = owner.ownerName
        ownerLName.value = owner.ownerLName
        ownerDocument.value = owner.ownerDocument
        inputIndex.value = index
    }
}

function resetModal() {
    ownerName.value = ""
    ownerLName.value = ""
    ownerDocument.value = ""
    inputIndex.value = ""
    ownerSaveBtn.innerHTML = 'Crear'
}

function deleteOwner(index) {
    const urlSend = `${url}/${index}`
    return async function whenDeleteClicked() {
        try {
            const response = await fetch(urlSend, { 
                method: "DELETE",
                mode: 'cors',
            });
            if(response.ok) {
                listOwners();
            }
        } catch (error) {
            $(".alert").show();
            console.log(error);
        }
    }
}

listOwners();

ownerForm.onsubmit = submitData
ownerSaveBtn.onclick = submitData