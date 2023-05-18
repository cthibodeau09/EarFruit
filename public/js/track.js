// Add this code to track.js
const searchForm = document.getElementById('searchForm');
const searchResultsDiv = document.getElementById('searchResults');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(searchForm);
  const query = formData.get('query');

  fetch(`/api/track/search?query=${query}`)
    .then((response) => response.json())
    .then((searchResults) => {
      // Update the UI with the search results
      searchResultsDiv.innerHTML = JSON.stringify(searchResults);
    })
    .catch((error) => {
      console.error('Error searching tracks:', error);
      searchResultsDiv.innerHTML = 'An error occurred during track search.';
    });
});
