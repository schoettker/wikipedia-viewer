document.getElementById('button').addEventListener('click', function(event) {
  retrieveData();
  event.preventDefault();
});
function retrieveData() {
  var request = new XMLHttpRequest();
  request.addEventListener('load', listener);
  request.open('GET', getUrl('search'));
  // request.setRequestHeader('Origin',''
  request.send();
}
function listener() {
  var response = JSON.parse(this.responseText).query.search;
  createList(response);
}
function getUrl(id) {
  var searchTerm = document.getElementById(id).value;
  // var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srprop=snippet&srsearch=' + searchTerm + '&origin=*';
  var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&srlimit=15&list=search&origin=*&srsearch=' + searchTerm;
  return url;
}
function createList(objArr) {
  var list = document.getElementById('list');
  list.innerHTML = null;
  objArr.forEach(function(object) {
    var listitem = document.createElement('li'), title = document.createElement('h5'), para = document.createElement('p');
    title.appendChild(document.createTextNode(object['title']));
    para.innerHTML = object.snippet;
    listitem.appendChild(title);
    listitem.appendChild(para);
    list.appendChild(listitem);
  });
}
