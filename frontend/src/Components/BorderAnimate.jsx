function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative p-[1.2px] rounded-2xl overflow-hidden mb-6">

      {/* SOFT GLOW (LIGHT WHITE) */}
      <div className="absolute inset-0 blur-md opacity-40
        animate-[spin_8s_linear_infinite]
        bg-[conic-gradient(from_0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.6),rgba(255,255,255,0.1))]">
      </div>

      {/* MAIN BORDER (SUBTLE CYAN + WHITE) */}
      <div className="absolute inset-0
        animate-[spin_8s_linear_infinite]
        bg-[conic-gradient(from_0deg,
        rgba(255,255,255,0.2),
        #06b6d4,
        rgba(255,255,255,0.2))]">
      </div>

      {/* INNER CONTENT */}
      <div className="relative z-10 w-full h-full rounded-2xl 
        bg-slate-900/95 backdrop-blur-xl">
        {children}
      </div>

    </div>
  );
}

export default BorderAnimatedContainer;