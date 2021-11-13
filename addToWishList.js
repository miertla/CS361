module.exports = function(){
    var express = require('express');
    var router = express.Router();


/* Adds a location to the users wishlist & redirects to wishList page after adding */
    router.post('/', function(req, res){
        consolelog(req.body.)
        console.log(req.body)
	/*** EDIT ***/
        var sql = "INSERT INTO wish_list (location, textDescription) VALUES (?,?)";
        var inserts = [req.body.location, req.body.paragraph1];
        sql = pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/wishList');
            }
        });
    });

    
    return router;
}();
