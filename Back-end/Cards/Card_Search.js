import { Agenda_HTML } from './Agenda_HTML.js';
import { Pub_Obj_HTML } from './Public_Obj.js';
import { Deck } from './Deck/Deck.js';
import { Make_Hidden_Pub_Obj_HTML } from './Public_Obj.js';

export class Card_Search {
    constructor() {
        this.keyList = document.getElementById("Card-List");
        this.Cards_Set = window.Agenda_Cards;
        this.Keys = null;
        this.Card_Type = "Agenda";
        this.Setup();
    }

    // Display_Card(type, Key) {
    //     const Parent = document.getElementById("Card-Display-Container");
    //     Parent.innerHTML = ''; //clear it first;
    //     new Agenda_HTML(Parent, 0, Key);
    //     this.Toggle_Bodies();
    // }

    Display_Card(Key) {
        const Parent = document.getElementById("Card-Display-Container");
        Parent.innerHTML = ''; //clear it first;
        this.Current_Key = Key;
        if(this.Card_Type == "Agenda") {
            new Agenda_HTML(Parent, 0, Key); // this is be replaced by Pub_Obj_HTML() 1 day or atleast be put inside it
        } else if(this.Card_Type == "Public-1-Point") {
            new Pub_Obj_HTML(Parent, this.Card_Type, window.All_Cards[this.Card_Type][Key]).Main();
        } else if(this.Card_Type == "Public-2-Point") {
            new Pub_Obj_HTML(Parent, this.Card_Type, window.All_Cards[this.Card_Type][Key]).Main();
        } else if(this.Card_Type == "Secret") {
            let Card = new Pub_Obj_HTML(Parent, this.Card_Type, window.All_Cards[this.Card_Type][Key]);
            Card.Main();
            Card.Footer.remove(); //We Need to fix this, by redoing the pub obj .png and keep the footers in them
        }
        // this.Toggle_Bodies();
        this.Show_Card_Display();
    }

    Make_Card_Btn(Key) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = Key;
        li.appendChild(btn);
        // const Card_Type = this.Card_Type;
        btn.addEventListener('click', () => {
            this.Display_Card(Key);
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
        const filteredKeys = Object.keys(this.Cards_Set).filter(key => key.toUpperCase().startsWith(searchTerm));
        this.Display_Keys(filteredKeys);
    }

    Toggle_Bodies() {
        document.getElementById("Main-Body-Display").classList.toggle("Hidden");
        document.getElementById("Main-Body-Search").classList.toggle("Hidden");
    }

    Hide_Card_Display() {
        document.getElementById("Main-Body-Display").classList.add("Hidden");
        document.getElementById("Main-Body-Search").classList.remove("Hidden");
    }

    Show_Card_Display() {
        document.getElementById("Main-Body-Display").classList.remove("Hidden");
        document.getElementById("Main-Body-Search").classList.add("Hidden");
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
    //This is basically to make sure when I do this.Set_To();
    //The correct radio button is "checked"
    Make_Sure_Radio_Selection_Is_Accurate() {
        let Card_Type_Btns = document.querySelectorAll('input[name="Card-Type"]');
        Card_Type_Btns.forEach((Input) => {
            Input.checked = (Input.value == this.Card_Type);
        });
    }

    Set_To(Card_Type) {
        this.Card_Type = Card_Type;
        this.Cards_Set = window.All_Cards[Card_Type];
        // this.Cards_Lowered = Object.fromEntries(
        //     Object.entries(this.Cards_Set).map(([key, value]) => [key.toUpperCase(), value])
        // );
        this.Make_Sure_Radio_Selection_Is_Accurate();
        this.Filter_Keys();
    }

    Program_Radio_Btns() {
        let Radio_Btns = document.querySelectorAll('input[name="Card-Type"');

        Radio_Btns.forEach((Btn) => {
            Btn.addEventListener("change", (event) => {
                //add here event.target.value
                this.Hide_Card_Display();
                this.Set_To(event.target.value);
            });
        });
    }

    Setup_Decks() {
        this.Decks = {};
        const Keys = Object.keys(window.All_Cards);
        Keys.forEach((Key) => {
            this.Decks[Key] = new Deck(window.All_Cards[Key]);
        });
    }

    Setup_Close_Btn() {
        document.getElementById("Close-Card-Search-Btn").addEventListener('click', this.Toggle_HTML.bind(this));
    }

    Setup_Toggle_Btn() {
        document.getElementById("Toggle-Card-Search-Btn").addEventListener('click', this.Toggle_Bodies.bind(this));
    }

    Draw_Card() {
        let Card = this.Decks[this.Card_Type].Draw_Card();
        this.Display_Card(Card);
        
    }

    Setup_Draw_Btn() {
        let btn = document.getElementById("Draw-Card-Search-Btn");
        btn.addEventListener("click", this.Draw_Card.bind(this));
    }

    Random_Card() {
        let Card = this.Decks[this.Card_Type].Pick_One_Of_Any();
        this.Display_Card(Card);
    }

    Setup_Random_Btn() {
        let btn = document.getElementById("Random-Card-Search-Btn");
        btn.addEventListener("click", this.Random_Card.bind(this));
    }
    
    Select_Card() {
        console.log("Card Selected Function");
        if(this.Card_Type !== "Agenda") {
            console.log("Inside if statement");
            this.Card_To_Replace.innerHTML = ""; 
            new Pub_Obj_HTML(this.Card_To_Replace, this.Card_Type, window.All_Cards[this.Card_Type][this.Current_Key]).Main();
        }
    }

    Setup_Select_Btn() {
        let btn = document.getElementById("Select-Card-Search-Btn");
        btn.addEventListener('click', this.Select_Card.bind(this));
    }

    Setup() {
        this.Program_Radio_Btns();
        this.Set_To_Agendas();
        this.Setup_Decks();
        this.Setup_Close_Btn();
        this.Setup_Toggle_Btn();
        this.Setup_Draw_Btn();
        this.Setup_Random_Btn();
        this.Setup_Select_Btn();
        document.getElementById("Cards-Search-Bar").addEventListener("keyup", this.Filter_Keys.bind(this));
    }
}