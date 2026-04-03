import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvitation, type InvitationData } from '../InvitationContext';
import { supabase } from '../lib/supabase';

export default function UnboxingPreview() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const context = useInvitation();
  
  const [liveData, setLiveData] = useState<InvitationData | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState(!!id);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRSVPSubmitted, setIsRSVPSubmitted] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);
  const [selectedRsvp, setSelectedRsvp] = useState<'yes' | 'no' | null>(null);

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

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRsvp) {
      setRsvpError("Please select attending or not attending.");
      setTimeout(() => setRsvpError(null), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setRsvpError(null);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (!id) {
        // Pretend submit for preview mode
        setTimeout(() => {
          setIsRSVPSubmitted(true);
          setIsSubmitting(false);
        }, 800);
        return;
      }
      
      const { error } = await supabase.from('rsvps').insert([{
        invitation_id: id,
        guest_name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        guest_count: 1, // Optional logic could be added
        dietary_notes: String(formData.get('message') || '')
      }]);
      
      if (error) throw error;
      setIsRSVPSubmitted(true);
    } catch (err) {
      setRsvpError('Transmission failed. Request check of connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingLive) {
    return (
      <div style={{ background: 'var(--warm)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--gold)' }}>Loading...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div style={{ background: 'var(--warm)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="serif" style={{ fontSize: '2rem' }}>Experience Unavailable</h2>
        <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>{fetchError}</p>
      </div>
    );
  }

  const names = data.hostNames.split('&').map(n => n.trim());
  const p1 = names[0] || 'Partner 1';
  const p2 = names[1] || 'Partner 2';
  
  const dt = new Date(`${data.date}T${data.time}`);
  const dateStr = isNaN(dt.getTime()) ? 'DATE PENDING' : dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  const timeStr = isNaN(dt.getTime()) ? 'TIME PENDING' : dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Optional: check if dress_code string is non-empty rather than a boolean toggle
  const showDress = !!data.dress_code;
  const showGift = !!data.gift_info?.message;

  return (
    <div id="view-guest" className="view active">
      <div style={{ minHeight: '100vh', background: 'var(--warm)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
        
        {/* Navigation Bar for Builder Mode Preview */}
        {!liveData && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '460px', marginBottom: '32px' }}>
            <div className="nav-logo" onClick={() => navigate('/')} style={{ fontSize: '18px' }}>Eternal<span>Vows</span></div>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/builder')}>← Edit</button>
          </div>
        )}

        <div className="inv-frame" id="guest-invitation" style={{ width: '100%', maxWidth: '460px' }}>
          <div className={`t-${data.template}`}>
            <div className="inv-cover">
              <div className="inv-cover-bg"></div>
              <div className="inv-cover-content">
                <div className="inv-eyebrow">You are invited to celebrate</div>
                <div className="inv-names">{p1}</div>
                <div className="inv-and">&amp;</div>
                <div className="inv-names">{p2}</div>
                <div className="inv-divider"></div>
                <div className="inv-date-line">{dateStr} · {timeStr}</div>
              </div>
            </div>
            
            <div className="inv-body">
              <div className="inv-section">
                <div className="inv-section-title">Venue</div>
                <div className="inv-venue">{data.venue}</div>
                <div className="inv-address">{data.mapsLink}</div>
                <button className="inv-map-btn" onClick={() => alert('Opening maps...')}>📍 View on map</button>
              </div>
              
              {data.personalMessage && (
                <div className="inv-section">
                  <div className="inv-section-title">A message for you</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', lineHeight: 1.6, opacity: 0.8, fontWeight: 300 }}>
                    "{data.personalMessage}"
                  </p>
                </div>
              )}
              
              {data.timeline_items && data.timeline_items.length > 0 && (
                <div className="inv-section">
                  <div className="inv-section-title">Day timeline</div>
                  {data.timeline_items.map((it, i) => (
                    <div className="inv-tl-item" key={i}>
                      <div className="inv-tl-dot"></div>
                      <div>
                        <div className="inv-tl-time">{it.time}</div>
                        <div className="inv-tl-title">{it.title}</div>
                        <div className="inv-tl-desc">{it.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {data.faq_items && data.faq_items.length > 0 && (
                <div className="inv-section">
                  <div className="inv-section-title">FAQs</div>
                  {data.faq_items.map((f, i) => (
                    <div className="inv-faq" key={i}>
                      <div className="inv-faq-q">{f.question}</div>
                      <div className="inv-faq-a">{f.answer}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {showDress && data.dress_code && (
                <div className="inv-section">
                  <div className="inv-section-title">Dress code</div>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>{data.dress_code}</p>
                </div>
              )}
              
              {showGift && (
                <div className="inv-section">
                  <div className="inv-section-title">Gift</div>
                  <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: 1.7, marginBottom: (data.gift_info.iban ? '12px' : '0'), fontWeight: 300 }}>
                    {data.gift_info.message}
                  </p>
                  {data.gift_info.iban && (
                    <div style={{ background: 'var(--warm)', borderRadius: '8px', padding: '12px', fontSize: '12px' }}>
                      <div style={{ opacity: 0.6, marginBottom: '4px' }}>
                        {(data.gift_info.bankName || 'Bank')} · {data.gift_info.accountHolder}
                      </div>
                      <div style={{ fontWeight: 500, letterSpacing: '.05em' }}>
                        {data.gift_info.iban}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="inv-rsvp-section">
              {!isRSVPSubmitted ? (
                <form onSubmit={handleRSVP}>
                  <div className="inv-rsvp-title">Will you join us?</div>
                  <div className="inv-rsvp-sub">Please RSVP {data.rsvp_deadline ? `by ${new Date(data.rsvp_deadline).toLocaleDateString()}` : 'at your earliest convenience'}</div>
                  <input name="name" className="inv-input" placeholder="Your full name" required style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} />
                  <input name="email" className="inv-input" placeholder="Your email" required style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} />
                  
                  <div className="rsvp-btns">
                    <button 
                      type="button" 
                      className="rsvp-choice yes" 
                      style={{ opacity: selectedRsvp === 'yes' ? 1 : (selectedRsvp ? 0.4 : 1), fontWeight: selectedRsvp === 'yes' ? 700 : 500 }}
                      onClick={() => setSelectedRsvp('yes')}
                    >✓ Joyfully attending</button>
                    <button 
                      type="button" 
                      className="rsvp-choice no" 
                      style={{ opacity: selectedRsvp === 'no' ? 1 : (selectedRsvp ? 0.4 : 1), fontWeight: selectedRsvp === 'no' ? 700 : 500 }}
                      onClick={() => setSelectedRsvp('no')}
                    >✕ Regretfully decline</button>
                  </div>
                  
                  <textarea name="message" className="inv-input" rows={2} style={{ resize: 'none', border: '1px solid var(--border)', background: 'var(--cream)' }} placeholder="Leave a message (optional)"></textarea>
                  
                  <button type="submit" className="inv-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send my RSVP'}
                  </button>
                </form>
              ) : (
                <div className="rsvp-success" style={{ display: 'block' }}>
                  <div className="si">💌</div>
                  <h3>Thank you!</h3>
                  <p>Your RSVP has been received. We cannot wait to celebrate with you.</p>
                </div>
              )}
            </div>

            <div className="inv-footer">ETERNALVOWS.COM</div>
          </div>
        </div>
        
        {liveData && (
          <p style={{ marginTop: '24px', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.1em' }}>CREATED WITH ETERNALVOWS.COM</p>
        )}
      </div>
      
      {/* RSVP Error Toast styled as the MVP toast */}
      <div className={`toast ${rsvpError ? 'show' : ''}`} id="toast">{rsvpError}</div>
    </div>
  );
}
