import { motion, type Transition } from "framer-motion";

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
}

const AnimatedLogo = ({ onAnimationComplete }: AnimatedLogoProps) => {
  // SVG path for the M-Key logo based on the reference image
  const mKeyPath = `
    M 50 85 
    L 50 45 
    L 70 65 
    L 90 45 
    L 90 85
    M 70 65
    L 70 20
    M 70 20
    C 70 10, 85 10, 85 20
    C 85 30, 70 30, 70 20
    M 90 45
    L 105 55
    M 90 55
    L 105 45
    M 90 60
    L 100 70
  `;

  const pathTransition: Transition = {
    pathLength: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    },
    opacity: {
      duration: 0.3,
    },
  };

  return (
    <motion.svg
      viewBox="20 0 120 100"
      className="h-28 md:h-36 mx-auto"
    >
      <motion.path
        d={mKeyPath}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={pathTransition}
        onAnimationComplete={() => {
          onAnimationComplete?.();
        }}
      />
    </motion.svg>
  );
};

export default AnimatedLogo;
