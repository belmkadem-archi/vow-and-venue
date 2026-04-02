import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useInvitation, type InvitationData } from '../InvitationContext';
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft, 
  X,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Gift,
  Sparkles,
  ChevronDown,
  Copy
} from 'lucide-react';

/* 1. ETHEREAL GOLD REVEAL */
const EtherealGoldReveal = ({ revealStage, onReveal }: any) => {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fdfbf7', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: revealStage === 0 ? 'pointer' : 'default', overflow: 'hidden' }} onClick={revealStage === 0 ? onReveal : undefined}>
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: revealStage === 1 ? '-100%' : 0 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', background: '#fdfbf7', borderRight: '1px solid rgba(180, 155, 106, 0.2)', zIndex: 10 }}
      />
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: revealStage === 1 ? '100%' : 0 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', background: '#fdfbf7', borderLeft: '1px solid rgba(180, 155, 106, 0.2)', zIndex: 10 }}
      />
      
      <motion.div 
        animate={{ opacity: revealStage === 0 ? 1 : 0, scale: revealStage === 0 ? 1 : 1.2 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 20, textAlign: 'center' }}
      >
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
            <svg width="140" height="140" viewBox="0 0 100 100" style={{ opacity: 0.6 }}>
               <circle cx="50" cy="50" r="48" fill="none" stroke="#b49b6a" strokeWidth="0.5" strokeDasharray="2 2"/>
               <circle cx="50" cy="50" r="40" fill="none" stroke="#b49b6a" strokeWidth="1" />
            </svg>
         </motion.div>
         <h2 className="serif" style={{ color: '#b49b6a', marginTop: '2rem', fontSize: '1rem', letterSpacing: '0.3em', fontWeight: 300 }}>OPEN INVITATION</h2>
      </motion.div>
    </div>
  );
};

/* 2. MIDNIGHT NOIR REVEAL */
const MidnightNoirReveal = ({ revealStage, onReveal }: any) => {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: revealStage === 0 ? 'pointer' : 'default', overflow: 'hidden' }} onClick={revealStage === 0 ? onReveal : undefined}>
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={revealStage === 0 ? { scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] } : { scale: 40, opacity: 0 }}
        transition={revealStage === 0 ? { repeat: Infinity, duration: 4, ease: 'easeInOut' } : { duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}
      />
      <motion.div animate={{ opacity: revealStage === 0 ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ zIndex: 20, textAlign: 'center' }}>
        <h2 className="serif" style={{ color: '#fff', fontSize: '2rem', letterSpacing: '0.2em', fontWeight: 300 }}>E . V</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.4em', marginTop: '2rem' }}>ENTER EXPERIENCE</p>
      </motion.div>
    </div>
  );
};

/* 3. BOTANICAL GLASS REVEAL */
const BotanicalGlassReveal = ({ revealStage, onReveal }: any) => {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fafdfa', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: revealStage === 0 ? 'pointer' : 'default', overflow: 'hidden' }} onClick={revealStage === 0 ? onReveal : undefined}>
      <motion.div 
        animate={{ opacity: revealStage === 0 ? 1 : 0, filter: revealStage === 0 ? 'blur(40px)' : 'blur(0px)' }}
        transition={{ duration: 1.5 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(40px)', zIndex: 10 }}
      />
      <motion.div style={{ zIndex: 20, textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid #6b8e6b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
          <Sparkles color="#6b8e6b" size={32} opacity={0.4} />
        </div>
        <h2 className="serif" style={{ color: '#1a2e1a', marginTop: '2rem', fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 400 }}>UNVEIL</h2>
      </motion.div>
    </div>
  );
};

export default function UnboxingPreview() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const context = useInvitation();
  
  const [liveData, setLiveData] = useState<InvitationData | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState(!!id);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isUnboxed, setIsUnboxed] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [guests, setGuests] = useState("1");
  const [showRSVP, setShowRSVP] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRSVPSubmitted, setIsRSVPSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadLiveInvitation() {
      if (!id) return;
      try {
        const { data: invite, error } = await supabase.from('invitations').select('*').eq('id', id).single();
        if (error) throw error;
        setLiveData(invite);
      } catch (err) {
        console.error("Error loading invitation:", err);
        setFetchError("This invitation could not be found.");
      } finally {
        setIsLoadingLive(false);
      }
    }
    loadLiveInvitation();
  }, [id]);

  const data = liveData || context.data;
  const isPremium = liveData ? (liveData as any).is_premium : true;

  const handleReveal = () => {
    setRevealStage(1);
    setTimeout(() => setIsUnboxed(true), 1500); 
  };

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRsvpError(null);
    const formData = new FormData(e.currentTarget);
    try {
      if (!id) {
        setTimeout(() => {
          setIsRSVPSubmitted(true);
          setShowRSVP(false);
          setTimeout(() => setIsRSVPSubmitted(false), 5000);
        }, 800);
        return;
      }
      const { error } = await supabase.from('rsvps').insert([{
        invitation_id: id,
        guest_name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        guest_count: Number(guests),
        dietary_notes: String(formData.get('message') || '')
      }]);
      if (error) throw error;
      setIsRSVPSubmitted(true);
      setShowRSVP(false);
      setTimeout(() => setIsRSVPSubmitted(false), 5000);
    } catch (err) {
      setRsvpError('Transmission failed. Request check of connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingLive) return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
        <div style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.1)', borderTopColor: '#fff', borderRadius: '50%' }}></div>
      </motion.div>
    </div>
  );

  if (fetchError) return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 className="serif" style={{ fontSize: '2rem' }}>Experience Unavailable</h2>
      <p style={{ color: 'var(--text-dim)', marginTop: '1rem' }}>{fetchError}</p>
    </div>
  );

  return (
    <div className={`unboxing-container theme-${data.template}`} style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <AnimatePresence mode="wait">
        {!isUnboxed ? (
          <motion.div key="unboxing" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 1 }} style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
             {data.template === 'ethereal-gold' && <EtherealGoldReveal revealStage={revealStage} onReveal={handleReveal} />}
             {data.template === 'midnight-noir' && <MidnightNoirReveal revealStage={revealStage} onReveal={handleReveal} />}
             {data.template === 'botanical-glass' && <BotanicalGlassReveal revealStage={revealStage} onReveal={handleReveal} />}
          </motion.div>
        ) : (
          <motion.div key="invitation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 20px 200px' }}>
            
            {/* Header / Hero */}
            <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '120px' }}>
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent)', textTransform: 'uppercase' }}>THE CELEBRATION OF</motion.span>
              <h1 className="serif" style={{ fontSize: '4.5rem', marginTop: '2rem', lineHeight: 1 }}>{data.hostNames}</h1>
              <div className="editorial-divider"></div>
              <p style={{ fontSize: '1.2rem', fontWeight: 300, letterSpacing: '0.1em' }}>{data.eventTitle}</p>
            </div>

            {/* Core Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', width: '100%', maxWidth: '900px', margin: '0 auto 120px' }}>
              <div className="glass" style={{ padding: '3rem', borderRadius: '4px', textAlign: 'center' }}>
                <Calendar size={24} color="var(--accent)" style={{ marginBottom: '2rem' }} />
                <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>The Date</h3>
                <p style={{ fontSize: '1.1rem' }}>{new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p style={{ opacity: 0.6, marginTop: '0.5rem' }}>Beginning at {data.time}</p>
              </div>
              <div className="glass" style={{ padding: '3rem', borderRadius: '4px', textAlign: 'center' }}>
                <MapPin size={24} color="var(--accent)" style={{ marginBottom: '2rem' }} />
                <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>The Venue</h3>
                <p style={{ fontSize: '1.1rem' }}>{data.venue}</p>
                {data.mapsLink && <a href={data.mapsLink} target="_blank" className="btn-secondary" style={{ marginTop: '2rem', padding: '0.6rem 1.5rem', fontSize: '0.65rem' }}>View Map</a>}
              </div>
            </div>

            {/* Timeline Section */}
            {data.timeline_items?.length > 0 && (
              <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto 120px' }}>
                <h2 className="serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>The Day</h2>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'var(--border)' }}></div>
                  {data.timeline_items.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', width: '100%', marginBottom: '4rem', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></div>
                      <div style={{ width: '45%', textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)' }}>{item.time}</span>
                        <h4 className="serif" style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6 }}>{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Gift Registry Card */}
            {data.gift_info?.message && (
              <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '4rem', margin: '0 auto 120px', textAlign: 'center', position: 'relative' }}>
                <Gift size={32} color="var(--accent)" style={{ marginBottom: '2rem' }} />
                <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Gift Registry</h2>
                <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: '3rem' }}>{data.gift_info.message}</p>
                {data.gift_info.iban && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '4px', border: '1px dashed var(--border)' }}>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.5rem' }}>ACCOUNT DETAILS</p>
                    <p style={{ fontSize: '1.1rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{data.gift_info.iban}</p>
                    <button onClick={() => { navigator.clipboard.writeText(data.gift_info.iban!); alert('IBAN Copied'); }} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem auto 0' }}>
                      <Copy size={12} /> Copy IBAN
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* FAQ Accordion */}
            {data.faq_items?.length > 0 && (
              <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto 120px' }}>
                <h2 className="serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>Questions</h2>
                {data.faq_items.map((faq, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', background: 'none', border: 'none', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 300 }}>{faq.question}</span>
                      <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </button>
                    {openFaq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ paddingBottom: '1.5rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}>{faq.answer}</motion.div>}
                  </div>
                ))}
              </div>
            )}

            {/* Final CTA */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', opacity: 0.4, marginBottom: '2rem' }}>YOUR PRESENCE IS REQUIRED</p>
              <button className="btn-primary" onClick={() => setShowRSVP(true)}>R . S . V . P</button>
              {data.rsvp_deadline && <p style={{ fontSize: '0.65rem', opacity: 0.4, marginTop: '1.5rem', letterSpacing: '0.1em' }}>PLEASE RESPOND BY {new Date(data.rsvp_deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>}
            </div>

            {/* Floating Controls */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem', zIndex: 50 }}>
               <button onClick={() => setIsMuted(!isMuted)} className="glass" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                 {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
               </button>
               <button onClick={() => navigate('/builder')} className="glass" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                 <ArrowLeft size={18} />
               </button>
            </div>

            {/* RSVP Success Toast */}
            <AnimatePresence>
              {isRSVPSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass"
                  style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', padding: '1rem 2rem', borderRadius: '99px', border: '1px solid var(--accent)', background: 'rgba(0,0,0,0.8)', color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.1em', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '0.8rem' }}
                >
                  <Sparkles size={16} /> RESPONSE ENGRAVED
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP Modal */}
      <AnimatePresence>
        {showRSVP && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass" style={{ width: '100%', maxWidth: '500px', padding: '4rem', position: 'relative' }}>
              <button onClick={() => setShowRSVP(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff' }}><X size={24}/></button>
              <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>R.S.V.P.</h2>
              <form onSubmit={handleRSVP} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                <div className="input-group"><label>Full Name</label><input name="name" required /></div>
                <div className="input-group"><label>Email Address</label><input name="email" type="email" required /></div>
                <div className="input-group"><label>Additional Guests</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    {[1, 2, 3, 4].map(n => (
                      <button key={n} type="button" onClick={() => setGuests(n.toString())} style={{ flex: 1, padding: '1rem', background: guests === n.toString() ? '#fff' : 'rgba(255,255,255,0.05)', color: guests === n.toString() ? '#000' : '#fff', border: '1px solid var(--border)', borderRadius: '4px' }}>{n}</button>
                    ))}
                  </div>
                </div>
                <div className="input-group"><label>Dietary Notes / Message</label><textarea name="message" rows={3} /></div>
                <button className="btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'SENDING...' : 'CONFIRM ATTENDANCE'}</button>
                {rsvpError && <p style={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'center' }}>{rsvpError}</p>}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isPremium && <div style={{ position: 'fixed', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.8)', padding: '0.3rem 0.8rem', fontSize: '0.6rem', letterSpacing: '0.1em', border: '1px solid rgba(255,255,255,0.1)', opacity: 0.5 }}>MADE WITH ETERNALVOWS.COM</div>}
    </div>
  );
}
