import { IoPhonePortraitOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import { PiHeadphonesLight } from 'react-icons/pi';
import { BsSmartwatch } from 'react-icons/bs';
import { IoCameraSharp } from 'react-icons/io5';
import { FaGamepad } from 'react-icons/fa6';

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
