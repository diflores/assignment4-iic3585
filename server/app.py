import glob

from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return jsonify({"Hello": "World"})


@app.route("/songs/")
def get_song():
    song_name = request.args.get("song_name")
    return send_from_directory("./songs",
                               song_name, as_attachment=False)


@app.route("/song_list")
def get_song_list():
    return jsonify([song.split("/")[-1] for song in glob.glob("./songs/*.mp3")])


if __name__ == '__main__':
    app.run()
