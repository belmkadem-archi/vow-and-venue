import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInvitation } from '../InvitationContext';
import { 
  Plus, 
  MapPin, 
  Music, 
  Calendar, 
  MailOpen, 
  Send, 
  ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UnboxingPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useInvitation();
  const navigate = useNavigate();

  return (
    <div className="unboxing-container" style={{ background: '#0a0a0a' }}>
      <button className="back-btn-overlay" onClick={() => navigate('/builder')}>
        <ArrowLeft />
      </button>

      <AnimatePresence>
        {!isOpen ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="envelope-wrapper"
            onClick={() => setIsOpen(true)}
          >
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-paper glass">
                <div className="envelope-text">Click to Reveal</div>
                <MailOpen className="icon-glow" />
              </div>
            </div>
            <div className="tap-hint">Tap to Unbox Your Invitation</div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="final-invitation"
          >
            <div className={`invite-card-full theme-${data.template} glass`}>
              <header className="invite-header">
                <div className="event-label">{data.eventTitle}</div>
                <div className="host-names">{data.hostNames}</div>
              </header>

              <div className="invite-divider"></div>

              <div className="invite-body">
                <div className="invite-info-bit">
                  <Calendar size={20} className="bit-icon" />
                  <div className="bit-text">
                    <div className="bit-val">{data.date}</div>
                    <div className="bit-label">{data.time}</div>
                  </div>
                </div>

                <div className="invite-info-bit">
                  <MapPin size={20} className="bit-icon" />
                  <div className="bit-text">
                    <div className="bit-val">{data.venue}</div>
                    <a href={data.mapsLink} target="_blank" className="bit-label-link">Get Directions</a>
                  </div>
                </div>

                <div className="invite-info-bit">
                  <Music size={20} className="bit-icon" />
                  <div className="bit-text">
                    <div className="bit-val">{data.soundtrack}</div>
                    <div className="bit-label">Playing Atmosphere</div>
                  </div>
                </div>

                <div className="personal-message">
                  "{data.personalMessage}"
                </div>
              </div>

              <footer className="invite-actions">
                <button className="btn-primary">
                  <Plus className="btn-icon" /> RSVP NOW
                </button>
                <button className="btn-secondary">
                  <Send className="btn-icon" /> Share Invitation
                </button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
