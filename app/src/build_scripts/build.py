import json
import platform
from subprocess import run, check_output
from typing import Final

WINDOWS: Final[str] = "Windows"
LINUX: Final[str] = "Linux"
MAC_OS: Final[str] = "Darwin"
POWERSHELL_PATH: Final[str] = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershel.exe"

MIN_COVERAGE_THRESHOLD = 0 # Adjust as needed

def build_factory():
    os_name = platform.system()
    if os_name == WINDOWS:
        run_windows_build()
    elif os_name == LINUX or os_name == MAC_OS:
        run_macOS_linux_build()
    else:
        print("ERROR: Unknown Operating System")


def run_windows_build():
    # Fetch the existing virtual environment if it exists
    virtual_env = check_output(["poetry", "env", "info", "--path"], text=True).strip()
    activate_script = f"{virtual_env}\\Scripts\\activate"
    print(f"Path to venv = {activate_script}")
    # Open the venv, install all dependencies, and run unit tests
    run(
        f"{activate_script} ; poetry install ; poetry run coverage run -m pytest -s ; poetry run coverage json ; poetry run coverage html",
        shell=True,
        executable=POWERSHELL_PATH,
        check=True,
    )


def run_macOS_linux_build():
    virtual_env = check_output(["poetry", "env", "info", "--path"], text=True).strip()
    print(f"Path to venv = {virtual_env}")

    activate_script = f"{virtual_env}/bin/activate"
    run(
        f"source {activate_script} && poetry install && poetry run coverage run -m pytest tests/unit -s && poetry run coverage json && poetry run coverage html",
        shell=True,
        executable="/bin/bash",
        check=True,
    )


def run_tests_and_coverage():
    """
    Executes all unit tests and generates an html coverage report
    """
    try:
        build_factory()
        # Read the content of the coverage report file
        with open("coverage.json", "r") as coverage_file:
            coverage_data = json.load(coverage_file)

        # Extract total coverage information
        total_coverage = coverage_data.get("totals", {}).get("percent_covered", 50.0)

        if total_coverage < MIN_COVERAGE_THRESHOLD:
            print(
                f"Minimum coverage threshold of {MIN_COVERAGE_THRESHOLD}% not met: {total_coverage:.2f}%"
            )

    except Exception as e:
        print(f"Error running tests and generating coverage: {e}")
        exit(1)


def run_tests():
    run_tests_and_coverage()
    exit(0)