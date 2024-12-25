import Database from '@tauri-apps/plugin-sql';

let db;

const init = async () => {
    if(!db){
        db = await Database.load("sqlite:mydatabase.db");
    }
    return db;
}

export const selectChatMessage = async (conversation_id) => {
    const database = await init();
    return await database.execute('SELECT * FROM chat_message WHERE conversation_id = $1', [conversation_id]);
}