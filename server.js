// VARIAVEIS DE AMBIENTE
require('dotenv').config();

// SERVIDOR 
const express = require('express');
const app = express();

// ARQUITETURA PARA O BANCO DE DADOS
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.emit('ready'))
  .catch(e => console.log(`Erro na conexão: ${e}`));

// COOKIES E SALVAMENTOS
const session = require('express-session');
const MongoStorage = require('connect-mongo')(session);
const flash = require('connect-flash');

// CAMINHOS E ROTAS
const routes = require('./routes');
const path = require('path')

// SEGURANÇA
const helmet = require('helmet');
const csp = require('helmet-csp');
const csrf = require('csurf');
app.use(helmet());
app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'","'unsafe-inline'" ,'unpkg.com', 'cdn.jsdelivr.net', 
    'fonts.googleapis.com', 'use.fontawesome.com'],
    scriptSrc: ["'self'","'unsafe-inline'",'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', "'unsafe-eval'"],
    fontSrc:["'self'",'fonts.googleapis.com', 'fonts.gstatic.com'],
    imgSrc: ["'self'",'https:', 'data:']
  },
  reportOnly:false
  })
);

// MIDDLEWARES
const { csrfMiddleware, checkCSRFError, errorVariable } = require('./src/middlewares/globalMiddleware');

// POSTAGEM DE FORMULÁRIO
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ARQUIVOS ESTATICOS QUE DEVEM SER ACESSADOS DIRETAMENTE
app.use(express.static(path.resolve(__dirname, 'public')));

// CONFIGURAÇÕES DE SESSÃO
const sessionOptions = session({
  secret: 'mirapalheta',
  store: new MongoStorage({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

// PAGINAS HTML - EJS
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs'); // engine para renderizar html

app.use(csrf());

// USAR MIDDLEWARES
app.use(csrfMiddleware);
app.use(checkCSRFError);
app.use(errorVariable);

app.use(routes);

// LISTENER APÓS CONECTAR NO BANCO DE DADOS
app.on('ready', () => {
  app.listen(5500, () => console.log("Servidor rodando na porta 5500: http://localhost:5500"))
});