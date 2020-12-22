function newYear() {


    const today = new Date();


    const cmgYear = new Date("January 1,2021 00:00:00");


    const now = today.getTime();
    const newYear = cmgYear.getTime();



    const timeDiff = newYear - now;

    // Now here we got the timedifference in milli seconds lets do some simple math 

    // var dayDiff = timeDiff /(1000 * 60 * 60 * 24);
    // console.log(dayDiff);

    // var daysDiff = Math.floor(dayDiff);
    // console.log(daysDiff);


    const second = 1000;
    const minute = second * 60;
    const hours = minute * 60;
    const day = hours * 24

    const d = Math.floor(timeDiff / (day));
    const h = Math.floor(timeDiff % (day) / (hours));
    const m = Math.floor(timeDiff % (hours) / (minute));
    const s = Math.floor(timeDiff % (minute) / (second));

    document.getElementById('days').innerHTML = `${d} <br/>Days`;
    document.getElementById('hours').innerHTML = `${h} <br/>Hours`;;
    document.getElementById('mins').innerHTML = `${m} <br/>Minutes`;;
    document.getElementById('seconds').innerHTML = `${s} <br/>Second`;;

}


setInterval(() => {
    newYear();
}, 1000)


function loader(){

    setTimeout(() => {

        spinner.style.opacity = 0;
        spinner.style.display = 'none';

        mainContainer.style.display = 'block';

    }, 4000)
    

}

loader();
