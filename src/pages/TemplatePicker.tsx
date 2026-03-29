import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvitation } from '../InvitationContext';
import type { TemplateModel } from '../InvitationContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const TEMPLATES: { id: TemplateModel; title: string, subtitle: string, color: string }[] = [
  {
    id: 'ethereal-gold',
    title: 'Ethereal Gold',
    subtitle: 'Luxury Editorial',
    color: '#d4af37'
  },
  {
    id: 'midnight-noir',
    title: 'Midnight Noir',
    subtitle: 'Cinematic Modern',
    color: '#6366f1'
  },
  {
    id: 'botanical-glass',
    title: 'Botanical Glass',
    subtitle: 'Organic & Airy',
    color: '#10b981'
  }
];

export default function TemplatePicker() {
  const navigate = useNavigate();
  const { updateData } = useInvitation();

  const handleSelect = (id: TemplateModel) => {
    updateData({ template: id });
    navigate('/builder');
  };

  return (
    <div className="picker-container container">
      <div className="picker-header">
        <Sparkles className="icon-glow" />
        <h1>Choose Your Canvas</h1>
        <p>Select a masterpiece to begin your personalization.</p>
      </div>

      <div className="templates-grid">
        {TEMPLATES.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ y: -10 }}
            className="template-card glass"
            onClick={() => handleSelect(template.id)}
          >
            <div 
              className="template-preview"
              style={{ background: `linear-gradient(135deg, #111 0%, ${template.color}22 100%)` }}
            >
              <div className="preview-label">{template.id.split('-').join(' ')}</div>
            </div>
            <div className="template-info">
              <h3>{template.title}</h3>
              <p>{template.subtitle}</p>
              <ArrowRight className="card-arrow" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
