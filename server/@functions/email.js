const
  config = require('config'),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport');

exports.send = (data) => {
  try {
    nodemailer.createTransport(smtpTransport({
      host: config.get('email.host'),
      port: config.get('email.port'),
      auth: {
        user: config.get('email.user'),
        pass: config.get('email.pass'),
      },
      tls: { rejectUnauthorized: false },
      debug: true,
    })).sendMail({
      from: config.get('email.from'),
      to: data.target,
      subject: data.sub,
      html: data.msg,
    }, (err, info) => {
      if (err) console.log(err);
      console.log(info);
    });
  } catch (err) { console.log(err); }
  return true;
};
