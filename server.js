const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const FileUpload = require('express-fileupload')

// Mendapatkan alamat IP lokal

// const newrelic = require('newrelic');
//setting cors

let dotenv = require('dotenv');
 dotenv.config();
const corsOptions = {
  origin: 'admin.gppkcbn.org:3011', // Sesuaikan dengan origin frontend Anda
  methods: ['GET', 'POST', 'OPTIONS'], // Metode yang diizinkan
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'X-Key'], // Header yang diizinkan
  credentials: true, // Izinkan cookie atau kredensial
};

app.use(cors(corsOptions));

app.use(express.static('public'));
app.use(FileUpload());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//Static Files
app.use('/css', express.static(__dirname + 'public/css'))

//Set Templating Engine
// app.set(ejs)
// app.set('view engine', 'ejs')


// Navigation 
app.get('', (req,res) => {
    res.render('index')
})

app.use(cors());

app.use(morgan('dev'));

app.options('*', cors(corsOptions));


app.use('/', require('./router'))
app.use(function (req, res, next) {
    console.log(req.header);
    let ress = {
        code: '404',
        message: "Failed, URL tidak ditemukan",
    }
    res.status(404).send(ress);
  });
  


app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`);
})
