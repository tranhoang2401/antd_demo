import axios from 'axios';
import { createStore } from 'vuex';

const apikey = "cd23d63d9e67d80ad3f2f23a74fce0a9";

const store = createStore({
  state() {
    return {
      city: '',
      weatherData: null,
      dailyForecast: [],
    };
  },
  mutations: {
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    SET_DAILY_FORECAST(state, forecast) {
      state.dailyForecast = forecast;
    },
    SET_CITY(state, city) {
      state.city = city;
    },
  },
  actions: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await store.dispatch('fetchWeatherData', url);
        });
      }
    },
    async fetchWeatherData({ commit }, url) {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        commit('SET_WEATHER_DATA', response.data);
        // Fetch forecast data
        await store.dispatch('fetchForecast', response.data.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    async fetchForecast({ commit }, city) {
      const urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
      try {
        const response = await axios.get(urlcast);
        const forecast = response.data;
        commit('SET_DAILY_FORECAST', this.dayForecast(forecast));
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    },
    async searchByCity({ commit }, city) {
      if (!city) return;
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
      await store.dispatch('fetchWeatherData', url);
      commit('SET_CITY', city);
    },
    dayForecast(forecast) {
      const dailyForecast = [];
      for (let i = 8; i < forecast.list.length; i += 8) {
        const date = new Date(forecast.list[i].dt * 1000);
        dailyForecast.push({
          date: date.toDateString(),
          temp_max: Math.floor(forecast.list[i].main.temp_max - 273),
          temp_min: Math.floor(forecast.list[i].main.temp_min - 273),
          description: forecast.list[i].weather[0].description,
        });
      }
      return dailyForecast;
    },
  },
  getters: {
    weatherData: (state) => state.weatherData,
    dailyForecast: (state) => state.dailyForecast,
    city: (state) => state.city,
  },
});

// Call fetchCurrentLocationWeather when the store is initialized
store.dispatch('fetchCurrentLocationWeather');

export default store;
