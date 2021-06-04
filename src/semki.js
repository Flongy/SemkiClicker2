const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque orci sem, aliquam nec leo sed, placerat dapibus ligula. Sed nec iaculis leo, imperdiet luctus purus. Aenean quam nisl, blandit suscipit commodo at, faucibus a dolor. Maecenas sagittis imperdiet nisi eu porttitor. Maecenas fermentum nisl metus, sed pretium leo finibus ut. Sed imperdiet metus a urna tincidunt, ac mollis turpis gravida. Suspendisse potenti.";

let lorem = document.getElementById("lorem");
lorem.innerHTML = LOREM_IPSUM;

let columns = document.getElementsByClassName("column");
for (let col of columns) {
    console.log(col);
    for (i = 1; i < 30; ++i) {
        let col_el = document.createElement("div");
        col_el.classList.add("column-el");
        col_el.innerHTML = "Element " + i;
        col.append(col_el);
    }
}