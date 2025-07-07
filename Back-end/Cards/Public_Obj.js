export class Public_Scoring_Card {

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





export class Pub_Obj_HTML {
    constructor(parent, background, card_json) {
        this.Parent = parent;
        // this.Background = "Public-1-Point";
        this.Background = background;
        this.Card_Json = card_json;

        // this.Card_Json = {"Title": "", "Sub_Header": "", "Desc": ""};
        // this.Main();
    }

    Make_Card_Container() {
        this.Container = document.createElement("div");
        this.Container.className = "Card-Container";
    }

    Make_Card_Img() {
        this.Card_Img = document.createElement("div");
        this.Card_Img.className = "Card-Image";
        this.Card_Img.style.backgroundImage = `url('SVGs/${this.Background}.png')`;
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
        this.Main_Body.className = "Gen-Cards-Main-Body";
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

export class Make_Hidden_Pub_Obj_HTML extends Pub_Obj_HTML {
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

