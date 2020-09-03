import i18n, { TranslateOptions } from 'i18n-js';
import memoize from 'lodash.memoize';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { Constants } from '../constans/constants';

const translationGetters: any = {
    vi: () => require('./translations/vi.json'),
    en: () => require('./translations/en.json')
};

export const translate: any = memoize(
    (key: any, config?: any) => i18n.t(key, config),
    (key: any, config?: any) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = (locale?: string): void => {
    // fallback if no available language fits
    if (locale === 'vn') locale = 'vi'; // khác nhau với list country trong datasource
    const fallback = { languageTag: 'en', isRTL: false };

    // eslint-disable-next-line max-len
    let { languageTag, isRTL } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        fallback;

    if (locale) languageTag = convertLocale(locale);

    // clear translation cache
    translate.cache.clear();

    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = {
        [languageTag]: translationGetters[languageTag]()
    };
    i18n.locale = languageTag;
};

export const convertLocale = (locale: string): string => {
    if (locale === 'US') locale = 'en';
    if (locale === 'VN') locale = 'vi';
    return locale.toLocaleLowerCase();
};

export const currentLocale = (): string => {
    return i18n.locale;
};

export const missingTranslation = (
    scope: string,
    options?: TranslateOptions
): boolean => {
    const message = i18n.t(scope, options);

    if (typeof message === 'object') return false;
    return message.includes('missing');
};

export const isEnglish = (): boolean => {
    return i18n.locale === 'en';
};

export const isVietnamese = (): boolean => {
    return i18n.locale === 'vi' || i18n.locale === 'vn';
};

export const currentLanguage = (): string => {
    if (i18n.locale === 'vi' || i18n.locale === 'vn') {
        return Constants.VI;
    }
    return Constants.EN;
};
