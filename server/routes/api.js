import express from 'express';
// import mongodb from '../mongoAccess';
import mysqldb from '../mysqlAccess';
import MysqlTransaction from '../mysqlTransaction';
import moment from 'moment';
const debug = require('debug')('endorsement-data-interface:api-routes');
const transaction = new MysqlTransaction(mysqldb);
const router = express.Router();

router.get('/tweets',(req,res) => {
  if(req.session.passport){
    mongodb.twStream.find({},null,{sort:{created_time:-1}, limit: 1000},(err,data)=>{
      res.json(data);
    });
  } else {
    res.status(401)
       .json([]);
  }

});

router.get('/candidates',(req,res) => {
  if(req.session.passport){
    mysqldb.query(`SELECT CAN_ID as id,
                      FIRST_NAME as firstName,
                      MIDDLE_NAME as middleName,
                      LAST_NAME as lastName,
                      PARTY as party,
                      GENDER as gender,
                      DOB as dob,
                      AVATAR as avatar,
                      ACTIVE as active
                      FROM CANDIDATES
                    ORDER BY FIRST_NAME;`, (err,results) => {
      res.json(results);
    });
  } else {
    res.status(401)
       .json([]);
  }
});

router.get('/candidate',(req,res) => {
  if(req.session.passport){
    res.json([]);
  } else {
    res.status(401)
       .json([]);
  }
});

router.get('/endorsers',(req,res) => {
  if(req.session.passport){
    mysqldb.query(`SELECT AVATAR as avatar,
                    NAME as name,
                    e.END_ID as id,
                    DESCRIPT as descript,
                    IS_ORG as isOrg,
                    WIKI_LINK as wikiLink,
                    modified,
                    group_concat(t.id) as tagIds,
                    group_concat(t.tag_name) as tags
                  FROM ENDORSERS e join ENDORSER_TAGS et on e.end_id = et.end_id
                  join TAGS t on et.tag_id = t.id
                  group by e.END_ID
                  ORDER BY e.END_ID DESC;`, (err,results) => {
      res.json(results);
    });
  } else {
    res.status(401)
       .json([]);
  }
});

router.get('/endorsements',(req,res) => {
    const query = `SELECT
                        e.id,
                        ee.name endorser,
                        e.end_id,
                        ee.avatar end_avatar,
                        CONCAT(c.first_name, ' ', c.last_name) candidate,
                        c.can_id,
                        c.avatar can_avatar,
                        CONVERT_TZ(e.date,'+00:00','+06:00') date,
                        e.source,
                        e.confirmed,
                        e.modified,
                        e.quote,
                        ee.descript
                    FROM
                        endorsements e
                            JOIN
                        endorsers ee ON e.end_id = ee.end_id
                            JOIN
                        candidates c ON e.can_id = c.can_id
                    ORDER BY e.date DESC, e.modified DESC;`;
    mysqldb.query(query, (err,results) => {
      res.json(results);
    });
});

router.post('/updateCandidate',(req,res) => {
  if(req.session.passport){
    const txn = transaction.create();
    const jsKeysToMysqlFields = {
      dob:'DOB',
      firstName:'FIRST_NAME',
      middleName:'MIDDLE_NAME',
      lastName:'LAST_NAME',
      party:'PARTY',
      gender:'GENDER',
      active:'ACTIVE',
      avatar:'AVATAR'
    }
    const setStatement = Object.keys(req.body).reduce((acc,key) => {
      if(key==='dob'){
        acc += `DOB=${mysqldb.escape(new Date(req.body[key]))}, `;
      } else if (key in jsKeysToMysqlFields){
        acc += `${jsKeysToMysqlFields[key]}=${mysqldb.escape(req.body[key])}, `;
      }
      return acc;
    }, '').replace(/(,\s)$/,'');

    txn.addTo(`UPDATE CANDIDATES
                SET ${setStatement}
                WHERE CAN_ID=${mysqldb.escape(req.body.id)};`)
        .execute()
        .then( result => {
          const { code, ok } = result;
          res.status(code).json({ok});
        });
  } else {
    res.status(401)
       .json([]);
  }
});

router.post('/updateEndorser',(req,res)=> {
  const txn = transaction.create();
  const {id} = req.body;
  const jsKeysToMysqlFields = {
    name:'NAME',
    descript:'DESCRIPT',
    isOrg:'IS_ORG',
    wikiLink:'WIKI_LINK',
    avatar:'AVATAR'
  }
  if(req.session.passport){
    const setStatement = Object.keys(req.body).reduce((acc,key) => {
      if(key === 'tags'){
        const tags = req.body[key];
        //this is the simplest solution for right now, delete all records for the endorserId
        txn.addTo(`DELETE
                    FROM ENDORSER_TAGS
                    WHERE END_ID=${mysqldb.escape(id)};`);
        //extract and add any new tags
        tags.filter(tag => tag.isNew).map(newTag => {
          txn.insertIntoTable('TAGS',[newTag.id, newTag.value]);
        });
        //insert associations
        tags.map(tag => {
          txn.insertIntoTable('ENDORSER_TAGS',[id,tag.id]);
        });
      } else if (key in jsKeysToMysqlFields){
        acc += `${jsKeysToMysqlFields[key]}=${mysqldb.escape(req.body[key])}, `;
      }
      return acc;
    },'').replace(/(,\s)$/,'');
    if(setStatement){
      txn.addTo(`UPDATE ENDORSERS
                  SET ${setStatement}
                  WHERE END_ID=${mysqldb.escape(id)};`);
    }

     txn.showCall()
        .execute()
        .then( result => {
          const { code, ok } = result;
          res.status(code).json({ok});
        });
  } else {
    res.status(401)
       .json([]);
  }
})

router.post('/updateEndorsement',(req,res) => {
  if(req.session.passport){
    const { date, source, confirmed, id, quote } = req.body;
    const txn = transaction.create();
    txn.addTo(`UPDATE ENDORSEMENTS
                SET DATE=${mysqldb.escape(new Date(date))},
                    SOURCE=${mysqldb.escape(source)},
                    CONFIRMED=${mysqldb.escape(confirmed)},
                    QUOTE=${mysqldb.escape(quote)}
                WHERE ID=${mysqldb.escape(id)};`)
        .execute()
        .then( result => {
          const { code, ok } = result;
          res.status(code).json({ok});
        });
  } else {
    res.status(401)
       .json([]);
  }
});

router.get('/tags',(req,res) => {
  mysqldb.query('SELECT ID AS id, TAG_NAME AS value FROM TAGS ORDER BY 2;', (err,results) => {
    res.json(results);
  });
})

router.post('/addCandidate', (req,res) => {
  if(req.session.passport){
    const {canId,firstName,middleName,lastName,party,gender,dob,avatar} = req.body;
    const argList = [canId,firstName,middleName,lastName,party,gender,dob,avatar];
    transaction.executeProcedure('ADD_CANDIDATE', argList).then(
      result => {
        const { code, ok } = result;
        res.status(code).json({ok});
      }
    );
  }
})

router.post('/addEndorsements', (req,res) => {
  if(req.session.passport){
    const { newTags, endorsers, selectedCandidate, source, date, tweetText } = req.body;
    const txn = transaction.create();
    //if there are any new tags, insert them
    newTags.map(tag => {
        txn.insertIntoTable('TAGS',[tag.id, tag.value]);
    });
    endorsers.map(endorser => {
      const { id, descript, name, isOrg, avatar, wikiLink, tags=[], isNew } = endorser;
      //create the endorsers
      if(isNew){
        txn.insertIntoTable('ENDORSERS',[id, descript, name, isOrg, wikiLink, avatar, new Date()]);
      }
      //tie endorsers to tags
      tags.map( tag => {
        txn.insertIntoTable('ENDORSER_TAGS',[id,tag.id]);
      });
      //tie endorser to candidate
      txn.insertIntoTable('ENDORSEMENTS',
        ['CAN_ID', 'END_ID', 'DATE', 'SOURCE', 'CREATED', 'MODIFIED', 'CONFIRMED', 'QUOTE'],
        [selectedCandidate, id, date, source, new Date(), new Date(), 0, tweetText]
      );
    });

    txn.execute()
       .then( result => {
         const { code, ok, err } = result;
         res.status(code).json({ok, err});
       });
    // res.json({ok:true});
    // transaction.create()
    //            .insertIntoTable('TAGS',['T12345','traditional marriage'])
    //            .insertIntoTable('TAGS',['T12346','congress'])
    //            .on('COMMIT',() => {
    //              debug('committed');
    //            })
    //            .on('ROLLBACK',() => {
    //              debug('rolled back');
    //            })
    //            .execute()
    //            .then( result => {
    //              const { code, ok } = result;
    //              res.status(code).json({ok});
    //            });
  }
})

router.post('/deleteTweet',(req,res) => {
  const {body:{id}, session:{passport}} = req;
  console.log(passport);
  if(id && passport){
    mongodb.twStream.remove({_id:id}, (err,data) => {
      if (err){
        res.status(500).json({err});
      } else {
        res.json(data);
      }
    });
  } else {
    res.status(500).send('Bad Request');
  }
});

export default router;
