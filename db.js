
const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database: "fuckDB",
  password : ''
});


exports.db = function () {
  return connection;
}

exports.checkConn = function (callback) {
  connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");

      callback();
    }
  });
}