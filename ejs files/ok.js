const express = require('express')
const app = express()
const admin = require('firebase-admin');
const serviceAccount = require('./itachi.json'); 
var passwordHash = require("password-hash");
const bodyParser = require('body-parser')
const ejs = require('ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  const db = admin.firestore();
  app.use(express.static(__dirname + '/html page/'));
  app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('homepage');
});
app.get('/organizations', function (req, res) {
  res.sendFile(__dirname+"/html page/"+"org.html")
});
app.get('/companies', function (req, res) {
  res.sendFile(__dirname+"/html page/"+"com.html")
});
app.post('/homepage', function (req, res) {
    db.collection('zoro').add({
        name:req.body.Name,
        Password:req.body.Password,
       Email:req.body.Email
    }).then(()=>{
    res.sendFile(__dirname+"/html page/"+"login.html")
    })
  });
  app.post('/companies', function (req, res) {
    db.collection('companies').add({
        name:req.body.Name,
        Password:req.body.Password,
       Email:req.body.Email
    }).then(()=>{
    res.sendFile(__dirname+"/html page/"+"login.html")
    })
  });
  app.post('/org', function (req, res) {
    db.collection('org').add({
        name:req.body.Name,
        Password:req.body.Password,
       Email:req.body.Email
    }).then(()=>{
    res.sendFile(__dirname+"/html page/"+"login.html")
    })
  });
  app.get('/login',function(req,res){
    res.sendFile(__dirname + "/html page/"+"login.html");
  });
  app.post('/afterSubmit', (req, res) => {
      db.collection('zoro')
        .where("Email", "==", req.body.Email)
        .where("Password", "==", req.body.Password)
        .get()
        .then((docs) => {
          if (docs.size > 0) {
            res.sendFile(__dirname + "/html page/"+"s.html");
          } else {
            res.send("Failed, Please sign up first");
          }
        })
        .catch(error => {
          res.status(500).send("Error occurred during login");
        });
    });
    
app.listen(3003);