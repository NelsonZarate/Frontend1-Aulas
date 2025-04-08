export const getPosts = async function fetchPosts() {
    try {
        const apiUrl = "https://67f5687c913986b16fa47893.mockapi.io/api/posts";
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const posts = await response.json(); 
        localStorage.setItem("posts", posts);
        console.log(posts)
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

export const getPost = async function fetchPost(id) {
    try {
        const apiUrl = `https://67f5687c913986b16fa47893.mockapi.io/api/posts/${id}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }
        const post = await response.json(); 
        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
    }   
}

export const createPost = async function createNewPost(post) {
    try {
        const apiUrl = "https://67f5687c913986b16fa47893.mockapi.io/api/posts";
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.statusText}`);
        }
        const newPost = await response.json(); 
        return newPost;
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

export const updatePost = async function updateExistingPost(id, post) {
    try {
        const apiUrl = `https://67f5687c913986b16fa47893.mockapi.io/api/posts/${id}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if (!response.ok) {
            throw new Error(`Failed to update post: ${response.statusText}`);
        }
        const updatedPost = await response.json(); 
        return updatedPost;
    } catch (error) {
        console.error("Error updating post:", error);
    }
}
export const deletePost = async function deleteExistingPost(id) {
    try {
        const apiUrl = `https://67f5687c913986b16fa47893.mockapi.io/api/posts/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete post: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}
