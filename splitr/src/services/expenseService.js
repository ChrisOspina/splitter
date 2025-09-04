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
        this.expenses.push(expense);
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
        console.log("Simplifying expenses", this.expenses);

        //Calculate total expenses
        const userCount = this.userService.getUserCount();
        if(userCount === 0){
            throw new Error("No users available to split expenses");
        }

        const net = {};
        const userNames = this.userService.getAllUsers();

        userNames.forEach(user => {
            net[user] = 0;
        })

        this.expenses.forEach(expense => {
           const share = expense/ userCount;

           userNames.forEach(user => {
            if(user === expense.paidBy){
                net[user] += (expense.amount - share);
            }
           });
        });

        //Determine who owes whom

        //Match who owes with who receives
        return this.calculateSettlements(net);
    }

    calculateSettlements(net){
        
    }
}