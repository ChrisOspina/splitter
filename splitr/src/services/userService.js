import { UserModel } from "../models/UserModel";

export class UserService {
    constructor() {
        this.users = new Map();
    }

    addUser(name) {
        if(!name) {
            throw new Error('Name is required to add a user');
        }

        const trimmedName = name.trim();

        if(this.users.has(trimmedName)) {
            throw new Error('User already exists');
        }

        const user = new UserModel(name);
        this.users.set(trimmedName, user);
        return user;
    }

    getUser(name) {
        return this.users.get(name);
    }

    getAllUsers() {
        return Array.from(this.users.values());
    }

    getUserNames() {
        return Array.from(this.users.keys());
    }

    hasUser(name) {
        return this.users.has(name);
    }

    getUserCount() {
        return this.users.size;
    }

    clear(){
        this.users.clear();
    }
}