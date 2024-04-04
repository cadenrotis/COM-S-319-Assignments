import "./App.css";
import React, { useState, useEffect } from "react";
import Products from "./products.json";
import { Link } from "react-router-dom";

//this function will render the catalog of products and create buttons for users to add the products to their cart
const render_products = (ProductsCategory, cart, { setCartQuantity }) => {
  //adding products to the cart
  const addToCart = (el) => {
    setCartQuantity([...cart, el]); //uses the spread operator
  };

  //removing products from the cart
  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCartQuantity(updatedCart);
    }
  };

  //calculating the quantity of each item in the cart
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  return (
    <div className="category-section fixed">
      <div
        className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
        style={{ maxHeight: "550px", overflowY: "scroll"}}
      >
        {ProductsCategory.map((product, index) => (
          <div>
            <div key={index} className="group relative shadow-lg">
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                <img
                  alt="Product Image"
                  src={product.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        <b>
                          <center>{product.title}</center>
                        </b>
                      </span>
                    </a>
                  </h3>
                  <br></br>
                  <p className="mt-1 text-sm text-gray-500">
                    <b>Description:</b> {product.description}
                  </p>
                  <br></br>
                  <p
                    className="mt-1 text-sm text-gray-500"
                    style={{ paddingBottom: "1rem" }}
                  >
                    <b>Rating:</b> {product.rating.rate} out of 5
                  </p>
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${product.price}
                </p>
              </div>
            </div>
            <div
              className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <p> Quantity: {howManyofThis(product.id)} </p>
              <button
                className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
                id="button"
                type="button"
                style={{ width: "30px", marginLeft: "40px" }}
                onClick={() => addToCart(product)}
              >
                <b>+</b>
              </button>
              <button
                className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
                id="button"
                type="button"
                style={{ width: "30px" }}
                onClick={() => removeFromCart(product)}
              >
                <b>-</b>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  // global states to handle the switching of views on the webpage
  const [browseView, setBrowseView] = useState(true);
  const [cartView, setCartView] = useState(false);
  const [confirmView, setConfirmView] = useState(false);

  const [ProductsCategory, setProductsCategory] = useState(Products.phones); // ProductsCategory is used to display the products onto the webpage
  const [query, setQuery] = useState(""); // query is used to collect the input from the user when they use the search feature

  const [cart, setCartQuantity] = useState([]); //cart is an array that'll store the products that the user is interested in buying
  const [cartTotal, setCartTotal] = useState(0); //cartTotal holds the total price of items in the cart

  const { register, handleSubmit, formState: { errors } } = useForm(); //register for payment info
  const [dataForm,setDataForm] = useState({}); //for storing payment info

  // when input is typed into the search bar, handleChange() updates ProductsCategory with the correct products to show based on the user's input
  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = Products.phones.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  //this is called every time you add or remove an item from the cart
  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  //calculating the number of each product in the cart
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  //checks for duplicate elements in the cart array
  function checkForDuplicates(arr, element) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == element.id) {
        count++;
      }

      if (count > 1) {
        return true;
      }
    }

    return false;
  }

  //checks to see if a product exists in the newly created cart array that doesn't contain any duplicate products
  function productInCart(arr, element) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == element.id) {
        return true;
      }
    }

    return false;
  }

  //will display the list of items in the users cart without the same items being listed more than once
  function noDuplicatesCart() {
    const newCart = []; //newCart will be a copy of cart without any duplicated items

    for (let i = 0; i < cart.length; i++) {
      if (checkForDuplicates(cart, cart[i]) && productInCart(newCart, cart[i])) {
        console.log("There was a duplicate");
        continue;
      }

      newCart.push(cart[i]);
    }

    for (let i = 0; i < newCart.length; i++) {
      console.log(newCart[i].title);
    }

    //displays the items that are in the cart
    const cartItems = newCart.map((el) => (
      <div>
        <div
          className="py-8"
          style={{ display: "flex", justifyContent: "left" }}
          key={el.id}
        >
          <img
            style={{ marginLeft: "5px", marginRight: "170px" }}
            class="img-fluid"
            src={el.image}
            width={150}
          />
          <p style={{ marginRight: "250px", fontSize: "20px" }}>
            {howManyofThis(el.id)}
          </p>
          <p style={{ fontSize: "20px" }}>${howManyofThis(el.id) * el.price}</p>
        </div>
        <p style={{ marginLeft: "5px", fontSize: "20px" }}>{el.title}</p>
      </div>
    ));

    return cartItems;
  }

  //displays the browse view with all of the products
  function BrowseView() {
    return (
      <div>
        <div
          className="py-8"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            className="border border-gray-30 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-1/12 p-1 dark:bg-white-700
dark:border-gray-300 dark:placeholder-gray-400 dark:text-black
dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="search"
            value={query}
            onChange={handleChange}
          />
          <button
            className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
            onClick={() => {
              setQuery("");
              setProductsCategory(Products.phones);
            }}
          >
            Clear Search
          </button>
          <button
            className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
            style={{ marginLeft: "50px" }}
            onClick={switchToCartView}
          >
            Checkout
          </button>
        </div>
        <div className="ml-5 p-1 xl:basis-4/5">
          {render_products(ProductsCategory, cart, { setCartQuantity })}
        </div>
      </div>
    );
  }

  //displays the cart
  function CartView() {
    const onConfirm = data => {
      setDataForm(data);
    }

    return (
      <div>
        <div
          className="py-8"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
            onClick={switchToBrowseView}
          >
            Return
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <p
            style={{
              marginLeft: "20px",
              marginRight: "205px",
              fontSize: "30px",
            }}
          >
            Item
          </p>
          <p style={{ marginRight: "180px", fontSize: "30px" }}>Quantity</p>
          <p style={{ fontSize: "30px" }}>Price</p>
        </div>
        <hr
          style={{
            height: "1px",
            border: "none",
            color: "#333",
            backgroundColor: "#333",
          }}
        ></hr>
        <div>{noDuplicatesCart()}</div>
        <br />
        <hr
          style={{
            height: "1px",
            border: "none",
            color: "#333",
            backgroundColor: "#333",
          }}
        ></hr>
        <div>
          <p style={{ marginLeft: "570px", fontSize: "20px" }}>
            Order total: ${cartTotal}
          </p>
        </div>
        <hr
          style={{
            height: "1px",
            border: "none",
            color: "#333",
            backgroundColor: "#333",
          }}
        ></hr>
        <br />

        <h1 style={{ fontSize: "30px" }}>
          <b>Payment Information</b>
        </h1>
        <form onConfirm={handleSubmit={onConfirm}}>
          <input {...register("name", { required: true})} placeholder="Name"/>
          {errors.name && <p>Name is required.</p>}
          <input {...register("email", { required: true})} placeholder="email Address"/>
          {errors.email && <p>email address is required.</p>}
          <input {...register("card", { required: true})} placeholder="Card Number"/>
          {errors.card && <p>Card number is required.</p>}
          <input {...register("address", { required: true})} placeholder="Address"/>
          {errors.address && <p>Address is required.</p>}
          <input {...register("city", { required: true})} placeholder="City"/>
          {errors.city && <p>City is required.</p>}
          <input {...register("state", { required: true})} placeholder="State"/>
          {errors.state && <p>State is required.</p>}
          <input {...register("zip", { required: true})} placeholder="Zip Code"/>
          {errors.zip && <p>Zip code is required.</p>}

          <button
            className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
            style={{ marginLeft: "50px" }}
            onClick={switchToConfirmView}
          >
          Order
          </button>
        </form>
        <br />

      </div>
    );
  }

  //displays a screen for the user to confirm their order
  function ConfirmView() {
    return (
      <div>
        <div
          className="py-8"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
            style={{ marginLeft: "50px" }}
            onClick={switchToBrowseView}
          >
            Go back to the catalog
          </button>
        </div>
        <h1>This is the confirmation view</h1>
        <h2>{dataForm.name}</h2>
        <p>{dataForm.email}</p>
        <p>{dataForm.card}</p>
        <p>{dataForm.address}</p>
        <p>{dataForm.city}, {dataForm.state} {dataForm.zip}</p>
      </div>
    );
  }

  // functions that handle the switching between the three views
  const switchToBrowseView = () => {
    if (browseView === false) setBrowseView(true);
    else setBrowseView(false);

    setCartView(false);
    setConfirmView(false);
    setDataForm();
  };
  const switchToCartView = () => {
    if (cartView === false) setCartView(true);
    else setCartView(false);

    setBrowseView(false);
    setConfirmView(false);
  };
  const switchToConfirmView = () => {
    if (confirmView === false) setConfirmView(true);
    else setConfirmView(false);

    setBrowseView(false);
    setCartView(false);
  };

  return (
    <div>
      {browseView && <BrowseView />}
      {cartView && <CartView />}
      {confirmView && <ConfirmView />}
    </div>
  );
};

export default App;
