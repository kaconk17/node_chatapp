const moment = require('moment');

const {pool} = require('../config/connection');

const { v4:uuidv4} = require('uuid');


   const onGetAllUsers= async (req, res) => { };
   const onGetUserById= async (req, res) => { };
   const onCreateUser= async (req, res) => { };
   const onDeleteUserById= async (req, res) => { };
  
   module.exports ={
    onGetAllUsers,
    onGetUserById,
    onCreateUser,
    onDeleteUserById,
   };