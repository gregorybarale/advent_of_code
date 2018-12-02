const getIdDictionnary = (id) => {
    const dictionnary = {};
    const charArray = id.split('');
    charArray.forEach(char => {
        if (dictionnary[char] !== undefined) {
            dictionnary[char]++
        } else {
            dictionnary[char] = 1;
        }
    });
    return dictionnary;
}

const compareDictionnary = (dictionnary1, dictionnary2) => {
    const diff = {...dictionnary1};
    const dictionnary2Keys = Object.keys(dictionnary2);
    dictionnary2Keys.forEach(key => {
        if(diff[key] !== undefined) {
            diff[key] = diff[key] - dictionnary2[key];
        } else {
            diff[key] = -dictionnary2[key];
        }
    });
    return diff;
}

module.exports = {
    getIdDictionnary,
    compareDictionnary
};