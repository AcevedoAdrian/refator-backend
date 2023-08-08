import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import connectMongoDB from './config/db.js';
import initializePassport from './config/passport.config.js';
import usersRouter from './routes/users.route.js';
import productsRouter from './routes/products.router.js';

// VARIABLE DE ENTORNOS
dotenv.config({ path: '.env' });

const app = express();

// Para manejar json las peticiones
app.use(express.json());
// Cuando envias los datos por un formulario de una vista
app.use(express.urlencoded({ extended: true }));

connectMongoDB();
// Para reconocer los datos staticos
app.use(express.static(__dirname + '/public'));

// CONFIGURACION PLANTILLAS HANDLEBARS
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(cookieParser(process.env.COOKIE_PRIVATE_KEY));
initializePassport();
app.use(passport.initialize());
// app.use(passport.session());
// CONEXION A BASE DE DATOS MONGO
app.get('/', (req, res) => res.json({ Hola: 'hola' }));
app.use('/api/sessions', usersRouter);
app.use('/api/products', productsRouter);

app.listen(9000, () => {
  console.log('Server up');
});
