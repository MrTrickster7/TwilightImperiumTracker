import { Agenda_HTML } from './Agenda_HTML.js';
export class Card_Search {
    constructor() {
        this.keyList = document.getElementById("Card-List");
        this.Cards_Set = window.Agenda_Cards;
        this.Keys = null;
        this.Card_Type = "Agenda";
        this.Setup();
    }

    Display_Card(type, Key) {
        const Parent = document.getElementById("Card-Display-Container");
        Parent.innerHTML = ''; //clear it first;
        new Agenda_HTML(Parent, 0, Key);
        this.Toggle_Bodies();
    }

    Make_Card_Btn(Key) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = Key;
        li.appendChild(btn);
        const Card_Type = this.Card_Type;
        btn.addEventListener('click', () => {
            this.Display_Card(Card_Type, Key);
        });
        return li;
    }

    //Have to make these buttons
    Display_Keys(keys) {
        this.keyList.innerHTML = ""; // Clear previous list
        keys.forEach(key => {
            const li = this.Make_Card_Btn(key);
            this.keyList.appendChild(li);
        });
    }

    Filter_Keys() {
        const searchTerm = document.getElementById("Cards-Search-Bar").value.toUpperCase();
        const filteredKeys = Object.keys(this.Cards_Lowered).filter(key => key.startsWith(searchTerm));
        console.log(filteredKeys);
        this.Display_Keys(filteredKeys);
    }

    Toggle_Bodies() {
        document.getElementById("Main-Body-Display").classList.toggle("Hidden");
        document.getElementById("Main-Body-Search").classList.toggle("Hidden");
    }

    Toggle_HTML() {
        document.getElementById("Top-Card-Search").classList.toggle("Hidden");
    }

    Set_To_Agendas() {
        this.Card_Type = "Agenda";
        this.Cards_Set = window.Agenda_Cards;
        this.Cards_Lowered = Object.fromEntries(
            Object.entries(this.Cards_Set).map(([key, value]) => [key.toUpperCase(), value])
        );
        this.Filter_Keys();
    }

    Setup_Close_Btn() {
        document.getElementById("Close-Card-Search-Btn").addEventListener('click', this.Toggle_HTML.bind(this));
    }

    Setup_Toggle_Btn() {
        document.getElementById("Toggle-Card-Search-Btn").addEventListener('click', this.Toggle_Bodies.bind(this));
    }

    Setup() {
        this.Set_To_Agendas();
        this.Setup_Close_Btn();
        this.Setup_Toggle_Btn();
        document.getElementById("Cards-Search-Bar").addEventListener("keyup", this.Filter_Keys.bind(this));
    }
}