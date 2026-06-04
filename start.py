import os
import shutil
import subprocess
import time


DEFAULT_PORT = os.environ.get("PORT", "3000")


def run(command: list[str]) -> None:
    print(f"\n> {' '.join(command)}")
    subprocess.run(command, check=True)


def listening_pids(port: str) -> set[str]:
    if os.name != "nt":
        return set()

    result = subprocess.run(["netstat", "-ano"], capture_output=True, text=True, check=False)
    pids: set[str] = set()
    marker = f":{port}"

    for line in result.stdout.splitlines():
        parts = line.split()
        if len(parts) >= 5 and parts[0] == "TCP" and parts[1].endswith(marker) and parts[3] == "LISTENING":
            pids.add(parts[-1])

    return pids


def stop_existing_next_dev() -> None:
    lock_path = os.path.join(".next", "dev", "lock")
    if not os.path.exists(lock_path):
        return

    pids = listening_pids(DEFAULT_PORT)
    if not pids:
        return

    print(f"Found an existing Next dev server on port {DEFAULT_PORT}. Stopping it first...")
    for pid in sorted(pids):
        subprocess.run(["taskkill", "/PID", pid, "/F"], check=False)

    time.sleep(1)


def main() -> int:
    npm = shutil.which("npm")
    if not npm:
        print("npm was not found. Install Node.js first, then run this script again.")
        return 1

    if not os.path.exists("node_modules"):
        run([npm, "install"])

    env_path = ".env.local"
    if not os.path.exists(env_path) and os.path.exists(".env.example"):
        shutil.copyfile(".env.example", env_path)
        print("Created .env.local from .env.example. Fill in real API keys when you are ready.")

    stop_existing_next_dev()
    run([npm, "run", "dev"])
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except subprocess.CalledProcessError as exc:
        raise SystemExit(exc.returncode)
    except KeyboardInterrupt:
        raise SystemExit(130)
