

let Radio_Btns = document.querySelectorAll('input[name="Card-Type"');

Radio_Btns.forEach((Btn) => {
    Btn.addEventListener("change", (event) => {
        Display(event.target.value);
    })
})


function Program_Radio_Btns() {
    let Radio_Btns = document.querySelectorAll('input[name="Card-Type"');

    Radio_Btns.forEach((Btn) => {
        Btn.addEventListener("change", (event) => {
            //add here event.target.value
        });
    });
}
