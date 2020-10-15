function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function cleanInput(text){ //--- Cleanse Input Data
    text = text.replace(/[&\/\\#,+()$~%.'":|!@;*?<>{}\-\.]/g, '').toLowerCase();
    text = text.replace(/\ {2,}/g, " ");
    text = text.replace(/\n/g, " ");
    return text;
}