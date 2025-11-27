import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import { db } from "./db/db-connection.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { adminRouter } from "./apps/admin/routes/admin-routes.js";
import { userRouter } from "./apps/user/routes/user-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

console.log("Diretório atual (__dirname):", __dirname);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({secret: 'anfdjkfjdkhfdsdgoyitgj'}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../ui"));

db.connect((err) => {
    if(err){
    console.error("Erro ao conectar no banco:", err);
    }
    else{
    console.log("Conectado ao MySQL.");
    }
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);


// Routes Log in admin
// app.get("/admin-login", (req, res) => {
//     res.render("admin/login/login", { errorUser: null, errorPassword: null });
// });

// app.post("/admin-login", (req, res) => {
//     const { user, password } = req.body;
//     const sql = "SELECT * FROM adminapp WHERE userName = ?";

//     db.query(sql, [user, password], (err, result) => {
//         if(err){
//             console.error("Erro ao buscar user name: ", err);
//             return res.status(500).send(err);
//         }

//         if(result.length === 0){
//             return res.render("admin/login/login", { 
//                 errorUser: "Invalid user, please try again",
//                 errorPassword: null
//             });
//         }

//         const admin = result[0];
        
//         if(password !== admin.userPassword){
//             return res.render("admin/login/login", { 
//                 errorUser: null,
//                 errorPassword: "Invalid password, please try again" 
//             });
//         }

//         req.session.admin = {
//             id: admin.id_admin,
//             name: admin.userName
//         };

//         console.log("Admin:", req.session.admin);
//         res.redirect("/admin");
//     });
// });

// app.get("/admin/logout", (req, res) => {
//     req.session.destroy();
//     res.redirect("/admin-login");
// });

// // routes navigation of admin {
// app.get("/admin", middlewareAuthAdmin, (req, res) => {
//     res.render("admin/index");
// });

// app.post("/admin/register-user", (req, res) => {
//     const {nome , email} = req.body;
//     const sql = "INSERT INTO infoUsers (nome, email) VALUES (?, ?)";

//     db.query(sql, [nome, email], (err, result) => {
//         if(err){
//             console.error("Erro ao inserir:", err);
//             return res.status(500).send(err);
//         }
//         else{
//             res.redirect("/admin");
//         }
//     });
// });

// app.get("/admin/manage-user", middlewareAuthAdmin, (req, res) => {
//     const sql = "SELECT * FROM infoUsers";

//     db.query(sql, (err, result) => {
//         if(err){
//             console.error("Erro ao buscar dados: ", err);
//             return res.status(500).send(err);
//         }
//         else{
//             res.render("admin/admin-manage/admin-user", {
//                 user: result
//             });
//         }
//     });
// });

// app.post("/admin/manage-user/delete/:id", (req, res) => {
//     const { id } = req.params;

//     db.query("DELETE FROM infoUsers WHERE id = ?", [id], (err, result) => {
//         if(err){
//             console.error("Erro ao buscar dados: ", err);
//         }
//         else{
//             res.redirect("/admin/manage-user");
//         }
//     })
// });
// // }

// // routes user {
// app.get("/user", (req, res) => {
//     const sql = "SELECT * FROM infoUsers";
//     console.log(sql);

//     db.query(sql, (err, result) => {
//         if(err){
//             console.error("Erro ao buscar dados: ", err);
//             return res.status(500).send(err);
//         }
//         else{
//             res.render("user/user", {
//                 user: result
//             });
//         }
//     });
// });
// // }

// app.get("/", (req, res) => {
//     res.redirect("/admin");
// });

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});