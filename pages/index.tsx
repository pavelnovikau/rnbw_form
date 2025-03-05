import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import SurveyForm from '../components/SurveyForm';
import Footer from '../components/Footer';
import { Sparkles, Rocket, Shield, LightbulbIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <Head>
        <title>RNBW Device - User Feedback Survey</title>
        <meta name="description" content="Share your thoughts on the upcoming RNBW device. Your feedback matters to us." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-20 z-0"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent-foreground bg-clip-text text-transparent">
                Help Shape the Future of RNBW
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Your feedback is essential in creating a revolutionary device that truly fits your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border/20 hover:border-primary/30 transition-all hover:shadow-primary/5">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Innovative Design</h3>
                <p className="text-muted-foreground">Sleek, ergonomic, and built with premium materials for everyday use.</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border/20 hover:border-primary/30 transition-all hover:shadow-primary/5">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Privacy First</h3>
                <p className="text-muted-foreground">We prioritize your data privacy with cutting-edge security features.</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border/20 hover:border-primary/30 transition-all hover:shadow-primary/5">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <LightbulbIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Smart Features</h3>
                <p className="text-muted-foreground">Intelligent capabilities that adapt to your lifestyle and preferences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Survey Section */}
        <section id="survey" className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent z-0"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wide text-primary">Your Opinion Matters</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                Tell Us What You Think
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Help us create a device that exceeds your expectations by sharing your preferences and ideas in our survey
              </p>
            </div>
            
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
              <SurveyForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 