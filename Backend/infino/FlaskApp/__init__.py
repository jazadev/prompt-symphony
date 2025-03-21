from flask import Flask
from os import environ

# Always use relative import for custom module
from .package.module import MODULE_VALUE

app = Flask(__name__)

SECRET_KEY = environ.get("ENABLE_ORYX_BUILD")

@app.route("/")
def index():
    return (
        "Try /hello/Chris for parameterized Flask route.\n"
        "Try /module for module import guidance"
    )

@app.route("/hello/<name>", methods=['GET'])
def hello(name: str):
    return f"hello {name}"

@app.route("/module")
def module():
    return f"loaded from FlaskApp.package.module = {SECRET_KEY}"

if __name__ == "__main__":
    app.run()