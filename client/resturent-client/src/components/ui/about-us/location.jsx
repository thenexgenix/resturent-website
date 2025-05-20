import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const Location = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-28 bg-secondary-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-bg-primary font-medium mb-2 block">FIND US</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Visit Our Restaurant in Dhaka
          </h2>
          <p className="text-gray-700">
            Located in the heart of Dhaka, we welcome you to experience Bangladeshi warmth and hospitality
            with world-class flavors.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <FaMapMarkerAlt className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-gray-700">House 12, Road 5</p>
                    <p className="text-gray-700">Dhanmondi, Dhaka 1205, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <FaClock className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Opening Hours</h4>
                    <p className="text-gray-700">Saturday - Thursday: 12:00 PM - 10:00 PM</p>
                    <p className="text-gray-700">Friday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <FaPhoneAlt className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-700">+880 1777 123 456</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <FaEnvelope className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-700">contact@savorbd.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Make a Reservation</h3>
              <p className="text-gray-700 mb-4">
                For groups of 4 or more, reservations are highly recommended.
              </p>
              <button className="w-full px-6 py-3 bg-primary-700 text-white font-medium rounded-md hover:bg-primary-800 transition-colors">
                Book Your Table
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.938660278939!2d90.3723030751402!3d23.750903178675534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9e243aa6c2f%3A0x351c23f6223ad34f!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1627309375149!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Dhaka Restaurant Location"
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
