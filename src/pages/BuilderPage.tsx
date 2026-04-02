import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvitation } from '../InvitationContext';
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Music as MusicIcon, 
  Type, 
  Mail,
  Heart,
  Loader2,
  Link as LinkIcon,
  Trash2,
  PlusCircle,
  Gift,
  Layout
} from 'lucide-react';

type TabType = 'details' | 'design' | 'extras';

export default function BuilderPage() {
  const navigate = useNavigate();
  const { data, updateData } = useInvitation();
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleGiftChange = (field: string, value: string) => {
    updateData({ gift_info: { ...data.gift_info, [field]: value } });
  };

  const addTimelineItem = () => {
    updateData({ 
      timeline_items: [...data.timeline_items, { time: '12:00', title: 'New Event', description: 'Enter details...' }] 
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
      faq_items: [...data.faq_items, { question: 'New Question?', answer: 'Enter answer...' }] 
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

  const handleGenerateLink = async () => {
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
          mapsLink: data.mapsLink,
          soundtrack: data.soundtrack,
          personalMessage: data.personalMessage,
          template: data.template,
          timeline_items: data.timeline_items,
          faq_items: data.faq_items,
          gift_info: data.gift_info,
          dress_code: data.dress_code,
          rsvp_deadline: data.rsvp_deadline,
          hostEmail: data.hostEmail,
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

  return (
    <div className="builder-layout" style={{ background: '#030303' }}>
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="builder-sidebar"
        style={{ borderRight: '1px solid var(--border)' }}
      >
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => navigate('/templates')} className="btn-secondary" style={{ padding: '0.4rem', border: 'none' }}>
              <ArrowLeft size={18} />
            </button>
            <div className="logo" style={{ fontSize: '0.9rem', letterSpacing: '0.2em' }}>
              <Sparkles className="logo-icon" size={16} />
              <span>ETERNAL</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="builder-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {(['details', 'design', 'extras'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: 'transparent',
                color: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="sidebar-content" style={{ padding: '2rem', height: 'calc(100vh - 180px)', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <section className="sidebar-section">
                  <span className="section-label">The Essentials</span>
                  <div className="input-group">
                    <label><Type size={14} /> Host Names</label>
                    <input name="hostNames" value={data.hostNames} onChange={handleChange} placeholder="Sarah & James" />
                  </div>
                  <div className="input-group">
                    <label><Heart size={14} /> Event Title</label>
                    <input name="eventTitle" value={data.eventTitle} onChange={handleChange} placeholder="Our Wedding Day" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                    <div className="input-group">
                      <label><Calendar size={14} /> Date</label>
                      <input name="date" type="date" value={data.date} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <label><Clock size={14} /> Time</label>
                      <input name="time" type="time" value={data.time} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="input-group">
                    <label><MapPin size={14} /> Venue Selection</label>
                    <input name="venue" value={data.venue} onChange={handleChange} placeholder="The Grand Pavilion" />
                  </div>
                </section>

                <section className="sidebar-section">
                  <span className="section-label">Day-of Timeline</span>
                  {data.timeline_items.map((item, index) => (
                    <div key={index} className="glass" style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <input 
                          type="time" 
                          value={item.time} 
                          onChange={(e) => updateTimelineItem(index, 'time', e.target.value)}
                          style={{ width: '40%', fontSize: '0.8rem' }}
                        />
                        <button onClick={() => removeTimelineItem(index)} style={{ color: 'rgba(255,255,255,0.3)' }}><Trash2 size={14}/></button>
                      </div>
                      <input 
                        value={item.title} 
                        onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                        placeholder="Title"
                        style={{ width: '100%', marginBottom: '0.5rem', fontWeight: 600 }}
                      />
                      <input 
                        value={item.description} 
                        onChange={(e) => updateTimelineItem(index, 'description', e.target.value)}
                        placeholder="Description"
                        style={{ width: '100%', fontSize: '0.8rem' }}
                      />
                    </div>
                  ))}
                  <button onClick={addTimelineItem} className="btn-secondary" style={{ width: '100%', padding: '0.8rem' }}>
                    <PlusCircle size={14} /> Add Timeline Item
                  </button>
                </section>
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <section className="sidebar-section">
                  <span className="section-label">Theme Selection</span>
                  <div className="input-group">
                    <label><Layout size={14} /> Visual Style</label>
                    <select name="template" value={data.template} onChange={handleChange} style={{ width: '100%' }}>
                      <option value="ethereal-gold">Ethereal Gold</option>
                      <option value="midnight-noir">Midnight Noir</option>
                      <option value="botanical-glass">Botanical Glass</option>
                    </select>
                  </div>
                </section>
                <section className="sidebar-section">
                  <span className="section-label">Atmospheric Options</span>
                  <div className="input-group">
                    <label><MusicIcon size={14} /> Soundtrack</label>
                    <select name="soundtrack" value={data.soundtrack} onChange={handleChange} style={{ width: '100%' }}>
                      <option value="Nocturne in Eb Major">Nocturne in Eb Major</option>
                      <option value="Clair de Lune">Clair de Lune</option>
                      <option value="Gymnopédie No. 1">Gymnopédie No. 1</option>
                    </select>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'extras' && (
              <motion.div
                key="extras"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <section className="sidebar-section">
                  <span className="section-label">Guest Information</span>
                  <div className="input-group">
                    <label>Dress Code</label>
                    <input name="dress_code" value={data.dress_code} onChange={handleChange} placeholder="Black Tie Optional" />
                  </div>
                  <div className="input-group">
                    <label>RSVP Deadline</label>
                    <input name="rsvp_deadline" type="date" value={data.rsvp_deadline} onChange={handleChange} />
                  </div>
                  <div className="input-group">
                    <label>Personal Message</label>
                    <textarea name="personalMessage" value={data.personalMessage} onChange={handleChange} rows={4} placeholder="A short note to your guests..." />
                  </div>
                </section>

                <section className="sidebar-section">
                  <span className="section-label">Gift Registry</span>
                  <div className="input-group">
                    <label><Gift size={14} /> Gift Message</label>
                    <textarea value={data.gift_info.message} onChange={(e) => handleGiftChange('message', e.target.value)} rows={3} />
                  </div>
                  <div className="input-group">
                    <label>Bank Name</label>
                    <input value={data.gift_info.bankName} onChange={(e) => handleGiftChange('bankName', e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>IBAN</label>
                    <input value={data.gift_info.iban} onChange={(e) => handleGiftChange('iban', e.target.value)} />
                  </div>
                </section>

                <section className="sidebar-section">
                  <span className="section-label">FAQs</span>
                  {data.faq_items.map((item, index) => (
                    <div key={index} className="glass" style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>QUESTION {index + 1}</span>
                        <button onClick={() => removeFAQItem(index)} style={{ color: 'rgba(255,255,255,0.3)' }}><Trash2 size={14}/></button>
                      </div>
                      <input value={item.question} onChange={(e) => updateFAQItem(index, 'question', e.target.value)} placeholder="Question" style={{ width: '100%', marginBottom: '0.5rem' }} />
                      <textarea value={item.answer} onChange={(e) => updateFAQItem(index, 'answer', e.target.value)} placeholder="Answer" rows={2} style={{ width: '100%', fontSize: '0.8rem' }} />
                    </div>
                  ))}
                  <button onClick={addFAQItem} className="btn-secondary" style={{ width: '100%', padding: '0.8rem' }}>
                    <PlusCircle size={14} /> Add FAQ
                  </button>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Footer */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem', background: '#030303', borderTop: '1px solid var(--border)' }}>
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label><Mail size={12} /> Contact Email</label>
            <input name="hostEmail" value={data.hostEmail} onChange={handleChange} placeholder="your@email.com" style={{ padding: '0.6rem' }} />
          </div>
          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '1.2rem', gap: '0.8rem' }} 
            onClick={handleGenerateLink}
            disabled={isGenerating}
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <LinkIcon size={18} />}
            {isGenerating ? 'Generating...' : 'Finalize & Get Live Link'}
          </button>
        </div>
      </motion.aside>

      <main className="builder-main">
        <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', opacity: 0.2, filter: 'blur(80px)', pointerEvents: 'none' }}></div>
        <div className="phone-mockup builder-preview" style={{ border: '12px solid #1a1a1a', transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' }}>
          <div className="phone-screen">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${data.template}-${data.eventTitle}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`editorial-layout theme-${data.template}`}
                style={{ height: '100%', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, background: 'radial-gradient(circle at top right, var(--primary), transparent)', pointerEvents: 'none' }}></div>
                <div className="editorial-header">INVITATION</div>
                <div className="editorial-names serif" style={{ fontSize: '2.5rem', fontWeight: 400, lineHeight: 1.1, padding: '0 1rem' }}>
                  {data.hostNames || "Sarah & James"}
                </div>
                <div className="editorial-divider" style={{ width: '60px', height: '1px', background: 'var(--primary)', opacity: 0.6, margin: '2.5rem 0' }}></div>
                <div className="editorial-title" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                  {data.eventTitle || "Our Wedding Day"}
                </div>
                <div className="editorial-details" style={{ marginTop: '2.5rem' }}>
                  <p style={{ fontWeight: 700, letterSpacing: '0.1em' }}>{data.date || "21 June 2026"}</p>
                  <p style={{ opacity: 0.6 }}>{data.time || "18:00"}</p>
                  <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase' }}>
                    {data.venue || "The Grand Pavilion"}
                  </p>
                </div>
                <div className="editorial-flourish" style={{ marginTop: '4rem' }}>
                  <Sparkles size={24} style={{ color: 'var(--primary)', opacity: 0.4 }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
