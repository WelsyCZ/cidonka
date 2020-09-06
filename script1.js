
function daysBetween(d1, d2){
    let ms, secs, mins, hrs, days;
    ms = d2 - d1;
    secs = ms/1000;
    mins = secs/60;
    hrs = mins/60;
    days = hrs/24;
    return days;
}

function go(){
    let times, tt1, tt2, tt3;
    times = [0,2,4,6,8,10,12,14,16,18,20,22];
    tt1 = ["RED", "YEL", "BLU", "YEL", "BLU", "RED", "YEL", "BLU", "RED", "YEL", "BLU", "RED"];
    tt2 = ["YEL", "BLU", "RED", "BLU", "RED", "YEL", "BLU", "RED", "YEL", "BLU", "RED", "YEL"];
    tt3 = ["BLU", "RED", "YEL", "RED", "YEL", "BLU", "RED", "YEL", "BLU", "RED", "YEL", "BLU"];

    let tab = [tt1, tt2, tt3];
    let dayzero = new Date("2020-09-03");
    dayzero.setHours(0);
    dayzero.setMinutes(0);
    dayzero.setSeconds(0);
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    let days = daysBetween(dayzero, today);
    days = Math.floor(days);
    let schedToday = tab[days % 3];
    let daysCZ = ["NE", "PO", "ÚT", "ST", "ČT", "PÁ", "SO"];
    genTable(times, tab, days % 3);
    let hour = new Date().getHours();
    if(hour % 2 == 1) hour--;
    let id = times.findIndex(a => a == hour);
    let table = document.getElementById("schedule");
    table.rows[2].cells[id+1].setAttribute("style", "background-color: #00ff00");
}   

function genTable(times, tabs, idx){
    let table = document.getElementById("schedule");
    genThead(table, times);
    genTbody(table, tabs, idx);
}

function genThead(table, data){
    let thead = table.createTHead();
    let row = thead.insertRow();
    let firstcell = document.createElement("th");
    row.appendChild(firstcell);
    for(let e of data){
        let th = document.createElement("th");
        let text = document.createTextNode(e);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function genTbody(table, data, idx){
    date = new Date();
    date.setDate(date.getDate() - 1);
    for(let i = 0; i < 8; ++i){
        genDay(table, data, (idx - 1 + i) % 3, date);
        date.setDate(date.getDate() + 1);
    }
}

function genDay(table, data, idx, date){
    if(idx == -1) idx = 2
    let daysCZ = ["NE", "PO", "ÚT", "ST", "ČT", "PÁ", "SO"];
    let day = date.getDay();
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let row = tbody.insertRow();
    let firstcell = document.createElement("td");
    let text = document.createTextNode(daysCZ[day]);
    firstcell.appendChild(text);
    row.appendChild(firstcell);
    for(let e of data[idx]){
        let td = document.createElement("td");
        let img = new Image(50,25);
        img.src = e == "RED" ? "Flag_red.png" : (e == "BLU" ? "Flag_blue.png" : "Flag_yellow.png");
        td.appendChild(img);
        row.appendChild(td);
    }
}
