<template>
    <div>
      <a-button type="default" @click="toggleLanguage">
        {{ currentLanguage === 'vi' ? 'ENG' : 'VIE' }}
      </a-button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentLanguage: this.$i18n.locale,
      };
    },
    methods: {
      toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'vi' ? 'en' : 'vi';
        this.$i18n.locale = this.currentLanguage;
      },
    },
  };
  </script>
  