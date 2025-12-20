"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "UBER", icon: "🚗" },
  { name: "ZOMATO", icon: "🍲" },
  { name: "SWIGGY", icon: "🍕" },
  { name: "BLINKIT", icon: "⚡" },
  { name: "PAYTM", icon: "💰" },
  { name: "CRED", icon: "💳" },
  { name: "PHONEPE", icon: "📱" },
];

export default function BrandMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/40 bg-white/30 backdrop-blur-md py-16 mt-20">

      {/* Left Fade Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10" />

      {/* Right Fade Mask */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10" />

      {/* The Sliding Container */}
      <div className="flex">
        <motion.div
          className="flex gap-32 pr-32"
          animate={{ x: "-50%" }}
          transition={{
            duration: 40, // Slower for calmness
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* We duplicate the list to create the "Infinite" loop effect */}
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-4 group cursor-default"
            >
              <span className="text-4xl md:text-5xl grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 filter drop-shadow-sm">
                {brand.icon}
              </span>
              <span className="text-4xl md:text-6xl font-black text-[var(--text-main)] opacity-10 group-hover:opacity-40 transition-opacity duration-500 tracking-tighter">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
