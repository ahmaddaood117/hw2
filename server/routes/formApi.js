var express = require("express");
const fileSreem = require('fs');
var router = express.Router();

var forms;

fileSreem.readFile('./form_list.json', 'utf8', (err, jsonString) => {
    if (err) {
        return
    }
    forms = JSON.parse(jsonString)
})

router.get("/", function(req, res, next) {

    res.json(forms);
});

router.get("/:id", function(req, res, next) {
    
    var id = req.params.id;
    var found  = false;

    forms.forEach(function(element){
        
        if(element.id == id){
            found = true;
        }
    });

    if(!found){
        res.json(null);
        return;
    }
    
    fileSreem.readFile('./form_id_' + id + '.json', 'utf8', (err, jsonString) => {
        if (err) {
            res.json(null);
            return;
        }
        res.json(JSON.parse(jsonString))
    })
});

module.exports = router