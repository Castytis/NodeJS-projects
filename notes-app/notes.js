const fs = require('fs');
const chalk = require('chalk');
const { waitForDebugger } = require('inspector');

const getNotes = () =>  "Your notes...";


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    } else {
        console.log('Note title taken')
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    
    if (notes.length === notesToKeep.length){
        console.log(chalk.inverse.red("No matches were found"));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.inverse.green("Note removed"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => { 
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};