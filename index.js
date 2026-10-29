const booklist = document.getElementById("booklist");
const search = document.getElementById("search");
const select = document.getElementById("select");
const form = document.getElementById("form");
const title = document.getElementById("titleinput");
const author = document.getElementById("authinput");
const year = document.getElementById("yearinput");
const genre = document.getElementById("genreinput");
const description = document.getElementById("descriptioninput");
const statusselect = document.getElementById("status");
let index = null;
const book = JSON.parse(localStorage.getItem("books")) || [];
search.addEventListener("input", () => {
  const result = book.filter(
    (element) =>
      element.title.toLowerCase().includes(search.value.toLowerCase()) ||
      element.author.toLowerCase().includes(search.value.toLowerCase()),);
  addbook(result)});
function addbook(bookstodisplay) {
  booklist.innerHTML = "";
  for (let i = 0; i < bookstodisplay.length; i++) {
    const currentBook = bookstodisplay[i];
    const bookIndex = book.indexOf(currentBook);
    const li = document.createElement("li");
    booklist.appendChild(li);
    li.classList.add(
      "border","border-gray-200","bg-white","rounded-2xl","mt-6","pt-4","h-96","flex","flex-col","items-center","gap-4",);
    li.style.width = "33%";
    li.innerHTML = `
      <h3 class="text-2xl font-bold">${currentBook.title}</h3>
      <p>${currentBook.author}</p>
      <p>&#x1F5D3; ${currentBook.year}</p>
      <p>${currentBook.genre}</p>
      <p>${currentBook.description}</p>
      <p>${currentBook.status}</p>
      <div>
        <button class="editbutton cursor-pointer">✏️ Edit</button>
        <button class="deletebutton cursor-pointer border rounded bg-amber-100">🗑 Delete</button>
      </div>`;
    const deletebutton = li.querySelector(".deletebutton");
    deletebutton.addEventListener("click", () => {
      book.splice(bookIndex, 1);
      localStorage.setItem("books", JSON.stringify(book));
      addbook(book)});
    const editbutton = li.querySelector(".editbutton");
    editbutton.addEventListener("click", () => {
      index = bookIndex;
      title.value = currentBook.title;
      author.value = currentBook.author;
      year.value = currentBook.year;
      genre.value = currentBook.genre;
      description.value = currentBook.description;
      statusselect.value = currentBook.status;
    })}}
addbook(book);
select.addEventListener("change", () => {
  if (select.value === "az") {
    book.sort((a, b) => a.title.localeCompare(b.title));
  } else if (select.value === "auth") {
    book.sort((a, b) => a.author.localeCompare(b.author));
  } else if (select.value === "year") {
    book.sort((a, b) => b.year - a.year);}
  addbook(book);});
  
form.addEventListener("submit", (event) => {
  
  event.preventDefault();
  const updated = {
    title: title.value,
    author: author.value,
    year: Number(year.value),
    genre: genre.value,
    description: description.value,
    status: statusselect.value,};
  if (index === null) {
    book.push(updated);
  } else {
    book[index] = updated;
    index = null;}
  localStorage.setItem("books", JSON.stringify(book));
  addbook(book);
  form.reset();});