const
  express = require('express'),
  app = express(),
  path = require('path'),
  helmet = require('helmet'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cookieSession = require('cookie-session'),
  expressNunjucks = require('express-nunjucks'),
  config = require('config'),
  mongoose = require('mongoose'),
  errorhandler = require('errorhandler');

const
  env = process.env.NODE_ENV || 'development',
  isDev = env === 'development';

app.use(helmet());
app.use(bodyParser.json());

// db connection
mongoose.connect(config.get('db').host, { useNewUrlParser: true }, (err) => {
  if (err) return console.log(`Failed to connect to ${env} db`);
});

// View Engine Init
app.set('views', path.join(__dirname, './client/views'));
app.use(cookieSession({
  name: '0293jf92hf34ingnwoer',
  keys: ['2jf0249jg034g', '0493jg3i4g3443ngng'],
}));

expressNunjucks(app, {
  watch: isDev, noCache: isDev,
});

// Parser & Cookies Init
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Init Public Folder
app.use(express.static(path.join(__dirname, './client/assets')));

// Resources init
const
  auth = require('./server/auth/auth.router'),
  general = require('./server/general/general.route');

// endpoints init
app.use('/auth', auth);
app.use('/', general);

// Error Handler Init
if (isDev) {
  app.use(errorhandler());
} else {
  app.use((_, res) => {
    res.render('Auth/error');
  });
  app.use((err, _, res) => {
    res.status(err.status || 500);
    console.log(err);
    res.render('Auth/error');
  });
}

module.exports = app;
