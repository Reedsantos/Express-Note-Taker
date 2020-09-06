const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuidv1');

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class Db {
    read() {
        return readData("db/db.json", "utf8");
    }
    write(note){
        return writeData("db/db.json", JSON.stringify(note));
    }
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
}
module.exports = new Db();


