import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function CurrentAffairs() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      
      if (!apiKey) {
        // Fallback to demo data if no API key is provided
        setIsDemo(true);
        setNews(demoNewsData);
        setLoading(false);
        return;
      }

      // Fetch from NewsData.io API
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=in`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch current affairs');
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.results && data.results.length > 0) {
        setNews(data.results.slice(0, 9)); // Get top 9
        setIsDemo(false);
      } else {
        throw new Error('No articles found');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      // Fallback to demo on error
      setIsDemo(true);
      setNews(demoNewsData);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page-container" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container section">
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>
            Current <span className="gradient-text">Affairs</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Stay updated with the latest news, events, and crucial information for your upcoming exams.
          </p>

          {isDemo && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: '24px',
                display: 'inline-block',
                padding: '12px 24px',
                background: 'rgba(255, 213, 0, 0.1)',
                border: '1px solid rgba(255, 213, 0, 0.3)',
                borderRadius: '12px',
                color: 'var(--warning)',
                fontWeight: '500'
              }}
            >
              <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
              Currently showing Demo Data. To see real-time updates, add your free NewsData API key to the .env file.
            </motion.div>
          )}
        </motion.div>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="grid grid-3">
            {news.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '0', 
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={article.image_url || article.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={article.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(10px)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: '600'
                  }}>
                    {article.source_id || (article.source && article.source.name)}
                  </div>
                </div>
                
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    marginBottom: '12px'
                  }}>
                    <i className="far fa-calendar-alt"></i>
                    {formatDate(article.pubDate || article.publishedAt)}
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    marginBottom: '12px', 
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {article.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {article.description}
                  </p>
                  
                  <a 
                    href={article.link || article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ 
                      alignSelf: 'flex-start', 
                      padding: '8px 20px', 
                      fontSize: '0.9rem',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    Read Full Article <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem' }}></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Engaging fallback demo data
const demoNewsData = [
  {
    title: "SpaceX successfully launches revolutionary new satellite constellation",
    description: "The new array of satellites aims to provide high-speed internet access to the most remote corners of the world, marking a major milestone in global connectivity.",
    content: "Full content here...",
    url: "#",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Daily" }
  },
  {
    title: "Global Summit reaches unprecedented agreement on climate action",
    description: "World leaders have unanimously agreed to accelerate the transition to renewable energy sources, targeting a 50% reduction in carbon emissions by 2030.",
    content: "Full content here...",
    url: "#",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: { name: "Global News" }
  },
  {
    title: "Breakthrough in quantum computing promises exponential speed improvements",
    description: "Researchers at a leading tech institute have successfully maintained quantum coherence at room temperature, potentially unblocking the path for commercial quantum computers.",
    content: "Full content here...",
    url: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: { name: "Science Today" }
  },
  {
    title: "New AI model demonstrates advanced reasoning capabilities",
    description: "The latest iteration of artificial intelligence system has shockingly passed several advanced logic tests, surprising researchers and opening new possibilities.",
    content: "Full content here...",
    url: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    source: { name: "Tech Insider" }
  },
  {
    title: "Economists predict stable growth for emerging markets in the next quarter",
    description: "Despite global headwinds, emerging economies are showing remarkable resilience. Analysts predict steady growth fueled by internal consumption and digital transformation.",
    content: "Full content here...",
    url: "#",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    source: { name: "Financial Times" }
  },
  {
    title: "Rare archaeological discovery sheds new light on ancient civilizations",
    description: "A team of researchers diving in the Mediterranean have discovered a perfectly preserved ancient artifact that challenges our current understanding of historical trade routes.",
    content: "Full content here...",
    url: "#",
    image: "https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    source: { name: "History Today" }
  }
];

export default CurrentAffairs;
