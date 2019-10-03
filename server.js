/* eslint-disable no-console */
const express = require('express');
const chalk = require('chalk');
// const faker = require('faker');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const server = express();
const PORT = 7070;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'maillist_db',
});

server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM users', (err, data) => {
    if (err) throw err;
    // res.send(`Junte se à ${data[0].count} pessoas e receba nossa MafiMail`);
    res.render('index', {
      count: data[0].count,
    });
  });
});

server.post('/register', (req, res) => {
  const person = {
    email: req.body.email,
  };
  connection.query('INSERT INTO users SET ?', person, (err, data) => {
    if (err) throw err;
    res.redirect('/');
  });
});

server.listen(PORT, () => {
  console.log(`\n Servidor Ativo: ${chalk.bgGreen(`Porta ${PORT}`)}\n`);
});

// const tableData = [];
// for (let i = 0; i < 100; i++) {
//   tableData.push([
//     `${faker.name.firstName()} ${faker.name.lastName()}`,
//     faker.internet.email(),
//     faker.address.streetAddress(),
//     faker.address.city(),
//     faker.address.country(),
//     faker.date.past(),
//   ]);
// }

// connection.query('INSERT INTO users (name, email, street, city, country, member_since) VALUES ?',
//   [tableData], (err, data) => {
//     if (err) throw err;
//     console.log(`Resultado: ${data}`);
//   });
// connection.end();

// server.get('/', (req, res) => {
//   res.send(`<div style="font-family:monospace;">
//     <h2>${faker.name.firstName()} ${faker.name.lastName()}</h2>
//     <h3>${faker.internet.email()}</h3>
//     <h3>${faker.address.streetName()}, ${Math.round(faker.random.number() / 100)}</h3>
//     <h4>${faker.address.city()} - ${faker.address.country()}</h4>
//     <h5>${faker.date.past()}</h5>
//     </div>`);
// });
