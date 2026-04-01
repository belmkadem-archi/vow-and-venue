import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Terms() {
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
            <h1 className="serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Terms and Conditions</h1>
            <p style={{ color: 'var(--text-dim)' }}>Last Updated: October 2026</p>
          </div>

          <div className="legal-content" style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>1. Acceptance of Terms</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              By accessing and using templates.vowsperfect.com and the Vow & Venue platform, you accept and agree to be bound by the terms and provision of this agreement. Our "Full Service" offering is fully automated and does not require direct involvement from human experts on our team.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>2. Use License</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Permission is granted to temporarily download one copy of the materials (information or software) on Vow & Venue's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>3. Disclaimer</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              The materials on Vow & Venue's website are provided on an 'as is' basis. Vow & Venue makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>4. Limitations</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              In no event shall Vow & Venue or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Vow & Venue's website.
            </p>
            
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>5. Revisions and Errata</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              The materials appearing on Vow & Venue's website could include technical, typographical, or photographic errors. Vow & Venue does not warrant that any of the materials on its website are accurate, complete, or current.
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
