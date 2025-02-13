const express = require("express");
const http = require("http");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const database = require("./serverDb.js");

const app = express();

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single("file");

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.get("/get", async (req, res) => {
    let road = await database.select();
    res.json(road);
});

app.post("/add", async (req, res) => {
    await upload(req, res, async (err) => {
        let road = await database.insert({url:"/files/"+req.file.filename});
        console.log(req.file.filename);
        res.json({ url: "./files/" + req.file.filename });
    });
});

app.delete("/delete/:id", async function (req, res) {
    const files = await database.select();
    const toDelete = files.find(function (file) { return file.id == req.params.id; });
        await database.delete(toDelete.id);
        res.json({ result: "Ok" });
    });

database.createTable();

const server = http.createServer(app);
server.listen(80, () => {
    console.log("- server running");
});
