const bcrypt = require('bcryptjs');// Añade la importación de bcrypt
const connection = require('../conexion');



const getIndex = (req, res) => {
    res.render('index',{ mensaje: '' });
};

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = 'SELECT * FROM customers WHERE email = ?';
    
    console.log(password);
    console.log(results[0].password);

    connection.query(query, [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            // Verificar si la contraseña coincide utilizando bcrypt.compare()
            const validPassword = bcrypt.compare(password, results[0].password);
                if (validPassword) {
                    req.session.loggedIn = true; // Establece la sesión como iniciada
                    req.session.email = email; // Guarda el nombre de usuario en la sesión
                    res.redirect('/'); // Redirige al usuario al panel de control (dashboard)
                } else {
                    res.render('index', { mensaje: 'Contraseña inválida' });
                }
   
        } else {
            res.render('index', { mensaje: 'Usuario no valido' }); // Redirige al usuario de vuelta al formulario de inicio de sesión con un mensaje de error
        }
    
    });
};


const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        
        res.redirect('/');
    });
};

const getDashboard = (req, res) => {
    if (req.session.loggedIn) {
     res.render('dashboard', { username: req.session.username });
 } else {
     res.render('error');
 }
 };

 const postRegister = async (req, res) => {
    //const url = req.body;
    const { name, email, username, password, birth_date, gender } = req.body;
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery ='INSERT INTO customers (name, email, nick, password, birth_date, gender) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, email, username, hashedPassword, birth_date, gender];
    console.log(req.body);
    // Ejecutar la consulta INSERT
    connection.query(insertQuery, values, function(error, results, fields) {
    if (error) {
        console.error('Error al insertar usuario:', error);
        return;
    }
    //console.log('Usuario insertado correctamente');
    res.render('index',{ mensaje: 'Usuario registrado' });
    });
};

 
 const postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = 'SELECT * FROM customers WHERE email = ?';

    connection.query(query, [email], (err, results) => {

        if (err) throw err;
        if (results.length > 0) {
            // Verificar si la contraseña coincide utilizando bcrypt.compare()
            const validPassword = bcrypt.compare(password, results[0].password);
                if (validPassword) {
                    req.session.loggedIn = true; // Establece la sesión como iniciada
                    req.session.email = email; // Guarda el nombre de usuario en la sesión
                    
                    res.render('index', { mensaje: 'Bienvenido' }); // Redirige al usuario al panel inicio (index)
                    
                } else {
                    res.render('index', { mensaje: 'Contraseña inválida' });
                    
                }
   
        } else {
            res.render('index', { mensaje: 'Correo no valido' }); // Redirige al usuario de vuelta al formulario de inicio de sesión con un mensaje de error
        }
    
    });
};

const getRegistro = (req, res) => {
    res.render('registro');
};

const getComentarios = (req, res) => {
    res.render('comentarios',{ username: req.session.username });
};
/*
const getpublicaciones = (req, res) => {
    res.render('publicaciones',{ username: req.session.username });
}; */

const getError = (req, res) => {
    res.render('error');
};

const getPerfil = (req, res) => {
    const username = req.session.username;
    const mensaje = req.query.mensaje;
    // Consulta SQL para obtener los datos del perfil del usuario
    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    connection.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error al obtener datos del perfil:', err);
            res.status(500).send('Error al obtener datos del perfil');
            return;
        }
        const usuario = results[0];

        // Comprobar si se encontraron resultados
        if (results.length > 0) {
            // Renderizar la plantilla 'perfil' con los datos del usuario
            
            const sqlseguidores = 'select count(*) from usuarios u inner join seguimiento s on s.seguidor_id = u.id where u.username = ?';
            connection.query(sqlseguidores, [username], (err, results) => {
                if (err) {
                    console.error('Error al obtener datos:', err);
                    res.status(500).send('Error al obtener datos');
                    return;
                }
                const seguidos = results[0]['count(*)'];

            const sqlseguidos = 'select count(*) from usuarios u inner join seguimiento s on s.seguido_id  = u.id where u.username  = ?';
            connection.query(sqlseguidos, [username], (err, results) => {
                if (err) {
                    console.error('Error al obtener datos:', err);
                    res.status(500).send('Error al obtener datos');
                    return;
                }
                const seguidores = results[0]['count(*)'];
                res.render('perfil', { username, usuario, seguidos, seguidores, mensaje});
                });
            });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    });
};

// Exporta las funciones y el enrutador
module.exports = {
    getIndex,
    login,
    logout,
    getDashboard,
    postLogin,
    getRegistro,
    getComentarios,
 //   getpublicaciones,
    postRegister,
    getError,
    getPerfil

};