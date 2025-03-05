import React from 'react';
import Header from '@/components/Header';
import SurveyForm from '@/components/SurveyForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container-custom py-12">
        <SurveyForm />
      </div>
      <Footer />
    </main>
  );
} 