import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

// this view will let the user add a new product to the product catalog
function AddView({
    switchToShowView,
    switchToUpdateView,
    switchToDeleteView,
    switchToStudentView
}) {
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
            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div id="searchedProduct" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    </div>
                </div>
            </div>
            <br></br>
            <div>
                <input type="number" id="inputProductName" placeholder="Enter Product ID"></input>
                <button type="button" onClick={getInputProduct}>One Product</button>
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

                <br></br>
                <br></br>
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

// this view will let the user delete a product in the product catalog
function DeleteView({
    switchToAddView,
    switchToUpdateView,
    switchToShowView,
    switchToStudentView,
    setTheProducts
}) {
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

            for (var i = 0; i < products.length; i++) {
                if (products[i].id == inputProductID) {
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
                }
                // clears the "One Product" view if nothing is in the form and the search button is pressed
                if (inputProductID == '') {
                    division.innerHTML = ``;

                    mainContainer.append(division);
                }
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
    }

    // the deletion was canceled, so don't delete the product
    function rejectDelete() {
        alert("test2");
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

            <p style={{ fontSize: "20px", textAlign: "center" }}>Do you confirm that you want to delete this product?</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button id="confirmButton" onClick={confirmDelete}>Yes, I want to confirm</button>
                <button id="rejectButton" onClick={rejectDelete}>No, I don't confirm</button>
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
                products, which is stored in MongoDB.
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
        // Read the data of robots from the database:
        fetch("http://localhost:8081/listProducts")
            .then(response => response.json())
            .then(products => setTheProducts(products));

    }, []); // the empty brackets here means that useEffect() will only run on the first render

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
                setTheProducts={setTheProducts}
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