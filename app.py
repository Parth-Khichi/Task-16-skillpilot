from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

posts = []
next_id = 1


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/posts", methods=["GET"])
def get_posts():
    return jsonify(posts), 200


@app.route("/api/posts", methods=["POST"])
def create_post():
    global next_id

    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()

    if not title or not content:
        return jsonify({
            "error": "Title and content are required"
        }), 400

    post = {
        "id": next_id,
        "title": title,
        "content": content
    }

    next_id += 1
    posts.append(post)

    return jsonify(post), 201


@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    for post in posts:
        if post["id"] == post_id:
            posts.remove(post)
            return jsonify({
                "message": "Post deleted successfully"
            }), 200

    return jsonify({"error": "Post not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)