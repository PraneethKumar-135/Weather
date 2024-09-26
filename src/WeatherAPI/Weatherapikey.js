
import React, { useState } from 'react'
import cold from '../Cold.jpg'
import Heat from '../Heat.jpg'
import cloudy from '../Cloudy.jpg'
import '../index.css'
import axios from 'axios'


const Weatherapikey = () => {
  const [data, setData] = useState("")
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // For handling loading state


  const conformedData = (actualData) => {
    setData(actualData)
  }

  const handleData = () => {
    console.log(data);
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://api.tomorrow.io/v4/weather/realtime', 
      params: { location: `${data}`, apikey: 'y7olA5zEbHiPAlt8Js1P3CMlkAq4TwKn' },
      headers: { accept: 'application/json' }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setWeatherData(response.data)
        setLoading(false); 
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false); 
      });
    setData("")
  }




  return (
    <div>
      <header className='text-center text-2xl mt-5 font-bold '>Weather Application</header>
      <section className='w-[100%] flex justify-center mt-5'>
        <input className='border-black border w-[30rem] h-[2.5rem] rounded-md text-black p-4' type="text" value={data} onChange={(e) => conformedData(e.target.value)} />
        <button className='border border-black px-10 rounded-md bg-blue-700' onClick={handleData}>Search</button>
      </section>
      {loading && <p className="text-center mt-5">Loading...</p>} {/* Show loading state */}

      {!weatherData && !loading && <p className="text-center mt-5">Enter a location to get weather data.</p>} {/* Show standby message when no data is available */}
      {weatherData && (
        <section className=' w-full mt-4 flex justify-between mb-10'>
          <aside className=' w-[50%] mt-5 ml-5 space-y-3'>
            <div className='border border-white rounded-lg flex items-center justify-between'>
              <div className='ml-5 space-y-5 py-4'>
                <h1 >Name :<span className='ml-3 font-bold text-xl'>{weatherData.location.name}</span></h1>
                <p>Latitude :<span className='ml-3'>{weatherData.location.lat}</span></p>
                <p>Longitude :<span className='ml-3'>{weatherData.location.lon}</span></p>
                <h1 className='text-[50px]'>{weatherData.data.values.temperature}&deg;c</h1>
              </div>
              <div className='mr-2'>
                <img src={(weatherData.data.values.temperature < 22) ? cold : (weatherData.data.values.precipitationProbability > 0 && weatherData.data.values.rainIntensity > 0) ? cloudy : Heat} alt='' width={160} height={160} />
              </div>
            </div>
            <div className='border border-white rounded-lg pl-5 space-y-5 py-7'>
              <div className='flex items-center justify-evenly'>
                <div className='text-xl space-y-5'>
                  <p>Humidity :<span className='ml-3 font-bold'>{weatherData.data.values.humidity}%</span></p>
                  <p>WeatherCode :<span className='ml-3 font-bold'>{weatherData.data.values.weatherCode}</span></p>
                </div>
                <div className='text-xl space-y-5'>
                  <p>Wind Direction :<span className='ml-3 font-bold'>{weatherData.data.values.windDirection}°</span></p>
                  <p className=''>UV Index :<span className='ml-3 font-bold'>{weatherData.data.values.uvIndex}</span></p>
                </div>
              </div>
              <p className='text-center text-xl'>Time :<span className='ml-3 font-bold'>{weatherData.data.time}</span></p>
            </div>
          </aside>
          <aside className='border border-white w-[45%] mt-5 mr-5 rounded-lg'>
            <h1 className='text-xl font-bold text-center my-5'>Here is the Complete Weather Conditions</h1>
            <div className='ml-5 h-[380px] overflow-y-scroll'>
              <h1 className='text-lg font-bold mb-2'>Cloud and Sky Conditions</h1>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5'>CloudCover:<span className='ml-10 font-bold'>{weatherData.data.values.cloudCover}</span></p>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>WeatherCode :<span className='ml-10 font-bold'>{weatherData.data.values.weatherCode}</span></p>

              <h1 className='text-lg font-bold mb-2'>Temperature and Humidity</h1>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>TemperatureApparent :<span className='ml-10 font-bold'>{weatherData.data.values.temperatureApparent}</span></p>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>DewPoint :<span className='ml-10 font-bold'>{weatherData.data.values.dewPoint}</span></p>

              <h1 className='text-lg font-bold mb-2'>Precipitation</h1>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>PrecipitationProbability :<span className='ml-10 font-bold'></span>{weatherData.data.values.precipitationProbability}</p>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>RainIntensity :<span className='ml-10 font-bold'>{weatherData.data.values.rainIntensity}</span></p>

              <h1 className='text-lg font-bold mb-2'>Wind</h1>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>WindGust :<span className='ml-10 font-bold'>{weatherData.data.values.windGust}</span></p>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>WindSpeed :<span className='ml-10 font-bold'>{weatherData.data.values.windSpeed}</span></p>

              <h1 className='text-lg font-bold mb-2'>Pressure and Visibility</h1>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>PressureSurfaceLevel :<span className='ml-10 font-bold'>{weatherData.data.values.pressureSurfaceLevel}</span></p>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>Visibility :<span className='ml-10 font-bold'>{weatherData.data.values.visibility}</span></p>

              <h1 className='text-lg font-bold mb-2'> UV and Health Concerns</h1>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>UvIndex :<span className='ml-10 font-bold'>{weatherData.data.values.uvIndex}</span></p>
              <p className='border border-white w-[90%] p-3 rounded-lg ml-5 my-2'>UvHealthConcern :<span className='ml-10 font-bold'>{weatherData.data.values.uvHealthConcern}</span></p>
            </div>
          </aside>
        </section>
      )}
    </div>
  )
}

export default Weatherapikey



