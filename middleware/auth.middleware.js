module.exports = async (req, res, next) => {
    const idSession = req.session.userId
    
    try {
        const query = await query("SELECT id FROM users WHERE id = '" + idSession + "'")
        if(query.length > 0){
            next();
        } else {
            res.redirect("/auth/login")
        }
    } catch(err){
        res.send(err)
    }
}
        // if(idSession.length > 0){
        //     try {
        //         const query = await query("SELECT id FROM users WHERE id = '" + idSession +  "'")
        //         if(query.length){
        //             next();
        //         }
        //     } catch(err) {
        //         res.send(err)
        //     }
            
        // } else {
        //     res.redirect("/auth/login")
        // }
            
        // // if(querylength > 0)