import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaUtensils, FaAward, FaGlobe } from "react-icons/fa";

const teamMembers = [
  {
    name: "Marco Rossi",
    role: "Executive Chef & Founder",
    bio: "With over 25 years of culinary expertise, Chef Marco brings authentic Italian flavors infused with modern techniques to every dish.",
    image:
      "https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=1200",
    specialty: "Handmade Pasta",
    icon: <FaUtensils className="h-5 w-5" />,
  },
  {
    name: "Sophie Laurent",
    role: "Head Chef",
    bio: "Trained in Paris, Chef Sophie specializes in French-Mediterranean fusion and has been with QuickBite for over 8 years.",
    image:
      "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1200",
    specialty: "Seafood Dishes",
    icon: <FaAward className="h-5 w-5" />,
  },
  {
    name: "Antonio Moretti",
    role: "Pastry Chef",
    bio: "A master of sweet creations, Antonio's desserts combine traditional Italian techniques with contemporary presentation.",
    image:
      "https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=1200",
    specialty: "Artisan Desserts",
    icon: <FaGlobe className="h-5 w-5" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-28 bg-secondary-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-bg-primary font-medium mb-2 block">
            OUR TEAM
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Meet the Culinary Artists
          </h2>
          <p className="text-gray-700">
            Our passionate team of culinary experts brings diverse experiences
            and techniques to create unforgettable dining experiences for our
            guests.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-10 max-w-6xl mx-auto"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="font-serif text-xl font-bold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary-100 text-sm">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex items-center text-primary-700">
                  <div className="p-2 bg-bg-primary text-white rounded-full mr-3">
                    {member.icon}
                  </div>
                  <span className="text-sm font-medium text-black">
                    Specialty: {member.specialty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
