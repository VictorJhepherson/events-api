import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor está rodando na porta: ${port}`);
});
