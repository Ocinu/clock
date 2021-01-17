var dateTime = new Date();

// day of week, month of year
var days = [
    'Неділя',
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    "П'ятниця",
    'Субота'
  ];
  var month = [
      "Січня",
      "Лютого",
      "Березня",
      "Квітня",
      "Травня",
      "Червня",
      "Липня",
      "Серпня",
      "Вересня",
      "Жовтня",
      "Листопада",
      "Грудня"
  ]

window.onload = function(){
    
    // Clock Arrows
    document.getElementById('second').style.transform = `rotate(${dateTime.getSeconds() * 6}deg)`;
    document.getElementById('minute').style.transform = `rotate(${dateTime.getMinutes() * 6}deg)`;
    document.getElementById('hour').style.transform = `rotate(${dateTime.getHours() * 30 + dateTime.getMinutes() * 0.5}deg)`;
    setInterval(function(){
        dateTime = new Date();
        document.getElementById('second').style.transform = `rotate(${dateTime.getSeconds() * 6}deg)`;
        document.getElementById('minute').style.transform = `rotate(${dateTime.getMinutes() * 6}deg)`;
        document.getElementById('hour').style.transform = `rotate(${dateTime.getHours() * 30 + dateTime.getMinutes() * 0.5}deg)`;
    }, 1000);

    // Current day
    document.getElementById('week').innerText = days[dateTime.getUTCDay()];
    document.getElementById('date').innerText = `${dateTime.getDate()} ${month[dateTime.getMonth()]} ${dateTime.getFullYear()}`;

    // number of week
    document.getElementById('weekday').innerText = `Тиждень: ${myWeekNumber(dateTime)}`;
    function myWeekNumber(thisDate){
        var dt = new Date(thisDate)
        var onejan=new Date(dt.getFullYear(), 0, 2);
        return Math.ceil((((dt - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }

    // alarm
    document.getElementById("clock_on").onclick = function(){
        $('#modal').modal('show');
    }

    // alarm off
    document.getElementById('clock_off').onclick = function(){
        clearInterval(stop_alarm);
        document.getElementById('alarm_hour').textContent = '--';
        document.getElementById('alarm_minute').textContent = '--';
        alert('alarm off');
    }
}

// Start alarm timer
var stop_alarm;
function alarm(){
    var aTime = new Date();
    var alarm_hour = document.getElementById('alarm_hour_set').value;
    var alarm_minute = document.getElementById('alarm_minute_set').value;
    var current_hour = aTime.getHours();
    aTime.setHours(alarm_hour);
    aTime.setMinutes(alarm_minute);
    $('#modal').modal('hide');
    
    var temp = (aTime - dateTime)/1000/60;
    if(temp > 60){
        temp_h = alarm_hour - current_hour;
        temp_min = Math.round(temp - (temp_h * 60));
    }else{
        temp_h = 0;
        temp_min = Math.round(temp - (temp_h * 60));
    }
    document.getElementById('alarm_hour').textContent = temp_h;
    document.getElementById('alarm_minute').textContent = temp_min;

    stop_alarm = setInterval(function(){
        if(temp > 0){
            if(temp > 60){
                temp_h = alarm_hour - current_hour;
                temp_min = Math.round(temp - (temp_h * 60));
            }else{
                temp_h = 0;
                temp_min = Math.round(temp - (temp_h * 60));
            }
            document.getElementById('alarm_hour').textContent = temp_h;
            document.getElementById('alarm_minute').textContent = temp_min;
            temp--;
        }else{
            alert('wake up!');
            document.getElementById('alarm_hour').textContent = '--';
            document.getElementById('alarm_minute').textContent = '--';
            clearInterval(stop_alarm);
        }
    }, 60000);
}
