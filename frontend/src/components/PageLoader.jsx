import React from "react";
import { Loader, Wifi } from "lucide-react";
import { motion } from "framer-motion";

const Pageloader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 relative overflow-hidden">

      {/* 🌫️ Background Glow */}
      <div className="absolute w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />

      {/* 🔄 Animated Loader Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-6"
      >
        <Loader className="h-14 w-14 text-cyan-400" />
      </motion.div>

      {/* 📡 Secondary Icon (floating) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4"
      >
        <Wifi className="h-6 w-6 text-cyan-300 opacity-80" />
      </motion.div>

      {/* 📝 Text */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white text-lg sm:text-xl font-medium"
      >
        Connecting
      </motion.h2>

      {/* 🔵 Animated Dots */}
      <div className="flex gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* 💬 Sub text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.4 }}
        className="text-slate-400 text-xs sm:text-sm mt-4"
      >
        Establishing secure connection...
      </motion.p>

    </div>
  );
};

export default Pageloader;