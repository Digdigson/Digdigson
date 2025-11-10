'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'contact@example.com', href: 'mailto:contact@example.com' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', href: 'https://linkedin.com' },
  { icon: FaTwitter, label: 'Twitter', value: '@yourhandle', href: 'https://twitter.com' },
  { icon: FaInstagram, label: 'Instagram', value: '@yourhandle', href: 'https://instagram.com' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Contact</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            To collaborate on your next project, please reach out using the contact information below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-6 bg-white rounded-lg hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center">
                    <Icon className="text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{contact.label}</div>
                    <div className="text-gray-900 font-medium">{contact.value}</div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

