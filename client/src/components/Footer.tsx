import { Github, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-8 mt-12 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Декоративная линия для футера */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
        />
        <div className="flex justify-center space-x-6 mb-6">
          {/* Иконки социальных сетей с эффектом наведения */}
          <motion.a
            href="https://t.me//De2854"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-white hover:text-primary"
          >
            <Send className="h-8 w-8" />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-white hover:text-primary"
          >
            <Github className="h-8 w-8" />
          </motion.a>
          <motion.a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-white hover:text-primary"
          >
            <MessageSquare className="h-8 w-8" />
          </motion.a>
        </div>
        <p className="mt-4 text-sm text-gray-400">&copy; 2025 Commercial Projects</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
