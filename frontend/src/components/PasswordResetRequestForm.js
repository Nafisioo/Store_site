import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PasswordResetForm() {
    const { uid, token } = useParams(); // Capture uid and token from URL
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`/api/reset/${uid}/${token}/`, {
                new_password1: newPassword,
                new_password2: confirmPassword,
            });
            setMessage('Password has been reset successfully. You can now log in with your new password.');
        } catch (error) {
            setMessage('There was an error. Please try again.');
        }
    };

    return (
        <div>
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default PasswordResetForm;
