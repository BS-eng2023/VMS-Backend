"use strict";

//// add car script
import elements from "./elements.js";
import addCar from "./addCar.js";
import addUser from "./addUser.js";
import logIn from "./logIn.js";
//import populateFilters from "./components/populateFilters.js";
import displayCars from "./components/displayCars.js";
import applyFilters from "./components/applyFilters.js";
import populateFilters from "./components/populateFilters.js";

import login from "./logIn.js";

//disable add new car button //
const addNewCarButton = document.getElementById("addNewCar");
addNewCarButton.title = "Bitte zuerst anmelden!";
addNewCarButton.disabled = true;

const domMapping = () => {
  elements.main = document.querySelector(".main");
  elements.main.innerHTML = "";
  elements.logIn = document.querySelector("#logIn");
  elements.addNewCar = document.querySelector("#addNewCar");
  elements.addNewUser = document.querySelector("#addNewUser");
};

const appendEventListeners = () => {
  elements.logIn.addEventListener("click", logIn);
  elements.addNewCar.addEventListener("click", addCar);
  elements.addNewUser.addEventListener("click", addUser);
};


const intersectionHandler = entries => {
   console.log(entries);
  for(let entry of entries){
      if(entry.isIntersecting){
          entry.target.classList.add('highlight');
          
          setTimeout(
              () => {
                  entry.target.classList.remove('highlight');
              }, 3000
          )
      }
  }
}

const myObserver = new IntersectionObserver(intersectionHandler);


const init = () => {
  //add car script
  domMapping();
  appendEventListeners();
  login();
  
  fetch("../assets/json/sample_cars.json")
    .then((response) => response.json())
    .then((data) => {
      elements.data = data;
      populateFilters(data);
      displayCars(data);
    })
    .catch((error) => console.error("Error loading the JSON file:", error));

  //to display Filter bar on the right side
  const buttonDisplayFilter = document.querySelector("#displayfilter");
  buttonDisplayFilter.addEventListener("click", function () {
    let right = document.querySelector(".right");
    right.classList.toggle("rightSearchClicked");
  });
  //to apply Filter
  const buttonApllyFilter = document.querySelector(".applyFilters");
  buttonApllyFilter.addEventListener("click", function () {
    applyFilters(elements.data);

    //observer_intersection
    const allSections = document.querySelectorAll('h2');
    console.log(allSections);

    for(let section of allSections){
        myObserver.observe(section);
    }
  });
};

// INIT
document.addEventListener("DOMContentLoaded", init);
