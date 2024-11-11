import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Dashboard from './components/da'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react';
import Department from './components/Departments';

// Define interfaces for our data structures
//@ts-ignore
interface EnergyDataItem {
  name: string;
  consumption: number;
  range: string;
}

//@ts-ignore
interface WeeklyDataItem {
  day: string;
  value: number;
}

interface ApiPayload {
  current1?: number;
  current2?: number;
  [key: string]: number | undefined;
}

interface ApiItem {
  evaluated_key: {
    timestamp: string;
  };
  payload: ApiPayload;
}

//@ts-ignore
interface ApiResponse {
  body: string | {
    items: ApiItem[];
  };
}

interface ProcessedReading extends ApiPayload {
  timestamp: number | undefined;
}

function App() {
  const [data, setData] = useState<ProcessedReading[]>([])
  const [energyData, setEnergyData] = useState<any>([]);
  const [totalConsumption, setTotalConsumption] = useState<any>();
  const [energy1Consumption, setTotalConsumption1] = useState<any>();
  const [energy2Consumption, setTotalConsumption2] = useState<any>();
  const fetchData = async () => {
    try {
      // Fetch the response from the API
      const response = await fetch(`https://bmk5jggu7c.execute-api.us-east-1.amazonaws.com/prod/energy_readings?queryType=all`)
      const json = await response.json();
      const parsedBody = typeof json.body === 'string' ? JSON.parse(json.body) : json.body;
      
      // Define variables to sum the values
      let totalCurrent1 = 0;
      let totalPower1 = 0;
      let totalCurrent2 = 0;
      let totalPower2 = 0;
      // let totalEnergyKWh = 0;
      const totalReadings = parsedBody.items.length;
      
      // Initialize variables for calculating total energy consumption in kWh
      let previousTimestamp = 0;  // To calculate time difference
      let cumulativeEnergyKWh = 0;  // To sum the energy consumption in kWh
      let energyConsumedPower1 = 0;
      let energyConsumedPower2 = 0;
  
      // @ts-ignore
      parsedBody.items.forEach(item => {
        // Accumulate currents and powers for averages
        totalCurrent1 += item.payload.current1;
        totalPower1 += item.payload.power1;
        totalCurrent2 += item.payload.current2;
        totalPower2 += item.payload.power2;
  
        // Calculate energy consumed for this reading (assuming `timestamp` is in seconds)
        const timestamp = parseInt(item.payload.timestamp);  // Convert timestamp to integer
  
        // If this is not the first reading, calculate time difference
        if (previousTimestamp !== 0) {
          const timeDifferenceInHours = (timestamp - previousTimestamp) / 3600;  // Time difference in hours
  
          // Calculate energy in kWh for power1 and power2
          energyConsumedPower1 = (item.payload.power1 * timeDifferenceInHours) / 1000;  // Power1 in kWh
          energyConsumedPower2 = (item.payload.power2 * timeDifferenceInHours) / 1000;  // Power2 in kWh
  
          cumulativeEnergyKWh += energyConsumedPower1 + energyConsumedPower2;  // Add both to total energy consumption
        }
  
        // Update the previous timestamp for next iteration
        previousTimestamp = timestamp;
      });
  
      // Calculate averages for power
      // const avgCurrent1 = totalCurrent1 / totalReadings;
      const avgPower1 = totalPower1 / totalReadings;
      const avgPower2 = totalPower2 / totalReadings;
  
      // Map to the readings (assuming each item contains these fields)
      // @ts-ignore
      const readings = parsedBody.items.map(item => ({
        timestamp: new Date(parseInt(item.payload.timestamp) * 1000).toLocaleString(), // Convert timestamp to readable date
        ...item.payload
      }));
  
      console.log("Processed readings:", readings);
      setData(readings);
  
      // Log the total energy consumption in kWh
      console.log("Total energy consumption (kWh):", cumulativeEnergyKWh.toFixed(3));
      setTotalConsumption(cumulativeEnergyKWh.toFixed(3));
      setTotalConsumption1(energyConsumedPower1.toFixed(2));
      setTotalConsumption2(energyConsumedPower2.toFixed(2));
  
      // Energy Data: Adding calculated averages to Steam Plant
      const energyDatas = [
        {
          name: "Boiling Plant",
          consumption: avgPower1,  // Assuming static data for Boiling Plant, you can calculate if needed
          range: "52-71",
        },
        {
          name: "Steam Plant",
          consumption: avgPower2,  // Assuming static data for Steam Plant, you can calculate if needed
        }
      ];
  
      // Optionally, you can also log or use the total energy consumption for reporting
      console.log("Energy Consumption Data:", energyDatas);
      setEnergyData(energyDatas)
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  
  
  // UseEffect to call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Dashboard data={data} energyData={energyData} />}/>
      <Route path='/department' element={<Department 
      totalConsumption={totalConsumption}
      energy1Consumption={energy1Consumption}
      energy2Consumption={energy2Consumption}
      />} />
    </Routes>
  )
}


export default App
