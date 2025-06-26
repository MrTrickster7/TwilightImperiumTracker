export // What this class to only make the HTML part
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