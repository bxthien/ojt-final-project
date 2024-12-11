import { IoPhonePortraitOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import { PiHeadphonesLight } from 'react-icons/pi';
import { BsSmartwatch } from 'react-icons/bs';
import { IoCameraSharp } from 'react-icons/io5';
import { FaGamepad } from 'react-icons/fa6';
import { FaTwitter, FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';
import { t } from 'i18next';
// import Iphone16 from '../assets/photoss/Iphone16-hero.png';

export const menuItems = [
  { href: '/', label: 'common.button.home' },
  { href: '/product', label: 'common.button.product' },
  { href: '/contact', label: 'common.button.contactUs' },
];

export const categoryItems = [
  { href: '/phone', label: 'common.button.phone', Icon: IoPhonePortraitOutline },
  { href: '/computer', label: 'common.button.computer', Icon: MdComputer },
  { href: '/smart-watche', label: 'common.button.smartWatch', Icon: BsSmartwatch },
  { href: '/camera', label: 'common.button.camera', Icon: IoCameraSharp },
  { href: '/headphone', label: 'common.button.headphone', Icon: PiHeadphonesLight },
  { href: '/gaming', label: 'common.button.gaming', Icon: FaGamepad },
];

export const socialData = [
  { href: '#', label: 'Twitter', icon: FaTwitter },
  { href: '#', label: 'Facebook', icon: FaFacebook },
  { href: '#', label: 'TikTok', icon: FaTiktok },
  { href: '#', label: 'Instagram', icon: FaInstagram },
];

export const contentData = ['content.part1', 'content.part2'];

export const servicesData = [
  'footer.services.bonusProgram',
  'footer.services.giftCards',
  'footer.services.creditAndPayment',
  'footer.services.serviceContracts',
  'footer.services.nonCashAccount',
  'footer.services.payment',
];

export const assistanceData = [
  'footer.assistance.findOrder',
  'footer.assistance.termsOfDelivery',
  'footer.assistance.exchangeAndReturn',
  'footer.assistance.guarantee',
  'footer.assistance.faq',
  'footer.assistance.termsOfUse',
];

export const heroData = {
  heading: t('hero.heading'),
  subHeading: t('hero.subHeading'),
  description: t('hero.description'),
  buttonText: t('hero.buttonText'),
  tagline: t('hero.tagline'),
};

export const productData = {
  product1: {
    name: 'product.product1.name',
    description: 'product.product1.description',
  },
  product2: {
    name: 'product.product2.name',
    description: 'product.product2.description',
  },
  product3: {
    name: 'product.product3.name',
    description: 'product.product3.description',
  },
  product4: {
    name: 'product.product4.name',
    description: 'product.product4.description',
  },
  buttonText: 'product.buttonText',
  altText: {
    playstation: 'product.playstationAltText',
    headphone: 'product.headphoneAltText',
    appleVision: 'product.appleVisionAltText',
    macbook: 'product.macbookAltText',
  },
};

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
}

export const filterSections = [
  {
    id: 'price',
    title: t('filter.price'),
    isOpen: true,
  },
  {
    id: 'brand',
    title: t('filter.brand'),
    isOpen: true,
    items: [
      { id: 'apple', name: 'Apple' },
      { id: 'samsung', name: 'Samsung' },
      { id: 'xiaomi', name: 'Xiaomi' },
      { id: 'oppo', name: 'OPPO' },
      { id: 'honor', name: 'Honor' },
      { id: 'motorola', name: 'Motorola' },
      { id: 'nokia', name: 'Nokia' },
      { id: 'realme', name: 'Realme' },
    ],
  },
  {
    id: 'memory',
    title: t('filter.memory'),
    isOpen: true,
    items: [
      { id: '16gb', name: '16GB' },
      { id: '32gb', name: '32GB' },
      { id: '64gb', name: '64GB' },
      { id: '128gb', name: '128GB' },
      { id: '256gb', name: '256GB' },
      { id: '512gb', name: '512GB' },
    ],
  },
];
