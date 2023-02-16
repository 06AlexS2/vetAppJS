const consultList = document.getElementById("consult-list");
const pet = document.getElementById("pet");

let consults = [];
let pets = [];
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
        }
    } catch (error) {
        throw error;
    }
}

showConsults();

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
        throw error;
    }
}

showPets();

