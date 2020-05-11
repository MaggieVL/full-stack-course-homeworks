import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formStatus, setFormStatus] = useState('');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const invalidCredentialsStatus = 'Invalid username or password';

        const currentUser = JSON.parse(localStorage.getItem('users')).find(
            (user) => user.username === username && user.password === password)
        
        if(currentUser) {
            localStorage.setItem('active-user', JSON.stringify(currentUser));
        } else {
            setFormStatus(invalidCredentialsStatus);
        }
    }

    return (
    <>
        <div>{formStatus}</div>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <label>
                Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    </>
    );
}