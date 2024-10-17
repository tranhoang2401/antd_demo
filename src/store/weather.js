// store/weather.js
import axios from 'axios';

const state = {
  weather: {},
  dailyForecast: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_WEATHER(state, weather) {
    state.weather = weather;
  },
  SET_DAILY_FORECAST(state, forecast) {
    state.dailyForecast = forecast;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async fetchWeather({ commit }, query) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: query,
          units: 'metric',
          APPID: 'cd23d63d9e67d80ad3f2f23a74fce0a9',
        },
      });
      await commit('SET_WEATHER', response.data);
    } catch (error) {
      commit('SET_ERROR', error.response ? error.response.data.message : 'Error fetching data');
    } finally {
      commit('SET_LOADING', false);
    }
  },
  // async fetchForecast({ commit }, query) {
  //   const urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=cd23d63d9e67d80ad3f2f23a74fce0a9`;
  //   try {
  //     const response = await axios.get(urlcast);
  //     const forecast = response.data;
  //     commit('SET_DAILY_FORECAST', forecast);
  //   } catch (error) {
  //     console.error("Error fetching forecast data:", error);
  //   }
  // },
  async fetchForecast({ commit }, query ) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=cd23d63d9e67d80ad3f2f23a74fce0a9`);
    
    // Cắt nhỏ dữ liệu
    const simplifiedData = response.data.list.map(item => ({
      date: item.dt_txt,
      temp_max: item.main.temp_max,
      temp_min: item.main.temp_min,
      description: item.weather[0].description,
    }));
    
    commit('SET_DAILY_FORECAST', simplifiedData);
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
  }
};

const getters = {
  getWeather: (state) => state.weather,
  dailyForecast: (state) => state.dailyForecast,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
