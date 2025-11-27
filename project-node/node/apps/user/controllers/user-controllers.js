import { db } from "../../../db/db-connection.js";

export const user = (req, res) => {
    const sql = "SELECT * FROM infoUsers";
    console.log(sql);

    db.query(sql, (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
            return res.status(500).send(err);
        }
        else{
            res.render("user/user", {
                user: result
            });
        }
    });
}