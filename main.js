import { Player_Tech_Btn } from './Back-end/Player-Columns/Rows/Tech-Row/Tech_Btn.js'; 
import { HTML_Text_Column } from './Back-end/Player-Columns/Player_Table_Text_Column.js';
import { Sidebar } from './Back-end/Sidebar/Sidebar.js';
import { Card_Search } from './Back-end/Cards/Card_Search.js';
import { Player_HTML } from './Back-end/Player-Columns/Player_Column.js';
import { Modify_Player_HTML } from './Back-end/Player-Columns/Player_Column.js';
import { Pub_Obj_HTML } from './Back-end/Cards/Public_Obj.js';

// On the Agenda:
// - Re-orginize the Card_Search Code (Delete unnessicary Classes that add bloat)
//      - Think top down more
// - Update faction Icons when player is added
// - Pull-up available OBJ card when you click on back of OBJ card
// - Add a Draw random btn, need to add decks class
// - Add a way to modify or delete them after
// - Add a Bonus Meme for a bonus OBJ card


// - later Add a way to see everything other people are holding
//   - planets, relic fragments, relics, promissary notes, ect.
//   - agents, abilities, 

// - Add a fighting options to do all the rolling for you



window.onload = async function() {
    window.resizeTo(1920, 1080);
    await Import_Tech_Cards();
    await Import_Agenda_Cards();
    await Import_All_Cards();
    await Import_Tech_Icons();
    await Import_Factions();
    await Setup_All_Close_All_Overlays();

    
    window.Player_Manager = new Player_Manager();
    window.Sidebar = new Sidebar();
    window.Card_Search = new Card_Search();
    window.Faction_Search = new Faction_Search(window.Factions);
    window.Public_Scoring_Cards = [];
    for(let i=0; i<5; i++) {
        let Card = new Public_Scoring_Card(document.getElementById("Public-Obj-Row1"), "Public-1-Point");
        let Card2 = new Public_Scoring_Card(document.getElementById("Public-Obj-Row2"), "Public-2-Point");
        // let Card3 = new Public_Scoring_Card(document.getElementById("Public-Obj-Row3"), "Bonus");
        // new Make_Hidden_Pub_Obj_HTML(document.getElementById("Public-Obj-Row1"), "Public-1-Point");
        // new Make_Hidden_Pub_Obj_HTML(document.getElementById("Public-Obj-Row2"), "Public-2-Point");
        window.Public_Scoring_Cards.push(Card);
        window.Public_Scoring_Cards.push(Card2);
    }
}








class Player_Manager {
    constructor() {
        this.Players = [];
        this.Factions = [];
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
        this.Player_Faction = document.getElementById("Faction-Search-Bar").value;
        this.Player_Faction = window.Factions[this.Player_Faction];
    }

    Update_Faction_Icons() {
        window.Public_Scoring_Cards.forEach((Card) => {
            Card.Update_Faction_Icons(this.Factions);
        });
    }

    Update_Other_Classes() {
        this.Update_Faction_Icons();
    }

    Add_Player() {
        this.Get_New_Player_Info();
        let Player_Temp = new Player_HTML(this.Player_Name, this.Player_Color, this.Player_Faction, this.Players.length);
        new Modify_Player_HTML(this.Player_Name, this.Player_Color, this.Player_Faction, this.Players.length);
        this.Players.push(Player_Temp);
        this.Factions.push(this.Player_Faction);
        this.Update_Other_Classes();
    }

    Remove_Player(index) {
        this.Players[index].Remove_Column();
        this.Players.splice(index, 1);
        this.Factions.splice(index, 1);
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
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
};

async function Import_Factions() {
    try {
        const response = await fetch("./Json/Factions.json");
        const data = await response.json();
        window.Factions = data;
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

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

async function Import_All_Cards() {
    try {
        const response = await fetch("./Json/All-Cards.json");
        const data = await response.json();
        window.All_Cards = data;
        window.All_Cards_Upper = Object.fromEntries(
            Object.entries(window.All_Cards).map(([key, key2, value]) => [key, key2, value])
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

    constructor(parent, background) {
        this.Parent = parent;
        this.Background = background;
        this.Factions = [];
        this.Path = "../SVGs/Icons/Faction-Icons";
        this.Main();
    }

    Update_Faction_Icons(Factions) {
        this.Factions = Factions;
        this.Icon_Container.innerHTML = '';
        this.Make_Icons();
    }

    Make_Container() {
        this.Container = document.createElement("div");
        this.Container.className = "Scoreable-Obj-Container";
    }

    Make_Icon_Container() {
        this.Icon_Container = document.createElement("div");
        this.Icon_Container.className = "Scoreable-Icon-Container";
    }

    Make_Card_Section() {
        this.Card_Section = document.createElement("div");
        this.Card_Section.className = "Card-Section";
    }

    Add_Icon_Btn(faction) {
        // const Path = this.Path + "/" + faction + ".svg";
        const Path = faction.Icon_Path;
        new Tracker_Token(this.Icon_Container, Path);
    }
    
    Make_Icons() {
        this.Factions.forEach((faction) => {
            this.Add_Icon_Btn(faction);
        })
    }

    Add_Card() {
        new Make_Hidden_Pub_Obj_HTML(this.Card_Section, this.Background);
    }

    // Make_Back_Card_Btn() {
    //     this.Card_Back
    // }

    Main() {
        this.Make_Container();
        this.Make_Icon_Container();
        this.Make_Icons();
        this.Make_Card_Section();
        this.Add_Card();

        this.Container.appendChild(this.Icon_Container);
        this.Container.appendChild(this.Card_Section);
        this.Parent.appendChild(this.Container);
    }
}





// class Pub_Obj_HTML {
//     constructor(parent, background) {
//         this.Parent = parent;
//         // this.Background = background;
//         this.Background = "Public-1-Point-Back";
//         // this.Card_Json = card_json;
//         this.Card_Json = {"Title": "", "Sub_Header": "", "Desc": ""};
//         this.Main();
//         this.Footer.remove();
//     }

//     Make_Card_Container() {
//         this.Container = document.createElement("div");
//         this.Container.className = "Card-Container";
//     }

//     Make_Card_Img() {
//         this.Card_Img = document.createElement("div");
//         this.Card_Img.className = "Card-Image";
//         this.Card_Img.style.backgroundImage = `url('SVGs/${this.Background}.png')`;
//     }

//     Make_Title() {
//         this.Title = document.createElement("div");
//         this.Title.className = "Card-Title";
//         this.Title.textContent = this.Card_Json.Title;
//     }

//     Make_Card_Sub_Header() {
//         this.Sub_Header = document.createElement("div");
//         this.Sub_Header.className = "Card-Sub-Header";
//         this.Sub_Header.textContent = this.Card_Json.Sub_Header;
//     }

//     Make_Card_Main_Body() {
//         this.Main_Body = document.createElement("div");
//         this.Main_Body.className = "Cards-Main-Body";
//         this.Main_Body.textContent = this.Card_Json.Desc;
//     }

//     Make_Footer() {
//         this.Footer = document.createElement("div");
//         this.Footer.className = "Card-Footer";
//         this.Footer.textContent = "Victory Point";
//     }

//     Construct_Card() {
//         this.Make_Card_Container();
//         this.Make_Card_Img();
//         this.Make_Title();
//         this.Make_Card_Sub_Header();
//         this.Make_Card_Main_Body();
//         this.Make_Footer();
//         this.Card_Img.appendChild(this.Title);
//         this.Card_Img.appendChild(this.Sub_Header);
//         this.Card_Img.appendChild(this.Main_Body);
//         this.Card_Img.appendChild(this.Footer);
//         this.Container.appendChild(this.Card_Img);
//     }

//     Main() {
//         this.Construct_Card();
//         this.Parent.appendChild(this.Container);
//     }

// }

class Make_Hidden_Pub_Obj_HTML extends Pub_Obj_HTML {
    constructor(parent, background) {
        let Card_Json = {"Title": "", "Sub_Header": "", "Desc": ""};
        
        super(parent, background+"-Back", Card_Json);
        this.Parent = parent;
        this.Background = background;
        this.Make_Back_Card_Btn();
        
        //Public-1-Point-Back.png -> Public-1-Point.png
    }

    Construct_Card() {
        this.Make_Card_Container();
        this.Make_Card_Img();
        this.Container.appendChild(this.Card_Img);
        this.Program_Card_Back();
        this.Parent.appendChild(this.Container);
    }

    Make_Back_Card_Btn() {
        this.Background = this.Background + "-Back";
        this.Construct_Card();
        this.Background = this.Background.slice(0, -5);
    }



    Program_Card_Back() {
        this.Card_Img.addEventListener("click", (event) => {
            window.Card_Search.Set_To(this.Background);
            window.Card_Search.Card_To_Replace = this.Container;
            window.Card_Search.Toggle_HTML();
        });

        this.Container.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.Container.innerHTML = '';
            this.Background = this.Background + "-Back";
            this.Make_Card_Img();
            this.Container.appendChild(this.Card_Img);
            this.Program_Card_Back();
            this.Parent.appendChild(this.Container);
            this.Background = this.Background.slice(0, -5);
        });
    }

}

class Faction_Search {
    constructor(Factions) {
        this.keyList = document.getElementById("Faction-List");
        this.Factions = Factions; 
        document.getElementById("Faction-Search-Bar").addEventListener("keyup", this.Filter_Keys.bind(this));
        this.Filter_Keys();
    }

    Set_As_Selected(Key) {
        let bar = document.getElementById("Faction-Search-Bar");
        bar.value = Key;
    }

    Make_Faction_Btn(Key) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = Key;
        li.appendChild(btn);
        // const Card_Type = this.Card_Type;
        btn.addEventListener('click', () => {
            this.Set_As_Selected(Key);
        });
        return li;
    }

    Display_Keys(keys) {
        this.keyList.innerHTML = ""; // Clear previous list
        keys.forEach(key => {
            const li = this.Make_Faction_Btn(key);
            this.keyList.appendChild(li);
        });
    }

    Filter_Keys() {
        const searchTerm = document.getElementById("Faction-Search-Bar").value.toUpperCase();
        const filteredKeys = Object.keys(this.Factions).filter(key => key.toUpperCase().startsWith(searchTerm));
        this.Display_Keys(filteredKeys);
    }



}



class Manage_Public_Scoring_Cards {
    constructor() {
        //Not sure yet if its better to have this be an array or object
        this.Pub_Obj_Elm = {};
    }

    Make_All_Stage_1_Cards() {
        for(let i=0; i<5; i++) {
            let Card = new Public_Scoring_Card(document.getElementById("Public-Obj-Row1"), "Public-1-Point-Back");
            window.Public_Scoring_Cards.push(Card);
        }
    }

    Make_All_Stage_2_Cards() {
        for(let i=0; i<5; i++) {
            let Card = new Public_Scoring_Card(document.getElementById("Public-Obj-Row2"), "Public-2-Point-Back");
            window.Public_Scoring_Cards.push(Card);
        }
    }

}








