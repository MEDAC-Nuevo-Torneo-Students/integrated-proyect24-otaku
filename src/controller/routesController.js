const getIndex = (req, res) => {
    res.render('index',{ mensaje: '' });
};

const getLogin = (req, res) => {
    res.render('login',{ mensaje: '' });
};

const getSignup = (req, res) => {
    res.render('signup',{ mensaje: '' });
};

const getShop = (req, res) => {
    res.render('shop',{ mensaje: '' });
};

const getCart = (req, res) => {
    res.render('cart',{ mensaje: '' });
};

// Exporta las funciones y el enrutador
module.exports = {
    getIndex,
    getLogin,
    getSignup,
    getShop,
    getCart

};