import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import User from './User';

export default function UserForm() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('not specified');
    const [userRole, setUserRole] = useState('user');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [accountStatus, setAccountStatus] = useState('active');
    const [formStatus, setFormStatus] = useState('');

    const { id } = useParams();

    const defaultMaleImageURL = 'https://w7.pngwing.com/pngs/1012/700/png-transparent-user-male-icon-business-user-s-face-head-gender-symbol.png';
    const defaultFemaleImageURL = 'https://w7.pngwing.com/pngs/269/231/png-transparent-user-computer-icons-female-happy-women-039-s-day-miscellaneous-head-gender-symbol.png';

    useEffect(() => {
        if (id) {
            const users = JSON.parse(localStorage.getItem('users'));
            const { name, username, gender, userRole, imageURL, description, status } =
                users.find((user) => user.id === id);
            setName(name);
            setUsername(username);
            setGender(gender);
            setUserRole(userRole);
            setUrl(imageURL);
            setDescription(description);
            setAccountStatus(status);
        }
    }, []);

    const requiredFields = [name, username, password, gender, userRole, description, accountStatus];

    const invalidDescriptionTag = 'Description must be no more than 512 characters.';
    const invalidUsernameTag = 'Username must have a maximum of 15 characters which are letters only.';
    const invalidPasswordTag = 'Password must have at least 8 characters, 1 digit and 1 character different than letter or digit.';

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleUsernameChange(event) {
        const currentUsername = event.target.value;
        
        if(!isValidUsername(currentUsername)){
            setFormStatus(invalidUsernameTag);
        } else if(isValidUsername(currentUsername) && formStatus === invalidUsernameTag) {
            setFormStatus('');
        }

        setUsername(currentUsername);
    }

    function handlePasswordChange(event) {
        const currentPassword = event.target.value;
        
        if(!isValidPassword(currentPassword)){
            setFormStatus(invalidPasswordTag);
        } else if(isValidPassword(currentPassword) && formStatus === invalidPasswordTag) {
            setFormStatus('');
        }
        setPassword(currentPassword);
    }

    function handleGenderChange(event) {
        setGender(event.target.value);
    }

    function handleUserRoleChange(event) {
        setUserRole(event.target.value);
    }

    function handleAccountStatusChange(event) {
        setAccountStatus(event.target.value);
    }

    function handleUrlChange(event) {
        setUrl(event.target.value);
    }

    function handleDescriptionChange(event) {
        const currentDescription = event.target.value;
        
        if(!isValidDescription(currentDescription)){
            setFormStatus(invalidDescriptionTag);
        } else if(isValidDescription(currentDescription) && formStatus === invalidDescriptionTag) {
            setFormStatus('');
        }
        setDescription(currentDescription);
    }

    function isLetter(character) {
        return character >= 'a' && character <= 'z' || character >= 'A' && character <= 'Z';
    }

    function isValidUsername(username) {
        return username.length <= 15 && [].filter.call(username, function(character) {
            return !isLetter(character);
        }).length == 0;
    }

    function isDigit(character) {
        return character >= 0 && character <= 9;
    }

    function isValidPassword(password) {
        return password.length >= 8 && [].filter.call(password, function(character) {
            return isDigit(character);
        }).length >= 1 && [].filter.call(password, function(character) {
            return !isLetter(character) && !isDigit(character);
        }).length >= 1;
    }

    function handleImageSubmition() {
        if (url === '') {
            const defaultImageUrl = gender === 'male' ? defaultMaleImageURL : defaultFemaleImageURL;
            setUrl(defaultImageUrl);
            return defaultImageUrl;
        }
        return url;
    }

    function isValidDescription(description) {
        return description.length <= 512;
    }

    function checkValidFormData() {
        if(requiredFields.some((field) => field === '')) {
            setFormStatus('You must fill in all fields.');
            return false;
        }

        if(!isValidUsername(username)) {
            setFormStatus(invalidUsernameTag);
            return false;
        }

        if(!isValidDescription(description)) {
            setFormStatus(invalidDescriptionTag);
            return false;
        }

        if(!isValidPassword(password)) {
            setFormStatus(invalidPasswordTag);
            return false;
        }

        return true;
    }

    function saveToLocalStorage(imageUrl) {
        const newUser = new User(name, username, password, gender, userRole, accountStatus, imageUrl, description);

        if(localStorage.getItem('users')) {
            let users = JSON.parse(localStorage.getItem('users'));
            if (id) {
                const user = users.find((user) => user.id === id);
                users = users.filter((user) => user.id !== id);
                newUser.id = id;
                newUser.dateTimeRegistered = user.dateTimeRegistered;
            }
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            localStorage.setItem('users', JSON.stringify([newUser]));
        }
    }

    function clearForm() {
        setName('');
        setUsername('');
        setPassword('');
        setGender('not specified');
        setUserRole('user');
        setUrl('');
        setDescription('');
        setAccountStatus('active');
        setFormStatus('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!checkValidFormData()) {
            return;
        }

        const imageUrl = handleImageSubmition();
        
        saveToLocalStorage(imageUrl);

        if (!id) {
            clearForm();
        }
        setFormStatus('Success!');
    }

    return (
    <>
        <div>{formStatus}</div>
        <form onSubmit={handleSubmit}>
            <label>
                 Name: 
                <input type="text" value={name} onChange={handleNameChange}/>
            </label>
            <label>
                 Username: 
                <input type="text" value={username} onChange={handleUsernameChange}/>
            </label>
            <label>
                 Password: 
                <input type="password" value={password} onChange={handlePasswordChange}/>
            </label>
            <label>
                 Gender:
                <select value={gender} onChange={handleGenderChange}>
                    <option value='female'>female</option>
                    <option value='male'>male</option>
                    <option value='not specified'>not specified</option>
                </select>
            </label>
            <label>
                 User role: 
                <select value={userRole} onChange={handleUserRoleChange}>
                    <option value='user'>user</option>
                    <option value='admin'>admin</option>
                </select>
            </label>
            <label>
                 Image: 
                <input type="url" value={url} onChange={handleUrlChange}/>
            </label>
            <label>
                 Brief description: 
                <textarea value={description} onChange={handleDescriptionChange}/>
            </label>
            <label>
                 Account status: 
                <select value={accountStatus} onChange={handleAccountStatusChange}>
                    <option value='active'>active</option>
                    <option value='suspended'>suspended</option>
                    <option value='deactivated'>deactivated</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    </>
    );
}