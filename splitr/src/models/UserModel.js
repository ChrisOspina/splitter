export class UserModel {
    constructor(name) {
        if(!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Invalid name provided');
        }
        this.name = name.trim();
        this.id = this.generateId();
    }

    generateId(){
        return crypto.randomUUID();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
