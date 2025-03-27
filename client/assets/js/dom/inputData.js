'use strict';

function createInputField(parent,labelText, forId, type, placeholder) {


    const container = document.createElement("div");
    container.className = 'selectionContainer'; 
    parent.append(container);

    // Create label element
    const label = document.createElement("label");
    label.setAttribute("for", forId);
    label.textContent = labelText;

    // Create input element
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("id", forId);
    input.setAttribute("placeholder", placeholder);
    input.name=forId;
    // Append elements to a container
    container.appendChild(label);
    container.appendChild(input);
}


export default createInputField;