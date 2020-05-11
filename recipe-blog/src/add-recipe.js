import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from './list';
import Recipe from './Recipe';
import { makeStyles } from '@material-ui/core/styles';

/*const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width:'50vh',
        flexDirection: 'column',
        height:'100vh'
    }
 }));*/

export default function AddRecipe() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [briefDescription, setBriefDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [productList, setProductList] = useState([]);
    const [tags, setTags] = useState([]);
    const [formStatus, setFormStatus] = useState('');
    const [currentProduct, setCurrentProduct] = useState('');
    const [currentTag, setCurrentTag] = useState('');

    const invalidTitleTag = 'The title must have a maximum of 80 symbols.';
    const invalidBriefDescriptionTag = 'The brief description must have a maximum of 256 symbols.';
    const invalidFullDescriptionTag = 'The full description must have a maximum of 2048 symbols.';
    const defaultUrl = 'default';
    const states = [title, url, briefDescription, fullDescription, preparationTime, productList, tags];

    const requiredLists = [productList, tags];

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const recipes = JSON.parse(localStorage.getItem('recipes'));
            const { title, briefDescription, preparationTime, productList, image, fullDescription, tagList } =
                recipes.find((recipe) => recipe.id === id);
            setTitle(title);
            setBriefDescription(briefDescription);
            setPreparationTime(preparationTime);
            setProductList(productList);
            setUrl(image);
            setFullDescription(fullDescription);
            setTags(tagList);
        }
    }, []);

    //validators
    function isValidTitle(title) {
        return title.length <= 80;
    }

    function isValidBriefDescription(briefDescription) {
        return briefDescription.length <= 256;
    }

    function isValidFullDescription(fullDescription) {
        return fullDescription.length <= 2048;
    }

    //helpers
    function addProduct() {
        setProductList(productList.concat(currentProduct));
        setCurrentProduct('');
    }

    function addTag() {
        setTags(tags.concat(currentTag));
        setCurrentTag('');
    }

    //handlers
    function handleTitleChange(event) {
        const currentTitle = event.target.value;

        if(!isValidTitle(currentTitle)){
            setFormStatus(invalidTitleTag);
        } else if(isValidTitle(currentTitle) && formStatus === invalidTitleTag) {
            setFormStatus('');
        }

        setTitle(currentTitle);
    }

    function handleBriefDescriptionChange(event) {
        const currentBriefDescription = event.target.value;

        if(!isValidBriefDescription(currentBriefDescription)){
            setFormStatus(invalidBriefDescriptionTag);
        } else if(isValidBriefDescription(currentBriefDescription) && formStatus === invalidBriefDescriptionTag) {
            setFormStatus('');
        }

        setBriefDescription(currentBriefDescription);
    }

    function handlePreparationTimeChange(event) {
        setPreparationTime(event.target.value);
    }

    function handleCurrentProductChange(event) {
        setCurrentProduct(event.target.value);
    }

    function handleUrlChange(event) {
        setUrl(event.target.value);
    }

    function handleFullDescriptionChange(event) {
        const currentFullDescription = event.target.value;

        if(!isValidFullDescription(currentFullDescription)){
            setFormStatus(invalidFullDescriptionTag);
        } else if(isValidFullDescription(currentFullDescription) && formStatus === invalidFullDescriptionTag) {
            setFormStatus('');
        }

        setFullDescription(currentFullDescription);
    }

    function handleCurrentTagChange(event) {
        setCurrentTag(event.target.value);
    }

   function checkValidFormData() {
        if(requiredLists.some((list) => list === [])) {
            setFormStatus('You must fill in all lists.');
            return false;
        }

        if(!isValidTitle(title)) {
            setFormStatus(invalidTitleTag);
            return false;
        }

        if(!isValidBriefDescription(briefDescription)) {
            setFormStatus(invalidBriefDescriptionTag);
            return false;
        }

        if(!isValidFullDescription(fullDescription)) {
            setFormStatus(invalidFullDescriptionTag);
            return false;
        }

        return true;
    }

    function saveToLocalStorage() {
        const currentUser = JSON.parse(localStorage.getItem('active-user'));
        const newRecipe = new Recipe(currentUser.id, title, briefDescription, 
            preparationTime, productList, url, fullDescription, tags);

        if(localStorage.getItem('recipes')) {
            let recipes = JSON.parse(localStorage.getItem('recipes'));
            if (id) {
                const recipe = recipes.find((recipe) => recipe.id === id);
                recipes = recipes.filter((recipe) => recipe.id !== id);
                newRecipe.id = id;
                newRecipe.dateTimeRegistered = recipe.dateTimeRegistered;
            }
            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));
        } else {
            localStorage.setItem('recipes', JSON.stringify([newRecipe]));
        }
    }

    function clearForm() {
        setTitle('');
        setBriefDescription('');
        setPreparationTime('');
        setProductList([]);
        setUrl('');
        setFullDescription('');
        setTags([]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!checkValidFormData()) {
            return;
        }
        
        saveToLocalStorage();

        if (!id) {
            clearForm();
        }
        setFormStatus('Success!');
    }

    //const classes = useStyles();

    return (<>
        <div>{formStatus}</div>
        <div id='center'>
        <form /*className={classes.center}*/ onSubmit={handleSubmit}>
             <label>
                 Title: 
                <input required type="text" value={title} onChange={handleTitleChange}/>
            </label>
            <label>
                 Brief description: 
                <textarea required value={briefDescription} onChange={handleBriefDescriptionChange}/>
            </label>
            <label>
                 Preparation time (in minutes): 
                <input required type="number" value={preparationTime} onChange={handlePreparationTimeChange}/>
            </label> 
            <label>
                 Product list: 
                <input type="text" value={currentProduct} onChange={handleCurrentProductChange}/>
            </label>
            <button type="button" onClick={addProduct}>Add product</button>
            <List items={productList}/>
            <label>
                 Image url: 
                <input required type="url" value={url} onChange={handleUrlChange}/>
            </label>
            <label>
                 Full description: 
                <textarea required value={fullDescription} onChange={handleFullDescriptionChange}/>
            </label> 
            <label>
                 Tags: 
                <input type="text" value={currentTag} onChange={handleCurrentTagChange}/>
            </label>
            <button type="button" onClick={addTag}>Add tag</button>
            <List items={tags}/>
            <input type="submit" value="Submit" />
        </form>
        </div>
    </>);
}