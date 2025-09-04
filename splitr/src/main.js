import { ExpenseUI } from "./ui/expenseUI";
import { UserService } from "./services/userService.js";    
import { ExpenseService } from "./services/expenseService.js";

const userService = new UserService();
const expenseService = new ExpenseService();

class ExpenseApp {
   constructor() {
        this.userService = new UserService();
        this.expenseService = new ExpenseService(this.userService);
        this.expenseUI = null;
   }
   init(){
        try{
            this.expenseUI = new ExpenseUI(this.userService, this.expenseService);
            console.log("Splitr app initialized successfully");
        }
        catch(error){
            console.error("Error initializing app:", error);
        }
   } 
}

let expenseApp;
document.addEventListener("DOMContentLoaded", () => {
    expenseApp = new ExpenseApp();
    expenseApp.init();
});

window.addEventListener("load", () => {
    if(!expenseApp){
        expenseApp = new ExpenseApp();
        expenseApp.init();
    }
});

new ExpenseApp();
