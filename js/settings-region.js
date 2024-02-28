document.addEventListener('DOMContentLoaded', function () {
    const countryList = document.getElementById('country-list');
    const selectedCountryOption = document.getElementById('selected-country-option');
    const submitButton = document.getElementById('submitBtn');

    let countriesData = []; 
    let selectedCountry = null; 

    fetch('https://api.themoviedb.org/3/configuration/countries?api_key=7b6257336749c0c0743795e2e778f44c')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            countriesData = data; 
            displayCountries(countriesData);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    submitButton.addEventListener('click', function () {
        const selectedRadio = document.querySelector('input[name="country"]:checked');

        if (selectedRadio) {

            const selectedCountryName = selectedRadio.value;

            selectedCountryOption.innerHTML = `<p>${selectedCountryName}</p>`;

            selectedRadio.checked = true;

        } else {
            selectedCountryOption.innerHTML = '<p>No country selected</p>';
        }
    });

    function displayCountries(countries) {
        countryList.innerHTML = '';

        countries.forEach(country => {
            const countryOption = document.createElement('div');
            countryOption.classList.add('country-option');

            const countryName = document.createElement('p');
            countryName.textContent = country.english_name;
            countryOption.appendChild(countryName);

            const radioButton = document.createElement('input');
            radioButton.classList.add("country", "radio-button");
            radioButton.type = 'radio';
            radioButton.name = 'country';
            radioButton.value = country.english_name; 
            countryOption.appendChild(radioButton);

            countryList.appendChild(countryOption);
        });
    }
});
