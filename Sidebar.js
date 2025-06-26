export class Sidebar {
    constructor() {
        this.Is_Open_Btn_Visible = true;
        this.Setup();
    }

    Toggle_Sidebar() {
        document.getElementById("Sidebar").classList.toggle("collapsed");
        document.getElementById("Open-Sidebar-Btn").classList.toggle("Hidden");
    }

    Open_Add_Player_Panel() {
        this.Toggle_Sidebar();
        this.Toggle_Add_Player_Panel();
    }

    Toggle_Add_Player_Panel() {
        document.getElementById("Add-Player-Top").classList.toggle("Hidden");
    }

    Setup_Toggle() {
        document.getElementById("Open-Sidebar-Btn").addEventListener('click', this.Toggle_Sidebar.bind(this));
        document.getElementById("Close-Sidebar-Btn").addEventListener('click', this.Toggle_Sidebar.bind(this));
    }

    Setup_Sidebar_Add_Player_Btn() {
        document.getElementById("Side-Add-Player-Btn").addEventListener('click', this.Open_Add_Player_Panel.bind(this));
    }

    Setup_Sidebar_Remove_Player_Btn() {
        document.getElementById("Side-Remove-Player-Btn").addEventListener('click', this.Remove_Player_Buffer.bind(this));
    }

    Setup_Close_Add_Player_Panel() {
        document.getElementById("Close-Add-Player-Btn").addEventListener('click', this.Toggle_Add_Player_Panel.bind(this));
    }

    Setup_Add_Player_Btn() {
        document.getElementById("Add-Player-Btn").addEventListener('click', this.Add_Player_Buffer.bind(this));
    }

    Setup_Agenda_Cards_Btn() {
        document.getElementById("Side-Agenda-Cards-Btn").addEventListener('click', () => {
            window.Card_Search.Set_To_Agendas();
            window.Card_Search.Toggle_HTML();
            this.Toggle_Sidebar();
        });
    }

    Add_Player_Buffer() {
        window.Player_Manager.Add_Player();
    }

    //Super cheap/lazy solution for now
    //its a minor feature so it has low priority rn
    Remove_Player_Buffer() {
        let User_Remove_Index = prompt("1st Player: 0\n8th Player: 7\nSelect A Player To Remove:");
        if(User_Remove_Index) {
            window.Player_Manager.Remove_Player(User_Remove_Index);
        };
    }

    Setup() {
        this.Setup_Toggle();
        this.Setup_Sidebar_Add_Player_Btn();
        this.Setup_Sidebar_Remove_Player_Btn();
        this.Setup_Add_Player_Btn();
        this.Setup_Agenda_Cards_Btn();
        this.Setup_Close_Add_Player_Panel();
    }
}