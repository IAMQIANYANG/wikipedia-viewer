/**
 * Created by pandachain on 2016-07-22.
 */

var list = [];

var cleanResult = function(){
  if (list.length > 0){
    document.querySelector(".searchResult").innerHTML = "";
  }
};

var getKeyword = function(){
  var searchBox = document.querySelector("#searchBox");
  var keyword = searchBox.value;
  callAPI(keyword);
};

var moveToTop = function(){
  var title = document.querySelector("h1");
  title.style.marginTop = "0";
};

var startSearch= function(){
  document.querySelector("#searchBox").addEventListener("keypress", function(key){
    if (key.keyCode === 13) {
      document.location.href = "#top";
      moveToTop();
      getKeyword();
    }
  });
  document.querySelector(".fa-search").addEventListener("click", function(){
    moveToTop();
    getKeyword();
  })
};


var callAPI = function(keyword){

  var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + keyword;

  var listRequest = new XMLHttpRequest();
  listRequest.open('GET', url, true);

  listRequest.onload = function () {
    if (listRequest.status >= 200 && listRequest.status < 400) {
      list = JSON.parse(listRequest.responseText)["query"]["search"];
      cleanResult();
      displayResult();
    }
  };
  listRequest.onerror = function () {
    document.querySelector(".searchResult").innerHTML = "<p>Sorry we were unable to reach the wikipedia server..</p>"
  };

  listRequest.send();
};

var displayResult = function(){
w
  function generateHTML (element, index, array) {
    var title = "<h4>" + element["title"] + "</h4>" ;
    var text = "<p>" + element["snippet"] + "</p>";
    var displayBox = document.querySelector(".searchResult");
      displayBox.innerHTML += '<a target="_blank" href="http://en.wikipedia.org/wiki/' 
                                                        + element["title"] + '"><div class="resultDecor">' + title + text + "</div></a>";
      
    
  }

  list.forEach(generateHTML);

};

startSearch();