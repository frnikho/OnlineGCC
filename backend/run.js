const { exec } = require('child_process');

process.on("message", message => {
   compileGcc(message.fileName, (response) => {
       console.log(response);
       process.send(response);
       process.exit();
   });
});

function compileGcc(fileName, callback) {
    exec(`ulimit -v 80960 && gcc -o ./tmp/exec/${fileName} ./tmp/${fileName} && timeout 10s ./tmp/exec/${fileName}`, (err, stdout, stderr) => {
        let response = {
            output: stdout,
            error: err,
            warning: stderr
        };
        if (err != null && err.code === 124) {
            response.error = "Timeout ! (+10s)"
        } else if (err != null && response.warning != null) {
            response.error = response.warning;
            response.warning = '';
        }
        callback(response);
    });
}
