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
           const share = expense.amount/ userCount;

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
         console.log("Calculating settlements", net);
 
        //Declare a results array
        const results = [];

        //Filter out balanced users
        const names = Object.keys(net).filter(
            (name) => Math.abs(net[name]) > 0.01
        );

        //Sort users by net amount
        names.sort((a,b) => net[a] - net[b]);

        //Two pointer approach
        let i = 0; //Who owes the most amount of money
        let j = names.length -1; //Who is to receive the most amount of money

        while(i < j){
            const creditor = names[j];  
            const debtor = names[i];    
            const settlment = Math.min(-net[debtor], net[creditor]);

            if(settlment > 0.01){
                net[debtor] += settlment; //Reduce the debt
                net[creditor] -= settlment; //Reduce the credit

                results.push({from: debtor, to: creditor, amount: settlment}); //Push the result
            }

            if(Math.abs(net[debtor]) < 0.01){
                i++; //Move to the next debtor
            }
            if(Math.abs(net[creditor]) < 0.01){
                j--; //Move to the next creditor
            }
        }
        return results;
    }
}