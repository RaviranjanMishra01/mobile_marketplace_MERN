import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        let response = await fetch("http://localhost:8000");
        let result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [])
  console.log(data);
  return (
    <>
      <h1>Hello, How are you ravi. {JSON.stringify(data)} </h1>
    </>
  )
}

export default App
