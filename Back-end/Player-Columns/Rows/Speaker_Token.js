




export class Speaker_Token_Btn {

    constructor(Parent) {
        this.Parent = Parent;
        this.Main();
    }

    Setup() {
        this.Speaker_Btn.addEventListener('click', () => {
            //Finds All Speaker Token Buttons
            let Btns = document.querySelectorAll(".Speaker-Token-Btn");
            // Remove the image from all buttons
            Btns.forEach((Btn) => {
                const existingImg = Btn.querySelector('img'); // Assuming Speaker_Img is an <img> element
                if (existingImg) {
                    Btn.removeChild(existingImg);
                }
            });
            // Displays Speaker Token On active Button
            this.Toggle_Speaker_Img();
        });
        this.Speaker_Btn.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.Toggle_Speaker_Img();
        })
    }

    Make_Cell_Container() {
        let Container = document.createElement("div");
        Container.className = "Main-Text-Row";
        Container.classList.add("Speaker-Cell-Container");
        return Container;
    }

    Make_Speaker_Btn() {
        this.Speaker_Btn = document.createElement("button");
        this.Speaker_Btn.className = "Speaker-Token-Btn";
    }

    Make_Speaker_Background() {
        this.Speaker_Img = document.createElement("img");
        this.Speaker_Img.src = "./SVGs/Speaker.svg";
    }

    Hide_Speaker_Img() {
        this.Speaker_Btn.removeChild(this.Speaker_Img);
    }

    Show_Speaker_Img() {
        this.Speaker_Btn.appendChild(this.Speaker_Img);
    }

    Toggle_Speaker_Img() {
        if(this.Speaker_Btn.querySelector('img')) {
            this.Hide_Speaker_Img();
        } else {
            this.Show_Speaker_Img();
        }
    }

    Main() {
        this.Make_Speaker_Btn();
        this.Make_Speaker_Background();
        this.Setup();
        this.Parent.appendChild(this.Speaker_Btn);
    }

    
}