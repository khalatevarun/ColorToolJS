

const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const errorText = document.getElementById('error');

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');

    }
    else{
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
    reset();
})


hexInput.addEventListener('keyup',()=>{
    const hex = hexInput.value.trim();

    if(!hex){
        removeError();  //if the input field is empty, remove error messsage
        return;
    }

    if(!isValidHex(hex)) {
        showError()
        return;
    }
    removeError();
        
    const strippedHex = hex.replace('#', ''); // if input already consists # remove it and add it later, handles the case for input without # as well.

    inputColor.style.backgroundColor = '#' + strippedHex;
    reset();

})


const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#','');  // since we allow either input including # or without #, its better we remove if it exists

    const regex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ // hex value can be either 3 or 6 characters with characters ranging from A-F, a-f, 0-9.

    return regex.test(strippedHex);  
}


const convertHextoRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#','');

    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }

    const r = parseInt(strippedHex.substring(0,2),16);  // to convert hex value to a decimal value ranging from 0 - 255
    const g = parseInt(strippedHex.substring(2,4),16);
    const b = parseInt(strippedHex.substring(4,6),16);

    return {r,g,b}
}

const convertRBGToHex = (r,g,b) => {
    
    // have passed 16 in toString() since we need to convert it to hex value
    // adding 0 and then slicing the whole string since for 0 the hex value generated is single character '0', but we need two so we concate and then use slice to get last two characters
    // above operation also handles cases which generate two characters, adding 0 and then slicing the string will give us 2 characters everytime.

    const firstPair = ("0" + r.toString(16)).slice(-2);  
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

const alterColor = (hex, percentage) => {
    const { r, g, b} = convertHextoRGB(hex);

    const amount  = Math.floor((percentage/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
   return convertRBGToHex(newR, newG, newB);

}


const increaseWithin0To255 = (hex, amount) => {

    // const newHex = hex + amount;
   // if(newHex > 255) return 255;
   // if(newHex < 0) return 0;
   // return newHex;
   return Math.min(255, Math.max(0, hex + amount));
 
 } 

slider.addEventListener('input', ()=>{

    if(!isValidHex(hexInput.value)) return;

    sliderText.textContent = `${slider.value}%`;

    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;

    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor  = alteredHex;
    alteredColorText.textContent = 'Altered Color '+alteredHex;
});

const reset = () => {
    slider.value = 0;
    slider.innerText = `0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color ${hexInput.value}`;
}

const showError = () => {
    errorText.innerText = 'Invalid hex color!';
}

const removeError = () => {
    errorText.innerText = ''
}


