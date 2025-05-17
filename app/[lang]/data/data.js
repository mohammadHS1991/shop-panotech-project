export const navLink = [
  {
    id: 1,
    title: {
      fa: " خانه ",
      en: " Home ",
      ar: " بيت ",
    },
    href: "/",
    href_2: "/",
    href_3: "/",
    className1: "text-gray-500 font-semibold hover:text-gray-900",
    className2: "text-green-500 font-semibold border-b-4 pb-2 border-green-500",
    img: "/images/baner.jpeg",
  },
  {
    id: 2,
    title: {
      fa: "فناوری",
      en: "Technology",
      ar: "تكنولوجيا",
    },
    href: "/technology",
    href_2: "/technology",
    href_3: "/technology",
    className1: "text-gray-500 font-semibold hover:text-gray-900",
    className2: "text-green-500 font-semibold border-b-4 pb-2 border-green-500",
    img: "/images/baner.jpeg",
  },
  {
    id: 3,
    title: {
      fa: "فروشگاه",
      en: "Shop",
      ar: "محل",
    },
    href: "/products",
    href_2: "/products",
    href_3: "/products",
    className1: "text-gray-500 font-semibold hover:text-gray-900",
    className2: "text-green-500 font-semibold border-b-4 pb-2 border-green-500",
    img: "/images/baner.jpeg",
  },
  {
    id: 4,
    title: {
      fa: "وبلاگ",
      en: "Blog",
      ar: "مدونة",
    },
    href: "/blogs",
    href_2: "/blogs/news",
    href_3: "/blogs/events",
    className1: "text-gray-500 font-semibold hover:text-gray-900",
    className2: "text-green-500 font-semibold border-b-4 pb-2 border-green-500",
    img: "/images/baner.jpeg",
  },
  {
    id: 5,
    title: {
      fa: "گالری",
      en: "Gallery",
      ar: "المعرض",
    },
    href: "/gallery",
    href_2: "/gallery",
    href_3: "/gallery",
    className1: "text-gray-500 font-semibold hover:text-gray-900",
    className2: "text-green-500 font-semibold border-b-4 pb-2 border-green-500",
    img: "/images/baner.jpeg",
  },
  {
    id: 6,
    title: {
      fa: "درباره ما ",
      en: "About Us",
      ar: "معلومات عنا",
    },
    href: "/about",
    href_2: "/about",
    href_3: "/about",
    className1: "text-gray-500 font-semibold hover:text-gray-900",
    className2: "text-green-500 font-semibold border-b-4 pb-2 border-green-500",
    img: "/images/baner.jpeg",
  },
  {
    id: 7,
    title: {
      fa: "تماس با ما ",
      en: "Contact Us",
      ar: "اتصل بنا",
    },
    href: "/contact-us",
    href_2: "/contact-us",
    href_3: "/contact-us",
    className1: "text-gray-500 font-semibold hover:text-gray-900",
    className2: "text-green-500 font-semibold border-b-4 pb-2 border-green-500",
    img: "/images/baner.jpeg",
  },
];

import { ImProfile } from "react-icons/im";
import { FaComments, FaShoppingCart } from "react-icons/fa";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { GrGallery } from "react-icons/gr";
import { FaBlog } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbShoppingCartCog } from "react-icons/tb";
export const profileNavLink = [
  {
    id: 1,
    title: {
      fa: " پیشخوان ",
      en: " Counter ",
      ar: " عداد ",
    },
    href: "/admin",
    icon: <BsFillMenuButtonWideFill />,
  },
  {
    id: 2,
    title: {
      fa: " سفارشات ",
      en: " Orders ",
      ar: " طلبات ",
    },
    href: "/admin/orders",
    icon: <FaShoppingCart />,
  },
  {
    id: 3,
    title: {
      fa: " مدیریت سفارشات ",
      en: " Order Management ",
      ar: " إدارة الطلبات ",
    },
    href: "/admin/manag-orders",
    icon: <TbShoppingCartCog />,
  },
  {
    id: 4,
    title: {
      fa: " نظرات ",
      en: " Comments ",
      ar: " تعليقات ",
    },
    href: "/admin/comments",
    icon: <FaComments />,
  },
  {
    id: 5,
    title: {
      fa: " تماس با ما ",
      en: " Contact Us ",
      ar: " اتصل بنا ",
    },
    href: "/admin/contact-us",
    icon: <IoMdContacts />,
  },
  {
    id: 6,
    title: {
      fa: " محصولات سفارشی ",
      en: " Custom Products ",
      ar: " منتجات مخصصة ",
    },
    href: "/admin/customize-product",
    icon: <MdDashboardCustomize />,
  },
  {
    id: 7,
    title: {
      fa: " سوالات پرتکرار ",
      en: " FAQ ",
      ar: " الأسئلة الشائعة ",
    },
    href: "/admin/frequently-questions",
    icon: <TbUserQuestion />,
  },
  {
    id: 8,
    title: {
      fa: " گالری ",
      en: " Gallery ",
      ar: " المعرض ",
    },
    href: "/admin/gallery",
    icon: <GrGallery />,
  },
  {
    id: 9,
    title: {
      fa: " وبلاگ ",
      en: " Blog ",
      ar: " مدونة ",
    },
    href: "/admin/blog",
    icon: <FaBlog />,
  },
  {
    id: 10,
    title: {
      fa: " مدیریت کاربران ",
      en: " User Management ",
      ar: " إدارة المستخدمين ",
    },
    href: "/admin/users",
    icon: <RiUserSettingsFill />,
  },
  {
    id: 11,
    title: {
      fa: " اطلاعات حساب ",
      en: " Account Info ",
      ar: " معلومات الحساب ",
    },
    href: "/admin/account-information",
    icon: <ImProfile />,
  },
];
export const userProfileNavLink = [
  {
    id: 1,
    title: {
      fa: " پیشخوان ",
      en: " Counter ",
      ar: " عداد ",
    },
    href: "/profile",
    icon: <BsFillMenuButtonWideFill />,
  },
  {
    id: 2,
    title: {
      fa: " سفارشات ",
      en: " Orders ",
      ar: " طلبات ",
    },
    href: "/profile/orders",
    icon: <FaShoppingCart />,
  },
  {
    id: 3,
    title: {
      fa: " محصولات سفارشی ",
      en: " Custom Products ",
      ar: " منتجات مخصصة ",
    },
    href: "/profile/customize-product",
    icon: <MdDashboardCustomize />,
  },
  {
    id: 4,
    title: {
      fa: " سوالات پرتکرار ",
      en: " FAQ ",
      ar: " الأسئلة الشائعة ",
    },
    href: "/profile/frequently-questions",
    icon: <TbUserQuestion />,
  },
  {
    id: 5,
    title: {
      fa: " اطلاعات حساب ",
      en: " Account Info ",
      ar: " معلومات الحساب ",
    },
    href: "/profile/account-information",
    icon: <ImProfile />,
  },
];

export const contactUsNavLink = [
  {
    id: 1,
    title: {
      fa: " همکاری ",
      en: " Collaboration ",
      ar: " التعاون ",
    },
  },
  {
    id: 2,
    title: {
      fa: " سوال ",
      en: " Question ",
      ar: " السؤال ",
    },
  },
  {
    id: 3,
    title: {
      fa: " انتقاد و پیشنهاد ",
      en: " Suggestion ",
      ar: " الاقتراح ",
    },
  },
  {
    id: 4,
    title: {
      fa: " اطلاعات تماس ",
      en: " Contact info ",
      ar: " معلومات الاتصال ",
    },
  },
  {
    id: 5,
    title: {
      fa: " موقعیت مکانی ",
      en: " Map ",
      ar: " الخريطة ",
    },
  },
];

export const countries = {
  AF: {
    name: "Afghanistan",
    primary: "+93",
    secondary: "AF",
  },
  AX: {
    name: "Aland Islands",
    primary: "+358",
    secondary: "AX",
  },
  AL: {
    name: "Albania",
    primary: "+355",
    secondary: "AL",
  },
  DZ: {
    name: "Algeria",
    primary: "+213",
    secondary: "DZ",
  },
  AS: {
    name: "AmericanSamoa",
    primary: "+1684",
    secondary: "AS",
  },
  AD: {
    name: "Andorra",
    primary: "+376",
    secondary: "AD",
  },
  AO: {
    name: "Angola",
    primary: "+244",
    secondary: "AO",
  },
  AI: {
    name: "Anguilla",
    primary: "+1264",
    secondary: "AI",
  },
  AQ: {
    name: "Antarctica",
    primary: "+672",
    secondary: "AQ",
  },
  AG: {
    name: "Antigua and Barbuda",
    primary: "+1268",
    secondary: "AG",
  },
  AR: {
    name: "Argentina",
    primary: "+54",
    secondary: "AR",
  },
  AM: {
    name: "Armenia",
    primary: "+374",
    secondary: "AM",
  },
  AW: {
    name: "Aruba",
    primary: "+297",
    secondary: "AW",
  },
  AU: {
    name: "Australia",
    primary: "+61",
    secondary: "AU",
  },
  AT: {
    name: "Austria",
    primary: "+43",
    secondary: "AT",
  },
  AZ: {
    name: "Azerbaijan",
    primary: "+994",
    secondary: "AZ",
  },
  BS: {
    name: "Bahamas",
    primary: "+1242",
    secondary: "BS",
  },
  BH: {
    name: "Bahrain",
    primary: "+973",
    secondary: "BH",
  },
  BD: {
    name: "Bangladesh",
    primary: "+880",
    secondary: "BD",
  },
  BB: {
    name: "Barbados",
    primary: "+1246",
    secondary: "BB",
  },
  BY: {
    name: "Belarus",
    primary: "+375",
    secondary: "BY",
  },
  BE: {
    name: "Belgium",
    primary: "+32",
    secondary: "BE",
  },
  BZ: {
    name: "Belize",
    primary: "+501",
    secondary: "BZ",
  },
  BJ: {
    name: "Benin",
    primary: "+229",
    secondary: "BJ",
  },
  BM: {
    name: "Bermuda",
    primary: "+1441",
    secondary: "BM",
  },
  BT: {
    name: "Bhutan",
    primary: "+975",
    secondary: "BT",
  },
  BO: {
    name: "Bolivia",
    primary: "+591",
    secondary: "BO",
  },
  BA: {
    name: "Bosnia and Herzegovina",
    primary: "+387",
    secondary: "BA",
  },
  BW: {
    name: "Botswana",
    primary: "+267",
    secondary: "BW",
  },
  BR: {
    name: "Brazil",
    primary: "+55",
    secondary: "BR",
  },
  IO: {
    name: "British Indian Ocean Territory",
    primary: "+246",
    secondary: "IO",
  },
  BN: {
    name: "Brunei Darussalam",
    primary: "+673",
    secondary: "BN",
  },
  BG: {
    name: "Bulgaria",
    primary: "+359",
    secondary: "BG",
  },
  BF: {
    name: "Burkina Faso",
    primary: "+226",
    secondary: "BF",
  },
  BI: {
    name: "Burundi",
    primary: "+257",
    secondary: "BI",
  },
  KH: {
    name: "Cambodia",
    primary: "+855",
    secondary: "KH",
  },
  CM: {
    name: "Cameroon",
    primary: "+237",
    secondary: "CM",
  },
  CA: {
    name: "Canada",
    primary: "+1",
    secondary: "CA",
  },
  CV: {
    name: "Cape Verde",
    primary: "+238",
    secondary: "CV",
  },
  KY: {
    name: "Cayman Islands",
    primary: "+ 345",
    secondary: "KY",
  },
  CF: {
    name: "Central African Republic",
    primary: "+236",
    secondary: "CF",
  },
  TD: {
    name: "Chad",
    primary: "+235",
    secondary: "TD",
  },
  CL: {
    name: "Chile",
    primary: "+56",
    secondary: "CL",
  },
  CN: {
    name: "China",
    primary: "+86",
    secondary: "CN",
  },
  CX: {
    name: "Christmas Island",
    primary: "+61",
    secondary: "CX",
  },
  CC: {
    name: "Cocos (Keeling) Islands",
    primary: "+61",
    secondary: "CC",
  },
  CO: {
    name: "Colombia",
    primary: "+57",
    secondary: "CO",
  },
  KM: {
    name: "Comoros",
    primary: "+269",
    secondary: "KM",
  },
  CG: {
    name: "Congo",
    primary: "+242",
    secondary: "CG",
  },
  CD: {
    name: "Congo",
    primary: "+243",
    secondary: "CD",
  },
  CK: {
    name: "Cook Islands",
    primary: "+682",
    secondary: "CK",
  },
  CR: {
    name: "Costa Rica",
    primary: "+506",
    secondary: "CR",
  },
  CI: {
    name: "Cote d'Ivoire",
    primary: "+225",
    secondary: "CI",
  },
  HR: {
    name: "Croatia",
    primary: "+385",
    secondary: "HR",
  },
  CU: {
    name: "Cuba",
    primary: "+53",
    secondary: "CU",
  },
  CY: {
    name: "Cyprus",
    primary: "+357",
    secondary: "CY",
  },
  CZ: {
    name: "Czech Republic",
    primary: "+420",
    secondary: "CZ",
  },
  DK: {
    name: "Denmark",
    primary: "+45",
    secondary: "DK",
  },
  DJ: {
    name: "Djibouti",
    primary: "+253",
    secondary: "DJ",
  },
  DM: {
    name: "Dominica",
    primary: "+1767",
    secondary: "DM",
  },
  DO: {
    name: "Dominican Republic",
    primary: "+1849",
    secondary: "DO",
  },
  EC: {
    name: "Ecuador",
    primary: "+593",
    secondary: "EC",
  },
  EG: {
    name: "Egypt",
    primary: "+20",
    secondary: "EG",
  },
  SV: {
    name: "El Salvador",
    primary: "+503",
    secondary: "SV",
  },
  GQ: {
    name: "Equatorial Guinea",
    primary: "+240",
    secondary: "GQ",
  },
  ER: {
    name: "Eritrea",
    primary: "+291",
    secondary: "ER",
  },
  EE: {
    name: "Estonia",
    primary: "+372",
    secondary: "EE",
  },
  ET: {
    name: "Ethiopia",
    primary: "+251",
    secondary: "ET",
  },
  FK: {
    name: "Falkland Islands (Malvinas)",
    primary: "+500",
    secondary: "FK",
  },
  FO: {
    name: "Faroe Islands",
    primary: "+298",
    secondary: "FO",
  },
  FJ: {
    name: "Fiji",
    primary: "+679",
    secondary: "FJ",
  },
  FI: {
    name: "Finland",
    primary: "+358",
    secondary: "FI",
  },
  FR: {
    name: "France",
    primary: "+33",
    secondary: "FR",
  },
  GF: {
    name: "French Guiana",
    primary: "+594",
    secondary: "GF",
  },
  PF: {
    name: "French Polynesia",
    primary: "+689",
    secondary: "PF",
  },
  GA: {
    name: "Gabon",
    primary: "+241",
    secondary: "GA",
  },
  GM: {
    name: "Gambia",
    primary: "+220",
    secondary: "GM",
  },
  GE: {
    name: "Georgia",
    primary: "+995",
    secondary: "GE",
  },
  DE: {
    name: "Germany",
    primary: "+49",
    secondary: "DE",
  },
  GH: {
    name: "Ghana",
    primary: "+233",
    secondary: "GH",
  },
  GI: {
    name: "Gibraltar",
    primary: "+350",
    secondary: "GI",
  },
  GR: {
    name: "Greece",
    primary: "+30",
    secondary: "GR",
  },
  GL: {
    name: "Greenland",
    primary: "+299",
    secondary: "GL",
  },
  GD: {
    name: "Grenada",
    primary: "+1473",
    secondary: "GD",
  },
  GP: {
    name: "Guadeloupe",
    primary: "+590",
    secondary: "GP",
  },
  GU: {
    name: "Guam",
    primary: "+1671",
    secondary: "GU",
  },
  GT: {
    name: "Guatemala",
    primary: "+502",
    secondary: "GT",
  },
  GG: {
    name: "Guernsey",
    primary: "+44",
    secondary: "GG",
  },
  GN: {
    name: "Guinea",
    primary: "+224",
    secondary: "GN",
  },
  GW: {
    name: "Guinea-Bissau",
    primary: "+245",
    secondary: "GW",
  },
  GY: {
    name: "Guyana",
    primary: "+595",
    secondary: "GY",
  },
  HT: {
    name: "Haiti",
    primary: "+509",
    secondary: "HT",
  },
  VA: {
    name: "Holy See",
    primary: "+379",
    secondary: "VA",
  },
  HN: {
    name: "Honduras",
    primary: "+504",
    secondary: "HN",
  },
  HK: {
    name: "Hong Kong",
    primary: "+852",
    secondary: "HK",
  },
  HU: {
    name: "Hungary",
    primary: "+36",
    secondary: "HU",
  },
  IS: {
    name: "Iceland",
    primary: "+354",
    secondary: "IS",
  },
  IN: {
    name: "India",
    primary: "+91",
    secondary: "IN",
  },
  ID: {
    name: "Indonesia",
    primary: "+62",
    secondary: "ID",
  },
  IR: {
    name: "Iran",
    primary: "+98",
    secondary: "IR",
  },
  IQ: {
    name: "Iraq",
    primary: "+964",
    secondary: "IQ",
  },
  IE: {
    name: "Ireland",
    primary: "+353",
    secondary: "IE",
  },
  IM: {
    name: "Isle of Man",
    primary: "+44",
    secondary: "IM",
  },
  IT: {
    name: "Italy",
    primary: "+39",
    secondary: "IT",
  },
  JM: {
    name: "Jamaica",
    primary: "+1876",
    secondary: "JM",
  },
  JP: {
    name: "Japan",
    primary: "+81",
    secondary: "JP",
  },
  JE: {
    name: "Jersey",
    primary: "+44",
    secondary: "JE",
  },
  JO: {
    name: "Jordan",
    primary: "+962",
    secondary: "JO",
  },
  KZ: {
    name: "Kazakhstan",
    primary: "+77",
    secondary: "KZ",
  },
  KE: {
    name: "Kenya",
    primary: "+254",
    secondary: "KE",
  },
  KI: {
    name: "Kiribati",
    primary: "+686",
    secondary: "KI",
  },
  KP: {
    name: "North Korea",
    primary: "+850",
    secondary: "KP",
  },
  KR: {
    name: "South Korea",
    primary: "+82",
    secondary: "KR",
  },
  KW: {
    name: "Kuwait",
    primary: "+965",
    secondary: "KW",
  },
  KG: {
    name: "Kyrgyzstan",
    primary: "+996",
    secondary: "KG",
  },
  LA: {
    name: "Laos",
    primary: "+856",
    secondary: "LA",
  },
  LV: {
    name: "Latvia",
    primary: "+371",
    secondary: "LV",
  },
  LB: {
    name: "Lebanon",
    primary: "+961",
    secondary: "LB",
  },
  LS: {
    name: "Lesotho",
    primary: "+266",
    secondary: "LS",
  },
  LR: {
    name: "Liberia",
    primary: "+231",
    secondary: "LR",
  },
  LY: {
    name: "Libyan Arab Jamahiriya",
    primary: "+218",
    secondary: "LY",
  },
  LI: {
    name: "Liechtenstein",
    primary: "+423",
    secondary: "LI",
  },
  LT: {
    name: "Lithuania",
    primary: "+370",
    secondary: "LT",
  },
  LU: {
    name: "Luxembourg",
    primary: "+352",
    secondary: "LU",
  },
  MO: {
    name: "Macao",
    primary: "+853",
    secondary: "MO",
  },
  MK: {
    name: "Macedonia",
    primary: "+389",
    secondary: "MK",
  },
  MG: {
    name: "Madagascar",
    primary: "+261",
    secondary: "MG",
  },
  MW: {
    name: "Malawi",
    primary: "+265",
    secondary: "MW",
  },
  MY: {
    name: "Malaysia",
    primary: "+60",
    secondary: "MY",
  },
  MV: {
    name: "Maldives",
    primary: "+960",
    secondary: "MV",
  },
  ML: {
    name: "Mali",
    primary: "+223",
    secondary: "ML",
  },
  MT: {
    name: "Malta",
    primary: "+356",
    secondary: "MT",
  },
  MH: {
    name: "Marshall Islands",
    primary: "+692",
    secondary: "MH",
  },
  MQ: {
    name: "Martinique",
    primary: "+596",
    secondary: "MQ",
  },
  MR: {
    name: "Mauritania",
    primary: "+222",
    secondary: "MR",
  },
  MU: {
    name: "Mauritius",
    primary: "+230",
    secondary: "MU",
  },
  YT: {
    name: "Mayotte",
    primary: "+262",
    secondary: "YT",
  },
  MX: {
    name: "Mexico",
    primary: "+52",
    secondary: "MX",
  },
  FM: {
    name: "Micronesia",
    primary: "+691",
    secondary: "FM",
  },
  MD: {
    name: "Moldova",
    primary: "+373",
    secondary: "MD",
  },
  MC: {
    name: "Monaco",
    primary: "+377",
    secondary: "MC",
  },
  MN: {
    name: "Mongolia",
    primary: "+976",
    secondary: "MN",
  },
  ME: {
    name: "Montenegro",
    primary: "+382",
    secondary: "ME",
  },
  MS: {
    name: "Montserrat",
    primary: "+1664",
    secondary: "MS",
  },
  MA: {
    name: "Morocco",
    primary: "+212",
    secondary: "MA",
  },
  MZ: {
    name: "Mozambique",
    primary: "+258",
    secondary: "MZ",
  },
  MM: {
    name: "Myanmar",
    primary: "+95",
    secondary: "MM",
  },
  NA: {
    name: "Namibia",
    primary: "+264",
    secondary: "NA",
  },
  NR: {
    name: "Nauru",
    primary: "+674",
    secondary: "NR",
  },
  NP: {
    name: "Nepal",
    primary: "+977",
    secondary: "NP",
  },
  NL: {
    name: "Netherlands",
    primary: "+31",
    secondary: "NL",
  },
  AN: {
    name: "Netherlands Antilles",
    primary: "+599",
    secondary: "AN",
  },
  NC: {
    name: "New Caledonia",
    primary: "+687",
    secondary: "NC",
  },
  NZ: {
    name: "New Zealand",
    primary: "+64",
    secondary: "NZ",
  },
  NI: {
    name: "Nicaragua",
    primary: "+505",
    secondary: "NI",
  },
  NE: {
    name: "Niger",
    primary: "+227",
    secondary: "NE",
  },
  NG: {
    name: "Nigeria",
    primary: "+234",
    secondary: "NG",
  },
  NU: {
    name: "Niue",
    primary: "+683",
    secondary: "NU",
  },
  NF: {
    name: "Norfolk Island",
    primary: "+672",
    secondary: "NF",
  },
  MP: {
    name: "Northern Mariana Islands",
    primary: "+1670",
    secondary: "MP",
  },
  NO: {
    name: "Norway",
    primary: "+47",
    secondary: "NO",
  },
  OM: {
    name: "Oman",
    primary: "+968",
    secondary: "OM",
  },
  PK: {
    name: "Pakistan",
    primary: "+92",
    secondary: "PK",
  },
  PW: {
    name: "Palau",
    primary: "+680",
    secondary: "PW",
  },
  PS: {
    name: "Palestinian Territory",
    primary: "+970",
    secondary: "PS",
  },
  PA: {
    name: "Panama",
    primary: "+507",
    secondary: "PA",
  },
  PG: {
    name: "Papua New Guinea",
    primary: "+675",
    secondary: "PG",
  },
  PY: {
    name: "Paraguay",
    primary: "+595",
    secondary: "PY",
  },
  PE: {
    name: "Peru",
    primary: "+51",
    secondary: "PE",
  },
  PH: {
    name: "Philippines",
    primary: "+63",
    secondary: "PH",
  },
  PN: {
    name: "Pitcairn",
    primary: "+872",
    secondary: "PN",
  },
  PL: {
    name: "Poland",
    primary: "+48",
    secondary: "PL",
  },
  PT: {
    name: "Portugal",
    primary: "+351",
    secondary: "PT",
  },
  PR: {
    name: "Puerto Rico",
    primary: "+1939",
    secondary: "PR",
  },
  QA: {
    name: "Qatar",
    primary: "+974",
    secondary: "QA",
  },
  RO: {
    name: "Romania",
    primary: "+40",
    secondary: "RO",
  },
  RU: {
    name: "Russia",
    primary: "+7",
    secondary: "RU",
  },
  RW: {
    name: "Rwanda",
    primary: "+250",
    secondary: "RW",
  },
  RE: {
    name: "Reunion",
    primary: "+262",
    secondary: "RE",
  },
  BL: {
    name: "Saint Barthelemy",
    primary: "+590",
    secondary: "BL",
  },
  SH: {
    name: "Saint Helena",
    primary: "+290",
    secondary: "SH",
  },
  KN: {
    name: "Saint Kitts and Nevis",
    primary: "+1869",
    secondary: "KN",
  },
  LC: {
    name: "Saint Lucia",
    primary: "+1758",
    secondary: "LC",
  },
  MF: {
    name: "Saint Martin",
    primary: "+590",
    secondary: "MF",
  },
  PM: {
    name: "Saint Pierre and Miquelon",
    primary: "+508",
    secondary: "PM",
  },
  VC: {
    name: "Saint Vincent and the Grenadines",
    primary: "+1784",
    secondary: "VC",
  },
  WS: {
    name: "Samoa",
    primary: "+685",
    secondary: "WS",
  },
  SM: {
    name: "San Marino",
    primary: "+378",
    secondary: "SM",
  },
  ST: {
    name: "Sao Tome and Principe",
    primary: "+239",
    secondary: "ST",
  },
  SA: {
    name: "Saudi Arabia",
    primary: "+966",
    secondary: "SA",
  },
  SN: {
    name: "Senegal",
    primary: "+221",
    secondary: "SN",
  },
  RS: {
    name: "Serbia",
    primary: "+381",
    secondary: "RS",
  },
  SC: {
    name: "Seychelles",
    primary: "+248",
    secondary: "SC",
  },
  SL: {
    name: "Sierra Leone",
    primary: "+232",
    secondary: "SL",
  },
  SG: {
    name: "Singapore",
    primary: "+65",
    secondary: "SG",
  },
  SK: {
    name: "Slovakia",
    primary: "+421",
    secondary: "SK",
  },
  SI: {
    name: "Slovenia",
    primary: "+386",
    secondary: "SI",
  },
  SB: {
    name: "Solomon Islands",
    primary: "+677",
    secondary: "SB",
  },
  SO: {
    name: "Somalia",
    primary: "+252",
    secondary: "SO",
  },
  ZA: {
    name: "South Africa",
    primary: "+27",
    secondary: "ZA",
  },
  SS: {
    name: "South Sudan",
    primary: "+211",
    secondary: "SS",
  },
  GS: {
    name: "South Georgia and the South Sandwich Islands",
    primary: "+500",
    secondary: "GS",
  },
  ES: {
    name: "Spain",
    primary: "+34",
    secondary: "ES",
  },
  LK: {
    name: "Sri Lanka",
    primary: "+94",
    secondary: "LK",
  },
  SD: {
    name: "Sudan",
    primary: "+249",
    secondary: "SD",
  },
  SR: {
    name: "Suriname",
    primary: "+597",
    secondary: "SR",
  },
  SJ: {
    name: "Svalbard and Jan Mayen",
    primary: "+47",
    secondary: "SJ",
  },
  SZ: {
    name: "Swaziland",
    primary: "+268",
    secondary: "SZ",
  },
  SE: {
    name: "Sweden",
    primary: "+46",
    secondary: "SE",
  },
  CH: {
    name: "Switzerland",
    primary: "+41",
    secondary: "CH",
  },
  SY: {
    name: "Syrian Arab Republic",
    primary: "+963",
    secondary: "SY",
  },
  TW: {
    name: "Taiwan",
    primary: "+886",
    secondary: "TW",
  },
  TJ: {
    name: "Tajikistan",
    primary: "+992",
    secondary: "TJ",
  },
  TZ: {
    name: "Tanzania",
    primary: "+255",
    secondary: "TZ",
  },
  TH: {
    name: "Thailand",
    primary: "+66",
    secondary: "TH",
  },
  TL: {
    name: "Timor-Leste",
    primary: "+670",
    secondary: "TL",
  },
  TG: {
    name: "Togo",
    primary: "+228",
    secondary: "TG",
  },
  TK: {
    name: "Tokelau",
    primary: "+690",
    secondary: "TK",
  },
  TO: {
    name: "Tonga",
    primary: "+676",
    secondary: "TO",
  },
  TT: {
    name: "Trinidad and Tobago",
    primary: "+1868",
    secondary: "TT",
  },
  TN: {
    name: "Tunisia",
    primary: "+216",
    secondary: "TN",
  },
  TR: {
    name: "Turkey",
    primary: "+90",
    secondary: "TR",
  },
  TM: {
    name: "Turkmenistan",
    primary: "+993",
    secondary: "TM",
  },
  TC: {
    name: "Turks and Caicos Islands",
    primary: "+1649",
    secondary: "TC",
  },
  TV: {
    name: "Tuvalu",
    primary: "+688",
    secondary: "TV",
  },
  UG: {
    name: "Uganda",
    primary: "+256",
    secondary: "UG",
  },
  UA: {
    name: "Ukraine",
    primary: "+380",
    secondary: "UA",
  },
  AE: {
    name: "Emirates",
    primary: "+971",
    secondary: "AE",
  },
  GB: {
    name: "United Kingdom",
    primary: "+44",
    secondary: "GB",
  },
  US: {
    name: "United States",
    primary: "+1",
    secondary: "US",
  },
  UY: {
    name: "Uruguay",
    primary: "+598",
    secondary: "UY",
  },
  UZ: {
    name: "Uzbekistan",
    primary: "+998",
    secondary: "UZ",
  },
  VU: {
    name: "Vanuatu",
    primary: "+678",
    secondary: "VU",
  },
  VE: {
    name: "Venezuela",
    primary: "+58",
    secondary: "VE",
  },
  VN: {
    name: "Vietnam",
    primary: "+84",
    secondary: "VN",
  },
  VG: {
    name: "Virgin Islands, British",
    primary: "+1284",
    secondary: "VG",
  },
  VI: {
    name: "Virgin Islands, U.S.",
    primary: "+1340",
    secondary: "VI",
  },
  WF: {
    name: "Wallis and Futuna",
    primary: "+681",
    secondary: "WF",
  },
  YE: {
    name: "Yemen",
    primary: "+967",
    secondary: "YE",
  },
  ZM: {
    name: "Zambia",
    primary: "+260",
    secondary: "ZM",
  },
  ZW: {
    name: "Zimbabwe",
    primary: "+263",
    secondary: "ZW",
  },
};

export const aboutText = {
  title: {
    fa: "درباره ما",
    en: "About us",
    ar: "معلومات عنا",
  },
  text1: {
    fa: "پانوتک زخم‌پوش نوین سلولز باکتریایی با قابلیت ممانعت از آلودگی زخم و حمایت کامل از ترمیم زخم‌های مزمن است که به کاهش هزینه‌های بالای درمان و ارتقای سلامت بیماران می‌انجامد. پانسمان نوین زخم برای زخم‌های مزمن از جمله زخم پای دیابتی، سوختگی‌های درجه ۱ و ۲ و زخم بستر می‌باشد. این پانسمان از فناوری نوین درمان مرطوب استفاده می‌نماید و به خاطر دارا بودن نانوالیاف می‌تواند ویژگی‌های بسیار مثبتی برای درمان زخم فراهم کند. این نانوالیاف از ورود میکروارگانیسم‌ها به سطح زخم جلوگیری می‌کنند در حالی که اجازه می‌دهند اکسیژن کافی به سطح زخم برسد تا مراحل درمان زخم به خوبی پیش رود. همچنین به خاطر جذب خون و ترشحات زخم، می‌تواند مدت زمان بیشتری روی سطح زخم بماند و نیاز به تعویض متوالی پانسمان را کاهش دهد. رطوبت‌رسانی به سطح زخم علاوه بر تسهیل فرآیند درمان درد بیمار را کاهش می‌دهد و همچنین به خاطر شفافیت خود به پزشک این امکان را می‌دهد تا فرآیند درمان را بهتر مدیریت کند. محصول پانسمان نوین زخم تمامی تست‌های حساسیت‌زایی و سمیت را در کنار سایر تست‌های وارداتی لازم از طرف اداره کل تجهیزات پزشکی با موفقیت پشت سر گذاشته است و در عین سازگاری بالا با پوست بدن هیچگونه عوارضی ندارد.",
    en: "PanoTech is an innovative bacterial cellulose wound dressing with the capability to prevent wound contamination and provide complete support for the healing of chronic wounds. This advancement aims to reduce high treatment costs and enhance the health of patients. The novel wound dressing is suitable for chronic wounds, including diabetic ulcers, first and second-degree burns, and bedsores. Utilizing advanced moist wound healing technology and nanofibers structure, this dressing offers significant positive features for wound treatment. The nanofibers prevent microorganisms entering the wound surface while allowing sufficient oxygen to reach the wound, which facilitate the wound healing process. Additionally, due to high blood absorption and wound secretions, the dressing can stay on the wound surface for an extended period, reducing the need for frequent dressing changes. Moisturizing the wound surface not only eases the healing process but also reduces patient pain. The transparency of the dressing assists healthcare professionals in better managing the treatment process. The novel wound dressing has successfully passed all sensitivity and toxicity tests, along with other necessary assessments by the Medical Equipment Department, demonstrated high compatibility with the skin and caused no adverse effects.",
    ar: "بانوتک هو ضماد جروح جديد مصنوع من السليلوز البكتيري وله القدرة على منع تلوث الجروح ودعم التئام الجروح المزمنة بشكل كامل، مما يؤدي إلى تقليل تكاليف العلاج العالية وتحسين صحة المريض. ضمادة جديدة للجروح المزمنة، بما في ذلك قرح القدم السكرية، والحروق من الدرجة الأولى والثانية، وقرح الفراش. يستخدم هذا الضماد تكنولوجيا العلاج الرطب الحديثة، وبفضل أليافه النانوية، يمكنه توفير خصائص إيجابية للغاية لشفاء الجروح. تعمل هذه الألياف النانوية على منع الكائنات الحية الدقيقة من دخول سطح الجرح مع السماح بوصول كمية كافية من الأكسجين إلى سطح الجرح من أجل التئام الجرح بشكل صحيح. كما أنه من خلال امتصاص الدم وإفرازات الجروح، فإنه يمكن أن يبقى على سطح الجرح لفترة أطول من الزمن، مما يقلل من الحاجة إلى تغيير الضمادات بشكل متكرر. بالإضافة إلى تسهيل عملية الشفاء، فإن ترطيب سطح الجرح يقلل من آلام المريض، وبفضل شفافيته، يسمح للطبيب بإدارة عملية الشفاء بشكل أفضل. وقد نجح منتج ضماد الجروح الجديد في اجتياز جميع اختبارات الحساسية والسمية، إلى جانب اختبارات الاستيراد الأخرى المطلوبة، من الإدارة العامة للمعدات الطبية، وفي حين أنه متوافق للغاية مع الجلد، إلا أنه لا يسبب أي آثار جانبية.",
  },
  text2: {
    fa: "شرکت نانوزیست پلیمر پارس در سال ۱۳۹۶ در قالب استارت‌آپ نانو سلوپان شروع به کار کرد و در سال ۱۳۹۸ با تأیید کارگروه ارزیابی شرکت‌های دانش بنیان معاونت علمی و فناوری ریاست جمهوری دانش بنیان شد. این شرکت در حوزه تولید محصولات درمان زخم و مراقبت از پوست با تکیه بر تولید نانو الیاف سلولز باکتریایی فعالیت می‌کند. با توجه به سهم بالای محصولات وارداتی در کشور با تولید محصولات درمان زخم با فناوری‌های روز دنیا هزینه‌های درمانی به طور قابل توجهی کاهش می‌یابد. مشابه این فناوری در داخل کشور مورد استفاده قرار نگرفته است و این محصولات اولین نمونه‌های تجاری داخلی هستند.",
    en: "Nano Zist Polymer Pars Company, formerly known as Nanocellupan Startup, was founded in 2017 and was recognized as a knowledge-based company in 2019. The company focuses on wound treatment and skincare products derived from bacterial cellulose nanofibers. Considering the high share of imported products in the country, the production of wound care products using technologies significantly reduces medical costs. This technology has not been widely used in the country, and these products are the first domestically produced commercial examples in this field.",
    ar: "بدأت شركة نانوبيوبوليمر بارس عملها في عام 2017 كشركة ناشئة في نانو سالويان وأصبحت شركة قائمة على المعرفة في عام 2019 بموافقة من مجموعة عمل تقييم الشركات القائمة على المعرفة التابعة لنائب الرئيس للعلوم والتكنولوجيا. تعمل هذه الشركة في مجال علاج الجروح ومنتجات العناية بالبشرة، وتعتمد على إنتاج ألياف السليلوز البكتيرية النانوية. ونظراً لارتفاع حصة المنتجات المستوردة في البلاد، فمن المفترض أن يتم خفض تكاليف العلاج بشكل كبير من خلال إنتاج منتجات علاج الجروح باستخدام أحدث التقنيات. ولم يتم استخدام تكنولوجيا مماثلة في البلاد، وتعد هذه المنتجات أول الأمثلة التجارية المحلية.",
  },
};

export const technologyText = {
  title: {
    fa: "فناوری",
    en: "Technology",
    ar: "تكنولوجيا",
  },
  subTitle: {
    fa: "پانسمان نوین زخم پانوتک",
    en: "Panotek's new wound dressing",
    ar: "ضمادة الجروح الجديدة من بانوتيك",
  },
  text1: {
    fa: "در حال حاضر از پوشش‌های متفاوتی برای درمان زخم‌های مزمن استفاده می‌شود. اما پانسمان‌های معمول در فرآیند ترمیم این زخم‌ها از جمله زخم پای دیابتی و سوختگی،  نقش چندانی ندارند. «پانوتک» زخم‌پوش نوین نانو سلولز باکتریایی با قابلیت ممانعت از آلودگی زخم و حمایت کامل از ترمیم این نوع زخم‌های مزمن است که به کاهش هزینه‌های بالای درمان و ارتقای سلامت بیماران می‌انجامد.",
    en: 'Currently, different dressings are used to treat chronic wounds. However, conventional dressings do not play a significant role in the healing process of these wounds, including diabetic foot ulcers and burns. "Panotech" is a new bacterial nanocellulose wound dressing with the ability to prevent wound contamination and fully support the healing of these types of chronic wounds, which leads to a reduction in high treatment costs and improved patient health.',
    ar: 'في الوقت الحاضر، يتم استخدام ضمادات مختلفة لعلاج الجروح المزمنة. ولكن الضمادات التقليدية لا تلعب دورا هاما في عملية شفاء هذه الجروح، بما في ذلك قرح القدم السكري والحروق. "بانوتيك" هو ضماد جروح جديد مصنوع من النانوسليلوز البكتيري وله القدرة على منع تلوث الجروح ودعم التئام هذه الأنواع من الجروح المزمنة بشكل كامل، مما يؤدي إلى خفض تكاليف العلاج العالية وتحسين صحة المريض.',
  },

  text2: {
    fa: "پانسمان نوین پانوتک، متشکل از سلولز و آب می‌باشد. محصولات در بسته‌‌بندی‌های استریل عرضه می‌شوند، که با تابش اشعه استریل و ضدعفونی شده‌اند. این پانسمان، زخم را از پاتوژن‌ها (باکتری‌های بیماری‌زا) محافظت می‌کند. در واقع پانسمان با استفاده از روش درمان زخم نوین مرطوب، محیط مرطوبی را برای زخم فراهم، و ترشحات اضافی را نیز جذب می‌کند. پانسمان به دلیل ساختار نرم و منعطف خود، به راحتی با هر سطحی و شکلی از زخم سازگار می‌شود.",
    en: "The new Panotek dressing consists of cellulose and water. The products are supplied in sterile packages, which are sterilized and disinfected by irradiation. This dressing protects the wound from pathogens (pathogenic bacteria). In fact, the dressing provides a moist environment for the wound using the new moist wound treatment method and also absorbs excess secretions. Due to its soft and flexible structure, the dressing easily adapts to any surface and shape of the wound.",
    ar: "يتكون الضماد الجديد من شركة بانوتيك من السليلوز والماء. يتم توفير المنتجات في عبوات معقمة، والتي تم تعقيمها وتطهيرها بالإشعاع. تحمي هذه الضمادة الجرح من مسببات الأمراض (البكتيريا المسببة للأمراض). في الواقع، تعمل الضمادة باستخدام طريقة معالجة الجروح الرطبة الحديثة على توفير بيئة رطبة للجرح كما تعمل على امتصاص الإفرازات الزائدة. بفضل تركيبته الناعمة والمرنة، يتكيف الضماد بسهولة مع أي سطح وشكل للجرح.",
  },
};

export const profileText = {
  text: {
    fa: "سلام شما در این صفحه می‌توانید به اطلاعات خود دسترسی داشته باشید و آن را اصلاح کنید همچنین وضعیت سفارشات خود را بررسی و پیگیری نمایید",
    en: "Hello, on this page you can access and modify your information, as well as check and track the status of your orders.",
    ar: "مرحباً بك، في هذه الصفحة يمكنك الوصول إلى معلوماتك وتعديلها، بالإضافة إلى التحقق من حالة طلباتك وتتبعها.",
  },
};

export const footerText = {
  address: {
    fa: "تهران، بلوار کشاورز، نبش کوی 16 آذر، پلاک 78، طبقه پنجم، واحد 502",
    en: "unit 502, 5th floor, No.78, 16 Azar alley, Keshavarz Boulevard, Tehran, Iran",
    ar: "رقم 78، الطابق الخامس، الوحدة 502، زاوية 16 آزار، جادة كيشاورز، طهران",
  },
  fax: {
    fa: "02128428415 داخلی 2",
    en: "02128428415-2",
    ar: "02128428415 داخلی 2",
  },
  text1: {
    fa: "پانوتک تولیدکننده محصولات نوین ترمیم زخم",
    en: "Panotech, manufacturer of innovative wound healing products",
    ar: "بانوتيك، الشركة المصنعة لمنتجات التئام الجروح المبتكرة",
  },
  text2: {
    fa: " متعادل‌کننده رطوبت زخم (هیدروبالانس) ",
    en: "Balancing wound moisture (hydrobalance)",
    ar: "موازنة رطوبة الجروح (التوازن المائي)",
  },
  nanozist: {
    fa: "شرکت نانوزیست پلیمر پارس",
    en: "Nanozist Polymer Pars Co.",
    ar: " شركة نانوزيست بوليمر بارس ",
  },
  hime: {
    fa: "محصولات آرایشی و بهداشتی های می",
    en: "HiMe Cosmetics",
    ar: "منتجات تجميل های می",
  },
  faq: {
    fa: " سوالات متداول ",
    en: "FAQ",
    ar: " الأسئلة الشائعة ",
  },
};

export const homeText = {
  welcome: {
    fa: " به پانوتک خوش آمدید ",
    en: "Welcome to Panotech",
    ar: "مرحباً بكم في پانوتک",
  },
  title: {
    fa: "خانه",
    en: "Home",
    ar: "بيت",
  },
  panotech: {
    fa: "پانوتک",
    en: "Panotech",
    ar: "پانوتک",
  },
};

export const productText = {
  slider: {
    fa: "پیشنهاد شگفت‌انگیز",
    en: "Amazing Offers",
    ar: "عرض مذهل",
  },
  title: {
    fa: "فروشگاه",
    en: "Shop",
    ar: "محل",
  },
  addBTN: {
    fa: "اضافه کردن به سبد خرید",
    en: "Add to cart",
    ar: "أضف إلى السلة",
  },
  tab1: {
    fa: "مشخصات",
    en: "Specifically",
    ar: "بوضوح",
  },
  tab2: {
    fa: " راهنمای استفاده",
    en: "User Guide",
    ar: " دليل المستخدم",
  },
  tab3: {
    fa: " موارد استفاده",
    en: "Uses",
    ar: " الاستخدامات",
  },
  tab4: {
    fa: "کاتالوگ",
    en: "Catalog",
    ar: "كتالوج",
  },
  DownloadCatalog: {
    fa: "دانلود کاتالوگ",
    en: "Download catalog",
    ar: "تنزيل الكتالوج",
  },
  CatalogNotAvailable: {
    fa: "کاتالوگ موجود نیست.",
    en: "Catalog not available.",
    ar: "الكتالوج غير متوفر.",
  },
  commentBTN: {
    fa: "اضافه کردن نظر",
    en: "Add a comment",
    ar: "أضف تعليق",
  },
  text1: {
    fa: " نظر کاربران ",
    en: "User comments",
    ar: "تعليقات المستخدم",
  },
  text2: {
    fa: "نظری برای این محصول ثبت نشده است",
    en: "There are no comments for this product.",
    ar: "لا توجد تعليقات لهذا المنتج.",
  },
  text3: {
    fa: "خوشحال می‌شویم نظر خود را در خصوص این محصول ثبت کنید",
    en: "We would be happy to receive your feedback on the product.",
    ar: "سوف نكون سعداء لتلقي تعليقاتك على المنتج.",
  },
  text4: {
    fa: "نظر خود را وارد کنید",
    en: "Enter your comment.",
    ar: "أدخل تعليقك.",
  },
  comment: {
    fa: "نظر",
    en: "comment",
    ar: "تعلیق",
  },
  NonExistent: {
    fa: "ناموجود",
    en: "Non existent",
    ar: "غير موجود",
  },
};

export const blogText = {
  title: {
    fa: "وبلاگ",
    en: "Blogs",
    ar: "مدونة",
  },
  newsTitle: {
    fa: "اخبار",
    en: "News",
    ar: "أخبار",
  },
  eventTitle: {
    fa: "رویداد",
    en: "Events",
    ar: "حدث",
  },
};

export const galleryText = {
  title: {
    fa: "گالری",
    en: "Gallery",
    ar: "المعرض",
  },
  eventTitle: {
    fa: "رویداد ها",
    en: "Events",
    ar: "الأحداث",
  },
};

export const contactUsText = {
  firstName: {
    fa: "نام",
    en: "First Name",
    ar: "اسم",
  },
  lastName: {
    fa: "نام خانوادگی",
    en: "Last Name",
    ar: "اسم العائلة",
  },
  mobileNumber: {
    fa: "شماره موبایل",
    en: "Mobile Number",
    ar: "رقم الهاتف المحمول",
  },
  email: {
    fa: "پست الکترونیک",
    en: "Email",
    ar: "بريد إلكتروني",
  },
  job: {
    fa: "شغل",
    en: "Job",
    ar: "وظيفة",
  },
  request: {
    fa: "درخواست خود را وارد کنید",
    en: "Enter your request",
    ar: "أدخل طلبك.",
  },
  file: {
    fa: "لطفا یک عکس انتخاب کنید",
    en: "Please select a photo.",
    ar: "الرجاء اختيار الصورة.",
  },
  uploadBTN: {
    fa: "اضافه کردن عکس",
    en: "Add a photo",
    ar: "أضف صورة",
  },
  fileText: {
    fa: "برای آپلود فایل لازم است ایمیل را وارد کرده و کپچا را بزنید.",
    en: "To upload a file, you need to enter your email and type the captcha.",
    ar: "لتحميل ملف، يجب عليك إدخال بريدك الإلكتروني وكتابة الكابتشا.",
  },
  sendBTN: {
    fa: "ارسال",
    en: "Send",
    ar: "يرسل",
  },
};

export const cartText = {
  slider: {
    fa: "پیشنهاد برای شما",
    en: "Offer for you",
    ar: "عرض لك",
  },
  finishBtnModal: {
    BTN: {
      fa: "نهایی کردن خرید",
      en: "Complete purchase",
      ar: "إتمام الشراء",
    },
    upText: {
      fa: "لطفا پس از زدن دکمه ' نهایی کرن خرید ' مبلغ سفارش را به شماره کارت زیر واریز کنید.",
      en: "Please transfer the order amount to the card number below after clicking Complete Purchase.",
      ar: "يرجى تحويل مبلغ الطلب إلى رقم البطاقة أدناه بعد النقر فوق ' إتمام الشراء '.",
    },
    cardNumber: "1111-2222-3333-4444",
    downText: {
      fa: "و رسید پرداخت را به همراه شماره سفارش به شماره 09929469332 ارسال کنید.",
      en: "And send the payment receipt along with the order number to 09929469332.",
      ar: "وأرسل إيصال الدفع مع رقم الطلب إلى 09929469332.",
    },
  },
  cancelBtnModal: {
    BTN: {
      fa: "حذف سبد خرید",
      en: "Delete shopping cart",
      ar: "حذف عربة التسوق",
    },
    text: {
      fa: "آیا از حذف‌کردن سبد خرید اطمینان دارید؟",
      en: "Are you sure you want to delete the shopping cart?",
      ar: "هل أنت متأكد أنك تريد حذف عربة التسوق؟",
    },
  },
  totalCunt: {
    fa: "تعداد محصولات",
    en: "Number of products",
    ar: "عدد المنتجات",
  },
  totalPrice: {
    fa: "مجموع قیمت",
    en: "Total price",
    ar: "السعر الاجمالي",
  },
  discount: {
    fa: "تخفیف",
    en: "Discount",
    ar: "تخفيض",
  },
  totalPay: {
    fa: "مبلغ قابل پرداخت",
    en: "Amount payable",
    ar: "المبلغ المستحق الدفع",
  },
};

export const customizedProductText = {
  text: {
    text1: {
      fa: "لطفا برای خرید بیش از 30 عدد از این محصول",
      en: "Please",
      ar: "الرجاء",
    },
    text2: {
      fa: " کلیک ",
      en: " click ",
      ar: " الضغط ",
    },
    text3: {
      fa: "کنید.",
      en: "to purchase more than 30 pieces of this product.",
      ar: "هنا لشراء أكثر من 30 قطعة من هذا المنتج.",
    },
  },
  loginText: {
    text1: {
      fa: "لطفا برای ثبت درخواست خرید بیش از 30 عدد از این محصول",
      en: "Please",
      ar: "قم بتسجيل",
    },
    text2: {
      fa: " وارد ",
      en: " log in ",
      ar: " الدخول ",
    },
    text3: {
      fa: "شوید.",
      en: "to register a purchase request for more than 30 pieces of this product.",
      ar: "لتسجيل طلب شراء لأكثر من 30 قطعة من هذا المنتج.",
    },
  },
  customizeRequest: {
    fa: "درخواست سفارشی‌سازی محصول",
    en: "Product customization request",
    ar: "طلب تخصيص المنتج",
  },
  ContactInformation: {
    fa: " اطلاعات تماس : ",
    en: "Contact Information:",
    ar: "معلومات الاتصال:",
  },
  customReqTitle: {
    fa: "لطفاً برای خرید بیش از 30 عدد از این محصول درخواست خود را از طریق این فرم ثبت کنید",
    en: "Please submit your request via this form to purchase more than 30 pieces of this product.",
    ar: "يرجى تقديم طلبك عبر هذا النموذج لشراء أكثر من 30 قطعة من هذا المنتج.",
  },
  firstName: {
    fa: "نام",
    en: "First Name",
    ar: "اسم",
  },
  lastName: {
    fa: "نام خانوادگی",
    en: "Last Name",
    ar: "اسم العائلة",
  },
  Job: {
    fa: " شغل : ",
    en: "Job:",
    ar: "وظيفة:",
  },
  ContactNumber: {
    fa: " شماره تماس : ",
    en: "Contact Number:",
    ar: "رقم الاتصال:",
  },
  Email: {
    fa: " پست الکترونیک : ",
    en: "Email:",
    ar: "بريد إلكتروني:",
  },
  Address: {
    fa: " آدرس : ",
    en: "Address:",
    ar: "عنوان:",
  },
  ZipCode: {
    fa: " - کدپستی : ",
    en: "- Zip Code:",
    ar: "- رمز بريدي:",
  },
  Request: {
    fa: "درخواست خود را وارد کنید.",
    en: "Enter your request.",
    ar: "أدخل طلبك.",
  },
  btn: {
    fa: "ارسال اطلاعات",
    en: "Send information",
    ar: "إرسال المعلومات",
  },
  noInformation: {
    fa: "اطلاعاتی برای نمایش موجود نیست.",
    en: "There is no information to display.",
    ar: "لا يوجد معلومات لعرضها.",
  },
};

export const searchModalText = {
  title: {
    fa: " جستجو در محصولات ",
    en: "Search products",
    ar: " البحث عن المنتجات ",
  },
};

export const faqText = {
  title: {
    fa: " سوالات پرتکرار ",
    en: " FAQ ",
    ar: " الأسئلة الشائعة ",
  },
  searchTitle: {
    fa: " جستجو در سوالات پرتکرار ",
    en: "Search FAQs",
    ar: " الأسئلة الشائعة حول البحث ",
  },
  noInformation: {
    fa: "اطلاعاتی برای نمایش موجود نیست.",
    en: "There is no information to display.",
    ar: "لا يوجد معلومات لعرضها.",
  },
};

export const adminHeaderText = {
  welcome: {
    fa: " خوش آمدی ",
    en: "Welcome",
    ar: "مرحباً",
  },
  logoutStatus: {
    fa: "لطفاً وارد شوید",
    en: "Please log in",
    ar: "يرجى تسجيل الدخول",
  },
};

export const metaDataText = {
  MainLayout: {
    defaultTitle: {
      fa: "شرکت پانوتک",
      en: "Panotech",
      ar: "پانوتک",
    },
    templateTitle: {
      fa: "پانوتک",
      en: "Panotech",
      ar: "پانوتک",
    },
    description: {
      fa: "پانوتک تولیدکننده محصولات نوین ترمیم زخم، متعادل‌کننده رطوبت زخم (هیدروبالانس)",
      en: "Panotech, manufacturer of innovative wound healing products, Balancing wound moisture (hydrobalance)",
      ar: "بانوتيك، الشركة المصنعة لمنتجات التئام الجروح المبتكرة، موازنة رطوبة الجروح (التوازن المائي)",
    },
    keywords: {
      fa: ["پانوتک"],
      en: ["Panotech"],
      ar: ["پانوتک"],
    },
    owner: "Panotech",

    creator:
      "FrontEnd Developer: Mohammadhadi Sameni, BackEnd Developer: Seyed Mohammad Mahdi Hashemi",
  },
  Home: {
    title: {
      fa: " خانه ",
      en: " Home ",
      ar: " بيت ",
    },
    description: {
      fa: "پانوتک تولیدکننده محصولات نوین ترمیم زخم، متعادل کننده رطوبت زخم (هیدروبالانس)",
      en: "Panotech, manufacturer of innovative wound healing products, Balancing wound moisture (hydrobalance)",
      ar: "بانوتيك، الشركة المصنعة لمنتجات التئام الجروح المبتكرة، موازنة رطوبة الجروح (التوازن المائي)",
    },
    keywords: {
      fa: [" خانه "],
      en: [" Home "],
      ar: [" بيت "],
    },
    owner: {
      fa: ["پانوتک"],
      en: ["Panotech"],
      ar: ["پانوتک"],
    },
    feDeveloper: "Mohammadhadi Sameni",
    beDeveloper: "Seyed Mohammad Mahdi Hashemi",
    creator:
      "FrontEnd Developer: Mohammadhadi Sameni, BackEnd Developer: Seyed Mohammad Mahdi Hashemi",
  },
  Technology: {
    title: {
      fa: "فناوری",
      en: "Technology",
      ar: "تكنولوجيا",
    },
    description: {
      fa: "فناوری",
      en: "Technology",
      ar: "تكنولوجيا",
    },
    keywords: {
      fa: ["فناوری"],
      en: ["Technology"],
      ar: ["تكنولوجيا"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  Store: {
    title: {
      fa: "فروشگاه",
      en: "Store",
      ar: "محل",
    },
    description: {
      fa: "فروشگاه",
      en: "Store",
      ar: "محل",
    },
    keywords: {
      fa: ["فروشگاه"],
      en: ["Store"],
      ar: ["محل"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  Blog: {
    title: {
      fa: "وبلاگ",
      en: "Blog",
      ar: "مدونة",
    },
    newsTitle: {
      fa: "اخبار",
      en: "news",
      ar: "أخبار",
    },
    eventTitle: {
      fa: "رویداد",
      en: "event",
      ar: "حدث",
    },
    description: {
      fa: "وبلاگ",
      en: "Blog",
      ar: "مدونة",
    },
    keywords: {
      fa: ["وبلاگ"],
      en: ["Blog"],
      ar: ["مدونة"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  Gallery: {
    title: {
      fa: "گالری",
      en: "Gallery",
      ar: "المعرض",
    },
    description: {
      fa: "گالری",
      en: "Gallery",
      ar: "المعرض",
    },
    keywords: {
      fa: ["گالری"],
      en: ["Gallery"],
      ar: ["المعرض"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  About: {
    title: {
      fa: "درباره ما ",
      en: "About Us",
      ar: "معلومات عنا",
    },
    description: {
      fa: "درباره ما ",
      en: "About Us",
      ar: "معلومات عنا",
    },
    keywords: {
      fa: ["درباره ما "],
      en: ["About Us"],
      ar: ["معلومات عنا"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  Contact: {
    title: {
      fa: "تماس با ما ",
      en: "Contact Us",
      ar: "اتصل بنا",
    },
    description: {
      fa: "تماس با ما ",
      en: "Contact Us",
      ar: "اتصل بنا",
    },
    keywords: {
      fa: ["تماس با ما "],
      en: ["Contact Us"],
      ar: ["اتصل بنا"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  Cart: {
    title: {
      fa: "سبدخرید",
      en: "Cart",
      ar: "عربة التسوق",
    },
    description: {
      fa: "سبدخرید",
      en: "Cart",
      ar: "عربة التسوق",
    },
    keywords: {
      fa: ["سبدخرید"],
      en: ["Cart"],
      ar: ["عربة التسوق"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  FAQ: {
    title: {
      fa: "سوالات پر تکرار",
      en: "FAQ",
      ar: "الأسئلة الشائعة",
    },
    description: {
      fa: "سوالات پر تکرار",
      en: "FAQ",
      ar: "الأسئلة الشائعة",
    },
    keywords: {
      fa: ["سوالات پر تکرار"],
      en: ["FAQ"],
      ar: ["الأسئلة الشائعة"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  Login: {
    title: {
      fa: "ورود",
      en: "Login",
      ar: "تسجيل الدخول",
    },
    description: {
      fa: "ورود",
      en: "Login",
      ar: "تسجيل الدخول",
    },
    keywords: {
      fa: ["ورود"],
      en: ["Login"],
      ar: ["تسجيل الدخول"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  register: {
    title: {
      fa: "ثبت نام",
      en: "Register",
      ar: "يسجل",
    },
    description: {
      fa: "ثبت نام",
      en: "Register",
      ar: "يسجل",
    },
    keywords: {
      fa: ["ثبت نام"],
      en: ["Register"],
      ar: ["يسجل"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  forgotPassword: {
    title: {
      fa: "فراموشی رمز عبور",
      en: "Forgot password",
      ar: "نسيت كلمة السر",
    },
    description: {
      fa: "فراموشی رمز عبور",
      en: "Forgot password",
      ar: "نسيت كلمة السر",
    },
    keywords: {
      fa: ["فراموشی رمز عبور"],
      en: ["Forgot password"],
      ar: ["نسيت كلمة السر"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  changePassword: {
    title: {
      fa: "تغییر رمز عبور",
      en: "Change password",
      ar: "تغيير كلمة المرور",
    },
    description: {
      fa: "تغییر رمز عبور",
      en: "Change password",
      ar: "تغيير كلمة المرور",
    },
    keywords: {
      fa: ["تغییر رمز عبور"],
      en: ["Change password"],
      ar: ["تغيير كلمة المرور"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  profile: {
    title: {
      fa: "پروفایل کاربر",
      en: "User profile",
      ar: "ملف تعريف المستخدم",
    },
    description: {
      fa: "پروفایل کاربر",
      en: "User profile",
      ar: "ملف تعريف المستخدم",
    },
    keywords: {
      fa: ["پروفایل کاربر"],
      en: ["User profile"],
      ar: ["ملف تعريف المستخدم"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  accountInformation: {
    title: {
      fa: "اطلاعات حساب",
      en: "Account Information",
      ar: "معلومات الحساب",
    },
    description: {
      fa: "اطلاعات حساب",
      en: "Account Information",
      ar: "معلومات الحساب",
    },
    keywords: {
      fa: ["اطلاعات حساب"],
      en: ["Account Information"],
      ar: ["معلومات الحساب"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  customizeProduct: {
    title: {
      fa: "محصولات سفارشی",
      en: "Customize product",
      ar: "منتجات مخصصة",
    },
    description: {
      fa: "محصولات سفارشی",
      en: "Customize product",
      ar: "منتجات مخصصة",
    },
    keywords: {
      fa: ["محصولات سفارشی"],
      en: ["Customize product"],
      ar: ["منتجات مخصصة"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  orders: {
    title: {
      fa: "سفارشات",
      en: "Orders",
      ar: "طلبات",
    },
    description: {
      fa: "سفارشات",
      en: "Orders",
      ar: "طلبات",
    },
    keywords: {
      fa: ["سفارشات"],
      en: ["Orders"],
      ar: ["طلبات"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
  order: {
    title: {
      fa: "سفارش",
      en: "Order",
      ar: "طلب",
    },
    description: {
      fa: "سفارش",
      en: "Order",
      ar: "طلب",
    },
    keywords: {
      fa: ["سفارش"],
      en: ["Order"],
      ar: ["طلب"],
    },
    owner: "panotech",
    creator: "mohammadhadi sameni",
  },
};

export const loginText = {
  logoTitle: {
    fa: "پانوتک",
    en: "Panotech",
    ar: "بانوتک",
  },
  title: {
    fa: "ورود",
    en: "Login",
    ar: "الدخول",
  },
  email: {
    fa: "پست الکترونیک",
    en: "Email",
    ar: "بريد إلكتروني",
  },
  password: {
    fa: "رمزعبور",
    en: "Password",
    ar: "كلمة المرور",
  },
  btn: {
    fa: "ورود",
    en: "Login",
    ar: "الدخول",
  },
  text1: {
    fa: "رمز خود را فراموش کرده‌اید؟",
    en: "Forgot your password?",
    ar: "نسيت كلمة السر؟",
  },
  text2: {
    fa: "بازیابی رمز عبور",
    en: "Recover password",
    ar: "استعادة كلمة المرور",
  },
  text3: {
    fa: "حساب کاربری ندارید؟",
    en: "Don't have an account?",
    ar: "ليس لديك حساب؟",
  },
  text4: {
    fa: "ثبت نام کنید",
    en: "Register",
    ar: "يسجل",
  },
};

export const registerText = {
  logoTitle: {
    fa: "پانوتک",
    en: "Panotech",
    ar: "بانوتک",
  },
  title: {
    fa: "ثبت نام",
    en: "Register",
    ar: "تسجيل",
  },
  firstName: {
    fa: "نام",
    en: "First Name",
    ar: "اسم",
  },
  lastName: {
    fa: "نام خانوادگی",
    en: "Last Name",
    ar: "اسم العائلة",
  },
  mobile: {
    fa: "شماره موبایل",
    en: "Mobile Number",
    ar: "رقم الهاتف المحمول",
  },
  email: {
    fa: "پست الکترونیک",
    en: "Email",
    ar: "بريد إلكتروني",
  },
  password: {
    fa: "رمزعبور",
    en: "Password",
    ar: "كلمة المرور",
  },
  confirmPassword: {
    fa: "تکرار رمزعبور",
    en: "ConfirmPassword",
    ar: "تأكيد كلمة المرور",
  },
  btn: {
    fa: "ثبت نام",
    en: "Register",
    ar: "يسجل",
  },
  text1: {
    fa: "قبلاً ثبت نام کرده‌اید؟",
    en: "Have you already registered?",
    ar: "هل قمت بالتسجيل بالفعل؟",
  },
  text2: {
    fa: "وارد شوید",
    en: "Log in",
    ar: "تسجيل الدخول",
  },
};

export const forgetPassText = {
  logoTitle: {
    fa: "پانوتک",
    en: "Panotech",
    ar: "بانوتک",
  },
  title: {
    fa: "فراموشی رمز عبور",
    en: "Forgot password",
    ar: "نسيت كلمة السر",
  },
  email: {
    fa: "پست الکترونیک",
    en: "Email",
    ar: "بريد إلكتروني",
  },
  btn: {
    fa: "ارسال",
    en: "Send",
    ar: "يرسل",
  },
  text1: {
    fa: "ایمیلی شامل لینک صفحه تغییر رمزعبور برای شما ارسال می‌شود",
    en: "An email will be sent to you with a link to the password change page",
    ar: "سيتم إرسال بريد إلكتروني إليك يحتوي على رابط لصفحة تغيير كلمة المرور",
  },
};

export const changePassText = {
  logoTitle: {
    fa: "پانوتک",
    en: "Panotech",
    ar: "بانوتک",
  },
  title: {
    fa: "تغییر رمز عبور",
    en: "Change password",
    ar: "تغيير كلمة المرور",
  },
  email: {
    fa: "پست الکترونیک",
    en: "Email",
    ar: "بريد إلكتروني",
  },
  password: {
    fa: "رمزعبور",
    en: "Password",
    ar: "كلمة المرور",
  },
  confirmPassword: {
    fa: "تکرار رمزعبور",
    en: "ConfirmPassword",
    ar: "تأكيد كلمة المرور",
  },
  btn: {
    fa: "تغییر رمز عبور",
    en: "Change password",
    ar: "تغيير كلمة المرور",
  },
};

export const accountInfoText = {
  AccountInfo: {
    fa: " اطلاعات حساب کاربری ",
    en: "Account Information",
    ar: "معلومات الحساب",
  },
  FullName: {
    fa: " نام و نام خانوادگی",
    en: "Name and Surname",
    ar: "الاسم الأول والأخير",
  },
  firstName: {
    fa: "نام",
    en: "First Name",
    ar: "اسم",
  },
  lastName: {
    fa: "نام خانوادگی",
    en: "Last Name",
    ar: "اسم العائلة",
  },
  Number: {
    fa: " شماره موبایل",
    en: "Mobile Number",
    ar: "رقم الهاتف المحمول",
  },
  Field: {
    fa: " رشته تحصیلی",
    en: "Field of Study",
    ar: "مجال الدراسة",
  },
  Job: {
    fa: " شغل",
    en: "Job",
    ar: "وظيفة",
  },
  Address: {
    fa: " آدرس",
    en: "Address",
    ar: "عنوان",
  },
  ZipCode: {
    fa: "  کد پستی ",
    en: "Zip Code",
    ar: "رمز بريدي",
  },
  BTN: {
    fa: "ثبت اطلاعات",
    en: "Information recording",
    ar: "تسجيل المعلومات",
  },
};

export const ordersText = {
  Order: {
    fa: "سفارش",
    en: "Order",
    ar: "طلب",
  },
  Date: {
    fa: "تاریخ",
    en: "Date",
    ar: "تاريخ",
  },
  Status: {
    fa: "وضعیت",
    en: "Status",
    ar: "حالة",
  },
  Total: {
    fa: "مجموع",
    en: "Total",
    ar: "المجموع",
  },
  Transactions: {
    fa: "عملیات",
    en: "Transactions",
    ar: "عملية",
  },
  noInformation: {
    fa: "اطلاعاتی برای نمایش وجود ندارد!",
    en: "There is no information to display!",
    ar: "لا يوجد معلومات لعرضها!",
  },
  OrderNo: {
    fa: "سفارش شماره",
    en: "Order No.",
    ar: "رقم الطلب",
  },
  OrderDate: {
    fa: "تاریخ سفارش :",
    en: "Order Date:",
    ar: "تاريخ الطلب:",
  },
  OrderStatus: {
    fa: "وضعیت سفارش :",
    en: "Order Status:",
    ar: "حالة الطلب:",
  },
  OrderStatusText: {
    fa: {
      inProgress: "در حال آماده‌سازی",
      waiting: "در انتظار تایید",
      completed: "ارسال شد",
      canceled: "کنسل شد",
    },
    en: {
      inProgress: "in Progress",
      waiting: "Waiting",
      completed: "Completed",
      canceled: "Canceled",
    },
    ar: {
      inProgress: "في تَقَدم",
      waiting: "منتظر",
      completed: "اكتمل",
      canceled: "تم الإلغاء",
    },
  },
  TotalPrice: {
    fa: "مجموع قیمت :",
    en: "Total Price:",
    ar: "السعر الإجمالي:",
  },
  theNumber: {
    fa: "تعداد :",
    en: "Number:",
    ar: "تعداد :",
  },
};

export const customTostText = {
  contactUs: {
    upload: {
      Err: {
        fa: "آپلود با مشکل مواجه شد.",
        en: "There was a problem uploading.",
        ar: "حدثت مشكلة أثناء التحميل",
      },
      Success: {
        fa: "آپلود با موفقیت انجام شد.",
        en: "Upload completed successfully.",
        ar: "تم التحميل بنجاح",
      },
    },
    submit: {
      Err: {
        fa: "ارسال درخواست با مشکل مواجه شد.",
        en: "There was a problem sending the request.",
        ar: "حدثت مشكلة أثناء إرسال الطلب",
      },
      Success: {
        fa: "درخواست با موفقیت ارسال شد.",
        en: "Request sent successfully.",
        ar: "تم إرسال الطلب بنجاح",
      },
    },
  },
  products: {
    addToCart: {
      Err: {
        fa: "متاسفانه مشکلی پیش آمده است.",
        en: "Unfortunately, there was a problem.",
        ar: "لسوء الحظ، كانت هناك مشكلة.",
      },
      Success: {
        fa: "محصول با موفقیت به سبد خرید اضافه شد.",
        en: "Product successfully added to cart.",
        ar: "تمت إضافة المنتج إلى سلة التسوق بنجاح.",
      },
    },
    delFromCart: {
      Err: {
        fa: "متاسفانه مشکلی پیش آمده است.",
        en: "Unfortunately, there was a problem.",
        ar: "لسوء الحظ، كانت هناك مشكلة.",
      },
      Success: {
        fa: "محصول با موفقیت از سبد خرید حذف شد.",
        en: "The product was successfully removed from the shopping cart.",
        ar: "تم إزالة المنتج بنجاح من سلة التسوق.",
      },
    },
    finishCart: {
      Err: {
        fa: "متاسفانه مشکلی پیش آمده است.",
        en: "Unfortunately, there was a problem.",
        ar: "لسوء الحظ، كانت هناك مشكلة.",
      },
      Success: {
        fa: "خرید شما با موفقیت ثبت شد.",
        en: "Your purchase was successfully registered.",
        ar: "لقد تم تسجيل عملية الشراء الخاصة بك بنجاح.",
      },
    },
    completeInfo: {
      fa: "لطفا اطلاعات خود را تکمیل کنید",
      en: "Please complete your information.",
      ar: "يرجى استكمال معلوماتك.",
    },
    cancelCart: {
      Err: {
        fa: "متاسفانه مشکلی پیش آمده است.",
        en: "Unfortunately, there was a problem.",
        ar: "لسوء الحظ، كانت هناك مشكلة.",
      },
      Success: {
        fa: "سبدخرید با موفقیت خالی شد.",
        en: "The shopping cart was successfully emptied.",
        ar: "تم إفراغ عربة التسوق بنجاح.",
      },
    },
  },
  userInfo: {
    Err: {
      fa: "اعمال تغییرات با مشکل مواجه شد.",
      en: "There was a problem applying the changes.",
      ar: "حدثت مشكلة أثناء تطبيق التغييرات.",
    },
    Success: {
      fa: "تغییر اطلاعات با موفقیت انجام شد.",
      en: "The information was changed successfully.",
      ar: "تم تغيير المعلومات بنجاح.",
    },
  },
  login: {
    status200: {
      fa: "ورود با موفقیت انجام شد",
      en: "Login successful.",
      ar: "تم تسجيل الدخول بنجاح",
    },
    status422: {
      fa: "موارد وارد شده اشتباه است",
      en: "The items entered are not correct.",
      ar: "العناصر المدخلة غير صحيحة",
    },
    status500: {
      fa: "مشکلی در سرور پیش آمد.",
      en: "There was a problem with the server.",
      ar: "كانت هناك مشكلة مع الخادم.",
    },
  },
  register: {
    status422: {
      fa: "موارد وارد شده اشتباه است",
      en: "The items entered are not correct.",
      ar: "العناصر المدخلة غير صحيحة",
    },
    status403: {
      fa: "دسترسی غیر مجاز",
      en: "Access denied.",
      ar: "تم الرفض",
    },
    status409: {
      fa: "شما قبلاً ثبت نام کرده‌اید",
      en: "You are already registered.",
      ar: "أنت مسجل بالفعل",
    },
    status500: {
      fa: "مشکلی در سرور پیش آمد.",
      en: "There was a problem with the server.",
      ar: "كانت هناك مشكلة مع الخادم.",
    },
    status201: {
      fa: "ثبت نام با موفقیت انجام شد",
      en: "Registration was successful.",
      ar: "تم التسجيل بنجاح",
    },
    registerErr: {
      fa: "مشکلی پیش آمد.",
      en: "There was a problem.",
      ar: "كانت هناك مشكلة.",
    },
  },
  forgetPassword: {
    status422: {
      fa: "موارد وارد شده اشتباه است",
      en: "The items entered are not correct.",
      ar: "العناصر المدخلة غير صحيحة",
    },
    status403: {
      fa: "دسترسی غیر مجاز",
      en: "Access denied.",
      ar: "تم الرفض",
    },
    status404: {
      fa: "کاربری با این ایمیل ثبت نشده است",
      en: "There is no registered user with this email address.",
      ar: "المستخدم غير مسجل بهذا البريد الإلكتروني",
    },
    status500: {
      fa: "مشکلی در سرور پیش آمد.",
      en: "There was a problem with the server.",
      ar: "كانت هناك مشكلة مع الخادم.",
    },
    status200: {
      fa: "ایمیل با موفقیت ارسال شد",
      en: "Email sent successfully.",
      ar: "تم إرسال البريد الإلكتروني بنجاح",
    },
    forgetPassErr: {
      fa: "مشکلی پیش آمد.",
      en: "There was a problem.",
      ar: "كانت هناك مشكلة.",
    },
  },
  resetPassword: {
    status422: {
      fa: "موارد وارد شده اشتباه است",
      en: "The items entered are not correct.",
      ar: "العناصر المدخلة غير صحيحة",
    },
    status403: {
      fa: "دسترسی غیر مجاز",
      en: "Access denied.",
      ar: "تم الرفض",
    },
    status500: {
      fa: "مشکلی در سرور پیش آمد.",
      en: "There was a problem with the server.",
      ar: "كانت هناك مشكلة مع الخادم.",
    },
    status200: {
      fa: "رمز ورود با موفقیت تغییر کرد",
      en: "Password changed successfully.",
      ar: "تم تغيير كلمة المرور بنجاح",
    },
    resetPasErr: {
      fa: "مشکلی پیش آمد.",
      en: "There was a problem.",
      ar: "كانت هناك مشكلة.",
    },
  },
};
