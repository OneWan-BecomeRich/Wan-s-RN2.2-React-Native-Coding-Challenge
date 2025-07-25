// List of countries, their dial codes, and alpha2 codes
const countryCodesList = [
    {name: 'Afghanistan', code: '93', alpha2: 'AF'},
    {name: 'Albania', code: '355', alpha2: 'AL'},
    {name: 'Algeria', code: '213', alpha2: 'DZ'},
    {name: 'American Samoa', code: '1-684', alpha2: 'AS'},
    {name: 'Andorra', code: '376', alpha2: 'AD'},
    {name: 'Angola', code: '244', alpha2: 'AO'},
    {name: 'Anguilla', code: '1-264', alpha2: 'AI'},
    {name: 'Antarctica', code: '672', alpha2: 'AQ'},
    {name: 'Antigua and Barbuda', code: '1-268', alpha2: 'AG'},
    {name: 'Argentina', code: '54', alpha2: 'AR'},
    {name: 'Armenia', code: '374', alpha2: 'AM'},
    {name: 'Aruba', code: '297', alpha2: 'AW'},
    {name: 'Australia', code: '61', alpha2: 'AU'},
    {name: 'Austria', code: '43', alpha2: 'AT'},
    {name: 'Azerbaijan', code: '994', alpha2: 'AZ'},
    {name: 'Bahamas', code: '1-242', alpha2: 'BS'},
    {name: 'Bahrain', code: '973', alpha2: 'BH'},
    {name: 'Bangladesh', code: '880', alpha2: 'BD'},
    {name: 'Barbados', code: '1-246', alpha2: 'BB'},
    {name: 'Belarus', code: '375', alpha2: 'BY'},
    {name: 'Belgium', code: '32', alpha2: 'BE'},
    {name: 'Belize', code: '501', alpha2: 'BZ'},
    {name: 'Benin', code: '229', alpha2: 'BJ'},
    {name: 'Bermuda', code: '1-441', alpha2: 'BM'},
    {name: 'Bhutan', code: '975', alpha2: 'BT'},
    {name: 'Bolivia', code: '591', alpha2: 'BO'},
    {name: 'Bosnia and Herzegovina', code: '387', alpha2: 'BA'},
    {name: 'Botswana', code: '267', alpha2: 'BW'},
    {name: 'Brazil', code: '55', alpha2: 'BR'},
    {name: 'British Indian Ocean Territory', code: '246', alpha2: 'IO'},
    {name: 'British Virgin Islands', code: '1-284', alpha2: 'VG'},
    {name: 'Brunei', code: '673', alpha2: 'BN'},
    {name: 'Bulgaria', code: '359', alpha2: 'BG'},
    {name: 'Burkina Faso', code: '226', alpha2: 'BF'},
    {name: 'Burundi', code: '257', alpha2: 'BI'},
    {name: 'Cambodia', code: '855', alpha2: 'KH'},
    {name: 'Cameroon', code: '237', alpha2: 'CM'},
    {name: 'Canada', code: '1', alpha2: 'CA'},
    {name: 'Cape Verde', code: '238', alpha2: 'CV'},
    {name: 'Cayman Islands', code: '1-345', alpha2: 'KY'},
    {name: 'Central African Republic', code: '236', alpha2: 'CF'},
    {name: 'Chad', code: '235', alpha2: 'TD'},
    {name: 'Chile', code: '56', alpha2: 'CL'},
    {name: 'China', code: '86', alpha2: 'CN'},
    {name: 'Christmas Island', code: '61', alpha2: 'CX'},
    {name: 'Cocos Islands', code: '61', alpha2: 'CC'},
    {name: 'Colombia', code: '57', alpha2: 'CO'},
    {name: 'Comoros', code: '269', alpha2: 'KM'},
    {name: 'Cook Islands', code: '682', alpha2: 'CK'},
    {name: 'Costa Rica', code: '506', alpha2: 'CR'},
    {name: 'Croatia', code: '385', alpha2: 'HR'},
    {name: 'Cuba', code: '53', alpha2: 'CU'},
    {name: 'Curacao', code: '599', alpha2: 'CW'},
    {name: 'Cyprus', code: '357', alpha2: 'CY'},
    {name: 'Czech Republic', code: '420', alpha2: 'CZ'},
    {name: 'Democratic Republic of the Congo', code: '243', alpha2: 'CD'},
    {name: 'Denmark', code: '45', alpha2: 'DK'},
    {name: 'Djibouti', code: '253', alpha2: 'DJ'},
    {name: 'Dominica', code: '1-767', alpha2: 'DM'},
    {name: 'Dominican Republic', code: '1-809, 1-829, 1-849', alpha2: 'DO'},
    {name: 'East Timor', code: '670', alpha2: 'TL'},
    {name: 'Ecuador', code: '593', alpha2: 'EC'},
    {name: 'Egypt', code: '20', alpha2: 'EG'},
    {name: 'El Salvador', code: '503', alpha2: 'SV'},
    {name: 'Equatorial Guinea', code: '240', alpha2: 'GQ'},
    {name: 'Eritrea', code: '291', alpha2: 'ER'},
    {name: 'Estonia', code: '372', alpha2: 'EE'},
    {name: 'Ethiopia', code: '251', alpha2: 'ET'},
    {name: 'Falkland Islands', code: '500', alpha2: 'FK'},
    {name: 'Faroe Islands', code: '298', alpha2: 'FO'},
    {name: 'Fiji', code: '679', alpha2: 'FJ'},
    {name: 'Finland', code: '358', alpha2: 'FI'},
    {name: 'France', code: '33', alpha2: 'FR'},
    {name: 'French Polynesia', code: '689', alpha2: 'PF'},
    {name: 'Gabon', code: '241', alpha2: 'GA'},
    {name: 'Gambia', code: '220', alpha2: 'GM'},
    {name: 'Georgia', code: '995', alpha2: 'GE'},
    {name: 'Germany', code: '49', alpha2: 'DE'},
    {name: 'Ghana', code: '233', alpha2: 'GH'},
    {name: 'Gibraltar', code: '350', alpha2: 'GI'},
    {name: 'Greece', code: '30', alpha2: 'GR'},
    {name: 'Greenland', code: '299', alpha2: 'GL'},
    {name: 'Grenada', code: '1-473', alpha2: 'GD'},
    {name: 'Guam', code: '1-671', alpha2: 'GU'},
    {name: 'Guatemala', code: '502', alpha2: 'GT'},
    {name: 'Guernsey', code: '44-1481', alpha2: 'GG'},
    {name: 'Guinea', code: '224', alpha2: 'GN'},
    {name: 'Guinea-Bissau', code: '245', alpha2: 'GW'},
    {name: 'Guyana', code: '592', alpha2: 'GY'},
    {name: 'Haiti', code: '509', alpha2: 'HT'},
    {name: 'Honduras', code: '504', alpha2: 'HN'},
    {name: 'Hong Kong', code: '852', alpha2: 'HK'},
    {name: 'Hungary', code: '36', alpha2: 'HU'},
    {name: 'Iceland', code: '354', alpha2: 'IS'},
    {name: 'India', code: '91', alpha2: 'IN'},
    {name: 'Indonesia', code: '62', alpha2: 'ID'},
    {name: 'Iran', code: '98', alpha2: 'IR'},
    {name: 'Iraq', code: '964', alpha2: 'IQ'},
    {name: 'Ireland', code: '353', alpha2: 'IE'},
    {name: 'Isle of Man', code: '44-1624', alpha2: 'IM'},
    {name: 'Israel', code: '972', alpha2: 'IL'},
    {name: 'Italy', code: '39', alpha2: 'IT'},
    {name: 'Ivory Coast', code: '225', alpha2: 'CI'},
    {name: 'Jamaica', code: '1-876', alpha2: 'JM'},
    {name: 'Japan', code: '81', alpha2: 'JP'},
    {name: 'Jersey', code: '44-1534', alpha2: 'JE'},
    {name: 'Jordan', code: '962', alpha2: 'JO'},
    {name: 'Kazakhstan', code: '7', alpha2: 'KZ'},
    {name: 'Kenya', code: '254', alpha2: 'KE'},
    {name: 'Kiribati', code: '686', alpha2: 'KI'},
    {name: 'Kosovo', code: '383', alpha2: 'XK'},
    {name: 'Kuwait', code: '965', alpha2: 'KW'},
    {name: 'Kyrgyzstan', code: '996', alpha2: 'KG'},
    {name: 'Laos', code: '856', alpha2: 'LA'},
    {name: 'Latvia', code: '371', alpha2: 'LV'},
    {name: 'Lebanon', code: '961', alpha2: 'LB'},
    {name: 'Lesotho', code: '266', alpha2: 'LS'},
    {name: 'Liberia', code: '231', alpha2: 'LR'},
    {name: 'Libya', code: '218', alpha2: 'LY'},
    {name: 'Liechtenstein', code: '423', alpha2: 'LI'},
    {name: 'Lithuania', code: '370', alpha2: 'LT'},
    {name: 'Luxembourg', code: '352', alpha2: 'LU'},
    {name: 'Macau', code: '853', alpha2: 'MO'},
    {name: 'Macedonia', code: '389', alpha2: 'MK'},
    {name: 'Madagascar', code: '261', alpha2: 'MG'},
    {name: 'Malawi', code: '265', alpha2: 'MW'},
    {name: 'Malaysia', code: '60', alpha2: 'MY'},
    {name: 'Maldives', code: '960', alpha2: 'MV'},
    {name: 'Mali', code: '223', alpha2: 'ML'},
    {name: 'Malta', code: '356', alpha2: 'MT'},
    {name: 'Marshall Islands', code: '692', alpha2: 'MH'},
    {name: 'Mauritania', code: '222', alpha2: 'MR'},
    {name: 'Mauritius', code: '230', alpha2: 'MU'},
    {name: 'Mayotte', code: '262', alpha2: 'YT'},
    {name: 'Mexico', code: '52', alpha2: 'MX'},
    {name: 'Micronesia', code: '691', alpha2: 'FM'},
    {name: 'Moldova', code: '373', alpha2: 'MD'},
    {name: 'Monaco', code: '377', alpha2: 'MC'},
    {name: 'Mongolia', code: '976', alpha2: 'MN'},
    {name: 'Montenegro', code: '382', alpha2: 'ME'},
    {name: 'Montserrat', code: '1-664', alpha2: 'MS'},
    {name: 'Morocco', code: '212', alpha2: 'MA'},
    {name: 'Mozambique', code: '258', alpha2: 'MZ'},
    {name: 'Myanmar', code: '95', alpha2: 'MM'},
    {name: 'Namibia', code: '264', alpha2: 'NA'},
    {name: 'Nauru', code: '674', alpha2: 'NR'},
    {name: 'Nepal', code: '977', alpha2: 'NP'},
    {name: 'Netherlands', code: '31', alpha2: 'NL'},
    {name: 'Netherlands Antilles', code: '599', alpha2: 'AN'},
    {name: 'New Caledonia', code: '687', alpha2: 'NC'},
    {name: 'New Zealand', code: '64', alpha2: 'NZ'},
    {name: 'Nicaragua', code: '505', alpha2: 'NI'},
    {name: 'Niger', code: '227', alpha2: 'NE'},
    {name: 'Nigeria', code: '234', alpha2: 'NG'},
    {name: 'Niue', code: '683', alpha2: 'NU'},
    {name: 'North Korea', code: '850', alpha2: 'KP'},
    {name: 'Northern Mariana Islands', code: '1-670', alpha2: 'MP'},
    {name: 'Norway', code: '47', alpha2: 'NO'},
    {name: 'Oman', code: '968', alpha2: 'OM'},
    {name: 'Pakistan', code: '92', alpha2: 'PK'},
    {name: 'Palau', code: '680', alpha2: 'PW'},
    {name: 'Palestine', code: '970', alpha2: 'PS'},
    {name: 'Panama', code: '507', alpha2: 'PA'},
    {name: 'Papua New Guinea', code: '675', alpha2: 'PG'},
    {name: 'Paraguay', code: '595', alpha2: 'PY'},
    {name: 'Peru', code: '51', alpha2: 'PE'},
    {name: 'Philippines', code: '63', alpha2: 'PH'},
    {name: 'Pitcairn', code: '64', alpha2: 'PN'},
    {name: 'Poland', code: '48', alpha2: 'PL'},
    {name: 'Portugal', code: '351', alpha2: 'PT'},
    {name: 'Puerto Rico', code: '1-787, 1-939', alpha2: 'PR'},
    {name: 'Qatar', code: '974', alpha2: 'QA'},
    {name: 'Republic of the Congo', code: '242', alpha2: 'CG'},
    {name: 'Reunion', code: '262', alpha2: 'RE'},
    {name: 'Romania', code: '40', alpha2: 'RO'},
    {name: 'Russia', code: '7', alpha2: 'RU'},
    {name: 'Rwanda', code: '250', alpha2: 'RW'},
    {name: 'Saint Barthelemy', code: '590', alpha2: 'BL'},
    {name: 'Saint Helena', code: '290', alpha2: 'SH'},
    {name: 'Saint Kitts and Nevis', code: '1-869', alpha2: 'KN'},
    {name: 'Saint Lucia', code: '1-758', alpha2: 'LC'},
    {name: 'Saint Martin', code: '590', alpha2: 'MF'},
    {name: 'Saint Pierre and Miquelon', code: '508', alpha2: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: '1-784', alpha2: 'VC'},
    {name: 'Samoa', code: '685', alpha2: 'WS'},
    {name: 'San Marino', code: '378', alpha2: 'SM'},
    {name: 'Sao Tome and Principe', code: '239', alpha2: 'ST'},
    {name: 'Saudi Arabia', code: '966', alpha2: 'SA'},
    {name: 'Senegal', code: '221', alpha2: 'SN'},
    {name: 'Serbia', code: '381', alpha2: 'RS'},
    {name: 'Seychelles', code: '248', alpha2: 'SC'},
    {name: 'Sierra Leone', code: '232', alpha2: 'SL'},
    {name: 'Singapore', code: '65', alpha2: 'SG'},
    {name: 'Sint Maarten', code: '1-721', alpha2: 'SX'},
    {name: 'Slovakia', code: '421', alpha2: 'SK'},
    {name: 'Slovenia', code: '386', alpha2: 'SI'},
    {name: 'Solomon Islands', code: '677', alpha2: 'SB'},
    {name: 'Somalia', code: '252', alpha2: 'SO'},
    {name: 'South Africa', code: '27', alpha2: 'ZA'},
    {name: 'South Korea', code: '82', alpha2: 'KR'},
    {name: 'South Sudan', code: '211', alpha2: 'SS'},
    {name: 'Spain', code: '34', alpha2: 'ES'},
    {name: 'Sri Lanka', code: '94', alpha2: 'LK'},
    {name: 'Sudan', code: '249', alpha2: 'SD'},
    {name: 'Suriname', code: '597', alpha2: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: '47', alpha2: 'SJ'},
    {name: 'Swaziland', code: '268', alpha2: 'SZ'},
    {name: 'Sweden', code: '46', alpha2: 'SE'},
    {name: 'Switzerland', code: '41', alpha2: 'CH'},
    {name: 'Syria', code: '963', alpha2: 'SY'},
    {name: 'Taiwan', code: '886', alpha2: 'TW'},
    {name: 'Tajikistan', code: '992', alpha2: 'TJ'},
    {name: 'Tanzania', code: '255', alpha2: 'TZ'},
    {name: 'Thailand', code: '66', alpha2: 'TH'},
    {name: 'Togo', code: '228', alpha2: 'TG'},
    {name: 'Tokelau', code: '690', alpha2: 'TK'},
    {name: 'Tonga', code: '676', alpha2: 'TO'},
    {name: 'Trinidad and Tobago', code: '1-868', alpha2: 'TT'},
    {name: 'Tunisia', code: '216', alpha2: 'TN'},
    {name: 'Turkey', code: '90', alpha2: 'TR'},
    {name: 'Turkmenistan', code: '993', alpha2: 'TM'},
    {name: 'Turks and Caicos Islands', code: '1-649', alpha2: 'TC'},
    {name: 'Tuvalu', code: '688', alpha2: 'TV'},
    {name: 'U.S. Virgin Islands', code: '1-340', alpha2: 'VI'},
    {name: 'Uganda', code: '256', alpha2: 'UG'},
    {name: 'Ukraine', code: '380', alpha2: 'UA'},
    {name: 'United Arab Emirates', code: '971', alpha2: 'AE'},
    {name: 'United Kingdom', code: '44', alpha2: 'GB'},
    {name: 'United States', code: '1', alpha2: 'US'},
    {name: 'Uruguay', code: '598', alpha2: 'UY'},
    {name: 'Uzbekistan', code: '998', alpha2: 'UZ'},
    {name: 'Vanuatu', code: '678', alpha2: 'VU'},
    {name: 'Vatican', code: '379', alpha2: 'VA'},
    {name: 'Venezuela', code: '58', alpha2: 'VE'},
    {name: 'Vietnam', code: '84', alpha2: 'VN'},
    {name: 'Wallis and Futuna', code: '681', alpha2: 'WF'},
    {name: 'Western Sahara', code: '212', alpha2: 'EH'},
    {name: 'Yemen', code: '967', alpha2: 'YE'},
    {name: 'Zambia', code: '260', alpha2: 'ZM'},
    {name: 'Zimbabwe', code: '263', alpha2: 'ZW'},
];

// Use the country code to get the flag emoji
function getCountryFlagEmoji(countryCode) {
    return countryCode
        .split('')
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
}

// Convert countryCodesList object into an array
export const CountryCodesList = countryCodesList.map(({name, code, alpha2}) => ({
    name: name,
    code: '(+'+code+')',
    value: alpha2,
    flag: getCountryFlagEmoji(alpha2),
}));