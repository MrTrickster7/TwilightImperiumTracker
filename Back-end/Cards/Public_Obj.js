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
    constructor(parent, background, key) {
        super(parent);
        this.Background = background;
        
        //Public-1-Point-Back.png -> Public-1-Point.png
    }

    Make_Back_Card_Btn() {
        this.Background = this.Background + "-Back";
        this.Construct_Card();
        this.Background = this.Background.slice(0, -9);
        console.log(this.Background);
    }

    Program_Card_Back() {
        this.Card_Img.addEventListener("click", (event) => {
            window.Card_Search.Set_To(this.Background);
            window.Card_Search.Card_To_Replace = this.Container;
            window.Card_Search.Toggle_HTML();
        });
    }

}