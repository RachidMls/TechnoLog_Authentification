// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

// Gestion Files System
let fs = require('fs'),
    path = require('path');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// ------------------------
// ROUTES RESOURCES
// ------------------------
// --- Base de donnees
let mongoose = require('mongoose');

let database  = mongoose.connect("mongodb://localhost/database",{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
});

// --- Definition du models
//--- Module dependencies
const Schema = mongoose.Schema;

//Ressource shema ->

let CompteSchema = new Schema({
    nom      : String,
    login		: String,
    mdp     : String
});

let LogCoShema = new Schema({
	date : Date,
	user : CompteSchema,
	acces : Boolean
})


mongoose.model('Compte', CompteSchema);

app.get('/compte',(req, res)=>{
	let Compte = mongoose.model('Compte')
	Compte.find({}).then((result)=>{
            res.status(200).json(result)
        },(err)=>{
            res.status(400).json(err)
        })
})

app.post('/compte',(req, res)=>{
	let Compte = mongoose.model('Compte');
	let myCompte = new Compte(req.body);
        myCompte.save().then((result)=>{
            res.status(200).json(myCompte)
        },(err)=>{
            res.status(400).json(err)
        })
})

app.get('/compte/:loginCompte',(req, res)=>{
	let Compte = mongoose.model('Compte')
	var query = { login : loginCompte }
	Compte.find(query).then((result)=>{
            res.status(200).json(result)
        },(err)=>{
            res.status(400).json(err)
        })
})

app.put('/compte/:loginCompte',(req, res)=>{
	res.status(200).json()
})

app.delete('/compte/:loginCompte',(req, res)=>{
	let Compte = mongoose.model('Compte')
	var query = { login : loginCompte }
	Compte.remove(query).then((result)=>{
            res.status(200).json(result)
        },(err)=>{
            res.status(400).json(err)
        })
})

// ------------------------
// START SERVER
// ------------------------
app.listen(3000,function(){
    console.info('HTTP server started on port 3000');
});