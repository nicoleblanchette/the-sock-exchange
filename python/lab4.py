from flask import Flask, jsonify
from lab3 import generate_socks

app = Flask(__name__)

@app.route('/socks/<int:counter>')
def show_socks(counter):
    return jsonify(generate_socks(counter))

if __name__ == '__main__':
    app.run(debug=True)