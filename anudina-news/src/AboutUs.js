import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <motion.header
        className="about-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1>
          About <span className="highlight">ಅನುದಿನ ಸುಧ್ಧಿ</span>
        </h1>
      </motion.header>

      {/* Main Content */}
      <motion.section
        className="about-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="editor-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src="/images/editor.png" alt="Editor" className="editor-photo" />
          <h3>ಸಂಪಾದಕ</h3>
          <p>ಗಣೇಶ ಇನಾಂದಾರ</p> 
          <p className="editor-desc">ಪತ್ರಕರ್ತ.ಕರ್ನಾಟಕ</p>
        </motion.div>

        <div className="about-text">
          <motion.h2 whileHover={{ color: "#ff5733" }}>ನಮ್ಮ ಬಗ್ಗೆ </motion.h2>
          <p>
           ಗಣೇಶ ಇನಾಂದಾರ ಅವರ ಸಂಪಾದಕತ್ವದಲ್ಲಿ 'ಅನುದಿನ' 'ಅನುದಿನ UPDATE NEWS' ಹೆಸರಿನಲ್ಲಿ ಪ್ರಾರಂಭವಾಯಿತು. ಕಳೆದ 8 ವರ್ಷಗಳಿಂದ ರಾಜ್ಯ, ದೇಶ ಮತ್ತು ವಿದೇಶದಲ್ಲಿರುವ ಕನ್ನಡಿಗರಿಗೆ. ಪೀಠಿಕೆಯಾಗಿ, ಕರ್ನಾಟಕದ ಜನತೆಯ ಪ್ರೀತಿಗೆ ಕಾಲಿರಿಸುತ್ತಾ, 'ಅನುದಿನ ಕನ್ನಡ ನ್ಯೂಸ್ ವೆಬ್ಬಸೈಟ್' ಸ್ಥಳೀಯ, ರಾಜ್ಯ ಮಟ್ಟದ, ರಾಷ್ಟ್ರಮಟ್ಟದ ಎಲ್ಲಾ ಘಟನೆಗಳ ವರದಿಗಳನ್ನು ಓದುಗರಿಗೆ ಪ್ರತಿದಿನ ಉಚಿತವಾಗಿ ನೀಡುವ ಮೂಲಕ ಹೊರಹೊಮ್ಮಿದೆ. ಈ ಸುದ್ದಿ ಜಾಲ ರಾಜ್ಯಾದ್ಯಂತ ತನ್ನ ವ್ಯಾಪ್ತಿಯನ್ನು ಹೊಂದಿದೆ. ಇದು ಓದುಗರಿಗೆ ನೇರವಾದ, ತೀಕ್ಷ್ಣವಾದ ವರದಿಗಳು, ವಿಶೇಷ ವರದಿಗಳು ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಪ್ರಾಮುಖ್ಯತೆಯ ವಿಷಯಗಳ ಬಗ್ಗೆ ಜನರ ಆಕಾಂಕ್ಷೆಗಳನ್ನು ನಿರ್ಭಯವಾಗಿ ಪ್ರತಿಬಿಂಬಿಸುವ ಲೇಖನಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.


          </p>

          <motion.h2 whileHover={{ color: "#ff5733" }}>ನಮ್ಮ ಧ್ಯೇಯ (Our Mission)</motion.h2>
          <p>
          'ANAUDINA News Bulletin' ನೊಂದಿಗೆ ಆನ್‌ಲೈನ್ ಲಿಂಕ್‌ಗಳು ಓದುಗರನ್ನು ಡಿಜಿಟಲ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗೆ ಕೊಂಡೊಯ್ಯುವಲ್ಲಿ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿನ 'ANAUDINA ನ್ಯೂಸ್ ಬುಲೆಟಿನ್' ವೀಡಿಯೊಗಳು ಮತ್ತು ಪಾಡ್‌ ಕಾಸ್ಟ್‌ಗಳು ವೀಕ್ಷಕ/ಕೇಳುಗರಿಗೆ ವಿಭಿನ್ನ ಅನುಭವವನ್ನು ನೀಡುತ್ತವೆ. ಈ ಸುದ್ದಿ ಜಾಲವು ಹೊಸತನಕ್ಕೆ ಒಡ್ಡಿಕೊಳ್ಳುವುದರಿಂದ ಹಿಂದೆ ಸರಿಯಲಿಲ್ಲ.ಹೊಸ ವಿನ್ಯಾಸ ಮತ್ತು ಹೊಸ ಅಂಕಣಗಳೊಂದಿಗೆ ಸದಾ ಹೊಸ ವಿಷಯಗಳನ್ನು ಓದುಗರಿಗೆ ನೀಡುವ ಪರಂಪರೆ 'ಅನುದಿನ'ಕ್ಕಿದೆ. ಈ ಎಲ್ಲದರ ನಡುವೆ, ಸಮಾಜದ ಒಳಿತಿಗಾಗಿ ಕೆಲಸ ಮಾಡುವ ತನ್ನ ಪ್ರಮುಖ ಧ್ಯೇಯಕ್ಕೆ ಅದು ಹೆಚ್ಚು ದೃಢವಾಗಿ ಅಂಟಿಕೊಂಡಿದೆ. ಯಾವುದೇ ಜಾಹೀರಾತು ನೀಡದೆ ಉತ್ತಮ ಪತ್ರಿಕೋದ್ಯಮದ ಮೂಲಕ ಸಮಾಜದ ಒಳ್ಳೆಯ ಗುರಿಯತ್ತ ಸಾಗುತ್ತಿರುವ ಕನ್ನಡಿಗರ ಪ್ರತೀಕ 'ಅನುದಿನ'
          </p>
          
          <motion.h2 whileHover={{ color: "#ff5733" }}>ನಮ್ಮ ದೃಷ್ಟಿ (Our Vision)</motion.h2>
          <p>
          ನಾವು ಸತ್ಯವಾದ ಮಾಹಿತಿಗೆ ಪ್ರವೇಶವು ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಲಭ್ಯವಿರುವ ಸಮಾಜವನ್ನು ಕಲ್ಪಿಸುತ್ತೇವೆ.
          ನಮ್ಮ ಡಿಜಿಟಲ್ ವೇದಿಕೆಯ ಮೂಲಕ, ನಾವು ವಿಶ್ವದಾದ್ಯಾಂತ ಕನ್ನಡ ಭಾಷೆಯ ಮಾತಿಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ,
          ಭಾಷೆ ಮತ್ತು ಸಂಸ್ಕೃತಿಯಿಂದ ಏಕತೆಯಾದ ಜಾಗತಿಕ ಸಮುದಾಯವನ್ನು ನಿರ್ಮಿಸಲು ಉದ್ದೇಶಿಸುತ್ತೇವೆ.
          </p>
        </div>
      </motion.section>

          
         

     {/* Contact Section */}
     <motion.section
        className="contact-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.h2 whileHover={{ color: "#ff5733" }}>Contact Us</motion.h2>
        <div className="contact-cards">
          <motion.a
            href="mailto:anudinanews123@gamil.com"
            className="contact-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>anudinanews123@gamil.com</p>
          </motion.a>

          <motion.a
            href="tel:+918310799673"
            className="contact-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="contact-icon">📱</div>
            <h3>Phone</h3>
            <p>+91 8310799673</p>
          </motion.a>

          <motion.div
            className="contact-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="contact-icon">📍</div>
            <h3>Address</h3>
            <p>Bellary, Karnataka, India</p>
          </motion.div>


    {/* YouTube Card */}
    <motion.div 
      className="contact-card"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="contact-icon">
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_(2017).svg/512px-YouTube_full-color_icon_(2017).svg.png" 
    alt="YouTube" 
    style={{ width: "30px", height: "30px" }}
  />
</div>

      <h3>YouTube</h3>
      <p>
        <a 
          href="https://youtube.com/channel/UCitVaduXECJD6AnlckfeQ4g?si=QZK2QQkeAZNl_GxP" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "#ff0000", textDecoration: "none", fontWeight: "bold" }}
        >
          Visit our Channel
        </a>
      </p>
    </motion.div>
  </div>
</motion.section>

      {/* Footer */}
      <motion.footer 
        className="about-footer" 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <p>&copy; {new Date().getFullYear()} ಅನುದಿನ ಸುಧ್ಧಿ. All rights reserved.</p>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <Link to="/" className="back-link">← Back to Home</Link>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default AboutUs;