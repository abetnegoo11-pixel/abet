import { LayoutGrid, ShoppingBag, Users, BarChart3, Home, Settings, Package, Search, Heart, ShoppingCart, Truck, ShieldCheck, Award, MessageSquare, ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { Product, CartItem } from './types';

// Mock Data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'AETHER X-1 SILVER',
    price: 850,
    image: '/src/assets/images/product_shoe_1_luxury_1777965018804.png',
    category: 'ELITE RUN',
    description: 'Ultra-lightweight silver composite with amber reactive lighting.'
  },
  {
    id: '2',
    name: 'CARBON STEALTH V2',
    price: 1200,
    image: '/src/assets/images/product_shoe_2_stealth_1777965034328.png',
    category: 'TACTICAL',
    description: 'All-black carbon fiber body with stealth micro-glow technology.'
  },
  {
    id: '3',
    name: 'ORBITAL GOLD PRIME',
    price: 1500,
    image: '/src/assets/images/product_shoe_3_elite_1777965049445.png',
    category: 'LUXURY',
    description: 'Designer gold-plated accents with cream premium breathable mesh.'
  }
];

// --- Components ---

const Sidebar = () => {
  const [active, setActive] = useState('Home');
  const items = [
    { icon: Home, label: 'Home' },
    { icon: Package, label: 'Products' },
    { icon: LayoutGrid, label: 'Orders' },
    { icon: Users, label: 'Customers' },
    { icon: BarChart3, label: 'Reports' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-6 top-6 bottom-6 w-20 hover:w-64 glass-dark rounded-3xl z-50 flex flex-col items-center py-8 transition-all duration-500 overflow-hidden group"
    >
      <div className="mb-12 flex items-center justify-center min-w-[20rem]">
         <div className="w-10 h-10 rounded-xl bg-amber-glow flex items-center justify-center glow-amber">
           <ShoppingBag className="text-black w-6 h-6" />
         </div>
         <span className="ml-4 font-heading text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LUXESTRIDE</span>
      </div>

      <nav className="flex-1 flex flex-col gap-6 w-full px-4">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 relative group/item
              ${active === item.label ? 'bg-amber-glow text-black glow-amber' : 'text-white/40 hover:text-white hover:bg-white/5'}
            `}
          >
            <item.icon className="w-6 h-6 shrink-0" />
            <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
            {active === item.label && (
              <motion.div 
                layoutId="sidebar-active"
                className="absolute inset-0 bg-amber-glow rounded-2xl -z-10"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 w-full">
        <button className="flex items-center gap-4 p-3 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all w-full min-w-[20rem]">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Profile</span>
        </button>
      </div>
    </motion.aside>
  );
};

const Header = () => {
  return (
    <header className="fixed top-6 left-32 right-6 h-20 glass-dark rounded-3xl z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search premium collections..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-glow/50 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors relative">
          <Heart className="w-5 h-5 text-white/60" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="flex items-center gap-3 px-5 py-3 bg-amber-glow text-black font-bold rounded-2xl glow-amber hover:scale-105 transition-transform active:scale-95">
          <ShoppingCart className="w-5 h-5" />
          <span>CART (3)</span>
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: ReactMouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden px-10"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-amber-glow/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-gold/5 rounded-full blur-[120px]" />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 bg-white/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-glow/20 bg-amber-glow/5 text-amber-glow mb-8 text-sm font-medium tracking-widest"
          >
            <Award className="w-4 h-4" />
            ELITE COLLECTION 2026
          </motion.div>
          <h1 className="text-7xl lg:text-9xl font-heading font-black mb-6 leading-none">
            REDEFINE <br />
            <span className="text-transparent border-b-4 border-amber-glow bg-clip-text bg-gradient-to-r from-amber-glow to-gold">PRECISION.</span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-lg font-light leading-relaxed">
            Experience the future of movement with the Carbon Series. Crafted for those who demand ultimate performance and luxury.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="px-10 py-5 bg-amber-glow text-black rounded-2xl font-black tracking-widest text-lg glow-amber hover:scale-105 active:scale-95 transition-all">
              SHOP COLLECTION
            </button>
            <button className="px-10 py-5 glass rounded-2xl font-bold tracking-widest text-lg hover:bg-white/10 transition-all flex items-center gap-3">
              EXPLORE TECH <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          style={{ x: springX, y: springY, rotateX: useTransform(springY, [-20, 20], [10, -10]), rotateY: useTransform(springX, [-20, 20], [-10, 10]) }}
          className="relative perspective-1000"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -15 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-20"
          >
            <img 
              src="/src/assets/images/hero_shoe_main_1777964998527.png" 
              alt="Futuristic Sneaker" 
              className="w-full drop-shadow-[0_20px_50px_rgba(255,191,0,0.3)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Hero Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-dashed border-amber-glow/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: Product, key?: string }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative glass rounded-[2.5rem] p-4 md:p-6 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-amber-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative h-48 md:h-64 mb-6 flex items-center justify-center">
        <motion.img 
          whileHover={{ scale: 1.1, rotate: -5 }}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 w-32 h-4 bg-black/40 blur-xl rounded-full scale-150 -z-10" />
      </div>

      <div className="relative z-10">
        <span className="text-xs font-bold tracking-[0.2em] text-amber-glow mb-2 block">{product.category}</span>
        <h3 className="text-2xl font-black mb-2">{product.name}</h3>
        <p className="text-white/40 text-sm mb-6 font-light line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-3xl font-heading font-bold text-white">
            <span className="text-amber-glow text-lg translate-y-1 inline-block mr-1">$</span>
            {product.price}
          </div>
          <button className="flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-amber-glow group-hover:text-black group-hover:glow-amber transition-all duration-300">
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Glow corner */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-glow/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

const Showcase = () => {
  return (
    <section className="py-32 px-10 relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-white/40 font-bold tracking-widest text-sm mb-4 block">PREMIUM CURATION</span>
            <h2 className="text-5xl md:text-7xl font-heading font-black">LATEST <br /> <span className="text-amber-glow">RELEASES.</span></h2>
          </div>
          <div className="flex gap-4">
            <button className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <button className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors text-amber-glow">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Truck, title: 'QUANTUM SHIPPING', desc: 'Secure hyper-delivery within 24 hours globally.' },
    { icon: ShieldCheck, title: 'ELITE GUARANTEE', desc: 'Official limited lifetime warranty for every pair.' },
    { icon: Award, title: 'CERTIFIED LUXE', desc: 'Authenticated through private blockchain verification.' },
    { icon: MessageSquare, title: 'AI CONCIERGE', desc: '24/7 personal style recommendation assistant.' }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
       {/* Background line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
      
      <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 glass hover:bg-white/10 transition-all duration-500 rounded-[2rem] group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-amber-glow group-hover:text-black group-hover:glow-amber transition-all duration-300">
              <f.icon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-4 tracking-wider">{f.title}</h4>
            <p className="text-white/40 font-light leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    size: '42',
    color: 'STEALTH BLACK',
    qty: 1
  });

  return (
    <section className="py-32 px-10 bg-dark-surface relative overflow-hidden">
      {/* Animated BG elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-glow/10 rounded-full blur-[150px]"
      />

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="text-amber-glow font-bold tracking-[0.3em] text-sm mb-6 block">SECURE RESERVATION</span>
            <h2 className="text-6xl font-heading font-black mb-8 leading-tight text-white line-clamp-2">RESERVE YOUR <br /> PRE-ORDER.</h2>
            <p className="text-xl text-white/40 mb-12 font-light leading-relaxed">
              Limited production cycles. Secure your pair through our priority queue system. We will contact you via WhatsApp for identity verification.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 glass rounded-2xl border-white/5">
                <Truck className="w-10 h-10 text-amber-glow" />
                <div>
                  <h5 className="font-bold">Next-Day Dispatch</h5>
                  <p className="text-white/40 text-sm">Priority shipping guaranteed for reservation holders.</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 glass rounded-2xl border-white/5">
                <ShieldCheck className="w-10 h-10 text-amber-glow" />
                <div>
                  <h5 className="font-bold">Secure Payment</h5>
                  <p className="text-white/40 text-sm">Encrypted processing through global priority portals.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-14 rounded-[3rem] border-white/5 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] -z-10" />
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 tracking-widest">FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-glow/50 transition-all focus:bg-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 tracking-widest">WHATSAPP NUMBER</label>
                  <input 
                    type="text" 
                    placeholder="+1 (555) 000-0000" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-glow/50 transition-all focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 tracking-widest">SHIPPING ADDRESS</label>
                <textarea 
                  rows={3} 
                  placeholder="Street, City, State, ZIP"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-glow/50 transition-all focus:bg-white/10 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 tracking-widest">SIZE (EU)</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-glow/50 transition-all appearance-none cursor-pointer">
                    {['40', '41', '42', '43', '44', '45'].map(size => <option key={size} className="bg-black">{size}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 tracking-widest">MODEL</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-glow/50 transition-all appearance-none cursor-pointer">
                    <option className="bg-black">AETHER X-1</option>
                    <option className="bg-black">CARBON STEALTH</option>
                    <option className="bg-black">ORBITAL GOLD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 tracking-widest">QUANTITY</label>
                  <div className="flex bg-white/5 border border-white/10 rounded-2xl">
                    <button className="flex-1 py-4 hover:bg-white/10 transition-colors">-</button>
                    <div className="flex-[2] py-4 text-center border-x border-white/10">1</div>
                    <button className="flex-1 py-4 hover:bg-white/10 transition-colors">+</button>
                  </div>
                </div>
              </div>

              <button className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl hover:bg-amber-glow transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-4">
                PLACE RESERVATION <ChevronRight className="w-6 h-6" />
              </button>

              <p className="text-center text-white/20 text-xs">By clicking, you agree to our private luxury service terms and priority queuing policies.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-10 border-t border-white/5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-glow flex items-center justify-center glow-amber">
            <ShoppingBag className="text-black w-7 h-7" />
          </div>
          <span className="font-heading text-2xl font-black">LUXESTRIDE</span>
        </div>
        
        <div className="flex gap-12">
          {['Privacy', 'Terms', 'Warranty', 'Contact'].map(t => (
            <a key={t} href="#" className="text-white/40 hover:text-amber-glow transition-colors font-medium tracking-widest text-sm">{t.toUpperCase()}</a>
          ))}
        </div>

        <div className="text-white/20 text-sm">
          © 2026 LUXESTRIDE HQ. THE FUTURE OF MOVEMENT.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="min-h-screen relative selection:bg-amber-glow selection:text-black">
      <Sidebar />
      <Header />
      
      <main className="pl-32 lg:pl-32 pr-6">
        <Hero />
        <Features />
        <Showcase />
        <OrderForm />
        <Footer />
      </main>

      {/* Decorative Floating Elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-amber-glow/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-20 left-40 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
