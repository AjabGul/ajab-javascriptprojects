// 1 step
const cantainer = document.querySelector(".cantainer");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

// step 7: Function for data from local storage to build UI

function populateUI (){
    const selectedSeats = JSON.parse(localStorage.setItem(SelectedSeat));
    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index)> -1){
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.setItem("selectedMovieIndex");
    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
//3 step: Functions: function to update counts
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const countSelectedSeats = selectedSeats.length;
    // console.log(countSelectedSeats); // to check the nodelist or function

    // step 5: creat array function 
    const seatIndex = [...selectedSeats].map(function (seat){
        return [...seats].indexOf(seat);
    })
    localStorage.setItem("selectedSeats",JSON.stringify(seatIndex));
    // console.log(seatIndex); // just used to test seat index success

    count.innerText = countSelectedSeats; // it will count the seats selected
    total.innerText = ticketPrice * countSelectedSeats;
}
// step 6: function to get selected movie and price
function seatMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex); 
    localStorage.setItem("selectedMoviePrice", moviePrice);
}
//4 step: event listener for change in movie price value
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value
    seatMovieData(e.target.selectedIndex, e.target.value); // to get the movie index and price
    
    seatMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//2 step: event listner for click on available seats
// (e) => {function logic} = function=> function (e) {function logic}
cantainer.addEventListener("click", (e) => {
    // console.log(e.target); --> Used to confirm that event listener on cantainer is working
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        // console.log(e.target); used to check the only the unselected seat not occupied
        // e.target.classList.add('selected');// used to select but not able to undo
        // e.target.classList.remove('selected');// used to remove but not able to select
        e.target.classList.toggle('selected'); //toggle used to select & also able to undo
        updateSelectedCount()
    }
}) 

