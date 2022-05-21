


const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#','');  // since we allow either input including # or without #, its better we remove if it exists

    const regex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ // hex value can be either 3 or 6 characters with characters ranging from A-F, a-f, 0-9.

    return regex.test(strippedHex);  
}