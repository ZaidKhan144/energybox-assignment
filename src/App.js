import './App.css';
import { useEffect, useState } from 'react'
import Dropdown from './Dropdown';

const App = () => {

  const [ trains, setTrains ] = useState([])

  // Initializing Dropdowns array for options
  const [ddOptions, setDdOptions] = useState({
    LineCode: [],
    DestinationStationCode: [],
    TrainNumber: [],
    DirectionNum: [],
    ServiceType: [],
  });

  // Filter Titles for Dropdown
  const filterTitles = {
    LineCode: "Train Line Color",
    DestinationStationCode: "Destination Station",
    TrainNumber: "Train Number",
    DirectionNum: "Up / Down",
    ServiceType: "Service Type"
  };

  // Initializing filters
  const [filters, setFilters] = useState({
    LineCode: "all",
    DestinationStationCode: "all",
    TrainNumber: "all",
    DirectionNum: "all",
    ServiceType: "all"
  });

  const fetchTrains = () => {

    let api = 'https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key=29fb1946737f4e1a8d20d620cdcb02d8'

    fetch(api)
    .then(response => response.json())
    .then(data => setTrains(data.TrainPositions))
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    })
  }

  useEffect(() => {
    fetchTrains()
  }, [])

  useEffect(() => {
    /* 
      getArrayOfOptions is dynamically getting the 
      dropdown options from the api
    */
    const getArrayOfOptions = (colName) => 
      [
        ...new Set(
          trains.filter((train) => applyFilters(train))
          .map((obj) => obj[colName] || "empty")
        )
      ].concat(["all"]);
    
    // Set Dropdown options
    setDdOptions((prev) => ({
      ...prev,
      LineCode: getArrayOfOptions("LineCode"),
      DestinationStationCode: getArrayOfOptions("DestinationStationCode"),
      TrainNumber: getArrayOfOptions("TrainNumber"),
      DirectionNum: getArrayOfOptions("DirectionNum"),
      ServiceType: getArrayOfOptions("ServiceType")
    }))
  }, [trains, filters])

  /* applyFilters checks for multiple filters:
     - Check whether the value is false
     - Check whether the value matches or not
     - Check whether the value matches the numeric or not
     - Check whether the value matches the null/empty/all
  */
  const applyFilters = ((train) => {
    return (
      Object.entries(filters).reduce(
        (fin, [k, v]) => 
          fin && 
          (!v || 
            train[k] === v || 
            train[k] === +v ||
            (v === "empty" && !train[k]) || 
            v === "all"),
            true
      )
    )
  })

  return (
    <div className="App">
      <div className="section">
        <div className="trains">
          <h1>Train Positions</h1>
          <div className="dropdowns">
          {
            // Render the dropdowns
            Object.entries(ddOptions).map(([k, v]) => (
              <Dropdown 
                key={k}
                title={filterTitles[k]}
                optionVal={filterTitles[k]}
                handleChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    [k]: e.target.value
                  }))
                }}
                optionsList={v}
              />
            ))
          }
          </div>
          <div className="card-container">
          { // Render but based on the filter
            trains?.filter((train) => applyFilters(train))
            ?.map((item, index) => {
              return (
                  <div className="card" key={index}>
                    <p> <span>Train Id:</span> {item.TrainId}</p>
                    <p> <span>Train Number:</span> {item.TrainNumber}</p>
                    <p> <span>Car Count:</span> {item.CarCount}</p>
                    <p> <span>Direction Num:</span> {item.DirectionNum}</p>
                    <p> <span>Circuit Id:</span> {item.CircuitId}</p>
                    <p> <span>Destination Station Code:</span> {item.DestinationStationCode}</p>
                    <p> <span>Line Code:</span> {item.LineCode}</p>
                    <p> <span>Seconds At Location:</span> {item.SecondsAtLocation}</p>
                    <p> <span>Service Type:</span> {item.ServiceType}</p>
                  </div>
                )
            })
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
