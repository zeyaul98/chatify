import { MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full text-center p-6 relative overflow-hidden"
    >

      {/* 🔥 Background Glow */}
      <div className="absolute w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full top-10 animate-pulse" />

      {/* 💬 Animated Icon */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 rounded-full flex items-center justify-center mb-6 shadow-lg"
      >
        <MessageCircleIcon className="size-10 text-cyan-400" />
      </motion.div>

      {/* 📝 Title */}
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-lg sm:text-xl font-semibold text-slate-200 mb-3"
      >
        Start your conversation with {name}
      </motion.h3>

      {/* 📄 Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col space-y-3 max-w-md mb-6"
      >
        <p className="text-slate-400 text-sm sm:text-base">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>

        {/* ✨ Animated Gradient Line */}
        <div className="relative h-[2px] w-40 overflow-hidden mx-auto rounded-full">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>
      </motion.div>

      {/* 🚀 Suggestion Buttons */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="flex flex-wrap gap-2 justify-center"
      >
        {[
          "👋 Say Hello",
          "🤝 How are you?",
          "📅 Meet up soon?",
        ].map((text, i) => (
          <motion.button
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 12px rgba(34,211,238,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-cyan-400 
            bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 transition-all"
          >
            {text}
          </motion.button>
        ))}
      </motion.div>

      {/* 🌟 Floating Dots (Extra Premium Look) */}
      <motion.div
        className="absolute bottom-10 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
        animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-60"
        animate={{ y: [0, -15, 0], opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

    </motion.div>
  );
};

export default NoChatHistoryPlaceholder;