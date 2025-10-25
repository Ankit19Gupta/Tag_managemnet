import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Tags } from 'lucide-react';

const Navbar = () => {
  return (
    <div className=" border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="   px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-3xl">
          <Tags className="w-6 h-6 text-primary " />
          <span className='text-5x'>TagMaster</span>
        </Link>
        
        <div className="flex items-center gap-4 text-sm">
            <Button asChild variant="ghost"> 
                {/* <Link to="/auth">Dashboard</Link> */}
                <Link to="/dashboard" >
                  Dashboard
                </Link>
               </Button>
                 
          <Button asChild variant="ghost">
            <Link to="/pricing">Pricing</Link>
          </Button>
          <Button asChild variant="ghost">
            {/* <Button>Contact</Button> */}
            <Link to="/contact">Contact</Link>
          </Button>
          <Button asChild>
            {/* <Button>Sign In</Button> */}
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
