const http = require("http");
const { getAllContacts, getContactById } = require("./routes/contacts");
require("dotenv").config();

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    try {
        if (req.url === "/name" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Lindsay Seegmiller\n");
            return;
        }

        if (req.url.startsWith("/contacts") && req.method === "GET") {
            const queryIndex = req.url.indexOf("?");
            const id = queryIndex > -1 
                ? new URLSearchParams(req.url.substring(queryIndex + 1)).get("id")
                : null;

            let result;

            if (id) {
                result = await getContactById(id);
                if (!result) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Contact not found or invalid ID" }));
                    return;
                }
            } else {
                result = await getAllContacts();
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            return;
        }

        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found\n");

    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
