import React from 'react';
import { LayoutGrid, MoveUpRight } from 'lucide-react';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-background/80 to-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-accent-foreground p-1.5 rounded-md">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">RNBW</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Функции</a>
          <a href="#survey" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Опрос</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">О проекте</a>
        </nav>
        
        <div>
          <Button size="sm" variant="outline" className="hidden md:inline-flex">
            Предзаказ <MoveUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-primary/5 via-background to-background py-12 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              RNBW: Революция в мире парфюмерии
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Создайте свой уникальный аромат с помощью нашего революционного устройства, 
            которое содержит 1001 различный аромат и подстраивается под вас.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              Предварительная регистрация
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <a href="#survey">Пройти опрос</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 