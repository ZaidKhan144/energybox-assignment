import './App.css';
import { useEffect, useState } from 'react'
import Dropdown from './Dropdown';

const App = () => {

  const [ trains, setTrains ] = useState([])

  // Dropdowns
  const [ddOptions, setDdOptions] = useState({
    LineCode: [],
    DestinationStationCode: [],
    TrainNumber: [],
    DirectionNum: []
  });

  // Filter Titles for Dropdown
  const filterTitles = {
    LineCode: "Train Line Color",
    DestinationStationCode: "Destination Station",
    TrainNumber: "Train Number",
    DirectionNum: "Up / Down"
  };

  const [filters, setFilters] = useState({
    LineCode: "all",
    DestinationStationCode: "all",
    TrainNumber: "all",
    DirectionNum: "all"
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
    // Set Dropdown options
    setDdOptions((prev) => ({
      ...prev,
      LineCode: [ ...new Set(trains.map(({ LineCode }) => LineCode || "empty")
      )
    ].concat(["all"]),
    DestinationStationCode: [
      ...new Set(
        trains.map(({ DestinationStationCode }) => DestinationStationCode || "empty")
      )
    ].concat(["all"]),
    TrainNumber: [
      ...new Set(trains.map(({ TrainNumber }) => TrainNumber || "empty"))
    ].concat(["all"])
    }))
  }, [trains])

  return (
    <div className="App">
      <div className="section">
        <div className="trains">
          <h1>Trains</h1>
          <div className="dropdowns">
          {
            // Displaying of dropdowns
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
          {
            trains?.filter((train) => Object.entries(filters).reduce(
              (fin, [k, v]) => 
                fin && 
                (!v || 
                  train[k] === v || 
                  (v === "empty" && !train[k]) || 
                  v === "all"),
                  true
              )
            )
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
            {/* {
              trains.map((item, index) => {
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
            } */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
