module.exports = {

    isLoggedIn(req, res, next) { // Si el usuario está autenticado, continúa con la siguiente función
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedIn(req, res, next) { // Si el usuario no está autenticado, continúa con la siguiente función
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    }
};