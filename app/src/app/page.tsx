import Link from 'next/link';
import { ArrowRight, Terminal, BookOpen, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-6 pt-20 pb-16 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Master Python <span className="text-primary">Interactively</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From "Hello World" to Advanced Architecture. The only course where you maintain a streak by <em>actually writing code</em>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/learn"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-opacity"
          >
            Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium text-lg hover:opacity-90 transition-opacity border"
          >
            Try Practice Mode
          </Link>
        </div>

        {/* Feature Grid Mini */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12 text-left">
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <Terminal className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">In-Browser IDE</h3>
            <p className="text-muted-foreground text-sm">Run Python instantly via WASM. No setup required.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <BookOpen className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Interactive Curriculum</h3>
            <p className="text-muted-foreground text-sm">Every lesson has runnable snippets and challenges.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <Trophy className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Build Real Projects</h3>
            <p className="text-muted-foreground text-sm">From CLI tools to Web APIs. Build your portfolio.</p>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-muted-foreground text-sm border-t">
        <p>© 2026 Anti Learning Platform. Built for builders.</p>
      </footer>
    </div>
  );
}
