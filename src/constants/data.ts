import { IoPhonePortraitOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import { PiHeadphonesLight } from 'react-icons/pi';
import { BsSmartwatch } from 'react-icons/bs';
import { IoCameraSharp } from 'react-icons/io5';
import { FaGamepad } from 'react-icons/fa6';
import { FaTwitter, FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';

export const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
];

export const categoryItems = [
  { href: '/phones', label: 'Phones', Icon: IoPhonePortraitOutline },
  { href: '/computers', label: 'Computers', Icon: MdComputer },
  { href: '/smart-watches', label: 'Smart Watches', Icon: BsSmartwatch },
  { href: '/cameras', label: 'Cameras', Icon: IoCameraSharp },
  { href: '/headphones', label: 'Headphones', Icon: PiHeadphonesLight },
  { href: '/gaming', label: 'Gaming', Icon: FaGamepad },
];

export const socialData = [
  { href: '#', label: 'Twitter', icon: FaTwitter },
  { href: '#', label: 'Facebook', icon: FaFacebook },
  { href: '#', label: 'TikTok', icon: FaTiktok },
  { href: '#', label: 'Instagram', icon: FaInstagram },
];

export const contentData = [
  'We are a technology shopping platform located in Vietnam,',
  'which provides you with top-notch technology.',
];

export const servicesData = [
  'Bonus program',
  'Gift cards',
  'Credit and payment',
  'Service contracts',
  'Non-cash account',
  'Payment',
];

export const assistanceData = [
  'Find an order',
  'Terms of delivery',
  'Exchange and return of goods',
  'Guarantee',
  'Frequently asked questions',
  'Terms of use of the site',
];
