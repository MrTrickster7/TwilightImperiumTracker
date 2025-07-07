import { Player_Tech_Btn } from './Back-end/Player-Columns/Rows/Tech-Row/Tech_Btn.js'; 
import { HTML_Text_Column } from './Back-end/Player-Columns/Player_Table_Text_Column.js';
import { Sidebar } from './Back-end/Sidebar/Sidebar.js';
import { Card_Search } from './Back-end/Cards/Card_Search.js';
import { Player_HTML } from './Back-end/Player-Columns/Player_Column.js';
import { Modify_Player_HTML } from './Back-end/Player-Columns/Player_Column.js';
import { Public_Scoring_Card } from './Back-end/Cards/Public_Obj.js';

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
    Make_Public_Objs();
}


function Make_Public_Objs() {
    window.Public_Scoring_Cards = [];
    for(let i=0; i<5; i++) {
        let Card = new Public_Scoring_Card(document.getElementById("Public-Obj-Row1"), "Public-1-Point");
        let Card2 = new Public_Scoring_Card(document.getElementById("Public-Obj-Row2"), "Public-2-Point");
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
        window.Selected_Factions = this.Factions;
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
                        // "black": '#212121',
                        "black": '#000000',
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




function filterKeys() {
    const searchTerm = document.getElementById("Agenda-Search-Bar").value.toLowerCase();
    const filteredKeys = Object.keys(window.Agenda_Cards).filter(key => key.startsWith(searchTerm));
    
    displayKeys(filteredKeys);
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








