import type { AuthSession } from "../types";
import { primaryCta } from "../config/ui";

interface PublicLandingProps {
  billingEnabled: boolean;
  session: AuthSession | null;
  onNavigate: (to: string, options?: { replace?: boolean }) => void;
}

function NavLink({
  href,
  label,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  onNavigate: (to: string, options?: { replace?: boolean }) => void;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        if (href.startsWith("#")) {
          return;
        }
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {label}
    </a>
  );
}

export function PublicLanding({ billingEnabled, session, onNavigate }: PublicLandingProps) {
  const appHref = session ? "/app" : "/auth";

  return (
    <main className="marketing-shell flex min-h-[calc(100vh-4rem)]" id="main-content">
      <header className="marketing-topbar flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-shrink-0">
          <NavLink href="/" label="JobMind" onNavigate={onNavigate} className="brand-mark" />
        </div>
        
        <div className="flex-1 sm:auto sm:flex-sm-row sm:justify-sm-between sm:mt-0 mt-4">
          <nav className="marketing-nav flex flex-col sm:flex-row sm:space-x-6" aria-label="Primary">
            <a className="marketing-nav-link text-sm font-medium text-muted-foreground hover:text-primary" href="#how-it-works">
              How It Works
            </a>
            <a className="marketing-nav-link text-sm font-medium text-muted-foreground hover:text-primary" href="#product-proof">
              Product
            </a>
            <a className="marketing-nav-link text-sm font-medium text-muted-foreground hover:text-primary" href="#pricing">
              Pricing
            </a>
          </nav>
          
          <div className="marketing-actions flex flex-col sm:flex-row sm:space-x-3 sm:mt-0 mt-4">
            <NavLink href={appHref} label={session ? "Open Workspace" : "Sign In"} onNavigate={onNavigate} className="button button-outline" />
            <NavLink href={primaryCta.href} label={primaryCta.label} onNavigate={onNavigate} className="button button-primary" />
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Career Intelligence For Modern Job Search</span>
          <h1>Find the right role before you waste another application.</h1>
          <p className="hero-copy-body">
            JobMind turns a static resume into a live operating system for your search: role-fit analysis, missing skills,
            matched openings, and daily job updates in one premium workspace.
          </p>
          <div className="hero-action-row">
            <NavLink href={primaryCta.href} label={primaryCta.label} onNavigate={onNavigate} className="button button-primary button-large" />
            <NavLink href="/auth" label="See The Auth Flow" onNavigate={onNavigate} className="button button-secondary button-large" />
          </div>
          <div className="hero-proof-strip">
            <div className="proof-pill">
              <strong>Live job boards</strong>
              <span>Greenhouse & Lever ingestion</span>
            </div>
            <div className="proof-pill">
              <strong>Resume to role-fit</strong>
              <span>Upload, score, gaps, alternatives</span>
            </div>
            <div className="proof-pill">
              <strong>Daily digests</strong>
              <span>WhatsApp-ready previews</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="product-shot">
            <div className="product-shot-bar">
              <span className="window-dot" />
              <span className="window-dot" />
              <span className="window-dot" />
              <div className="window-address">jobmind.app/app</div>
            </div>
            <div className="product-shot-body">
              <aside className="product-rail">
                <span className="rail-brand">JM</span>
                <span>Overview</span>
                <span>Resume</span>
                <span>Matches</span>
                <span>Digest</span>
              </aside>
              <div className="product-main">
                <div className="product-main-top">
                  <div>
                    <small className="product-label">Career Workspace</small>
                    <strong>Fullstack Developer</strong>
                  </div>
                  <div className="score-chip">81% Match</div>
                </div>
                <div className="preview-grid">
                  <article className="preview-card preview-card-strong">
                    <small>Top Strengths</small>
                    <strong>React, FastAPI, Product Thinking</strong>
                    <p>High overlap with product engineering and fullstack roles.</p>
                  </article>
                  <article className="preview-card">
                    <small>Missing Skills</small>
                    <ul className="preview-list">
                      <li>System design depth</li>
                      <li>AWS examples</li>
                      <li>Testing ownership</li>
                    </ul>
                  </article>
                  <article className="preview-card">
                    <small>Matched Roles</small>
                    <ul className="preview-list">
                      <li>Frontend Engineer at Forter</li>
                      <li>AI Product Engineer at CYE</li>
                    </ul>
                  </article>
                  <article className="preview-card">
                    <small>Daily Digest</small>
                    <p>"2 new roles fit your profile today. Lead with React + API ownership."</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Selected reference companies">
        <span>FORTER</span>
        <span>RISKIFIED</span>
        <span>APPSFLYER</span>
        <span>FIREBLOCKS</span>
        <span>MELIO</span>
        <span>YOTPO</span>
      </section>

      <section className="marketing-section" id="how-it-works">
        <div className="section-heading">
          <span className="section-kicker">How It Works</span>
          <h2>Three steps from resume upload to better applications.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-index">01</span>
            <h3>Upload your resume</h3>
            <p>Parse PDF or text into structured skills, experience highlights, and a summary you can act on.</p>
          </article>
          <article className="feature-card">
            <span className="feature-index">02</span>
            <h3>Score a target role</h3>
            <p>See fit score, strengths, missing skills, and what to rewrite before your next application.</p>
          </article>
          <article className="feature-card">
            <span className="feature-index">03</span>
            <h3>Stay on top of new openings</h3>
            <p>Track matched roles, career alternatives, and job-digest previews in one focused workspace.</p>
          </article>
        </div>
      </section>

      <section className="marketing-section marketing-proof-section" id="product-proof">
        <div className="section-heading">
          <span className="section-kicker">Product Proof</span>
          <h2>Built to look credible before you add production-scale complexity.</h2>
        </div>
        <div className="proof-layout">
          <article className="proof-panel">
            <small>What users get immediately</small>
            <h3>A clearer answer to "Why am I not hearing back?"</h3>
            <p>
              Instead of another job board list, JobMind shows role fit, gap analysis, better positioning, and adjacent
              paths that might convert faster.
            </p>
          </article>
          <article className="proof-panel">
            <small>Designed for premium SaaS trust</small>
            <h3>Clarity first. Restraint by default.</h3>
            <p>
              Clean hierarchy, focused copy, sharper surfaces, and a product-led flow that feels closer to a serious
              startup than a hacked-together demo.
            </p>
          </article>
        </div>
      </section>

      <section className="marketing-section" id="pricing">
        <div className="section-heading">
          <span className="section-kicker">Pricing</span>
          <h2>{billingEnabled ? "Start free. Upgrade when the workflow earns it." : "Private beta first. Billing turns on later."}</h2>
        </div>
        <div className="pricing-grid">
          <article className="pricing-card">
            <div className="pricing-tier">
              <span className="section-kicker">Free</span>
              <strong>$0</strong>
            </div>
            <ul className="pricing-list">
              <li>5 role analyses per day</li>
              <li>Resume parsing</li>
              <li>Matched jobs feed</li>
              <li>Career alternatives</li>
            </ul>
            <NavLink href={primaryCta.href} label="Start Free Analysis" onNavigate={onNavigate} className="button button-secondary button-block" />
          </article>
          <article className="pricing-card pricing-card-featured">
            <div className="pricing-tier">
              <span className="section-kicker">{billingEnabled ? "Pro" : "Private Beta"}</span>
              <strong>{billingEnabled ? "$19" : "Invite Only"}</strong>
            </div>
            <ul className="pricing-list">
              <li>Unlimited role analyses</li>
              <li>Sharper CV tailoring prompts</li>
              <li>Daily digest delivery flow</li>
              <li>Premium workspace for focused tracking</li>
            </ul>
            <NavLink
              href={primaryCta.href}
              label={billingEnabled ? "Start With Pro Intent" : "Join The Product Flow"}
              onNavigate={onNavigate}
              className="button button-primary button-block"
            />
          </article>
        </div>
      </section>

      <section className="marketing-cta">
        <div>
          <span className="section-kicker">Ready To Test Demand?</span>
          <h2>Launch the premium-looking version first, then localize to Hebrew.</h2>
        </div>
        <NavLink href={primaryCta.href} label={primaryCta.label} onNavigate={onNavigate} className="button button-primary button-large" />
      </section>
    </main>
  );
}
