import { Link } from "react-router-dom";
import GosuSpeflLockup from "./GosuSpeflLockup";
import SocialLinks from "./SocialLinks";
import { useRegisterModal } from "../context/RegisterModalContext";
import "./seoFooter.css";

export default function SeoFooter() {
  const { openRegisterModal } = useRegisterModal();

  return (
    <footer className="seo-footer">
      {/* ── Pre-footer Action Banner ── */}
      <section className="seo-footer__banner">
        <div className="seo-footer__banner-inner">
          <div className="seo-footer__banner-brand">
            GOSU <span>ACADEMY</span>
            <span className="seo-footer__banner-badge">SPEFL-SC ACCREDITED</span>
          </div>
          <h2 className="seo-footer__banner-title">
            Start Your Esports Career Under India's National Framework.
          </h2>
          <p className="seo-footer__banner-sub">
            Inaugural cohort applications are open across Valorant, BGMI, Coaching, and Tournament Operations.
          </p>
          <div className="seo-footer__banner-actions">
            <button
              type="button"
              className="c1-btn c1-btn--gold"
              onClick={() => openRegisterModal()}
            >
              Join The Waitlist
            </button>
            <a className="c1-btn c1-btn--ghost" href="#titles">
              Explore Our Courses
            </a>
          </div>
        </div>
      </section>

      {/* ── Main SEO Directory Grid (Streamlined, Accurate, No Redundancy) ── */}
      <div className="seo-footer__directory">
        <div className="seo-footer__grid">
          {/* Col 1: Official Programs */}
          <div className="seo-footer__col">
            <h3 className="seo-footer__col-title">Official Programs</h3>
            <ul className="seo-footer__list">
              <li><Link className="seo-footer__link" to="/valorant">Valorant Pro Athlete Track</Link></li>
              <li><Link className="seo-footer__link" to="/bgmi">BGMI Tactical Athlete Track</Link></li>
              <li><Link className="seo-footer__link" to="/coaching">Esports Team Coaching & Strategy</Link></li>
              <li><Link className="seo-footer__link" to="/tournament-ops">Tournament Operations & Admin</Link></li>
              <li>
                <button
                  type="button"
                  className="seo-footer__link-btn"
                  onClick={() => openRegisterModal()}
                >
                  Priority Cohort Registration →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: National Credential */}
          <div className="seo-footer__col">
            <h3 className="seo-footer__col-title">Accreditation</h3>
            <ul className="seo-footer__list">
              <li><a className="seo-footer__link" href="#certified">SPEFL-SC Recognized Certificate <span className="seo-footer__badge-pill">Govt</span></a></li>
              <li><a className="seo-footer__link" href="#partnership">Bharat Esports Federation Alliance</a></li>
              <li><a className="seo-footer__link" href="#method">Real Tournament Capstone Portfolio</a></li>
              <li><a className="seo-footer__link" href="#certified">Decoupled from Real Money Gaming</a></li>
              <li><a className="seo-footer__link" href="#certified">100% Video Game Sports Purity</a></li>
            </ul>
          </div>

          {/* Col 3: Academy & Governance */}
          <div className="seo-footer__col">
            <h3 className="seo-footer__col-title">Academy</h3>
            <ul className="seo-footer__list">
              <li><a className="seo-footer__link" href="#partnership">About Gosu Esports Academy</a></li>
              <li><a className="seo-footer__link" href="#coaches">Faculty & Head Coaches</a></li>
              <li><a className="seo-footer__link" href="#certified">Parent Bridge & Orientation</a></li>
              <li><a className="seo-footer__link" href="#faq">Frequently Asked Questions</a></li>
              <li><Link className="seo-footer__link" to="/contact">Admissions Office</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="seo-footer__col">
            <h3 className="seo-footer__col-title">Legal & Policies</h3>
            <ul className="seo-footer__list">
              <li><Link className="seo-footer__link" to="/terms">Terms of Admission</Link></li>
              <li><Link className="seo-footer__link" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="seo-footer__link" to="/refunds">Refund & Fee Policy</Link></li>
              <li><Link className="seo-footer__link" to="/contact">Grievance Redressal</Link></li>
            </ul>
            <div className="seo-footer__badge-btn" style={{ marginTop: "16px" }}>
              <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              <div>
                <span>National Governance</span>
                <strong>SPEFL-SC Certified</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Sole Location for Social Links ── */}
      <div className="seo-footer__bottom">
        <div className="seo-footer__bottom-inner">
          <div className="seo-footer__copy">
            <div style={{ marginBottom: "8px" }}>
              <GosuSpeflLockup size={24} theme="pill" />
            </div>
            <span className="seo-footer__copy-text">
              © {new Date().getFullYear()} Gosu Esports Academy Pvt. Ltd. · In Strategic Alliance with Bharat Esports Federation.
            </span>
            <span className="seo-footer__statutory">
              Official Vocational Skilling Partner · SPEFL-SC Recognized Certifications · Decoupled from Real Money Gaming (RMG).
            </span>
          </div>
          <div className="seo-footer__social-wrap">
            <SocialLinks variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
