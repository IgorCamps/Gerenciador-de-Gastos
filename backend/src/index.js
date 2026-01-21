const express = require('express');
const cors = require('cors');
const gastosRoutes = require("./routes/gastos.routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/gastos", gastosRoutes);


app.listen(PORT, () => {
    console.log(`Servidor escutando a porta ${PORT}`);
});