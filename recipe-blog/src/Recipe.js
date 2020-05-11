import { v4 as uuidv4 } from 'uuid';

export default class Recipe {
    constructor(userId, title, briefDescription, preparationTime, 
        productList, imageURL, fullDescription, tagList) {
            this.id = uuidv4();
            this.userId = userId;
            this.title = title;
            this.briefDescription = briefDescription;
            this.preparationTime = preparationTime;
            this.productList = productList;
            this.imageURL = imageURL;
            this.fullDescription = fullDescription;
            this.tagList = tagList;
            this.dateTimeRegistered = new Date();
            this.dateTimeLastModified = new Date();
    }
}