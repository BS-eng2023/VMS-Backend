"use strict";
import golbalData from "./golbalData.js";
import elements from "../elements.js";
import displayCars from "./displayCars.js";


function applyFilters(carsDatas) {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const brandFilter = document.getElementById('brand-filter').value;
    const fuelFilter = document.getElementById('fuel-filter').value;
    
    const registrationMin = parseFloat(document.getElementById('registration-min').value) || 0;
  const registrationMax = parseFloat(document.getElementById('registration-max').value) || Infinity;
  const mileageMin = parseFloat(document.getElementById('mileage-min').value) || 0;
  const mileageMax = parseFloat(document.getElementById('mileage-max').value) || Infinity;
  


 

  // Initialize the range value displays
  updateRangeValue('#registration-min', '#registration-min-value');
  updateRangeValue('#registration-max', '#registration-max-value');
  function updateRangeValue(rangeInputId, valueDisplayId) {
    const rangeInput = document.querySelector(rangeInputId);
    const valueDisplay = document.querySelector(valueDisplayId);

    // Update the displayed value when the range input changes
    rangeInput.addEventListener('input', () => {
        console.log(rangeInput.value);
      valueDisplay.textContent = rangeInput.value;
    });
  }


    const filteredCars = carsDatas.filter(car => {
        return (
            car.attributes["Baujahre"] >= registrationMin &&
            car.attributes["Baujahre"]  <= registrationMax &&
            car.attributes["mileage"] >= mileageMin &&
            car.attributes["mileage"] <= mileageMax &&
            (car.attributes["title"].toLowerCase().includes(searchQuery)) &&
            (brandFilter === '' || car.attributes ["Marken"]=== brandFilter) &&
            (fuelFilter === '' || car.attributes["Kraftstoffe :"] === fuelFilter)
        );
    });
    if (filteredCars.length>0){
    displayCars(filteredCars);
    const filterButton = document.querySelector(".applyFilters");
    filterButton.textContent = `${filteredCars.length} Autos gefunden / Filter anwenden `;
    }
else {
    const container = document.querySelector(".main");
    container.innerHTML = ""; 
    const Element = document.createElement("div");
    Element.className = "car-listing";
    Element.innerText = "              No Results Found!!   ";
    container.appendChild(Element);
        }
    }
export default applyFilters;


const registrationMin = parseFloat(document.getElementById('registration-min').value) || 0;
  const registrationMax = parseFloat(document.getElementById('registration-max').value) || Infinity;
  const mileageMin = parseFloat(document.getElementById('mileage-min').value) || 0;
  const mileageMax = parseFloat(document.getElementById('mileage-max').value) || Infinity;

