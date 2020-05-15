const fs=require('fs');
const unzipper= require('unzipper');
fs.createReadStream('../server.zip').pipe(unzipper.Extract({ path: '../server'}));