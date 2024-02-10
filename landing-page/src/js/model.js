import { DEV_API_URL, PROD_API_URL, LOCALE } from './config.js';
import { AJAX } from './helpers.js';

let apiUrl;
export const state = {
  houses: [],
  disclaimer: {},
  emailConfig: {},
  modals: [],
};

const currencyOptions = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

const createHousesArray = function (data) {
  const { houses } = data;
  return houses.map(h => {
    return {
      imageSrc: h.img_src,
      imageAlt: h.img_alt,
      isLike: h.is_like,
      houseName: h.house_name,
      location: h.location,
      roomCount: h.room_count,
      areaM2: h.area_m2,
      price: new Intl.NumberFormat(LOCALE, currencyOptions).format(h.price),
    };
  });
};

const createDisclaimerObject = function (data) {
  return {
    companyName: data.company_name,
    domainName: data.domain_name,
    developerName: data.developer_name,
    contactUrl: data.contact_url,
  };
};

const createEmailConfigObject = function (data) {
  return {
    host: data.host,
    userName: data.user_name || process.env.ELASTIC_EMAIL_USERNAME,
    password: data.password || process.env.ELASTIC_EMAIL_PASSWORD,
    to: data.to || process.env.ELASTIC_EMAIL_TO,
    from: data.from || process.env.ELASTIC_EMAIL_FROM,
    titlePrefix: data.title_prefix,
  };
};

const createModalsArray = function (data) {
  const { modals } = data;
  return modals.map(m => {
    return {
      type: m.type,
      statusIconName: m.status_icon_name,
      title: m.title,
      message: m.message,
    };
  });
};

export const loadHouses = async function () {
  try {
    const data = await AJAX(`${apiUrl}houses.json`);
    state.houses = createHousesArray(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadDisclaimer = async function () {
  try {
    const data = await AJAX(`${apiUrl}disclaimer.json`);
    state.disclaimer = createDisclaimerObject(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadEmailConfig = async function () {
  try {
    const data = await AJAX(`${apiUrl}emailConfig.json`);
    state.emailConfig = createEmailConfigObject(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadModals = async function () {
  try {
    const data = await AJAX(`${apiUrl}modals.json`);
    state.modals = createModalsArray(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

const init = function () {
  if (process.env.NODE_ENV === 'production') {
    apiUrl = PROD_API_URL;
  } else {
    apiUrl = DEV_API_URL;
  }
};

init();
