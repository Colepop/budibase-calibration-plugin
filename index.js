const { NodeSSH } = require("node-ssh");
const ssh = new NodeSSH();

module.exports = async ({ variables }) => {
  const { host, username, password } = variables;
  
  try {
    // Connect to the Raspberry Pi via SSH
    await ssh.connect({
      host: host,
      username: username,
      password: password
    });

    // Run the command/script on the Raspberry Pi
    const result = await ssh.execCommand("python3 /home/pi/myscript.py");

    // Return success message and any output from the script
    return {
      success: true,
      status: `Script started successfully: ${result.stdout}`
    };
  } catch (err) {
    return {
      success: false,
      status: `Error: ${err.message}`
    };
  } finally {
    ssh.dispose();
  }
};

