import mongojs from 'mongojs';

const connectionStr = connectionStrToDb('endorsements');
const debug = require('debug')('endorsement-data-interface:mongoAccess');

var db = mongojs(connectionStr, ['twStream','twWhitelist'], {authMechanism: 'ScramSHA1'});

// Test connection
db.twStream.findOne({},(err,doc) => {
  if(err) {
    throw new Error(`no db connection: ${err}`);
  }
  debug('CONNECTED TO LOCAL MONGODB', new Date());
});

function connectionStrToDb(db){
  if(process.env.NODE_ENV === 'production'){
    const {DB_USER, DB_PASS, DB_HOST, DB_PORT} = process.env;
    const host = DB_HOST || 'experiment-data.mattbow.com';
    return `${DB_USER}:${DB_PASS}@localhost:${DB_PORT}/${db}?authMechanism=SCRAM-SHA-1`;
  }
  // connect to local db
  return db;
}

export default db;
