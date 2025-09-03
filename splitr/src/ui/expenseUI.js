import { DOMHelpers } from "./DOMHelpers.js";

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
        addUserForm: DOMHelpers.getElementById("addUserForm"),
        userName: DOMHelpers.getElementById("userName"),
    }
}

// bind event listeners to UI elements
bindEventListeners(){
    this.elements.addUserForm.addUserForm("submit", (e) => {
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
        
        console.log("User added:", user);   

    }catch(error){
        console.error("Error adding user:", error);
    }
    /*const formData = new FormData(this.elements.addUserForm);
    const userName = formData.get("userName");
    this.userService.addUser(userName);
    this.elements.addUserForm.reset();
    this.intilaizeSelectBox();*/
}

//take care of the expense select box


}
