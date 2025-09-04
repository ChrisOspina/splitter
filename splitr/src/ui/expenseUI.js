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
        expenseUserInput: DOMHelpers.getElementbyId("expenseUserInput"),
    }
}

// bind event listeners to UI elements
bindEventListeners(){
    this.elements.addUserForm.addEventListener("submit", (e) => {
       this.handleAddUserFormSubmit(e);
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
        console.error("Error adding user:", error);
        showErrorToast(error.message);
    }
}


intilaizeSelectBox(){
    const defaultOption = new Option("Select User", "");
    this.elements.expenseUserInput.addEventListener(defaultOption);
}

addUserToSelectBox(userName){
    const option = DOMHelpers.createOption(userName, userName);
    this.elements.expenseUserInput.add(option);
}

}
