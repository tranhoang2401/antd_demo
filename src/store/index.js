import { createStore } from 'vuex';
import weather from './weather';

const store = createStore({
  modules: {
    weather,
  },
});

export default store;