import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const BASE = "https://app.sigilopay.com.br/api/v1";

app.get("/", (_, res) => res.send("ok"));

app.post("/pix/create", async (req, res) => {
  try {
    const r = await axios.post(`${BASE}/gateway/pix/receive`, req.body, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-public-key": process.env.SIGILOPAY_PUBLIC_KEY,
        "x-secret-key": process.env.SIGILOPAY_SECRET_KEY,
      },
      timeout: 30000,
    });
    res.json(r.data);
  } catch (e) {
    const status = e.response?.status || 500;
    const data = e.response?.data || { error: e.message };
    res.status(status).json(data);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("up on " + port));
