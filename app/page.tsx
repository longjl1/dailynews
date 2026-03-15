'use client'

import Image from "next/image";
import { Bot } from 'lucide-react';
import Card from "@/components/card";

import { useState } from 'react';
import { toast } from "sonner"

export default function Home() {

  const [email, setEmail] = useState('');
  const [subscription, setSubscription] = useState(false);

  // handle subscribe button click
  // Sonner
  const handleSubscribe = () =>{
    fetch('api/subscribe', {
      method:'POST',
      body: JSON.stringify({email}),
    }).then(res => res.json()).then(data => {
      if(data.error) {
        toast.error(data.error)
      } else {
        toast.success('Subscribed successfully!')
      }
    }).catch(err => {
      toast.error('Subscription failed. Please try again later.')
      console.error('Subscription error:', err);
    }).finally(() => {
      setEmail('');
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex item-center justify-between px-8 py-6 max-w7xl mx-auto">
        <div className="flex items-center gap-3">
          <Bot />
          <h1 className="text-2xl font-bold">Daily News</h1>                                                
        </div>
        <nav className="flex item-center gap-6">
          <a href="/" className="hover: text-grap-500">About</a>
          <a href="/" className="hover: text-grap-500">Contact</a>
        </nav>              
      </header>



      {/* mian content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl mx-auto font-bold mb-6">
            Daily News, Powered by AI
          </h2>
          <p className="text-lg text-gray-700 mx-auto max-w-3xl leading-relaxed"> We deliver the lastest news summary to your email daily. 
            Stay informed with our AI-powered news digest, providing concise summaries of the day's top stories, straight to your inbox.
          </p>
        </div>
          {/* input and sub button */}
        <div className="text-center flex items-center justify-center gap-4">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md
            focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={handleSubscribe} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300" >Subscribe</button>
        </div>

        {/* card */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">AI</h3>
            <p className="text-gray-700 leading-relaxed">Delivers the latest updates in artificial intelligence, machine learning, deep learning, enterprise AI, and emerging tech worldwide.</p>
          </div>
          <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">Business</h3>
            <p className="text-gray-700 leading-relaxed">Get regional perspectives on global news. We focus on stock markets.</p>
          </div>
          <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">Tech</h3>
            <p className="text-gray-700 leading-relaxed"> Reporting on the Scientific technology, startups, venture capital funding, and AI products.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
