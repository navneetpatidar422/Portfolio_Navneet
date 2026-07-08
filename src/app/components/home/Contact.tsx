import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "motion/react";
import { 
    Mail, 
    Linkedin, 
    Copy, 
    Check,
    Send,
    Phone,
    Instagram,
    MessageSquare
} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { submitToBackend } from "../../utils/formSubmit";

// Custom Behance Icon using the user-provided SVG
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 3333 3333" 
    shape-rendering="geometricPrecision" 
    text-rendering="geometricPrecision" 
    image-rendering="optimizeQuality" 
    fill-rule="evenodd" 
    clip-rule="evenodd"
    fill="currentColor"
    {...props}
  >
    <path d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm-408 1059c57 0 109 5 156 15s87 27 121 49c33 23 59 53 78 91 18 37 27 85 27 140 0 60-14 110-41 151-28 40-68 73-122 99 74 21 128 58 164 111s54 117 54 192c0 61-12 113-35 157-24 44-55 80-94 108s-85 49-136 62c-50 13-102 20-156 20H696V1060h563zm704 96h484v118h-484v-118zm108 890c36 35 87 52 154 52 48 0 90-12 124-36s55-50 63-77h209c-34 104-85 178-154 223s-153 67-250 67c-68 0-129-11-184-33s-101-53-140-93c-38-40-67-88-88-144-20-56-31-118-31-184 0-65 11-125 32-181 22-56 51-104 91-145 39-41 86-73 140-96 54-24 114-35 181-35 73 0 137 14 192 43 55 28 100 67 135 115s60 103 76 164 21 125 17 193h-624c0 68 23 133 59 167zm273-454c-28-31-76-48-134-48-38 0-69 6-94 19s-45 29-60 48-26 39-32 61c-6 21-10 40-11 57h387c-6-61-27-105-55-137zm-1118-50c47 0 85-11 116-33 30-22 45-58 45-108 0-28-5-51-15-69s-24-32-41-42-36-17-58-21-44-6-67-6H960v279h266zm14 508c26 0 50-2 73-8 24-5 44-13 62-25 17-12 32-27 43-48 11-20 16-46 16-77 0-61-17-105-52-132-34-26-80-39-137-39H960v329h281v1z"/>
  </svg>
);

// Custom WhatsApp Icon using the user-provided SVG
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="currentColor"
    {...props}
  >
    <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
  </svg>
);

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => {
    return (
        <motion.a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group p-3 border border-neutral-200 dark:border-neutral-800 rounded-full bg-white dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:border-black dark:hover:border-white transition-all duration-300 shadow-sm"
        >
            <Icon className="w-5 h-5 text-neutral-800 dark:text-neutral-200 group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
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

    const [copiedEmail, setCopiedEmail] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        
        // 1. Submit to Google Sheets (if configured)
        await submitToBackend({
            type: "contact",
            name: formState.name,
            email: formState.email,
            description: formState.description
        });
        
        // 2. Save submission to local storage for Admin Dashboard Excel export fallback
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
            className="py-32 px-6 bg-transparent text-foreground relative overflow-hidden transition-colors duration-500"
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
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-foreground">
                            Let's create something <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-purple-700 animate-gradient-x">
                                AMAZING...
                            </span>
                            <br />
                            together.
                        </h2>
                        <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-md mb-12 font-light leading-relaxed font-body transition-colors duration-500">
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
                                    <div className="relative p-4 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group-hover:border-amber-500/50 transition-colors">
                                        <Mail className="w-6 h-6 text-foreground" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-semibold mb-1 font-mono transition-colors duration-500">Email Me</p>
                                    <div className="flex items-center gap-3 font-body">
                                        <span className="text-sm md:text-base font-bold text-foreground group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors block">
                                            designer.navneet.patidar@gmail.com
                                        </span>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: copiedEmail ? 1 : 0, scale: copiedEmail ? 1 : 0.5 }}
                                            className="p-1 rounded-full bg-green-500/20 shrink-0"
                                        >
                                            <Check className="w-4 h-4 text-green-600" />
                                        </motion.div>
                                        {!copiedEmail && <Copy className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 shrink-0" />}
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
                                    <div className="relative p-4 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group-hover:border-purple-500/50 transition-colors">
                                        <Phone className="w-6 h-6 text-foreground" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-semibold mb-1 font-mono transition-colors duration-500">Call Me</p>
                                    <span className="text-sm md:text-base font-bold text-foreground group-hover:text-purple-800 dark:group-hover:text-purple-300 transition-colors font-body">
                                        +91 7878913449
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <SocialLink href="https://www.linkedin.com/in/navneet-patidar/" icon={Linkedin} />
                            <SocialLink href="https://www.behance.net/navneetpatidar" icon={BehanceIcon} />
                            <SocialLink href="https://www.instagram.com/_navneetpatidar" icon={Instagram} />
                            <SocialLink href="https://wa.link/vgmz7y" icon={WhatsAppIcon} />
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
                    <div className="absolute -inset-1 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent rounded-[2rem] blur-sm -z-10" />
                    <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-black/5 dark:border-white/5 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden transition-colors duration-500">
                         
                         {/* Subtle Form Texture */}
                         <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            
                            <div className="space-y-6">
                                <div className="relative group">
                                    <Input 
                                        id="name" 
                                        placeholder=" " 
                                        className="peer bg-transparent border-0 border-b border-neutral-200 dark:border-neutral-800 rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-purple-500 transition-colors text-foreground"
                                        value={formState.name}
                                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    />
                                    <Label 
                                        htmlFor="name" 
                                        className="absolute left-0 top-6 text-neutral-500 dark:text-neutral-400 text-lg transition-all duration-300 -translate-y-8 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-neutral-500 peer-focus:-translate-y-8 peer-focus:text-purple-600 dark:peer-focus:text-purple-400 peer-focus:text-xs pointer-events-none"
                                    >
                                        What's your name?
                                    </Label>
                                </div>

                                <div className="relative group">
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder=" " 
                                        className="peer bg-transparent border-0 border-b border-neutral-200 dark:border-neutral-800 rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-purple-500 transition-colors text-foreground"
                                        value={formState.email}
                                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    />
                                    <Label 
                                        htmlFor="email" 
                                        className="absolute left-0 top-6 text-neutral-500 dark:text-neutral-400 text-lg transition-all duration-300 -translate-y-8 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-neutral-500 peer-focus:-translate-y-8 peer-focus:text-purple-600 dark:peer-focus:text-purple-400 peer-focus:text-xs pointer-events-none"
                                    >
                                        What's your email?
                                    </Label>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <Label htmlFor="description" className="text-neutral-400 dark:text-neutral-500 text-xs uppercase font-bold tracking-widest font-mono">Description / Message</Label>
                                <Textarea 
                                    id="description" 
                                    placeholder="Tell me about your goals, timeline, and any specific requirements..." 
                                    className="bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 focus:border-purple-500 dark:focus:border-purple-400 min-h-[150px] resize-none text-base p-4 rounded-xl text-foreground"
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
                                    className="relative w-full h-16 bg-black dark:bg-[#FAF9F5] text-white dark:text-black font-bold text-lg rounded-xl overflow-hidden group cursor-pointer water-btn transition-colors duration-500"
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
