document.getElementById('button').addEventListener('click', function(event) {
  XHRequest();
  event.preventDefault();
});
document.getElementById('form').addEventListener('submit', function(event) {
  XHRequest();
  event.preventDefault();
});
function XHRequest() {
  var request = new XMLHttpRequest();
  request.open('GET', getUrl('search'));
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      handleResponse(this.responseText);
  } else {
    console.log('Server returned an Error#', this.status);
  }
  };
  request.onerror = function() {
    console.log('Connection Error');
  };
  request.send();
}
function handleResponse(response) {
  var response = JSON.parse(response).query.pages, arr = [];
  for (var key in response) {
    arr.push(response[key]);
  }
  createList(arr);
  document.getElementsByClassName('container')[0].style.marginTop = '2em';
}
function getUrl(id) {
  var searchTerm = document.getElementById(id).value,
  url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&generator=search&gsrlimit=10&gsrsearch=' + searchTerm + '&prop=extracts&exintro=true&exlimit=10&explaintext=true&exsentences=2';
  return url;
}
function createList(objArr) {
  var list = document.getElementById('list');
  list.innerHTML = null;
  objArr.forEach(function(object) {
    var listitem = document.createElement('li'), title = document.createElement('h5'), para = document.createElement('p'), link = document.createElement('a');
    title.appendChild(document.createTextNode(object['title']));
    para.innerHTML = object.extract;
    link.appendChild(title);
    link.appendChild(para);
    link.setAttribute('href', 'https://en.wikipedia.org/?curid=' + object.pageid);
    link.setAttribute('target', 'blank');
    listitem.appendChild(link);
    list.appendChild(listitem);
  });
}
