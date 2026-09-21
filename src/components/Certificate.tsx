import "./certificate.css";

export interface CertificateDoc {
  /** specimen certificate number, e.g. "GSA-VAL-26-0001" */
  id: string;
  /** credential level shown top-right, e.g. "Skill Level 2" / "Foundation" */
  level: string;
  /** credential name, e.g. "Valorant Advanced" */
  title: string;
  /** the completion sentence after the recipient name */
  body: string;
}

/**
 * Specimen of the co-branded Gosu Academy × SPEFL-SC certificate, shown in
 * each "credential" section. Built in HTML/CSS (not an image) so the wording
 * stays exact and the real partner logos render crisp; every size is in cqw
 * so the document scales with whatever column it sits in.
 */
export default function Certificate({ doc }: { doc: CertificateDoc }) {
  return (
    <div className="certx" aria-hidden>
      <div className="certx__doc">
        <span className="certx__frame" />
        <span className="certx__rings" />
        <svg className="certx__watermark" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 4 L60 58 H4 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M32 22 L46 50 H18 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>

        <header className="certx__meta">
          <span>Nº {doc.id}</span>
          <span>{doc.level}</span>
        </header>

        <span className="certx__seal">
          <svg viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="certxGold" x1="8" y1="4" x2="56" y2="60">
                <stop offset="0" stopColor="#f7d774" />
                <stop offset="0.5" stopColor="#d9ab4d" />
                <stop offset="1" stopColor="#9c6f24" />
              </linearGradient>
            </defs>
            <path
              d="M32 8 L55 52 H9 Z"
              stroke="url(#certxGold)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M32 23 L43 45 H21 Z"
              stroke="url(#certxGold)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="15.5" r="2.8" fill="url(#certxGold)" />
          </svg>
        </span>

        <p className="certx__kind">Certificate of Completion</p>
        <h3 className="certx__title">{doc.title}</h3>

        <p className="certx__grant">This certifies that</p>
        <p className="certx__name">Aarav Sharma</p>
        <p className="certx__body">{doc.body}</p>

        <div className="certx__foot">
          <span className="certx__sig">
            <svg viewBox="0 0 120 26" fill="none">
              <path
                d="M6 19 C 20 4, 32 24, 46 12 S 74 5, 86 15 S 108 9, 115 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="certx__sigline" />
            <span className="certx__sigrole">Program Director</span>
            <span className="certx__sigorg">Gosu Academy</span>
          </span>

          <span className="certx__brands">
            <img src="/logos/gosu.png" alt="" />
            <span className="certx__brandsep" />
            <img className="certx__spefl" src="/logos/spefl.png" alt="" />
            <span className="certx__brandsep" />
            <span className="certx__bharat">
              <img src="/logos/bharat-mark.png" alt="" />
              Bharat Esports
            </span>
          </span>

          <span className="certx__sig">
            <svg viewBox="0 0 120 26" fill="none">
              <path
                d="M6 15 C 15 23, 27 6, 41 13 C 54 20, 61 6, 77 12 S 104 19, 115 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="certx__sigline" />
            <span className="certx__sigrole">Head of Assessment</span>
            <span className="certx__sigorg">SPEFL-SC</span>
          </span>
        </div>

        <p className="certx__fine">
          SPEFL-SC certified at launch · NSQF credit-alignment in progress ·
          Specimen for illustration
        </p>
      </div>
    </div>
  );
}
