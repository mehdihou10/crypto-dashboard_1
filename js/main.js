/*---------------------start header----------------------*/

//select Elements
let leftPart = document.querySelector("main .left");
let bars = document.querySelector("header .bars");
let bodyOverlay = document.querySelector(".body-overlay");
let lisLeft = document.querySelectorAll("main .left li");
let modes = document.querySelectorAll("header .container .mode i");
let lightMode = document.querySelector("header .container .mode i:first-child");
let darkMode = document.querySelector("header .container .mode i:last-child");


//change active class by click
lisLeft.forEach(li =>{

    li.addEventListener("click",(e)=>{

        lisLeft.forEach(delLi => delLi.classList.remove("active"));

        e.currentTarget.classList.add("active");

    });

});

//show sidebar when you click on bars
bars.onclick = function(){

    leftPart.classList.add("show");
    bodyOverlay.classList.add("show");
    document.body.style.overflow = "hidden";

};


//dark / light mode

//get data from local storage
if(window.localStorage.getItem("text-color")){
    changeMode(localStorage.getItem("text-color") , localStorage.getItem("bg-color") , localStorage.getItem("body-color") , localStorage.getItem("change-color"));

    //change active class
    modes.forEach(delMode => delMode.classList.remove("active"));
    if(localStorage.getItem("change-color") === "white"){
        lightMode.classList.add("active");
    }
    else{
        darkMode.classList.add("active");
    }
}

modes.forEach(mode =>{

    mode.addEventListener("click",(e)=>{

        //change active class
        modes.forEach(delMode => delMode.classList.remove("active"));
        e.currentTarget.classList.add("active");

        //change theme in light/dark mode
        changeMode(e.currentTarget.dataset.text , e.currentTarget.dataset.bg , e.currentTarget.dataset.body , e.currentTarget.dataset.change);

        //save in local storage
       
        window.localStorage.setItem("text-color",e.currentTarget.dataset.text);
        window.localStorage.setItem("bg-color",e.currentTarget.dataset.bg);
        window.localStorage.setItem("body-color",e.currentTarget.dataset.body);
        window.localStorage.setItem("change-color",e.currentTarget.dataset.change);
    });
});

//function : get data from local storage then change css variables
function changeMode(var1,var2,var3,var4){
    document.documentElement.style.setProperty("--color-text",var1);
    document.documentElement.style.setProperty("--bg-color",var2);
    document.documentElement.style.setProperty("--body-color",var3);
    document.documentElement.style.setProperty("--change-color",var4);

}

/*---------------------end header----------------------*/

/*---------------------start main----------------------*/

/*---------------------start left----------------------*/

//select elements
let deleteLeftPart = document.querySelector("main .left .delete-sidebar");
let updateBox = document.querySelector("main .left .update-box");
let updateBoxBtn =document.querySelector("main .left .update-box .update-btn");

//delete sidebar
deleteLeftPart.onclick = ()=>{

    leftPart.classList.remove("show");
    bodyOverlay.classList.remove("show");
    document.body.style.overflow = "visible";
};

//remove update box if you have updated before
let updateLocalStorage = window.localStorage.getItem("update");

if(updateLocalStorage){
updateBox.remove();
}


//show update box popup in small decices
if(window.innerWidth < 992){

  
    setTimeout(()=>{

        if(updateLocalStorage === null){
            updateBox.classList.add("show");
            bodyOverlay.classList.add("show");
            document.body.style.overflow = "hidden";      
        }


    },2000);
}

//remove update box
updateBoxBtn.onclick = function(){

    updateBox.remove();
    alert("Congrats, Your application was Updated");

    //add update to local storage
    window.localStorage.setItem("update","done");

    //in small devices
    if(window.innerWidth < 992){
        document.body.style.overflow = "visible";
        bodyOverlay.classList.remove("show");
    }
};


/*---------------------end left----------------------*/


/*---------------------start section----------------------*/

//select elements
let showDetails = document.querySelectorAll("main section .market .info > span");
let detailsIcon = document.querySelectorAll("main section .market .info > span i");
let chart = document.getElementById("chart").getContext('2d');

//show / hide details
showDetails.forEach((detail,index) =>{

    detail.addEventListener("click",(e)=>{

        e.currentTarget.nextElementSibling.classList.toggle("show");

        if(detailsIcon[index].classList.contains("fa-caret-right")){
            detailsIcon[index].className = "fa-solid fa-caret-down";
        }
        else{
            detailsIcon[index].className = "fa-solid fa-caret-right";
        
        }
    });
});

//create new chart
new Chart(chart , {

    type: 'line',

    data: {

        labels: ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],

        datasets: [

            {
                label: "BTC",
                data: [29374,33537,49631,59095,57828,36684,33572,39974,48847,48116,61004],
                borderColor: "red",
                borderWidth: 2
            },

            {
                label: "ETH",
                data: [31500,41000,88800,26000,46000,32698,5000,3000,18656,24832,36844],
                borderColor: "blue",
                borderWidth: 2
            }
        ]
    },

    options: {
        responsive: true,
    }
});

/*---------------------end section----------------------*/


/*---------------------end main----------------------*/
