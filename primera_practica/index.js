const express = require("express");
const CryptoJS = require("crypto-js");

const app = express();
const PORT = 3000;

// Permite leer JSON
app.use(express.json());


app.post("/mascaracteres", (req, res) => {
    const { cadena1, cadena2 } = req.body;

    if (!cadena1 || !cadena2) {
        return res.json({
            success: false,
            error: "Faltan parámetros"
        });
    }

    const result =
        cadena1.length >= cadena2.length ? cadena1 : cadena2;

    res.json({
        success: true,
        result
    });
});



app.post("/menoscaracteres", (req, res) => {
    const { cadena1, cadena2 } = req.body;

    if (!cadena1 || !cadena2) {
        return res.json({
            success: false,
            error: "Faltan parámetros"
        });
    }

    const result =
        cadena1.length <= cadena2.length ? cadena1 : cadena2;

    res.json({
        success: true,
        result
    });
});



app.post("/numcaracteres", (req, res) => {
    const { cadena } = req.body;

    if (!cadena) {
        return res.json({
            success: false,
            error: "Falta parámetro cadena"
        });
    }

    res.json({
        success: true,
        length: cadena.length
    });
});



app.post("/palindroma", (req, res) => {
    const { cadena } = req.body;

    if (!cadena) {
        return res.json({
            success: false,
            error: "Falta parámetro cadena"
        });
    }

    const limpia = cadena
        .toLowerCase()
        .replace(/\s/g, "");

    const invertida = limpia.split("").reverse().join("");

    res.json({
        success: true,
        isPalindrome: limpia === invertida
    });
});



app.post("/concat", (req, res) => {
    const { cadena1, cadena2 } = req.body;

    if (!cadena1 || !cadena2) {
        return res.json({
            success: false,
            error: "Faltan parámetros"
        });
    }

    res.json({
        success: true,
        result: cadena1 + cadena2
    });
});



app.post("/applysha256", (req, res) => {
    const { cadena } = req.body;

    if (!cadena) {
        return res.json({
            success: false,
            error: "Falta parámetro cadena"
        });
    }

    const hash = CryptoJS.SHA256(cadena).toString();

    res.json({
        success: true,
        original: cadena,
        encrypted: hash
    });
});



app.post("/verifysha256", (req, res) => {
    const { normal, encrypted } = req.body;

    if (!normal || !encrypted) {
        return res.json({
            success: false,
            error: "Faltan parámetros"
        });
    }

    const hash = CryptoJS.SHA256(normal).toString();

    res.json({
        success: true,
        match: hash === encrypted
    });
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
