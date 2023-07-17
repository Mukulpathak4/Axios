
window.onbeforeunload = function() {
    localStorage.setItem("name", $('#inputName').val());
    localStorage.setItem("email", $('#inputEmail').val());
    localStorage.setItem("phone", $('#inputPhone').val());
    // ...
}
window.onload = function () {
            // localStorage.setItem("name", $('#inputName').val());
            // localStorage.setItem("email", $('#inputEmail').val());
            

    var name = localStorage.getItem("name");
    if (name !== null) $('#inputName').val("name");

        var email = localStorage.getItem("email");
    if (email !== null) $('#inputEmail').val("email");

        var phone = localStorage.getItem("phone");
    if (phone !== null) $('#inputPhone').val("phone");
   
        }
        function saveToLocalStorage(event) {
            event.preventDefault();
            const name = event.target.username.value;
            const email = event.target.email.value;
            const phoneNumber = event.target.phoneNumber.value;
            // localStorage.setItem('name', name);
            // localStorage.setItem('email', email);
            // localStorage.setItem('phoneNumber', phoneNumber);
            ///////////////Storing at crudcrud

            const obj = {
                name,
                email,
                phoneNumber
            }
            ///////////Storing at crudcrud
            // localStorage.setItem(obj.email, JSON.stringify(obj));
            axios.post('https://crudcrud.com/api/14f066d02b2d493aa2477675e88b101d/appointmentData', obj)
            .then((response) =>{
                console.log(response)
                showUserOnScreen(response.data);
            })
            .catch((err) =>{
                console.log(err);
            })
            showUserOnScreen(obj)
            deletebtn(obj);
            editbtn(obj);
        }
        function showUserOnScreen(obj) {
            const parentElement = document.getElementById('listOfItems')
            const childItem = document.createElement('li');
            childItem.textContent = obj.name + '-' + obj.email + '-' + obj.phoneNumber
            const deletebtn = document.createElement('input');
            deletebtn.type = 'button'
            deletebtn.value = 'Delete'
            deletebtn.onclick = () => {
                ////////////Delete item
                // localStorage.removeItem(obj.email);
                parentElement.removeChild(childItem);
                localStorage.removeItem(parentElement);
            }
            const editbtn = document.createElement('input');
            editbtn.type = 'button'
            editbtn.value = 'Edit'
            editbtn.onclick = () => {
                /////////////Delete item
                // localStorage.removeItem(obj.email);
                parentElement.removeChild(childItem);
                document.getElementById('usernameInputTag').value = obj.name;
                document.getElementById('emailInputTag').value = obj.email;
                document.getElementById('phoneNumbernameInputTag').value = obj.phoneNumber;

            }
            childItem.appendChild(deletebtn);
            childItem.appendChild(editbtn);
            parentElement.appendChild(childItem);
        }


        //Store userdetails in local storage
        //to show userdetails on screen using dom manipulation