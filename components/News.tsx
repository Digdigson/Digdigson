'use client';

import { motion } from 'framer-motion';

interface NewsItem {
  date: string;
  title: string;
  description: string;
}

const newsItems: NewsItem[] = [
  {
    date: 'May 14, 2025',
    title: 'Award Win for Best Musical Score',
    description: 'Recent project wins Best Musical Score at International Film Festival.',
  },
  {
    date: 'September 29, 2024',
    title: 'Nominations for Best Trailer Music',
    description: 'Received 2 nominations for Best Trailer Music at Media Awards.',
  },
  {
    date: 'November 18, 2023',
    title: 'Trailer Wins Best Score Award',
    description: 'Game trailer music wins Best Score at Hollywood Music in Media Awards.',
  },
  {
    date: 'February 16, 2023',
    title: 'Feature Film Post Production',
    description: 'Currently working on post-production for upcoming feature film.',
  },
];

export default function News() {
  return (
    <section id="news" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Recent News</h2>
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <time className="text-sm text-gray-500 mb-2 block">{item.date}</time>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.article>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="#"
              className="text-gray-900 font-semibold hover:underline"
            >
              More News →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

