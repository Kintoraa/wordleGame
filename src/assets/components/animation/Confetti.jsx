import ConfettiExplosion from "react-confetti-explosion";

export const Confetti = () => {
  return <ConfettiExplosion zIndex={999} force={1} particleCount={200} />;
};
