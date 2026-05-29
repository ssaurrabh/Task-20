let service = [
    {
        name: "Dry-cleaning",
        rate: 500,
        image: "./images/dryclean.jpg"
    },
    {
        name: "Ironing",
        rate: 100,
        image: "./images/iron.jpg"
    },
    {
        name: "Washing",
        rate: 150,
        image: "./images/washing.jpg"
    },
    {
        name: "Leather Cleaning",
        rate: 1000,
        image: "./images/leather.jpg"
    },
    {
        name: "Wedding Dress-Cleaning",
        rate: 500,
        image: "./images/dress.jpg"
    },
]

let curindex = 0;
let sno = 1;
let totalamount = 0;

function pageload() {
    let servname = document.getElementById("servname");
    let servimage = document.getElementById("servimage");
    let servamount = document.getElementById("servamount")

    if (curindex < service.length) {
        let curitem = service[curindex];

        servimage.src = curitem.image;
        servname.innerText = curitem.name;
        servamount.innerHTML = curitem.rate;
    }

}

pageload()

function add() {

    let skip = document.getElementById("skip")
    let insert = document.createElement("tr")
    let emptySpace = document.getElementById("emptydata");
    // let servamount = document.getElementById("servamount")
    let amountdis = document.getElementById("amountdis")

    let serviname = document.getElementById("serviname")
    let serviamount = document.getElementById("serviamount")


    let curitem = service[curindex];
    let itemtab = document.getElementById("itemtab")

    if (emptySpace) {
        emptySpace.style.display = "none";
    }

    insert.innerHTML = `
    <td>${sno}</td>
    <td>${curitem.name}</td>
    <td>${curitem.rate}</td>

    `
    itemtab.appendChild(insert)

    totalamount += curitem.rate
    if (amountdis) {
        amountdis.innerText = totalamount;
    }
    sno++;
    curindex++;

    pageload()

}

function skip() {
    if (curindex < service.length) {
        curindex++
        pageload()
    }
}

function booknow(){
    let myname = document.getElementById("name").value
    let mymail = document.getElementById("email").value
    let myphone = document.getElementById("phone").value
    let mystat = document.createElement("p")
    let stat = document.getElementById("status")

    if(!myname && !mymail && !myphone){
        mystat.innerText = "No Details filled";
        mystat.style.color = "red";
        stat.appendChild(mystat)
    }else if(myname && mymail && myphone){
        mystat.innerText = "Record submitted, we will contact you soon"
        mystat.style.color = "green"
        stat.appendChild(mystat)
    }
}


