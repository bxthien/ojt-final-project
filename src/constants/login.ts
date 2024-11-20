import GoogleIC from '../assets/svgs/Google.svg';
import AppleIC from '../assets/svgs/Apple.svg';
import FbIC from '../assets/svgs/Fb.svg';

export const authenticationType = [
  { label: 'common.button.signIn', value: 'sign-in', href: '/sign-in' },
  { label: 'common.button.register', value: 'register', href: '/register' },
];

export const thirdMethod = [
  { logo: GoogleIC, value: 'Google' },
  { logo: AppleIC, value: 'Apple' },
  { logo: FbIC, value: 'Facebook' },
];
