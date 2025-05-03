
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/noel-regis-aa07081b1/' },
    { name: 'GitHub', url: 'https://github.com/noelregis18' },
    { name: 'Twitter', url: 'https://x.com/NoelRegis8' },
    { name: 'Topmate', url: 'http://topmate.io/noel_regis' },
  ];

  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Wishify</h3>
            <p className="text-muted-foreground">
              Create and share wishlists with your friends and family.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="mailto:noel.regis04@gmail.com"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Email: noel.regis04@gmail.com
              </a>
              <a
                href="tel:+917319546900"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Phone: +91 7319546900
              </a>
              <a
                href="https://www.google.com/maps/place/Asansol,+West+Bengal,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Location: Asansol, West Bengal, India
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Wishify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
