'use strict';
function createCheckboxes(parentElement,name, valuesArray, ) {
    valuesArray.forEach(value => {
        // Create a div container for each checkbox (optional for better layout)
        const container = document.createElement("div");

        // Create input checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "features";
        checkbox.value = value;
        checkbox.id = `${name}-${value.replace(/\s+/g, "").toLowerCase()}`; // Create unique ID

        // Create label
        const label = document.createElement("label");
        label.setAttribute("for", checkbox.id);
        label.textContent = value;

        // Append checkbox and label to container
        container.appendChild(checkbox);
        container.appendChild(label);

        // Append container to parent element
        parentElement.appendChild(container);
    });
}



export default createCheckboxes;