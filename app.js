
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const { Console, debug } = require('console');
var bodyparser = require("body-parser");
const { randomInt } = require('crypto');
var currName;

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
var gameStates;



mongoose.connect("mongodb://0.0.0.0:27017/Asteroid",{
    //useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDb Database");
}).catch(function(err){
    console.log(err);
});

var Schema = mongoose.Schema;

var GameData = new Schema({
    name:{
        type:Object,
        required:true
    },
    score:{
        type:Object,
        required:true
    }
})

var GameModel = mongoose.model('Highschore', GameData);

app.get('/getdata',function(req,res){
    console.log("Getting Data")
    GameModel.find({}).then(function(scores){
        res.json({scores});

    }).catch(function(err){
        console.error(err);
    })
})



app.use(express.static(__dirname + '/pages'));

app.get('/', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/index.html"));
    
});

app.post('/game', function(req,res){
    //res.sendFile(path.join(__dirname+"/pages/game.html"));
    console.log(req.body);
    
        
    
            res.sendFile(path.join(__dirname+"/pages/game.html"));
        
        
        currName = req.body;
    
        
  
})

app.get('/getdata',function(req,res){
    GameModel.find({}).then(function(games){
        res.json({games});

    })
});

app.post('/getscore',function(req,res){
    //console.log(req.body);
    var model = new GameModel({name:currName, score:req.body});
    //console.log(model);
    model._id = randomInt(1999);


    model = {name: currName, score:req.body};
    console.log(model);
    new GameModel(model).save();
    res.redirect('index.html');
    
})

    


app.listen(5000, function(){
    console.log("Running on port 5000");
})