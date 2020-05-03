 //TEST pagination===================================================
  var list;
        //console.log("list: ", list)
        var pageList = new Array();
        var currentPage = 1;
        var numberPerPage = 10;
        var numberOfPages = 0;

//Need to get these in the right order; loading correct # of items on first page but not able to navigate to different page.

        function getNumberOfPages() {
          return Math.ceil(list.length / numberPerPage);
          console.log('number of pages',numberOfPages)
        }

        function nextPage() {
          currentPage += 1;
          loadList();
          console.log('next page...')
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
          console.log('current page...',currentPage)
          loadList();
        }

        function loadList() {
          var begin = ((currentPage - 1) * numberPerPage);
          
          var end = begin + numberPerPage;

          pageList = list.slice(begin, end);
          console.log('pageList',pageList)
          drawList();
          check();
        }

        function drawList() {
          //document.getElementById("list").innerHTML = "";
          /*for (r = 0; r < pageList.length; r++) {
            document.getElementById("list").innerHTML += pageList[r] + "<br/>";
          }*/
        }

        function check() {
          document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
          document.getElementById("previous").disabled = currentPage == 1 ? true : false;
          document.getElementById("first").disabled = currentPage == 1 ? true : false;
          document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
        }

        //end TEST pagination==============================================