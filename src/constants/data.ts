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

export const heroData = {
  heading: 'iPhone 16',
  subHeading: 'Pro',
  description: 'Created to change everything for the better. For everyone',
  buttonText: 'Shop Now',
  tagline: 'Pro.Beyond.',
};

export const productData = {
  product1: {
    name: 'Playstation 5',
    description: 'Incredibly powerful CPUs, GPUs, and an SSD with',
    description2: 'integrated I/O will redefine your PlayStation experience.',
  },
  product2: {
    name: 'Apple AirPods Max',
    description: "Computational audio. Listen, it's powerful",
  },
  product3: {
    name: 'Apple Vision Pro',
    description: 'An immersive way to experience entertainment',
  },
  product4: {
    name: 'Macbook Air',
    description:
      'The new M2 chip makes every task fly—from everyday multitasking to your most demanding workflows',
  },
  buttonText: 'Shop Now',
};
