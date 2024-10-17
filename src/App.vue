<template>
  <div id="app" :class="typeof weather.weather.main !== 'undefined' && weather.weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <SwitchButton />
      <br>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          :placeholder="$t('search')"
          v-model="query"
          @keypress.enter="handleSearch"
          @input="filterTowns"
        />
        <ul v-if="filteredTowns.length">
          <li v-for="town in filteredTowns" :key="town" @click="selectTown(town)">
            {{ town }}
          </li>
        </ul>
      </div>

      <div class="weather-wrap" v-if="typeof weather.weather === 'undefined'">
        {{ $t('notFound') }}
      </div>
      <div class="weather-wrap" v-else-if="typeof weather.weather.main !== 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.weather?.name }}, {{ weather.weather?.sys?.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.weather?.main?.temp) }}°C</div>
          <div class="weather">{{ $t(`weather.forecast.description.${weather?.weather?.weather[0]?.description}`) }}</div>
        </div>
      </div>

      <br>
      <!-- <div v-if="weather.dailyForecast?.list" class="forecast"> -->
      <div v-if="weather.dailyForecast.length" class="forecast">
        <a-typography-title :level="3">{{ $t('nextdaysForecast') }}</a-typography-title>
          <a-row>
            <!-- <a-col class="gutter-row" :span="6" v-for="(item, index) in weather.dailyForecast.list.slice(4, 16)" :key="index" :xs="24" :sm="12" :md="8" :lg="6"> -->
            <a-col class="gutter-row" :span="6" v-for="(forecast, index) in weather.dailyForecast.slice(4,16)" :key="index" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
              <div style="background: #ececec; padding: 18px">
                <a-card :title="$t('weather.forecast.day')" :bordered="false" style="width: 95%; text-align: center;">
                  <p class="date">{{ forecast.date }}</p>
                    <div style="padding-left: 20%;">
                      <a-flex :horizontal="value === 'horizontal'" :justify="justify === space-between" gap="large">
                        <p class="temp-max">{{ forecast.temp_max }} °C</p>
                        <p class="temp-min">{{ forecast.temp_min }} °C</p>
                      </a-flex>
                    </div>
                  <p class="desc">{{ $t(`weather.forecast.description.${forecast.description}`) }}</p>
                </a-card>
              </div>
            </a-col>
          </a-row>
        </div>

        <a-spin v-if="loading" tip="Loading..."></a-spin>
      <!-- <div v-if="error">{{ error }}</div> -->
    </main>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import SwitchButton from './components/SwitchButton.vue';

export default {
  name: 'App',
  components: {
    SwitchButton,
  },
  data() {
    return {
      query: '',
      towns: [
        'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 
        'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 
        'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 
        'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Hà Giang', 
        'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 
        'Hòa Bình', 'Hậu Giang', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 
        'Kon Tum', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 
        'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 
        'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 
        'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 
        'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên - Huế', 'Tiền Giang', 
        'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 
        'Yên Bái', 'Thành phố Hồ Chí Minh', 'Thành phố Cần Thơ', 
        'Thành phố Đà Nẵng', 'Thành phố Hải Phòng', 'Thành phố Nha Trang'
      ],
      filteredTowns: []
    };
  },
  computed: {
    ...mapState(['weather', 'dailyForecast', 'loading', 'error']),
  },
  methods: {
    ...mapActions(['fetchWeather', 'fetchForecast']),
    filterTowns() {
      const queryLower = this.query.toLowerCase();
      this.filteredTowns = this.towns.filter(town => 
        town.toLowerCase().includes(queryLower)
      );
    },
    selectTown(town) {
      this.query = town;
      this.filteredTowns = [];
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang; // Thay đổi ngôn ngữ
    },
    handleSearch() {
      if (this.query.trim()) {
        this.fetchWeather(this.query);
        this.fetchForecast(this.query)
      } else {
        this.error = 'Please enter a city name.';
      }
    },
    dateBuilder() {
      let d = new Date();
      let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

      let day = this.$t(`day.${days[d.getDay()]}`);
      let date = d.getDate();
      let month = this.$t(`month.${months[d.getMonth()]}`);
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    },
  },
  mounted() {
    console.log(this.$store.state.weather);
    console.log()
  },
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

.weather-card {
  background: #ececec; /* Màu nền nhẹ */
  border-radius: 10px; /* Bo góc */
  padding: 20px;
  transition: transform 0.3s; /* Hiệu ứng chuyển động */
}

.weather-card:hover {
  transform: translateY(-5px); /* Nâng thẻ lên khi hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Đổ bóng */
}

.card-content {
  width: 100%; /* Đảm bảo thẻ card chiếm toàn bộ chiều rộng */
  text-align: center;
  border-radius: 10px; /* Bo góc cho thẻ card */
}

.date {
  font-weight: bold;
  font-size: 1.2em; 
  color: #333; 
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px;
  color: yellow;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

.temp-max {
  font-size: 1.5em; 
  color: #ff5733;
}

.temp-min {
  font-size: 1.5em;
  color: #337ab7;
}

.desc {
  font-style: italic;
  color: #666;
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

.forecast {
  padding: 16px; /* Padding mặc định cho forecast */
}

.forecast .a-col {
  margin-bottom: 16px; /* Khoảng cách giữa các cột */
}

/* Media Query cho điện thoại */
@media (max-width: 576px) {
  .forecast .a-col {
    padding: 8px; /* Giảm padding cho điện thoại */
  }

  .forecast .a-card {
    width: 100%; /* Đảm bảo thẻ card chiếm toàn bộ chiều rộng */
  }
}

/* Media Query cho iPad */
@media (min-width: 576px) and (max-width: 768px) {
  .forecast .a-col {
    padding: 12px;
    width: 40%;
  }

  .forecast .a-card {
    width: 40%;
  }
}

</style>