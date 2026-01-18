const http = require("http");
const { getAllContacts, getContactById } = require("./routes/contacts");

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    try {
        if (req.url === "/name" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Lindsay Seegmiller\n");
            return;
        }

        if (req.url.startsWith("/contacts") && req.method === "GET") {
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const url = new URL(req.url, `${protocol}://${req.headers.host}`);
            const id = url.searchParams.get("id");

            let result;

            if (id) {
                result = await getContactById(id);
                if (!result) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: "Contact not found or invalid ID" }));
                    return;
                }
            } else {
                result = await getAllContacts();
            }

            res.statusCode = 200;
            res.end(JSON.stringify(result));
            return;
        }

        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found\n");

    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error.message }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
