import { socialData, contentData, servicesData, assistanceData } from '../constants/data';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-5 mb-0">
      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-[2fr_1fr_1fr] text-center md:text-left">
        <div>
          <a href="/">
            <p className="text-2xl font-bold mb-2 cursor-pointer">▼iperS</p>
          </a>
          <p className="text-base mb-7 mt-4">
            {contentData.map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>

          {/* Social Media Icons */}
          <div className="hidden md:flex space-x-4 mb-2 mt-8">
            {socialData.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white text-3xl hover:text-[#CFCFCF]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Services</h3>
          <ul className="text-sm space-y-1">
            {servicesData.map((service) => (
              <li key={service}>
                <a href="#" className="hover:text-[#CFCFCF]">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Assistance Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Assistance to the Buyer</h3>
          <ul className="text-sm space-y-1">
            {assistanceData.map((assistance) => (
              <li key={assistance}>
                <a href="#" className="hover:text-[#CFCFCF]">
                  {assistance}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Media Icons for Mobile */}
          <div className="flex justify-center space-x-4 mb-2 mt-8 md:hidden">
            {socialData.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white text-3xl hover:text-[#CFCFCF]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>▼iperS © Copyright 2024 | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
