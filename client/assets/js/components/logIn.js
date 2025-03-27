"use strict";
import elements from "./elements.js";
import createInputField from "./components/inputData.js";
import golbalData from "./components/golbalData.js";

const login = () => {
  elements.main.innerHTML = "";
  const elSelction = document.createElement("h2");
  elSelction.innerHTML = "Anmelden";
  elements.main.append(elSelction);
  const formElement = document.createElement("form");
  formElement.className = "userForm";
  elements.main.appendChild(formElement);
  createInputField(
    formElement,
    "Benutzer Name:",
    "userName",
    "text",
    "benutzername"
  );
  createInputField(
    formElement,
    "Passwort:",
    "userPassword",
    "password",
    "password"
  );

  const loginButton = document.createElement("button");
  loginButton.className = "userLogin";
  loginButton.style.fontSize = "18px"; // Set font size

  // Create icon element
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-sign-in"); // Add FontAwesome classes

  // Set button text
  loginButton.appendChild(icon);
  loginButton.appendChild(document.createTextNode("  Anmelden"));
  elements.main.appendChild(loginButton);

  const addNewCarButton = document.getElementById("addNewCar");
  const currentName = document.querySelector("#userName");
  const currentPassword = document.querySelector("#userPassword");

  // Standardmäßig deaktiviert
  addNewCarButton.title = "Bitte zuerst anmelden!";
  addNewCarButton.disabled = true;

  let isLoggedIn = false;
  const Element = document.createElement("div");
  Element.className = "car-listing";

  loginButton.addEventListener("click", function () {
    // Hier sollte eine echte Login-Überprüfung erfolgen
    //const loginSuccess = confirm("Login erfolgreich?"); // Simulierte Login-Bestätigung
    let loginSuccess = false;
    let users = null;
    // Login function
    fetch("../assets/json/users.json")
      .then((response) => response.json())
      .then((attribute) => {
        users = attribute;
        const user = users.find(user => user.attributes.userName === currentName.value);
        if (user && user.attributes.userPassword === currentPassword.value) {
          Element.innerText ="Login successful! Welcome, " + currentName.value + "!";
          Element.classList.add("login-message","login-message.success");

          loginSuccess = true;
          elements.main.appendChild(Element);
          loginSuccess = true;
        } else {
          Element.innerText = "Invalid username or password. Please try again.";
          elements.main.appendChild(Element);
          Element.classList.add("login-message","login-message.error");

          loginSuccess = false;
        }
        if (loginSuccess) {
          isLoggedIn = true;
          addNewCarButton.disabled = false;
          addNewCarButton.title = "Jetzt können Sie ein neues Auto hinzufügen!";
          //logInButton.disabled = true;
        }

      })
     
      .catch((error) => console.error("Error loading the JSON file:", error));

    // Find the user in the array
    //const user = elements.data.find(user => elements.data.attributes ["userName"] === username);

    // Check if the user exists and the password matches
  });
};
export default login;
