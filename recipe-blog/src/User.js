import { v4 as uuidv4 }  from 'uuid';

export default class User {
    constructor(name, username, password, gender, userRole, status, 
        imageURL, description){
            this.id = uuidv4();
            this.name = name;
            this.username = username;
            this.password = password;
            this.gender = gender;
            this.userRole = userRole;
            this.imageURL = imageURL;
            this.description = description;
            this.status = status;
            this.dateTimeRegistered = new Date();
            this.dateTimeLastModified = new Date();
    }
}