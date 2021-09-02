const searchBook = () => {
  const searchField = document.getElementById("search-field").value;
  
  if (searchField == "") {
    alert("No result Found");
  } 
  else {
    toggleSpinner(true);
    const url = `https://openlibrary.org/search.json?q=${searchField}`;
    document.getElementById("search-field").value = '';

    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.docs))
      .catch((err) => {
        alert("We can't reach to your Books.Please try again", err);
        /* document.getElementById("error").innerText = "We can't reach to your book.Please try again";
        bookList.innerHTML = ''; */
      });
  }
};

const displaySearchResult = (docs) => {
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = '';
  docs.forEach((doc) => {
   let src = ``;
    if(doc.cover_i){
      src = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
    }
    else{
      src = `https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg`
    }
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
       
        <div class="card h-100">

        <img width="100%" height="300px" src=${src} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${doc.title}</h5>
          <p class="card-text">Author:${doc.author_name}</p>
          <p class="card-text">First Published:${doc.publish_date}</p>
          
        </div>
      </div>
        `;

    searchResult.appendChild(div);
    
    const divCount = document.getElementsByClassName("col").length;
    document.getElementById('total-books').innerText = divCount;
   
    toggleSpinner(false);
  });
};

const toggleSpinner = (show) => {
  const spinner = document.getElementById("spinnerId");
  if (show) {
      spinner.classList.remove("d-none");
  } else {
      spinner.classList.add("d-none");
  }
}

