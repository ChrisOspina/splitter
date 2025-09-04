import { DOMHelpers } from "./DOMHelpers.js";
import { showSuccessToast, showErrorToast } from "../utils/toastUtil.js";

export class ExpenseUI {

    constructor(userSerivice, expenseService) {
        this.userService = userSerivice;
        this.expenseService = expenseService;

        this.initializeUIElements();
        this.bindEventListeners();
        this.intilaizeSelectBox();  
        //this.populateExpenseSelectBox();
    }

//Initialize all UI elements
initializeUIElements() {
    this.elements={
        addUserForm: DOMHelpers.getElementbyId("addUserForm"),
        userName: DOMHelpers.getElementbyId("userName"),
        addExpenseForm: DOMHelpers.getElementbyId("addExpenseForm"),
        expenseUserInput: DOMHelpers.getElementbyId("expenseUserInput"),
        expenseAmountInput: DOMHelpers.getElementbyId("expenseAmountInput"),
        expenseDescriptionInput: DOMHelpers.getElementbyId("expenseDescriptionInput"),
        paymentList: DOMHelpers.getElementbyId("paymentList"),
        calculateBtn: DOMHelpers.getElementbyId("calculateBtn"),
        resultArea: DOMHelpers.getElementbyId("resultArea"),
    }
}

// bind event listeners to UI elements
bindEventListeners(){
    this.elements.addUserForm.addEventListener("submit", (e) => {
       this.handleAddUserFormSubmit(e);
    })

    this.elements.addExpenseForm.addEventListener("submit", (e) => {
        this.handleAddExpense(e);});

    this.elements.calculateBtn.addEventListener("click", (e) => {
        this.handleCalculate();
        showSuccessToast("Settlements calculated. Check console for details.");
    })
}

handleAddUserFormSubmit(e) {
    e.preventDefault();

    try{
        const name = this.elements.userName.value.trim();
        if(!name.length){
            throw new Error("Please enter a valid name");
        }
        //Use the service to add the user
        const user = this.userService.addUser(name);
        this.elements.addUserForm.reset();

        // Update the select box with the new user
        this.addUserToSelectBox(user.name);
        
        showSuccessToast(`User ${user.name} added successfully`);

    }catch(error){
        showErrorToast(error.message);
    }
}


intilaizeSelectBox(){
    const defaultOption = DOMHelpers.createOption("Select User", "");
    this.elements.expenseUserInput.add(defaultOption);
}

addUserToSelectBox(userName){
    const option = DOMHelpers.createOption(userName, userName);
    this.elements.expenseUserInput.add(option);
}

handleAddExpense(e){
    e.preventDefault();
    try{
        const paidBy = this.elements.expenseUserInput.value.trim();
        const amount = this.elements.expenseAmountInput.valueAsNumber;
        const description = this.elements.expenseDescriptionInput.value.trim();

        if(!paidBy){
            throw new Error("Please select a user who paid the expense");
        }
        if(!amount || amount <= 0){
            throw new Error("Please enter a valid amount greater than zero");
        }

        const expense = this.expenseService.addExpense(paidBy, amount, description);

        //Render the expenses
        this.renderExpense(expense);
        //Reset the form
        this.elements.expenseAmountInput.value = "";
        this.elements.expenseDescriptionInput.value = "";
        //Show success toast
        showSuccessToast(`Expense of $${expense.amount} added successfully`);


    }
    catch(error){
        console.error("Error adding expense:", error);
        showErrorToast(error.message);

    }
}

renderExpense(expense){
    const text = expense.description !== "No description" ?`${expense.paidBy} paid $${expense.amount} for ${expense.description}`
    :`${expense.paidBy} paid $${expense.amount}`;
    const listItem = DOMHelpers.createListItem(text, "expense-item");

    this.elements.paymentList.appendChild(listItem);    
}

handleCalculate(){
    try{
       const results = this.expenseService.simplifyExpenses();
       this.displayResults(results);
    }
    catch(error){
        console.error("Error calculating expenses:", error);
        showErrorToast(error.message);
    }
}

displayResults(results){
    console.log("Settlement Results:", results);

    DOMHelpers.clearElement(this.elements.resultArea);

    if(results.length === 0){
        const noResultsItem = DOMHelpers.createListItem("No settlements needed. All expenses are balanced.", "no-results");
        this.elements.resultArea.appendChild(noResultsItem);
        return;
    }

}

}
