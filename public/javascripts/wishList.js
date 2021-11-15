module.exports = function(){
    const express = require('express');
    const router = express.Router();

    router.get('/get-data', (req, res) => {
// function to display all locations in wish_list table
        pool.query('SELECT * FROM wish_list', (err, res) => {
        if (err){
            console.error(err);
            res.send("Error " + err);
        }
        pool.end();
        res.render('/wishList', { wish_list: res.rows });
      });
    })
        
        

    return router;
}();
