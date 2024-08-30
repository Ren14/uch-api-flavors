const axios = require('axios');
const express = require('express');
const app = express();

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/dolar", async (req, res, next) => {

    const response = await axios.get('https://criptoya.com/api/dolar');
    res.json(response.data);
});

