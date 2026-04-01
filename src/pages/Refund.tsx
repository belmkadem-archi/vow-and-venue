import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Refund() {
  return (
    <div className="app-container" style={{ background: '#050505', minHeight: '100vh', padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass" 
          style={{ padding: '4rem', borderRadius: '24px' }}
        >
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
              <Sparkles className="logo-icon" />
              <span>VOW & VENUE</span>
            </div>
            <h1 className="serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Refund Policy</h1>
            <p style={{ color: 'var(--text-dim)' }}>Last Updated: October 2026</p>
          </div>

          <div className="legal-content" style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>1. Digital Product Nature</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Given the nature of downloadable digital items and fully automated digital invitation generation, all sales are considered final once the digital invitation has been generated and distributed or downloaded.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>2. Eligibility for a Refund</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Refunds may be considered in the rare event of severe technical issues on our platform that prevent the generation or accessibility of your digital invitation, provided that these issues cannot be resolved by our automated systems or support team within a reasonable timeframe.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>3. Non-Refundable Situations</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We do not issue refunds for changes of mind, incorrect event details entered by the user, or if the user simply decides they no longer need the invitation after purchase. Our automated system accurately reflects the inputs provided during the creation process.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>4. Requesting a Refund</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              To request a refund under the eligible criteria, please contact our support team. You must provide a detailed explanation of the technical issue experienced and your order details.
            </p>
            
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>5. Processing Time</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              If your refund request is approved, it will be processed, and a credit will automatically be applied to your credit card or original method of payment within a certain amount of days.
            </p>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link to="/">
              <button className="btn-secondary">
                <ArrowLeft size={16} /> Return Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
