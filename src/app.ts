import axios from "axios";
import compression from "compression";
import cors from "cors";
import express from "express";
import FormData from "form-data";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { log } from "./modules/logger";

async () => {
  try {
    // GET
    axios.get("https://hyunwoo.kim", {
      headers: { cookie: "", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36" },
    });

    // POST
    axios.post(
      "https://hyunwoo.kim",
      { key: "value" },
      { headers: { cookie: "", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36" } }
    );

    // POST using FormData
    const formData = new FormData();
    formData.append("key", "value");

    await axios({
      method: "post",
      url: "https://hyunwoo.kim",
      headers: {
        cookie: "",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        ...formData.getHeaders(),
      },
      data: formData,
    });
  } catch (err) {
    log.e(err);
  }
};

const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan("short"));
app.use(compression());

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    log.e(err);
    res.sendStatus(400);
  }
});

app.post("/", async (req, res) => {
  try {
    res.json({});
  } catch (err) {
    log.e(err);
    res.sendStatus(400);
  }
});

app.listen(process.env.HTTP_PORT || 8000, () => {
  log.i(`Listening on http://${process.env.HTTP_HOST || "localhost"}:${process.env.HTTP_PORT || 8000}`);
});
