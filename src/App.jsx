import React, { useState, useEffect } from 'react';
import './App.css';

// Valid name variations (all lowercase for comparison)
const validNames = [
  'shaik zainab',
  'zainab',
  'zainab shaik',
  'zainabbintmehid',
  'madam ji',
  'madamji'
];

function App() {
  const [name, setName] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Normalize name: convert to lowercase and trim spaces
  const normalizeName = (inputName) => {
    return inputName.toLowerCase().trim();
  };

  // Check if name is valid (case-insensitive)
  const checkName = (inputName) => {
    const normalized = normalizeName(inputName);
    return validNames.includes(normalized);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }

    const valid = checkName(name);
    setIsValidName(valid);
    setIsAnimating(true);
    
    // Trigger animation
    setTimeout(() => {
      setShowMessage(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleBack = () => {
    setShowMessage(false);
    setIsValidName(false);
    setIsAnimating(false);
    setName('');
  };

  return (
    <div className={`app ${showMessage && isValidName ? 'night-theme' : ''}`}>
      {/* Animated background particles - only show in day theme */}
      {(!showMessage || !isValidName) && (
        <div className="background-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }} />
          ))}
        </div>
      )}

      {/* Night theme elements - moon and clouds - only show when name matches */}
      {showMessage && isValidName && (
        <>
          <div className="night-sky">
            <div className="moon">
              <div className="moon-crater"></div>
              <div className="moon-crater"></div>
              <div className="moon-crater"></div>
            </div>
            <div className="stars">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="star" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }} />
              ))}
            </div>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
            <div className="cloud cloud-4"></div>
            <div className="cloud cloud-5"></div>
          </div>
        </>
      )}

      <div className="container">
        <div className={`card ${isAnimating ? 'card-exit' : ''} ${showMessage ? 'card-message' : ''}`}>
          {!showMessage ? (
            <div className="initial-screen">
              <div className="welcome-header">
                <div className="welcome-icon">✨</div>
                <h1 className="welcome-title">
                  <span className="title-letter" style={{ animationDelay: '0s' }}>W</span>
                  <span className="title-letter" style={{ animationDelay: '0.1s' }}>e</span>
                  <span className="title-letter" style={{ animationDelay: '0.2s' }}>l</span>
                  <span className="title-letter" style={{ animationDelay: '0.3s' }}>c</span>
                  <span className="title-letter" style={{ animationDelay: '0.4s' }}>o</span>
                  <span className="title-letter" style={{ animationDelay: '0.5s' }}>m</span>
                  <span className="title-letter" style={{ animationDelay: '0.6s' }}>e</span>
                </h1>
                <div className="welcome-line"></div>
              </div>
              
              <p className="subtext">
                {/* <span className="subtext-icon">🌙</span> */}
                Please enter your name
                {/* <span className="subtext-icon">✨</span> */}
              </p>
              
              <form onSubmit={handleSubmit} className="form-group">
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your name"
                    className="name-input"
                    autoComplete="off"
                    autoFocus
                  />
                  <div className="input-glow"></div>
                </div>
                
                <button 
                  type="submit" 
                  className="continue-btn"
                  disabled={!name.trim()}
                >
                  <span>Continue</span>
                  <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            <div className="message-screen">
              <button className="back-btn" onClick={handleBack} aria-label="Go back">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back</span>
              </button>

              {isValidName ? (
                <div className="message personalized-message">
                  <div className="message-header">
                    <div className="interactive-heart-container">
                      <div className="interactive-heart" onClick={() => {
                        const heart = document.querySelector('.interactive-heart');
                        if (heart) {
                          heart.classList.add('heart-clicked');
                          setTimeout(() => heart.classList.remove('heart-clicked'), 600);
                        }
                      }}>
                        🖤
                      </div>
                      <div className="heart-sparkles">
                        <span className="sparkle">✨</span>
                        <span className="sparkle">✨</span>
                        <span className="sparkle">✨</span>
                      </div>
                    </div>
                    <h2 className="greeting-title">
                      <span className="greeting-text">Assalamvalaikum Madamm jiiiiii</span>
                      {/* <span className="black-heart">🖤</span> */}
                    </h2>
                  </div>
                  
                  <div className="message-content">
                    <p className="message-paragraph">
                      I believe that Allah (SWT) connects souls who share similar thoughts, values, and a deep understanding of life's purpose.
                    </p>
                    <p className="message-paragraph">
                      Some connections are divinely orchestrated they feel calm, natural, and meaningful without being forced. These are the bonds that remind us of the beauty in human relationships.
                    </p>
                    <p className="message-paragraph">
                      What amazes me most is how our tastes and way of doing things are not just similar they are the same. It's rare to find someone who aligns so perfectly with your perspective, choices, and approach to life.
                    </p>
                    <p className="message-paragraph">
                      I truly appreciate and admire your kindness, understanding, and positivity qualities that quietly stand out and make a profound difference in the lives of those around you.And please dont overthink just be yourself and enjoy the moment. And i always says your the best as your.
                    </p>
                    <p className="message-paragraph">
                      Your presence brings a sense of peace and warmth. This small space was created with care, creativity, and a genuine appreciation for the beautiful and amazing person you are.
                    </p>
                    <p className="message-paragraph">
                      May our connection continue to grow In sha allah. You are truly valued and cherished.
                    </p>
                  </div>
                  
                  <div className="message-footer">
                    <p className="blessing">May Allah give you all the happiness and In sha allah all your dreams come true just believe in yourself "Zinaab". 🖤</p>
                  </div>
                </div>
              ) : (
                <div className="message default-message">
                  <div className="welcome-message">
                    <p className="welcome-text">
                      Thanks for checking "<span className="entered-name">{name}</span>" it only for my special one.... Hope you have a great day 🖤
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

