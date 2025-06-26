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

export class Player_Strategy_Btn {
    constructor(parent, index) {
        this.Index = index;
        this.Parent = parent;
        this.Is_Exhaust = false;
        this.Selected_Option = Strategy_Options[0];
        this.Held_Strat_Card = Strategy_Options[0];
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
                this.Selected_Option = Strategy_Options[8];
                this.Update_Option();
            }
        });


    }

    Close_Dropdown() {
        document.querySelector(".Strat-Dropdown-Container").classList.remove("show");
        this.Dropdown_Container.classList.remove("show");
    }

    Update_Option() {
        this.Btn.style.backgroundColor = this.Selected_Option.Color;
        this.Btn.innerText = this.Selected_Option.Text;
        this.Btn.classList.remove("Exausted");
        this.Close_Dropdown();
        if(this.Selected_Option.Text !== "P") {
            this.Held_Strat_Card = this.Selected_Option.Text;
        }
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
        // this.Btn.classList.add("dropdown-btn");
    }

    Make_Dropdown_Content() {
        this.Dropdown_Content = document.createElement("div");
        this.Dropdown_Content.className = "Strat-Dropdown-Content";
        // this.Dropdown_Content.classList.add("dropdown-container");
        Strategy_Options.forEach( Opt => {
            let Div = document.createElement('div');
            Div.className = 'Strat-Dropdown-Option';
            // Div.classList.add("dropdown-option");
            Div.innerText = Opt.Text;
            Div.style.backgroundColor = Opt.Color;
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
        
        this.Dropdown_Container.appendChild(this.Btn);
        this.Dropdown_Container.appendChild(this.Dropdown_Content);
        this.Parent.appendChild(this.Dropdown_Container);
        this.Setup();
    }


}