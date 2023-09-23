import { useState } from 'react'
import './App.css'


const API_KEY = import.meta.env.VITE_API_KEY
console.log(API_KEY)

function App() {
  const [bandar, setBandar] = useState('')
  const [laporanCuaca,setLaporanCuaca] =useState({})

  const handleBandar = (event) =>{
    //console.log(event.target.value);
    setBandar(event.target.value);
  }

  const fetchWeatherReq = async ()=>{
    //const response = await fetch("https://api.weatherapi.com/v1/current.json?q=kepala%20batas%2Cpulau%20pinang%20&key=7b88e589947f462c823130512232408%20");
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${bandar}&key=${API_KEY}&days=7&aqi=no&alerts=no`);
    const data = await response.json()
    setLaporanCuaca(data)
    //debugger
    //console.log(response);
  }



  return (
    <>
    <div className='body'>

      {/* <input 
      type='text'
      placeholder='Nama tempat'
      value={bandar}
      onChange={handleBandar}
      /> */}
      <div className='field'>        
        <input
          id={1}
          type="text"
          value={bandar}
          placeholder='Nama tempat'
          onChange={handleBandar}
        />
       
      </div>
      <br/>

     <div className='button' 
     style={{border:'solid black 2px',marginTop:'10px',}} 
     onClick={fetchWeatherReq}>
      Submit
     </div>

     <br/>

    <div style={{marginTop:'10px'}}>
      Ini adalah Laporan Cuaca untuk bandar <b>{bandar}</b>
    </div>
    <div>
        <h1>Laporan cuaca sekarang</h1>
        suhu = {laporanCuaca.current?.temp_c} C <br/>
      </div>
      <div>
        <h1>Laporan cuaca untuk 7 hari akan datang di {laporanCuaca.location?.name}</h1>
        {laporanCuaca.forecast?.forecastday?.map((forecast) => (
          <div style={{margin: '5px'}} key={forecast.date_epoch}>
            Pada tarikh {forecast.date}, cuaca adalah 
            <span style={{marginLeft: '2px'}}>{forecast.day.condition.text}</span>
            <img src={forecast.day.condition.icon} alt={forecast.day.condition.text} />
          </div>
        ))}
      </div>



    </div>

    </>
  )
}

export default App
