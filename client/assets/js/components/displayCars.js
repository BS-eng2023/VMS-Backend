"use strict";
import golbalData from "./golbalData.js";
import elements from "../elements.js";

function displayCars(cars) {
    const container = document.querySelector(".main");
    container.innerHTML = "";

    cars.forEach((car) => {
        const carElement = document.createElement("div");
        carElement.className = "car-listing";

        // Dynamically generate attribute list
        let attributesHTML = "";
        for (const [key, value] of Object.entries(car.attributes)) {
            if (Array.isArray(value)) continue; // Skip features for now
            if (key=="title" ) continue;
            if (key=="carPhotos" ) continue;

            attributesHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }

        // Generate feature list
        let featuresHTML = "";
        if (Array.isArray(car.attributes.features)) {
            featuresHTML = "<ul>";
            car.attributes.features.forEach(feature => {
                featuresHTML += `<li>${feature}</li>`;
            });
            featuresHTML += "</ul>";
        }
                    carElement.innerHTML = `
            <h2>${car.attributes.title}</h2>
            <div class="car-container">
                <img src="./assets/images/${car.imageURL}" class="car-image">
                <div class="car-info">
                    ${attributesHTML}
                    <h3>Features:</h3>
                    ${featuresHTML}
                </div>
            </div>
        `;

        container.appendChild(carElement);
    });

}
export default displayCars;
