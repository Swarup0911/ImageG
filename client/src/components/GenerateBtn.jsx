import React from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the Magic. Try Now
      </h1>
      <button
        onClick={() => navigate("/buy")}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-yellow-500 text-red-500 m-auto hover:scale-105 transition-all duration-500"
      >
        Subscription
        <img src={assets.star_group} alt="" className="h-6" />
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
