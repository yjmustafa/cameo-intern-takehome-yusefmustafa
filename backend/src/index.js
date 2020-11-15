import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import talentData from './TALENT_DATA.json';

const PORT = 9090;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// These variables keep track of which direction to sort in
var priceAscending = true;
var scoreAscending = true;
var activityAscending = true;

// Sorting functions
function sortByPrice(filteredData) {
  var sortedData;
  if (priceAscending) {
    sortedData = filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else {
    sortedData = filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }
  priceAscending = !priceAscending;
  return sortedData
}

function sortByScore(filteredData) {
  var sortedData;
  if (scoreAscending) {
    sortedData = filteredData.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
  } else {
    sortedData = filteredData.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  }
  scoreAscending = !scoreAscending;
  return sortedData;
}

function sortByActivity(filteredData) {
  var sortedData;
  if (activityAscending) {
    sortedData = filteredData.sort((a, b) => new Date(a.lastActiveAt) - new Date(b.lastActiveAt));
  } else {
    sortedData = filteredData.sort((a, b) => new Date(b.lastActiveAt) - new Date(a.lastActiveAt));
  }
  activityAscending = !activityAscending;
  return sortedData
}

/**
* Implement a new endpoint HTTP GET /search that accepts a query, and returns a filtered list of talent based on that query.
* A user should be able to search by username, name, or category.
* Note: A list of Cameo talent is provided in TALENT_DATA.json
*/
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const dropdown = req.query.dropdown;
  const sortBy = req.query.sortBy;

  var filteredData;
  if (dropdown === "username") {
    filteredData = talentData.filter(function (item) {
      return item.username.toLowerCase().includes(keyword.toLowerCase());
    })
  } else if (dropdown === "name") {
    filteredData = talentData.filter(function (item) {
      return item.name.toLowerCase().includes(keyword.toLowerCase());
    })
  } else if (dropdown === "category") {
    filteredData = talentData.filter(function (item) {
      return item.category.toLowerCase().includes(keyword.toLowerCase());
    })
  }

  if (sortBy === "price") {
    filteredData = sortByPrice(filteredData);
  } else if (sortBy === "score") {
    filteredData = sortByScore(filteredData);
  } else if (sortBy === "activity") {
    filteredData = sortByActivity(filteredData);
  }

  res.send(filteredData);
});

app.listen(PORT);

console.log(`listening on: ${PORT}`);
