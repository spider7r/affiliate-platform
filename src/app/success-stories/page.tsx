'use client'

import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ArrowUpRight, DollarSign, Clock, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, X, Twitter, Instagram, Youtube, Linkedin, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// --- MOCK DATA ---
const payoutNames = ["Alex M.", "Sarah K.", "David R.", "Elena V.", "Marcus J.", "Jessica L.", "Ryan T.", "Emma W.", "Michael B.", "Sophie C.", "Daniel H.", "Olivia P.", "Lucas G.", "Ava S.", "Ethan F."]
const payoutMethods = ["Crypto (USDT)", "PayPal", "Wise", "Stripe", "Bank Transfer"]

// --- COMPONENTS ---

function LivePayoutToast() {
    const [payouts, setPayouts] = useState<{ id: number, name: string, amount: string, method: string }[]>([])

    useEffect(() => {
        // Initial delay
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                const shouldTrigger = Math.random() > 0.4
                if (shouldTrigger) {
                    const newPayout = {
                        id: Date.now(),
                        name: payoutNames[Math.floor(Math.random() * payoutNames.length)],
                        amount: `$${(Math.random() * 2000 + 50).toFixed(2)}`,
                        method: payoutMethods[Math.floor(Math.random() * payoutMethods.length)]
                    }
                    setPayouts(prev => [...prev.slice(-2), newPayout])
                    setTimeout(() => {
                        setPayouts(prev => prev.filter(p => p.id !== newPayout.id))
                    }, 5000)
                }
            }, 3500)
            return () => clearInterval(interval)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {payouts.map((payout) => (
                    <motion.div
                        key={payout.id}
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        className="bg-[#0A0A0A]/90 backdrop-blur-md border border-[#00E676]/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4 w-80 ring-1 ring-[#00E676]/10"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#00E676]/10 flex items-center justify-center shrink-0">
                            <DollarSign className="w-5 h-5 text-[#00E676]" />
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-bold text-white">{payout.name}</span>
                                <span className="text-xs text-slate-400">just received</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-[#00E676]">{payout.amount}</span>
                                <span className="text-[10px] text-slate-500 font-mono uppercase bg-white/5 px-1.5 rounded">{payout.method}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

function ReviewModal({ story, isOpen, onClose }: { story: any, isOpen: boolean, onClose: () => void }) {
    if (!story) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-[101] w-full max-w-4xl h-fit max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col md:flex-row p-0 md:overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-[#00E676] hover:text-black rounded-full text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Side: Profile */}
                        <div className="w-full md:w-1/3 bg-[#0F0F0F] p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#00E676]/10 to-transparent"></div>

                            <div className="relative w-32 h-32 rounded-full border-4 border-[#0A0A0A] shadow-xl mb-6 mt-4">
                                <Image src={story.image} alt={story.name} fill className="object-cover rounded-full" />
                                <div className="absolute bottom-0 right-0 bg-[#00E676] text-black p-1.5 rounded-full border-4 border-[#0A0A0A]">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-1">{story.name}</h3>
                            <p className="text-[#00E676] font-mono text-xs uppercase tracking-widest mb-6">{story.role}</p>

                            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/5">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">Total Earned</div>
                                    <div className="text-lg font-black text-white">{story.earnings}</div>
                                </div>
                                <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/5">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">Partner Since</div>
                                    <div className="text-lg font-black text-white">{story.since}</div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-auto">
                                {story.socials?.twitter && <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>}
                                {story.socials?.youtube && <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#FF0000] hover:text-white transition-colors"><Youtube className="w-5 h-5" /></Link>}
                                {story.socials?.instagram && <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#E1306C] hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>}
                                {story.socials?.website && <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#00E676] hover:text-black transition-colors"><Globe className="w-5 h-5" /></Link>}
                            </div>
                        </div>

                        {/* Right Side: Story */}
                        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col relative">
                            <Quote className="absolute top-8 right-8 w-24 h-24 text-white/[0.03] rotate-180 pointer-events-none" />

                            <div className="flex items-center gap-2 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-[#00E676] fill-[#00E676]" />
                                ))}
                                <span className="text-slate-500 text-sm ml-2 font-medium">Verified Partner Review</span>
                            </div>

                            <h4 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
                                "{story.headline}"
                            </h4>

                            <div className="prose prose-invert prose-p:text-slate-300 prose-p:leading-relaxed mb-8">
                                <p>{story.fullStory}</p>
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10">
                                <p className="text-white font-bold mb-4">Want to achieve similar results?</p>
                                <Link
                                    href="/signup"
                                    className="flex items-center justify-center w-full py-4 bg-[#00E676] hover:bg-[#00c764] text-black font-extrabold rounded-xl text-lg transition-all hover:scale-[1.02] shadow-lg shadow-[#00E676]/20"
                                >
                                    Start Earning Like {story.name.split(' ')[0]} <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default function SuccessStoriesPage() {
    const [selectedStory, setSelectedStory] = useState<any>(null)

    // 24 Unique Stories with distinct images and updated copy
    const stories = [
        {
            name: "Jason Rivera",
            role: "Forex Educator",
            earnings: "$144,400+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            quote: "Tradal acts as my assistant coach. The AI features do the heavy lifting for my students.",
            headline: "My retention rates doubled after introducing Tradal to my mentorship group.",
            fullStory: "I run a mentorship program for over 500 aspiring forex traders. Before Tradal, my students struggled with journaling. They found it boring and tedious. When I introduced Tradal, everything changed. The AI auto-journaling feature meant they actually tracked their trades. Because they were tracking, they saw results. Because they saw results, they stayed in my program longer. It's a win-win. I earn commissions, but more importantly, my students are finally profitable.",
            rating: 5,
            socials: { twitter: true, youtube: true, website: true }
        },
        {
            name: "Sarah Jenkins",
            role: "Trading Psychologist",
            earnings: "$32,500+",
            since: "2025",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            quote: "Finally, a tool that focuses on the mind, not just the charts. My clients need this.",
            headline: "Tradal reveals the emotional patterns that charts hide.",
            fullStory: "As a psychology coach, I don't care about your strategy; I care about your execution. Tradal's 'Tilt Meter' and emotional analysis features are groundbreaking. I have my clients review their Tradal insights before every coaching call. It saves us 20 minutes of digging and lets us get straight to the root cause of their issues. Promoting it is natural because it's an essential tool for their survival in the markets.",
            rating: 5,
            socials: { instagram: true, website: true }
        },
        {
            name: "Marcus Chen",
            role: "Algo Trader",
            earnings: "$58,200+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            quote: "My audience is technical. They hate fluff. Tradal offers the raw data density they crave.",
            headline: "The only journal powerful enough for quantitative analysis.",
            fullStory: "I build automated trading systems. My community consists of engineers, developers, and data scientists. They won't use a glorified spreadsheet. They need detailed metrics—Sortino ratios, MAE/MFE analysis, and equity curve simulators. Tradal allows us to backtest our edge with precision. Generating $5.8k a month in side income just by recommending the tool I use every day has been a nice bonus.",
            rating: 5,
            socials: { twitter: true, youtube: true }
        },
        {
            name: "Elena Volkov",
            role: "Prop Firm Funded",
            earnings: "$18,900+",
            since: "2025",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
            quote: "I passed my FTMO challenge because Tradal showed me I was over-leveraging on Tuesdays.",
            headline: "How Tradal saved my funded account from a drawdown spiral.",
            fullStory: "I was on the verge of blowing my second funded account. I imported my data into Tradal and the AI immediately flagged a pattern: 80% of my losses occurred between 9:30 AM and 10:00 AM NY open. I stopped trading that window and passed my verification the next week. I shared this story on Twitter and 200 people signed up overnight. The product sells itself if you have a real story.",
            rating: 5,
            socials: { twitter: true, instagram: true }
        },
        {
            name: "David Ross",
            role: "Live Streamer",
            earnings: "$92,100+",
            since: "2023",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            quote: "I stream my P&L live. Tradal makes that data look beautiful and verified.",
            headline: "It brings a level of professionalism to my streams that keeps viewers engaged.",
            fullStory: "Streaming trading is hard because look, charts can be boring. Tradal changes that. I put my dashboard on the screen and it looks like a mission control center. Viewers constantly ask 'What software is that?' I drop my link in the chat, and the conversions roll in. It's the easiest affiliate sale ever because they see me using it to make money live.",
            rating: 5,
            socials: { youtube: true, twitter: true }
        },
        {
            name: "Sophie Clark",
            role: "Lifestyle Trader",
            earnings: "$12,400+",
            since: "2025",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
            quote: "I trade to travel. Tradal's passive income covers my flights now.",
            headline: "From part-time trading to full-time freedom with affiliate income.",
            fullStory: "I don't have a huge following—maybe 5k on Instagram. But they trust me. I showed them how I organize my trading week using Tradal, and the response was crazy. You don't need 100k followers to make 6 figures here. You just need to show people a tool that actually helps them.",
            rating: 5,
            socials: { instagram: true }
        },
        {
            name: "James Wilson",
            role: "Crypto Analyst",
            earnings: "$205,000+",
            since: "2023",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            quote: "In crypto, trust is everything. Tradal is the verified source of truth for my calls.",
            headline: "My Discord community grew by 400% after I started verifying plays with Tradal.",
            fullStory: "The crypto space is full oflarpers. I used Tradal to publicize my track record. When people saw the verified badge, my paid group exploded. I require all my members to use Tradal so we can review their progress together. That requirements created a recurring revenue stream for me that pays more than some of my trading months.",
            rating: 5,
            socials: { twitter: true, youtube: true, website: true }
        },
        {
            name: "Emily White",
            role: "Content Creator",
            earnings: "$41,000+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
            quote: "The marketing assets are top tier. High-res, dark mode, futuristic—matches my brand perfectly.",
            headline: "Finally, an affiliate program that gives you actual high-converting creative assets.",
            fullStory: "Most programs give you a grainy banner from 2015. Tradal gives you 4k video assets, sleek product mockups, and copy that actually converts. I put one of their pre-made reels on my TikTok and verified $4k in commissions over the weekend. They make it incredibly easy for creators to look good.",
            rating: 5,
            socials: { instagram: true, youtube: true }
        },
        {
            name: "Ryan Park",
            role: "Scalper",
            earnings: "$8,500+",
            since: "2025",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
            quote: "Simplicity wins. My simple strategy combined with Tradal's simple UI allows me to focus.",
            headline: "Clear mind, clear charts, clear profits.",
            fullStory: "I scalp the NASDAQ open. It's high stress. I don't want to spend hours journaling. Tradal automates the data entry. I tell my discord members: 'If you want to scalp, you need to automate your review.' They listen. The 25% recurring commission is just icing on the cake.",
            rating: 5,
            socials: { twitter: true }
        },
        {
            name: "Jessica Lee",
            role: "Community Manager",
            earnings: "$28,900+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
            quote: "Accountability is the service I sell. Tradal is the tool that delivers it.",
            headline: "Building a culture of accountability in my trading floor.",
            fullStory: "I run a virtual trading floor. We have a rule: if you don't post your Tradal journal link at the end of the week, you lose your seat. This strictness created a high-performance culture. Every single member pays for Tradal, which means I get a cut of every single member's subscription. It covers the server costs entirely.",
            rating: 5,
            socials: { website: true, twitter: true }
        },
        {
            name: "Tom Harris",
            role: "Forex Analyst",
            earnings: "$22,100+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1521119989659-a83eee488058?w=400&h=400&fit=crop",
            quote: "I love that I can get paid in Crypto. Fast, global, and efficient.",
            headline: "Global payouts for a global business.",
            fullStory: "I live in Bali but my audience is global. Some affiliate programs make it a nightmare to get paid. Tradal just sends USDC to my wallet every month like clockwork. No wire fees, no waiting for banks. If you're a digital nomad, this is the partner program you want.",
            rating: 5,
            socials: { instagram: true, twitter: true }
        },
        {
            name: "Lucas Gray",
            role: "Crypto Trader",
            earnings: "$67,000+",
            since: "2023",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            quote: "The backtesting engine is superior to TradingView. That's a bold claim, but my users agree.",
            headline: "Why my community switched from TradingView backtesting to Tradal.",
            fullStory: "We needed replay mode with realistic spreads and commission modeling. Tradal offers that. I did a side-by-side comparison video and the conversion rate was 18%. People don't realize how much money they lose by testing on unrealistic environments. Tradal fixes that.",
            rating: 4,
            socials: { youtube: true, twitter: true }
        },
        {
            name: "Ava Martinez",
            role: "Finance Blogger",
            earnings: "$15,600+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
            quote: "SEO gold. My review of Tradal ranks #1 and brings in passive leads every day.",
            headline: "Blogging for passive income in 2026.",
            fullStory: "I wrote a deep-dive review: 'Tradal vs The Competitors'. It ranks high on Google. I get 5-10 signups a day without touching anything. The product is sticky, so the churn is low. I've built a $2k/month recurring revenue stream from a single blog post.",
            rating: 5,
            socials: { website: true }
        },
        {
            name: "Ethan Wright",
            role: "Prop Coach",
            earnings: "$13,200+",
            since: "2025",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            quote: "We require Tradal during our evaluation phase. It helps us filter for serious talent.",
            headline: "Using Tradal to scout talent for our prop firm.",
            fullStory: "We don't just want traders who get lucky; we want traders who are consistent. We view their Tradal stats to decide who gets capital. Because we require it, our affiliate creates a self-funding mechanism for our education arm.",
            rating: 5,
            socials: { website: true, linkedin: true }
        },
        {
            name: "Olivia Scott",
            role: "YouTuber",
            earnings: "$19,400+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
            quote: "It just looks good on 4k video. The dark mode pop is real.",
            headline: "Aesthetic matters when you're creating daily content.",
            fullStory: "Let's be honest, nobody wants to watch a video of an Excel sheet. Tradal's interface keeps viewer retention high. I can point to the screen and explain concepts visually. Higher retention = more views = more ad revenue + more affiliate sales.",
            rating: 5,
            socials: { youtube: true, instagram: true }
        },
        {
            name: "Daniel Kim",
            role: "Scalper",
            earnings: "$8,800+",
            since: "2025",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            quote: "No hidden clauses. They pay on time, every time. It's reliable.",
            headline: "Reliability is the most underrated feature of an affiliate program.",
            fullStory: "I've been burned by brokers who shave commissions or delay payments. Tradal has been transparent from day one. I have a dedicated account manager, Alex, who actually replies to my emails. That trust lets me promote them with confidence.",
            rating: 4,
            socials: { twitter: true }
        },
        {
            name: "Grace Wilson",
            role: "Performance Coach",
            earnings: "$11,900+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            quote: "I can see when a trader is about to tilt. Tradal gives me the data to intervene.",
            headline: "Data-driven coaching is the future of performance psychology.",
            fullStory: "I use the 'Session Analysis' feature to show my clients how their performance degrades after 45 minutes of trading. Once they see the data, they listen. Tradal makes me a better coach, which allows me to charge more, while also earning affiliate income.",
            rating: 5,
            socials: { linkedin: true, website: true }
        },
        {
            name: "Henry Clark",
            role: "Indices Trader",
            earnings: "$15,500+",
            since: "2023",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            quote: "The referral dashboard is addictive. watching those green bars grow is my favorite pastime.",
            headline: "Gamifying your income streams.",
            fullStory: "I treat my affiliate business like my trading. I track metrics, I split test landing pages, and I optimize. Tradal's dashboard gives me all the data I need to treat this like a serious business, not just a hobby.",
            rating: 5,
            socials: { twitter: true }
        },
        {
            name: "Bella Hall",
            role: "Community Mod",
            earnings: "$4,300+",
            since: "2025",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
            quote: "I'm just a mod, but I make more than some of the traders just by helping people set up.",
            headline: "Helping others get started is a profitable niche.",
            fullStory: "New traders are overwhelmed. I offer a free 15-minute 'Setup Call' to anyone who uses my link. I help them import their data and set up their dashboard. That personal touch ensures they sign up, and I get the commission. It's easy money.",
            rating: 5,
            socials: { twitter: true }
        },
        {
            name: "Jack King",
            role: "Futures Trader",
            earnings: "$36,700+",
            since: "2023",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            quote: "The 30% elite tier is worth the grind. It's a significant pay bump.",
            headline: "Why I pushed hard to hit the Elite Partner tier.",
            fullStory: "Once I realized the commission jumps to 30% after 200 referrals, I went all in. I ran ads, I did webinars, I collabs. It took me 3 months, but now that I'm on the Elite tier, the passive income covers my mortgage and my car payment.",
            rating: 5,
            socials: { youtube: true, twitter: true }
        },
        {
            name: "Lily Green",
            role: "Influencer",
            earnings: "$24,200+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            quote: "Tradal fits my aesthetic. It's sleek, modern, and cool.",
            headline: "Selling software doesn't have to be boring.",
            fullStory: "My brand is all about lifestyle and freedom. Tradal fits that vibe. It looks futuristic. It sells the dream of being a professional, disciplined trader. My audience eats it up.",
            rating: 5,
            socials: { instagram: true }
        },
        {
            name: "Mason Baker",
            role: "Tech Reviewer",
            earnings: "$31,000+",
            since: "2023",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            quote: "I've reviewed 50+ journals. Tradal is the only one I actually use myself.",
            headline: "The only journal that survived my 30-day crash test.",
            fullStory: "I put every tool through a stress test. I import 10,000 trades, I try to break the charts, I spam the AI. Tradal held up. It's fast, robust, and doesn't lag. That quality makes it easy to recommend to my tech-savvy audience.",
            rating: 5,
            socials: { youtube: true, website: true }
        },
        {
            name: "Nora Adams",
            role: "Stocks Trader",
            earnings: "$17,100+",
            since: "2024",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
            quote: "Great retention daily analysis features mean users check it every morning.",
            headline: "Daily active users = Monthly recurring revenue.",
            fullStory: "Because Tradal provides a 'Morning Briefing' with AI, my users log in every day. They rely on it. That high engagement means they never cancel their subscription, which means my churn rate is near zero.",
            rating: 5,
            socials: { twitter: true }
        },
        {
            name: "Leo Carter",
            role: "Options Trader",
            earnings: "$54,000+",
            since: "2023",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            quote: "The options analytics are surprisingly deep for a general journal.",
            headline: "Finally, a journal that handles complex options spreads.",
            fullStory: "Most journals choke on Iron Condors or Butterfly spreads. Tradal visualizes them perfectly. I showed this to my options group and 50 people signed up that day. If you trade options, there is literally no other choice.",
            rating: 5,
            socials: { twitter: true, youtube: true }
        }
    ]

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E676] selection:text-black font-sans">
            <Navbar />
            <LivePayoutToast />
            <ReviewModal story={selectedStory} isOpen={!!selectedStory} onClose={() => setSelectedStory(null)} />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#050505]">
                    <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] bg-[#00E676]/10 blur-[150px] rounded-full mix-blend-screen animate-pulse opacity-30"></div>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#00E676]/20 bg-[#00E676]/5 backdrop-blur-md mb-8"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]"></span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#00E676] tracking-[0.2em] uppercase">
                            Hall of Fame
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[6vw] md:text-[5rem] lg:text-[6.5rem] font-black text-white tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl uppercase"
                    >
                        Real Partners. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00E676] to-emerald-700">Real Impact.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        Join 2,500+ creators, educators, and traders who are building sustainable six-figure incomes with the Tradal Partner Program.
                    </motion.p>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="max-w-[1600px] mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stories.map((story, i) => (
                        <motion.div
                            key={i}
                            layoutId={`story-${i}`}
                            onClick={() => setSelectedStory(story)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 hover:border-[#00E676]/30 transition-all hover:bg-[#0F0F0F] flex flex-col group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#00E676]/5"
                        >
                            {/* Card Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-[#00E676]/50 transition-colors">
                                        <Image src={story.image} alt={story.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-lg group-hover:text-[#00E676] transition-colors">{story.name}</div>
                                        <div className="text-xs text-slate-500 font-mono uppercase tracking-wide">{story.role}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 relative z-10">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Total Payouts</div>
                                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:from-[#00E676] group-hover:to-emerald-500 transition-all">
                                    {story.earnings}
                                </div>
                            </div>

                            <div className="flex gap-0.5 mb-4 relative z-10">
                                {[...Array(story.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 text-[#00E676] fill-[#00E676]" />
                                ))}
                            </div>

                            <blockquote className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10 flex-1 line-clamp-3">
                                "{story.quote}"
                            </blockquote>

                            <div className="mt-auto pt-6 border-t border-white/5 relative z-10 flex justify-between items-center group-hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <CheckCircle2 className="w-3 h-3 text-[#00E676]" />
                                    Verified
                                </div>
                                <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    Read Story <ArrowUpRight className="w-3 h-3" />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-5xl mx-auto px-6 pb-32">
                <div className="relative rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-white/10 p-12 md:p-24 text-center group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mb-8 text-[#00E676]">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">Be The Next Success Story.</h2>
                        <p className="text-slate-400 mb-10 max-w-xl mx-auto text-xl">
                            Start earning 20% recurring commissions today. Approval takes less than 24 hours.
                        </p>
                        <Link
                            href="/signup"
                            className="inline-flex items-center px-10 py-5 bg-[#00E676] hover:bg-[#00c764] text-black font-extrabold rounded-full text-xl transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(0,230,118,0.3)] hover:shadow-[0_0_60px_-15px_rgba(0,230,118,0.5)]"
                        >
                            Apply Now <ArrowRight className="ml-2 w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
