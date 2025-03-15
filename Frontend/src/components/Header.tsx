
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-6 px-6 md:px-10 w-full flex justify-between items-center glass-effect sticky top-0 z-50"
    >
      <div className="flex items-center gap-2">
        <span className="text-primary text-lg font-medium">Prompt</span>
        <span className="text-lg font-medium">Optimizer</span>
      </div>
      
      <nav className="flex items-center gap-6">
        <Link 
          to="/" 
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Inicio
        </Link>
        <Link 
          to="/documentation" 
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Documentación
        </Link>
        <Link 
          to="/about" 
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Acerca de
        </Link>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-primary/90"
        >
          GitHub
        </motion.a>
      </nav>
    </motion.header>
  );
};

export default Header;
