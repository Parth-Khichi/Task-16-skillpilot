const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("posts");
const message = document.getElementById("message");

// Display success and error messages
function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "red" : "green";
}

// Fetch and display all posts
async function loadPosts() {
    try {
        const response = await fetch("/api/posts");

        if (!response.ok) {
            throw new Error("Failed to load posts");
        }

        const posts = await response.json();
        postsContainer.replaceChildren();

        posts.forEach(post => {
            const article = document.createElement("article");
            const heading = document.createElement("h3");
            const content = document.createElement("p");
            const deleteButton = document.createElement("button");

            heading.textContent = post.title;
            content.textContent = post.content;
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", () => {
                deletePost(post.id, article);
            });

            article.append(heading, content, deleteButton);
            postsContainer.appendChild(article);
        });
    } catch (error) {
        showMessage(error.message, true);
    }
}

// Add a new post using POST
postForm.addEventListener("submit", async event => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Unable to add post");
        }

        postForm.reset();
        showMessage("Post added successfully!");
        await loadPosts();
    } catch (error) {
        showMessage(error.message, true);
    }
});

// Delete a post using DELETE
async function deletePost(postId, article) {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Unable to delete post");
        }

        article.remove();
        showMessage(result.message);
    } catch (error) {
        showMessage(error.message, true);
    }
}

// Load posts when the page opens
loadPosts();