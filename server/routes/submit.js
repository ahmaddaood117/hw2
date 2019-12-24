var express = require("express");
const fileStreem = require('fs');
var router = express.Router();

var submittedForms = [];

fileStreem.readFile('./submitted_forms.json', 'utf8', (err, jsonString) => {
    if (err) {
        throw err;
    }
    submittedForms = JSON.parse(jsonString)
})

router.post("", function(req, res) {
    const data = req.body;

    submittedForms.push(data)
    fileStreem.writeFile('./submitted.json', JSON.stringify(submittedForms), function (err) {
        if (err) 
            throw err;
      }); 

    res.json({message : "success"});
});

module.exports = router