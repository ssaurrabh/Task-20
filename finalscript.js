
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



function loadallservices() {
    let cont = document.getElementById("locdl")
    // let des = document.getElementById("des")

    let dili = service.map((data, index) =>
        `
        <dd>${data.name} <div><i class="fa-solid fa-indian-rupee-sign"></i>${data.rate}</div> <div><button onclick="handleadd(${index},this)" id="btnadd">Add Items</button></div></dd>
        `
    ).join('')
    cont.innerHTML = dili;

}

loadallservices()


let ser = 1
let amnt = 0
let booknw = document.getElementById("booknow")
function handleadd(ind, btn) {
    // let adder = document.getElementById("btnadd")

    let emp = document.getElementById("emptydata")
    let newrow = document.createElement("tr")
    let amdis = document.getElementById("amountdis")
    if (emp) { emp.style.display = "none"; }

    let maintab = document.getElementById("itemtab")

    let curitem = service[ind]

    if (btn.innerText == "Add Items") {
        newrow.id = `row-${ind}`;
        newrow.innerHTML =
            `
        <td class="ser-col">${ser}</td>
        <td>${curitem.name}</td>
        <td>${curitem.rate}</td>
            `

        ser++

        maintab.appendChild(newrow);
        amnt += curitem.rate
        btn.innerText = "Remove Item";

        if (amdis) {
            amdis.innerText = amnt;
        }
        if (amnt > 0) {
            booknw.style.backgroundColor = "rgb(126, 46, 132)";
        } else {
            booknw.style.backgroundColor = "transparent";
        }

    } else if (btn.innerText == "Remove Item") {
        let delrow = document.getElementById(`row-${ind}`)
        if (delrow) {
            delrow.remove()
        }
        ser--
        amnt -= curitem.rate;
        btn.innerText = "Add Items"
        if (amdis) {
            amdis.innerText = amnt;
        }

        if (amnt > 0) {
            booknw.style.backgroundColor = "rgb(126, 46, 132)";
        } else {
            booknw.style.backgroundColor = "transparent";
        }

        let serall = document.querySelectorAll(".ser-col")
        serall.forEach((td, i) => {
            td.innerText = i + 1
        });

        if (serall.length === 0) {
            emp.style.display = "flex"
        }
    }

}


function booknow() {
    let stat = document.getElementById("status");
    let myname = document.getElementById("name").value.trim();
    let myemail = document.getElementById("email").value.trim();
    let myphone = document.getElementById("phone").value.trim();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    if (amnt === 0) {
        stat.innerText = "No Item Added";
        stat.style.color = "red";
        return;
    } 

   
    if (!myname || !myemail || !myphone) {
        stat.innerText = "Please fill out all contact details.";
        stat.style.color = "blue";
        return;
    } 
    

    if (!emailPattern.test(myemail)) {
        stat.innerText = "Please enter a valid email address (e.g., name@example.com).";
        stat.style.color = "red";
        return;
    }


    
    let templateParams = {
        to_name: myname,
        to_email: myemail,
        phone_number: myphone,
    };

    
    emailjs.send("service_3hcykk5", "template_67jc66g", templateParams)
        .then(function(response) {
            stat.innerText = "Booking confirmed! A confirmation email has been sent.";
            stat.style.color = "green";
            
           
            alert(`Success! Booking confirmation email successfully dispatched to ${myemail}.`);
            
            
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
        }, function(error) {
            stat.innerText = "Booking placed, but confirmation email failed to send.";
            stat.style.color = "red";
            console.error("EmailJS Error:", error);
        });
}