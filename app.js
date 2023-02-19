import dotenv from 'dotenv';
import mysql from 'mysql2';
import express from 'express';
import { engine } from "express-handlebars";

dotenv.config();
const app = express();

// urlencoded: using data transmitetd by post request
app.use(express.urlencoded({extended:true}));
// setting up template engine
app.engine("handlebars", engine());
app.set("view engine","handlebars");
app.set("views","./views");

// connecting to Planetsclae Database
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

app.get('/',async(req,res) => {
  res.render("home");
});

// Inserting  into table in database 
app.post('/', (req, res) => {
  const { name, address, type, bestdish, price, url } = req.body;
  console.log(price);
  const timestamp = new Date();
  connection.query('INSERT INTO restaurant (timestamp, name, address, type, bestdish, price, url) VALUES (?, ?, ?, ?, ?, ?, ?)', [timestamp, name, address, type, bestdish, price, url], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error submitting data');
    } else {
      res.redirect('/');
    }
  });
});

// using the port:8000
app.listen(8000, () => {
  console.log('Server started on port 8000');
});
