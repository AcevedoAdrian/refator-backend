import { Router } from 'express';
import passport from 'passport';
import { loginUser, registerUser } from '../controllers/users.controller.js';
// import { passportCall } from '../middelware/passportCall.js';
import { authorization } from '../middelware/authorization.js';
import { passportCallCurrent } from '../middelware/passportCallCurrent.js';
const router = Router();

router.get('/register', registerUser);
router.post('/register',
  // passport.authenticate(
  //   'register',
  //   {
  //     session: false,
  //     failureRedirect: '/failregister'
  //   }
  // ),
  passportCallCurrent('register'),
  async (req, res, next) => (
    res.redirect('/login')
  ));
router.get('/failregister', async (req, res) => {
  console.log('Failed Register Strategi');
  res.json({ error: 'failed' });
});

router.get('/login', loginUser);
router.post('/login',
  // passport.authenticate(
  //   'login',
  //   {
  //     session: false,
  //     failureRedirect: 'faillogin'
  //   }
  // ),
  passportCallCurrent('login'),
  async (req, res, next) => {
    if (!req.user) {
      return res.status(400).send({ status: 'error', error: 'Credencial invalida' });
    }
    // guardo el toque que tengo almacenado en el user que me mando desde passport en la cookie de forma firmada
    res.cookie(
      process.env.JWT_NAME_COOKIE,
      req.user.token,
      {
        signed: true
        // httpOnly: true //para que no sean accedidas por medio de codigo ajeno en una peticion
      }
    )
      .redirect('/api/sessions/current');
    // res.send({ status: 'success', payload: req.user });
  });

router.get('/faillogin', async (req, res) => {
  console.log(req._passport);
  console.log('Failed Register Strategi');
  res.json({ satatus: 'error', message: '/failed' });
});

// Cerrar Session
router.get('/logout', (req, res) => {
  res.clearCookie(process.env.JWT_NAME_COOKIE).redirect('/');
});

// Current
router.get('/current', passportCallCurrent('current'), authorization('user'), (req, res) => {
  if (!req.user) {
    // Si no hay usuario autenticado, retornar un mensaje de error
    return res.status(401).json({ status: 'error', error: 'No user with an active session' });
  }
  // Si hay un usuario autenticado, retornar los datos del usuario en el payload
  res.status(200).json({ status: 'success', payload: req.user });
});

// github
// Rutas para autentificacion por github
router.get(
  '/github',
  passport.authenticate('github', { session: false, scope: ['user:email'] }),
  async (req, res) => { }
);

router.get('/githubcallback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  async (req, res) => {
    console.log('Callback: ', req.authInfo);
    res.cookie(
      process.env.JWT_NAME_COOKIE,
      req.user.token,
      {
        signed: true
        // httpOnly: true //para que no sean accedidas por medio de codigo ajeno en una peticion
      }
    )
      .redirect('/api/sessions/current');
    // req.session.user = req.user;
    // console.log('User session: ', req.session.user);
    // res.redirect('/');
  }
);

export default router;
