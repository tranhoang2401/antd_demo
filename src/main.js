import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import store from './store';
import i18n from './i18n';

const app = createApp(App);

app.use(i18n).use(Antd).use(store).mount('#app');