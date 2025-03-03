const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

// Inicializamos express
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // __dirname es una variable global que nos da la ruta del archivo actual
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // __dirname/views/layouts
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // Para que el servidor entienda los datos que vienen de los formularios, pero simples, no imágenes ni archivos
app.use(express.json()); // Para que el servidor entienda JSON

// Variables globales
app.use((req, res, next) => {

    next();
});

// Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links')); // ✅ Esto agrega el prefijo "/links"


// Archivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});