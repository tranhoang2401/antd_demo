// store/weather.js
import axios from 'axios';

const state = {
  weather: {},
  forecast: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_WEATHER(state, weather) {
    state.weather = weather;
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
  async fetchWeatherForecast({ commit }, { lat, lon }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          exclude: 'current,minutely,hourly,alerts',
          APPID: 'cd23d63d9e67d80ad3f2f23a74fce0a9',
        },
      });
      commit('SET_FORECAST', response.data.daily);
    } catch (error) {
      commit('SET_ERROR', error.response ? error.response.data.message : 'Error fetching forecast data');
    } finally {
      commit('SET_LOADING', false);
    }
  }  
};

const getters = {
  getWeather: (state) => state.weather,
  getForecast: (state) => state.forecast,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
