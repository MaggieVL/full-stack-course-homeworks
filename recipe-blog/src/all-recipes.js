import React from 'react';
import CardList from './card-list';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

export default function AllRecipes() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('recipes')));
    }, []);

    const history = useHistory();

    function handleDelete(recipe) {
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const newRecipes = recipes.filter(({ id }) => id !== recipe.id);
        localStorage.setItem('recipes', JSON.stringify(newRecipes));
        setItems(newRecipes);
    }

    function handleEdit(recipe) {
        history.push(`recipes/edit/${recipe.id}`);
    }
    
    return(
        <>
            <h1>All Recipes</h1>
            <CardList items={items} onDelete={handleDelete} onEdit={handleEdit}/>
        </>
    );
}