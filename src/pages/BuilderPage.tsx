import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvitation } from '../InvitationContext';
import { supabase } from '../lib/supabase';

type TabType = 'details' | 'design' | 'extras';

export default function BuilderPage() {
  const navigate = useNavigate();
  const { data, updateData } = useInvitation();
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [showDress, setShowDress] = useState(!!data.dress_code);
  const [showGift, setShowGift] = useState(!!data.gift_info?.message);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleGiftChange = (field: string, value: string) => {
    updateData({ gift_info: { ...data.gift_info, [field]: value } });
  };

  const addTimelineItem = () => {
    updateData({ 
      timeline_items: [...data.timeline_items, { time: '12:00 PM', title: 'New Event', description: 'Description' }] 
    });
  };

  const removeTimelineItem = (index: number) => {
    updateData({ 
      timeline_items: data.timeline_items.filter((_, i) => i !== index) 
    });
  };

  const updateTimelineItem = (index: number, field: string, value: string) => {
    const newItems = [...data.timeline_items];
    (newItems[index] as any)[field] = value;
    updateData({ timeline_items: newItems });
  };

  const addFAQItem = () => {
    updateData({ 
      faq_items: [...data.faq_items, { question: 'New Question?', answer: 'Your answer here.' }] 
    });
  };

  const removeFAQItem = (index: number) => {
    updateData({ 
      faq_items: data.faq_items.filter((_, i) => i !== index) 
    });
  };

  const updateFAQItem = (index: number, field: string, value: string) => {
    const newItems = [...data.faq_items];
    (newItems[index] as any)[field] = value;
    updateData({ faq_items: newItems });
  };

  const handlePublish = async () => {
    setIsGenerating(true);
    try {
      const { data: invite, error } = await supabase
        .from('invitations')
        .insert([{
          hostNames: data.hostNames,
          eventTitle: data.eventTitle,
          date: data.date,
          time: data.time,
          venue: data.venue,
          mapsLink: data.mapsLink || '',
          soundtrack: data.soundtrack || '',
          personalMessage: data.personalMessage,
          template: data.template,
          timeline_items: data.timeline_items,
          faq_items: data.faq_items,
          gift_info: showGift ? data.gift_info : {},
          dress_code: showDress ? data.dress_code : '',
          rsvp_deadline: data.rsvp_deadline,
          hostEmail: data.hostEmail || '',
          is_premium: false
        }])
        .select()
        .single();
        
      if (error) throw error;
      if (invite && invite.id) navigate(`/v/${invite.id}`);
    } catch (error) {
      console.error("Error generating invitation:", error);
      alert("Failed to generate link. Our team is investigating.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper to construct names from 'hostNames' (splitting by &) if needed, 
  // or just using the string. The MVP HTML splits them to P1 and P2.
  const names = data.hostNames.split('&').map(n => n.trim());
  const p1 = names[0] || 'Partner 1';
  const p2 = names[1] || 'Partner 2';

  const handleNameChange = (val1: string, val2: string) => {
    updateData({ hostNames: `${val1} & ${val2}` });
  };

  // Live Preview Construction
  const dt = new Date(`${data.date}T${data.time}`);
  const dateStr = isNaN(dt.getTime()) ? 'DATE PENDING' : dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  const timeStr = isNaN(dt.getTime()) ? 'TIME PENDING' : dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div id="view-builder" className="view active">
      <div className="builder-wrap">
        
        {/* SIDEBAR */}
        <div className="builder-sidebar">
          <div className="builder-header">
            <h2>Your Invitation</h2>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/')}>← Back</button>
          </div>
          
          <div className="builder-tabs">
            <div className={`builder-tab ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Details</div>
            <div className={`builder-tab ${activeTab === 'design' ? 'active' : ''}`} onClick={() => setActiveTab('design')}>Design</div>
            <div className={`builder-tab ${activeTab === 'extras' ? 'active' : ''}`} onClick={() => setActiveTab('extras')}>Extras</div>
          </div>

          {activeTab === 'details' && (
            <div className="builder-panel active">
              <div className="section-label">Couple</div>
              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">Partner 1</label>
                  <input className="field-input" value={p1} onChange={(e) => handleNameChange(e.target.value, p2)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Partner 2</label>
                  <input className="field-input" value={p2} onChange={(e) => handleNameChange(p1, e.target.value)} />
                </div>
              </div>
              
              <div className="section-label">Date and Time</div>
              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">Date</label>
                  <input className="field-input" name="date" type="date" value={data.date} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label className="field-label">Time</label>
                  <input className="field-input" name="time" type="time" value={data.time} onChange={handleChange} />
                </div>
              </div>
              
              <div className="section-label">Venue</div>
              <div className="field-group">
                <label className="field-label">Venue name</label>
                <input className="field-input" name="venue" value={data.venue} onChange={handleChange} />
              </div>
              <div className="field-group">
                <label className="field-label">Address</label>
                <input className="field-input" name="mapsLink" placeholder="e.g. 12 Rue du Jardin" value={data.mapsLink} onChange={handleChange} />
              </div>
              
              <div className="section-label">Day timeline</div>
              <div id="timeline-items">
                {data.timeline_items.map((item, index) => (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-item-header">
                      <span className="timeline-item-title">Item {index + 1}</span>
                      <button className="remove-btn" onClick={() => removeTimelineItem(index)}>✕</button>
                    </div>
                    <div className="field-row">
                      <div className="field-group" style={{ marginBottom: '8px' }}>
                        <label className="field-label">Time</label>
                        <input className="field-input" value={item.time} onChange={(e) => updateTimelineItem(index, 'time', e.target.value)} />
                      </div>
                      <div className="field-group" style={{ marginBottom: '8px' }}>
                        <label className="field-label">Title</label>
                        <input className="field-input" value={item.title} onChange={(e) => updateTimelineItem(index, 'title', e.target.value)} />
                      </div>
                    </div>
                    <div className="field-group" style={{ marginBottom: 0 }}>
                      <label className="field-label">Description</label>
                      <input className="field-input" value={item.description} onChange={(e) => updateTimelineItem(index, 'description', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="add-btn" onClick={addTimelineItem}>+ Add timeline item</button>
              
              <div className="section-label" style={{ marginTop: '24px' }}>FAQs</div>
              <div id="faq-items">
                {data.faq_items.map((item, index) => (
                  <div className="faq-item" key={index}>
                    <div className="timeline-item-header">
                      <span className="timeline-item-title">FAQ {index + 1}</span>
                      <button className="remove-btn" onClick={() => removeFAQItem(index)}>✕</button>
                    </div>
                    <div className="field-group" style={{ marginBottom: '8px' }}>
                      <label className="field-label">Question</label>
                      <input className="field-input" value={item.question} onChange={(e) => updateFAQItem(index, 'question', e.target.value)} />
                    </div>
                    <div className="field-group" style={{ marginBottom: 0 }}>
                      <label className="field-label">Answer</label>
                      <textarea className="field-input" rows={2} style={{ resize: 'vertical' }} value={item.answer} onChange={(e) => updateFAQItem(index, 'answer', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="add-btn" onClick={addFAQItem}>+ Add FAQ</button>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="builder-panel active">
              <div className="section-label">Template</div>
              <div className="template-grid">
                <div className={`template-opt ${data.template === 'garden' ? 'selected' : ''}`} onClick={() => updateData({ template: 'garden' })}>
                  <div className="template-thumb" style={{ background: 'linear-gradient(135deg,#e8f0e4,#f5f0e8)' }}>🌿</div>
                  <div className="template-name">Garden of Eden</div>
                </div>
                <div className={`template-opt ${data.template === 'golden' ? 'selected' : ''}`} onClick={() => updateData({ template: 'golden' })}>
                  <div className="template-thumb" style={{ background: 'linear-gradient(135deg,#1c1a18,#2a2520)', color: '#c9a96e', fontSize: '28px' }}>✦</div>
                  <div className="template-name">Golden Night</div>
                </div>
                <div className={`template-opt ${data.template === 'rose' ? 'selected' : ''}`} onClick={() => updateData({ template: 'rose' })}>
                  <div className="template-thumb" style={{ background: 'linear-gradient(135deg,#f9eff5,#ede0ec)' }}>🌸</div>
                  <div className="template-name">Rose Bloom</div>
                </div>
                <div className={`template-opt ${data.template === 'ivory' ? 'selected' : ''}`} onClick={() => updateData({ template: 'ivory' })}>
                  <div className="template-thumb" style={{ background: 'linear-gradient(135deg,#faf6f0,#f5ede0)' }}>🕊️</div>
                  <div className="template-name">Ivory Classic</div>
                </div>
              </div>
              
              <div className="section-label">Options</div>
              <div className="toggle-row">
                <span className="toggle-label">Save the date button</span>
                <label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
              </div>
              <div className="toggle-row">
                <span className="toggle-label">Show dress code</span>
                <label className="toggle"><input type="checkbox" checked={showDress} onChange={(e) => setShowDress(e.target.checked)} /><span className="toggle-slider"></span></label>
              </div>
              {showDress && (
                <div className="field-group" style={{ marginTop: '12px' }}>
                  <label className="field-label">Dress code</label>
                  <input className="field-input" name="dress_code" value={data.dress_code} onChange={handleChange} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'extras' && (
            <div className="builder-panel active">
              <div className="section-label">Gift information</div>
              <div className="toggle-row">
                <span className="toggle-label">Show gift info</span>
                <label className="toggle"><input type="checkbox" checked={showGift} onChange={(e) => setShowGift(e.target.checked)} /><span className="toggle-slider"></span></label>
              </div>
              {showGift && (
                <div>
                  <div className="field-group" style={{ marginTop: '12px' }}>
                    <label className="field-label">Gift message</label>
                    <textarea className="field-input" rows={3} value={data.gift_info.message} onChange={(e) => handleGiftChange('message', e.target.value)} style={{ resize: 'vertical' }} />
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Bank</label>
                      <input className="field-input" placeholder="Bank name" value={data.gift_info.bankName || ''} onChange={(e) => handleGiftChange('bankName', e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Account holder</label>
                      <input className="field-input" value={data.gift_info.accountHolder || ''} onChange={(e) => handleGiftChange('accountHolder', e.target.value)} />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">IBAN</label>
                    <input className="field-input" placeholder="XX00 0000 0000 0000" value={data.gift_info.iban || ''} onChange={(e) => handleGiftChange('iban', e.target.value)} />
                  </div>
                </div>
              )}
              
              <div className="section-label">Personal message</div>
              <div className="field-group">
                <label className="field-label">Message to guests</label>
                <textarea className="field-input" name="personalMessage" rows={3} value={data.personalMessage} onChange={handleChange} style={{ resize: 'vertical' }} />
              </div>
              
              <div className="section-label">RSVP deadline</div>
              <div className="field-group">
                <label className="field-label">RSVP by</label>
                <input className="field-input" name="rsvp_deadline" type="date" value={data.rsvp_deadline} onChange={handleChange} />
              </div>
            </div>
          )}

          <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', background: '#fff', position: 'sticky', bottom: 0 }}>
            <button className="btn btn-green" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '13px' }} onClick={handlePublish} disabled={isGenerating}>
              {isGenerating ? 'Publishing...' : 'Publish and share invitation'}
            </button>
          </div>
        </div>

        {/* PREVIEW FRAME */}
        <div className="builder-preview">
          <div className="preview-bar">
            <span className="preview-bar-title">LIVE PREVIEW</span>
            <div className="preview-actions">
              <button className="btn btn-sm btn-gold" onClick={handlePublish}>Publish</button>
            </div>
          </div>
          
          <div className="preview-scroll">
            <div className="inv-frame">
              {/* Actual Invitation Rendering component logic inline for preview */}
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
                    <button className="inv-map-btn" onClick={(e) => e.preventDefault()}>📍 View on map</button>
                  </div>
                  
                  {data.personalMessage && (
                    <div className="inv-section">
                      <div className="inv-section-title">A message for you</div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', lineHeight: 1.6, opacity: 0.8, fontWeight: 300 }}>
                        "{data.personalMessage}"
                      </p>
                    </div>
                  )}
                  
                  {data.timeline_items.length > 0 && (
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
                  
                  {data.faq_items.length > 0 && (
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
                  <div className="inv-rsvp-title">Will you join us?</div>
                  <div className="inv-rsvp-sub">Please RSVP</div>
                  <input className="inv-input" placeholder="Your full name" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} disabled />
                  <input className="inv-input" placeholder="Your email" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} disabled />
                  <div className="rsvp-btns">
                    <button className="rsvp-choice yes" type="button" disabled>✓ Joyfully attending</button>
                    <button className="rsvp-choice no" type="button" disabled>✕ Regretfully decline</button>
                  </div>
                  <textarea className="inv-input" rows={2} style={{ resize: 'none', border: '1px solid var(--border)', background: 'var(--cream)' }} placeholder="Leave a message (optional)" disabled></textarea>
                  <button className="inv-submit" disabled>Send my RSVP</button>
                </div>
                <div className="inv-footer">ETERNALVOWS.COM</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
