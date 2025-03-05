import React from 'react';
import Head from 'next/head';
import SurveyForm from '../components/SurveyForm';
import { ThemeToggle } from '../components/ThemeToggle';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Head>
        <title>Опрос RNBW</title>
        <meta name="description" content="Помогите нам сделать RNBW лучше, пройдя наш опрос" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <ThemeToggle />
      
      <main className="container max-w-3xl px-4 py-8 md:py-16 mx-auto">
        <div className="flex justify-center mb-10">
          <Image 
            src="/images/logo.svg" 
            alt="RNBW Logo" 
            width={120} 
            height={40}
            className="h-12 w-auto"
          />
        </div>
        
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Опрос про парфюмерное устройство RNBW
          </h1>
          <p className="text-center text-muted-foreground max-w-xl mx-auto">
            Благодарим, что решили помочь нам! Ваши ответы на эти вопросы помогут нам создать устройство мечты 🌈
          </p>
        </div>
        
        <div className="bg-card dark:bg-card/40 shadow-md dark:shadow-primary/5 rounded-xl p-6 md:p-8">
          <SurveyForm />
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RNBW. Все права защищены.</p>
        </footer>
      </main>
    </div>
  );
} 