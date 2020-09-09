var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', (req, res) => {
  let user = "SELECT id, email FROM users;"

  db.query( user, (err, result) => {
      console.log(result);
      if (err) {
          return res.status(500).send(err);
      }
       res.render("index", {
           users: result
      })
  })
}
);

/* DELETE users in list */
router.delete('/list/delete/:id', (req, res) => {
  let id = req.params.id
  let deleteUser = "DELETE FROM users WHERE id = '" + id +"';"

  db.query( deleteUser, (err, result) => {
    console.log(result);
    if (err) {
        return res.status(500).send(err);
    }
    res.redirect("/users/list")
})

})

/* GET users edit */

router.get('/edit/:id', (req, res) => {
  let id = req.params.id
  let users = "SELECT id, email, password FROM users WHERE id = '" + id + "'"

  db.query( users, (err, result) => {
    console.log(result);
    if (err) {
        return res.status(500).send(err);
    }
     res.render("edit", { users: result[0] })
})
});

module.exports = router;
