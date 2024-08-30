import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import PostMoneySafeExplainer from './PostMoneySafeExplainer';
import { ModeToggle } from "@/components/ui/toggle"

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header><ModeToggle></ModeToggle></header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simplify Your Startup Funding</h2>
          <p className="text-xl mb-6">Understand and calculate Post-Money SAFEs with ease</p>
          <Button asChild>
            <Link href="#calculator">Try the Calculator</Link>
          </Button>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Advanced Ownership Calculator', 'Liquidity Event Simulator', 'Pro Rata Rights Explainer'].map((feature, index) => (
              <li key={index} className="p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{feature}</h4>
                <p>Learn and calculate the intricacies of Post-Money SAFEs</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="calculator">
          <PostMoneySafeExplainer />
        </section>
      </main>

      <footer>
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 SAFE Calculator. All rights reserved.</p>
          <Link href="https://bookface-static.ycombinator.com/assets/ycdc/Website%20User%20Guide%20Feb%202023%20-%20final-28acf9a3b938e643cc270b7da514194d5c271359be25b631b025605673fa9f95.pdf" className="text-blue-300 hover:text-blue-100" target="_blank" rel="noopener noreferrer">
            Y Combinator SAFE User Guide
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;