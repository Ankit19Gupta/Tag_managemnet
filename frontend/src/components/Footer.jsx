import { Facebook, Instagram, Linkedin, Tags, Twitter } from "lucide-react";
import { Link } from "react-router-dom";




const Footer = () => {
    
  return (
      <div className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Tags className="w-6 h-6 text-sidebar-primary" />
              <span>TagMaster</span>
            </Link>
            <p className="text-sidebar-foreground/80 mb-4">
              Automate your Shopify product tagging with AI-powered intelligence and rule-based automation.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sidebar-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sidebar-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-sidebar-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-sidebar-primary transition-colors">
                <Instagram className="w-5 h-5" />
               
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors"> 
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors"> 
                    About Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="https://www.cybez.com" target="_blank">
                Cybez</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sidebar-foreground/60">
          <p>&copy; {new Date().getFullYear()} TagMaster. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
