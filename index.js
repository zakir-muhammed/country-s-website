document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const countriesList = document.getElementById('countriesList');

    async function fetchCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    function displayCountries(countries) {
        countriesList.innerHTML = '';
        countries.forEach(country => {
            const article = document.createElement('article');
            const countryName = country.name.common;
            const countryFlag = country.flags.png;
            article.innerHTML = `
                <img src="${countryFlag}" alt="Flag of ${countryName}">
                <h2>${countryName}</h2>
            `;
            countriesList.appendChild(article);
        });
    }

    function searchCountries() {
        const searchTerm = searchInput.value.toLowerCase();
        const articles = countriesList.querySelectorAll('article');
        articles.forEach(article => {
            const countryName = article.querySelector('h2').textContent.toLowerCase();
            if (countryName.includes(searchTerm)) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    }
    searchInput.addEventListener('keyup', searchCountries);

    fetchCountries();
});
