<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <!-- <div class="search-bar">
        <a-input-search
          type="text"
          v-model="city"
          placeholder="Enter city name"
          enter-button="Search"
          size="large"
          @click="searchByCity"
        />
      </div> -->
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity"
                class="search-button">Search</button>
      </div>
      <br>
      <div v-if="weatherData" class="weather">
          <a-row justify="center">
            <a-col :span="6" >
              <a-card hoverable style="width: 240px">
                <template #cover>
                  <img :src="iconUrl" alt="Weather Icon" />
                </template>
              <a-card-meta >
                <template #description>
                  <h2>{{ weatherData.name }}, 
                    {{ weatherData.sys.country }}</h2>
                  <p>{{ temperature }} °C</p>
                </template>
              </a-card-meta>
            </a-card>
              <!-- <h2>{{ weatherData.name }}, 
                  {{ weatherData.sys.country }}</h2>
              <a-image
                :width="200"
                :height="200"
                :src="iconUrl" alt="Weather Icon" 
                fallback="data:image/png;base64,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"
              />
              <p>{{ temperature }} °C</p> -->
            </a-col>
          </a-row>
        
        <a-typography-title :level="3">Next 4 days forecast</a-typography-title>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <div v-if="dailyForecast.length" class="forecast">
            <a-flex :vertical="value === 'vertical'" :justify="justify">
              <a-col class="gutter-row" :span="6" v-for="(forecast, index) in dailyForecast" :key="index">
                <div style="background: #ececec; padding: 30px">
                  <a-card title="Ngày" :bordered="false" style="width: 300px">
                    <p class="date">{{ forecast.date }}</p>
                    <a-flex :horizontal="value === 'horizontal'" :justify="justify === space-between" gap="large">
                      <p class="temp-max">{{ forecast.temp_max }} °C</p>
                      <p class="temp-min">{{ forecast.temp_min }} °C</p>
                    </a-flex>
                    <p class="desc">{{ forecast.description }}</p>
                  </a-card>
                </div>
              </a-col>
            </a-flex>
          </div>
        </a-row>
      </div>

    </div>
  </div>
</template>

<!-- <script>
import axios from "axios";

const apikey = "cd23d63d9e67d80ad3f2f23a74fce0a9";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      dailyForecast: [],
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? 
        `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        console.log(response.data)
        this.weatherData = response.data;
        // Fetch forecast data
        await this.fetchForecast(this.weatherData.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    async fetchForecast(city) {
      const urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
      try {
        const response = await axios.get(urlcast);
        const forecast = response.data;
        this.dayForecast(forecast);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    },
    async searchByCity() {
      if (!this.city) return;
      try {
        const urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        const response = await axios.get(urlsearch);
        this.weatherData = response.data;
        // Fetch forecast data
        await this.fetchForecast(this.weatherData.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
      this.city = "";
    },
    dayForecast(forecast) {
      this.dailyForecast = [];
      for (let i = 8; i < forecast.list.length; i += 8) {
        const date = new Date(forecast.list[i].dt * 1000);
        this.dailyForecast.push({
          date: date.toDateString(undefined, "Asia/Kolkata"),
          temp_max: Math.floor(forecast.list[i].main.temp_max - 273),
          temp_min: Math.floor(forecast.list[i].main.temp_min - 273),
          description: forecast.list[i].weather[0].description,
        });
      }
    },
  },
}
</script> -->

<script>
import { useStore, mapState } from 'vuex';

const store = useStore();

export default {
  name: 'app',
  mounted (){
    store.dispatch('fetchCurrentLocationWeather');
    store.dispatch('fetchWeatherData');
    store.dispatch('fetchForecast');
    store.dispatch('searchByCity');
    store.dispatch('dayForecast');
  },
  computed: mapState([
    'city',
    'weatherData',
    'dailyForecast'
  ])
}
</script>

<style scoped>
.gutter-box {
  background: #0092ff;
  padding: 8px 0;
}

</style>
