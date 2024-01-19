//Generating unique file-id for static files.

function generateUniqueIdentifier() {
    const uuid = require('uuid');
    return uuid.v4(); 
}

module.exports = generateUniqueIdentifier