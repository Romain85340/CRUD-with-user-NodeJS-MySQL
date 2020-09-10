var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

// Middleware
const verifyAuth = require("../middleware/auth.middleware")

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Se connecter'});
});

/* POST login */
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query('SELECT email, password, roleId, id FROM users WHERE email= ?', [email], (err, result) => {
      if (err || result.length === 0) {
          console.log("result :", result);
          return res.status(401).json({
              error: `Vous n'êtes pas inscrit`
          });
      } else {
          bcrypt.compare(password, result[0].password, (err, success) => {
              if (err) {
                  return res.status(401).json({
                      error: `Mot de passe incorrect`
                  });
              }
              if (success) {
                  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, result[0].password], function (err, results) {
                      if (results.length) {
                          req.session.loggedin = true;
                          req.session.userId = result[0].id;
                          req.session.role = result[0].roleId;
                          // console.log(result[0]);
                          res.redirect('/users/list'); console.log("req.session :", req.session)
                      } else {
                          res.send(err)
                      }
                  });
              } else {
                  res.send('Email ou mot de passe incorrect !');
              }
          })
      }
  })
});

/* GET register page */
router.get('/register', verifyAuth, function(req, res, next) {
    res.render('register', {title: "S'inscrire"});
});

/* POST register page */
router.post('/register', async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    const emailQuery = "SELECT email FROM users WHERE email = '" + email + "';"

    try {
        const resultEmail = await query(emailQuery)
        if(resultEmail.length > 0){
            // res.render("register", {message: "Le compte existe déjà"})
            res.send("Le compte existe deja")
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                await query ("INSERT INTO users (email, password, roleId) VALUES (?, ?, 2);", [email, hash]);
                res.send("compte cree")
            })          
        }
    } catch(err) {
        res.send(err)
    }
});

module.exports = router;