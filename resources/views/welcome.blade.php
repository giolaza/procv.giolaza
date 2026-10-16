<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>ProCV — AI-powered CV builder</title>
  <meta name="description" content="Build a clean, professional CV in minutes. Fill in your details, pick a template, and download — ready to send.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600&display=swap">
  <style>
    :root {
      --bg: #F9F8F5;
      --bg2: #F1EFE9;
      --bg3: #E8E5DC;
      --fg: #1A1F2E;
      --fg-mid: #4A4F5F;
      --fg-muted: #8A8F9F;
      --accent: #7b00e0;
      --accent-light: rgba(123,0,224,0.08);
      --rule: rgba(26,31,46,0.12);
      --font-d: 'Oxanium', monospace, sans-serif;
      --font-b: 'Source Sans 3', system-ui, sans-serif;
      color-scheme: light;
    }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        --bg: #141720;
        --bg2: #1B1F2D;
        --bg3: #22263A;
        --fg: #E8E6DF;
        --fg-mid: #A8ADBD;
        --fg-muted: #676C7C;
        --accent: #9b30ff;
        --accent-light: rgba(155,48,255,0.1);
        --rule: rgba(232,230,223,0.1);
        color-scheme: dark;
      }
    }
    :root[data-theme="dark"] {
      --bg: #141720;
      --bg2: #1B1F2D;
      --bg3: #22263A;
      --fg: #E8E6DF;
      --fg-mid: #A8ADBD;
      --fg-muted: #676C7C;
      --accent: #9b30ff;
      --accent-light: rgba(155,48,255,0.1);
      --rule: rgba(232,230,223,0.1);
      color-scheme: dark;
    }

    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--font-b);
      background: var(--bg);
      color: var(--fg);
      font-size: 16px;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
    }
    .w {
      max-width: 1080px;
      margin: 0 auto;
      padding-left: max(24px, env(safe-area-inset-left, 0px));
      padding-right: max(24px, env(safe-area-inset-right, 0px));
    }

    /* Nav */
    nav {
      position: sticky;
      top: env(safe-area-inset-top, 0px);
      z-index: 20;
      background: var(--bg);
      border-bottom: 1px solid var(--rule);
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0 0 auto;
      height: env(safe-area-inset-top, 0px);
      background: var(--bg);
      z-index: 21;
    }
    .nav-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-block: 1.1rem;
    }
    .logo {
      color: var(--fg);
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    .g-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: transparent;
      color: var(--fg);
      border: 1.5px solid var(--rule);
      padding: 0.55rem 1.15rem;
      font-family: var(--font-b);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      border-radius: 3px;
      transition: border-color 0.15s, background 0.15s;
      white-space: nowrap;
    }
    .g-btn:hover {
      border-color: var(--accent);
      background: var(--accent-light);
    }

    /* Hero */
    .hero {
      padding-block: 5rem 4rem;
      text-align: center;
      border-bottom: 1px solid var(--rule);
    }
    .hero-label {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 0.3rem 0.8rem;
      border-radius: 2px;
      margin-bottom: 2rem;
    }
    h1 {
      font-family: var(--font-d);
      font-size: clamp(2.8rem, 6vw, 5.5rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin: 0 auto 1.5rem;
      max-width: 16ch;
      text-wrap: balance;
    }
    h1 em {
      font-style: normal;
      color: var(--accent);
    }
    .h1-accent {
      font-family: var(--font-b);
      font-weight: 300;
      font-size: 0.72em;
      letter-spacing: -0.01em;
      color: var(--fg-mid);
      display: block;
    }
    .hero-sub {
      font-size: 1.1rem;
      color: var(--fg-mid);
      max-width: 50ch;
      margin: 0 auto 2.5rem;
      font-weight: 300;
      line-height: 1.7;
    }
    .g-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      background: var(--accent);
      color: #fff;
      border: none;
      padding: 0.85rem 2rem;
      font-family: var(--font-b);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      border-radius: 3px;
      transition: opacity 0.15s;
    }
    .g-btn-primary:hover { opacity: 0.88; }
    .hero-trust {
      margin-top: 1.4rem;
      font-size: 0.8rem;
      color: var(--fg-muted);
      font-style: italic;
    }

    /* Proof bar */
    .proof {
      background: var(--bg2);
      border-bottom: 1px solid var(--rule);
      padding-block: 2rem;
    }
    .proof-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      flex-wrap: wrap;
    }
    .proof-item { text-align: center; }
    .proof-n {
      font-family: var(--font-d);
      font-size: 2.2rem;
      font-weight: 600;
      color: var(--fg);
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .proof-l {
      font-size: 0.75rem;
      color: var(--fg-muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 0.2rem;
    }
    .proof-div {
      width: 1px;
      height: 40px;
      background: var(--rule);
    }

    /* How it works */
    .how {
      padding-block: 5rem;
      border-bottom: 1px solid var(--rule);
    }
    .section-head {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .section-eyebrow {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--fg-muted);
      margin-bottom: 0.8rem;
    }
    h2 {
      font-family: var(--font-d);
      font-size: clamp(1.8rem, 3.5vw, 3rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      margin: 0;
      text-wrap: balance;
    }
    .steps { display: flex; flex-direction: column; }
    .step {
      display: grid;
      grid-template-columns: 4.5rem 1fr;
      gap: 2.5rem;
      align-items: start;
      padding-block: 2rem;
      border-top: 1px solid var(--rule);
    }
    .step:last-child { border-bottom: 1px solid var(--rule); }
    .step-num {
      font-family: var(--font-d);
      font-size: 2.2rem;
      font-weight: 400;
      font-style: italic;
      color: var(--fg-muted);
      line-height: 1;
      padding-top: 0.2rem;
    }
    .step-title {
      font-family: var(--font-d);
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin-bottom: 0.4rem;
    }
    .step-desc {
      font-size: 0.9rem;
      color: var(--fg-mid);
      line-height: 1.65;
    }

    /* Features */
    .features { padding-block: 5rem; }
    .feat-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px;
      background: var(--rule);
      border: 1px solid var(--rule);
    }
    .feat-card {
      background: var(--bg);
      padding: 2.5rem;
    }
    .feat-icon {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--accent);
    }
    .feat-title {
      font-family: var(--font-d);
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.6rem;
      letter-spacing: -0.01em;
    }
    .feat-desc {
      font-size: 0.88rem;
      color: var(--fg-mid);
      line-height: 1.65;
    }

    /* Pricing */
    .pricing {
      padding-block: 5rem;
      border-bottom: 1px solid var(--rule);
    }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px;
      background: var(--rule);
      border: 1px solid var(--rule);
      max-width: 760px;
      margin: 0 auto;
    }
    .plan {
      background: var(--bg);
      padding: 2.5rem;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .plan-featured {
      background: var(--fg);
      color: var(--bg);
    }
    .plan-name {
      font-family: var(--font-d);
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.3rem;
    }
    .plan-featured .plan-name { color: var(--bg); }
    .plan-price {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
      margin-bottom: 0.4rem;
    }
    .plan-amount {
      font-family: var(--font-d);
      font-size: 2.8rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .plan-featured .plan-amount { color: var(--bg); }
    .plan-per {
      font-size: 0.8rem;
      color: var(--fg-muted);
      font-weight: 300;
    }
    .plan-featured .plan-per { color: rgba(255,255,255,0.45); }
    .plan-desc {
      font-size: 0.85rem;
      color: var(--fg-muted);
      margin-bottom: 2rem;
      font-weight: 300;
      line-height: 1.55;
    }
    .plan-featured .plan-desc { color: rgba(255,255,255,0.55); }
    .plan-features {
      list-style: none;
      margin: 0 0 2rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      flex: 1;
    }
    .plan-features li {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      font-size: 0.875rem;
      color: var(--fg-mid);
    }
    .plan-featured .plan-features li { color: rgba(255,255,255,0.75); }
    .plan-features li::before {
      content: "✓";
      color: var(--accent);
      font-size: 0.8rem;
      font-weight: 600;
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
    .plan-features li.off::before { content: "–"; color: var(--fg-muted); }
    .plan-features li.off { color: var(--fg-muted); }
    .plan-featured .plan-features li.off { color: rgba(255,255,255,0.3); }
    .plan-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      width: 100%;
      padding: 0.8rem 1.5rem;
      font-family: var(--font-b);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      border-radius: 3px;
      transition: opacity 0.15s, background 0.15s;
      border: 1.5px solid var(--rule);
      background: transparent;
      color: var(--fg);
    }
    .plan-cta:hover { border-color: var(--accent); background: var(--accent-light); }
    .plan-cta-primary {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
    .plan-cta-primary:hover { opacity: 0.88; background: var(--accent); }

    /* CTA */
    .cta-section {
      background: var(--fg);
      padding-block: 5rem;
      text-align: center;
    }
    .cta-in {
      padding-left: max(24px, env(safe-area-inset-left, 0px));
      padding-right: max(24px, env(safe-area-inset-right, 0px));
    }
    h2.cta-h {
      font-family: var(--font-d);
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 700;
      color: var(--bg);
      margin: 0 auto 0.75rem;
      max-width: 20ch;
      text-wrap: balance;
      letter-spacing: -0.02em;
    }
    h2.cta-h em {
      font-style: italic;
      color: var(--accent);
    }
    .cta-sub-text {
      font-size: 0.9rem;
      color: var(--fg-muted);
      margin-bottom: 2.2rem;
    }
    .g-btn-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      background: var(--bg);
      color: var(--fg);
      border: none;
      padding: 0.85rem 2rem;
      font-family: var(--font-b);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      border-radius: 3px;
      transition: opacity 0.15s;
    }
    .g-btn-cta:hover { opacity: 0.88; }

    footer {
      border-top: 1px solid var(--rule);
      padding-block: 1.75rem;
    }
    .foot-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .foot-note { font-size: 0.8rem; color: var(--fg-muted); }

    @media (max-width: 700px) {
      h1 { font-size: 2.5rem; }
      .proof-div { display: none; }
      .proof-row { gap: 1.5rem; }
      .step { grid-template-columns: 3rem 1fr; gap: 1.5rem; }
      .feat-grid { grid-template-columns: 1fr; }
      .pricing-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<nav>
  <div class="w">
    <div class="nav-row">
      <a href="{{ url('/') }}" class="logo">
        <svg height="30" viewBox="0 0 1824 341" xmlns="http://www.w3.org/2000/svg" aria-label="ProCV" style="display:block;">
          <g fill="currentColor">
            <path d="M 30 310 L 30 94 C 30 57 57 30 94 30 L 276 30 L 213 96 L 108 96 C 101 96 97 100 97 107 L 97 155 C 97 162 101 166 108 166 L 319 166 C 327 166 331 162 331 155 L 331 111 L 394 67 C 399 74 401 82 401 91 L 401 176 C 401 213 374 240 337 240 L 108 240 C 101 240 97 244 97 251 L 97 310 Z"/>
            <path d="M 441 310 L 441 154 C 441 116 469 89 507 89 L 668 89 L 607 152 L 519 152 C 512 152 509 156 509 163 L 509 310 Z"/>
            <path fill-rule="evenodd" d="M 712 89 L 938 89 C 966 89 986 109 986 137 L 986 262 C 986 290 966 310 938 310 L 712 310 C 684 310 664 290 664 262 L 664 137 C 664 109 684 89 712 89 Z M 752 150 L 898 150 C 909 150 914 155 914 166 L 914 233 C 914 244 909 249 898 249 L 752 249 C 741 249 736 244 736 233 L 736 166 C 736 155 741 150 752 150 Z"/>
            <path d="M 1087 30 L 1255 30 L 1191 96 L 1113 96 C 1098 96 1092 102 1092 117 L 1092 223 C 1092 238 1098 244 1113 244 L 1337 244 L 1401 310 L 1087 310 C 1048 310 1023 285 1023 246 L 1023 94 C 1023 55 1048 30 1087 30 Z"/>
            <path d="M 1388 30 L 1471 30 L 1576 216 L 1638 135 L 1717 135 L 1608 296 C 1598 311 1585 318 1569 318 C 1552 318 1538 310 1529 295 Z"/>
          </g>
          <g fill="#7b00e0">
            <path d="M 303 30 L 347 30 C 364 30 378 37 387 51 L 327 97 L 239 96 Z"/>
            <path d="M 1281 30 L 1356 30 L 1290 96 L 1216 96 Z"/>
            <path d="M 1718 30 L 1793 30 L 1730 116 L 1651 115 Z"/>
          </g>
        </svg>
      </a>
      <a href="{{ route('login') }}" class="g-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Sign in with Google
      </a>
    </div>
  </div>
</nav>

<section class="hero">
  <div class="w">
    <div class="hero-label">AI-powered CV builder</div>
    <h1>A resume that <em>works</em><span class="h1-accent"> for every application</span></h1>
    <p class="hero-sub">Build a clean, professional CV in minutes. Fill in your details, pick a template, and download — ready to send.</p>
    <a href="{{ route('login') }}" class="g-btn-primary">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#fff"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
      </svg>
      Create your free CV
    </a>
    <p class="hero-trust">Free to start — no credit card needed</p>
  </div>
</section>

<div class="proof">
  <div class="w">
    <div class="proof-row">
      <div class="proof-item">
        <div class="proof-n">48,000+</div>
        <div class="proof-l">CVs created</div>
      </div>
      <div class="proof-div"></div>
      <div class="proof-item">
        <div class="proof-n">3 min</div>
        <div class="proof-l">Avg. build time</div>
      </div>
      <div class="proof-div"></div>
      <div class="proof-item">
        <div class="proof-n">94%</div>
        <div class="proof-l">ATS pass rate</div>
      </div>
    </div>
  </div>
</div>

<section class="how">
  <div class="w">
    <div class="section-head">
      <p class="section-eyebrow">How it works</p>
      <h2>From blank page to interview in three steps</h2>
    </div>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div>
          <div class="step-title">Sign in with Google</div>
          <p class="step-desc">One click, no forms. Your account is ready in seconds and your drafts are saved automatically.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div>
          <div class="step-title">Describe your experience</div>
          <p class="step-desc">Write in plain sentences. The AI extracts what matters and turns it into polished, metric-driven bullet points.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div>
          <div class="step-title">Tailor and export</div>
          <p class="step-desc">Paste a job description and the AI adapts your CV to match. Download as a PDF or Word file, or share a clean online link.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="features">
  <div class="w">
    <div class="section-head">
      <p class="section-eyebrow">Features</p>
      <h2>Built for serious job seekers</h2>
    </div>
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div class="feat-title">AI that understands context</div>
        <p class="feat-desc">Trained on thousands of successful CVs across industries. It knows the difference between a developer's impact and a manager's scope.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <div class="feat-title">ATS-optimised templates</div>
        <p class="feat-desc">Clean layouts that parse correctly in every major applicant tracking system. No tables, no text boxes, no parsing failures.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <div class="feat-title">Job-specific tailoring</div>
        <p class="feat-desc">Paste the job description, get a version of your CV that mirrors the exact language the hiring manager is looking for.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
        </div>
        <div class="feat-title">One-click PDF export</div>
        <p class="feat-desc">Professional PDF every time. Typography, spacing, and margins are handled — you never touch a word processor.</p>
      </div>
    </div>
  </div>
</section>

<section class="pricing">
  <div class="w">
    <div class="section-head">
      <p class="section-eyebrow">Pricing</p>
      <h2>Start free. Upgrade when you're ready.</h2>
    </div>
    <div class="pricing-grid">
      <div class="plan">
        <div class="plan-name">Free</div>
        <div class="plan-price">
          <span class="plan-amount">€0</span>
          <span class="plan-per">forever</span>
        </div>
        <p class="plan-desc">Everything you need to build your first strong CV and test the product.</p>
        <ul class="plan-features">
          <li>1 active CV</li>
          <li>Simple template</li>
          <li>Word (.docx) export</li>
          <li class="off">Shareable CV link</li>
          <li class="off">Photo section</li>
          <li class="off">Recommendations section</li>
          <li class="off">PDF export</li>
          <li class="off">Job-specific tailoring</li>
        </ul>
        <a href="{{ route('login') }}" class="plan-cta">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Get started free
        </a>
      </div>
      <div class="plan plan-featured">
        <div class="plan-name">Premium</div>
        <div class="plan-price">
          <span class="plan-amount">€9</span>
          <span class="plan-per">/ month</span>
        </div>
        <p class="plan-desc">For active job seekers applying to multiple roles at once.</p>
        <ul class="plan-features">
          <li>Unlimited CVs</li>
          <li>All templates</li>
          <li>PDF &amp; Word export</li>
          <li>Shareable CV link</li>
          <li>Photo section</li>
          <li>Recommendations section</li>
          <li>Job-specific tailoring</li>
          <li>Priority support</li>
        </ul>
        <a href="{{ route('login') }}" class="plan-cta plan-cta-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#fff"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
          </svg>
          Start Premium — €9/mo
        </a>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="cta-in">
    <h2 class="cta-h">Your next role starts with a <em>better</em> CV</h2>
    <p class="cta-sub-text">Free · No credit card · Ready in under 3 minutes</p>
    <a href="{{ route('login') }}" class="g-btn-cta">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </a>
  </div>
</section>

<footer>
  <div class="w">
    <div class="foot-row">
      <a href="{{ url('/') }}" class="logo">
        <svg height="30" viewBox="0 0 1824 341" xmlns="http://www.w3.org/2000/svg" aria-label="ProCV" style="display:block;">
          <g fill="currentColor">
            <path d="M 30 310 L 30 94 C 30 57 57 30 94 30 L 276 30 L 213 96 L 108 96 C 101 96 97 100 97 107 L 97 155 C 97 162 101 166 108 166 L 319 166 C 327 166 331 162 331 155 L 331 111 L 394 67 C 399 74 401 82 401 91 L 401 176 C 401 213 374 240 337 240 L 108 240 C 101 240 97 244 97 251 L 97 310 Z"/>
            <path d="M 441 310 L 441 154 C 441 116 469 89 507 89 L 668 89 L 607 152 L 519 152 C 512 152 509 156 509 163 L 509 310 Z"/>
            <path fill-rule="evenodd" d="M 712 89 L 938 89 C 966 89 986 109 986 137 L 986 262 C 986 290 966 310 938 310 L 712 310 C 684 310 664 290 664 262 L 664 137 C 664 109 684 89 712 89 Z M 752 150 L 898 150 C 909 150 914 155 914 166 L 914 233 C 914 244 909 249 898 249 L 752 249 C 741 249 736 244 736 233 L 736 166 C 736 155 741 150 752 150 Z"/>
            <path d="M 1087 30 L 1255 30 L 1191 96 L 1113 96 C 1098 96 1092 102 1092 117 L 1092 223 C 1092 238 1098 244 1113 244 L 1337 244 L 1401 310 L 1087 310 C 1048 310 1023 285 1023 246 L 1023 94 C 1023 55 1048 30 1087 30 Z"/>
            <path d="M 1388 30 L 1471 30 L 1576 216 L 1638 135 L 1717 135 L 1608 296 C 1598 311 1585 318 1569 318 C 1552 318 1538 310 1529 295 Z"/>
          </g>
          <g fill="#7b00e0">
            <path d="M 303 30 L 347 30 C 364 30 378 37 387 51 L 327 97 L 239 96 Z"/>
            <path d="M 1281 30 L 1356 30 L 1290 96 L 1216 96 Z"/>
            <path d="M 1718 30 L 1793 30 L 1730 116 L 1651 115 Z"/>
          </g>
        </svg>
      </a>
      <span class="foot-note">© {{ date('Y') }} ProCV. All rights reserved.</span>
    </div>
  </div>
</footer>

</body>
</html>
