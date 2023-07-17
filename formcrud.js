  window.onload = function () {
            // localStorage.setItem("name", $('#inputName').val());
            // localStorage.setItem("email", $('#inputEmail').val());
        }
        function saveToLocalStorage(event) {
            event.preventDefault();
            const name = event.target.username.value;
            const email = event.target.email.value;
            const phoneNumber = event.target.phoneNumber.value;
            // localStorage.setItem('name', name);
            // localStorage.setItem('email', email);
            // localStorage.setItem('phoneNumber', phoneNumber);
            
            const obj = {
                name,
                email,
                phoneNumber
            }
            // localStorage.setItem(obj.email, JSON.stringify(obj));
             axios.post('https://crudcrud.com/api/14f066d02b2d493aa2477675e88b101d/appointmentData', obj)
            .then((response) =>{
                console.log(response.data);
             
               
            })
            .catch((err) =>{
                console.log(err);
            })
            
    
        }

        window.addEventListener("DOMContentLoaded", () =>{
            axios.get("https://crudcrud.com/api/14f066d02b2d493aa2477675e88b101d/appointmentData")
            .then((response)=>{
                console.log(response)
                 for(var i=0;i<response.data.length-1;i++)
                {
                    showUserOnScreen(response.data[i])
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        function showUserOnScreen(obj) {
            const parentElement = document.getElementById('listOfItems')
            const childItem = document.createElement('li');
            childItem.textContent = obj.name + '-' + obj.email + '-' + obj.phoneNumber
            const deletebtn = document.createElement('input');
            deletebtn.type = 'button'
            deletebtn.value = 'Delete'
            deletebtn.onclick = () => {
                localStorage.removeItem(obj.email);
                parentElement.removeChild(childItem);
                localStorage.removeItem(parentElement);
            }
            const editbtn = document.createElement('input');
            editbtn.type = 'button'
            editbtn.value = 'Edit'
            editbtn.onclick = () => {
                localStorage.removeItem(obj.email);
                parentElement.removeChild(childItem);
                document.getElementById('usernameInputTag').value = obj.name;
                document.getElementById('emailInputTag').value = obj.email;
                document.getElementById('phoneNumbernameInputTag').value = obj.phoneNumber;

            }
            childItem.appendChild(deletebtn);
            childItem.appendChild(editbtn);
            parentElement.appendChild(childItem);
        }