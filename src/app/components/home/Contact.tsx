import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "motion/react";
import { 
    Mail, 
    Linkedin, 
    Copy, 
    Check,
    Send,
    Phone,
    Globe,
    Instagram,
    MessageSquare
} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => {
    return (
        <motion.a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 border border-neutral-200 rounded-full bg-white hover:bg-black hover:text-white hover:border-black transition-colors duration-300 shadow-sm"
        >
            <Icon className="w-5 h-5" />
        </motion.a>
    );
};

export const Contact = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("designer.navneet.patidar@gmail.com");
        setCopiedEmail(true);
        toast.success("Email copied to clipboard!");
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.description) {
            toast.error("Please fill in all the fields (name, email, and description).");
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Save submission to local storage for Admin Dashboard Excel export
        const newSubmission = {
            id: Math.random().toString(36).substring(2, 9),
            name: formState.name,
            email: formState.email,
            description: formState.description,
            createdAt: new Date().toISOString()
        };

        const existing = localStorage.getItem("portfolio_contact_messages");
        const messages = existing ? JSON.parse(existing) : [];
        messages.push(newSubmission);
        localStorage.setItem("portfolio_contact_messages", JSON.stringify(messages));

        setIsSubmitting(false);
        toast.success("Message sent! I'll be in touch shortly.");
        setFormState({
            name: "",
            email: "",
            description: ""
        });
    };

    // Button magnetic effect
    const btnRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 20);
        y.set(yPct * 20);
    };

    const handleBtnMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section 
            ref={containerRef}
            id="contact" 
            className="py-32 px-6 bg-transparent text-black relative overflow-hidden"
        >
             {/* Background Elements - Parallax & Grain */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>
            
            <motion.div 
                style={{ y: y1 }}
                className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" 
            />
            <motion.div 
                style={{ y: y2 }}
                className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" 
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10 items-start">
                
                {/* Left Side: Contact Info & CTA */}
                <div className="lg:sticky lg:top-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                            Let's create something <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-purple-700 animate-gradient-x">
                                AMAZING...
                            </span>
                            <br />
                            together.
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-md mb-12 font-light leading-relaxed font-body">
                            Interested in working together? Fill out the form, send an email, or connect via WhatsApp or socials.
                        </p>

                        <div className="space-y-8 mb-12">
                            {/* Email Details */}
                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 group cursor-pointer w-fit" 
                                onClick={handleCopyEmail}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                                    <div className="relative p-4 rounded-full bg-white border border-neutral-200 group-hover:border-amber-500/50 transition-colors">
                                        <Mail className="w-6 h-6 text-black" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1 font-mono">Email Me</p>
                                    <div className="flex items-center gap-3 font-body">
                                        <span className="text-sm md:text-base font-bold text-black group-hover:text-amber-800 transition-colors block">
                                            designer.navneet.patidar@gmail.com
                                        </span>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: copiedEmail ? 1 : 0, scale: copiedEmail ? 1 : 0.5 }}
                                            className="p-1 rounded-full bg-green-500/20 shrink-0"
                                        >
                                            <Check className="w-4 h-4 text-green-600" />
                                        </motion.div>
                                        {!copiedEmail && <Copy className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors opacity-0 group-hover:opacity-100 shrink-0" />}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Phone Details */}
                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 group w-fit cursor-pointer"
                                onClick={() => window.open("tel:+917878913449")}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100" />
                                    <div className="relative p-4 rounded-full bg-white border border-neutral-200 group-hover:border-purple-500/50 transition-colors">
                                        <Phone className="w-6 h-6 text-black" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1 font-mono">Call Me</p>
                                    <span className="text-sm md:text-base font-bold text-black group-hover:text-purple-800 transition-colors font-body">
                                        +91 7878913449
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <SocialLink href="https://www.linkedin.com/in/navneet-patidar/" icon={Linkedin} />
                            <SocialLink href="https://www.behance.net/navneetpatidar" icon={Globe} />
                            <SocialLink href="https://www.instagram.com/_navneetpatidar" icon={Instagram} />
                            <SocialLink href="https://wa.link/vgmz7y" icon={MessageSquare} />
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: The Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-b from-black/5 to-transparent rounded-[2rem] blur-sm -z-10" />
                    <div className="bg-white/80 backdrop-blur-xl border border-black/5 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                         
                         {/* Subtle Form Texture */}
                         <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            
                            <div className="space-y-6">
                                <div className="relative group">
                                    <Input 
                                        id="name" 
                                        placeholder=" " 
                                        className="peer bg-transparent border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-purple-500 transition-colors"
                                        value={formState.name}
                                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    />
                                    <Label 
                                        htmlFor="name" 
                                        className="absolute left-0 top-6 text-neutral-500 text-lg transition-all duration-300 -translate-y-8 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-neutral-500 peer-focus:-translate-y-8 peer-focus:text-purple-600 peer-focus:text-xs pointer-events-none"
                                    >
                                        What's your name?
                                    </Label>
                                </div>

                                <div className="relative group">
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder=" " 
                                        className="peer bg-transparent border-0 border-b border-neutral-200 rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-purple-500 transition-colors"
                                        value={formState.email}
                                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    />
                                    <Label 
                                        htmlFor="email" 
                                        className="absolute left-0 top-6 text-neutral-500 text-lg transition-all duration-300 -translate-y-8 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-neutral-500 peer-focus:-translate-y-8 peer-focus:text-purple-600 peer-focus:text-xs pointer-events-none"
                                    >
                                        What's your email?
                                    </Label>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <Label htmlFor="description" className="text-neutral-400 text-xs uppercase font-bold tracking-widest font-mono">Description / Message</Label>
                                <Textarea 
                                    id="description" 
                                    placeholder="Tell me about your goals, timeline, and any specific requirements..." 
                                    className="bg-neutral-50 border-neutral-200 focus:border-purple-500 min-h-[150px] resize-none text-base p-4 rounded-xl"
                                    value={formState.description}
                                    onChange={(e) => setFormState({...formState, description: e.target.value})}
                                />
                            </div>

                            <div className="pt-4">
                                <motion.button 
                                    ref={btnRef}
                                    type="submit" 
                                    disabled={isSubmitting}
                                    onMouseMove={handleBtnMouseMove}
                                    onMouseLeave={handleBtnMouseLeave}
                                    style={{ x: xSpring, y: ySpring }}
                                    className="relative w-full h-16 bg-black text-white font-bold text-lg rounded-xl overflow-hidden group cursor-pointer water-btn"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                        {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
