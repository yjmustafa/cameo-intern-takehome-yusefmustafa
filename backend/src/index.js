import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import talentData from './TALENT_DATA.json';

const PORT = 9090;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
* Implement a new endpoint HTTP GET /search that accepts a query, and returns a filtered list of talent based on that query.
* A user should be able to search by username, name, or category.
* Note: A list of Cameo talent is provided in TALENT_DATA.json
*/
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const dropdown = req.query.dropdown;

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
  res.send(filteredData);
});

app.listen(PORT);

console.log(`listening on: ${PORT}`);
