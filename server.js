const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');

var app = express();

var hbs = exphbs.create({ helpers: {
        currentYear: new Date().getFullYear(),
        screamIt: (text)=>{
          return text
        }
    },
    defaultLayout: 'main',
    extname: '.hbs'
});


app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to file');
    }
  });
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance')
// })

app.get('/', (req, res) => {
  res.render('home',{
    welcomeMsg : "Welcome to my website",
  })
});

app.get('/about', (req, res) => {
  res.render('about',{
    msg:"About Us",
  });
})

app.listen(3000, ()=> {
  console.log('Listening at port 3000');
});
