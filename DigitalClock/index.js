window.onload = (event) => {
    var localTime = document.getElementById('localTime');
    var getTimeClock = function () {
        const date = new Date();
        localTime.innerText = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    setInterval(
        getTimeClock, 1000
    );
    getTimeClock();
};