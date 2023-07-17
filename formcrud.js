window.onload = function () {
    // Retrieve data from local storage and display it on screen
    const storedData = JSON.parse(localStorage.getItem('appointmentData'));
    if (storedData) {
        storedData.forEach(obj => {
            showUserOnScreen(obj);
        });
    }
}

function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phoneNumber.value;

    const obj = {
        name,
        email,
        phoneNumber
    };

    axios.post('https://crudcrud.com/api/7c69cfe0043d455da15456a033d5eea5/appointmentData', obj)
        .then((response) => {
            console.log(response.data);
            showUserOnScreen(response.data);
            event.target.reset();
        })
        .catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    const storedData = JSON.parse(localStorage.getItem('appointmentData'));
    if (!storedData) {
        axios.get("https://crudcrud.com/api/7c69cfe0043d455da15456a033d5eea5/appointmentData")
            .then((response) => {
                console.log(response);
                const data = response.data;
                localStorage.setItem('appointmentData', JSON.stringify(data));
                data.forEach(obj => {
                    showUserOnScreen(obj);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

function showUserOnScreen(obj) {
    const parentElement = document.getElementById('listOfItems')
    const childItem = document.createElement('li');
    childItem.textContent = obj.name + '-' + obj.email + '-' + obj.phoneNumber

    const deletebtn = document.createElement('input');
    deletebtn.type = 'button'
    deletebtn.value = 'Delete'
    deletebtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/7c69cfe0043d455da15456a033d5eea5/appointmentData/${obj._id}`)
            .then((response) => {
                console.log(response.data);
                parentElement.removeChild(childItem);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const editbtn = document.createElement('input');
    editbtn.type = 'button'
    editbtn.value = 'Edit'
    editbtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/7c69cfe0043d455da15456a033d5eea5/appointmentData/${obj._id}`)
            .then((response) => {
                console.log(response.data);
                parentElement.removeChild(childItem);
                document.getElementById('usernameInputTag').value = obj.name;
                document.getElementById('emailInputTag').value = obj.email;
                document.getElementById('phoneNumberInputTag').value = obj.phoneNumber;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    childItem.appendChild(deletebtn);
    childItem.appendChild(editbtn);
    parentElement.appendChild(childItem);
}
