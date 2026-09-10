




export class Player_Tech_Btn {
    constructor(Color, Icon_Path) {
        this.Color = Color.replaceAll("_", '');
        this.Is_Exaustable = true;
        this.Is_Exausted = false;

        this.Icon_Path = Icon_Path.replace(/[ /]/g, '-');
    }



    Make_Btn() {
        this.Btn = document.createElement("button");
        this.Btn.className = "Silhouette-Btn";
        this.Btn.classList.add(`Tech-Btn-${this.Color}`); // this is temp
        //Will use a more dedicated method for coloring later
        this.Btn.style.mask = `url("./SVGs/Tech-Icons/${this.Icon_Path}-Icon.svg") no-repeat center`;
        this.Btn.style.maskSize = 'contain';
    }



}