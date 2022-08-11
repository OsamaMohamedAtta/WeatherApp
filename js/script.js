// get search input
const searchForm = document.getElementById("searchForm") 
// get container card section
const container = document.getElementById("container-section")
// all days hear
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
// all month hear
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]
// get firstDay and month and date hear
let date = new Date();
let firstDayName = date.getDay();
let firstDayMonth = date.getMonth()
let firstDayDate = date.getDate() 
// get secondDay
let secondDay = new Date(date);
secondDay.setDate(date.getDate() + 1);
let secondDayName = secondDay.getDay();
let secondDayMonth = secondDay.getMonth()
let secondDayDate = secondDay.getDate()
// get thirdDay
let thirdDay = new Date(secondDay);
thirdDay.setDate(secondDay.getDate() + 1);
let thirdDayName = thirdDay.getDay();
let thirdDayMonth = thirdDay.getMonth();
let thirdDayDate = thirdDay.getDate();
// function to City search
async function search(q){
    let url = `https://api.weatherapi.com/v1/forecast.json?key=a7109b2f453648dc93a124459210610&q=${q}&days=3`
    let response = await fetch(url);
      let data = await response.json();
        let cartona = `<!-- card-city frist day -->
        <div class="col-lg-4 col-md-12 mt-5">
            <div class="city-temp-card">
                <div class="head-card d-flex justify-content-between p-2 ps-4 pe-4 w-100">
                    <p id="today" class="mb-0">${days[firstDayName]}</p>
                    <p id="today-date" class="mb-0">${firstDayDate}${monthNames[firstDayMonth]}</p>
                </div>
                <div class="card-continer d-flex justify-content-between align-items-center">
                    <div class="card-section">
                        <div class="card-info">
                            <p class="fs-4">${data.location.name}</p>
                            <p class="deagre fw-bold">${data.current.temp_c}&deg;C</p>
                            <p class="weather-type fw-bold">${data.current.condition.text}</p>
                            <div class="footer-card d-flex">
                                <i class="fa-solid fa-umbrella pt-2 me-md-2 me-sm-1"></i>
                                <p>24%</p>
                                <i class="fas fa-wind ms-2 pt-2 me-md-2 me-sm-1"></i>
                                <p>20.2 Km/h</p>
                                <i class="far fa-compass ms-2 pt-2 me-md-2 me-sm-1"></i>
                                <p>NNE</p>
                            </div>
                        </div>
                    </div>
                    <div class="icon pb-5">
                        <img src="https:${data.current.condition.icon}" alt="icon-img">
                    </div>
                </div>
            </div>
        </div>
        <!-- card-city second day -->
        <div class="col-lg-4 col-md-12 mt-5">
            <div class="city-temp-card">
                <div class="head-card d-flex justify-content-between p-2 ps-4 pe-4 w-100">
                    <p id="today" class="mb-0">${days[secondDayName]}</p>
                    <p id="today-date" class="mb-0">${secondDayDate}${monthNames[secondDayMonth]}</p>
                </div>
                <div class="card-continer-nextday card-continer text-center d-flex flex-column align-items-center">
                    <div class="icon-weather">
                        <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="icon-img">
                    </div>
                    <div class="card-section">
                        <div class="card-info">
                            <p class="m-0 fs-3">${data.forecast.forecastday[1].day.maxtemp_c}&deg;C</p>
                            <p class="m-0">${data.forecast.forecastday[1].day.mintemp_c}&deg;C</p>
                            <p class="weather-type fw-bold mt-3">${data.forecast.forecastday[1].day.condition.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- card-city third day -->
        <div class="col-lg-4 col-md-12 mt-5">
            <div class="city-temp-card">
                <div class="head-card d-flex justify-content-between p-2 ps-4 pe-4 w-100">
                    <p id="today" class="mb-0">${days[thirdDayName]}</p>
                    <p id="today-date" class="mb-0">${thirdDayDate}${monthNames[thirdDayMonth]}</p>
                </div>
                <div class="card-continer-nextday card-continer text-center d-flex flex-column align-items-center">
                    <div class="icon-weather">
                        <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="icon-img">
                    </div>
                    <div class="card-section">
                        <div class="card-info">
                            <p class="m-0 fs-3">${data.forecast.forecastday[2].day.maxtemp_c}&deg;C</p>
                            <p class="m-0">${data.forecast.forecastday[2].day.mintemp_c}&deg;C</p>
                            <p class="weather-type fw-bold mt-3">${data.forecast.forecastday[2].day.condition.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    container.innerHTML = cartona
}
// default location
search('Alexandria')
// get city weather
$(function() {
    $("#searchForm").autocomplete({
      source:[cityNames]
    });
}).on('selected.xdsoft',function(){
    search(searchForm.value)
}); 
// hide navbar toogle
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
//Scroll back to top
$(document).ready(function(){
    let progressPath = document.querySelector('.progress-wrap path');
    let pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
    let updateProgress = function () {
        let scroll = $(window).scrollTop();
        let height = $(document).height() - $(window).height();
        let progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);	
    let offset = 50;
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });				
    jQuery('.progress-wrap').on('click', function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, 'fast');
        return false;
    })
});
