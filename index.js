// let express = require("express")
// let app = express()
// const serveStatic = require('serve-static');
// const path = require('path');


// const publicPath = path.join(__dirname, 'template/assets'); // Update the path accordingly



// const port = 3000;

// app.set("view engine", "ejs"); 
// app.use(serveStatic(publicPath));

// app.use(express.static(path.join(__dirname, 'template/assets'), {
//     setHeaders: (res, path) => {
//         if (path.endsWith('.css')) {
//             res.setHeader('Content-Type', 'text/css');
//         }
//     }
// }));


// app.use(express.urlencoded({extended:true}));
// // app.use(express.static(__dirname, 'assets' ));


// app.get('/', (req, res) => { 
//     res.render('index');
// })

// app.listen(port, () => console.log("I am listening"));

// second attempt


// const express = require("express");
// const app = express();
// const path = require('path');
// const serveStatic = require('serve-static');

// const publicPath = path.join(__dirname, 'template/assets/css/');

// const port = 3000;

// app.set("view engine", "ejs");
// app.use(serveStatic(publicPath));

// app.use(express.static(path.join(__dirname, 'template/assets/css/'), {
//     setHeaders: (res, path) => {
//         if (path.endsWith('.css')) {
//             res.setHeader('Content-Type', 'text/css');
//         }
//     }
// }));


// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.listen(port, () => console.log("Server is listening on port", port));

// try 3


// const express = require("express");
// const app = express();
// const path = require('path');

// const publicPath = path.join(__dirname, 'template/assets'); // Specify the root of your assets

// const port = 3000;

// app.set("view engine", "ejs");

// // Serve static files from the 'template/assets' directory
// app.use(express.static(publicPath, {
//     setHeaders: (res, path) => {
//         if (path.endsWith('.css')) {
//             res.setHeader('Content-Type', 'text/css');
//         }
//     }
// }));

// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.listen(port, () => console.log("Server is listening on port", port));

// try 4
const express = require("express");
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, 'template/assets');

const port = 3000;

app.set("view engine", "ejs");

// Serve static files from the 'template/assets' directory
app.use(express.static(publicPath, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use(express.urlencoded({ extended: true }));

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
// }));

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.RDS_HOSTNAME || 'localhost',
        user: process.env.RDS_USERNAME || 'postgres',
        password: process.env.RDS_PASSWORD || '6EzP9PwM',
        database: process.env.RDS_DB_NAME || 'passwords',
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
    }
})

// unsecured initial route but works
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// app.get('/', (req, res) => { 
//     res.render('index', { loggedIn: req.session.loggedIn || 'false' });
// })
// ​
// app.post('/', (req, res) => {
//     req.session.loggedIn = 'false';
//     res.render('loginPage', { loggedIn: req.session.loggedIn || 'false' })
// })

// app.post('/loginPage', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     knex.select('password').from('logininfo').where('username', username).then( results => {
//         if (results.length > 0)
//         {
//             if (password === results[0].password)
//             {
//                 req.session.loggedIn = 'true';
//                 res.redirect('/displayLogininfo');
//             }
//             else
//             {
//                 req.session.loggedIn = 'password';
//                 res.redirect('/displayLogininfo');
//             }
//         }
//         else 
//         {
//             req.session.loggedIn = 'username';
//             res.redirect('/displayLogininfo');
//         }
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({err});
//     });
// })
// ​
// ​
// app.get('/displayLogininfo', (req, res) => {
//     let loggedIn = req.session.loggedIn || 'false';
//     knex.select().from('logininfo').then( logininfo => {
//         res.render('displayLogininfo', {mylogininfo : logininfo, loggedIn: loggedIn})
//     })
// });
// ​
// app.get("/addUser", (req, res) => {
//     let loggedIn = req.session.loggedIn || 'false';
//     res.render('addUser', {loggedIn: loggedIn});
// });
// ​
// app.post('/addUser', (req, res) => {
//     knex('logininfo').insert(req.body).then(mylogininfo => {
//         res.redirect('/displayLogininfo');
//     })
// });
// ​
// app.get("/editUser/:user_id", (req, res) => {
//     let loggedIn = req.session.loggedIn || 'false';
//     let user_id = req.params.user_id;
//     knex.select('user_id', 'username', 'password').from('logininfo').where('user_id', user_id).then(logininfo => {
//         res.render('editUser', {mylogininfo : logininfo, loggedIn: loggedIn});
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({err});
//     });
// });
// ​
// app.post("/editUser", (req, res) => {
//     knex("logininfo").where("user_id", parseInt(req.body.user_id)).update({
//         username: req.body.username,
//         password: req.body.password
//     }).then(mylogininfo => {
//         res.redirect("/displayLogininfo");
//     });    
// }); 
// ​
// app.post('/deleteUser/:id', ( req, res) => {
//     knex('logininfo').where('user_id', req.params.id).del().then(mylogininfo => {
//         res.redirect('/displayLogininfo');
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({err});
//     })
// });








app.listen(port, () => console.log("Server is listening on port", port));

