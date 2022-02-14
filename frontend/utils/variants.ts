export const menuVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Dropdown animation on mobile/desktop
export const dropdownVariants = {
  // Slides in from right
  slideIn: {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  },
  desktop: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  },
};

// Simple fadeIn animation
export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// Simple image fadeIn animation
export const imageFadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Simple dropIn animation
export const dropInVariants = {
  hidden: {
    y: "-100px",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
  },
};

// Text fade
export const textFadeInVariants = {
  hidden: {
    opacity: 0,
    y: 500,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      damping: 20,
      stiffness: 125,
      type: "spring",
    },
  },
};

// Dropdown menu animation
// export const mobileChevronVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.8,
//     transition: {
//       duration: 0.2,
//     },
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.2,
//     },
//   },
// };

// export const desktopChevronVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.8,
//     transition: {
//       duration: 0.2,
//     },
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.2,
//     },
//   },
// };
