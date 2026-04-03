import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function LiveGuestView() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [guestRsvpSubmitted, setGuestRsvpSubmitted] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState<'yes'|'no'|null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const { data: inv, error } = await supabase.from('invitations').select('*').eq('id', id).single();
        if (error) throw error;
        setData(inv);
      } catch (err) {
        setErrorMsg('Invitation not found.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id]);

  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  if (isLoading) {
    return <div style={{ minHeight: '100vh', background: 'var(--warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--gold)' }}>Loading...</div></div>;
  }
  
  if (errorMsg || !data) {
    return <div style={{ minHeight: '100vh', background: 'var(--warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)' }}>{errorMsg}</div></div>;
  }

  const names = data.hostNames.split('&').map((n: string) => n.trim());
  const p1 = names[0] || '';
  const p2 = names[1] || '';
  const ds = data.date ? new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : '';
  
  // Need to correctly parse the time
  let ts = data.time || '';
  if (ts) {
    // Basic formatting assuming HH:mm or HH:mm:ss format
    const dt = new Date(`2000-01-01T${ts}`);
    if (!isNaN(dt.getTime())) ts = dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  const rdo = new Date(data.rsvp_deadline);
  const rdf = data.rsvp_deadline && !isNaN(rdo.getTime()) ? rdo.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const showDress = !!data.dress_code;
  const dresscode = data.dress_code;
  const gift = data.gift_info || {};
  const showGift = !!gift.message;
  const tlItems = data.timeline_items || [];
  const faqItems = data.faq_items || [];

  const handleRSVP = async () => {
    const nm = (document.getElementById(`guest-name`) as HTMLInputElement)?.value;
    const em = (document.getElementById(`guest-email`) as HTMLInputElement)?.value;
    const msg = (document.getElementById(`guest-msg`) as HTMLTextAreaElement)?.value;
    if (!nm) return toast('Please enter your name');
    if (!selectedRsvp) return toast('Please select your attendance');
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('rsvps').insert([{
        invitation_id: id,
        guest_name: nm,
        email: em,
        guest_count: 1,
        dietary_notes: msg || ''
      }]);
      if (error) throw error;
      setGuestRsvpSubmitted(true);
      toast('RSVP received! 🎉');
    } catch(err) {
      toast('Transmission failed. Request check of connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div id="view-guest" className="view active">
        <div style={{ minHeight: '100vh', background: 'var(--warm)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
          
          <div className="inv-frame" style={{ width: '100%', maxWidth: '460px', marginTop: '20px' }}>
            <div className={`t-${data.template}`}>
              <div className="inv-cover">
                <div className="inv-cover-bg"></div>
                <div className="inv-cover-content">
                  <div className="inv-eyebrow">You are invited to celebrate</div>
                  <div className="inv-names">{p1}</div>
                  <div className="inv-and">&amp;</div>
                  <div className="inv-names">{p2}</div>
                  <div className="inv-divider"></div>
                  <div className="inv-date-line">{ds} · {ts}</div>
                </div>
              </div>
              
              <div className="inv-body">
                <div className="inv-section">
                  <div className="inv-section-title">Venue</div>
                  <div className="inv-venue">{data.venue}</div>
                  <div className="inv-address">{data.mapsLink}</div>
                  <button className="inv-map-btn" onClick={() => window.open(`https://maps.app.goo.gl/search/${data.mapsLink}`)}>📍 View on map</button>
                </div>
                
                {data.personalMessage && (
                  <div className="inv-section">
                    <div className="inv-section-title">A message for you</div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', lineHeight: 1.6, opacity: 0.8, fontWeight: 300 }}>
                      "{data.personalMessage}"
                    </p>
                  </div>
                )}
                
                {tlItems.length > 0 && (
                  <div className="inv-section">
                    <div className="inv-section-title">Day timeline</div>
                    {tlItems.map((it:any, i: number) => (
                      <div className="inv-tl-item" key={i}>
                        <div className="inv-tl-dot"></div>
                        <div>
                          <div className="inv-tl-time">{it.time}</div>
                          <div className="inv-tl-title">{it.title}</div>
                          <div className="inv-tl-desc">{it.description || it.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {faqItems.length > 0 && (
                  <div className="inv-section">
                    <div className="inv-section-title">FAQs</div>
                    {faqItems.map((f:any, i: number) => (
                      <div className="inv-faq" key={i}>
                        <div className="inv-faq-q">{f.question || f.q}</div>
                        <div className="inv-faq-a">{f.answer || f.a}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {showDress && dresscode && (
                  <div className="inv-section">
                    <div className="inv-section-title">Dress code</div>
                    <p style={{ fontSize: '14px', fontWeight: 500 }}>{dresscode}</p>
                  </div>
                )}
                
                {showGift && (
                  <div className="inv-section">
                    <div className="inv-section-title">Gift</div>
                    <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: 1.7, marginBottom: gift.iban ? '12px' : '0', fontWeight: 300 }}>
                      {gift.message}
                    </p>
                    {gift.iban && (
                      <div style={{ background: 'var(--warm)', borderRadius: '8px', padding: '12px', fontSize: '12px' }}>
                        <div style={{ opacity: 0.6, marginBottom: '4px' }}>{gift.bankName || 'Bank'} · {gift.accountHolder}</div>
                        <div style={{ fontWeight: 500, letterSpacing: '.05em' }}>{gift.iban}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="inv-rsvp-section">
                {!guestRsvpSubmitted ? (
                  <div id={`guest-rsvp-form`}>
                    <div className="inv-rsvp-title">Will you join us?</div>
                    <div className="inv-rsvp-sub">Please RSVP{rdf ? ` by ${rdf}` : ' at your earliest convenience'}</div>
                    <input className="inv-input" id={`guest-name`} placeholder="Your full name" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} />
                    <input className="inv-input" id={`guest-email`} placeholder="Your email" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} />
                    <div className="rsvp-btns">
                      <button 
                        className="rsvp-choice yes" 
                        style={{ opacity: selectedRsvp === 'yes' || !selectedRsvp ? 1 : 0.4, fontWeight: selectedRsvp === 'yes' ? 700 : 500 }}
                        onClick={() => setSelectedRsvp('yes')}
                      >✓ Joyfully attending</button>
                      <button 
                        className="rsvp-choice no" 
                        style={{ opacity: selectedRsvp === 'no' || !selectedRsvp ? 1 : 0.4, fontWeight: selectedRsvp === 'no' ? 700 : 500 }}
                        onClick={() => setSelectedRsvp('no')}
                      >✕ Regretfully decline</button>
                    </div>
                    <textarea className="inv-input" id="guest-msg" rows={2} style={{ resize: 'none', border: '1px solid var(--border)', background: 'var(--cream)' }} placeholder="Leave a message (optional)"></textarea>
                    <button className="inv-submit" onClick={handleRSVP} disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send my RSVP'}</button>
                  </div>
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
          <p style={{ marginTop: '24px', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.1em' }}>CREATED WITH ETERNALVOWS.COM</p>
        </div>
      </div>
      
      <div className={`toast ${toastMsg ? 'show' : ''}`} id="toast">{toastMsg}</div>
    </>
  );
}
