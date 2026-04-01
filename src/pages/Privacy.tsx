import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Privacy() {
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
            <h1 className="serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Privacy Policy</h1>
            <p style={{ color: 'var(--text-dim)' }}>Last Updated: October 2026</p>
          </div>

          <div className="legal-content" style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>1. Information We Collect</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We collect information that you provide directly to us when using the Vow & Venue platform. This includes names, email addresses, and event details necessary to generate your digital invitations and manage RSVPs. Our services are fully automated and we do not manually process this data beyond what the automated system requires.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>2. How We Use Your Information</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We use the information we collect primarily to provide, maintain, and improve our digital invitation services. This includes processing transactions, sending you related information such as confirmations and invoices, and responding to your comments, questions, and requests.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>3. Information Sharing</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We do not share your personal information with third parties except as described in this privacy policy or with your consent. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>4. Data Security</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. RSVPs and event details are stored securely.
            </p>
            
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>5. Your Choices</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              You may update, correct, or delete information about you at any time by logging into your online account or by emailing us. Please note that we may retain certain information as required by law or for legitimate business purposes.
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
