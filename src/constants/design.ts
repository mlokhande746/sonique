export const COLORS = {
  primary: "#4cd7f6", // Cyan
  secondary: "#fbabff", // Magenta
  accent: "#c084fc", // Purple
  background: "#0a0a0c",
  panel: "#12131a",
  text: {
    main: "#e2e1eb",
    dim: "#869397",
    subtle: "#3d494c",
  },
  moods: ["#4cd7f6", "#fbabff", "#c084fc", "#facc15"],
};

export const ANIMATIONS = {
  stagger: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
};
