import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

// this view will let the user add a new product to the product catalog
function AddView({
    switchToShowView,
    switchToUpdateView,
    switchToDeleteView,
    switchToStudentView
}) {
    function addNewProduct() {
        // get products from the fake store catalog
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(fakeStoreProducts => { addTheNewProduct(fakeStoreProducts) });

        function addTheNewProduct(fakeStoreProducts) {
            let newProduct = {}; // Create a new product object
            let inputProductID = document.getElementById("getProductById").value;
            var mainContainer = document.getElementById("addedProduct");
            let found = false;

            let division = document.createElement("div");
            mainContainer.innerHTML = ``;

            for (var i = 0; i < fakeStoreProducts.length; i++) {
                if (fakeStoreProducts[i].id == inputProductID) {
                    found = true;

                    newProduct = {
                        id: fakeStoreProducts[i].id,
                        title: fakeStoreProducts[i].title,
                        price: fakeStoreProducts[i].price,
                        description: fakeStoreProducts[i].description,
                        category: fakeStoreProducts[i].category,
                        image: fakeStoreProducts[i].image,
                        rating: {
                            rate: fakeStoreProducts[i].rating.rate,
                            count: fakeStoreProducts[i].rating.count
                        }
                    }

                    division.innerHTML = `
                    <br></br>
                    <p><u><b>New product that has been added to the catalog:</b></u></p>
                    <div key=${fakeStoreProducts[i].id} style="width: 100px>
                        <div class="card">
                            <img src=${fakeStoreProducts[i].image} class="card-img-top" alt=${fakeStoreProducts[i].title} style="object-fit: cover; height: 200px;" />
                            <div class="card-body">
                                <h5 class="card-title">${fakeStoreProducts[i].id}. ${fakeStoreProducts[i].title}</h5>
                                <p style="text-align: center; font-size: 20px; color: green;">$${fakeStoreProducts[i].price}</p>
                                <p class="card-text"><b>Description</b> - ${fakeStoreProducts[i].description}</p>
                                <p class="card-text"><b>Tag</b> - ${fakeStoreProducts[i].category}</p>
                                <p class="card-text"><b>Rating:</b> ${fakeStoreProducts[i].rating.rate} from ${fakeStoreProducts[i].rating.count} people</p>
                            </div>
                        </div>
                    </div>
                `;

                    mainContainer.append(division);

                    break; // break out of the loop once you've found one new product to add to the database
                }
            }

            if (!found) {
                alert("Invalid product. The requested product couldn't be added");
            }
            else {
                // Make the POST request
                fetch("http://localhost:8081/addProduct", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log('New product added successfully:', data);
                        alert("New product has been successfully added to the catalog");
                    })
            }
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: "green", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToShowView}
                >
                    Read Product Catalog
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToUpdateView}
                >
                    Update a Product's Price
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToDeleteView}
                >
                    Delete a Product
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToStudentView}
                >
                    Student Information
                </button>

                <br></br>
                <br></br>
            </div>

            <br></br>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <h1 style={{ textAlign: "center" }}><u>Add a New Product to the Catalog</u></h1>
                    <p className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                        style={{ fontSize: "20px", width: "800px", borderRadius: "10px", backgroundColor: "rgb(255, 255, 102)", textAlign: "center" }}>
                        In this view, you will be able to add a new product to the catalog of
                        products. You'll be able to pick from any products that are in the fake store catalog of products. In order to do this, you'll
                        need to input the id of the product that you want to add in the input search bar. Once the product has been added, a preview of
                        the product that's just been added to the catalog will appear.
                    </p>
                </div>
            </div>

            <br></br>
            <br></br>

            <p style={{ display: "flex", justifyContent: "center" }}>Click the button to add a new product to the catalog:</p>
            <form id="my_form" style={{ display: "flex", justifyContent: "center" }}>
                <input type="number" id="getProductById" placeholder="Enter Product ID" />
                <button type="button" onClick={addNewProduct}>Add a new product</button>
            </form>

            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div id="addedProduct" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>

            <footer class="b-footer">
                <div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            backgroundColor: "rgb(224, 224, 224)"
                        }}
                    >
                        &copy; Caden Otis and Brandon Rau 2024
                    </p>
                </div>
            </footer>
        </div>
    );
}

// this is the default view, where users can see all products and view a given product by inputting its id value
function ShowView({
    theProducts,
    switchToAddView,
    switchToUpdateView,
    switchToDeleteView,
    switchToStudentView
}) {
    // fetches a product that matches the input in the search bar
    function getInputProduct() {
        fetch("http://localhost:8081/listProducts")
            .then(response => response.json())
            .then(products => loadSingleProduct(products));

        function loadSingleProduct(products) {
            var mainContainer = document.getElementById("searchedProduct");
            let inputProductID = document.getElementById("inputProductName").value;

            let division = document.createElement("div");
            mainContainer.innerHTML = ``;

            for (var i = 0; i < products.length; i++) {
                if (products[i].id == inputProductID) {
                    division.innerHTML = `
                    <br></br>
                    <p><u><b>Requested Product via Search:</b></u></p>
                    <div key=${products[i].id}>
                        <div class="card">
                            <img src=${products[i].image} class="card-img-top" alt=${products[i].title} style="object-fit: cover; height: 200px;" />
                            <div class="card-body">
                                <h5 class="card-title">${products[i].id}. ${products[i].title}</h5>
                                <p style="text-align: center; font-size: 20px; color: green;">$${products[i].price}</p>
                                <p class="card-text"><b>Description</b> - ${products[i].description}</p>
                                <p class="card-text"><b>Tag</b> - ${products[i].category}</p>
                                <p class="card-text"><b>Rating:</b> ${products[i].rating.rate} from ${products[i].rating.count} people</p>
                            </div>
                        </div>
                    </div>
                `;

                    mainContainer.append(division);
                }
                // clears the "One Product" view if nothing is in the form and the search button is pressed
                if (inputProductID == '') {
                    division.innerHTML = ``;

                    mainContainer.append(division);
                }
            }
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: "green", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToAddView}
                >
                    Create a Product
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToUpdateView}
                >
                    Update a Product's Price
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToDeleteView}
                >
                    Delete a Product
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToStudentView}
                >
                    Student Information
                </button>

                <br></br>
                <br></br>
            </div>

            <br></br>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <h1 style={{ textAlign: "center" }}><u>Product Catalog</u></h1>
                    <p className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                        style={{ fontSize: "20px", width: "800px", borderRadius: "10px", backgroundColor: "rgb(255, 255, 102)", textAlign: "center" }}>
                        In this view, you will be able to see all of the products in the product catalog. Towards the bottom, there is a search feature
                        that'll allow you to find a specific product. All you need to do is input the product's id, then it'll show up underneath the
                        input form.
                    </p>
                </div>
            </div>

            <br></br>
            <br></br>

            <div className="container mt-3">
                <div className="row">
                    {theProducts.map(product => ( // map reads the whole theProducts array element-by-element
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                <img src={product.image} className="card-img-top" alt={product.title} style={{ objectFit: 'cover', height: '200px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.id}. {product.title}</h5>
                                    <p style={{ textAlign: "center", fontSize: "20px", color: "green" }}>${product.price}</p>
                                    <p className="card-text"><b>Description</b> - {product.description}</p>
                                    <p className="card-text"><b>Tag</b> - {product.category}</p>
                                    <p className="card-text"><b>Rating:</b> {product.rating.rate} from {product.rating.count} people</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <br></br>

            <p style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}><u>Input a product's id to get that singular product:</u></p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="number" id="inputProductName" placeholder="Enter Product ID"></input>
                <button type="button" onClick={getInputProduct}>One Product</button>
            </div>

            <br></br>

            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div id="searchedProduct" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>

            <footer class="b-footer">
                <div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            backgroundColor: "rgb(224, 224, 224)"
                        }}
                    >
                        &copy; Caden Otis and Brandon Rau 2024
                    </p>
                </div>
            </footer>
        </div>
    );
};

// this view will let the user update a product's price in the product catalog
function UpdateView({
    switchToAddView,
    switchToShowView,
    switchToDeleteView,
    switchToStudentView
}) {

    // hook to contain the logic for showing and hiding the input bar for inputting a new price of a product
    const [showPriceInput, setShowPriceInput] = useState(false);

    // fetches a product that matches the input in the search bar to confirm the deletion of it
    function getInputProduct() {
        fetch("http://localhost:8081/listProducts")
            .then(response => response.json())
            .then(products => loadSingleProduct(products));

        function loadSingleProduct(products) {
            var mainContainer = document.getElementById("updateConfirmation");
            let inputProductID = document.getElementById("getProductById").value;

            let division = document.createElement("div");
            mainContainer.innerHTML = ``;
            let found = false;

            for (var i = 0; i < products.length; i++) {
                if (products[i].id == inputProductID) {
                    found = true;

                    division.innerHTML = `
                    <br></br>
                    <p><u><b>Requested Product via Search:</b></u></p>
                    <div key=${products[i].id} style="width: 100px>
                        <div class="card">
                            <img src=${products[i].image} class="card-img-top" alt=${products[i].title} style="object-fit: cover; height: 200px;" />
                            <div class="card-body">
                                <h5 class="card-title">${products[i].id}. ${products[i].title}</h5>
                                <p style="text-align: center; font-size: 20px; color: green;">$${products[i].price}</p>
                                <p class="card-text"><b>Description</b> - ${products[i].description}</p>
                                <p class="card-text"><b>Tag</b> - ${products[i].category}</p>
                                <p class="card-text"><b>Rating:</b> ${products[i].rating.rate} from ${products[i].rating.count} people</p>
                            </div>
                        </div>
                    </div>
                `;

                    mainContainer.append(division);
                    setShowPriceInput(true); // show the input to change a product's price
                }
                // clears the "One Product" view if nothing is in the form and the search button is pressed
                if (inputProductID == '') {
                    division.innerHTML = ``;

                    mainContainer.append(division);
                }
            }

            if (!found) {
                alert("Invalid product. The requested product is not in the catalog");
            }
        }
    }

    // update the price of the requested product
    function updateProductPrice() {
        // Fetch the value from the input field
        let id = document.getElementById("getProductById").value;
        console.log(id);

        let updatedPrice = document.getElementById("updatedProductPrice").value;

        fetch(`http://localhost:8081/updateProduct/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "price": updatedPrice
                }
            )
        })
            .then(response => response.json())

        alert("Product's price has successfully been updated");

        // clear the input and the delete confirmation section
        var mainContainer = document.getElementById("updateConfirmation");
        mainContainer.innerHTML = ``;
        document.getElementById("getProductById").value = '';

        setShowPriceInput(false); // Hide the input to change a product's price
    }

    // the deletion was canceled, so don't update the product's price
    function cancelTheUpdate() {
        // clear the input and the delete confirmation section
        var mainContainer = document.getElementById("updateConfirmation");
        mainContainer.innerHTML = ``;
        document.getElementById("getProductById").value = '';

        setShowPriceInput(false); // Hide the input to change a product's price
    }

    return (
        <div>
            <div style={{ backgroundColor: "green", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToAddView}
                >
                    Create a Product
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToShowView}
                >
                    Read Product Catalog
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToDeleteView}
                >
                    Delete a Product
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToStudentView}
                >
                    Student Information
                </button>
            </div>

            <br></br>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <h1 style={{ textAlign: "center" }}><u>Update a Product's Price</u></h1>
                    <p className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                        style={{ fontSize: "20px", width: "800px", borderRadius: "10px", backgroundColor: "rgb(255, 255, 102)", textAlign: "center" }}>
                        In this view, you will be able to update the price of an existing
                        product in the product catalog. In order to do this, you first need to input the id of the product that you want to update.
                        Then a preview of the requested product will show up at the bottom to make sure that you are updating the correct product.
                        There will then be a second input bar down below the preview to allow you to input the new price of the requested product.
                    </p>
                </div>
            </div>

            <br></br>
            <br></br>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="number" id="getProductById" placeholder="Enter Product ID" />
                <button onClick={getInputProduct}>Update Product:</button>
            </div>

            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div id="updateConfirmation" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>

            {showPriceInput && (
                <>
                    <p style={{ fontSize: "20px", textAlign: "center" }}>Input the new price of the requested product:</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <input type="number" id="updatedProductPrice" placeholder="Enter New Price" />
                        <button onClick={updateProductPrice}>Update Product's Price</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={cancelTheUpdate}>Cancel</button>
                    </div>
                </>
            )}


            <br></br>
            <br></br>

            <footer class="b-footer">
                <div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            backgroundColor: "rgb(224, 224, 224)"
                        }}
                    >
                        &copy; Caden Otis and Brandon Rau 2024
                    </p>
                </div>
            </footer>
        </div>
    );
}

// this view will let the user delete a product in the product catalog
function DeleteView({
    switchToAddView,
    switchToUpdateView,
    switchToShowView,
    switchToStudentView
}) {

    // hook to contain the logic for showing and hiding the confirmation buttons
    const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);

    // fetches a product that matches the input in the search bar to confirm the deletion of it
    function getInputProduct() {
        fetch("http://localhost:8081/listProducts")
            .then(response => response.json())
            .then(products => loadSingleProduct(products));

        function loadSingleProduct(products) {
            var mainContainer = document.getElementById("deletionConfirmation");
            let inputProductID = document.getElementById("getProductById").value;

            let division = document.createElement("div");
            mainContainer.innerHTML = ``;
            let found = false;

            for (var i = 0; i < products.length; i++) {
                if (products[i].id == inputProductID) {
                    found = true;

                    division.innerHTML = `
                    <br></br>
                    <p><u><b>Requested Product via Search:</b></u></p>
                    <div key=${products[i].id} style="width: 100px>
                        <div class="card">
                            <img src=${products[i].image} class="card-img-top" alt=${products[i].title} style="object-fit: cover; height: 200px;" />
                            <div class="card-body">
                                <h5 class="card-title">${products[i].id}. ${products[i].title}</h5>
                                <p style="text-align: center; font-size: 20px; color: green;">$${products[i].price}</p>
                                <p class="card-text"><b>Description</b> - ${products[i].description}</p>
                                <p class="card-text"><b>Tag</b> - ${products[i].category}</p>
                                <p class="card-text"><b>Rating:</b> ${products[i].rating.rate} from ${products[i].rating.count} people</p>
                            </div>
                        </div>
                    </div>
                `;

                    mainContainer.append(division);
                    setShowConfirmationButtons(true); // show the confirmation buttons
                }
                // clears the "One Product" view if nothing is in the form and the search button is pressed
                if (inputProductID == '') {
                    division.innerHTML = ``;

                    mainContainer.append(division);
                }
            }

            if (!found) {
                alert("Invalid product. The requested product is not in the catalog");
            }
        }
    }

    // the deletion was confirmed, so the product will get deleted
    function confirmDelete() {
        // Fetch the value from the input field
        let id = document.getElementById("getProductById").value;
        console.log(id);

        fetch(`http://localhost:8081/deleteProduct/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                { "id": id }
            )
        })
            .then(response => response.json())

        alert("Product has successfully been deleted!");

        // clear the input and the delete confirmation section
        var mainContainer = document.getElementById("deletionConfirmation");
        mainContainer.innerHTML = ``;
        document.getElementById("getProductById").value = '';

        setShowConfirmationButtons(false); // Hide the confirmation buttons
    }

    // the deletion was canceled, so don't delete the product
    function rejectDelete() {
        // clear the input and the delete confirmation section
        var mainContainer = document.getElementById("deletionConfirmation");
        mainContainer.innerHTML = ``;
        document.getElementById("getProductById").value = '';

        setShowConfirmationButtons(false); // Hide the confirmation buttons
    }

    return (
        <div>
            <div style={{ backgroundColor: "green", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToAddView}
                >
                    Create a Product
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToShowView}
                >
                    Read Product Catalog
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToUpdateView}
                >
                    Update a Product's Price
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToStudentView}
                >
                    Student Information
                </button>
            </div>

            <br></br>


            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <h1 style={{ textAlign: "center" }}><u>Delete a Product from the Catalog</u></h1>
                    <p className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                        style={{ fontSize: "20px", width: "800px", borderRadius: "10px", backgroundColor: "rgb(255, 255, 102)", textAlign: "center" }}>
                        In this view, you will be delete a product from the catalog. To do
                        this, you'll need to input the id of the desired product in the input search bar. After doing this, a preview of the
                        inputted product will appear down below, with two buttons to either confirm the deletion or cancel the deletion.
                    </p>
                </div>
            </div>

            <br></br>
            <br></br>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="number" id="getProductById" placeholder="Enter Product ID" />
                <button onClick={getInputProduct}>Delete Product:</button>
            </div>

            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div id="deletionConfirmation" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>

            {showConfirmationButtons && (
                <>
                    <p style={{ fontSize: "20px", textAlign: "center" }}>Do you confirm that you want to delete this product?</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button id="confirmButton" onClick={confirmDelete}>Yes, I want to confirm</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button id="rejectButton" onClick={rejectDelete}>No, I don't confirm</button>
                    </div>
                </>
            )}

            <br></br>
            <br></br>

            <footer class="b-footer">
                <div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            backgroundColor: "rgb(224, 224, 224)"
                        }}
                    >
                        &copy; Caden Otis and Brandon Rau 2024
                    </p>
                </div>
            </footer>
        </div>
    );
}

// this view will show the user the information of the students who created the webpage
function StudentView({
    switchToAddView,
    switchToUpdateView,
    switchToShowView,
    switchToDeleteView
}) {
    return (
        <div>
            <div style={{ backgroundColor: "green", display: "flex", justifyContent: "center", height: "80px" }}>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToAddView}
                >
                    Create a Product
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToShowView}
                >
                    Read Product Catalog
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToUpdateView}
                >
                    Update a Product's Price
                </button>
                <button
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                    style={{ marginLeft: "90px", borderRadius: "10px", height: "35px", marginTop: "20px" }}
                    onClick={switchToDeleteView}
                >
                    Delete a Product
                </button>

                <br></br>
                <br></br>
            </div>

            <br></br>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <h1 style={{ textAlign: "center" }}><u>Student Information</u></h1>
                    <p className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg p-1"
                        style={{ fontSize: "20px", width: "800px", borderRadius: "10px", backgroundColor: "rgb(255, 255, 102)", textAlign: "center" }}>
                        In this view, you'll find information about the students who worked on this webpage/project (name and email), the
                        course that they're in, the date, the professor's name, and a paragraph introducting and describing their webpage.
                    </p>
                </div>
            </div>

            <br></br>

            <h1 style={{ display: "flex", justifyContent: "center" }}>Iowa State University</h1>
            <h1 style={{ display: "flex", justifyContent: "center" }}>COM S 319</h1>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Date: 4/27/2024</h1>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Professor: Dr. Abraham Aldaco</h1>

            <br></br>

            <h1><u>Students who worked on this webpage:</u></h1>
            <ul>
                <li style={{ fontSize: "30px" }}>Caden Otis, <a href="https://outlook.office.com/mail/" target="_blank">crotis@iastate.edu</a></li>
                <li style={{ fontSize: "30px" }}>Brandon Rau, <a href="https://outlook.office.com/mail/" target="_blank">brau13@iastate.edu</a></li>
            </ul>
            <br></br>

            <h1><u>Project Description:</u></h1>
            <p style={{ fontSize: "20px" }}> For COM S 319, we were tasked with creating a single page website that incorporated multiple views, where each
                view focuses on utilizing the CRUD operations (Create, Read, Update, and Delete). These CRUD operations will modify a database of fakestore
                products, which is stored in MongoDB. To access these views, there are four bottoms on top of these views at all times. Just click on one of
                these buttons and it'll take you to a different view. Have fun navigating the webpage that we made and modifying the catalog of products that
                you'll be able to customize to your liking.
            </p>

            <br></br>
            <br></br>

            <footer class="b-footer">
                <div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            backgroundColor: "rgb(224, 224, 224)"
                        }}
                    >
                        &copy; Caden Otis and Brandon Rau 2024
                    </p>
                </div>
            </footer>
        </div>
    );
}

const Products = () => {
    // global states to handle the switching of views on the webpage
    const [addView, setAddView] = useState(false);
    const [showView, setShowView] = useState(true);
    const [updateView, setUpdateView] = useState(false);
    const [deleteView, setDeleteView] = useState(false);
    const [studentView, setStudentView] = useState(false);

    const [theProducts, setTheProducts] = useState([]);

    useEffect(() => {
        // Read the data of products from the database:
        fetch("http://localhost:8081/listProducts")
            .then(response => response.json())
            .then(products => setTheProducts(products));

    }, [addView, showView, updateView, deleteView, studentView]); // update the theProducts hook anytime a different view is rendered

    // functions that handle the switching between the three views
    const switchToAddView = () => {
        if (addView === false) setAddView(true);
        else setAddView(false);

        setShowView(false);
        setUpdateView(false);
        setDeleteView(false);
        setStudentView(false);
    };

    const switchToShowView = () => {
        if (showView === false) setShowView(true);
        else setShowView(false);

        setAddView(false);
        setUpdateView(false);
        setDeleteView(false);
        setStudentView(false);
    };

    const switchToUpdateView = () => {
        if (updateView === false) setUpdateView(true);
        else setUpdateView(false);

        setAddView(false);
        setShowView(false);
        setDeleteView(false);
        setStudentView(false);
    };

    const switchToDeleteView = () => {
        if (deleteView === false) setDeleteView(true);
        else setDeleteView(false);

        setAddView(false);
        setShowView(false);
        setUpdateView(false);
        setStudentView(false);
    };

    const switchToStudentView = () => {
        if (studentView === false) setStudentView(true);
        else setStudentView(false);

        setAddView(false);
        setShowView(false);
        setUpdateView(false);
        setDeleteView(false);
    };

    return (<div>
        {addView &&
            <AddView
                switchToShowView={switchToShowView}
                switchToUpdateView={switchToUpdateView}
                switchToDeleteView={switchToDeleteView}
                switchToStudentView={switchToStudentView}
                theProducts={theProducts}
            />}
        {showView && (
            <ShowView
                theProducts={theProducts}
                switchToAddView={switchToAddView}
                switchToUpdateView={switchToUpdateView}
                switchToDeleteView={switchToDeleteView}
                switchToStudentView={switchToStudentView}
            />
        )}
        {updateView &&
            <UpdateView
                switchToAddView={switchToAddView}
                switchToShowView={switchToShowView}
                switchToDeleteView={switchToDeleteView}
                switchToStudentView={switchToStudentView}
            />}
        {deleteView &&
            <DeleteView
                switchToAddView={switchToAddView}
                switchToUpdateView={switchToUpdateView}
                switchToShowView={switchToShowView}
                switchToStudentView={switchToStudentView}
            />}
        {studentView &&
            <StudentView
                switchToAddView={switchToAddView}
                switchToUpdateView={switchToUpdateView}
                switchToShowView={switchToShowView}
                switchToDeleteView={switchToDeleteView}
            />}
    </div>);
}

export default Products;