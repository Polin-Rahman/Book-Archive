const searchText = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');
const viewDetails = document.getElementById('view-details');

/* const url = `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`;
    fetch(url)
        .then(res => res.json())
        .then(data => showResults(data)); */

// search book 
searchBtn.addEventListener('click', function () {
    const search = searchText.value;
    // fetch data
    const url = `http://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showResults(data));
});

function showResults(dataArray) {
    /* resultDiv.innerText = `Search found: ${dataArray.numFound}`;
    console.log(dataArray); */

    const allData = dataArray.docs;
    /* const dataLength = allData.length;
    console.log(dataLength); */

    allData.slice(0, 10).forEach(item => {

        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
                    <div class="rounded overflow-hidden border p-2">
                        <img src="p.png" class="w-100" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Book title: ${item.title}</h5>
                        <p class="card-text">Author: ${item.author_alternative_name}</p>
                        <p class="card-text">Author: ${item.publisher_facet}</p>
                        <p class="card-text">First published: ${item.first_publish_year}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
        `;

        viewDetails.appendChild(div);

    });

    /* console.log(item.author_alternative_name);
    console.log(item.title);
    console.log(item.first_publish_year);
    console.log(item.publisher_facet); */
}

//