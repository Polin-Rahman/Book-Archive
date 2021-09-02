const searchText = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');
const viewDetails = document.getElementById('view-details');
const spinner = document.getElementById('spinner');
const errorDiv = document.getElementById('error');

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
    const url = `https://openlibrary.org/search.json?q=${search}`;

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

    // show search found result
    const allData = dataArray.docs;
    const dataLength = allData.length;
    resultDiv.innerText = `Search found: ${dataLength}`;

    //show search result on UI
    allData.slice(0, 10).forEach(item => {

        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
                    <div class="rounded overflow-hidden border p-2">
                        <img src=" https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="w-100" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><i>Book title:</i> ${item.title}</h5>
                        <hr>
                        <p class="card-text"><b>Author:</b> ${item.author_name}</p>
                        <p class="card-text"><b>Publisher:</b> ${item.publisher_facet[0]}</p>
                        <p class="card-text"><b>First published:</b> ${item.first_publish_year}</p>
                    </div>
        `;
        viewDetails.appendChild(div);
    });
}

const clearFields = () => {
    viewDetails.innerHTML = '';
    errorDiv.innerText = '';
    resultDiv.innerText = '';
}



