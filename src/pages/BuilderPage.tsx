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
  Heart
} from 'lucide-react';

export default function BuilderPage() {
  const navigate = useNavigate();
  const { data, updateData } = useInvitation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="builder-layout">
      {/* Editorial Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="builder-sidebar"
      >
        <div className="sidebar-header">
          <button onClick={() => navigate('/templates')} className="btn-secondary" style={{ padding: '0.5rem' }}>
            <ArrowLeft size={18} />
          </button>
          <div className="logo" style={{ fontSize: '0.85rem' }}>
            <Sparkles className="logo-icon" size={16} />
            <span>VOW & VENUE</span>
          </div>
        </div>

        <div className="sidebar-content">
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
              />
            </div>

            <div className="input-group">
              <label><Heart size={14} /> Event Title</label>
              <input 
                name="eventTitle" 
                value={data.eventTitle} 
                onChange={handleChange} 
                placeholder="The Wedding Day"
              />
            </div>
          </section>

          {/* Section 2: The Details */}
          <section className="sidebar-section">
            <span className="section-label">The Details</span>
            
            <div className="row-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
              <label><MapPin size={14} /> Venue</label>
              <input 
                name="venue" 
                value={data.venue} 
                onChange={handleChange} 
                placeholder="Grand Pavilion"
              />
            </div>

            <div className="input-group">
              <label>Personal Message</label>
              <textarea 
                name="personalMessage" 
                value={data.personalMessage} 
                onChange={handleChange} 
                rows={3}
                placeholder="A small note for your guests..."
              />
            </div>
          </section>

          {/* Section 3: Fine Options */}
          <section className="sidebar-section">
            <span className="section-label">Fine Options</span>
            
            <div className="input-group">
              <label><MusicIcon size={14} /> Soundtrack</label>
              <select name="soundtrack" value={data.soundtrack} onChange={handleChange}>
                <option value="Nocturne in Eb Major">Nocturne in Eb Major</option>
                <option value="Clair de Lune">Clair de Lune</option>
                <option value="Gymnopédie No. 1">Gymnopédie No. 1</option>
                <option value="Modern Love">Modern Love (Upbeat)</option>
              </select>
            </div>
          </section>

          {/* Section 4: Finalize */}
          <section className="sidebar-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
            <span className="section-label">Final Delivery</span>
            <div className="input-group">
              <label><Mail size={14} /> Your Email Address</label>
              <input 
                name="hostEmail" 
                type="email"
                placeholder="alex@gmail.com"
                required
              />
              <p className="input-hint">For notification and final link delivery.</p>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => navigate('/preview')}>
              <Eye size={18} /> Preview Masterpiece
            </button>
          </section>
        </div>
      </motion.aside>

      {/* Main Preview Area */}
      <main className="builder-main">
        <div className="phone-mockup builder-preview">
          <div className="phone-screen">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${data.template}-${data.eventTitle}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`editorial-layout theme-${data.template}`}
              >
                <div className="editorial-header">Invitation</div>
                <div className="editorial-names">{data.hostNames || "Sarah & James"}</div>
                
                <div className="editorial-divider"></div>

                <div className="editorial-title">{data.eventTitle || "Our Wedding Day"}</div>
                
                <div className="editorial-details">
                  <p>{data.date || "21 June 2026"}</p>
                  <p>{data.time || "18:00"}</p>
                  <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>{data.venue || "The Grand Pavilion"}</p>
                </div>

                <div className="editorial-flourish">
                  <Sparkles size={20} color="var(--primary)" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
