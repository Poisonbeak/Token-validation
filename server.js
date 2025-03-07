const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config();        // importa la configurazione del file .env inn un oggetto chiamato "process"

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.post("/user/generateToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data  = {
            time: Date(),
            userId: 123,
        }

        const token = jwt.sign(data, jwtSecretKey);
        // console.log(token);
        // console.log(typeof(token));
        
        res.send(JSON.stringify(token));
})

app.get("/user/validateToken", (req, res) => {
    // i token vengono passati nell'header per questioni di sicurezza

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;  // personal_token_header_key
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);   // recupera il token dall'header

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send(JSON.stringify("Successfully verified!"));
        } else {
            // accesso negato
            return res.status(401).send(error);
        }
    } catch (error) {
        // accesso negato
        return res.status(401).send(error);
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

