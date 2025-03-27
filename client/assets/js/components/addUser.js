"use strict";
import elements from "./elements.js";
import compSelectbox from "./components/selectbox.js";
import createInputField from "./components/inputData.js";
import createCheckboxes from "./components/checkboxes.js";
import golbalData from "./components/golbalData.js";


const addUser = () => {
    const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);

    elements.main.innerHTML = "";
    const elSelction = document.createElement("h2");
    elSelction.innerHTML = "Benutzer einfugen";
    elements.main.append(elSelction);
    const formElement  = document.createElement("form");
    formElement.className = 'userForm'; 
    elements.main.appendChild(formElement);
    createInputField(formElement, "Benutzer Name:","userName","text","benutzername");
    createInputField(formElement, "Passwort:","userPassword","password","password");
    createInputField(formElement, "Email Adresse:","userMail","mail","muster@mustermail.de");
    createInputField(formElement, "Benutzer Adresse:","userAddress","text","Adresse");
    createInputField(formElement, "Handynummer:","userPhoneNumber","number","0176543210000");
    const selKraftstoffe = compSelectbox( formElement,"User Type :",golbalData.userType, () => {}  );
   
    
    const saveUserDataButton = document.createElement("button");
    saveUserDataButton.className = 'adduser'; 
    saveUserDataButton.style.fontSize = "18px"; // Set font size
    //Button.onclick = saveCarData; // Assign function

    // Create icon element
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-save"); // Add FontAwesome classes

    // Set button text
    saveUserDataButton.appendChild(icon);
    saveUserDataButton.appendChild(document.createTextNode("   Einfügen"));
    elements.main.appendChild(saveUserDataButton);


   function getFormData() {
    const form = document.querySelector('.userForm');
    const formData = new FormData(form);
    const userData = {};

    formData.forEach((value, key) => {
        if (userData[key]) {
            // Handle multiple selections like checkboxes
            if (!Array.isArray(userData[key])) {
                userData[key] = [userData[key]];
            }
            userData[key].push(value);
        } else {
            userData[key] = value;
        }
    });
   
    //return data;
    /* user data object*/
    let userID= "user-" + Date.now()+createNumber(100,999);
    golbalData.currentUserId=userID;
    const user = {
        _id:userID,
        attributes:userData,
             };
            // Save the document to PouchDB
            const db = new PouchDB('my_database');

            db.put(user).then(response => {
                console.log("Vehicle saved:", response);
            }).catch(error => {
                console.error("Error saving vehicle:", error);
            });

          /*   filename="../json/cars";
             writeFileSync(`${filename}.json`, JSON.stringify(user, null, 2)); */

           /*   //function saveJSON() {
                console.log("Current Page Directory:", window.location.href);

             const xhr = new XMLHttpRequest();
             //xhr.open("POST", "./cars.json", true);
             //xhr.open("POST", "../json/cars.json", true);
             xhr.open("POST", "http://127.0.0.1:5501/index.html", true);

             xhr.setRequestHeader("Content-Type", "application/json");
                      xhr.onreadystatechange = function () {
                 if (xhr.readyState === 4 && xhr.status === 200) {
                     console.log("JSON updated successfully:", xhr.responseText);
                 }
             };
         
             xhr.send(JSON.stringify(user)); */
            //}
    

        const blob = new Blob([JSON.stringify(user, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${user.userId}.json`;
      a.click();

      } 
    

document.querySelector('.adduser').addEventListener("click", function () {
    const  formData = getFormData();
});
}
export default addUser;

