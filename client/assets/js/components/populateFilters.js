"use strict";
import golbalData from "./golbalData.js";

function populateFilters(carsData) {
    const brandFilter = document.getElementById('brand-filter');
    const fuelFilter = document.getElementById('fuel-filter');
    
    const brands = new Set();
    const fuels = new Set();
    
    carsData.forEach(car => {
        brands.add(car.attributes["Marken"]);
        fuels.add(car.attributes["Kraftstoffe :"]);
    });
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
    
    fuels.forEach(fuel => {
        const option = document.createElement('option');
        option.value = fuel;
        option.textContent = fuel;
        fuelFilter.appendChild(option);
    });
}
export default populateFilters;
