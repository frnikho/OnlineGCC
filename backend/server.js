const https = require('https');
const fs = require('fs');
const cors = require('cors');
const limiter = require('express-rate-limit');

const dev = (app) => {
    app.use(limiter({
        windowMs: 2 * (60 * 1000),
        max: 2,
        message: "Too many request, wait before send another requests !"
    }))
    app.listen(3030, () => {
        console.log("app running ! open http://localhost:3030/");
    });
}

const deploy = (app) => {
    app.use(cors());
    app.use(limiter({
        windowMs: 2 * (60*1000),
        max: 2,
        message: "Too many request, wait before send another requests !"
    }))
    let privateKey = fs.readFileSync('/etc/letsencrypt/live/app.malloc.studio/privkey.pem');
    let certificate = fs.readFileSync('/etc/letsencrypt/live/app.malloc.studio/cert.pem');
    const option = {
        key: privateKey,
        cert: certificate
    };
    https.createServer(option, app).listen(3030);
}

module.exports = {dev, deploy}
