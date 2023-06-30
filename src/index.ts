import express = require("express");
import dotenv = require("dotenv");
import http = require("http");
import Hexapod from "./hexapod";
import { Server } from 'socket.io';
require('log-timestamp');

dotenv.config();
const hexapod = new Hexapod();

const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('public'));
app.set("twig options", {
    allowAsync: true,
    strict_variables: false
});
const server = http.createServer(app);
const io = new Server(server);


app.get('/', function (req, res) {
    res.render('index.twig', {
        message: "Hello Worldf"
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});


io.on('connection', (socket) => {
    console.log('Un client est connecté');

    socket.on('buttonClick', () => {
        hexapod.connect((success) => {
            socket.emit("messageApp", success ? "Connection Done" : "Connection Error");
            hexapod.getVersion((message) => {
                socket.emit("messageHexapod", message);
            });
        });
    });
});