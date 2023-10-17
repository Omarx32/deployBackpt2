const express = require('express');
const passports = require('passport');
const router = express.Router();

// Importa tu estrategia de autenticación de Google
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configura la estrategia de Google
passports.use(new GoogleStrategy({
  clientID: 'http://902896206427-shmr10e6fc339m9bkio8b92rke5ov5ou.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Lógica para manejar el perfil del usuario.
  // Normalmente, crearías un usuario en tu base de datos si no existe y lo devolverías
  // Llama a done() con el usuario para finalizar el proceso de autenticación.
  return done(null, profile);
}));

// Serialización del usuario (para almacenar en la sesión)
passports.serializeUser((user, done) => {
  done(null, user);
});

// Deserialización del usuario (para recuperar de la sesión)
passports.deserializeUser((user, done) => {
  done(null, user);
});

// Ruta para iniciar sesión con Google
router.get('/auth/google',
  passports.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Ruta de retorno después de iniciar sesión con Google
router.get('/auth/google/callback',
  passports.authenticate('google', {
    failureRedirect: '/' // Redirige en caso de fallo de autenticación
  }),
  (req, res) => {
    // Si la autenticación es exitosa, redirige a la página de inicio
    res.redirect('/home');
  }
);

module.exports = {router,passports};
