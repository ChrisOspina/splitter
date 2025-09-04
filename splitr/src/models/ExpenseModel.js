export class ExpenseModel {
    constructor(paidBy, amount, description=null){  
        if(!paidBy || typeof paidBy !== 'string' || paidBy.trim().length === 0) {
            throw new Error('Invalid user provided');
        }

         if(!amount || typeof amount !== 'number' || amount<= 0) {
            throw new Error('Amount must be greater than zero');
        }

        this.id = this.generateId();
        this.paidBy = paidBy.trim();
        this.amount = parseFloat(amount.toFixed(2));
        this.timestamp = new Date().toISOString();
        this.description = description ? description.trim() : null;
    }  

    generateId(){
        return crypto.randomUUID();
    }
}