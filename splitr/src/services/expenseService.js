import { ExpenseModel } from "../models/ExpenseModel";
import { UserService } from "./userService";

export class ExpenseService {
    constructor(userService) {
        this.expenses = [];
        this.userService = userService;
    }

    addExpense(paidBy, amount, description) {
        if(!this.userService.hasUser(paidBy)) {
            throw new Error('paidBy is required to add an expense');
        }
        const expense = new ExpenseModel(paidBy, amount, description);
        this.expenses.push(expenses);
        return expense;
    }

    getAllExpenses() {
        return [...this.expenses];
    }

    getExpensesByUser(userService){
        return this.expenses.filter(expense => expense.paidBy === userService); 
    }

    clear(){
        this.expenses = [];
    }

    simplifyExpenses() {
        //TODO: Implement this method to simplify expenses among users
    }
}