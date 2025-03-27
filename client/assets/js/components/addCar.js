"use strict";

import elements from "./elements.js";
import compSelectbox from "./components/selectbox.js";
import createInputField from "./components/inputData.js";
import createCheckboxes from "./components/checkboxes.js";
import golbalData from "./components/golbalData.js";



const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);

const addCar = () => {
  elements.main.innerHTML = "";

  const elSelction = document.createElement("h2");
  elSelction.innerHTML = "Auto einfugen";
  // container.className = 'column';
  elements.main.append(elSelction);
  const formElement  = document.createElement("form");
  formElement.className = 'carForm'; 
  elements.main.appendChild(formElement);

  createInputField(formElement, "Auto Beschreibung:","title","text", "zB. Mercedes-Benz GLA 200 AMG Line AMG Line");


  let brands=golbalData.brands;

  const selMarken = compSelectbox(
    formElement,
    "Marken",
    brands.map((brand) => brand.markenname),
    (evt) => {
      let brand = brands.find((brand) => brand.markenname == evt.target.value);
      let modelle = brand.modelle.map((modell) => modell.name);
      selModelle.update(modelle);
    }
  );

  const selModelle = compSelectbox(formElement, "Modelle", null, (evt) => {
    let brand = brands.find((brand) => brand.markenname == selMarken.value);
    let modell = brand.modelle.find(
      (modell) => modell.name == evt.target.value
    );

    // Baujahre
    let baujahre = [];
    for (let i = modell.baujahre[0]; i < modell.baujahre[1]; i++) {
      baujahre.push(i);
    }
    selBaujahre.update(baujahre);

    // kW
    selKW.update(modell.moeglicheKW);
  });

  const selBaujahre = compSelectbox(formElement, "Baujahre", null, () => {});

  const selKW = compSelectbox(formElement, "Leistung (kW)", null, () => {});

 // createInputField(formElement,"Leistung (PS):","power","number","z. B. 115 PS" );
  createInputField(formElement, "Kilometerstand:","mileage","number","z. B. 104000 km");

 
  const selKraftstoffe = compSelectbox( formElement,"Kraftstoffe :",golbalData.kraftstoffe, () => {}  );

  createInputField(formElement,"Anzahl der Sitze:","seats","number","z. B. 5" );
  createInputField(formElement,"Erstzulassung:","firstRegistration", "month"  );


    let carColors=golbalData.carColors;
    const selCarColors=compSelectbox( formElement,"Auto Farbe :", carColors, () => {} );
    selCarColors.classList.add('color-select');
    
    // add color styl to color selection
    const options=document.querySelectorAll('.color-select select option');
    
    if (options.length>0) {
    options.forEach((option, index) => {
    option.value=carColors[index];
    option.data=carColors[index].toLowerCase;
    });
    } else {
    console.error('No <option> elements found!');
    }

  createCheckboxes(formElement, "exampleCheckbox", golbalData.features);

  createInputField(formElement,"Fotos hochladen::","carPhotos","file");
  
    const carPreview = document.createElement("div");
    carPreview.className = 'imagePreview'; 
    carPreview.innerHTML = "Card Image"; // Clear previous previews
    elements.main.appendChild(carPreview);


       /*save images*/
       let imageName=null;
       document.getElementById("carPhotos").addEventListener("change", function () {
        const preview = document.querySelector('.imagePreview');
        preview.innerHTML = ""; // Clear previous previews
        Array.from(this.files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "400px";
            img.style.margin = "5px";
            console.log(img);
            console.log(file);

            preview.appendChild(img);
          };
          imageName=file.name;
          reader.readAsDataURL(file);
        });
      });
  
 

    const saveCarsDataButton = document.createElement("button");
    saveCarsDataButton.className = 'addCar'; 
    saveCarsDataButton.style.fontSize = "18px"; // Set font size
    //Button.onclick = saveCarData; // Assign function
    // Create icon element
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-save"); // Add FontAwesome classes

    // Set button text
    saveCarsDataButton.appendChild(icon);
    saveCarsDataButton.appendChild(document.createTextNode("   Speichern"));
    elements.main.appendChild(saveCarsDataButton);


    function getFormData() {
    const form = document.querySelector('.carForm');
    const formData = new FormData(form);
    const carData = {};

    formData.forEach((value, key) => {
        if (carData[key]) {
            // Handle multiple selections like checkboxes
            if (!Array.isArray(carData[key])) {
                carData[key] = [carData[key]];
            }
            carData[key].push(value);
        } else {
            carData[key] = value;
        }
    });
    //return data;
    /* cat data object*/
    let carID="car-" + Date.now()+createNumber(100,999);
    golbalData.currentCarId=carID;
    const carsData = {
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        carId: carID,
        userId: golbalData.currentUserId,
        attributes:carData,
        imageURL:imageName        ,
             };

      const blob = new Blob([JSON.stringify(carsData, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${carsData.carId}.json`;
      a.click();


      //const fs = require("fs");
      const saveJsonToFile = () => {
        fs.writeFileSync(`../users/${currentUserId}/${carID}/${carID}.json`, JSON.stringify(carsData, null, 2), "utf-8");
        console.log("Datei erfolgreich gespeichert!");
      }
      
  } 
    

document.querySelector('.addCar').addEventListener("click", function () {
    const formData = getFormData();
    //saveJsonToFile();
});

}
export default addCar;
