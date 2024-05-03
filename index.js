const express = require("express");
const app = express();
const bcrypt = require ('bcrypt');
const User = require('./models/User');
const port =3000;
const db = require('./db');


app.use(express.json());

db.sync();
app.get("/",(req,res)=>{
    res.send("Hello world!");

});

app.post('/register', async(req,res) =>{
    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    res.send(user);
});

app.listen(port,() => {
    console.log(`app on http://localhost:${port}`);
});