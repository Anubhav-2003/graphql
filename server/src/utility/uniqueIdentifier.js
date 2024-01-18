//Generating unique file-id for static files.

export function generateUniqueIdentifier() {
    const uuid = require('uuid');
    return uuid.v4(); 
}