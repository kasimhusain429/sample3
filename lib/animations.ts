import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const initGSAP = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
};

export const animateFadeInUp = (element: Element | string, delay = 0) => {
  return gsap.fromTo(
    element,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
    }
  );
};
