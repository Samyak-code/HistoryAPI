// const document = require('fs');
// const fetch = require("node-fetch");
// fetch("http://history.muffinlabs.com/date")
//     .then(response => response.json())
//     .then(data => {
//         //console.log(data.data.Births)
//         //console.log(data.data.Events)
//         //console.log(data.data.Deaths)
// })

var curday = function(sp){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+"/"+mm);
};

function Date1(){
    var dateinput = document.getElementById('dateinput').value;
    var monthinput = document.getElementById('monthinput').value;

    console.log(dateinput, monthinput);
}

function Month()
{
    var dateinput = document.getElementById('dateinput').value;
    var monthinput = document.getElementById('monthinput').value;

    console.log(dateinput, monthinput);
}

function onGetHistory(event)
{
    event.preventDefault();

    var dateinput = document.getElementById('dateinput').value;
    var monthinput = document.getElementById('monthinput').value;
    alert("Loading")
    console.log(dateinput, monthinput);

    fetch("http://history.muffinlabs.com/date/" + monthinput + "/" + dateinput)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var events = data.data.Events;
            displayHistoryData("events", events);

            var births = data.data.Births;
            displayHistoryData("births", births);

            
            var deaths = data.data.Deaths;
            displayHistoryData("deaths", deaths);
            
            // console.log(data.data.Births)
            // console.log(data.data.Events)
            // console.log(data.data.Deaths)
    })
}

function displayCurrentDate()
{
    var cur_day = curday();
    document.getElementById("today").innerText = cur_day;
}

function displayHistoryData(id, list)
{
    var result = '';
    list.forEach(function(item) {
        result += '<li>';
        result += item.html;
        result += '</li>';
    });

    document.getElementById(id).innerHTML = result;
}

var shuffleList = function(ul) {
    for (var i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[Math.random() * i | 0]);
    }
  };

  var setupAnimation = function(el) {
    el.classList.add("fade-in-and-out");
    el.addEventListener('animationend', () => {
      el.classList.remove("fade-in-and-out");
      setTimeout(function() {
        el.classList.add("fade-in-and-out");
        shuffleList(el);
      }, 70);
    });
  };
  
  function setupTicker()
  {
    
    let events = document.getElementById("events");
    let births = document.getElementById("births");
    let deaths = document.getElementById("deaths");
    setupAnimation(events);
    setupAnimation(births);
    setupAnimation(deaths);
  }

  document.onreadystatechange = function() {
    if( document.readyState == 'complete' )
    {
        displayCurrentDate();

        setupTicker();
    }
}
