module.exports = function(){
    const express = require('express');
    const router = express.Router();

    router.get('/', function(req, res){
// function to display all locations in wish_list table
  //  showLocations = () => {
        let wishListLocations = '';
        pool.query("SELECT * FROM wish_list", (err, res) => {
          console.log(err, res);
        });
        return wishListLocations;
        }
    }

    return router;
}();
