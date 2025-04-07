const { StatusCode, StatusMessage } = require("../config/StatusCode")
const db = require("../config/Database.js")
const SqlQuery = require("../config/SqlQuery.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");


class AccountController {

    //Multipart API - Upload Image
    static async upload(req, res) {
        if (!req.account.id) {
            return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
        }
        const photo = req.file ? req.file.filename : null;
        if (!photo) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const photoUrl = `/uploads/accounts/${photo}`;
            await db.query(SqlQuery.uploadPhoto, [photoUrl, req.account.id]);
            return res.status(StatusCode.OK).json({
                "url": photoUrl
            });
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // POST API - Register Account
    static async register(req, res) {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const params = [firstName, lastName, email, hashedPassword];

            const [result] = await db.query(SqlQuery.createAccount, params);
            if (!result.insertId) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            const generatedToken = jwt.sign(
                { id: result.insertId, email: email },
                process.env.JWT_SECRET
            );
            return res.status(StatusCode.Created).send(generatedToken);
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // GET API - Get Account
    static async detail(req, res) {
        if (!req.account.id) {
            return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
        }
        try {
            const [results] = await db.query(SqlQuery.getAccountViaId, req.account.id);
            if (results.length == 0) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            return res.status(StatusCode.OK).json(results[0]);
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // PUT API - Set Account
    static async update(req, res) {
        if (!req.account.id) {
            return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
        }
        const { firstName, lastName } = req.body;
        if (!firstName || !lastName) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const params = [firstName, lastName, req.account.id];
            await db.query(SqlQuery.updateAccount, params);
            return res.status(StatusCode.NoContent).end();
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // POST API - Login Account
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }

        try {
            const [results] = await db.query(SqlQuery.getAccountViaEmail, email);
            if (results.length == 0) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            let account = results[0];
            const isMatch = await bcrypt.compare(password, account.password);
            if (!isMatch) {
                return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized })
            }
            const generatedToken = jwt.sign(
                { id: account.id, email: account.email },
                process.env.JWT_SECRET
            );
            return res.status(StatusCode.OK).send(generatedToken);
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // DELETE API - Delete Account
    static async delete(req, res) {
        const id = req.account.id;
        const { password } = req.body;
        if (!id || !password) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }

        const connect = await db.getConnection();
        try {
            await connect.beginTransaction();
            const [results] = await connect.query(SqlQuery.getAccountViaId, id);
            if (results.length > 0) {
                let account = results[0];
                const isMatch = await bcrypt.compare(password, account.password);
                if (!isMatch) {
                    res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized })
                }
                await connect.query(SqlQuery.deleteAccount, id);
                if (account.photo) {
                    const filePath = path.join(__dirname, `../..${account.photo}`);
                    console.log(`File Path: ${filePath}`);
                    if (fs.existsSync(filePath)) {
                        console.log('File Path: Exists');
                        fs.unlinkSync(filePath);
                    }
                }
                res.status(StatusCode.NoContent).end();
            } else {
                res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            await connect.commit();
        } catch (error) {
            res.status(StatusCode.InternalServerError).json({ error: error.message });
            await connect.rollback();
        } finally {
            connect.release();
        }
    }

    // POST API - Change Account Password
    static async changePassword(req, res) {
        if (!req.account.id) {
            return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
        }
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        const connect = await db.getConnection();
        try {
            await connect.beginTransaction();
            const [results] = await connect.query(SqlQuery.getAccountViaId, req.account.id);
            if (results.length > 0) {
                let account = results[0];
                const isMatch = await bcrypt.compare(currentPassword, account.password);
                if (isMatch) {
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    await connect.query(SqlQuery.updatePassword, [hashedPassword, req.account.id]);
                    res.status(StatusCode.NoContent).end();
                } else {
                    res.status(StatusCode.UnAuthorized).json({ error: "Password Mismatch" });
                }
            } else {
                res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
            }
            await connect.commit();
        } catch (error) {
            res.status(StatusCode.InternalServerError).json({ error: error.message });
            await connect.rollback();
        } finally {
            connect.release();
        }
    }
}

module.exports = AccountController;