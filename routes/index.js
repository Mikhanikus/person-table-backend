var express = require('express');
const {db} = require("../database/db");
var router = express.Router();
var cors = require('cors')
router.all('*', cors())

var allowlist = ['https://person-table-test.herokuapp.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

router.get('/api', cors(corsOptionsDelegate), async function(req, res) {
  if (Object.keys(req.body).length === 0) {
    db(`SELECT * FROM person;
`).then((value) => res.send(value))
  }
  else {
    db(`SELECT * FROM person WHERE id=${req.body.id};
`).then((value) => res.send(value))
  }

});/**/
router.post('/api', cors(corsOptionsDelegate), function(req, res) {
  // /*res.render('index', { title: 'Express' });*//*/?*/INSERT INTO table_name(column1, column2, …)
  db(`INSERT INTO "person"(name, age, education, occupation) VALUES('${req.body.name}', '${req.body.age}', '${req.body.education}', '${req.body.occupation}') RETURNING *;
`).then((value) => res.send(value))

});/**/
router.put('/api', cors(corsOptionsDelegate), function(req, res) {
  db(` UPDATE "person"
  SET name = '${req.body.name}',
      age = '${req.body.age}',
      education = '${req.body.education}',
      occupation ='${req.body.occupation}'
  WHERE id=${req.body.id} RETURNING *;
`).then((value) => res.send(value))
});/**/


/* GET home page. */
router.delete('/api',cors(corsOptionsDelegate), function(req, res) {
  // /*res.render('index', { title: 'Express' });*//*/?*/
  db(`DELETE FROM person WHERE id=${req.body.id} RETURNING *;
`).then(() => res.send("success"))
});/**/

module.exports = router;
