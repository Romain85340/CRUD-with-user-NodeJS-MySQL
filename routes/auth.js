var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Se connecter'});
});

/* POST login */
router.post('/login', async function(req,res){
    let email= req.body.email;
    let password = req.body.password;
    db.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results) {
      if (error) {
        res.send("L'email n'existe pas")
      } else {
        if(results.length > 0 ){
          const comparaison = await bcrypt.compare(password, results[0].password)
          console.log(results[0]);
          if(comparaison){
              res.send("Connectez!")
          }
          else{
            res.send("L'email et le mot de passe ne corresponde pas")
          }
        }
        else{
          res.send("L'email n'existe pas");
        }
      }
      });
  })

/* GET register page */
router.get('/register', function(req, res, next) {
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