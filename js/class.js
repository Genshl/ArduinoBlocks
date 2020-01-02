// змінна для генерування ID елементів на сторінці
var elementId = 0;
// хеш для збереження перемінних для відправки на сервер
var data = new Map();
// хеш для збереження елементів для відправки на сервер
var elementsData = new Map();
// функція для відправлення даних на обрбку (покищо бета (-_-) )
function sendData(){
    // очищаємо візуальне поле від попередніх значень
    document.getElementById("code").innerHTML = "";
    //
    let variablesText = "";
    let elementsText = "";
    // заповнюємо візуальне поле вмістом масиву
    for (let key of data.keys()) {
        document.getElementById("code").insertAdjacentHTML("beforeEnd", key+" -> "+data.get(key) + "<br>");
        variablesText += data.get(key);
        
    }
    console.log(variablesText);
    for (let key of elementsData.keys()) {
        document.getElementById("code").insertAdjacentHTML("beforeEnd", key+" -> "+elementsData.get(key) + "<br>");
        elementsText += elementsData.get(key);
    }
    console.log(elementsText);
    // поставити всі елементи в перемінну

    document.getElementById("senderVariables").value = variablesText;
    document.getElementById("senderElements").value = elementsText;
}
// видалення змінної
function deleteRow(i){
    // видаляємо змінну як візуальний елемент на сторінці
    document.getElementById(i).remove();
    // видаляємо дані з масиву які відповідають візуальному елементу
    data.delete(i);
}
// клас для створення і обробки змінних
class HandlerValue {
    constructor(typeVariableId, nameVariableId, valueVariableId, containerId){
        // змінні для збереження id елементів на сторінці
        this.typeVariableId = typeVariableId;
        this.nameVariableId = nameVariableId;
        this.valueVariableId = valueVariableId;
        this.containerId = containerId;
        // отримуємо посилання на елемент в якому будуть розміщені змінні
        this.variablesContainer = document.getElementById(containerId);
        // змінні для збереження значень переданих головною формою
        this.typeVariable = "";
        this.nameVariable = "";
        this.valueVariable = "";
        // створення масиву для збереження даних які будуть відправлені на сервер
        
        // змінна для збереження нового елементу змінної який буде створюватись
        this.element;
    }
    // функція для добавлення змінної в контейнер
    addVariable() {
        // беремо всі значення з головної форми
        this.typeVariable = document.getElementById(this.typeVariableId).value;
        this.nameVariable = document.getElementById(this.nameVariableId).value;
        this.valueVariable = document.getElementById(this.valueVariableId).value;
        // перевіряємо чи не пусті поля для вводу
        if(this.typeVariable == "nonType" || this.nameVariable == "") {
            alert("pls enter all fields");
        }else{
            // створюємо елемент для вставки
            this.element = "<div class='row' id='"+elementId+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableType' value='"+this.typeVariable+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputVariableName' value='"+this.nameVariable+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputVariableValue' value='"+this.valueVariable+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='deleteRow("+elementId+")'>DEL</button></div></div>";
            // записуємо значення в асоціативний масив
            if(this.valueVariable == "" || this.valueVariable === null) {
                data.set(elementId,this.typeVariable+"_"+this.nameVariable+"_"+"\"\""+";\n");
            }else{
                data.set(elementId,this.typeVariable+"_"+this.nameVariable+"_"+this.valueVariable+";\n");
            }
            // вставляємо елемент в кінець контейнеру
            this.variablesContainer.insertAdjacentHTML("beforeEnd", this.element);
            // збільшуємо загальний id 
            elementId++;
        }
    }
}

class HandlerElement {
    constructor(elementPinId, typeElementId, elemetnNameId, containerId){
        // змінні для збереження id елементів на сторінці
        this.elementPinId = elementPinId;
        this.typeElementId = typeElementId;
        this.elemetnNameId = elemetnNameId;
        this.containerId = containerId;
        // отримуємо посилання на елемент в якому будуть розміщені змінні
        this.elementsContainer = document.getElementById(containerId);
        // змінні для збереження значень переданих головною формою
        this.elementPin = "";
        this.typeElement = "";
        this.elementName = "";
        // змінна для збереження нового елементу змінної який буде створюватись
        this.UIelement;
    }
    // функція для добавлення змінної в контейнер
    addElement() {
        // беремо всі значення з головної форми
        this.elementPin = document.getElementById(this.elementPinId).value;
        this.typeElement = document.getElementById(this.typeElementId).value;
        this.elementName = document.getElementById(this.elemetnNameId).value;
        // перевіряємо чи не пусті поля для вводу
        if(this.elementPin == "nonPin" || this.typeElement == "nonType" || this.elementName == "") {
            alert("pls enter all fields");
        }else{
            // створюємо елемент для вставки
            this.UIelement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputPIN' value='"+this.elementPin+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputElementType' value='"+this.typeElement+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputElementName' value='"+this.elementName+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='deleteRow("+elementId+")'>DEL</button></div></div>"
            // записуємо значення в асоціативний масив
            elementsData.set(elementId,this.elementPin+"_"+this.typeElement+"_"+this.elementName+";\n");
            // вставляємо елемент в кінець контейнеру
            this.elementsContainer.insertAdjacentHTML("beforeEnd", this.UIelement);
            // збільшуємо загальний id 
            elementId++;
        }
    }
}
var handlerValue = new HandlerValue("inputTypeVariable", "inputVariableName", "inputVariableValue", "containerForVariables");
var handlerElement = new HandlerElement("inputPIN", "inputElementType", "inputElementName", "containerForElements");