import React from 'react';
import Head from 'next/head';
import SurveyForm from '../components/SurveyForm';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95 py-8 px-4">
      <Head>
        <title>Опрос о парфюмерном устройстве RNBW</title>
        <meta name="description" content="Поделитесь своим мнением о революционном парфюмерном устройстве RNBW" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-2 mb-3">
              <div className="bg-gradient-to-r from-primary to-accent-foreground p-1.5 rounded-md">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">RNBW</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Опрос о парфюмерном устройстве
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Привет, мы разрабатываем интересное и даже возможно революционное устройство для парфюмерии и нам очень-очень-очень нужно ваше мнение, что вы об этом думаете.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
            <SurveyForm />
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RNBW Technologies
          </div>
        </div>
      </main>
    </div>
  );
} 