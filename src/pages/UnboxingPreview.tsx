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
  ArrowLeft,
  X,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UnboxingPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpStep, setRsvpStep] = useState<'form' | 'success'>('form');
  const [guestEmail, setGuestEmail] = useState('');
  const { data } = useInvitation();
  const navigate = useNavigate();

  const handleShare = async () => {
    const shareData = {
      title: 'Our Digital Invitation',
      text: `You're invited to ${data.eventTitle}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend here. 
    // Capturing email: guestEmail
    setRsvpStep('success');
  };

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
                    <a href={data.mapsLink} target="_blank" className="bit-label-link" rel="noreferrer">Get Directions</a>
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
                <button className="btn-primary" onClick={() => setShowRsvpModal(true)}>
                  <Plus className="btn-icon" /> RSVP NOW
                </button>
                <button className="btn-secondary" onClick={handleShare}>
                  <Send className="btn-icon" /> Share Invitation
                </button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP Modal */}
      <AnimatePresence>
        {showRsvpModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content glass"
            >
              <button className="close-btn" onClick={() => setShowRsvpModal(false)}>
                <X />
              </button>

              {rsvpStep === 'form' ? (
                <>
                  <h2>Confirm Your Presence</h2>
                  <p>We're so excited to have you with us!</p>
                  
                  <form onSubmit={handleRsvpSubmit} className="rsvp-form">
                    <div className="input-group">
                      <label>Your Full Name</label>
                      <input type="text" placeholder="Sarah James" required />
                    </div>
                    <div className="input-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        placeholder="sarah@example.com" 
                        required 
                        value={guestEmail} 
                        onChange={(e) => setGuestEmail(e.target.value)} 
                      />
                    </div>
                    <div className="input-group">
                      <label>Number of Guests</label>
                      <select>
                        <option>Just Me (1)</option>
                        <option>Plus One (2)</option>
                        <option>Family (3+)</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                      Confirm Attendance
                    </button>
                  </form>
                </>
              ) : (
                <div className="rsvp-success text-center">
                  <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                  <h2>You're All Set!</h2>
                  <p>Your RSVP has been confirmed. A confirmation has been sent to {guestEmail}.</p>
                  <button className="btn-secondary" onClick={() => setShowRsvpModal(false)}>
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .close-btn {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: none;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
        }
        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .rsvp-form .input-group label {
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          display: block;
          color: var(--text-dim);
        }
        .rsvp-form input, .rsvp-form select {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          padding: 1rem;
          border-radius: 12px;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
