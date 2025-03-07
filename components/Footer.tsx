import React from 'react';
import { LayoutGrid, Mail, Globe, Twitter, Instagram, Facebook, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary to-accent-foreground p-1.5 rounded-md">
                <LayoutGrid className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">RNBW</span>
            </div>
            <p className="text-muted-foreground">
              Создаем революционные технологии для парфюмерии будущего.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Продукт</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Функции</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Цены</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Предзаказ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Часто задаваемые вопросы</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Компания</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">О нас</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Блог</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Карьера</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Пресса</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@rnbw.io" className="text-muted-foreground hover:text-primary transition-colors">info@rnbw.io</a>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a href="https://rnbw.io" className="text-muted-foreground hover:text-primary transition-colors">rnbw.io</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-accent/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RNBW Technologies. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Условия использования</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 