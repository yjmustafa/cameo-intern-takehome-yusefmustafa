## Name
Yusef Mustafa

## Date
11/15/2020
## Any steps to run your application in addition to the scripts provided
`npm install semantic-ui-react`
## If you had a full day to work on this, what would you change/add to your solution?
* I would create another dropdown and populate it with the different categories (e.g. musician, actor) to filter the results further.
* I would also add pagination to the backend so that client can decide how many results to return and the backend will decide the amount of pages. I have a working pagination demo that returns 5 max results, but it introduced more bugs in the sorting logic so I chose not to commit it. I may add it in a future commit.
* Make a more interactive UI for sorting. I would animate the column header on hover and alternate the arrow direction on click.
* I would also populate the entire table before the user begins to search. I probably would only do this with pagination since there will be a lot of data to render without filtering.
## List bonus feature implemented (if applicable)
* Filter by a range of price values.
* Update /search to sort results server-side.
* The table can be sorted in both ascending and descending order. Clicking the column header will alternate the direction.
