var request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);
request.send();
request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    
    function createHtmlElement(element, className = '', id = '') {
        var elem = document.createElement(element);
        elem.setAttribute('class', className);
        elem.setAttribute('id', id);
        return elem;
    }

    var containerBox = document.createElement('div');
    containerBox.setAttribute('class', 'container-fluid');
    containerBox.setAttribute('id', 'CB');
    document.body.append(containerBox);

    var displayBox = createHtmlElement('div');
    var pageBox = createHtmlElement('div');
    
    containerBox.append(displayBox, pageBox);

    var tBox = createHtmlElement('table', 'table');
    tBox.style.border = '2px solid white';
    displayBox.append(tBox);

    var tRowHead = createHtmlElement('tr');
    var tHead1 = createHtmlElement('th', 'table-head', 'TH1');
    tHead1.innerHTML = ('ID');
    var tHead2 = createHtmlElement('th', 'table-head', 'TH2');
    tHead2.innerHTML = ('Name');
    var tHead3 = createHtmlElement('th', 'table-head', 'TH3');
    tHead3.innerHTML = ('Email');
    tRowHead.append(tHead1, tHead2, tHead3);

    var tBody = createHtmlElement('tbody', 'table-body');
    tBox.append(tRowHead, tBody);

    var currentPage = 1;
    var rows = 10;
    var pageCount = 10;


    function displayList(array, rows, page){
        tBody.innerHTML = '';
        page--;

        var start = rows * page;
        var end = start + rows;
        var paginatedItems = array.slice(start, end);

        for (var i = 0; i < paginatedItems.length; i++) {
            var tRow = createHtmlElement('tr');
            tRow.style.border = '2px solid white';

            var tCol1 = createHtmlElement('td', 'table-cell');
            tCol1.innerHTML = paginatedItems[i].id;
            tCol1.style.border = '2px solid white';
            var tCol2 = createHtmlElement('td', 'table-cell');
            tCol2.style.border = '2px solid white';
            tCol2.innerHTML = paginatedItems[i].name;
            var tCol3 = createHtmlElement('td', 'table-cell');
            tCol3.innerHTML = paginatedItems[i].email;
            tCol3.style.border = '2px solid white';
            tRow.append(tCol1, tCol2, tCol3);
            tBody.appendChild(tRow);
        }
    }
    
    function setupPagination(array, pageBox, rowsPerPage) {
        pageBox.innerHTML = '';

        var pageCount = Math.ceil(array.length / rowsPerPage);

        for (var i = 1; i <= pageCount; i++) {
            var button = paginationButton(i, array);
            pageBox.appendChild(button);
        }

    }

    function paginationButton(page, arrayList) {
        var button = createHtmlElement('button', 'button-page');
        button.innerHTML = page;
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.addEventListener('click',
    
    function() {
            currentPage = page;
            displayList(arrayList, rows, currentPage);
    });
        return button;
    
    }
    

    displayList(data, rows, currentPage);
    setupPagination(data, pageBox, rows);

}