

const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');


hexInput.addEventListener('keyup',()=>{
    const hex = hexInput.value;

    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', ''); // if input already consists # remove it and add it later, handles the case for input without # as well.

    inputColor.style.backgroundColor = '#' + strippedHex;
})


const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#','');  // since we allow either input including # or without #, its better we remove if it exists

    const regex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ // hex value can be either 3 or 6 characters with characters ranging from A-F, a-f, 0-9.

    return regex.test(strippedHex);  
}