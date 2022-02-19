var express = require('express');
const {db} = require("../database/db");
const cors = require('cors')
var router = express.Router();

const corsOptions = {
  origin: 'https://person-table-test.herokuapp.com',
  optionsSuccessStatus: 200
}

router.get('/api', cors(corsOptions), async function(req, res) {
  if (Object.keys(req.body).length === 0) {
    db(`SELECT * FROM person;
`).then((value) => res.send(value))
  }
  else {
    db(`SELECT * FROM person WHERE id=${req.body.id};
`).then((value) => res.send(value))
  }

});/**/
router.post('/api', cors(corsOptions), function(req, res) {
  // /*res.render('index', { title: 'Express' });*//*/?*/INSERT INTO table_name(column1, column2, …)
  db(`INSERT INTO "person"(name, age, education, occupation) VALUES('${req.body.name}', '${req.body.age}', '${req.body.education}', '${req.body.occupation}') RETURNING *;
`).then((value) => res.send(value))

});/**/
router.put('/api', cors(corsOptions), function(req, res) {
  db(` UPDATE "person"
  SET name = '${req.body.name}',
      age = '${req.body.age}',
      education = '${req.body.education}',
      occupation ='${req.body.occupation}'
  WHERE id=${req.body.id} RETURNING *;
`).then((value) => res.send(value))
});/**/


/* GET home page. */
router.delete('/api', cors(corsOptions), function(req, res) {
  // /*res.render('index', { title: 'Express' });*//*/?*/
  db(`DELETE FROM person WHERE id=${req.body.id} RETURNING *;
`).then(() => res.send("success"))
});/**/

module.exports = router;
