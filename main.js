import { Player_Tech_Btn } from './Tech_Btn.js'; 
import { HTML_Text_Column } from './Player_Table_Text_Column.js';
import { Sidebar } from './Sidebar.js';
import { Card_Search } from './Card_Search.js';
import { Player_HTML } from './Player_Column.js';
import { Modify_Player_HTML } from './Player_Column.js';




// import Tech_Cards from './Tech.json';


window.onload = async function() {
    window.resizeTo(1920, 1080);
    await Import_Tech_Cards();
    // Display_Tech_Cards();
    await Import_Agenda_Cards();
    await Import_Tech_Icons();
    await Setup_All_Close_All_Overlays();
    
    window.Player_Manager = new Player_Manager();
    window.Sidebar = new Sidebar();
    window.Card_Search = new Card_Search();
    new Public_Scoring_Card(document.getElementById("Public-Obj-Row1"));

}



class Player_Manager {
    constructor() {
        this.Player_Count = 0;
        this.Players = [];
        this.Setup();
    }

    Setup() {
        document.addEventListener("auxclick", (event) => {
            if(event.button === 1) {
                event.preventDefault();
                this.Next_Player_Turn();
            }
        });
    }

    Get_New_Player_Info() {
        this.Player_Name = document.getElementById("Player-Name-Input").value;
        this.Player_Color = document.querySelector('input[name="color"]:checked').value;
    }

    Add_Player() {
        this.Get_New_Player_Info();
        let Player_Temp = new Player_HTML(this.Player_Name, this.Player_Color, this.Player_Count);
        new Modify_Player_HTML(this.Player_Name, this.Player_Color, this.Player_Count);
        this.Players.push(Player_Temp);
        this.Player_Count++;
    }

    Remove_Player(index) {
        this.Players[index].Remove_Column();
        this.Players.splice(index, 1);
    }

    Get_Whos_Turn_It_Is() {
        this.Current_Player = null;
        this.Players.forEach((Player) => {
            if(Player.Is_Active_Player()) {
                this.Current_Player = Player;
            }
        });
        
    }

    Get_Player_With_Fastest_Strat_Card() {
        let closestPlayer = null;
        let minValue = Infinity;

        for (const player of this.Players) {
            const stratCard = player.Get_Strat_Card?.();
            console.log((player.Is_Passed() === false));
            if (stratCard && stratCard !== "P" && !isNaN(stratCard) && Number.isInteger(Number(stratCard)) && !player.Is_Passed()) {
                const playerValue = Number(stratCard);
                if (playerValue < minValue) {
                    minValue = playerValue;
                    closestPlayer = player;
                }
            }
        }
        return closestPlayer;
    }

    Get_Next_Players_Turn() {
        
        // Validate input: return null if players array is invalid or empty
        if (!Array.isArray(this.Players) || this.Players.length === 0) {
            return null;
        }
        // If currentStratCard is null, find player with lowest valid strat card
        if (this.Current_Player === null) {
            return this.Get_Player_With_Fastest_Strat_Card();
        }

        let currentStratCard = this.Current_Player.Get_Strat_Card();

        // Original logic for non-null currentStratCard
        if (currentStratCard === "P" || 
            isNaN(currentStratCard) || 
            !Number.isInteger(Number(currentStratCard))) {
            return null;
        }

        const currentValue = Number(currentStratCard);
        let closestPlayer = null;
        let minDifference = Infinity;

        for (const player of this.Players) {
            const stratCard = player.Get_Strat_Card?.();
            if (stratCard && stratCard !== "P" && !isNaN(stratCard) && Number.isInteger(Number(stratCard)) && !player.Is_Passed()) {
                const playerValue = Number(stratCard);
                if (playerValue > currentValue && playerValue - currentValue < minDifference) {
                    minDifference = playerValue - currentValue;
                    closestPlayer = player;
                }
            }
        }
        if(closestPlayer === null) {
            return this.Get_Player_With_Fastest_Strat_Card();
        }

        return closestPlayer;
    }

    Next_Player_Turn() {
        this.Get_Whos_Turn_It_Is();
        let Next_Player = this.Get_Next_Players_Turn();
        
        if(this.Current_Player !== null) {
            this.Current_Player.Deactivate_Player();
        }
        Next_Player.Activate_Player();
    }


}

window.Player_Colors = { "red": '#d32f2f',
                        "blue": '#1976d2',
                        "green": '#388e3c',
                        "yellow": '#FBC02D',
                        "purple": '#7B1FA2',
                        "black": '#212121',
                        "orange": '#f57c00',
                        "pink": '#e91e63'
                    };


async function Setup_All_Close_All_Overlays() {
    document.querySelectorAll(".Close-Overlay-Btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".Top-Overlay").forEach((overlay) => {
                overlay.classList.add("Hidden");
            });
        });
    });
};



async function Import_Tech_Cards() {
    try {
        const response = await fetch("./Json/Tech.json");
        const data = await response.json();
        window.Tech_Cards = data;
        console.log(data); // Log the data
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
};

async function Import_Tech_Icons() {
    try {
        const response = await fetch("./Json/Tech_Icons.json");
        const data = await response.json();
        window.Tech_Icons_Path = data;
        console.log(data); // Log the data
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

async function Import_Agenda_Cards() {
    try {
        const response = await fetch("./Json/Agendas.json");
        const data = await response.json();
        window.Agenda_Cards = data;
        window.Agenda_Cards_Upper = Object.fromEntries(
            Object.entries(window.Agenda_Cards).map(([key, value]) => [key.toUpperCase(), value])
        );
        console.log(data); // Log the data
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
};

function Display_Tech_Cards() {
    if (window.Tech_Cards) {  // Ensure Tech_Cards is defined before using it
        const Tech_HTML = new HTML_Text_Column();
        Tech_HTML.Main();
    } else {
        console.error("Tech_Cards failed to load.");
    }
};






//Might have been better to make all under that same thing
//json file {"Row1": "Title": "Red", ["tech1", ...} }











function filterKeys() {
    const searchTerm = document.getElementById("Agenda-Search-Bar").value.toLowerCase();
    const filteredKeys = Object.keys(window.Agenda_Cards).filter(key => key.startsWith(searchTerm));
    
    displayKeys(filteredKeys);
}






class  Pub_Obj {
    constructor(parent, index, key) {
        this.Parent = parent;
        this.Index = index;
        this.Key = key;
        this.Agenda_Obj = window.Agegvvnda_Cards_Upper[key];
        
        this.Main();
    }


    Make_Container() {
        this.Container = document.createElement("div");
        this.Container.id = `Agenda-${this.Key}`;
        const Type = this.Agenda_Obj["Type"];
        this.Container.className = "Agenda-Container";
        this.Container.classList.add(`Agenda-Container-${Type}`);
    }

    Make_Title_Box() {
        this.Title = document.createElement("div");
        this.Title.className = "Agenda-Title";
        this.Title.classList.add("Agenda-Text");
        this.Title.innerText = this.Key;
        this.Container.appendChild(this.Title);
    }

    Make_Type_Box() {
        this.Type = document.createElement("div");
        this.Type.className = "Agenda-Type";
        this.Type.classList.add("Agenda-Text");
        this.Type.classList.add(this.Agenda_Obj["Type"]);
        this.Type.innerText = this.Agenda_Obj["Type"];
        this.Container.appendChild(this.Type);
    }   
}


//The Current Idea is to make a class that has everything for
//making that absolute most barebones card
//Then Add classes/methods to change the font
//Make a more fancy adjenda card and so on
class Tracker_Token {
    constructor(parent, Icon_Path) {
        this.Parent = parent;
        this.Path = Icon_Path;
        this.Main();
    }


    Make_Btn() {
        this.Btn = document.createElement("button");
        this.Btn.className = "Tracker-Btn";
    }

    Make_Icon() {
        this.svg = document.createElement("img");
        this.svg.src = this.Path;
        this.svg.className = "Tracker-Icon-Img";
    }

    Construct_Icon_Btn() {
        this.Make_Btn();
        this.Make_Icon();
        this.Btn.appendChild(this.svg);
    }

    Program_Btn() {
        this.Btn.addEventListener("click", (event) => {
            this.svg.classList.toggle("Scored");
        });
    }

    Main() {
        this.Construct_Icon_Btn();
        this.Program_Btn();
        this.Parent.appendChild(this.Btn);
    }


}

class Public_Scoring_Card {

    constructor(parent) {
        this.Parent = parent;
        // this.Factions = factions;
        this.Factions = ["Hacan", "Naalu", "Muaat", "Nomad", "cheiran", "mort"];
        // this.Card_Type = Card;
        this.Path = "../SVGs/Icons/Faction-Icons";
        this.Main();
    }

    Make_Container() {
        this.Container = document.createElement("div");
        this.Container.className = "Scoreable-Obj-Container";
    }

    Make_Icon_Container() {
        this.Icon_Container = document.createElement("div");
        this.Icon_Container.className = "Scoreable-Icon-Container";
    }

    Add_Icon_Btn(faction) {
        const Path = this.Path + "/" + faction + ".svg";
        new Tracker_Token(this.Icon_Container, Path);
    }
    
    Make_Icons() {
        this.Factions.forEach((faction) => {
            this.Add_Icon_Btn(faction);
        })
    }

    Add_Card() {
        new Pub_Obj_HTML(this.Container);
    }

    Main() {
        this.Make_Container();
        this.Make_Icon_Container();
        this.Make_Icons();

        this.Container.appendChild(this.Icon_Container);
        this.Add_Card();
        this.Parent.appendChild(this.Container);
    }
    
}

class Pub_Obj_HTML {
    constructor(parent) {
        this.Parent = parent;
        this.Background = "Public-1-Point";
        // this.Card_Json = card_json;
        this.Card_Json = {"Title": "", "Sub_Header": "", "Desc": ""};
        this.Main();
    }

    Make_Card_Container() {
        this.Container = document.createElement("div");
        this.Container.className = "Card-Container";
    }

    Make_Card_Img() {
        this.Card_Img = document.createElement("div");
        this.Card_Img.className = "Card-Image";
    }

    Make_Title() {
        this.Title = document.createElement("div");
        this.Title.className = "Card-Title";
        this.Title.textContent = this.Card_Json.Title;
    }

    Make_Card_Sub_Header() {
        this.Sub_Header = document.createElement("div");
        this.Sub_Header.className = "Card-Sub-Header";
        this.Sub_Header.textContent = this.Card_Json.Sub_Header;
    }

    Make_Card_Main_Body() {
        this.Main_Body = document.createElement("div");
        this.Main_Body.className = "Cards-Main-Body";
        this.Main_Body.textContent = this.Card_Json.Desc;
    }

    Make_Footer() {
        this.Footer = document.createElement("div");
        this.Footer.className = "Card-Footer";
        this.Footer.textContent = "Victory Point";
    }

    Construct_Card() {
        this.Make_Card_Container();
        this.Make_Card_Img();
        this.Make_Title();
        this.Make_Card_Sub_Header();
        this.Make_Card_Main_Body();
        this.Make_Footer();
        this.Card_Img.appendChild(this.Title);
        this.Card_Img.appendChild(this.Sub_Header);
        this.Card_Img.appendChild(this.Main_Body);
        this.Card_Img.appendChild(this.Footer);
        this.Container.appendChild(this.Card_Img);
    }

    Main() {
        this.Construct_Card();
        this.Parent.appendChild(this.Container);
    }










}


