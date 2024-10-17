import { createI18n } from 'vue-i18n';

// Các ngôn ngữ và bản dịch
const messages = {
  en: {
    'nextdaysForecast': 'Next Days Forecast',
    'search': 'Search...',
    'month': {
        'january': 'January',
        'february': 'February',
        'march': 'March',
        'april': 'April',
        'may': 'May',
        'june': 'June',
        'july': 'July',
        'august': 'August',
        'september': 'September',
        'october': 'October',
        'november': 'November',
        'december': 'December'
    },
    'day': {
        'sunday': 'Sunday',
        'monday': 'Monday',
        'tuesday': 'Tuesday',
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'friday': 'Friday',
        'saturday': 'Saturday'
    },
    'weather': {
        'forecast': {
            'day': 'Day',
            'description': {
                'clear sky': 'Clear Sky',
                'light rain': 'Light Rain',
                'broken clouds': 'Broken Clouds',
                'scattered clouds': 'Scattered Clouds',
                'few clouds': 'Few Clouds',
                'overcast clouds': 'Overcast Clouds',
                'thunderstorm with light rain': 'Thunderstorm With Light Rain',
                'moderate rain': 'Moderate Rain'
            }
        }
    }
  },
  vi: {
    'nextdaysForecast': 'Dự báo những ngày tiếp theo',
    'search': 'Tìm kiếm...',
    'month': {
        'january': 'Tháng Một',
        'february': 'Tháng Hai',
        'march': 'Tháng Ba',
        'april': 'Tháng Tư',
        'may': 'Tháng Năm',
        'june': 'Tháng Sáu',
        'july': 'Tháng Bảy',
        'august': 'Tháng Tám',
        'september': 'Tháng Chín',
        'october': 'Tháng Mười',
        'november': 'Tháng Mười Một',
        'december': 'Tháng Mười Hai'
    },
    'day': {
        'sunday': 'Chủ Nhật',
        'monday': 'Thứ Hai',
        'tuesday': 'Thứ Ba',
        'wednesday': 'Thứ Tư',
        'thursday': 'Thứ Năm',
        'friday': 'Thứ Sáu',
        'saturday': 'Thứ Bảy'
    },
    'weather': {
        'forecast': {
            'day': 'Ngày',
            'description': {
                'clear sky': 'Trời quang',
                'light rain': 'Mưa nhẹ',
                'broken clouds': 'Mây rải rác',
                'scattered clouds': 'Mây thưa',
                'few clouds': 'Ít mây',
                'overcast clouds': 'Mây che phủ',
                'thunderstorm with light rain': 'Sấm sét và mưa nhẹ',
                'moderate rain': 'Mưa vừa'
            }
        }
    }
  }
};

// Tạo i18n instance
const i18n = createI18n({
  locale: navigator.language, 
  fallbackLocale: 'en', 
  messages,
});

export default i18n;
