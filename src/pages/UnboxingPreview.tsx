import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useInvitation, type InvitationData } from '../InvitationContext';
import { supabase } from '../lib/supabase';
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

/* 1. ETHEREAL GOLD REVEAL */
const EtherealGoldReveal = ({ revealStage, onReveal }: any) => {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fcfbf9', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: revealStage === 0 ? 'pointer' : 'default', overflow: 'hidden' }} onClick={revealStage === 0 ? onReveal : undefined}>
      {/* Left Door */}
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: revealStage === 1 ? '-100%' : 0 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', background: '#fcfbf9', borderRight: '1px solid rgba(212, 175, 55, 0.3)', zIndex: 10 }}
      />
      {/* Right Door */}
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: revealStage === 1 ? '100%' : 0 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', background: '#fcfbf9', borderLeft: '1px solid rgba(212, 175, 55, 0.3)', zIndex: 10 }}
      />
      
      {/* The Crest / Lock */}
      <motion.div 
        animate={{ opacity: revealStage === 0 ? 1 : 0, scale: revealStage === 0 ? 1 : 1.2 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 20, textAlign: 'center' }}
      >
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            <svg width="120" height="120" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4"/>
               <circle cx="50" cy="50" r="35" fill="none" stroke="#D4AF37" strokeWidth="2" />
               <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            </svg>
         </motion.div>
         <h2 className="serif" style={{ color: '#D4AF37', marginTop: '2rem', fontSize: '1.2rem', letterSpacing: '0.2em' }}>TOUCH TO REVEAL</h2>
      </motion.div>
    </div>
  );
};

/* 2. MIDNIGHT NOIR REVEAL */
const MidnightNoirReveal = ({ revealStage, onReveal }: any) => {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: revealStage === 0 ? 'pointer' : 'default', overflow: 'hidden' }} onClick={revealStage === 0 ? onReveal : undefined}>
      {/* The Silver Eclipse Ring */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={
          revealStage === 0 
          ? { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] } 
          : { scale: 50, opacity: 0 } 
        }
        transition={
          revealStage === 0 
          ? { repeat: Infinity, duration: 3, ease: 'easeInOut' }
          : { duration: 1.5, ease: 'easeOut' }
        }
        style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: '2px solid rgba(148, 163, 184, 0.5)', boxShadow: '0 0 40px rgba(148, 163, 184, 0.3), inset 0 0 20px rgba(148, 163, 184, 0.3)', zIndex: 10 }}
      />
      
      {/* Center Monogram */}
      <motion.div
        animate={{ opacity: revealStage === 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ zIndex: 20, textAlign: 'center' }}
      >
        <span className="serif" style={{ color: '#E2E8F0', fontSize: '2.5rem', letterSpacing: '0.1em', textShadow: '0 0 20px rgba(226, 232, 240, 0.5)' }}>S & J</span>
        <p style={{ color: '#94A3B8', fontSize: '0.7rem', letterSpacing: '0.4em', marginTop: '2rem' }}>ENTER</p>
      </motion.div>

      {/* The flash overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: revealStage === 1 ? [0, 1, 0] : 0 }}
        transition={{ duration: 1.5, times: [0, 0.3, 1] }}
        style={{ position: 'absolute', inset: 0, background: '#E2E8F0', zIndex: 30, pointerEvents: 'none' }}
      />
    </div>
  );
};

/* 3. BOTANICAL GLASS REVEAL */
const BotanicalGlassReveal = ({ revealStage, onReveal }: any) => {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: revealStage === 0 ? 'pointer' : 'default', overflow: 'hidden' }} onClick={revealStage === 0 ? onReveal : undefined}>
      
      {/* Faint botanical background image (to blur) */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1543161358-0ceb68fcac60?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }} />

      {/* The heavy frosted glass layer that dissolves */}
      <motion.div 
        animate={{ opacity: revealStage === 0 ? 1 : 0, backdropFilter: revealStage === 0 ? 'blur(40px)' : 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(5, 5, 5, 0.4)', WebkitBackdropFilter: revealStage === 0 ? 'blur(40px)' : 'blur(0px)', zIndex: 10 }}
      />

      {/* Green Wax Seal that Cracks */}
      <motion.div style={{ zIndex: 20, width: '120px', height: '120px', position: 'relative' }}>
         <motion.div
           animate={revealStage === 1 ? { x: -80, y: 50, rotate: -45, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
           transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
           style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 45% 0, 55% 100%, 0 100%)' }}
         >
           <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}></div>
         </motion.div>
         <motion.div
           animate={revealStage === 1 ? { x: 80, y: 60, rotate: 45, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
           transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
           style={{ position: 'absolute', inset: 0, clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 55% 100%)' }}
         >
           <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}></div>
         </motion.div>
         <motion.div 
           animate={{ opacity: revealStage === 0 ? 1 : 0 }}
           transition={{ duration: 0.2 }}
           style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
         >
            <span className="serif" style={{ color: '#ffffff', fontSize: '1.8rem', opacity: 0.8, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>S&J</span>
         </motion.div>
      </motion.div>
      <motion.p
        animate={{ opacity: revealStage === 0 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', bottom: '15%', color: '#ffffff', letterSpacing: '0.3em', fontSize: '0.7rem', zIndex: 20 }}
      >
         BREAK THE SEAL
      </motion.p>
    </div>
  );
};

export default function UnboxingPreview() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Use Context for Builder preview, fallback state for Live link
  const context = useInvitation();
  
  const [liveData, setLiveData] = useState<InvitationData | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState(!!id);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isUnboxed, setIsUnboxed] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [guests, setGuests] = useState("1");
  const [showRSVP, setShowRSVP] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRSVPSubmitted, setIsRSVPSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLiveInvitation() {
      if (!id) return;
      try {
        const { data: invite, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setLiveData(invite);
      } catch (err) {
        console.error("Error loading invitation:", err);
        setFetchError("This invitation could not be found or has been removed.");
      } finally {
        setIsLoadingLive(false);
      }
    }
    loadLiveInvitation();
  }, [id]);

  // Use live data if fetching from real URL, else fallback to Builder context
  const data = liveData || context.data;

  const guestOptions = [
    { value: "1", label: "Alone", detail: "Attending Alone" },
    { value: "2", label: "2", detail: "With One Guest (+1)" },
    { value: "3", label: "3", detail: "Two Guests (+2)" },
    { value: "4", label: "4", detail: "Three Guests (+3)" }
  ];

  const handleReveal = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(50);
    setRevealStage(1);
    
    setTimeout(() => {
      setIsUnboxed(true);
    }, 1500); 
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
      if (!id) {
        // If we are just previewing in the builder (no real database UUID yet)
        setTimeout(() => {
          setIsRSVPSubmitted(true);
          setShowRSVP(false);
          setTimeout(() => setIsRSVPSubmitted(false), 5000);
        }, 800);
        return;
      }

      // Live link: Insert real RSVP into Supabase securely
      const { error } = await supabase
        .from('rsvps')
        .insert([{
          invitation_id: id,
          guest_name: String(data.name || ''),
          email: String(data.email || ''),
          guest_count: Number(guests),
          dietary_notes: String(data.message || '')
        }]);

      if (error) throw error;

      setIsRSVPSubmitted(true);
      setShowRSVP(false);
      setTimeout(() => setIsRSVPSubmitted(false), 5000);

    } catch (err) {
      console.error('RSVP Sync Error:', err);
      setRsvpError('Could not send your RSVP right now. Are you connected to the internet?');
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

  if (isLoadingLive) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <div style={{ width: '30px', height: '30px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
         </motion.div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Invitation Unavailable</h2>
        <p style={{ opacity: 0.6, letterSpacing: '0.1em' }}>{fetchError}</p>
      </div>
    );
  }

  // Check if live data is freemium or premium
  const isPremium = liveData ? (liveData as any).is_premium : true; // Always premium in Builder Mode

  return (
    <div className="unboxing-container" style={{ background: '#050505', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
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
          /* CINEMATIC UNBOXING GATES */
          <motion.div 
            key="unboxing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="unboxing-stage"
            style={{ position: 'absolute', inset: 0, zIndex: 10 }}
          >
             {data.template === 'ethereal-gold' && <EtherealGoldReveal revealStage={revealStage} onReveal={handleReveal} />}
             {data.template === 'midnight-noir' && <MidnightNoirReveal revealStage={revealStage} onReveal={handleReveal} />}
             {data.template === 'botanical-glass' && <BotanicalGlassReveal revealStage={revealStage} onReveal={handleReveal} />}
             {/* Fallback */}
             {!data.template && <MidnightNoirReveal revealStage={revealStage} onReveal={handleReveal} />}
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

      {/* Freemium Watermark Badge (Non-Premium Users Only) */}
      {!isPremium && (
        <a 
          href="https://vowandvenue.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <span>Created with Vow & Venue</span>
        </a>
      )}
    </div>
  );
}
