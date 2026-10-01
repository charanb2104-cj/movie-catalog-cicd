from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MOVIES = [
    {"id": "123", "title": "Top Gun: Maverick"},
    {"id": "456", "title": "Sonic the Hedgehog"},
    {"id": "789", "title": "A Quiet Place"}
]


@app.route("/movies", methods=["GET"])
def get_movies():
    return jsonify({"movies": MOVIES}), 200


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
