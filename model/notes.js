const orm = require("../config/orm");
require('dotenv').config()

async function test() {
    try {
        const notes = await orm.allNotes();
        await console.log(notes);

    } catch (error) {
        console.error(error);

    }
}

test();