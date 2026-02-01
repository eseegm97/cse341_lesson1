const express = require("express");
const contactsRoutes = require("./src/routes/contactsRoute");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/name", (req, res) => {
    res.status(200).type("text/plain").send("Lindsay Seegmiller\n");
});

app.use("/contacts", contactsRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 handler
app.use((req, res) => {
    res.status(404).type("text/plain").send("Not Found\n");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
