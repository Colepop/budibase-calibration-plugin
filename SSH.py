import paramiko

HOST = "192.168.1.100"  # Replace with your Raspberry Pi's IP address
USERNAME = "pi"
PASSWORD = "raspberry"

def ssh_execute_command(command):
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(HOST, username=USERNAME, password=PASSWORD)
        stdin, stdout, stderr = client.exec_command(command)
        output = stdout.read().decode()
        error = stderr.read().decode()
        client.close()
        if output:
            print("Output:", output)
        if error:
            print("Error:", error)
        return output
    except Exception as e:
        print(f"Failed: {e}")
        return None

if __name__ == "__main__":
    print("Triggering calibration...")
    result = ssh_execute_command("/home/pi/calibrate.sh")
    if result:
        print("Success!")
    else:
        print("Calibration failed.")
