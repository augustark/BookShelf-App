let myLibrary = [
  {
    title: "Spiderman",
    author: "Stan Lee",
    pages: 234,
    isRead: true
  },
  {
    title: "The House of El",
    author: "Jor El",
    pages: 234,
    isRead: false
  },
  {
    title: "People Hate What They Don't Understand",
    author: "Martha Kent",
    pages: 234,
    isRead: true
  }
]

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary() {
  // do stuff here
}

function removeItems() {
    let parent = document.querySelector("#container")
    while (parent.childNodes.length > 2) {
        parent.removeChild(parent.lastChild);
    }
}

function display() {
    removeItems()
    for (let book of myLibrary) {
        createCover(book)
    }
}

function testdisplay() {
    for (let book of myLibrary) {
        createCover(book)
    }
}

testdisplay()

function remove(id) {
  return myLibrary = myLibrary.filter(book => book.title !== id)
}

function toggleRead(id) {
  return myLibrary = myLibrary.map(book => {
      return book.title === id ? {...book, isRead: !book.isRead} : book
  })
}

function createCover(book) {
    const title = document.createElement("p")
    const author = document.createElement("p")
    const info = document.createElement("p")
    const done = document.createElement("p")
    const cover = document.createElement("div")
    const removeBtn = document.createElement("button")
    const id = title.textContent
    
    
    cover.classList.add("cover")
    title.classList.add("title")
    author.classList.add("author")
    info.classList.add("info")
    book.isRead && done.classList.add("done")
    removeBtn.classList.add("remove")
    removeBtn.id = "remove"
    
    info.append(`${book.pages} pages`)
    title.append(smallFont(book.title, title))
    author.append(book.author)
    removeBtn.append(`Remove`)
    cover.append(title, author, info, done, removeBtn)
    document.querySelector("#container").appendChild(cover)

    cover.onmouseenter = () => removeBtn.classList.add("active"); 
    cover.onmouseleave = () => removeBtn.classList.remove("active"); 
    removeBtn.addEventListener("click", function() {
        remove(id)
        display()
    })
    cover.addEventListener("click", function() {
        toggleRead(id)
        display()
    })
}

function collect(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead)
    myLibrary.unshift(book)
}

function resetForm(title, author, pages, isRead) {
    title.value = ""
    author.value = ""
    pages.value = ""
    isRead.checked = false
}

const add = document.querySelector("#add")
add.addEventListener("click", function() {
    form.style.display = "flex"
})

document.forms[0]["submit"].addEventListener("click", function(e) {
    e.preventDefault()
    let [title, author, pages, isRead] = document.forms[0]
    if (title.value && author.value && pages) {    
        const book = new Book(title.value, author.value, pages.value, isRead.checked)
        myLibrary.unshift(book)
        display()
        resetForm(title, author, pages, isRead)
    }
})

document.forms[0]["cancel"].addEventListener("click", function(e) {
    e.preventDefault()
    form.style.display = "none"
})

// Little addition
function smallFont(str, input) {
    str.length > 12 && input.classList.add("small")
    return str
}