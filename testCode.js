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
          res.send("L'email n'existe pas1");
        }
      }
      });
  })