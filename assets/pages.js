//TEST pagination===================================================
var list;
//console.log("list: ", list)
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 10;
var numberOfPages = 0;

//lastPage and getNumberOfPages not working

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
    console.log('number of pages', numberOfPages)
}

function nextPage() {
    currentPage += 1;
    loadList();
    console.log('next page...')
    console.log('number of pages', numberOfPages)
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    console.log('current page...', currentPage)
    loadList();
}

/*function makeList() {
    numberOfPages = getNumberOfPages();
}*/

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);

    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    //console.log('pageList', pageList);
    console.log('list length', list.length)
    //console.log('# of pages',numberOfPages)
    //drawList();
    check();
}

function load() {
    //makeList();
    numberOfPages = getNumberOfPages();
    console.log('load', numberOfPages)
}

/*function drawList() {
  //document.getElementById("list").innerHTML = "";
  /*for (r = 0; r < pageList.length; r++) {
    document.getElementById("list").innerHTML += pageList[r] + "<br/>";
  }
}*/

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

        //end TEST pagination==============================================