<template>
  <div id="app" :class="typeof weather.weather.main !== 'undefined' && weather.weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          v-model="query"
          @keypress.enter="handleSearch"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.weather.main !== 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.weather?.name }}, {{ weather.weather?.sys?.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.weather?.main?.temp) }}°C</div>
          <div class="weather">{{ weather?.weather?.weather[0]?.main }}</div>
        </div>
      </div>

      <!-- <div class="forecast-wrap" v-if="Array.isArray(forecast) && forecast.length > 0">
        <h2>7-Day Forecast</h2>
        <div class="forecast">
          <div v-for="(day, index) in forecast" :key="index" class="forecast-day">
            <div class="forecast-date">{{ formatDate(day.dt) }}</div>
            <div class="forecast-temp">{{ Math.round(day.temp.day) }}°C</div>
            <div class="forecast-weather">{{ day.weather[0].main }}</div>
          </div>
        </div>
      </div> -->

      <div v-if="loading">Loading...</div>
      <!-- <div v-if="error">{{ error }}</div> -->
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      query: '',
    };
  },
  computed: {
    ...mapState([ 'weather', 'forecast', 'loading', 'error']),
  },
  methods: {
    ...mapActions(['fetchWeather', 'fetchWeatherForecast']),
    handleSearch() {
      if (this.query.trim()) {
        this.fetchWeather(this.query);
      } else {
        this.error = 'Please enter a city name.';
      }
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  },
  mounted (){
    console.log(this.$store.state.weather)
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
}

#app {
  background-image: url('./assets/cold-bg.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  background-image: url('./assets/warm-bg.jpg');
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  
  color: #313131;
  font-size: 20px;

  appearance: none;
  border:none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>