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
  var response = JSON.parse(this.responseText).query.pages, arr = [];
  for (var key in response) {
    arr.push(response[key]);
  }
  createList(arr);
}
function getUrl(id) {
  var searchTerm = document.getElementById(id).value;
  // var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srprop=snippet&srsearch=' + searchTerm + '&origin=*';
  // var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&srlimit=15&list=search&origin=*&srsearch=' + searchTerm + '&srprop=snippet&redirects=true';
  var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&generator=search&gsrlimit=10&gsrsearch=' + searchTerm + '&prop=extracts&exintro=true&exlimit=10&explaintext=true&exsentences=2';
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
