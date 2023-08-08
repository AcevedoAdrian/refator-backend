import passport from 'passport';

export const passportCallCurrent = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, function (err, user, info) {
      // console.log(info);
      if (err) return next(err);
      if (!user) return res.status(401).send({ status: 'error', message: info.message ? info.message : 'NO ESTA LOGUEADO' });

      req.user = user;
      next();
    })(req, res, next);
  };
};
