const searchText = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');
const viewDetails = document.getElementById('view-details');
const spinner = document.getElementById('spinner');
const errorDiv = document.getElementById('error');

/* const url = `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`;
    fetch(url)
        .then(res => res.json())
        .then(data => showResults(data)); */

// search book 
searchBtn.addEventListener('click', function () {
    const search = searchText.value;

    //clear   
    clearFields();

    //empty search field handel
    if (search === '') {
        errorDiv.innerText = 'Search field can not be empty!';
        return;
    }
    // fetch data
    const url = `http://openlibrary.org/search.json?q=${search}`;

    //showing spinner
    spinner.classList.remove('d-none');

    fetch(url)
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                spinner.classList.add('d-none');
                showResults(data);
            }, 50);
        })
        .finally(() => {
            searchText.value = '';
        });

});

function showResults(dataArray) {
    // error handel
    if (dataArray.numFound === 0) {
        errorDiv.innerText = 'No result found!'
    }
    /* resultDiv.innerText = `Search found: ${dataArray.numFound}`;
    console.log(dataArray); */

    const allData = dataArray.docs;
    const dataLength = allData.length;
    resultDiv.innerText = `Search found: ${dataLength}`;

    allData.slice(0, 10).forEach(item => {
        console.log(item.text[2], item.text[3]);
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
                    <div class="rounded overflow-hidden border p-2">
                        <img src=" https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="w-100" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><i>Book title:</i> ${item.title}</h5>
                        <hr>
                        <small>${item.text[2]}</small>
                        <small>${item.text[3]}</small>
                        <hr>
                        <p class="card-text"><b>Author:</b> ${item.author_name[0]}</p>
                        <p class="card-text"><b>Publisher:</b> ${item.publisher_facet[0]}</p>
                        <p class="card-text"><b>First published:</b> ${item.first_publish_year}</p>
                    </div>
        `;
        viewDetails.appendChild(div);
    });
}

function clearFields() {
    viewDetails.innerHTML = '';
    errorDiv.innerText = '';
    resultDiv.innerText = '';
}
