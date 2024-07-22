const { pool } = require("../config/connection");

console.log('Starting...');
pool.on('connect', ()=>{
    console.log('koneksi berhasil');
    pool.on('error', (err) => {
        console.error(err);
      });
});



pool.on("connect", () => {
    console.log("berhasil koneksi ke DB");
  });

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
    const sqlquery = 'CREATE TABLE IF NOT EXISTS tb_chatroom (id UUID PRIMARY KEY,user_ids VARCHAR(100) [],jenis VARCHAR(100) NOT NULL,chat_initiator UUID NOT NULL REFERENCES tb_users(id), created_at TIMESTAMP,updated_at TIMESTAMP)';
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
    const sqlquery = 'CREATE TABLE IF NOT EXISTS tb_chat (id UUID PRIMARY KEY,chatroom_id UUID NOT NULL REFERENCES tb_chatroom(id) ON DELETE CASCADE,pesan TEXT NOT NULL,posted_by VARCHAR(100) NOT NULL, created_at TIMESTAMP,updated_at TIMESTAMP)';
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

if (process.argv[2] === "createAllTable") {
    createAllTable();
  }
module.exports = {
    createAllTable,
}