const bookContainer = document.getElementById('right');
const addBook = document.getElementById('add-book');
const inputBackground = document.getElementById('input-background');
const inputContainer = document.getElementById('input-container');
const inputConfirm = document.getElementById('input-confirm');
const inputCancel = document.getElementById('input-cancel');
const totalBooks = document.getElementById('total-books');

function getInputTitle(){return document.getElementById('book-title').value.trim() != "" ? document.getElementById('book-title').value : "N/A"};
function getInputAuthor(){return document.getElementById('book-author').value.trim() != "" ? document.getElementById('book-author').value : "N/A"};
function getInputPages(){return document.getElementById('book-pages').value.trim() != "" ?  document.getElementById('book-pages').value : "N/A"};
function getInputRead(){return document.querySelector('input[name="read"]:checked').id == "true" ? true : false};

addBook.addEventListener('click', inputShow);
inputConfirm.addEventListener('click', addBookToLibrary);
inputCancel.addEventListener('click', inputClose);

const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function (){
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}.`;
    };
};
function addBookToLibrary(){
    const book = new Book(getInputTitle(), getInputAuthor(), getInputPages(), getInputRead());
    myLibrary.push(book);
    refreshLibrary();
    clearInputs();
    inputClose();
};
function clearInputs(){
    document.getElementById('book-title').value = "";
    document.getElementById('book-author').value = "";
    document.getElementById('book-pages').value = "";
    document.querySelector('input[id="false"]').checked = true;
};

function inputShow(){
    inputBackground.classList.remove('close');
    inputContainer.classList.remove('close')
    inputBackground.classList.add('show');
    inputContainer.classList.add('show');
};
function inputClose(){
    inputBackground.classList.remove('show');
    inputContainer.classList.remove('show');
    inputBackground.classList.add('close');
    inputContainer.classList.add('close');
    clearInputs();
};

function refreshLibrary(){
    bookContainer.innerHTML = "";
    totalBooks.textContent = myLibrary.length;
    myLibrary.forEach((e, i, a) =>{
        // Create Book Container
        const book = document.createElement('div');
        book.classList.add('book');

        // Create Book Title & Add It To The Container
        const bookTitle = document.createElement('h2');
        bookTitle.classList.add('title');
        bookTitle.textContent = e.title;

        // Create Book Author & Add It To The Container;
        const bookAuthorContainer = document.createElement('div');
        bookAuthorContainer.classList.add('author');

        const bookAuthor = document.createElement('div');
        bookAuthor.textContent = "Author : " ;

        const bookAuthorDisplay = document.createElement('div');
        bookAuthorDisplay.textContent = e.author;

        bookAuthorContainer.appendChild(bookAuthor);
        bookAuthorContainer.appendChild(bookAuthorDisplay);

        // Create Book Pages & Add It To The Container;
        const bookPagesContainer = document.createElement('div');
        bookPagesContainer.classList.add('pages');

        const bookPages = document.createElement('div');
        bookPages.textContent = "Pages : ";
        const bookPagesDisplay = document.createElement('div');
        bookPagesDisplay.textContent = e.pages;

        bookPagesContainer.appendChild(bookPages);
        bookPagesContainer.appendChild(bookPagesDisplay);

        // Create Book Read & Add It To The Container;
        const bookReadContainer = document.createElement('div');
        bookReadContainer.classList.add('read');

        const bookRead = document.createElement('div');
        bookRead.textContent = "Have Read : ";
        const bookReadDisplay = document.createElement('div');
        bookReadDisplay.textContent = e.read ? "True" : "False";

        bookReadContainer.appendChild(bookRead);
        bookReadContainer.appendChild(bookReadDisplay);

        // Create Book Control Container & Add It To The Container
        const bookControl = document.createElement('div');
        bookControl.classList.add('bookControl');

        // Create Book Remove Button & Add It To The Container
        const bookRemove = document.createElement('button');
        bookRemove.setAttribute('id', "remove")
        bookRemove.textContent = "Remove";

        bookRemove.addEventListener('click', () =>{
            if(i > -1){
                myLibrary.splice(i, 1);
            }
            book.parentElement.removeChild(book);
            refreshLibrary();
        });

        // Create Book Read/UnRead Button & Add It To The Container
        const bookReadUnRead = document.createElement('button');
        bookReadUnRead.setAttribute('id', "read")
        bookReadUnRead.textContent = !e.read ? "Read" : "Unread";

        bookReadUnRead.addEventListener('click', () =>{
            if(bookReadUnRead.textContent == "Read"){
                bookReadUnRead.textContent = "Unread";
                bookReadDisplay.textContent = "True";
            }else{
                bookReadUnRead.textContent = "Read";
                bookReadDisplay.textContent = "False";
            }
        });

        bookControl.appendChild(bookRemove);
        bookControl.appendChild(bookReadUnRead);

        book.appendChild(bookTitle);
        book.appendChild(bookAuthorContainer);
        book.appendChild(bookPagesContainer);
        book.appendChild(bookReadContainer);
        book.appendChild(bookControl);
        bookContainer.appendChild(book);
    });
};

const book1 = new Book("Book-Title-1", "Book-Author-1", 111, false);
const book2 = new Book("Book-Title-2", "Book-Author-2", 222, true);
const book3 = new Book("Book-Title-3", "Book-Author-3", 333, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
refreshLibrary();