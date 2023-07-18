window.onload = function () {
    // Retrieve data from local storage and display it on screen
    const storedData = JSON.parse(localStorage.getItem('PRODUCTS'));
    
    if (storedData) {
        let totalexpense = 0; // Initialize total expense
        
        storedData.forEach(obj => {
            showUserOnScreen(obj);
            totalexpense += parseInt(obj.price); // Add the price to total expense
        });
        
        showTotalExpense(totalexpense); // Display the total expense
    }
}

function saveToLocalStorage(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const productname = event.target.productname.value;

    const obj = {
        price,
        productname
    };

    axios.post('https://crudcrud.com/api/973d55282fdc470492d1162af976e1df/PRODUCTS', obj)
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
    const storedData = JSON.parse(localStorage.getItem('PRODUCTS'));
    if (!storedData) {
        axios.get("https://crudcrud.com/api/973d55282fdc470492d1162af976e1df/PRODUCTS")
            .then((response) => {
                console.log(response);
                const data = response.data;
                localStorage.setItem('Products', JSON.stringify(data));
                let totalexpense = 0; // Initialize total expense
                
                data.forEach(obj => {
                    showUserOnScreen(obj);
                    totalexpense += parseInt(obj.price); // Add the price to total expense
                });
                
                showTotalExpense(totalexpense); // Display the total expense
            })
            .catch((err) => {
                console.log(err);
            });
    }
});
function showUserOnScreen(obj) {
    const parentElement = document.getElementById('listOfItems');
    const childItem = document.createElement('li');
    childItem.textContent = obj.price + '-' + obj.productname;

    const deletebtn = document.createElement('input');
    deletebtn.type = 'button';
    deletebtn.value = 'Delete';
    deletebtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/973d55282fdc470492d1162af976e1df/PRODUCTS/${obj._id}`)
            .then((response) => {
                console.log(response.data);
                parentElement.removeChild(childItem);
                
                // Update the total expense after deletion
                let totalexpense = parseInt(document.getElementById('expense').textContent);
                totalexpense -= parseInt(obj.price);
                showTotalExpense(totalexpense);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    childItem.appendChild(deletebtn);
    parentElement.appendChild(childItem);

    // Update the total expense when a new item is added
    let totalexpense = parseInt(document.getElementById('expense').textContent);
    totalexpense += parseInt(obj.price);
    showTotalExpense(totalexpense);
}
function showTotalExpense(expense) {
    const expenseElement = document.getElementById('expense');
    expenseElement.textContent = expense;
}






