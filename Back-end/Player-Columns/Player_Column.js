import { Speaker_Token_Btn } from "./Rows/Speaker_Token.js";
import { Player_Strategy_Btn } from "./Rows/Startegy_Card.js";
import { Planets_Total_HTML } from "./Rows/Planet_Total.js";
import { Tech_HTML } from "./Rows/Tech-Row/Tech_HTML.js";
import { Modify_Tech_HTML } from  "./Rows/Tech-Row/Tech_HTML.js";


export class Sub_Player_HTML {
    constructor(Name, Color, Faction, Index, Parent) {
        this.Name = Name;
        this.Color = Color;
        this.Faction = Faction;
        this.Index = Index;
        this.Parent = Parent;
        this.Score = 0;
    }

    Remove_Column() {
        this.Parent.removeChild(this.Column);
    }

    Add_Column() {
        this.Column = document.createElement("div");
        this.Column.id = `Player-${this.Index}-Column`;
        this.Column.className = "Player-Column";
    }

    Add_Player_Color_Name() {
        this.Name_Row = new Name_Row(this.Name, this.Color, this.Faction, this.Column);
    }


    Append_Column() {
        if(this.Parent) {
            this.Parent.appendChild(this.Column);
        } else {
            console.log("Player Parent is Null");
        }
    }

}


export class Modify_Player_HTML extends Sub_Player_HTML {
    constructor(Name, Color, Faction, Index) {
        let Parent = document.getElementById("Player-Modify-Tech-Columns");
        super(Name, Color, Faction, Index, Parent);
        this.Main();

    }

    Add_Tech_Row() {
        // let Modify_Tech_Parent = this.Tech_Modifier_Parent.querySelector(`#Player-${this.Index}-Column`).querySelector(".Tech-Row");
        const Tech_Row_Class = new Tech_HTML(this.Column, this.Index);
    }

    

    Main() {
        this.Add_Column();
        this.Column.id = this.Column.id + "-Modify";
        this.Add_Player_Color_Name();
        this.Add_Tech_Row();
        this.Append_Column();
    }

    
}




export class Player_HTML {
    constructor(Name, Color, Faction, Index) {
        this.Name = Name;
        this.Color = Color;
        this.Faction = Faction;
        this.Index = Index;
        this.Score = 0;
        this.Tech_Modifier_Parent = document.getElementById("Player-Modify-Tech-Columns");
        this.Parent = document.getElementById("Player-Columns");
        this.Main();
    }

    Remove_Column() {
        this.Parent.removeChild(this.Column);
    }

    Add_Column() {
        this.Column = document.createElement("div");
        this.Column.id = `Player-${this.Index}-Column`;
        this.Column.className = "Player-Column";
    }

    Add_Player_Color_Name() {
        this.Name_Row = new Name_Row(this.Name, this.Color, this.Faction, this.Column);
    }


















    Add_Tech_Row() {
        // let Modify_Tech_Parent = this.Tech_Modifier_Parent.querySelector(`#Player-${this.Index}-Column`).querySelector(".Tech-Row");
        const Tech_Row_Class = new Modify_Tech_HTML(this.Column);
        // Tech_Row_Class.Main();
    }

    

    Make_Turn_Info_Row_Container() {
        let Div = document.createElement('div');
        Div.className = "Main-Text-Row";
        return Div;
    }

    Add_Turn_Info_Row() {
        this.Speaker_Strat_Div = this.Make_Turn_Info_Row_Container();
        new Speaker_Token_Btn(this.Speaker_Strat_Div);
        this.Strat_Dropdown = new Player_Strategy_Btn(this.Speaker_Strat_Div, this.Index);
        this.Column.appendChild(this.Speaker_Strat_Div);
    }

    Add_Score_Row() {
        this.Score_Counter = new Score_Counter_Row(this.Column);
    }

    Add_Planet_Total_Row() {
        new Planets_Total_HTML(this.Column);
    }

    Activate_Player() {
        this.Name_Row.Color_Div.classList.add("Expanded-Color");
    }

    Deactivate_Player() {
        this.Name_Row.Color_Div.classList.remove("Expanded-Color");
    }

    Toggle_Activation_Of_Player() {
        this.Name_Row.Color_Div.classList.toggle("Expanded-Color");
    }

    Is_Active_Player() {
        return this.Name_Row.Color_Div.classList.contains("Expanded-Color");
    }

    Is_Passed(){
        let Strat_Btn = this.Strat_Dropdown.Btn;
        return Strat_Btn.textContent === "P";
    }

    Get_Strat_Card() {
        return this.Strat_Dropdown.Held_Strat_Card;
    }

    Main() {
        this.Add_Column();
        this.Add_Player_Color_Name();
        this.Add_Turn_Info_Row();
        this.Add_Score_Row();
        this.Add_Planet_Total_Row();
        this.Add_Tech_Row();
        if(this.Parent) {
            this.Parent.appendChild(this.Column);
        } else {
            console.log("Player Parent is Null");
        }
        this.Name_Row.Name_Div.addEventListener("contextmenu", function(event) {
            event.preventDefault(); // Stops default browser right-click menu
            this.Toggle_Activation_Of_Player();
        }.bind(this));
    } 
}

class Name_Row {
    constructor(name, color, faction, parent) {
        this.Name = name;
        this.Color = color;
        this.Parent = parent;
        console.log(faction);
        this.Faction = faction;
        this.Add_Player_Color_Name();
    }

    Make_Color_Row_Div() {
        let Name_Color_Row = document.createElement("div");
        Name_Color_Row.className = "Main-Text-Row";
        Name_Color_Row.classList.add("Name-Color-Row");
        return Name_Color_Row;
    }

    Make_Icon() {
        let Icon = document.createElement("img");
        Icon.src = this.Faction.Icon_Path;
        return Icon;
    }

    Make_Icon_Div() {
        let Icon_Div = document.createElement("div");
        Icon_Div.className = "Player-Faction-Icon";
        Icon_Div.appendChild(this.Make_Icon());
        // Icon_Div.style.backgroundImage = `url('SVGs/Icons/Faction-Icons/${this.Faction}.svg')`;
        return Icon_Div;
    }

    Make_Name_Div() {
        let Name_Div = document.createElement("div");
        Name_Div.innerHTML = this.Name;
        Name_Div.className = "Player-Name"
        return Name_Div;
    }

    Make_Color_Div() {
        let Color_Div = document.createElement("div");
        Color_Div.className = "Player-Color";
        Color_Div.style.backgroundColor = Player_Colors[this.Color];
        return Color_Div;
    }

    Add_Player_Color_Name() {
        let Name_Color_Row = this.Make_Color_Row_Div();
        this.Icon_Div = this.Make_Icon_Div();
        this.Name_Div = this.Make_Name_Div();
        this.Color_Div = this.Make_Color_Div();
        Name_Color_Row.appendChild(this.Icon_Div);
        Name_Color_Row.appendChild(this.Name_Div);
        Name_Color_Row.appendChild(this.Color_Div);
        this.Parent.appendChild(Name_Color_Row);
    }

}

class Score_Counter_Row {
    constructor(Parent) {
        this.Parent = Parent;
        this.Add_Score_Row();
    }

    Make_Score_Row_Div() {
        let Score_Row_Div = document.createElement("div");
        // Score_Row_Div.className = "Score-Row";
        Score_Row_Div.classList.add("Main-Text-Row");
        return Score_Row_Div;
    }

    Make_Counter_Container() {
        const Container = document.createElement("div");
        Container.className = "Score-Counter-Container";
        return Container;
    }

    Make_Score_Div() {
        let Score_Div = document.createElement("input");
        Score_Div.id = `Score-Player-${this.Index}`;
        Score_Div.className = "Score-Input";
        Score_Div.type = "text";
        Score_Div.value = "0";
        return Score_Div;
    }

    //Might make these buttons the color of each player
    //Not sure when I should add event listeners for these
    Make_Minus_Btn() {
        let Minus_Btn = document.createElement("button");
        Minus_Btn.className = "Minus-Btn";
        Minus_Btn.innerText = "-";
        return Minus_Btn;
    }

    Make_Plus_Btn() {
        let Plus_Btn = document.createElement("button");
        Plus_Btn.className = "Plus-Btn";
        Plus_Btn.innerText = "+";
        return Plus_Btn;
    }

    Minus_Score() {
        let currentValue = parseInt(this.Counter_Text.value, 10) || 0;
        this.Counter_Text.value = Math.max(0, currentValue - 1); // Prevent negative values
    }

    Plus_Score() {
        let currentValue = parseInt(this.Counter_Text.value, 10) || 0;
        this.Counter_Text.value = currentValue + 1;
    }

    Make_Score_Btns_Func() {
        this.Minus_Btn.addEventListener('click', this.Minus_Score.bind(this));
        this.Plus_Btn.addEventListener('click', this.Plus_Score.bind(this));
    }

    //might add the event listeners here
    Make_Counter_Div() {
        let Counter_Container = this.Make_Counter_Container();
        this.Counter_Text = this.Make_Score_Div();
        this.Minus_Btn = this.Make_Minus_Btn();
        this.Plus_Btn = this.Make_Plus_Btn();
        this.Make_Score_Btns_Func()
        Counter_Container.appendChild(this.Minus_Btn);
        Counter_Container.appendChild(this.Counter_Text);
        Counter_Container.appendChild(this.Plus_Btn);
        return Counter_Container;
    }

    Add_Score_Row() {
        let Score_Row = this.Make_Score_Row_Div();
        let Counter = this.Make_Counter_Div();
        Score_Row.appendChild(Counter);
        this.Parent.appendChild(Score_Row);
    }





}


