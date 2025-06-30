import React, { useState } from 'react';
import { rewriteGoalAsOKR } from './gpt';

export default function App() {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<{ objective: string; keyResults: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const resultFromGPT = await rewriteGoalAsOKR(goal);
    setResult(resultFromGPT);
    setLoading(false);
  };

  return (
    <>
      <div className="mx-auto px-4 py-8 container max-w-4xl">
        <div className="text-center mb-8">
          <div className="rounded-lg mb-8 border-2 border-indigo-600 dark:border-indigo-400 p-4 inline-block">
            <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">AI OKR Assistant</p>
          </div>
        </div>
        <form onSubmit={handleRewrite} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <label htmlFor="goal-input" className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Enter your goal:</label>
            <textarea
              rows={4}
              placeholder="Paste your goal here..."
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-vertical transition-colors duration-200"
              id="goal-input"
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:shadow-lg bg-indigo-600 dark:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md"
              disabled={loading}
            >
              {loading ? 'Rewriting...' : 'Rewrite as OKR'}
            </button>
          </div>
        </form>
        <div className="mb-8 border-t border-gray-300 dark:border-gray-600"></div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <p className="text-lg font-semibold text-indigo-600 mb-3 dark:text-indigo-400">Objective:</p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[80px] border border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-400">{result ? result.objective : '[output here]'}</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-indigo-600 mb-3 dark:text-indigo-400">Key Results:</p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[120px] border border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-400">{result ? result.keyResults : '[output here]'}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Transform your goals into actionable OKRs with AI assistance</p>
        </div>
      </div>
      <section className="bg-white py-20">
        <div className="mx-auto px-4 text-center max-w-screen-2xl relative isolate">
          <svg className="h-[788px] w-[300px] absolute left-0 -z-10 overflow-hidden blur-2xl left-20 -top-60" viewBox="0 0 468 788" fill="none" xmlns="http://www.w3.org/2000/svg" id="Windframe_ipO2tbpvJH"><circle cx="44.5105" cy="378.637" r="156.383" fill="#4A3AFF"></circle><circle cx="119.803" cy="529.24" r="156.383" fill="#702DFF"></circle><circle cx="173.364" cy="372.857" r="156.383" fill="#2D5BFF"></circle><g filter="url(#filter0_b_1410_520)"><circle cx="73.5409" cy="394.049" r="393.819" fill="white" fillOpacity="0.79"></circle></g><defs><filter id="filter0_b_1410_520" x="-460.404" y="-139.896" width="1067.89" height="1067.89" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feGaussianBlur in="BackgroundImageFix" stdDeviation="70.063"></feGaussianBlur><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1410_520"></feComposite><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1410_520" result="shape"></feBlend></filter></defs></svg>
          <p className="mb-2 tracking-widest text-sm font-bold text-gray-600 text-center uppercase">team</p>
          <div className="mx-auto max-w-2xl">
            <p className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Meet our team</p>
            <p className="mt-4 text-lg leading-8 text-gray-600">We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
          </div>
          <ul role="list" className="mx-auto mt-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-16 grid max-w-2xl grid-cols-1 gap-10">
            <li>
              <img alt="" src="https://devwares-pull-zone.b-cdn.net/mockimages/John%20Carter%20-%20Cirlce%20Small.png" className="max-h-[400px] object-cover object-top mx-auto w-full rounded-lg" />
              <div className="px-8 py-6">
                <p className="text-2xl font-semibold leading-7 tracking-tight text-black">Reeyha Gerolds</p>
                <p className="text-lg leading-6 text-black pt-1.5">Marketing Executive</p>
                <ul role="list" className="mt-4 justify-center flex gap-x-4">
                  <li>
                    <a href="#" className="text-black hover:text-gray-700">
                      <span className="sr-only">X</span>
                      {/* SVG icon here */}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-black hover:text-gray-700">
                      <span className="sr-only">LinkedIn</span>
                      {/* SVG icon here */}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* Repeat for other team members as needed */}
          </ul>
        </div>
      </section>
    </>
  );
}
