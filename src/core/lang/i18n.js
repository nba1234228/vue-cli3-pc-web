import vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from './lang/zh.json';
import en from './lang/en.json';

vue.use(VueI18n);
let messages = {
    zh,
    en
};
let i18n = new VueI18n({
    locale: 'zh',
    messages
});
export default i18n;

