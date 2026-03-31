import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvitation, type TemplateModel } from '../InvitationContext';
import { ArrowRight } from 'lucide-react';

const TEMPLATES: { id: TemplateModel; name: string; description: string; image: string; accent: string }[] = [
  {
    id: 'ethereal-gold',
    name: 'Ethereal Gold',
    description: 'Minimalist luxury with golden accents.',
    image: '/templates/ethereal-gold.png',
    accent: '#d4af37'
  },
  {
    id: 'midnight-noir',
    name: 'Midnight Noir',
    description: 'Sophisticated dark theme with silver light.',
    image: '/templates/midnight-noir.png',
    accent: '#94a3b8'
  },
  {
    id: 'botanical-glass',
    name: 'Botanical Glass',
    description: 'Elegant glassmorphism with nature silhouettes.',
    image: '/templates/botanical-glass.png',
    accent: '#10b981'
  }
];

export default function TemplatePicker() {
  const navigate = useNavigate();
  const { updateData } = useInvitation();

  const handleSelect = (id: TemplateModel) => {
    const soundtracks: Record<TemplateModel, string> = {
      'ethereal-gold': 'Nocturne in Eb Major',
      'midnight-noir': 'Modern Love (Cinematic)',
      'botanical-glass': 'Gymnopédie No. 1'
    };
    updateData({ template: id, soundtrack: soundtracks[id] });
    navigate('/builder');
  };

  return (
    <div className="gallery-wrapper overflow-x-hidden">
      <div className="container">
        <header className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="badge">Digital Masterpiece Gallery</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, marginBottom: '2rem', fontWeight: 400 }}>
              Select Your <span className="gradient-text">Canvas</span>
            </h1>
            <p className="serif" style={{ fontSize: '1.4rem', color: 'var(--text-dim)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
              Choose an editorial foundation for your invitation. Each theme is a cinematic unboxing journey.
            </p>
          </motion.div>
        </header>

        <div className="gallery-grid">
          {TEMPLATES.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.15, 
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="template-card-premium"
              onClick={() => handleSelect(template.id)}
            >
              <div className="template-image-container">
                <img 
                  src={template.image} 
                  alt={template.name}
                />
              </div>
              
              <div className="template-overlay">
                <div className="template-content">
                  <h3 className="serif">{template.name}</h3>
                  <p>{template.description}</p>
                  
                  <div className="select-hint" style={{ color: template.accent }}>
                    <span>E N G R A V E</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              {/* Unique glow effect per card */}
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: `radial-gradient(circle at 50% 120%, ${template.accent}33 0%, transparent 60%)`,
                opacity: 0,
                transition: 'opacity 0.6s ease'
              }} className="hover-glow"></div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="editorial-divider"
        ></motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.8 }}
          style={{ textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.4em' }}
        >
          MORE EDITORIAL THEMES ARRIVING FOR THE SEASON
        </motion.p>
      </div>
    </div>
  );
}
