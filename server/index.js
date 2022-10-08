import express from "express";
import cookieParser from "cookie-parser";
import next from "next";
import { router as apiRouter } from "./router";

const server = express();
server.use(express.json());
server.use(cookieParser());

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || "8080";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

server.use((req, res, next) => {
  if (req.path === "/login" && req.cookies.authToken) {
    return res.redirect("/user");
  }

  if (req.path.startsWith("/user")) {
    if (!req.cookies.authToken || req.cookies.authToken !== "manuel") {
      return res.redirect("/login");
    }
  }

  next();
});

server.use("/api", apiRouter);

nextApp.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
