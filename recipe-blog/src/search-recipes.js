import React, { useState, useEffect } from 'react';
import List from './list';
import CardList from './card-list';

export default function SearchRecipes() {
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [author, setAuthor] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [userMap, setUserMap] = useState(new Map());

    useEffect(() => {
        const map = new Map();
        const users = JSON.parse(localStorage.getItem('users'));
        console.log(users[0].username);
        users.forEach(user => 
            map.set(user.id, user.username)
        );
        setUserMap(map);
    }, []);

    useEffect(() => {
        const recipes = (JSON.parse(localStorage.getItem('recipes')));
        const authorTagsRecipes = recipes.filter((recipe) => 
            userMap.get(recipe.userId) === author &&
            tags.every((tag) => 
                recipe.tagList.includes(tag)
            )
        );

        const sortedRecipes = authorTagsRecipes.sort((firstRecipe, secondRecipe) => {
            const firstTime = new Date(firstRecipe.dateTimeRegistered).getTime();
            const secondTime = new Date(secondRecipe.dateTimeRegistered).getTime();
            if(firstTime > secondTime) return -1;
            if(firstTime < secondTime) return 1;
            return 0;
        });
        
        const lastTenRecipes = [];
        if(sortedRecipes.length <= 10) {
            setFilteredRecipes(sortedRecipes);
        } else {
            for(let i = 0; i < 10; i++) {
                lastTenRecipes.push(sortedRecipes[i]);
            }   
            setFilteredRecipes(lastTenRecipes);
        }
    }, [tags, author]);

    function addTag() {
        setTags(tags.concat(currentTag));
        setCurrentTag('');
    }

    function handleCurrentTagChange(event) {
        setCurrentTag(event.target.value);
    }
        
    function handleAuthorChange(event) {
        setAuthor(event.target.value);
    }

    return(
        <>
            <label>
                Author: 
            <input type="text" value={author} onChange={handleAuthorChange}/>
            <label>
                Tags: 
            <input type="text" value={currentTag} onChange={handleCurrentTagChange}/>
            </label>
            <button type="button" onClick={addTag}>Add tag</button>
            <List items={tags}/>
            </label>
            <CardList items={filteredRecipes}/>
        </>
);
}