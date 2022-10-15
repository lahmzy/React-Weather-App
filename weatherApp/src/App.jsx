import { useState } from "react";
import React from "react";
import styles from "./style";
import axios from "axios";

function App() {
  const [data, setData] = useState({});

  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=634842d7855c082f9965ee83e615e7eb`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className={` app ${styles.boxWidth}`}>
      <section className={`${styles.paddingX} text-center py-4`}>
        <input
          onKeyPress={searchLocation}
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="Enter location"
          className={`w-[13rem] font-poppins mx-auto border bg-blue-100 focus:outline-none cursor-pointer rounded-full text-center`}
        />
      </section>

      { data.name!=undefined && <section
        className={`relative flex justify-between leading-[33.3px] min-h-[90vh] flex-col ${styles.paddingX} ${styles.paddingY} `}
      >
        <div className="">
          <p className={`${styles.paragraph}`}>{data.name}</p>
          {data.main ? (
            <h1 className={`text-veryDarkBlue ${styles.heading2}`}>
              {data.main.temp}°C
            </h1>
          ) : null}
          {data.weather ? (
            <p
              className={`absolute -rotate-90 top-20 right-5 ${styles.paragraph}`}
            >
              {data.weather[0].main}
            </p>
          ) : null}
        </div>
        <div className="flex flex-row justify-evenly align-center my-4 p-4 leading-[20px] mb-10 bg-lightGray rounded-lg">
          <div className="flex flex-col">
            <p className={styles.paragraph}>Feels like</p>
            {data.main && (
              <p className={styles.paragraph}>{data.main.feels_like}°C</p>
            )}
          </div>
          <div className="flex flex-col">
            <p className={styles.paragraph}>Humidity</p>
            {data.main && (
              <p className={styles.paragraph}>{data.main.humidity}g/kg</p>
            )}
          </div>
          <div className="flex flex-col">
            <p className={styles.paragraph}>Wind</p>
            {data.wind && (
              <p className={styles.paragraph} m>
                {data.wind.speed}m/s
              </p>
            )}
          </div>
        </div>
      </section>}
    </div>
  );
}

export default App;

// key:634842d7855c082f9965ee83e615e7eb
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// const url='https://api.openweathermap.org/data/2.5/weather?q={city}name}&appid=634842d7855c082f9965ee83e615e7eb'
