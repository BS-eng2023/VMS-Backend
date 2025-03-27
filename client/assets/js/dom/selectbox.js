'use strict';

const selectbox = (parent, legend, options, onSelect) => {
    const container = document.createElement('div');
    
    //container.className = 'container'; //should use another container
    container.className = 'selectionContainer'; 
    // container.className = 'column';
    //container.classList('.column');
    //parent.classList('.columns');


    parent.append(container);

    const elLegend = document.createElement('span');
    elLegend.innerHTML = legend;
    container.append(elLegend);

    const elSelect = document.createElement('select');
    container.append(elSelect);

    const elOption = document.createElement('option')
    elOption.innerHTML = 'Select Option';
    elSelect.append(elOption);
    elSelect.name=legend;

    container.update = options => {
        elSelect.innerHTML = '';
        for (let option of options) {
            const elOption = document.createElement('option');
            elOption.innerHTML = option;
            elSelect.append(elOption);
        }
    }

    if (options)
        container.update(options);

    elSelect.addEventListener('change', evt => {
        container.value = elSelect.value;
        onSelect(evt)
    });

    return container

}

export default selectbox;