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
app.use(express.static("./../ui/user/public"));

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

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});