const { exec, fork } = require('child_process');

const createChild = (req, res, fileName) => {

    const childProcess = fork("./run.js", {
        execArgv: ['--max-old-space-size=128']
    });
    childProcess.send({fileName: fileName});
    childProcess.on("message", message => res.send(message));
}

module.exports = {createChild};
