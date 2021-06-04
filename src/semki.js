class Minion {
    minion_name = "Minion";
    picture_link;

    minion_cost;
    upgrade_cost;
    semki_per_sec;

    minion_count = 0;
    upgrade_count = 1;
    upgrade_multi = 1.0;

    minion_element;
    upgrade_element;

    constructor(name, picture_link, semki_per_sec, start_minion_cost, start_upgrade_cost) {
        this.minion_name = name;
        this.picture_link = picture_link;

        this.minion_cost = start_minion_cost;

        this.upgrade_cost = start_upgrade_cost;

        this.semki_per_sec = semki_per_sec;

        this.minion_count = 0;
        this.upgrade_count = 1;
        this.upgrade_multi = 1.0;

        this.minion_element = Minion.construct_minion_buy(this);
        this.upgrade_element = Minion.construct_upgrade_buy(this);
    }

    get total_sps() {
        return this.minion_count * this.part_sps;
    }

    get part_sps() {
        return this.semki_per_sec * this.upgrade_count * this.upgrade_multi;
    }

    buy_minion() {
        if(semki_value >= this.minion_cost) {
            semki_value -= this.minion_cost;
            this.minion_count += 1;
            this.minion_cost *= 1.1;

            calculate_sps();
            
            this.minion_element.querySelector("#cost").innerText = this.minion_cost.toFixed(2) + "$";
            this.minion_element.querySelector("#count").innerText = this.minion_count;
        }
    }

    buy_upgrade() {
        if(semki_value >= this.upgrade_cost) {
            semki_value -= this.upgrade_cost;
            this.upgrade_count += 1;
            this.upgrade_cost *= 2;

            if (this.upgrade_count % 5 == 0) {
                this.upgrade_multi *= 2;
            } 

            calculate_sps();

            this.upgrade_element.querySelector("#cost").innerText = this.upgrade_cost.toFixed(2) + "$";
            this.upgrade_element.querySelector("#multi").innerText = this.upgrade_multi + "x";
            this.upgrade_element.querySelector("#count").innerText = this.upgrade_count;

            this.minion_element.querySelector("#sps").innerText = this.part_sps.toFixed(1) + "sps";
        }
    }

    static construct_minion_buy(minion) {
        let minion_element = document.createElement("div");
        minion_element.classList.add("column-el");
        
        minion_element.innerHTML = `
            <img src="${minion.picture_link}">
            <div class="name">${minion.minion_name}</div>
            <div class="values">
                <div id="cost">${minion.minion_cost.toFixed(2)}$</div>
                <div id="sps">${minion.semki_per_sec.toFixed(1)}sps</div>
                <div id="count">${minion.minion_count}</div>
            </div>
            <img class="button" id="buy" src="res/plus-sign.png">
        `;
        let button = minion_element.querySelector("#buy");
        button.addEventListener('click', function(){minion.buy_minion();});
    
        return minion_element;
    }

    static construct_upgrade_buy(minion) {
        let upgrade_element = document.createElement("div");
        upgrade_element.classList.add("column-el");
        
        upgrade_element.innerHTML = `
            <img src="${minion.picture_link}">
            <div class="name">${minion.minion_name}</div>
            <div class="values">
                <div id="cost">${minion.upgrade_cost.toFixed(2)}$</div>
                <div id="multi">${minion.upgrade_multi}x</div>
                <div id="count">${minion.upgrade_count}</div>
            </div>
            <img class="button" id="buy" src="res/arrow-up.png">
        `;
        let button = upgrade_element.querySelector("#buy");
        button.addEventListener('click', function(){minion.buy_upgrade();});
    
        return upgrade_element;
    }
}

/* Initializing the page */

var minions = [
    new Minion("Кулёк", "res/kulek.png", 0.1, 5.0, 50.0),
    new Minion("Чувачок", "res/chuvachok.png", 1.0, 50.0, 500.0),
    new Minion("Братва", "res/bratva.png", 10.0, 500.0, 5000.0),
    new Minion("Зона", "res/zona.png", 100.0, 5000.0, 50000.0),
    new Minion("Завод", "res/zavod.png", 1000.0, 50000.0, 500000.0),
    new Minion("Сатана", "res/satan.png", 10000.0, 500000.0, 5000000.0),
    new Minion("Космос", "res/space.png", 100000.0, 5000000.0, 50000000.0),
];

let columns = document.getElementsByClassName("column");
let upgrades_column = document.querySelector(".column#upgrades");
let minions_column = document.querySelector(".column#minions");

for (let minion of minions) {
    // Upgrades: 
    upgrades_column.append(minion.upgrade_element);

    // Minions
    minions_column.append(minion.minion_element);
}

let semka = document.getElementById("semka");
semka.addEventListener("click", semka_click);

/******************/
/* GAME VARIABLES */
/******************/

const MS_TO_SEC = 0.001;

var semki_value = 0.0;
var semki_per_sec = 0.00;
var semki_clicked = 0.0;
var semki_per_click = 1.0;

let semki_value_element = document.getElementById("semki-value");
let semki_per_sec_element = document.getElementById("semki-per-sec");


/******************/
/* GAME FUNCTIONS */
/******************/

function calculate_sps() {
    semki_per_sec = 0.0;
    for(let minion of minions) {
        semki_per_sec += minion.total_sps;
    }
}

function semka_click() {
    semki_clicked += semki_per_click;
}

// Updating internal values
function update(progress) {
    semki_value += semki_clicked + semki_per_sec * progress * MS_TO_SEC;
    semki_clicked = 0.0;
}

// Updating the on screen data
function draw() {
    semki_value_element.innerText = "Семки: " + semki_value.toFixed(2);
    semki_per_sec_element.innerText = "Семки/сек: " + semki_per_sec.toFixed(2);
}

// Default loop
function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);
