let query = document.querySelector.bind(document);
let queryAll = document.querySelectorAll.bind(document);

function read(book) {
  var book = {
    pages: queryAll(`.${book} .page`),
    currentPage: 0,
    next: query('.controls .right'), 
    prev: query('.controls .left')
  };

  function nextPage(book) {
    book.pages[book.currentPage].className = 'page';
    book.currentPage = (book.currentPage+1) % book.pages.length;
    book.pages[book.currentPage].className = 'page active';
  }

  function previousPage(book) {
    book.pages[book.currentPage].className = 'page';
    book.currentPage === 0 ? book.currentPage = book.pages.length - 1 : book.currentPage--;
    book.pages[book.currentPage].className = 'page active';
  }

  book.next.addEventListener('click', (e) => { nextPage(book); });
  book.prev.addEventListener('click', (e) => { previousPage(book); });
}

queryAll('.view-book').forEach((a) => {
  var chosenBook;
  a.addEventListener('click',() => {
    query('.homepage').classList.add('d-none')
    query('.main-menu').classList.add('d-none')
    query('.controls').classList.remove('d-none')
    if (a.classList.contains('pluto')) { chosenBook = 'pluto-book' }
    else if (a.classList.contains('astrophysics')) { chosenBook = 'astro-book' }
    else if (a.classList.contains('black-hole')) { chosenBook = 'black-hole-book' }
    query(`.${chosenBook}`).classList.remove('d-none')
    read(chosenBook)
  })
})

function withDropdown(dropdown) {
  query(`.${dropdown}`).classList.toggle('d-none') 
  query('.overlay').classList.toggle('d-none')
  query('.overlay').addEventListener('click', () => {
    query(`.${dropdown}`).classList.add('d-none') 
    query('.overlay').classList.add('d-none')
  })
}

function home() {
  query('.homepage').classList.remove('d-none')
  query('.main-menu').classList.remove('d-none','absolute')
  queryAll('.book').forEach((e) => { e.classList.add('d-none') })
  query('.controls').classList.add('d-none')
}

function centerControl() {
  queryAll('.main-menu, .page-menu, .page-menu-bottom, .page-display-dropdown ').forEach((e) => { e.classList.add('d-none') })
  query('.main-menu').classList.remove('absolute')
}

function topControl() {
  queryAll('.main-menu, .page-menu, .page-menu-bottom ').forEach((e) => { e.classList.remove('d-none') })
  query('.main-menu').classList.add('absolute')
}

query('.controls').addEventListener('click', () => { query('.controls').style.opacity = 0; })
query('.controls .top').addEventListener('click', () => { topControl(); })
query('.controls .center').addEventListener('click', () => { centerControl() })
queryAll('.home-button, .back-button').forEach((e) => { e.addEventListener('click', () => { centerControl(); home(); }) })
