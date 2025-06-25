from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

# Members API route
@app.route("/api/users", methods=["GET"])
def users():
    return jsonify (
        {
            "users": [
                "user1",
                "user2",
                "user3"
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)  # debug=T bc we're in dev. mode