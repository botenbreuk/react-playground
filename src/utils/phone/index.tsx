import { isEmpty } from 'lodash';

type CountryFormat = {
  code: string;
  dialCode: string;
  format?: string;
};

export function PhoneNumber({
  phone,
  displayAsText = false
}: {
  phone?: string;
  displayAsText?: boolean;
}) {
  if (!phone || isEmpty(phone)) {
    return null;
  }

  const formatted = formatPhone(phone);
  return displayAsText ? (
    <>{formatted}</>
  ) : (
    <a href={`tel:${phone}`}>{formatted}</a>
  );
}

export function getCountryCodes() {
  return countries.map(country => country.code);
}

function formatPhone(phone: string) {
  // Default format is based on the default of the react-phone-input-2 library
  const { format = '... ... ... ... ..', dialCode } = getCountry(phone);

  // Phonenumber with the stripped area code
  const strippedNumber = phone.replace(new RegExp(`^(\\+${dialCode})`), '');

  const phoneNumber = strippedNumber.split('');
  const phoneFormat = format.split('');
  const formatted = [];

  let count = 0;
  for (let i = 0; i < phoneFormat.length; i++) {
    if (phoneFormat[i] === '.') {
      formatted.push(phoneNumber[count]);
      count++;
    } else {
      formatted.push(phoneFormat[i]);
    }
  }

  return `+${dialCode} ${formatted.join('')}${phone.substring(
    count + dialCode.length + 1
  )}`;
}

// Get the country phone object based on the first numbers of the phone number
function getCountry(phone: string) {
  const country = countries.find(country =>
    new RegExp(`^(\\+${country.dialCode})`).test(phone)
  );
  return country || countries[0];
}

// Properties like the format are based on the values found in this library:
// - https://github.com/bl00mber/react-phone-input-2/blob/master/src/rawCountries.js
const countries: CountryFormat[] = [
  {
    code: 'nl',
    dialCode: '31',
    format: '.. ........'
  },
  {
    code: 'be',
    dialCode: '32',
    format: '... .. .. ..'
  },
  {
    code: 'lu',
    dialCode: '352'
  },
  {
    code: 'de',
    dialCode: '49',
    format: '.... ........'
  },
  {
    code: 'gb',
    dialCode: '44',
    format: '.... ......'
  }
];
