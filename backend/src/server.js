
const purchaseRoutes =require("./routes/purchaseRoutes");
const salesRoutes = require("./routes/salesRoutes");
const stockRoutes = require("./routes/stockRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SmartERP Backend Running"
  });
});

const PORT = 5000;
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/purchase", purchaseRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});