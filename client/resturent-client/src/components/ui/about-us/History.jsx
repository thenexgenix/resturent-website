import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRegCalendar, FaAward, FaUtensils, FaUsers } from "react-icons/fa";
import leaves from "../../../assets/frontend_assets/leaves.png";

const milestones = [
  {
    year: "2005",
    title: "The Beginning",
    description:
      "QuickBite opened its doors as a small family restaurant with just 10 tables, serving traditional Italian cuisine.",
    icon: <FaRegCalendar className="h-6 w-6" />,
  },
  {
    year: "2008",
    title: "First Recognition",
    description:
      "Awarded 'Best New Restaurant' by the city's culinary association, putting us on the map as a dining destination.",
    icon: <FaAward className="h-6 w-6" />,
  },
  {
    year: "2012",
    title: "Menu Evolution",
    description:
      "Expanded our offerings to include Mediterranean fusion dishes while maintaining our Italian roots.",
    icon: <FaUtensils className="h-6 w-6" />,
  },
  {
    year: "2018",
    title: "Expansion",
    description:
      "Renovated and expanded our space to accommodate more guests while maintaining our intimate atmosphere.",
    icon: <FaUsers className="h-6 w-6" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const History = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden relative">
      {/* Leaves Image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-40 opacity-70">
        <img src={leaves} alt="Decorative leaves" className="w-full h-auto" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-bg-primary font-medium mb-2 block">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The QuickBite Timeline
          </h2>
          <p className="text-gray-700">
            From humble beginnings to becoming a culinary landmark, our journey
            has been filled with passion, innovation, and a commitment to
            exceptional dining experiences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Vertical Timeline Line */}
            <div className="absolute left-[26px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-bg-primary z-0 rounded-full"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } mb-16 last:mb-0 relative`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 transform md:-translate-x-1/2 top-6 w-6 h-6 rounded-full bg-white border-4 border-bg-primary z-10"></div>

                {/* Timeline Card */}
                <div
                  className={`md:w-1/2 pl-16 md:pl-0 ${
                    index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
                  }`}
                >
                  <div className="rounded-xl p-6 bg-gray-50 shadow hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 bg-bg-primary rounded-full ${
                          index % 2 === 0
                            ? "mr-4"
                            : "mr-4 md:ml-4 md:order-last"
                        }`}
                      >
                        <span className="text-white">{milestone.icon}</span>
                      </div>
                      <div>
                        <span className="text-xl font-serif font-bold text-primary-800">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default History;
