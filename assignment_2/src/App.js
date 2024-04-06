import "./App.css";
import React, { useState, useEffect } from "react";
import Products from "./products.json";
import { useForm } from "react-hook-form";

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
        style={{ maxHeight: "750px", overflowY: "scroll" }}
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

//displays the browse view with all of the products
function BrowseView({
  ProductsCategory,
  cart,
  setCartQuantity,
  query,
  handleChange,
  switchToCartView,
  setQuery,
  setProductsCategory,
}) {
  return (
    <div>
      <div
        className="py-8"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(0, 0, 153)",
        }}
      >
        <input
          className="border border-gray-30 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-1/11 p-1 dark:bg-white-700
dark:border-gray-300 dark:placeholder-gray-400 dark:text-black
dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search for a product"
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
function CartView({
  cart,
  switchToBrowseView,
  noDuplicatesCart,
  cartTotal,
  handleSubmit,
  register,
  errors,
  setDataF,
  switchToConfirmView,
}) {
  //updates the hooks after the submit button for the payment information
  const onSubmit = (data) => {
    setDataF(data); //update dataF hook to contain the input data
    switchToConfirmView(); //switch to the confirmation view
  };

  return (
    <div>
      <div
        className="py-8"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(0, 0, 153)",
        }}
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
          <b>Order total:</b> ${cartTotal}
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

      <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>
        <b>Payment Information</b>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
        <div className="form-group">
          <input {...register("fullName", { required: true, validate: value => isNaN(value) })} placeholder="Full Name" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px" }} />
          {errors.fullName && <p className="text-danger">Full name is required!</p>}
        </div>
        <div className="form-group">
          <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px" }} />
          {errors.email && <p className="text-danger">Invalid email!</p>}
        </div>
        <div className="form-group">
          <input {...register("creditCard", { required: true, pattern: /^\d{16}$/ })} placeholder="Credit Card" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px" }} />
          {errors.creditCard && <p className="text-danger">Invalid credit card number! (Has to be 16 digits)</p>}
        </div>
        <div className="form-group">
          <input {...register("address", { required: true })} placeholder="Address" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px", width: "300px" }} />
          {errors.address && <p className="text-danger">Address is required!</p>}
        </div>
        <div className="form-group">
          <input {...register("address2")} placeholder="Address 2 (optional)" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px", width: "300px" }} />
        </div>
        <div className="form-group">
          <input {...register("city", { required: true, validate: value => isNaN(value) })} placeholder="City" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px" }} />
          {errors.city && <p className="text-danger">City is required!</p>}
        </div>
        <div className="form-group">
          <input {...register("state", { required: true, validate: value => isNaN(value) })} placeholder="State" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px"}} />
          {errors.state && <p className="text-danger">State is required!</p>}
        </div>
        <div className="form-group">
          <input {...register("zip", { required: true, pattern: /^\d{5}$/ })} placeholder="Zip" className="form-control" style={{ marginBottom: "10px", marginLeft: "10px" }} />
          {errors.zip && <p className="text-danger">Invalid zip code! (Has to be 5 digits)</p>}
        </div>
        <button
          className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
          style={{ marginLeft: "10px" }}
          type="submit"
        >
          Submit Order
        </button>
      </form>
      <br></br>
      <hr style={{
        height: "1px",
        border: "none",
        color: "#333",
        backgroundColor: "#333",
      }}></hr>
      <br></br>
      <div>
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
    </div>
  );
}

//displays a screen for the user to confirm their order
function ConfirmView({
  summaryOfCart,
  cartTotal,
  dataF,
  switchToCartView,
  switchToFreshBrowseView,
}) {
  const updateHooks = () => {
    switchToCartView(); //switch back to the cart view
  };

  return (
    <div>
      <div
        className="py-8"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(0, 0, 153)",
        }}
      >
        <button
          className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
          style={{ marginLeft: "50px" }}
          onClick={switchToFreshBrowseView}
        >
          Go back to a fresh browse view
        </button>
      </div>
      <div>
        <h1
          style={{
            fontSize: "30px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          <b>Order Summary</b>
        </h1>
        <div>{summaryOfCart()}</div>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          <b>Order total: ${cartTotal}</b>
        </p>
      </div>
      <br></br>
      <hr
        style={{
          height: "1px",
          border: "none",
          color: "#333",
          backgroundColor: "#333",
        }}
      ></hr>
      <br></br>
      <h1
        style={{ fontSize: "30px", marginBottom: "10px", textAlign: "center" }}
      >
        <b>Payment Summary</b>
      </h1>
      <h3 style={{ marginBottom: "10px", textAlign: "center" }}>
        Name: <u>{dataF.fullName}</u>
      </h3>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        Email: <u>{dataF.email}</u>
      </p>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        Credit Card # (last four numbers shown only):{" "}
        <u>
          {dataF.creditCard.substring(
            dataF.creditCard.length - 4,
            dataF.creditCard.length
          )}
        </u>
      </p>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        Address: <u>{dataF.address}</u>
      </p>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        Address 2 (optional): <u>{dataF.address2}</u>
      </p>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        City: <u>{dataF.city}</u>
      </p>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        State: <u>{dataF.state}</u>
      </p>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        Zip code: <u>{dataF.zip}</u>{" "}
      </p>
      <br></br>
      <hr style={{
        height: "1px",
        border: "none",
        color: "#333",
        backgroundColor: "#333",
      }}></hr>
      <br></br>
      <div>
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
    </div>
  );
}

const App = () => {
  // global states to handle the switching of views on the webpage
  const [browseView, setBrowseView] = useState(true);
  const [cartView, setCartView] = useState(false);
  const [confirmView, setConfirmView] = useState(false);

  const [ProductsCategory, setProductsCategory] = useState(Products.phones); // ProductsCategory is used to display the products onto the webpage
  const [query, setQuery] = useState(""); // query is used to collect the input from the user when they use the search feature
  const [cart, setCartQuantity] = useState([]); //cart is an array that'll store the products that the user is interested in buying
  const [cartTotal, setCartTotal] = useState(0); //cartTotal holds the total price of items in the cart

  //hooks for the user's input for their payment information
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataF, setDataF] = useState({}); //dataF hook will contain the input data

  // when input is typed into the search bar, handleChange() updates ProductsCategory with the correct products to show based on the user's input
  const handleChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
    const results = Products.phones.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);

    console.log("handle change");
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
      if (
        checkForDuplicates(cart, cart[i]) &&
        productInCart(newCart, cart[i])
      ) {
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
          <p
            style={{
              marginTop: "20px",
              marginRight: "250px",
              fontSize: "20px",
            }}
          >
            {howManyofThis(el.id)}
          </p>
          <p style={{ marginTop: "20px", fontSize: "20px" }}>
            ${howManyofThis(el.id) * el.price}
          </p>
        </div>
        <p style={{ marginLeft: "5px", fontSize: "20px" }}>{el.title}</p>
      </div>
    ));

    return cartItems;
  }

  //will display the list of items in the user's cart in a different format for the confirmation view
  function summaryOfCart() {
    const newCart = []; //newCart will be a copy of cart without any duplicated items

    for (let i = 0; i < cart.length; i++) {
      if (
        checkForDuplicates(cart, cart[i]) &&
        productInCart(newCart, cart[i])
      ) {
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
          style={{ display: "flex", justifyContent: "center" }}
          key={el.id}
        >
          <img
            style={{ marginLeft: "5px" }}
            class="img-fluid"
            src={el.image}
            width={120}
          />
          <p style={{ marginTop: "50px", marginLeft: "50px" }}>
            {el.title} - {howManyofThis(el.id)} x ${el.price} = $
            {howManyofThis(el.id) * el.price}
          </p>
        </div>
      </div>
    ));

    return cartItems;
  }

  // functions that handle the switching between the three views
  const switchToBrowseView = () => {
    if (browseView === false) setBrowseView(true);
    else setBrowseView(false);

    setCartView(false);
    setConfirmView(false);
  };

  const switchToFreshBrowseView = () => {
    if (browseView === false) {
      setBrowseView(true);
      setCartQuantity([]); //reset the cart to an empty array
      setDataF([]); //clear the input data for payment information
    } else setBrowseView(false);

    setCartView(false);
    setConfirmView(false);
  };

  const switchToCartView = () => {
    if (cartView === false) {
      setCartView(true);
      console.log("In cart view" + dataF);
    } else setCartView(false);

    setBrowseView(false);
    setConfirmView(false);
  };

  const switchToConfirmView = () => {
    if (confirmView === false) setConfirmView(true);
    else setConfirmView(false);
    console.log("In confirm view" + dataF);

    setBrowseView(false);
    setCartView(false);
  };

  return (
    <div>
      {browseView && (
        <BrowseView
          ProductsCategory={ProductsCategory}
          cart={cart}
          setCartQuantity={setCartQuantity}
          query={query}
          handleChange={handleChange}
          switchToCartView={switchToCartView}
          setQuery={setQuery}
          setProductsCategory={setProductsCategory}
        />
      )}
      {cartView && (
        <CartView
          cart={cart}
          switchToBrowseView={switchToBrowseView}
          noDuplicatesCart={noDuplicatesCart}
          cartTotal={cartTotal}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          setDataF={setDataF}
          switchToConfirmView={switchToConfirmView}
        />
      )}
      {confirmView && (
        <ConfirmView
          summaryOfCart={summaryOfCart}
          cartTotal={cartTotal}
          dataF={dataF}
          switchToCartView={switchToCartView}
          switchToFreshBrowseView={switchToFreshBrowseView}
        />
      )}
    </div>
  );
};

export default App;
