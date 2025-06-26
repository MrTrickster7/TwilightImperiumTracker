export class HTML_Text_Column {
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