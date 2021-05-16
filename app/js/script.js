const centersList = document.getElementById('centersList');
const searchBar = document.getElementById('searchBar');
const datepicker = document.getElementById('datepicker');
let covidCenters = [];
$(document).ready(function(){
    $('#datepicker').datepicker({
        dateFormat: "dd-mm-yy"
    });
})
const loadCenters = async () => {
    try {
        const todayDate = getDateValue();
        console.log(todayDate);
        const res = await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=' + searchBar.value + '&date=' + todayDate);
        covidCenters = await res.json();
        displayCenters(covidCenters);
        console.log(covidCenters);
    }
    catch (err) {
        console.error(err);
    }
};

const displayCenters = (covidCenters) => {
    const htmlString = covidCenters.centers
       .map((center) => {
        return `
        <li class="center">
        <h2>${center.name}</h2>
        <span>${center.address}, ${center.block_name}</span>
        <p>${center.district_name}</p>
        </li>
    `;
    })
    .join('');
    if(htmlString === ""){
        centersList.innerHTML = "No slots are available"
    }
    else{
        centersList.innerHTML = htmlString;
    }
};

function getDateValue(){
    if(datepicker.value === ""){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }
    else{
        return datepicker.value;
    }
    
}