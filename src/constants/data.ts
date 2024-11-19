import { IoPhonePortraitOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import { PiHeadphonesLight } from 'react-icons/pi';
import { BsSmartwatch } from 'react-icons/bs';
import { IoCameraSharp } from 'react-icons/io5';
import { FaGamepad } from 'react-icons/fa6';
import { FaTwitter, FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';
import Iphone16 from '../assets/images/Iphone16-hero.png';

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
    description:
      'Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience',
    description2: '.',
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

export interface Product {
  id: string; // Adjust the type according to your actual data
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Apple iPhone 14 Pro Max 128GB Deep Purple',
    price: 900,
    image: Iphone16,
  },
  {
    id: '2',
    name: 'Blackmagic Pocket Cinema Camera 6K',
    price: 2535,
    image: Iphone16,
  },
  {
    id: '3',
    name: 'Apple Watch Series 6 GPS 41mm Starlight Aluminum Case',
    price: 399,
    image: Iphone16,
  },
  {
    id: '4',
    name: 'AirPods Max Silver',
    price: 549,
    image: Iphone16,
  },
  {
    id: '5',
    name: 'Samsung Galaxy Watch6 Classic 47mm Black',
    price: 369,
    image: Iphone16,
  },
  {
    id: '6',
    name: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
    price: 1799,
    image: Iphone16,
  },
  {
    id: '7',
    name: 'Galaxy Buds FE Graphite',
    price: 99.99,
    image: Iphone16,
  },
  {
    id: '8',
    name: "Apple iPad 9 10.2' 64GB Wi-Fi Silver (MK2L3)",
    price: 398,
    image: Iphone16,
  },
];