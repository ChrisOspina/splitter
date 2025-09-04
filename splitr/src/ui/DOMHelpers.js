export class DOMHelpers {
    static getElementbyId(id) { 
        const element = document.getElementById(id);
        if (!element) {
            throw new Error(`Element with id ${id} not found`);
        }
        return element;
    }

    static createOption(text, value){
        return new Option(text, value);
    }

    static createListItem(text, className=""){
        const li = document.createElement("li");
        li.textContent = text;
        if(className){
            li.className = className;
        }
        return li;  
    }

    static clearElement(element){
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }}

}