import { MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const suggestions = [
  "👋 Say Hello",
  "🤝 How are you?",
  "📅 Meet up soon?",
];

const NoChatHistoryPlaceholder = ({ name, onSuggestionClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 relative overflow-hidden"
    >

      {/* 🌫️ Soft Background Glow */}
      <div className="absolute w-64 sm:w-80 h-64 sm:h-80 bg-cyan-500/5 blur-3xl rounded-full top-10" />

      {/* 💬 Animated Icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 rounded-full flex items-center justify-center mb-5 shadow-md"
      >
        <MessageCircleIcon className="size-8 sm:size-10 text-cyan-400" />
      </motion.div>

      {/* 📝 Title */}
      <h3 className="text-base sm:text-xl font-semibold text-slate-200 mb-2">
        Start chatting with {name}
      </h3>

      {/* 📄 Description */}
      <p className="text-slate-400 text-xs sm:text-sm max-w-xs sm:max-w-md mb-5">
        This is the beginning of your conversation. Send a message or try one of the suggestions below.
      </p>

      {/* ✨ Animated Line */}
      <div className="relative h-[2px] w-28 sm:w-40 mb-6 overflow-hidden rounded-full">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>

      {/* 🚀 Suggestion Buttons */}
      <div className="flex flex-wrap gap-2 justify-center max-w-xs sm:max-w-md">
        {suggestions.map((text, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSuggestionClick?.(text)}
            className="px-3 sm:px-4 py-2 text-[11px] sm:text-sm font-medium 
            text-cyan-400 bg-cyan-500/10 rounded-full 
            hover:bg-cyan-500/20 transition"
          >
            {text}
          </motion.button>
        ))}
      </div>

      {/* 🌟 Minimal Floating Dots */}
      <motion.div
        className="absolute bottom-12 w-2 h-2 bg-cyan-400 rounded-full opacity-40"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
    </motion.div>
  );
};

export default NoChatHistoryPlaceholder;