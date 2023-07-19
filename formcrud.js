window.onload = function () {
  // Retrieve data from local storage and display it on the screen
  const storedData = JSON.parse(localStorage.getItem('PRODUCTS'));

  if (storedData) {
    let totalExpense = 0; // Initialize total expense

    storedData.forEach(obj => {
      showUserOnScreen(obj);
      totalExpense += parseInt(obj.price); // Add the price to total expense
    });

    showTotalExpense(totalExpense); // Display the total expense
  }
};

function saveToLocalStorage(event) {
  event.preventDefault();
  const price = event.target.price.value;
  const productname = event.target.productname.value;

  const obj = {
    price,
    productname
  };

  axios.post('https://crudcrud.com/api/751ff91409734eed9aef5f41d081ee6b/PRODUCTS', obj)
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
    axios.get("https://crudcrud.com/api/751ff91409734eed9aef5f41d081ee6b/PRODUCTS")
      .then((response) => {
        console.log(response);
        const data = response.data;
        localStorage.setItem('PRODUCTS', JSON.stringify(data));
        let totalExpense = 0; // Initialize total expense

        data.forEach(obj => {
          showUserOnScreen(obj);
          totalExpense += parseInt(obj.price); // Add the price to total expense
        });

        showTotalExpense(totalExpense); // Display the total expense
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
    axios.delete(`https://crudcrud.com/api/751ff91409734eed9aef5f41d081ee6b/PRODUCTS/${obj._id}`)
      .then((response) => {
        console.log(response.data);
        parentElement.removeChild(childItem);

        // Update the total expense after deletion
        let totalExpense = parseInt(document.getElementById('expense').textContent);
        totalExpense -= parseInt(obj.price);
        showTotalExpense(totalExpense);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  childItem.appendChild(deletebtn);
  parentElement.appendChild(childItem);

  // Update the total expense when a new item is added
  let totalExpense = parseInt(document.getElementById('expense').textContent);
  totalExpense += parseInt(obj.price);
  showTotalExpense(totalExpense);
}

function showTotalExpense(expense) {
  const expenseElement = document.getElementById('expense');
  expenseElement.textContent = expense;
}
