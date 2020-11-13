const { exec } = require('child_process');

const execute = (req, res, fileName) => {
    exec(`gcc -o ./tmp/exec/${fileName} ./tmp/${fileName} && ./tmp/exec/${fileName}`, (err, stdout, stderr) => {
        if (err) {
            console.log(`err: ${err}`);
            res.send({
                status: 'not ok',
                error: err.message
            })
            return;
        }
        let resstderr;
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            resstderr = stderr
        }
        console.log(`compile output: ${stdout}`);
        let response = {
            status: "ok",
            output: stdout
        };
        if (resstderr != null)
            response['warning'] = resstderr;
        res.send(response);
    })
}

module.exports = execute;
