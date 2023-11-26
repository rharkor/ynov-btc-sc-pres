import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
config();

const app = express();
const socket = new Server({
  cors: {
    origin: "*",
  },
});
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

app.get("/", (_, res) => {
  res.send("ok");
});

app.post("/login", (req, res) => {
  const { body } = req;
  const { password } = body;
  if (password === process.env.ADMIN_CODE) {
    res.send("ok");
    return;
  }
  res.status(401).send("wrong password");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let curSlide = 0;

socket.on("connection", (socket) => {
  socket.on("slide", (data) => {
    try {
      const parsed = JSON.parse(data) as { slide: number; password: string };
      if (parsed.password !== process.env.ADMIN_CODE) {
        return;
      }
      curSlide = parsed.slide;
      socket.broadcast.emit("slideUpdate", parsed.slide);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("getSlide", () => {
    socket.emit("slideUpdate", curSlide);
  });
});

socket.listen(3001);
console.log("Socket listening on port 3001");
