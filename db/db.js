// dependincies
const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuidv1');
// convert readFile and writeFile to a promise based method
const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class Db {
    read() {
        return readData("db/db.json", "utf8");
    }
    write(note){
        return writeData("db/db.json", JSON.stringify(note));
    }
    // parse notes so it returns as an object
    getNote(){
        return this.read()
        .then (notes => {
    
        let parsedNote;
        try {
            parsedNote = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNote = [];
        }
        return parsedNote;
        });
    }
    
    addNote(note){
        const {title, text} = note;
        // use uuidv1 to give a unique ID
        const newNote = {title, text, id: uuidv1()};
        return this.getNote()
        // adds the new note to the end of the array
        .then (notes => [...notes, newNote]) 
        .then (writeNote => this.write(writeNote)
        .then (() => newNote)
        )
    }
    // removes the object with the corresponding id from the array 
    removeNote(id){
        return this.getNote()
        .then (function (allNotes) {
            console.log(allNotes)
            return allNotes.filter(function (note) {
                console.log(note.id !== id) 
                return note.id !== id
                });
            })    
        .then(filterNotes => this.write(filterNotes));       
    } 
}
module.exports = new Db();


