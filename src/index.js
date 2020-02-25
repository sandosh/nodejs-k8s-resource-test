const dns = require('dns');
const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/health', (req, res) => res.send('I\'m Okay!'));
app.get('/test', async (req, res) => {
    dns.lookup('google.com', (err, address, family) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(address);
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));