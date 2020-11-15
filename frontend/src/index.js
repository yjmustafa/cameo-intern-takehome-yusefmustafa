import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import config from '../config';
import logo from './static/logo.svg';
import './style.css';
import { Button, Dropdown, Table, Image, Icon } from 'semantic-ui-react';

// Define dropdown options
const dropdownOptions = [
  {
    key: "Username",
    text: "Username",
    value: "username",
  },
  {
    key: "Name",
    text: "Name",
    value: "name",
  },
  {
    key: "Category",
    text: "Category",
    value: "category",
  },
]

/*
This is a stubbed React functional component using React Effects and Hooks
https://reactjs.org/docs/hooks-effect.html
Feel free to use React class components and lifecycle hooks if that is more comfortable for you
*/

function App() {

  // Define state
  const [data, setData] = useState([]);
  const [keyword, setKeyWord] = useState();
  const [dropdown, setDropdown] = useState();
  const [directMessageFilterEnabled, setDirectMessageFilterEnabled] = useState(false);
  const [businessRequestFilterEnabled, setBusinessRequestFilterEnabled] = useState(false);

  // This function handles the search request when user hits "Submit"
  async function submitClicked(e) {
    e.preventDefault();
    if (dropdown == null) {
      alert('Choose a search category.');
      return;
    }
    const apiResponse = await axios.get(config.API_URL + '/search', {
      params: {
        keyword: keyword,
        dropdown: dropdown
      }
    });
    setData(apiResponse.data);
  }

  // The functions below send requests to the server to sort the data
  async function sortByPriceClicked(e) {
    e.preventDefault();
    const apiResponse = await axios.get(config.API_URL + '/search', {
      params: {
        keyword: keyword,
        dropdown: dropdown,
        sortBy: "price"
      }
    });
    setData(apiResponse.data);
  }

  async function sortByScoreClicked(e) {
    e.preventDefault();
    const apiResponse = await axios.get(config.API_URL + '/search', {
      params: {
        keyword: keyword,
        dropdown: dropdown,
        sortBy: "score"
      }
    });
    setData(apiResponse.data);
  }

  async function sortByActivityClicked(e) {
    e.preventDefault();
    const apiResponse = await axios.get(config.API_URL + '/search', {
      params: {
        keyword: keyword,
        dropdown: dropdown,
        sortBy: "activity"
      }
    });
    setData(apiResponse.data);
  }

  // This function filters the data according to the specifications set by the user
  function dataFilter(item) {
    if (directMessageFilterEnabled && !item.isAvailableForDirectMessage) {
      return false;
    } else if (businessRequestFilterEnabled && !item.isAvailableForBusinessRequests) {
      return false;
    }
    return true;
  }

  const searchBoxStyle = { width: "20rem", background: "#F2F1F9", borderRadius: "5px", border: "none", padding: "1rem", marginLeft: "1.5rem", marginRight: "1.5rem", marginTop: "3rem" };
  const checkboxStyle = { margin: ".5rem" };
  return (
    <div id="app">
      <img src={logo} alt="logo" />
      <form>
        <Dropdown
          placeholder='Search by'
          selection
          options={dropdownOptions}
          onChange={(e, data) => setDropdown(data.value)}
        />
        <input style={searchBoxStyle}
          type="text"
          placeholder="Search for Cameo talent"
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <Button onClick={submitClicked}>
          Submit
        </Button>
        <div>
          <input type="checkbox" style={checkboxStyle} onChange={(e) => setDirectMessageFilterEnabled(e.target.checked)} />
          <label>Can direct message</label>
          <input type="checkbox" style={checkboxStyle} onChange={(e) => setBusinessRequestFilterEnabled(e.target.checked)} />
          <label>Can send business request</label>
        </div>
      </form>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Avatar</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Bio</Table.HeaderCell>
            <Table.HeaderCell onClick={sortByActivityClicked}>Last Active<Icon size="small" name="angle down" /></Table.HeaderCell>
            <Table.HeaderCell onClick={sortByScoreClicked}>Score<Icon size="small" name="angle down" /></Table.HeaderCell>
            <Table.HeaderCell>Direct Message</Table.HeaderCell>
            <Table.HeaderCell>Business Requests</Table.HeaderCell>
            <Table.HeaderCell onClick={sortByPriceClicked}>Price<Icon size="small" name="angle down" /></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.filter(dataFilter).map(item => <Table.Row key={item._id}>
            <Table.Cell>
              <Image src={item.avatarUrl} />
            </Table.Cell>
            <Table.Cell>
              {item.name}
            </Table.Cell>
            <Table.Cell>
              {item.category}
            </Table.Cell>
            <Table.Cell>
              {item._id}
            </Table.Cell>
            <Table.Cell>
              {item.username}
            </Table.Cell>
            <Table.Cell>
              {item.bio}
            </Table.Cell>
            <Table.Cell>
              {item.lastActiveAt}
            </Table.Cell>
            <Table.Cell>
              {item.score}
            </Table.Cell>
            <Table.Cell>
              <Icon size="big" name={item.isAvailableForDirectMessage ? "check" : "close"} />
            </Table.Cell>
            <Table.Cell>
              <Icon size="big" name={item.isAvailableForBusinessRequests ? "check" : "close"} />
            </Table.Cell>
            <Table.Cell>
              {item.price}
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    </div>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(<App />, document.getElementById('main'));
