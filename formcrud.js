    //  Function to fetch products from the server
    async function fetchProducts() {
            try {
                const response = await axios.get("https://crudcrud.com/api/5e495996cd834db7b2b7d70d60c8bebe/PRODUCTS");
                return response.data;
            } catch (err) {
                console.log(err);
                return [];
            }
    }

    // Function to display all products on the screen
    async function showAllProducts() {
            const storedData = await fetchProducts();
            if (storedData && storedData.length > 0) {
                let totalExpense = 0; // Initialize total expense
                const parentElement = document.getElementById('listOfItems');
                parentElement.innerHTML = ''; // Clear the existing list

                // Loop through the products and display each one
                for (const obj of storedData) {
                    showUserOnScreen(obj, parentElement);
                    totalExpense += parseInt(obj.price); // Add the price to total expense
                }

                showTotalExpense(totalExpense); // Display the total expense
            }
    }

   // Function to save product to the server
   async function saveToServer(obj) {
            try {
                const response = await axios.post('https://crudcrud.com/api/5e495996cd834db7b2b7d70d60c8bebe/PRODUCTS', obj);
                return response.data;
            } catch (err) {
                console.log(err);
                return null;
            }
   }

   // Function to delete product from the server
   async function deleteFromServer(productId) {
            try {
                const response = await axios.delete(`https://crudcrud.com/api/5e495996cd834db7b2b7d70d60c8bebe/PRODUCTS/${productId}`);
                console.log(response.data);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
   }

   // Function to display a product on the screen
   function showUserOnScreen(obj, parentElement) {
            parentElement = parentElement || document.getElementById('listOfItems');
            const childItem = document.createElement('li');
            childItem.textContent = obj.price + '-' + obj.productname;

            // Create a delete button for the product
            const deletebtn = document.createElement('input');
            deletebtn.type = 'button';
            deletebtn.value = 'Delete';
            deletebtn.onclick = async () => {
                // Delete the product from the server and update the UI
                const success = await deleteFromServer(obj._id);
                if (success) {
                    parentElement.removeChild(childItem);
                    // Update the total expense after deletion
                    let totalExpense = parseInt(document.getElementById('expense').textContent);
                    totalExpense -= parseInt(obj.price);
                    showTotalExpense(totalExpense);
                }
            };
            childItem.appendChild(deletebtn);
            parentElement.appendChild(childItem);

            // Update the total expense when a new item is added
            let totalExpense = parseInt(document.getElementById('expense').textContent);
            totalExpense += parseInt(obj.price);
            showTotalExpense(totalExpense);
   }

   // Function to display the total expense
   function showTotalExpense(expense) {
            const expenseElement = document.getElementById('expense');
            expenseElement.textContent = expense;
   }

   // Function to initialize the page
   async function init() {
            const form = document.getElementById('productForm');
            if (!form) {
                // If the form is not found, wait for a short time and try again
                await new Promise(resolve => setTimeout(resolve, 100));
                return init();
            }

            // Add event listener to the form submit event
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const price = event.target.price.value;
                const productname = event.target.productname.value;

                const obj = {
                    price,
                    productname
                };

                // Save the product to the server and update the UI
                const response = await saveToServer(obj);
                if (response) {
                    showUserOnScreen(response);
                    event.target.reset();
                }
            });

            // Display all products on the screen
            await showAllProducts();
   }

   // Call the init function when the DOM is ready
   document.addEventListener('DOMContentLoaded', () => {
            init();
   });