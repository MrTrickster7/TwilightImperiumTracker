

// Upper notch: 30.7 mm
// Center Notch Width: 30.3 mm
// Lower Notch: 29.77mm


export class Player_Tech_Btn {
    constructor(Color, Parent, Icon_Path) {
        this.Color = Color.replaceAll("_", '');
        this.is_Unlocked = false;
        this.is_Used = false;
        this.Parent = Parent;
        this.Icon_Path = Icon_Path.replace(/[ /]/g, '-');
        
        this.Main();
    }

    Make_Tech_Btn() {
        this.Tech_Btn = document.createElement("button");
        this.Tech_Btn.className = "Tech-Btn";
        this.Tech_Btn.classList.add(`Tech-Btn-${this.Color}`);
        this.Tech_Btn.classList.add(`Tech-Btn-Locked`);
        // this.Tech_Btn.classList.add('Hidden');
        // this.Tech_Btn.style.backgroundImage = 'url("./SVGs/bacteria.svg")';
        // this.Tech_Btn.style.mask = `url("./SVGs/bacteria.svg") no-repeat center`;
        //Add something to handle/skip this if Icon_paht is undifined/not given
        this.Tech_Btn.style.mask = `url("./SVGs/Tech-Icons/${this.Icon_Path}-Icon.svg") no-repeat center`;
        this.Tech_Btn.style.maskSize = 'contain';
    }

    Unlock_Tech() {
        this.Tech_Btn.classList.remove(`Tech-Btn-Locked`);
        this.Tech_Btn.classList.remove("Exausted");
    }

    Lock_Tech() {
        this.Tech_Btn.classList.remove("Exausted");
        this.Tech_Btn.classList.add(`Tech-Btn-Locked`);
    }

    Exaust_Tech() {
        this.Tech_Btn.classList.add("Exausted");
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
    //Change how Archlinux deals with multiple monitors
    Enable_Btn() {
        // this.Tech_Btn.addEventListener('click', this.Toggle_Btn.bind(this));
        this.Tech_Btn.addEventListener("click", (event) => {
            this.Tech_Btn.classList.toggle("Tech-Btn-Locked");
        });
        this.Tech_Btn.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.Tech_Btn.classList.toggle("Exausted");
        });
    }

    //This should make it so that when this tech button is press
    //it will reveal the same tech icon in the main screen for
    //the player is button is assigned to

    Get_Main_Btn(Index) {
        const playerDiv = document.querySelector(`#Player-${Index}-Column .All-Tech-Container`);
        if (!playerDiv) {
        console.error(`Player div #Player-${Index}-Column .All-Tech-Container not found`);
        return null;
        }
        const targetButton = Array.from(playerDiv.querySelectorAll('button')).find(btn => 
        btn.style.mask === `url("./SVGs/Tech-Icons/${this.Icon_Path}-Icon.svg") center center / contain no-repeat`
        );
        let Main_Btn = targetButton || null;
        return Main_Btn;
    }

    Make_Tech_Btn_The_Enabler(Index) {
        //this is to make the button that this one is controlling off by default
        //not the best place to put this, but its cleanish option for now.
        // let parent = document.getElementById(`Player-${Index}-Column`);
        let Main_Tech_Btn = this.Get_Main_Btn(Index);
        Main_Tech_Btn.classList.add("Hidden"); 
        this.Tech_Btn.addEventListener("click", (event) => {
            Main_Tech_Btn.classList.toggle("Tech-Btn-Locked");
            Main_Tech_Btn.classList.toggle("Hidden");
        });
    }



    Main() {
        this.Make_Tech_Btn();
        this.Enable_Btn();
        this.Parent.appendChild(this.Tech_Btn);
    }
}