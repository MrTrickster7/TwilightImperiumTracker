import { Player_Tech_Btn } from './Tech_Btn.js';


export class Modify_Tech_HTML {
    constructor(Parent) {
        this.Parent = Parent;
        this.Main_Tech_Colors = ["Red",
                                "Yellow",
                                "Green",
                                "Blue"];
        this.Unit_Tech_Colors = ["Units1", "Units2", "Units3"];
        this.Main();

    }

    Make_Button_Container() {
        this.Tech_Btn_Container = document.createElement("div");
        this.Tech_Btn_Container.className = "All-Tech-Container";
        // if(Color == "Blue") { //this might not be nessicary
        //I think I just need to change the css and remove this class
        // this.Tech_Btn_Container.classList.add("First-Tech-In-Section");
        // }
    }


    Make_All_Tech_Btns_Of_Color(Color) {
        window.Tech_Icons_Path[Color].forEach( (Tech) => {
            new Player_Tech_Btn(Color, this.Tech_Btn_Container, Tech);
        });
    }

    Make_All_Unit_Upgrades(Units) {
        window.Tech_Icons_Path[Units].forEach( (Tech) => {
            new Player_Tech_Btn("White", this.Tech_Btn_Container, Tech);
        });
    }


    Fill_Tech_Container() {
        this.Main_Tech_Colors.forEach((Color) => {
            this.Make_All_Tech_Btns_Of_Color(Color);
        });
        this.Unit_Tech_Colors.forEach((Color) => {
            this.Make_All_Unit_Upgrades(Color);
        });
    }



    Main() {
        this.Make_Button_Container();
        this.Fill_Tech_Container();
        this.Parent.appendChild(this.Tech_Btn_Container);
    }









}



export class Tech_HTML {
    constructor(Parent, index) {
        this.Parent = Parent
        this.Index = index;
        this.Main_Tech_Colors = ["Red", 
                                "Yellow",
                                "Green",
                                "Blue"];
        this.Unit_Tech_Colors = ["Units1", "Units2", "Units3"];
        this.Main();
    }

    Make_Button_Container() {
        const Tech_Btn_Container = document.createElement("div");
        Tech_Btn_Container.className = "Tech-Btns-Container";
        // if(Color == "Blue") { //this might not be nessicary
        //I think I just need to change the css and remove this class
        Tech_Btn_Container.classList.add("First-Tech-In-Section");
        // }
        return Tech_Btn_Container;
    }

    Make_Tech_Color_Section(Color) {
        const Tech_Color_Section = document.createElement("div");
        Tech_Color_Section.className = "Tech-Color-Section";
        // let Btn_Container = this.Make_Button_Container(i);

        window.Tech_Icons_Path[Color].forEach( (Tech) => {
            
            //idk if passing the parent to this class was a good
            //idea or not
            let btn = new Player_Tech_Btn(Color, Tech_Color_Section, Tech);
            btn.Make_Tech_Btn_The_Enabler(this.Index);
        });
            
        return Tech_Color_Section;
    }

    Make_Four_Tech_Color_Sections(Parent) {
        const Main_Techs_Container = document.createElement("div");
        Main_Techs_Container.className = "Main-Techs-Container";
        this.Main_Tech_Colors.forEach( (Color) => {
            const Color_Section = this.Make_Tech_Color_Section(Color);
            // Main_Techs_Container.appendChild(Color_Section);
            Parent.appendChild(Color_Section);
        });
        return Main_Techs_Container;
    }

    Make_All_Techs_Container() {
        const Container = document.createElement("div");
        Container.className = "All-Tech-Row";
        return Container;
    }

    Make_Unit_Tech_Section(Row) {
        const Tech_Color_Section = document.createElement("div");
        Tech_Color_Section.className = "Tech-Color-Section";
        // let Btn_Container = this.Make_Button_Container(i);

        window.Tech_Icons_Path[Row].forEach( (Tech) => {
            
            //idk if passing the parent to this class was a good
            //idea or not
            
            let btn = new Player_Tech_Btn("White", Tech_Color_Section, Tech); 
            btn.Make_Tech_Btn_The_Enabler(this.Index);
        });
            
        return Tech_Color_Section;
    }

    Make_Unit_Upgrade_Tech_Sections(Parent) {
        const Main_Techs_Container = document.createElement("div");
        Main_Techs_Container.id = "Unit-Upgrade-Techs-Container";
        Main_Techs_Container.className = "Main-Techs-Container";
        this.Unit_Tech_Colors.forEach((Row) => {
            const Color_Section = this.Make_Unit_Tech_Section(Row);
            // Main_Techs_Container.appendChild(Color_Section);
            Parent.appendChild(Color_Section);
        });
        return Main_Techs_Container;
    }

    Make_Faction_Tech_Section(Parent) {
        const Main_Techs_Container = document.createElement("div");
        Main_Techs_Container.id = "Unit-Upgrade-Techs-Container";
        Main_Techs_Container.className = "Main-Techs-Container";
        this.Unit_Tech_Colors.forEach((Row) => {
            const Color_Section = this.Make_Unit_Tech_Section(Row);
            // Main_Techs_Container.appendChild(Color_Section);
            Parent.appendChild(Color_Section);
        });
        return Main_Techs_Container;
    }

    //Have to edit this for unit upgrades
    Make_Normal_Tech_Row() {
        const Container = this.Make_All_Techs_Container();
        const Four_Main_Techs = this.Make_Four_Tech_Color_Sections(Container);
        const Unit_Upgrade_Tech = this.Make_Unit_Upgrade_Tech_Sections(Container);
        // Container.appendChild(Four_Main_Techs);
        // Container.appendChild(Unit_Upgrade_Tech);
        return Container;
    }

    Main() {
        const Container = this.Make_Normal_Tech_Row();
        this.Parent.appendChild(Container);
    }

}