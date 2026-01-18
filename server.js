const http = require('http');
const { getAllContacts, getContactById } = require('./routes/contacts');

const server = http.createServer(async (req, res) => {
    if (req.url === '/name' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Lindsay Seegmiller\n');
    } else if (req.url.startsWith('/contacts') && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');

        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = url.searchParams.get('id');

        try {
            if (id) {
                const contact = await getContactById(id);
                if (contact) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(contact));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: "Contact not found" }));
                }
            } else {
                const contacts = await getAllContacts();
                res.statusCode = 200;
                res.end(JSON.stringify(contacts));
            }
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found\n');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
