'use client';

import { motion } from 'framer-motion';

const credits = [
  {
    title: 'MAJOR FILM PROJECT',
    description: 'Feature film score and soundtrack',
  },
  {
    title: 'VIDEO GAME TITLE',
    description: 'Original soundtrack and cinematic music',
  },
  {
    title: 'BLOCKBUSTER TRAILER',
    description: 'Trailer music for major studio release',
  },
  {
    title: 'DOCUMENTARY SERIES',
    description: 'Original score for documentary series',
  },
  {
    title: 'ADVERTISING CAMPAIGN',
    description: 'Music for major brand campaign',
  },
  {
    title: 'SPORTING EVENT',
    description: 'Music for major sporting event broadcast',
  },
];

export default function Credits() {
  return (
    <section id="credits" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {credits.map((credit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ y: -4 }}
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{credit.title}</h3>
                <p className="text-gray-600">{credit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

