
import React, {useEffect, useState} from 'react';
import CardList from './card-list';
import { useHistory } from 'react-router-dom';

export default function AllUsers() {
    const [items, setItems] = useState([]);

    const history = useHistory();

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('users')));
    }, []);

    function handleDelete(user) {
        const users = JSON.parse(localStorage.getItem('users'));
        const newUsers = users.filter(({ id }) => id !== user.id);
        localStorage.setItem('users', JSON.stringify(newUsers));
        setItems(newUsers);
    }

    function handleEdit(user) {
        history.push(`users/edit/${user.id}`);
    }

    return(
        <>
            <h1>All Users</h1>
            <CardList items={items} simple={true} onDelete={handleDelete} onEdit={handleEdit}/>
        </>
    );
}