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

const Player_Options = [
    
    "var(--Red)", "var(--Blue)", "var(--Green)", "var(--Yellow)", 
    "var(--Purple)", "var(--Black)", "var(--Orange)", "var(--Pink)",
    "White"
];

export class Player_Support_Btn {
    constructor(parent, index) {
        this.Index = index;
        this.Parent = parent;
        this.Is_Exhaust = false;
        this.Selected_Option = Player_Options[0];
        this.Held_Strat_Card = Player_Options[0];
        this.Main();
    }

    Setup() {
        // document.getElementById(`Strat-Dropdown-Btn-${this.Index}`).addEventListener("click", () => {
        //     document.querySelector(".Strat-Dropdown-Container").classList.toggle("show");
        // });

        // Close dropdown when clicking outside
        window.addEventListener("click", (event) => {
            if (!event.target.closest(`#Support-Dropdown-${this.Index}`)) {
                this.Dropdown_Container.classList.remove("show");
            }
        });

        this.Btn.addEventListener("click", () => {
            this.Dropdown_Container.classList.toggle("show");
        });

        this.Btn.addEventListener("contextmenu", (event) => {
            event.preventDefault(); // Stops default browser right-click menu
            this.Btn.classList.toggle("Exausted");
        });

        this.Btn.addEventListener("auxclick", (event) => {
            if(event.button === 1) {
                event.preventDefault();
                event.stopPropagation();
                this.Selected_Option = Player_Options[8];
                this.Update_Option();
            }
        });


    }

    Close_Dropdown() {
        document.querySelector(".Support-Dropdown-Container").classList.remove("show");
        this.Dropdown_Container.classList.remove("show");
    }

    Update_Option() {
        this.Btn.style.backgroundColor = this.Selected_Option;
        this.Btn.classList.remove("Exausted");
        this.Close_Dropdown();
        if(this.Selected_Option.Text !== "P") {
            this.Held_Strat_Card = this.Selected_Option.Text;
        }
    }

    

    Make_Dropdown_Container() {
        this.Dropdown_Container = document.createElement("div");
        this.Dropdown_Container.id = `Support-Dropdown-${this.Index}`;
        this.Dropdown_Container.className = "Support-Dropdown-Container";
    }

    Make_Button_Dropdown() {
        this.Wrapper = document.createElement('div');
        this.Wrapper.className = "Support-Dropdown-Wrap";
        
        this.Btn = document.createElement('button');
        this.Btn.id = `Support-Dropdown-Btn-${this.Index}`;
        this.Btn.className = "Support-Dropdown-Btn";
        
        // this.Btn.classList.add("dropdown-btn");
    }

    Make_Dropdown_Content() {
        this.Dropdown_Content = document.createElement("div");
        this.Dropdown_Content.className = "Support-Dropdown-Content";
        // this.Dropdown_Content.classList.add("dropdown-container");
        Player_Options.forEach( Opt => {
            let Div = document.createElement('div');
            Div.className = 'Support-Dropdown-Option';
            // Div.classList.add("dropdown-option");

            Div.style.backgroundColor = Opt;
            Div.addEventListener('click', () => {
                this.Selected_Option = Opt;
                this.Update_Option();
            });
            this.Dropdown_Content.appendChild(Div);
        });
    }

    Is_Passed() {
        return this.Btn.textContent === "P";
    }

    Main() {
        this.Make_Dropdown_Container();
        this.Make_Button_Dropdown();
        this.Make_Dropdown_Content();
        
        this.Wrapper.appendChild(this.Btn);
        this.Dropdown_Container.appendChild(this.Wrapper);
        this.Dropdown_Container.appendChild(this.Dropdown_Content);
        this.Parent.appendChild(this.Dropdown_Container);
        this.Setup();
    }


}