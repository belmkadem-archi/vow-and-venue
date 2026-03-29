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
  Mail
} from 'lucide-react';

export default function BuilderPage() {
  const navigate = useNavigate();
  const { data, updateData } = useInvitation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="builder-layout">
      {/* Sidebar Editor */}
      <motion.aside 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="builder-sidebar glass"
      >
        <div className="sidebar-header">
          <button onClick={() => navigate('/templates')} className="back-btn">
            <ArrowLeft size={18} />
          </button>
          <h2>Personalize</h2>
        </div>

        <div className="scroll-area">
          <div className="input-group">
            <label><Type size={14} /> Host Names</label>
            <input 
              name="hostNames" 
              value={data.hostNames} 
              onChange={handleChange} 
              placeholder="e.g., Alex & Jordan"
            />
          </div>

          <div className="input-group">
            <label><Sparkles size={14} /> Event Title</label>
            <input 
              name="eventTitle" 
              value={data.eventTitle} 
              onChange={handleChange} 
              placeholder="e.g., Union Celebration"
            />
          </div>

          <div className="row-group">
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
              placeholder="The Grand Pavilion"
            />
          </div>

          <div className="input-group">
            <label><MusicIcon size={14} /> Soundtrack</label>
            <select name="soundtrack" value={data.soundtrack} onChange={handleChange}>
              <option value="Nocturne in Eb Major">Nocturne in Eb Major</option>
              <option value="Clair de Lune">Clair de Lune</option>
              <option value="Gymnopédie No. 1">Gymnopédie No. 1</option>
              <option value="Modern Love">Modern Love (Upbeat)</option>
            </select>
          </div>

          <div className="input-group">
            <label>Message</label>
            <textarea 
              name="personalMessage" 
              value={data.personalMessage} 
              onChange={handleChange} 
              rows={3}
            />
          </div>


          <div className="section-divider"></div>

          <div className="input-group">
            <label><Mail size={14} /> Host Email (For Delivery)</label>
            <input 
              name="hostEmail" 
              type="email"
              placeholder="alex@example.com"
              required
            />
            <p className="input-hint">We'll send your final invitation link here.</p>
          </div>

          <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate('/preview')}>
            <Eye size={18} /> Preview Masterpiece
          </button>
        </div>
      </motion.aside>

      {/* Main Preview Area */}
      <main className="builder-main">
        <div className="phone-mockup builder-preview">
          <div className="phone-screen" style={{ background: `linear-gradient(to bottom, #111, ${data.template === 'ethereal-gold' ? '#d4af37' : data.template === 'midnight-noir' ? '#6366f1' : '#10b981'}22)` }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={data.template}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="invite-mock-content"
              >
                <div className={`template-preview-ui theme-${data.template}`}>
                  <div className="ui-header">INVITATION</div>
                  <div className="ui-title">{data.eventTitle}</div>
                  <div className="ui-names">{data.hostNames}</div>
                  <div className="ui-border"></div>
                  <div className="ui-details">
                    <p>{data.date} • {data.time}</p>
                    <p>{data.venue}</p>
                  </div>
                  <div className="ui-footer">
                    <Sparkles size={12} /> Personalized for You
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
