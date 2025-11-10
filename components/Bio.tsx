'use client';

import { motion } from 'framer-motion';

export default function Bio() {
  return (
    <section id="bio" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-gray-900">About</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Performing as a musician in orchestras from an early age, I developed a passion for orchestration 
              and now produce high quality, orchestrally driven music in a range of styles. Combined with a verve 
              for audio production and mixing, my music maintains the highest production standards.
            </p>
            <p>
              In recent years, I have worked with a number of production labels, where I honed my craft for several 
              years. Currently, I focus on working closely with directors and editors to create custom music for 
              video game titles and film projects. I also compose production music that is heard in documentaries, 
              TV shows, advertising campaigns, and major sporting events worldwide.
            </p>
            <p>
              I have been entrusted with major brand collaborations, with music featuring in over 35 trailers, 
              short films and spots. I have collaborated with directors and producers from major studios to create 
              music that aims to combine orchestral genius with today's modern production techniques.
            </p>
            <p>
              I also currently work closely with boutique music labels to create music for blockbuster movie campaigns 
              and major film releases.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

