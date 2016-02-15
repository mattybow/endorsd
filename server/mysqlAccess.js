import mysql from 'mysql';
const debug = require('debug')('endorsement-data-interface:mysqlAccess');

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASS,
  database : 'endorsements',
  multipleStatements: true
});

conn.connect((err)=>{
  if (err) throw err;
  debug('CONNECTED TO LOCAL MYSQL AS ID ' + conn.threadId);
});

export default conn;
