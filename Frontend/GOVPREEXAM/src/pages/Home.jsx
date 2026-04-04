import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import './Home.css';

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const slides = useMemo(() => [
    {
      title: 'Crack UPSC',
      subtitle: 'IAS • IPS • IFS - India\'s Toughest Exam',
      image: 'https://api.thesecretariat.in/the-secretariat-api/public/file/download-content-attachment?fileId=e56f995309904e78b908f628c0785711',
      exam: 'UPSC',
      icon: 'fa-crown',
      link: '/exam/upsc'
    },
    {
      title: 'Master SSC CGL',
      subtitle: 'Quant • Reasoning • English • General Awareness',
      image: 'https://www.thestatesman.com/wp-content/uploads/2025/08/ssc-exams-ssc-results.webp',
      exam: 'SSC',
      icon: 'fa-users',
      link: '/exam/ssc'
    },
    {
      title: 'Banking Excellence',
      subtitle: 'IBPS • SBI • RBI - Complete Coverage',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kArLVxNY3VsBfd2_mCyox98oAJFpzzPzIg&s',
      exam: 'Banking',
      icon: 'fa-university',
      link: '/exam/banking'
    },
    {
      title: 'Railway Success',
      subtitle: 'RRB NTPC • Group D • Complete Preparation',
      image: 'https://i.ytimg.com/vi/XR7FrIDukj0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDHGbCowBsZfiSPLXtBBw08vfpLCw',
      exam: 'Railway',
      icon: 'fa-train',
      link: '/exam/railway'
    }
  ], []);

  const examCards = [
    {
      name: 'UPSC',
      icon: 'fa-crown',
      color: '#ff7a00',
      exams: ['IAS', 'IPS', 'IFS'],
      link: '/exam/upsc',
      image: 'https://i0.wp.com/anudeepdurishetty.in/wp-content/uploads/2025/01/1000_F_1052300679_ElxO9mztnAMRdj24McMlO0K9O52qGhhS-edited.jpg?resize=665%2C380&ssl=1'
    },
    {
      name: 'SSC',
      icon: 'fa-users',
      color: '#ff9500',
      exams: ['CGL', 'CHSL', 'MTS'],
      link: '/exam/ssc',
      image: 'https://play-lh.googleusercontent.com/4kkx5rCpSCVmg4EL-QesiC_AZZUn4CPBlk9tvBhqTx2D69PK1LkK2JQfqY0I7Uym_Yo'
    },
    {
      name: 'Banking',
      icon: 'fa-university',
      color: '#ff6b00',
      exams: ['IBPS', 'SBI', 'RBI'],
      link: '/exam/banking',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc6ppYvSd5ecuUFzXXRidUBuS9TLu-C_KVHg&s'
    },
    {
      name: 'Railway',
      icon: 'fa-train',
      color: '#ff8c00',
      exams: ['NTPC', 'Group D', 'RPF'],
      link: '/exam/railway',
      image: 'https://images.careerindia.com/img/2022/06/rrb-26-1495773166-1654774797.jpg'
    },
    {
      name: 'Defense',
      icon: 'fa-shield-alt',
      color: '#ff5a00',
      exams: ['NDA', 'CDS', 'AFCAT'],
      link: '/exam/defense',
      image: 'https://cdn.magicdecor.in/com/2024/07/16181758/Braveheart-Horizon-Indian-Army-Wallpaper-Mural-710x448.jpg'
    },
    {
      name: 'State PSC',
      icon: 'fa-map',
      color: '#ff7f11',
      exams: ['UPPSC', 'BPSC', 'MPPSC'],
      link: '/exam/state-psc',
      image: 'https://www.adda247.com/jobs/wp-content/uploads/sites/4/2023/08/08175308/State-Public-Service-Commission.png'
    }
  ];

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(sliderTimer);
  }, [slides.length]);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const liveTime = currentTime.toLocaleTimeString('en-IN');

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = currentTime.getDate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              className="hero-slide active"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="slide-bg">
                <img src={slides[activeSlide].image} alt={slides[activeSlide].exam} />
                <div className="slide-overlay"></div>
                <div className="hero-pattern"></div>
              </div>

              <div className="container hero-layout">
                <motion.div
                  className="hero-content"
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="exam-badge">
                    <i className={`fas ${slides[activeSlide].icon}`}></i>
                    {slides[activeSlide].exam}
                  </div>

                  <h1 className="hero-title">{slides[activeSlide].title}</h1>
                  <p className="hero-subtitle">{slides[activeSlide].subtitle}</p>

                  <div className="hero-live-info">
                    <div className="live-box">
                      <span className="live-label">Live Time</span>
                      <strong>{liveTime}</strong>
                    </div>
                    <div className="live-box">
                      <span className="live-label">Today</span>
                      <strong>{currentDate}</strong>
                    </div>
                  </div>

                  <div className="hero-actions">
                    <Link to={slides[activeSlide].link} className="btn btn-primary btn-lg">
                      Explore {slides[activeSlide].exam}
                      <i className="fas fa-arrow-right"></i>
                    </Link>

                    <Link to="/mock-tests" className="btn btn-outline btn-lg">
                      Take Mock Test
                    </Link>
                  </div>
                </motion.div>

                <motion.aside
                  className="hero-sidebar glass-card"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="sidebar-top">
                    <h3>Study Planner</h3>
                    <p>Track today’s preparation</p>
                  </div>

                  <div className="mini-clock">
                    <span>Current Time</span>
                    <h2>{liveTime}</h2>
                  </div>

                  <div className="calendar-box">
                    <div className="calendar-header">
                      <h4>{currentTime.toLocaleDateString('en-IN', { month: 'long' })}</h4>
                      <span>{currentTime.getFullYear()}</span>
                    </div>

                    <div className="calendar-weekdays">
                      <span>Sun</span>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                    </div>

                    <div className="calendar-grid">
                      {calendarDays.map((day) => (
                        <div
                          key={day}
                          className={`calendar-day ${day === today ? 'active' : ''}`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.aside>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="slider-arrow left" onClick={prevSlide} aria-label="Previous Slide">
            <i className="fas fa-chevron-left"></i>
          </button>

          <button className="slider-arrow right" onClick={nextSlide} aria-label="Next Slide">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              Why Choose <span className="gradient-text">GOVPREEXAM</span>?
            </h2>
            <p className="section-subtitle">Your Success, Our Mission</p>
          </motion.div>

          <div className="features-grid grid grid-4">
            {[
              {
                icon: 'fa-brain',
                title: 'Smart Learning',
                description: 'AI-powered adaptive learning adjusts to your pace'
              },
              {
                icon: 'fa-clock',
                title: '24/7 Access',
                description: 'Study anytime, anywhere on any device'
              },
              {
                icon: 'fa-chart-line',
                title: 'Progress Tracking',
                description: 'Detailed analytics to track your improvement'
              },
              {
                icon: 'fa-users',
                title: 'Expert Faculty',
                description: 'Top educators with proven success track record'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card glass-card"
              >
                <div className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section-sm">
        <div className="container">
          <div className="stats-grid grid grid-4">
            {[
              { value: '500K+', label: 'Students Enrolled' },
              { value: '95%', label: 'Success Rate' },
              { value: '10K+', label: 'Mock Tests' },
              { value: '50+', label: 'Exams Covered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <h3 className="stat-value gradient-text">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="exams-section section">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              Popular <span className="gradient-text">Exams</span>
            </h2>
            <p className="section-subtitle">Choose your path to success</p>
          </motion.div>

          <div className="exams-grid grid grid-3">
            {examCards.map((exam, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="exam-card glass-card"
              >
                <div className="exam-image-wrap">
                  <img src={exam.image} alt={exam.name} className="exam-image" />
                  <div className="exam-image-overlay"></div>
                  <div
                    className="exam-icon"
                    style={{ background: `linear-gradient(135deg, ${exam.color}, #ffb347)` }}
                  >
                    <i className={`fas ${exam.icon}`}></i>
                  </div>
                </div>

                <div className="exam-card-body">
                  <h3>{exam.name}</h3>

                  <div className="exam-tags">
                    {exam.exams.map((e, i) => (
                      <span key={i} className="exam-tag">{e}</span>
                    ))}
                  </div>

                  <Link to={exam.link} className="btn btn-secondary btn-sm">
                    Explore <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="cta-card glass-card"
          >
            <h2>Ready to Crack Your Dream Exam?</h2>
            <p>Join 500K+ students who trusted us for success</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Start Free Trial <i className="fas fa-rocket"></i>
              </Link>
              <Link to="/mock-tests" className="btn btn-outline btn-lg">
                Take Demo Test
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;