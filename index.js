const express = require("express");
const app = express();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const hashedPassword = require('./middlewares/hashPassword');
const port =3000;
const db = require('./db');
const { where } = require("sequelize");
const { generateToken } = require("./middlewares/authService");


app.use(express.json());

db.sync();
app.get("/",(req,res)=>{
    res.send("Hello world!");

});

app.post('/register',
 hashedPassword,
 async(req,res) =>{
    const user = await User.create(
        {...req.body });
    res.send(user);
});

app.post('/login',async(req,res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if(!user) {
        return res.status(401).send("invalid ameil or password");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch) {
        return res.status(401).send("invalid ameil or password");
    }
    const token = generateToken(user.dataValues);
    delete user.dataValues.password;
    res.send({user,token});
});

app.listen(port,() => {
    console.log(`app on http://localhost:${port}`);
});