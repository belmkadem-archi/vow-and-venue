import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvitation } from '../InvitationContext';
import { 
  ArrowLeft, 
  Share2, 
  CheckCircle, 
  Mail,
  Users,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function UnboxingPreview() {
  const navigate = useNavigate();
  const { data } = useInvitation();
  const [isDetailsRevealed, setIsDetailsRevealed] = useState(false);
  const [guests, setGuests] = useState("1");
  const [showRSVP, setShowRSVP] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRSVPSubmitted, setIsRSVPSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const guestOptions = [
    { value: "1", label: "Alone", detail: "Attending Alone" },
    { value: "2", label: "2", detail: "With One Guest (+1)" },
    { value: "3", label: "3", detail: "Two Guests (+2)" },
    { value: "4", label: "4", detail: "Three Guests (+3)" }
  ];


  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRsvpError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      guests: Number(guests),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setIsRSVPSubmitted(true);
        setShowRSVP(false);
        setTimeout(() => setIsRSVPSubmitted(false), 5000);
      } else {
        setRsvpError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setRsvpError('Failed to connect to the server. Check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `You're Invited: ${data.eventTitle}`,
          text: `${data.hostNames} is inviting you to a digital masterpiece.`,
          url: window.location.href,
        });
      } catch (error) {
        setShowShare(true);
      }
    } else {
      setShowShare(true);
    }
  };

  return (
    <div className="botanical-container">
      {/* Top Header Actions (Mute/Share) */}
      <div className="preview-controls container" style={{ position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, width: 'calc(100% - 4rem)' }}>
        <button onClick={() => navigate('/builder')} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none' }}>
          <ArrowLeft size={20} color="#f4eedd" />
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setIsMuted(!isMuted)} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none' }}>
            {isMuted ? <VolumeX size={20} color="#f4eedd" /> : <Volume2 size={20} color="#f4eedd" />}
          </button>
          <button onClick={handleShare} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none' }}>
            <Share2 size={20} color="#f4eedd" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        animate={{ y: isDetailsRevealed ? -100 : 0 }} 
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="botanical-hero-img-container"
      >
        <img 
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2669&auto=format&fit=crop" 
          alt="Couple" 
          className="botanical-hero-img" 
        />
        
        {/* The Cream Overlapping Badge */}
        <div className="botanical-badge-wrapper">
          <div className="botanical-badge">
            <h2 className="botanical-title">You're Invited!</h2>
            <p className="botanical-subtitle">Join us in making this day<br/>unforgettable!</p>
            <button 
              className="btn-olive" 
              onClick={() => {
                if (window.navigator.vibrate) window.navigator.vibrate(50);
                setIsDetailsRevealed(true);
                // Scroll to timeline smoothly
                setTimeout(() => {
                  document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Discover the details
            </button>
          </div>
          {/* Floral Left */}
          <div className="botanical-floral botanical-floral-left">
            <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 150 C 20 100, 10 50, 40 10" stroke="#f4eedd" strokeWidth="2" fill="none" />
              <path d="M45 130 C 25 120, 15 110, 20 100 C 35 105, 45 115, 45 130 Z" fill="#f4eedd" opacity="0.9" />
              <path d="M35 90 C 15 80, 5 70, 10 60 C 25 65, 35 75, 35 90 Z" fill="#f4eedd" opacity="0.8" />
              <path d="M42 50 C 22 40, 12 30, 17 20 C 32 25, 42 35, 42 50 Z" fill="#f4eedd" opacity="0.9" />
              <circle cx="20" cy="110" r="4" fill="#fff" />
              <circle cx="15" cy="70" r="3" fill="#fff" />
              <circle cx="25" cy="30" r="4.5" fill="#fff" />
            </svg>
          </div>
          {/* Floral Right */}
          <div className="botanical-floral botanical-floral-right">
             <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 150 C 20 100, 10 50, 40 10" stroke="#f4eedd" strokeWidth="2" fill="none" />
              <path d="M45 130 C 25 120, 15 110, 20 100 C 35 105, 45 115, 45 130 Z" fill="#f4eedd" opacity="0.9" />
              <path d="M35 90 C 15 80, 5 70, 10 60 C 25 65, 35 75, 35 90 Z" fill="#f4eedd" opacity="0.8" />
              <path d="M42 50 C 22 40, 12 30, 17 20 C 32 25, 42 35, 42 50 Z" fill="#f4eedd" opacity="0.9" />
              <circle cx="20" cy="110" r="4" fill="#fff" />
              <circle cx="15" cy="70" r="3" fill="#fff" />
              <circle cx="25" cy="30" r="4.5" fill="#fff" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Details / Timeline Stage */}
      <AnimatePresence>
        {isDetailsRevealed && (
          <motion.div 
            id="timeline"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="timeline-section"
          >
            <h3 className="timeline-header">Event timeline</h3>
            
            <div className="timeline-box">
               <div className="timeline-date-badge">{data.date || "24 March"}</div>
               
               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">12:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Wedding ceremony</span>
                 </div>
                 <div className="timeline-location">
                   {data.venue || "Vrtba Garden, Karmelitska 25, 118 00 Praha 1"}
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">13:30</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Transfer</span>
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">14:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Cocktail hour</span>
                 </div>
                 <div className="timeline-location">
                   Petřínské sady 411/14, 118 00 Praha 1
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">15:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">First dance</span>
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">17:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Dinner & Party</span>
                 </div>
               </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
               <button 
                  className="btn-olive" 
                  style={{ width: '100%', maxWidth: '300px', padding: '1.2rem', fontSize: '1rem', borderRadius: '30px' }}
                  onClick={() => setShowRSVP(true)}
                 >
                   RSVP Now
                </button>
            </div>
            
            {/* Success Toast Details Form */}
            <AnimatePresence>
              {isRSVPSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ marginTop: '2rem', padding: '1rem', color: '#b39b5d', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: 'rgba(178, 156, 103, 0.1)', borderRadius: '12px' }}
                >
                  <CheckCircle size={18} />
                  Your response has been secured.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP Modal */}
      <AnimatePresence>
        {showRSVP && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(15px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass"
              style={{ width: '100%', maxWidth: '500px', padding: '4rem', borderRadius: '24px', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button 
                className="btn-secondary" 
                style={{ position: 'absolute', top: '2rem', right: '2rem', border: 'none', background: 'transparent' }}
                onClick={() => setShowRSVP(false)}
              >
                <X size={24} />
              </button>
              
              <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>R.S.V.P.</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '4rem', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Will you join us for this unique evening?</p>

              <form onSubmit={handleRSVP} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div className="input-group">
                  <label><Users size={14} /> Full Name</label>
                  <input name="name" type="text" required placeholder="Guest Name" disabled={isSubmitting} />
                </div>
                
                <div className="input-group">
                  <label><Mail size={14} /> Email Address</label>
                  <input name="email" type="email" required placeholder="hello@guest.com" disabled={isSubmitting} />
                </div>

                 <div className="input-group" style={{ marginBottom: '2.5rem' }}>
                   <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span><Users size={14} /> ADDITIONAL GUESTS</span>
                     <span style={{ fontSize: '0.65rem', color: 'var(--primary)', opacity: 0.8 }}>
                       {guestOptions.find(o => o.value === guests)?.detail}
                     </span>
                   </label>
                   
                   <div style={{ 
                     display: 'grid', 
                     gridTemplateColumns: 'repeat(4, 1fr)', 
                     gap: '0.8rem',
                     marginTop: '1rem' 
                   }}>
                     {guestOptions.map((opt) => (
                       <button
                         key={opt.value}
                         type="button"
                         onClick={() => setGuests(opt.value)}
                         className={`glass ${guests === opt.value ? 'cinematic-glow' : ''}`}
                         style={{
                           padding: '1rem',
                           borderRadius: '12px',
                           fontSize: '0.9rem',
                           fontWeight: 700,
                           fontFamily: 'var(--font-main)',
                           background: guests === opt.value ? 'var(--primary)' : 'rgba(255,255,255,0.02)',
                           color: guests === opt.value ? '#fff' : 'var(--text-dim)',
                           border: guests === opt.value ? '1px solid var(--accent)' : '1px solid var(--border)',
                           transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                           cursor: 'pointer'
                         }}
                       >
                         {opt.label}
                       </button>
                     ))}
                   </div>
                 </div>

                {rsvpError && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center' }}>{rsvpError}</p>
                )}

                <button 
                  className="btn-primary cinematic-glow" 
                  style={{ width: '100%', padding: '1.2rem', marginTop: '1rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SECURELY SENDING...' : 'CONFIRM ATTENDANCE'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal (Fallback) */}
      <AnimatePresence>
        {showShare && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <motion.div className="glass" style={{ width: '90%', maxWidth: '400px', padding: '2.5rem', borderRadius: '30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="share-icon" style={{ marginBottom: '2rem', color: 'var(--primary)' }}><Share2 size={48} /></div>
              <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Share Masterpiece</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Copy this unique link to send to your guests.</p>
              
              <div className="glass" style={{ padding: '1.2rem', marginBottom: '2.5rem', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--primary)', wordBreak: 'break-all', borderRadius: '12px' }}>
                {window.location.href}
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShare(false);
                }}
              >
                Copy to Clipboard
              </button>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', border: 'none', marginTop: '1rem' }}
                onClick={() => setShowShare(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
