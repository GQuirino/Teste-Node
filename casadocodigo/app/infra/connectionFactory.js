var mysql = require('mysql'); //driver mysql (npm install mysql --save)

function createDBConnection(){

  if(!process.env.NODE_ENV) {
    return mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'casadocodigo_nodejs'
    });
}

if(process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'casadocodigo_nodejs_test'
    });
}

};

//wraper
module.exports = function(){
  return createDBConnection;
}