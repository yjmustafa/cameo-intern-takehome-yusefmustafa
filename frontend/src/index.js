import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import config from '../config';
import logo from './static/logo.svg';
import './style.css';
import { Button, Dropdown } from 'semantic-ui-react';

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

  const searchBoxStyle = { width: "20rem", background: "#F2F1F9", borderRadius: "5px", border: "none", padding: "1rem", marginLeft: "1.5rem", marginRight: "1.5rem", marginTop: "3rem" };
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
        <Button>
          Submit
        </Button>
      </form>
    </div >
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(<App />, document.getElementById('main'));
