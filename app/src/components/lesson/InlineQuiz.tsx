'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/lib/store';
import { CheckCircle2, XCircle, Lightbulb, ChevronRight } from 'lucide-react';

interface InlineQuizProps {
    question: string;
    options: string | string[]; // Can be a JSON string array or a literal string array
    correct: number;       // 0-indexed correct answer
    explanation: string;
    id?: string;           // optional quiz ID for tracking
}

export function InlineQuiz({ question, options: optionsRaw, correct, explanation, id }: InlineQuizProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const completeQuiz = useProgressStore(state => state.completeQuiz);
    const isQuizCompleted = useProgressStore(state => state.isQuizCompleted);

    // Parse options: handle both literal array from MDX and JSON string fallback
    let parsedOptions: string[] = [];

    if (Array.isArray(optionsRaw)) {
        parsedOptions = optionsRaw;
    } else if (typeof optionsRaw === 'string') {
        try {
            parsedOptions = JSON.parse(optionsRaw);
        } catch (e) {
            // Fallback: MDX stringifies literal arrays, often breaking quotes.
            // Let's extract any string inside single or double quotes using regex.
            let cleanStr = optionsRaw.trim();
            if (cleanStr.startsWith('[') && cleanStr.endsWith(']')) {
                cleanStr = cleanStr.substring(1, cleanStr.length - 1);
            }

            const matches = cleanStr.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
            if (matches) {
                // Remove the surrounding quotes from each matched option
                parsedOptions = matches.map(m => m.substring(1, m.length - 1));
            } else {
                // Absolute fallback: just split by comma
                parsedOptions = cleanStr.split(',').map(s => s.trim());
            }
        }
    } else {
        console.error('[InlineQuiz] Invalid options type:', typeof optionsRaw, optionsRaw);
        parsedOptions = ['Error: Invalid options format'];
    }

    const isCorrect = selected === correct;
    const alreadyDone = id ? isQuizCompleted(id) : false;

    const handleSubmit = () => {
        if (selected === null) return;
        setSubmitted(true);
        if (isCorrect && id) {
            completeQuiz(id);
        }
    };

    const handleRetry = () => {
        setSelected(null);
        setSubmitted(false);
        setShowExplanation(false);
    };

    return (
        <div className={cn(
            "my-8 rounded-xl border overflow-hidden transition-all duration-300",
            submitted && isCorrect
                ? "border-green-500/40 bg-green-500/5"
                : submitted && !isCorrect
                    ? "border-red-500/40 bg-red-500/5"
                    : "border-violet-500/30 bg-violet-500/5"
        )}>
            {/* Header */}
            <div className={cn(
                "px-5 py-3 flex items-center gap-2 text-sm font-semibold",
                submitted && isCorrect
                    ? "bg-green-500/10 text-green-400"
                    : submitted && !isCorrect
                        ? "bg-red-500/10 text-red-400"
                        : "bg-violet-500/10 text-violet-400"
            )}>
                <Lightbulb className="w-4 h-4" />
                Quick Check
                {alreadyDone && !submitted && (
                    <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                )}
            </div>

            {/* Question */}
            <div className="px-5 py-4">
                <p className="font-medium text-foreground mb-4 text-[15px] leading-relaxed">{question}</p>

                {/* Options */}
                <div className="space-y-2">
                    {parsedOptions.map((option, i) => {
                        const isThisCorrect = i === correct;
                        const isThisSelected = i === selected;

                        let optionStyle = "border-border/50 hover:border-violet-500/50 hover:bg-violet-500/5";
                        if (submitted) {
                            if (isThisCorrect) {
                                optionStyle = "border-green-500/60 bg-green-500/10 text-green-300";
                            } else if (isThisSelected && !isThisCorrect) {
                                optionStyle = "border-red-500/60 bg-red-500/10 text-red-300";
                            } else {
                                optionStyle = "border-border/30 opacity-50";
                            }
                        } else if (isThisSelected) {
                            optionStyle = "border-violet-500 bg-violet-500/10 ring-1 ring-violet-500/30";
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => !submitted && setSelected(i)}
                                disabled={submitted}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 flex items-center gap-3 text-sm",
                                    optionStyle,
                                    !submitted && "cursor-pointer"
                                )}
                            >
                                <span className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                                    submitted && isThisCorrect
                                        ? "border-green-500 bg-green-500 text-white"
                                        : submitted && isThisSelected && !isThisCorrect
                                            ? "border-red-500 bg-red-500 text-white"
                                            : isThisSelected
                                                ? "border-violet-500 bg-violet-500 text-white"
                                                : "border-muted-foreground/30"
                                )}>
                                    {submitted && isThisCorrect ? '✓' :
                                        submitted && isThisSelected && !isThisCorrect ? '✗' :
                                            String.fromCharCode(65 + i)}
                                </span>
                                <span>{option}</span>
                                {submitted && isThisCorrect && (
                                    <CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />
                                )}
                                {submitted && isThisSelected && !isThisCorrect && (
                                    <XCircle className="w-4 h-4 ml-auto text-red-500" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-3">
                    {!submitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={selected === null}
                            className={cn(
                                "px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                                selected === null
                                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                                    : "bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-500/20"
                            )}
                        >
                            Check Answer
                        </button>
                    ) : (
                        <>
                            {!isCorrect && (
                                <button
                                    onClick={handleRetry}
                                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all"
                                >
                                    Try Again
                                </button>
                            )}
                            <button
                                onClick={() => setShowExplanation(!showExplanation)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                            >
                                <ChevronRight className={cn("w-3 h-3 transition-transform", showExplanation && "rotate-90")} />
                                {showExplanation ? 'Hide' : 'Show'} Explanation
                            </button>
                            {submitted && isCorrect && (
                                <span className="ml-auto text-xs font-semibold text-green-400">+5 XP</span>
                            )}
                        </>
                    )}
                </div>

                {/* Explanation */}
                {showExplanation && (
                    <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">💡 Explanation: </span>
                        {explanation}
                    </div>
                )}
            </div>
        </div>
    );
}
