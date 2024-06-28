import pool from './connection.js';

console.log('Starting...');
pool.on('connect', ()=>{
    console.log('koneksi berhasil');
    pool.on('error', (err) => {
        console.error(err);
      });
});

try {
    const client = await pool.connect(); 
    const handler = (err) => {
          
    };
    client.on('error', handler); 
 } catch (err) {
    console.error(err);  
 }

const createUserTable = () => {
    const sqlquery = 'CREATE TABLE IF NOT EXISTS tb_users (id UUID PRIMARY KEY,nama VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL,password VARCHAR(100) NOT NULL, windows_id VARCHAR(100),created_at TIMESTAMP,updated_at TIMESTAMP)';
    pool.query(sqlquery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createChatRoom = () => {
    const sqlquery = 'CREATE TABLE IF NOT EXISTS tb_chatroom (id UUID PRIMARY KEY,user_ids TEXT [],jenis VARCHAR(100) NOT NULL,chat_initiator VARCHAR(100) NOT NULL, created_at TIMESTAMP,updated_at TIMESTAMP)';
    pool.query(sqlquery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createChatTable = () => {
    const sqlquery = 'CREATE TABLE IF NOT EXISTS tb_chat (id UUID PRIMARY KEY,chatroom_id VARCHAR(100) NOT NULL REFERENCES tb_chatroom(id) ON DELETE CASCADE,pesan TEXT NOT NULL,posted_by VARCHAR(100) NOT NULL, created_at TIMESTAMP,updated_at TIMESTAMP)';
    pool.query(sqlquery)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createAllTable = () => {
    createUserTable();
    createChatRoom();
    createChatTable();
};

pool.on('remove', ()=>{
    console.log('client removed');
    process.exit(0);
});

export default createAllTable;