const fs = require('fs');
const chalk = require('chalk');
const { waitForDebugger } = require('inspector');
const { Console } = require('console');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title) 

    debugger

    if (!duplicateNote){
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

const listNotes = () => {
    const notes = loadNotes();
    
    console.log(chalk.inverse.yellow('Your Notes'));
    
    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);

    if(findNote){
        console.log(chalk.magenta(findNote.title) + " " + findNote.body);
    } else {
        console.log(chalk.inverse.red("No match were found"));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};