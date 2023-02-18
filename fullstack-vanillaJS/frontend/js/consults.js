const consultList = document.getElementById("consult-list");
const pet = document.getElementById("pet");
const vet = document.getElementById("vet");
const consultsSaveBtn = document.getElementById("consults-savebtn");
const inputIndex = document.getElementById("index");
const record = document.getElementById("record");
const diagnosis = document.getElementById("diagnosis");
const form = document.getElementById("form");

console.log({pet, vet, record, diagnosis});

let consults = [];
let pets = [];
let vets = [];
const url = "http://localhost:8000";



async function showConsults() {
    const entity = 'consults';
    try {
        const response = await fetch(`${url}/${entity}`);
        const serverConsults = await response.json();
        if(Array.isArray(serverConsults)) {
            consults = serverConsults;
        }
        if(response.ok) {
           const htmlConsults = consults.map((consults, index) =>
            `<tr>
                <th scope="row">${index}</th>
                <td>${consults.pet.petName}</td>
                <td>${consults.vet.vetName} ${consults.vet.vetLName}</td>
                <td>${consults.createdDate}</td>
                <td>${consults.editedDate}</td>
                <td>${consults.record}</td>
                <td>${consults.diagnosis}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info edit" data-toggle="modal" data-target="#exampleModalCenter">Editar</button>
                    </div>
                </td>
            </tr>`
            ).join("");
           consultList.innerHTML = htmlConsults;
           Array.from(document.getElementsByClassName('edit')).forEach((editBtn, index) => editBtn.onclick = edit(index))
        }
    } catch (error) {
        $(".alert-danger").show();
        console.log(error);
    }
}

async function showPets() {
    const entity = 'pets';
    try {
        const response = await fetch(`${url}/${entity}`);
        const serverPets = await response.json();
        if(Array.isArray(serverPets)) {
            pets = serverPets;
        }
        if(response.ok) {
           pets.forEach((_pet, index) => {
            const currOption = document.createElement("option");
            currOption.innerHTML = _pet.petName;
            currOption.value = index;
            pet.appendChild(currOption);
        });

        }
    } catch (error) {
        $(".alert-danger").show();
        console.log(error);
    }
}

async function showVets() {
    const entity = 'vets';
    try {
        const response = await fetch(`${url}/${entity}`);
        const serverVets = await response.json();
        if(Array.isArray(serverVets)) {
            vets = serverVets;
        }
        if(response.ok) {
           vets.forEach((_vet, index) => {
            const currOption = document.createElement("option");
            currOption.innerHTML = `${_vet.vetName} ${_vet.vetLName}`;
            currOption.value = index;
            vet.appendChild(currOption);
        });

        }
    } catch (error) {
        $(".alert-danger").show();
        console.log(error);
    }
}

function edit(index) {
    return function whenClicked() {
        consultsSaveBtn.innerHTML = 'Editar';
        $('#exampleModalCenter').modal('toggle');
        const consult = consults[index];
        inputIndex.value = index;
        pet.value = consult.pet.id;
        vet.value = consult.vet.id;
        record.value = consult.record;
        diagnosis.value = consult.diagnosis;
        console.log(consult);
        
    }
}

async function submitData(event) {
    const entity = "consults";
    event.preventDefault();
    try {
        const data = {
            pet: pet.value,
            vet: vet.value,
            record: record.value,
            diagnosis: diagnosis.value,
    
        };
        if(validate(data) === true){
            const action = consultsSaveBtn.innerHTML;
            let urlSend = `${url}/${entity}`;
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
                showConsults();
                resetModal();
            }
            //permite comprobar si los datos se ingresaron correctamente
            form.classList.add('was-validated');
            return;
            //alert-danger('formulario incompleto');
        }
        $(".alert-warning").show();
        
    } catch (error) {
        $(".alert-danger").show();
        console.log(error);
    }
}

function resetModal() {
    consultsSaveBtn.innerHTML = "Crear";
    [inputIndex, pet, vet, record, diagnosis].forEach((currInput) => {
        currInput.value = "";
        currInput.classList.remove("is-invalid");
        currInput.classList.remove("is-valid");
    });
    $(".alert-warning").hide();
    $("#exampleModalCenter").modal("toggle");
}

function validate(data) {
    if(typeof data !== "object") return false;
    let answer = true;
    //recibe un objeto, el objeto va a ser datos y eso nos devuelve un array con los datos
    for(let key in data){
        if(data[key].length === 0) {
            document.getElementById(key).classList.add("is-invalid");
            answer = false;
        } else {
            document.getElementById(key).classList.remove("is-invalid");
            document.getElementById(key).classList.add("is-valid");
        }

    }
    //esta es otra sintaxis valida de if
    if(answer === True) $(".alert-warning").hide();
    return answer;
}

consultsSaveBtn.onclick = submitData;

showConsults();
showPets();
showVets();

