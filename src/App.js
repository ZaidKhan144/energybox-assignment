import './App.css';
import { useEffect, useState } from 'react'

const App = () => {

  const [ trains, setTrains ] = useState([])

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

  return (
    <div className="App">
      <div className="section">
        <div className="trains">
          <h1>Trains</h1>
          <div className="card-container">
            {
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
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
