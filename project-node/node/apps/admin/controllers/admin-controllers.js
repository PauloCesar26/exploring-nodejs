import { db } from "../../../db/db-connection.js";

export const viewLogin = (req, res) => {
    res.render("admin/login/login", { errorUser: null, errorPassword: null });
}

export const admin = (req, res) => {
    res.render("admin/index");
}

export const makeLogin = (req, res) => {
    const { user, password } = req.body;
    const sql = "SELECT * FROM adminapp WHERE userName = ?";

    db.query(sql, [user, password], (err, result) => {
        if(err){
            console.error("Erro ao buscar user name: ", err);
            return res.status(500).send(err);
        }

        if(result.length === 0){
            return res.render("admin/login/login", { 
                errorUser: "Invalid user, please try again",
                errorPassword: null
            });
        }

        const admin = result[0];
        
        if(password !== admin.userPassword){
            return res.render("admin/login/login", { 
                errorUser: null,
                errorPassword: "Invalid password, please try again" 
            });
        }

        req.session.admin = {
            id: admin.id_admin,
            name: admin.userName
        };

        console.log("Admin:", req.session.admin);
        res.redirect("/admin");
    });
}

export const makeLogout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin");
}

export const registerUser = (req, res) => {
    const {nome , email} = req.body;
    const sql = "INSERT INTO infoUsers (nome, email) VALUES (?, ?)";

    db.query(sql, [nome, email], (err, result) => {
        if(err){
            console.error("Erro ao inserir:", err);
            return res.status(500).send(err);
        }
        else{
            res.redirect("/admin");
        }
    });
}

export const manageUsers = (req, res) => {
    const sql = "SELECT * FROM infoUsers";

    db.query(sql, (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
            return res.status(500).send(err);
        }
        else{
            res.render("admin/admin-manage/admin-user", {
                user: result
            });
        }
    });
}

export const deleteUser = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM infoUsers WHERE id = ?", [id], (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
        }
        else{
            res.redirect("/admin/manage-user");
        }
    });
}