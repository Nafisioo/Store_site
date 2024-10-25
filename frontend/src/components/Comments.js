import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${productId}/comments/`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8000/api/products/${productId}/comments/`, { content: newComment });
            setNewComment('');
            // Optionally refresh comments here
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.user_name}: {comment.content}</p>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    placeholder="Add a comment" 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Comments;
