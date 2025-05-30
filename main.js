

// document.querySelector(".dropdown-btn").addEventListener("click", function() {
//     document.querySelector(".dropdown").classList.toggle("show");
// });

// // Close dropdown if clicked outside
// window.addEventListener("click", function(event) {
//     if (!event.target.matches('.dropdown-btn')) {
//         let dropdowns = document.querySelectorAll(".dropdown");
//         dropdowns.forEach(dropdown => dropdown.classList.remove("show"));
//     }
// });



// import Tech_Cards from './Tech.json';


window.onload = async function() {
    window.resizeTo(1920, 1080);
    await Import_Tech_Cards();
    Display_Tech_Cards();
    await Import_Agenda_Cards();
    
    window.Player_Manager = new Player_Column_Manager();
    window.Sidebar = new Sidebar();
    window.Card_Search = new Card_Search();
}



class Player_Column_Manager {
    constructor() {
        this.Player_Count = 0;
        this.Players = [];
    }

    Get_New_Player_Info() {
        this.Player_Name = document.getElementById("Player-Name-Input").value;
        this.Player_Color = document.querySelector('input[name="color"]:checked').value;
    }

    Add_Player() {
        this.Get_New_Player_Info();
        let Player_Temp = new Player_HTML(this.Player_Name, this.Player_Color, this.Player_Count);
        Player_Temp.Main();
        this.Players.push(Player_Temp);
        this.Player_Count++;
    }

    Remove_Player(index) {
        this.Players[index].Remove_Column();
        this.Players.splice(index, 1);
    }


}

const Player_Colors = { "red": '#d32f2f',
                        "blue": '#1976d2',
                        "green": '#388e3c',
                        "yellow": '#FBC02D',
                        "purple": '#7B1FA2',
                        "black": '#212121',
                        "orange": '#f57c00',
                        "pink": '#e91e63'
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





class Player_Tech_Btn {
    constructor(Color, Parent) {
        this.Color = Color;
        this.is_Unlocked = false;
        this.is_Used = false;
        this.Parent = Parent;
        this.Main();
    }

    Make_Tech_Btn() {
        this.Tech_Btn = document.createElement("button");
        this.Tech_Btn.className = "Tech-Btn";
        this.Tech_Btn.classList.add(`Tech-Btn-${this.Color}`);
        this.Tech_Btn.classList.add(`Tech-Btn-Locked`);
        // this.Tech_Btn.style.backgroundImage = 'url("./SVGs/bacteria.svg")';
        this.Tech_Btn.style.mask = `url("./SVGs/${this.SVG_Name}.svg") no-repeat center`;
    }

    Make_Tech_Btn_An_Icon(Icon_Key) {
        this.Icon = 7;
    }

    Unlock_Tech() {
        this.Tech_Btn.classList.remove(`Tech-Btn-Locked`);
        this.Tech_Btn.classList.remove("Tech-Btn-Exaust");
    }

    Lock_Tech() {
        this.Tech_Btn.classList.remove("Tech-Btn-Exaust");
        this.Tech_Btn.classList.add(`Tech-Btn-Locked`);
    }

    Exaust_Tech() {
        this.Tech_Btn.classList.add("Tech-Btn-Exaust");
        this.Tech_Btn.classList.remove(`Tech-Btn-Locked`);
    }

    Toggle_Btn() {
        if(!this.is_Unlocked && !this.is_Used) {
            this.Unlock_Tech();
            this.is_Unlocked = true;
        } else if(this.is_Unlocked && !this.is_Used) {
            this.Exaust_Tech();
            this.is_Used = true;
        } else {
            this.Lock_Tech();
            this.is_Unlocked = false;
            this.is_Used = false;
        }
        
    }

    Enable_Btn() {
        this.Tech_Btn.addEventListener('click', this.Toggle_Btn.bind(this));
    }

    Main() {
        this.Make_Tech_Btn();
        this.Enable_Btn();
        this.Parent.appendChild(this.Tech_Btn);
    }
}

class HTML_Text_Column {
    constructor() {
        this.Tech_Json = null;
        this.Parent = document.getElementById("Tech-Header-Row");
    }


    Make_Tech_Card_Text(Color, i) {
        const Card_Text = this.Tech_Json[Color][i];
        const div = document.createElement("div")
        div.className = "Tech_Card_Text";
        div.innerHTML = Card_Text;
        if(i == 0) {
            div.classList.add("First-Tech-In-Section");
        };
        return div;
    }

    Make_Tech_Color_Section(Color) {
        const Tech_Color_Section = document.createElement("div");
        Tech_Color_Section.className = "Tech-Color-Section";
        for(let i=0; i<6; i++) {
            let Div = this.Make_Tech_Card_Text(Color, i);
            Tech_Color_Section.appendChild(Div);
        };
        return Tech_Color_Section;
    }

    Make_Four_Tech_Color_Sections() {
        const Main_Techs_Container = document.createElement("div");
        Main_Techs_Container.className = "Main-Techs-Container";
        Object.keys(this.Tech_Json).forEach(Color => {
            console.log(Color);
            const Color_Section = this.Make_Tech_Color_Section(Color);
            Main_Techs_Container.appendChild(Color_Section);
        });
        return Main_Techs_Container;
    }

    Make_Unit_Upgrade_Tech_Section() {
        return null;
    }

    Make_All_Techs_Container() {
        const Container = document.createElement("div");
        Container.id = "Text_Tech_All_Container";
        return Container;
    }

    //Have to edit this for unit upgrades
    Make_Normal_Tech_Row() {
        const Container = this.Make_All_Techs_Container();
        const Four_Main_Techs = this.Make_Four_Tech_Color_Sections();
        Container.appendChild(Four_Main_Techs);
        return Container;
    }

    Main() {
        if (!window.Tech_Cards) {
            console.error("Tech_Cards not loaded.");
            return;
        }
        this.Tech_Json = window.Tech_Cards;
        const Container = this.Make_Normal_Tech_Row();
        this.Parent.appendChild(Container);
    }

}

class Tech_HTML {
    constructor(Parent) {
        this.Parent = Parent;
        this.Main_Tech_Colors = ["Red", "Yellow", "Green", "Blue"];
    }

    Make_Button_Container(i) {
        const Tech_Btn_Container = document.createElement("div");
        Tech_Btn_Container.className = "Tech-Btns-Container";
        if(i == 0) {
            Tech_Btn_Container.classList.add("First-Tech-In-Section");
        }
        return Tech_Btn_Container;
    }

    Make_Tech_Color_Section(Color) {
        const Tech_Color_Section = document.createElement("div");
        Tech_Color_Section.className = "Tech-Color-Section";
        for(let i=0; i<6; i++) {
            let Btn_Container = this.Make_Button_Container(i);
            //idk if passing the parent to this class was a good
            //idea or not
            new Player_Tech_Btn(Color, Btn_Container); 
            Tech_Color_Section.appendChild(Btn_Container);
        };
        return Tech_Color_Section;
    }

    Make_Four_Tech_Color_Sections() {
        const Main_Techs_Container = document.createElement("div");
        Main_Techs_Container.className = "Main-Techs-Container";
        this.Main_Tech_Colors.forEach(Color => {
            const Color_Section = this.Make_Tech_Color_Section(Color);
            Main_Techs_Container.appendChild(Color_Section);
        });
        return Main_Techs_Container;
    }

    Make_Unit_Upgrade_Tech_Section() {
        return null;
    }

    Make_All_Techs_Container() {
        const Container = document.createElement("div");
        Container.className = "All-Tech-Row";
        return Container;
    }

    //Have to edit this for unit upgrades
    Make_Normal_Tech_Row() {
        const Container = this.Make_All_Techs_Container();
        const Four_Main_Techs = this.Make_Four_Tech_Color_Sections();
        Container.appendChild(Four_Main_Techs);
        return Container;
    }

    Main() {
        const Container = this.Make_Normal_Tech_Row();
        this.Parent.appendChild(Container);
    }

}

class Player_HTML {
    constructor(Name, Color, Index) {
        this.Name = Name;
        this.Color = Color;
        this.Index = Index;
        this.Score = 0;
    }

    Remove_Column() {
        this.Parent.removeChild(this.Column);
    }

    Add_Column() {
        this.Parent = document.getElementById("Player-Columns");
        this.Column = document.createElement("div");
        this.Column.id = `Player-${this.Index}-Column`;
        this.Column.className = "Player-Column";
    }

    Make_Color_Row_Div() {
        let Name_Color_Row = document.createElement("div");
        Name_Color_Row.className = "Main-Text-Row";
        return Name_Color_Row;
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
        let Name_Div = this.Make_Name_Div();
        let Color_Div = this.Make_Color_Div();
        Name_Color_Row.appendChild(Name_Div);
        Name_Color_Row.appendChild(Color_Div);
        this.Column.appendChild(Name_Color_Row);
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
        this.Column.appendChild(Score_Row);
    }

    Add_Tech_Row() {
        const Tech_Row_Class = new Tech_HTML(this.Column);
        Tech_Row_Class.Main();
    }

    Give_Speaker() {
        const temp = 7; //Add something later for this
    }

    Make_Turn_Info_Row_Container() {
        let Div = document.createElement('div');
        Div.className = "Main-Text-Row";
        return Div;
    }

    Add_Turn_Info_Row() {
        let Div = this.Make_Turn_Info_Row_Container();
        new Speaker_Token_Btn(Div);
        let Dropdown = new Player_Strategy_Btn(Div, this.Index);
        this.Column.appendChild(Div);
    }

    Main() {
        this.Add_Column();
        this.Add_Player_Color_Name();
        this.Add_Turn_Info_Row();
        this.Add_Score_Row();
        this.Add_Tech_Row();
        if(this.Parent) {
            this.Parent.appendChild(this.Column);
        } else {
            console.log("Player Parent is Null");
        }
    } 
}

const Strategy_Options = [
    { "Color": "#d32f2f", "Text": 1 },
    { "Color": "#f57c00", "Text": 2 },
    { "Color": "#FBC02D", "Text": 3 },
    { "Color": "#388e3c", "Text": 4 },
    { "Color": "#258a98", "Text": 5 },
    { "Color": "#1352bd", "Text": 6 },
    { "Color": "#4a4a89", "Text": 7 },
    { "Color": "#7B1FA2", "Text": 8 },
    { "Color": "#414141", "Text": "P"}
];

class Player_Strategy_Btn {
    constructor(parent, index) {
        this.Index = index;
        this.Parent = parent;
        this.Is_Exhaust = false;
        this.Selected_Option = Strategy_Options[0];
        this.Main();
    }

    Setup() {
        // document.getElementById(`Strat-Dropdown-Btn-${this.Index}`).addEventListener("click", () => {
        //     document.querySelector(".Strat-Dropdown-Container").classList.toggle("show");
        // });

        // Close dropdown when clicking outside
        window.addEventListener("click", (event) => {
            if (!event.target.closest(`#Strat-Dropdown-${this.Index}`)) {
                this.Dropdown_Container.classList.remove("show");
            }
        });

        this.Btn.addEventListener("click", () => {
            console.log("Toggle Show");
            this.Dropdown_Container.classList.toggle("show");
        });

        this.Btn.addEventListener("contextmenu", (event) => {
            event.preventDefault(); // Stops default browser right-click menu
            this.Btn.classList.toggle("Exausted");
        });
    }

    Close_Dropdown() {
        document.querySelector(".Strat-Dropdown-Container").classList.remove("show");
    }

    Update_Option() {
        this.Btn.style.backgroundColor = this.Selected_Option.Color;
        this.Btn.innerText = this.Selected_Option.Text;
        this.Close_Dropdown();
    }

    

    Make_Dropdown_Container() {
        this.Dropdown_Container = document.createElement("div");
        this.Dropdown_Container.id = `Strat-Dropdown-${this.Index}`;
        this.Dropdown_Container.className = "Strat-Dropdown-Container";
    }

    Make_Button_Dropdown() {
        this.Btn = document.createElement('button');
        this.Btn.id = `Strat-Dropdown-Btn-${this.Index}`;
        this.Btn.className = "Strategy-Dropdown-Btn";
        this.Btn.classList.add("dropdown-btn");
    }

    Make_Dropdown_Content() {
        this.Dropdown_Content = document.createElement("div");
        this.Dropdown_Content.className = "Strat-Dropdown-Content";
        this.Dropdown_Content.classList.add("dropdown-container");
        Strategy_Options.forEach( Opt => {
            let Div = document.createElement('div');
            Div.className = 'Strat-Dropdown-Option';
            Div.classList.add("dropdown-option");
            Div.innerText = Opt.Text;
            Div.style.backgroundColor = Opt.Color;
            Div.addEventListener('click', () => {
                this.Selected_Option = Opt;
                this.Update_Option();
            });
            this.Dropdown_Content.appendChild(Div);
        });
    }

    Main() {
        this.Make_Dropdown_Container();
        this.Make_Button_Dropdown();
        this.Make_Dropdown_Content();
        
        this.Dropdown_Container.appendChild(this.Btn);
        this.Dropdown_Container.appendChild(this.Dropdown_Content);
        this.Parent.appendChild(this.Dropdown_Container);
        this.Setup();
    }


}


class Speaker_Token_Btn {

    constructor(Parent) {
        this.Parent = Parent;
        this.is_Speaker = false;
        this.Main();
    }

    Setup() {
        this.Speaker_Btn.addEventListener('click', () => {
            this.Toggle_Speaker_Img();
        });
    }

    Make_Cell_Container() {
        let Container = document.createElement("div");
        Container.className = "Main-Text-Row";
        Container.classList.add("Speaker-Cell-Container");
        return Container;
    }

    Make_Speaker_Btn() {
        this.Speaker_Btn = document.createElement("button");
        this.Speaker_Btn.className = "Speaker-Token-Btn";
    }

    Make_Speaker_Background() {
        this.Speaker_Img = document.createElement("img");
        this.Speaker_Img.src = "./SVGs/Speaker.svg";
    }

    Hide_Speaker_Img() {
        this.is_Speaker = false;
        this.Speaker_Btn.removeChild(this.Speaker_Img);
    }

    Show_Speaker_Img() {
        this.is_Speaker = true;
        this.Speaker_Btn.appendChild(this.Speaker_Img);
    }

    Toggle_Speaker_Img() {
        if(this.is_Speaker) {
            this.Hide_Speaker_Img();
        } else {
            this.Show_Speaker_Img();
        }
    }

    Main() {
        this.Make_Speaker_Btn();
        this.Make_Speaker_Background();
        this.Setup();
        this.Parent.appendChild(this.Speaker_Btn);
    }

    
}

class Sidebar {
    constructor() {
        this.Is_Open_Btn_Visible = true;
        this.Setup();
    }

    Toggle_Sidebar() {
        document.getElementById("Sidebar").classList.toggle("collapsed");
        document.getElementById("Open-Sidebar-Btn").classList.toggle("Hidden");
    }

    Open_Add_Player_Panel() {
        this.Toggle_Sidebar();
        this.Toggle_Add_Player_Panel();
    }

    Toggle_Add_Player_Panel() {
        document.getElementById("Add-Player-Top").classList.toggle("Hidden");
    }

    Setup_Toggle() {
        document.getElementById("Open-Sidebar-Btn").addEventListener('click', this.Toggle_Sidebar.bind(this));
        document.getElementById("Close-Sidebar-Btn").addEventListener('click', this.Toggle_Sidebar.bind(this));
    }

    Setup_Sidebar_Add_Player_Btn() {
        document.getElementById("Side-Add-Player-Btn").addEventListener('click', this.Open_Add_Player_Panel.bind(this));
    }

    Setup_Sidebar_Remove_Player_Btn() {
        document.getElementById("Side-Remove-Player-Btn").addEventListener('click', this.Remove_Player_Buffer.bind(this));
    }

    Setup_Close_Add_Player_Panel() {
        document.getElementById("Close-Add-Player-Btn").addEventListener('click', this.Toggle_Add_Player_Panel.bind(this));
    }

    Setup_Add_Player_Btn() {
        document.getElementById("Add-Player-Btn").addEventListener('click', this.Add_Player_Buffer.bind(this));
    }

    Setup_Agenda_Cards_Btn() {
        document.getElementById("Side-Agenda-Cards-Btn").addEventListener('click', () => {
            window.Card_Search.Set_To_Agendas();
            window.Card_Search.Toggle_HTML();
            this.Toggle_Sidebar();
        });
    }

    Add_Player_Buffer() {
        window.Player_Manager.Add_Player();
    }

    //Super cheap/lazy solution for now
    //its a minor feature so it has low priority rn
    Remove_Player_Buffer() {
        let User_Remove_Index = prompt("1st Player: 0\n8th Player: 7\nSelect A Player To Remove:");
        if(User_Remove_Index) {
            window.Player_Manager.Remove_Player(User_Remove_Index);
        };
    }

    Setup() {
        this.Setup_Toggle();
        this.Setup_Sidebar_Add_Player_Btn();
        this.Setup_Sidebar_Remove_Player_Btn();
        this.Setup_Close_Add_Player_Panel();
        this.Setup_Add_Player_Btn();
        this.Setup_Agenda_Cards_Btn();
    }
}

function filterKeys() {
    const searchTerm = document.getElementById("Agenda-Search-Bar").value.toLowerCase();
    const filteredKeys = Object.keys(window.Agenda_Cards).filter(key => key.startsWith(searchTerm));
    
    displayKeys(filteredKeys);
}

class Card_Search {
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

// What this class to only make the HTML part
class Agenda_HTML {
    constructor(parent, index, key) {
        this.Parent = parent;
        this.Index = index;
        this.Key = key;
        this.Agenda_Obj = window.Agenda_Cards_Upper[key];
        
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

    Make_Marker() {
        if(!this.Agenda_Obj["Needs_Marker"]) {
            return null;
        }
        this.Marker = document.createElement("div");
        this.Marker.className = "Agenda-Marker";
        this.Container.appendChild(this.Marker);
    }

    Make_Main_Text_Container() {
        this.Descript_Container = document.createElement("div");
        this.Descript_Container.className = "Agenda-Text-Area";
        this.Descript_Container.classList.add("Agenda-Text");
        this.Container.appendChild(this.Descript_Container);
    }

    Make_Description_Header_Container() {
        const Desc_Header_Container = document.createElement("div");
        Desc_Header_Container.className = "Agenda-Desc-Header";
        Desc_Header_Container.classList.add("Agenda-Text");
        return Desc_Header_Container;
    }

    Make_Elect() {
        this.Elect_Text = document.createElement("div");
        this.Elect_Text.className = "Agenda-Elect-Header";
        this.Elect_Text.classList.add("Agenda-Text");
        this.Elect_Text.innerText = this.Agenda_Obj["Elect"];
        this.Descript_Container.appendChild(this.Elect_Text);
    }

    Make_Header_For_Against(Title) {
        const section_header = document.createElement("div");
        section_header.className = "Agenda-Section-Header";
        section_header.classList.add("Agenda-Text");
        section_header.innerText = `${Title}:`;
        this.Descript_Container.appendChild(section_header);
    }

    Make_Effect_Description(Title) {
        const section_desc = document.createElement("div");
        section_desc.className = "Agenda-Section-Desc";
        section_desc.classList.add("Agenda-Text");
        section_desc.innerText = this.Agenda_Obj[Title];
        this.Descript_Container.appendChild(section_desc);
    }

    //Used for makeing both Law 'For' and 'Against' ideally
    Make_Basic_Description_Section(Title) {
        this.Make_Header_For_Against(Title);
        this.Make_Effect_Description(Title);
    }

    Make_For_Against_Description() {
        this.Make_Basic_Description_Section("For");
        this.Make_Basic_Description_Section("Against");
    }

    Make_Custom_Descriptio_Layout() {
        if(this.Agenda_Obj["Warning"]) {
            this.Make_Effect_Description("Warning");
        }
        if(this.Agenda_Obj["Elect"] !== "") {
            this.Make_Elect();
        };
        if(this.Agenda_Obj["For"]) {
            this.Make_For_Against_Description();
        } else if(this.Agenda_Obj["effect"]) {
            this.Make_Effect_Description("effect");
        }
    }

    //Make it so that if they press Pass it will prompt for a
    //player to become the owner of the card.
    Setup() {
        const temp = 7
    }


    Main() {
        this.Make_Container();
        this.Make_Title_Box();
        this.Make_Type_Box();
        this.Make_Marker();
        this.Make_Main_Text_Container();
        this.Make_Custom_Descriptio_Layout();
        this.Parent.appendChild(this.Container);
    }

    


}




