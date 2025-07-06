export class Planets_Total_HTML {
    constructor(parent) {
        this.Parent = parent;
        this.Main();
    }

    Make_Player_Row_Container() {
        let Container = document.createElement("div");
        Container.className = "Main-Text-Row";
        return Container;
    }

    Make_Dividor() {
        let Div = document.createElement("div");
        Div.className = "Dividor";
        Div.textContent = "/";
        return Div;
    }

    //This will go into my basic generic class that stuff will
    //us as a parent
    General_Input_With_Background(Class) {
        let Input = document.createElement("input");
        Input.type = "text";
        Input.placeholder= "0";
        Input.className = "Basic-Background-Input";
        Input.classList.add(Class)
        return Input
    }

    Make_Row() {
        const Container = this.Make_Player_Row_Container();
        const Dividor = this.Make_Dividor();
        let Resource_Input = this.General_Input_With_Background("Planet-Resource-Input");
        Resource_Input.classList.add("Planet-Total");
        let Influence_Input = this.General_Input_With_Background("Planet-Influence-Input");
        Influence_Input.classList.add("Planet-Total");
        Container.appendChild(Resource_Input);
        Container.appendChild(Dividor);
        Container.appendChild(Influence_Input);
        return Container;
    }

    Main() {
        const Row = this.Make_Row();
        this.Parent.appendChild(Row);
    }



}