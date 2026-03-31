import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvitation } from '../InvitationContext';
import { 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Music as MusicIcon, 
  Type, 
  Eye,
  Mail,
  Heart,
  ChevronDown
} from 'lucide-react';

export default function BuilderPage() {
  const navigate = useNavigate();
  const { data, updateData } = useInvitation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="builder-layout" style={{ background: '#030303' }}>
      {/* Editorial Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="builder-sidebar"
        style={{ borderRight: '1px solid var(--border)' }}
      >
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => navigate('/templates')} className="btn-secondary" style={{ padding: '0.4rem', border: 'none' }}>
              <ArrowLeft size={18} />
            </button>
            <div className="logo" style={{ fontSize: '0.9rem', letterSpacing: '0.2em' }}>
              <Sparkles className="logo-icon" size={16} />
              <span>CRAFT</span>
            </div>
          </div>
        </div>

        <div className="sidebar-content" style={{ position: 'relative', marginTop: '3rem' }}>
          {/* Section 1: The Essentials */}
          <section className="sidebar-section">
            <span className="section-label">The Essentials</span>
            
            <div className="input-group">
              <label><Type size={14} /> Host Names</label>
              <input 
                name="hostNames" 
                value={data.hostNames} 
                onChange={handleChange} 
                placeholder="Sarah & James"
                style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--primary)', fontWeight: 700 }}
              />
              <p className="input-hint">Appear as the primary heading.</p>
            </div>

            <div className="input-group">
              <label><Heart size={14} /> Event Title</label>
              <input 
                name="eventTitle" 
                value={data.eventTitle} 
                onChange={handleChange} 
                placeholder="Our Wedding Celebration"
              />
            </div>
          </section>

          {/* Section 2: The Details */}
          <section className="sidebar-section">
            <span className="section-label">The Details</span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
              <div className="input-group">
                <label><Calendar size={14} /> Date</label>
                <input 
                  name="date" 
                  type="date" 
                  value={data.date} 
                  onChange={handleChange} 
                />
              </div>
              <div className="input-group">
                <label><Clock size={14} /> Time</label>
                <input 
                  name="time" 
                  type="time" 
                  value={data.time} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="input-group">
              <label><MapPin size={14} /> Venue Selection</label>
              <input 
                name="venue" 
                value={data.venue} 
                onChange={handleChange} 
                placeholder="The Grand Pavilion, Paris"
              />
            </div>

            <div className="input-group">
              <label>Invitation Note</label>
              <textarea 
                name="personalMessage" 
                value={data.personalMessage} 
                onChange={handleChange} 
                rows={3}
                placeholder="Join us for a magical evening of love and celebration..."
                style={{ fontSize: '0.9rem', lineHeight: '1.6' }}
              />
            </div>
          </section>

          {/* Section 3: Fine Options */}
          <section className="sidebar-section">
            <span className="section-label">Atmospheric Options</span>
            
            <div className="input-group">
              <label><MusicIcon size={14} /> Digital Soundtrack</label>
              <div style={{ position: 'relative' }}>
                <select 
                  name="soundtrack" 
                  value={data.soundtrack} 
                  onChange={handleChange}
                  style={{ appearance: 'none', width: '100%', paddingRight: '3rem' }}
                >
                  <option value="Nocturne in Eb Major">Nocturne in Eb Major</option>
                  <option value="Clair de Lune">Clair de Lune</option>
                  <option value="Gymnopédie No. 1">Gymnopédie No. 1</option>
                  <option value="Modern Love">Modern Love (Cinematic)</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
              </div>
            </div>
          </section>

          {/* Section 4: Finalize */}
          <section className="sidebar-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
            <span className="section-label" style={{ color: '#fff', opacity: 0.6 }}>Final Delivery</span>
            <div className="input-group">
              <label><Mail size={14} /> Your Notification Email</label>
              <input 
                name="hostEmail" 
                type="email"
                placeholder="host@gmail.com"
                required
              />
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1rem', padding: '1.2rem', gap: '0.8rem' }} 
              onClick={() => navigate('/preview')}
            >
              <Eye size={18} /> Preview Masterpiece
            </button>
          </section>
        </div>
      </motion.aside>

      {/* Main Preview Area */}
      <main className="builder-main">
        {/* Glow effect */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', opacity: 0.2, filter: 'blur(80px)', pointerEvents: 'none' }}></div>

        <div className="phone-mockup builder-preview" style={{ border: '12px solid #1a1a1a', transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' }}>
          <div className="phone-screen">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${data.template}-${data.eventTitle}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className={`editorial-layout theme-${data.template}`}
                style={{ height: '100%', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, background: 'radial-gradient(circle at top right, var(--primary), transparent)', pointerEvents: 'none' }}></div>
                
                <div className="editorial-header">INVITATION</div>
                
                <div 
                  className="editorial-names serif" 
                  style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 400, 
                    lineHeight: 1.1, 
                    padding: '0 1rem',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    maxWidth: '100%'
                  }}
                >
                  {data.hostNames || "Sarah & James"}
                </div>
                
                <div className="editorial-divider" style={{ width: '60px', height: '1px', background: 'var(--primary)', opacity: 0.6, margin: '2.5rem 0' }}></div>

                <div className="editorial-title" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                  {data.eventTitle || "Our Wedding Day"}
                </div>
                
                <div className="editorial-details" style={{ marginTop: '2.5rem' }}>
                  <p style={{ fontWeight: 700, letterSpacing: '0.1em' }}>{data.date || "21 June 2026"}</p>
                  <p style={{ opacity: 0.6 }}>{data.time || "18:00"}</p>
                  <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {data.venue || "The Grand Pavilion"}
                  </p>
                </div>

                <div className="editorial-flourish" style={{ marginTop: '4rem' }}>
                  <Sparkles size={24} style={{ color: 'var(--primary)', opacity: 0.4 }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
