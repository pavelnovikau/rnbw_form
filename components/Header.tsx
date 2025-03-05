import React from 'react';
import { Button } from '@/components/ui/button';
import { MoveUpRight, LayoutGrid } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-accent/20 bg-background/60 backdrop-blur-sm py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-accent-foreground p-2 rounded-md">
            <LayoutGrid className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">RNBW</span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
          <a href="#survey-form" className="text-foreground hover:text-primary transition-colors">Survey</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
        </nav>
        
        <Button size="sm" className="group">
          Learn More
          <MoveUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </div>

      <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 pb-16">
        <div className="md:w-1/2 space-y-6 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            The Next Generation <br />
            <span>RNBW Device</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Experience unprecedented convenience and innovation with our upcoming RNBW device. Help shape its development by sharing your feedback.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button size="lg" className="group">
              Pre-register 
              <MoveUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#survey-form">Take the Survey</a>
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-foreground rounded-2xl blur opacity-30"></div>
            <div className="relative bg-card h-64 w-64 md:h-80 md:w-80 rounded-2xl shadow-xl flex items-center justify-center border border-accent/20">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent-foreground rounded-full flex items-center justify-center">
                  <LayoutGrid className="h-12 w-12 text-white" />
                </div>
                <p className="mt-4 font-medium">RNBW Device</p>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 