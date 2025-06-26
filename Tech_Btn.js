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



    Main() {
        this.Make_Tech_Btn();
        this.Enable_Btn();
        this.Parent.appendChild(this.Tech_Btn);
    }
}