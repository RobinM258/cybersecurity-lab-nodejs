import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'robin',   
  password: 'a', 
  database: 'cyber_test'
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/inscription', async (req, res) => {
    const { username, email } = req.body;

    const sql = "INSERT INTO users (username, email) VALUES (?, ?)";
    
    console.log("Exécution : ", sql);

    try {
      await db.execute(sql, [username, email]);
        res.send(`<h1>Succès ! ${username} a été ajouté.</h1><a href="/">Retour</a>`);
    } catch (err) {
        res.status(500).send("Erreur MariaDB : " + err.message);
    }
});

app.listen(3000, () => {
    console.log('Serveur Express lancé sur http://127.0.0.1:3000');
});