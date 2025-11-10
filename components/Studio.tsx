'use client';

import { motion } from 'framer-motion';

export default function Studio() {
  return (
    <section id="studio" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Studio</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              My studio is equipped with state-of-the-art technology and a comprehensive collection of orchestral 
              samples and virtual instruments. I work in a professional environment designed to deliver the highest 
              quality music production for media projects.
            </p>
            <p>
              The workflow is optimized for collaboration with directors, editors, and producers, allowing for 
              seamless communication and rapid iteration. Whether working on a tight deadline for a trailer or 
              developing a full score over several months, the studio is set up to handle projects of any scale.
            </p>
            <p>
              I specialize in creating custom music that perfectly matches the vision of each project, from intimate 
              character moments to epic action sequences. The goal is always to enhance the storytelling through 
              carefully crafted musical compositions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

