

const apiURL = 'http://localhost:1111/employee'
const tbody = document.getElementById('table-body')
const editButton = document.getElementById('edit-button')
const edit = document.getElementById('edit')
const add = document.getElementById('add')
const addEmp = document.getElementById('add-emp')

const updatedData = {
    id: '',
    name: '',
    designation: '',
    age: '',
    salary: '',
    experience: '',
    gender: ''
}

const addedData = {
    name: '',
    designation: '',
    age: '',
    salary: '',
    experience: '',
    gender: ''
}

const options = (method, body) => {
    return {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...body
        })
    }
}

async function getData() {
    try {
        const data = await fetch(apiURL)
        const json = await data.json()
        showData(json)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

getData();

function showData(json) {
    json.forEach((data) => {
        tbody.innerHTML += `
            <tr style="text-align: center;">
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.designation}</td>
                <td>${data.age}</td>
                <td>${data.salary}</td>
                <td>${data.experience}</td>
                <td>${data.gender}</td>
                <td>
                    <button id="edit-button" onclick="editData('${encodeURIComponent(JSON.stringify(data))}')">Edit</button>
                    <button id="delete" onclick="deleteData('${encodeURIComponent(JSON.stringify(data))}')">Delete</button>
                </td>
            </tr>`;
    });
}

async function deleteData(data) {
    const decodedData = JSON.parse(decodeURIComponent(data))
    await fetch(apiURL, options("DELETE", {
        id: decodedData.id
    })
    ).then(() => {
        console.log(`Data is deleted`);
    }).catch((err) => {
        console.log(`${err}`);
    })
    window.location.reload();
}

function editData(data) {
    const decodedData = JSON.parse(decodeURIComponent(data))
    console.log(decodedData);
    edit.innerHTML = `
                    <h1>Edit</h1>
                    <form id="form">
                        <div>
                        <label for="id">ID:</label>
                        <input type="text" id="id" value='${decodedData.id}' readonly>
                        </div>
                        <div>
                        <label for="name">Name:</label>
                        <input type="text" id="name" value='${decodedData.name}'>
                        </div>
                        <div>
                        <label for="designation">Designation:</label>
                        <input type="text" id="designation" value='${decodedData.designation}'>
                        </div>
                        <div>
                            <label for="age">Age:</label>
                            <input type="text" id="age" value='${decodedData.age}'>
                            </div>
                            <div>
                            <label for="salary">Salary:</label>
                            <input type="text" id="salary" value='${decodedData.salary}'>
                            </div>
                            <div>
                            <label for="experience">Experience:</label>
                            <input type="text" id="experience" value='${decodedData.experience}'>
                            </div>
                            <div>
                            <label for="gender">Gender:</label>
                            <input type="text" id="gender" value='${decodedData.gender}'>
                            </div>
                            
                            <div class="button-container">
                            <button>Save</button>
                            </div>
                        </form>
                        <button id="close">Close</button>
                            `
    edit.style.display = 'block'
    const form = document.getElementById('form')
    const close = document.getElementById('close')

    const empId = document.getElementById('id')
    const name = document.getElementById('name')
    const designation = document.getElementById('designation')
    const age = document.getElementById('age')
    const salary = document.getElementById('salary')
    const experience = document.getElementById('experience')
    const gender = document.getElementById('gender')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        updatedData.id = id.value
        updatedData.name = name.value
        updatedData.designation = designation.value
        updatedData.age = age.value
        updatedData.salary = salary.value
        updatedData.experience = experience.value
        updatedData.gender = gender.value

        await fetch(apiURL, options("PUT", updatedData))
            .then(() => console.log(`Updated successfully`))
            .catch((err) => console.log(`${err} LOL`))

        window.location.reload()
    })

    close.addEventListener('click', () => {
        edit.style.display = 'none'
    })

}

addEmp.addEventListener('click', () => {
    add.innerHTML = `
                    <h1>Add Employee</h1>
                    <form id="add-form">
                    <div>
                    <label for="name">Name:</label>
                    <input type="text" id="add-name">
                    </div>
                    <div>
                    <label for="designation">Designation:</label>
                    <input type="text" id="add-designation">
                    </div>
                    <div>
                    <label for="age">Age:</label>
                    <input type="text" id="add-age">
                    </div>
                    <div>
                    <label for="salary">Salary:</label>
                    <input type="text" id="add-salary">
                    </div>
                    <div>
                    <label for="experience">Experience:</label>
                    <input type="text" id="add-experience">
                    </div>
                    <div>
                    <label for="gender">Gender:</label>
                    <input type="text" id="add-gender">
                    </div>
                    
                    <div class="button-container">
                    <button>Add</button>
                    </div>
                    </form>
                    <button id="close">Close</button>
                                            
    `
    add.style.display = 'block'
    const addForm = document.getElementById('add-form')

    const name = document.getElementById('add-name')
    const designation = document.getElementById('add-designation')
    const age = document.getElementById('add-age')
    const salary = document.getElementById('add-salary')
    const experience = document.getElementById('add-experience')
    const gender = document.getElementById('add-gender')

    addForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        addedData.name = name.value
        addedData.designation = designation.value
        addedData.age = age.value
        addedData.salary = salary.value
        addedData.experience = experience.value
        addedData.gender = gender.value

        await fetch(apiURL, options("POST", addedData))
        .then(()=> console.log(`Added successfully`))
        .catch((err)=> console.log(`Error ${err}`))
        window.location.reload()
    })
})
