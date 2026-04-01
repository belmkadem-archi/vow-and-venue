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
  const [isUnboxed, setIsUnboxed] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isPaperPulled, setIsPaperPulled] = useState(false);
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

  const handleUnbox = () => {
    // Vibrate/Haptic feel (if supported)
    if (window.navigator.vibrate) window.navigator.vibrate(50);
    
    setTimeout(() => {
      setIsFlapOpen(true);
      setTimeout(() => {
        setIsPaperPulled(true);
        setTimeout(() => {
          setIsUnboxed(true);
        }, 1500);
      }, 1200);
    }, 600); // Simulate firm tactile press
  };


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
    <div className="unboxing-container" style={{ background: '#050505', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Cinematic Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '10%', right: '10%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(100px)' }}
        ></motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!isUnboxed ? (
          /* CINEMATIC UNBOXING STAGE */
          <motion.div 
            key="unboxing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="unboxing-stage"
          >
            <div className="envelope-3d" onClick={!isFlapOpen ? handleUnbox : undefined}>
              <motion.div 
                className="envelope-container"
                initial={{ rotateX: 45, y: 100 }}
                animate={{ rotateX: isFlapOpen ? 0 : 20, y: isFlapOpen ? 100 : 0 }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ 
                  width: '380px', 
                  height: '260px', 
                  background: 'linear-gradient(135deg, #304236 0%, #1A251E 100%)', /* The back interior of the envelope */
                  borderRadius: '12px',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  margin: '0 auto'
                }}
              >
                {/* Envelope Flap */}
                <div className={`envelope-flap ${isFlapOpen ? 'open' : ''}`}></div>
                
                {/* Invitation Paper (inside) */}
                <div className={`envelope-paper ${isPaperPulled ? 'pulled' : ''}`}>
                   <h3 className="serif" style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '1rem' }}>M A S T E R P I E C E</h3>
                   <div style={{ width: '30px', height: '1px', background: 'var(--accent)', opacity: 0.5 }}></div>
                </div>

                {/* Envelope Front Pocket (Solid Green Front) */}
                <div style={{ 
                  position: 'absolute', bottom: 0, left: 0, width: '100%', height: '65%', 
                  background: 'linear-gradient(to bottom, #4A5D4E 0%, #2D3A30 100%)', 
                  borderRadius: '0 0 12px 12px', zIndex: 3, 
                  borderTop: '1px solid rgba(255,255,255,0.1)', 
                  boxShadow: '0 -5px 20px rgba(0,0,0,0.2)',
                  transform: 'translateZ(2px)'
                }}></div>

                {/* Envelope Front Body Overlay */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 4, borderRadius: '12px', background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)', pointerEvents: 'none', transform: 'translateZ(5px)' }}>
                   <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div 
                          className="vector-seal" 
                          style={{ margin: '0 auto' }}
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isFlapOpen) handleUnbox();
                          }}
                        >
                          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{width: '90px', height: '90px'}}>
                            <defs>
                              <radialGradient id="gold-grad" cx="30%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#FFF7D6" />
                                <stop offset="20%" stopColor="#D4AF37" />
                                <stop offset="50%" stopColor="#C59F2A" />
                                <stop offset="85%" stopColor="#8A6B1C" />
                                <stop offset="100%" stopColor="#4A380A" />
                              </radialGradient>
                              <filter id="gold-inner-shadow">
                                <feOffset dx="0" dy="2"/>
                                <feGaussianBlur stdDeviation="1.5" result="offset-blur"/>
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                                <feFlood floodColor="#4A380A" floodOpacity="0.9" result="color"/>
                                <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                                <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
                              </filter>
                              <filter id="gold-drop-shadow">
                                <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.5" />
                              </filter>
                            </defs>
                            <path d="M50 2C65 1 78 8 85 18C92 28 98 42 96 55C94 68 85 80 72 88C60 95 45 98 32 94C20 89 10 78 5 65C0 52 2 35 10 22C18 10 32 3 50 2Z" fill="url(#gold-grad)" filter="url(#gold-drop-shadow)" />
                            <circle cx="50" cy="50" r="34" fill="url(#gold-grad)" filter="url(#gold-inner-shadow)" />
                            <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                          </svg>
                          <span className="vector-seal-text" style={{ color: '#4A380A', textShadow: '-1px -1px 0 rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.3)', fontWeight: 700 }}>S <span style={{ fontSize: '1rem', margin: '0 2px' }}>&</span> J</span>
                        </motion.div>
                        <p style={{ marginTop: '3rem', letterSpacing: '0.4em', fontSize: '0.65rem', color: '#8A6B1C', fontWeight: 800 }}>CLICK TO OPEN...</p>
                        <h2 style={{ marginTop: '0.8rem', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', opacity: 0.7, color: '#f4eedd' }}>For You</h2>
                      </motion.div>
                   </div>
                </div>
              </motion.div>
              
              {/* Floating Cinematic Dust */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 0.3, 0], 
                    y: -400, 
                    x: Math.random() * 600 - 300,
                  }}
                  transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 5 }}
                  style={{ position: 'absolute', bottom: '10%', left: '50%', width: '2px', height: '2px', borderRadius: '50%', background: 'var(--accent)', filter: 'blur(1px)' }}
                ></motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* FINAL INVITATION STAGE */
          <motion.div 
            key="invitation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="invitation-stage"
            style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6rem 2rem' }}
          >
            {/* Header Controls */}
            <div className="preview-controls container" style={{ position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, width: 'calc(100% - 4rem)' }}>
              <button onClick={() => navigate('/builder')} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                <ArrowLeft size={20} />
              </button>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setIsMuted(!isMuted)} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={handleShare} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Editorial Invitation Card */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className={`invitation-card theme-${data.template}`}
              style={{ 
                maxWidth: '650px', 
                width: '100%', 
                padding: '6rem 4rem', 
                textAlign: 'center', 
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
               {/* Theme-Specific Flourishes */}
               {data.template === 'ethereal-gold' && (
                 <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '14px', pointerEvents: 'none' }}></div>
               )}
               {data.template === 'botanical-glass' && (
                 <div style={{ position: 'absolute', top: -100, right: -100, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: -1 }}></div>
               )}
               
               <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, transparent, var(--accent), transparent)', opacity: 0.5 }}></div>
               
               <header style={{ marginBottom: '5rem' }}>
                 <motion.p 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.8 }}
                   style={{ letterSpacing: '0.6em', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '3rem' }}
                 >
                   THE PLEASURE OF YOUR COMPANY
                 </motion.p>
                 <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="serif" 
                    style={{ fontSize: '4.5rem', lineHeight: 0.9, marginBottom: '2.5rem', fontWeight: 400 }}
                 >
                   {data.hostNames || "Sarah & James"}
                 </motion.h1>
                 <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    style={{ fontSize: '1.2rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                 >
                   {data.eventTitle || "Wedding Celebration"}
                 </motion.p>
               </header>

               <div className="editorial-divider" style={{ width: '60px', height: '1px', background: 'var(--accent)', margin: '4rem auto', opacity: 0.3 }}></div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '3rem', marginBottom: '5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>DATE</p>
                    <p style={{ fontWeight: 400, fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>{data.date || "21.06.26"}</p>
                  </div>
                  <div style={{ width: '1px', height: '60px', background: 'var(--border)', opacity: 0.5 }}></div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>TIME</p>
                    <p style={{ fontWeight: 400, fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>{data.time || "18:00"}</p>
                  </div>
               </div>

               <div style={{ marginBottom: '5rem' }}>
                 <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '1rem' }}>LOCATION</p>
                 <p style={{ fontSize: '1.2rem', color: 'var(--text)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
                   {data.venue || "The Grand Pavilion, Paris"}
                 </p>
               </div>

               <footer style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                 <button 
                  className="btn-primary cinematic-glow" 
                  style={{ width: '100%', maxWidth: '300px', padding: '1.2rem', letterSpacing: '0.2em', fontSize: '0.8rem' }}
                  onClick={() => setShowRSVP(true)}
                 >
                   R . S . V . P
                 </button>
                 <p style={{ fontSize: '0.7rem', opacity: 0.4, letterSpacing: '0.1em' }}>PLEASE RESPOND BY THE FIFTEENTH OF MAY</p>
               </footer>
            </motion.div>

            {/* Success Toast */}
            <AnimatePresence>
              {isRSVPSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  className="glass-morphism"
                  style={{ position: 'fixed', bottom: '40px', padding: '1rem 2.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '99px', border: '1px solid rgba(16, 185, 129, 0.2)', zIndex: 1000 }}
                >
                  <CheckCircle size={20} />
                  Your response has been engraved.
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
