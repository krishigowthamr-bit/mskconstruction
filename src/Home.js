import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router";

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');

:root{
  --gold:#C9A050;
  --gold-lt:#E8C46A;
  --gold-dk:#A07830;
  --dark:#0C0C0C;
  --dark2:#161616;
  --dark3:#1E1E1E;
  --cream:#F7F3EC;
  --cream2:#EDE8DF;
  --txt:#333;
  --muted:#777;
  --border:#E0D8CC;
  --white:#fff;
  --fh:'DM Serif Display',serif;
  --fb:'Outfit',sans-serif;
  --nav:72px;
  --max:1240px;
  --r:12px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--cream);color:var(--txt);overflow-x:hidden;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}
a{text-decoration:none;color:inherit}
button{font-family:var(--fb);cursor:pointer;border:none;outline:none;background:none}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#111}
::-webkit-scrollbar-thumb{background:var(--gold-dk);border-radius:3px}

/* TOPBAR */
.topbar{background:var(--dark);color:#999;font-size:12.5px;padding:7px 40px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.topbar a{color:#888;transition:color .2s}.topbar a:hover{color:var(--gold)}
.tb-r{display:flex;gap:14px;align-items:center}
.tb-div{color:#333}

/* NAVBAR */
.navbar{position:sticky;top:0;z-index:900;height:var(--nav);background:rgba(255,255,255,.97);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);box-shadow:0 2px 20px rgba(0,0,0,.06);display:flex;align-items:center;justify-content:space-between;padding:0 40px;gap:24px}
.nav-logo{font-family:var(--fh);font-size:22px;color:var(--dark);cursor:pointer;white-space:nowrap;line-height:1}
.nav-logo span{color:var(--gold)}
.nav-links{display:flex;align-items:center;gap:2px;list-style:none}
.nav-item{position:relative}
.nav-btn{display:flex;align-items:center;gap:5px;padding:8px 14px;border-radius:8px;font-size:14px;font-weight:500;color:#444;transition:all .2s;white-space:nowrap;cursor:pointer;background:none;border:none;font-family:var(--fb)}
.nav-btn:hover,.nav-btn.act{color:var(--gold);background:rgba(201,160,80,.08)}
.nav-chev{width:12px;height:12px;transition:transform .2s;opacity:.6;display:flex;align-items:center}
.nav-item:hover .nav-chev{transform:rotate(180deg)}
.nav-dd{display:none;position:absolute;top:calc(100% + 6px);left:0;background:#fff;border:1px solid var(--border);border-radius:10px;box-shadow:0 16px 48px rgba(0,0,0,.12);min-width:200px;padding:8px;z-index:200}
.nav-item:hover .nav-dd{display:block}
.nav-dd a{display:block;padding:10px 14px;font-size:13.5px;color:#555;border-radius:7px;transition:all .2s;cursor:pointer}
.nav-dd a:hover{color:var(--gold);background:rgba(201,160,80,.07);padding-left:18px}
.nav-cta{padding:10px 22px;background:var(--gold);color:#fff;border-radius:9px;font-size:14px;font-weight:600;transition:all .25s;white-space:nowrap}
.nav-cta:hover{background:var(--gold-dk);transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,160,80,.35)}
.hamburger{display:none;flex-direction:column;gap:5px;padding:4px;cursor:pointer}
.hamburger span{display:block;width:22px;height:2px;background:var(--dark);border-radius:2px;transition:all .3s}
.mob-menu{display:none;position:fixed;inset:0;z-index:800;background:#fff;padding:calc(var(--nav) + 16px) 24px 40px;flex-direction:column;gap:4px;overflow-y:auto}
.mob-menu.open{display:flex}
.mob-lnk{padding:14px 16px;font-size:16px;font-weight:500;color:#333;border-radius:9px;transition:all .2s;display:block;background:none;border:none;font-family:var(--fb);text-align:left;cursor:pointer;width:100%}
.mob-lnk:hover{color:var(--gold);background:rgba(201,160,80,.07)}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:9px;font-size:14.5px;font-weight:600;letter-spacing:.2px;transition:all .25s;cursor:pointer;border:none;font-family:var(--fb)}
.btn-g{background:var(--gold);color:#fff}
.btn-g:hover{background:var(--gold-dk);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,160,80,.35)}
.btn-ow{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.3)}
.btn-ow:hover{border-color:var(--gold);color:var(--gold);background:rgba(201,160,80,.08)}
.btn-od{background:transparent;color:var(--dark);border:1.5px solid rgba(0,0,0,.2)}
.btn-od:hover{border-color:var(--gold);color:var(--gold);background:rgba(201,160,80,.06)}

/* SECTION UTILS */
.sec{max-width:var(--max);margin:0 auto;padding:90px 40px}
.tag{display:inline-block;background:rgba(201,160,80,.12);color:var(--gold-dk);border:1px solid rgba(201,160,80,.25);padding:5px 16px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:14px}
.h2{font-family:var(--fh);font-size:clamp(26px,3.5vw,42px);color:var(--dark);line-height:1.2;margin-bottom:14px}
.sub{font-size:15.5px;color:var(--muted);line-height:1.8;max-width:580px}
.tc{text-align:center}.tc .sub{margin:0 auto}
.h2-w{color:#fff}

/* ── HERO ── */
.hero{position:relative;min-height:92vh;display:flex;align-items:center;overflow:hidden;background:var(--dark)}
.hero-bg{position:absolute;inset:0;background:linear-gradient(125deg,#0C0C0C 0%,#1A1510 45%,#221C10 100%)}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,160,80,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(201,160,80,.07) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)}
.hero-glow{position:absolute;top:20%;left:60%;width:480px;height:480px;background:radial-gradient(circle,rgba(201,160,80,.18) 0%,transparent 65%);transform:translate(-50%,-50%);pointer-events:none}
.hero-inner{position:relative;z-index:2;max-width:var(--max);margin:0 auto;padding:80px 40px;display:grid;grid-template-columns:1.1fr 1fr;gap:70px;align-items:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,160,80,.15);border:1px solid rgba(201,160,80,.3);color:var(--gold);padding:6px 16px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:22px}
.hero-h1{font-family:var(--fh);font-size:clamp(36px,4.5vw,58px);color:#fff;line-height:1.12;margin-bottom:18px}
.hero-h1 em{color:var(--gold);font-style:normal}
.hero-p{font-size:16px;color:#A8A09A;line-height:1.8;margin-bottom:34px}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:flex;gap:32px;margin-top:44px;padding-top:32px;border-top:1px solid rgba(255,255,255,.08)}
.stat-n{font-family:var(--fh);font-size:34px;color:var(--gold);line-height:1}
.stat-l{font-size:12.5px;color:#888;margin-top:4px;letter-spacing:.3px}
.hero-panel{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:32px;backdrop-filter:blur(10px)}
.hp-title{font-family:var(--fh);font-size:18px;color:#fff;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.08)}
.aw-row{display:flex;align-items:flex-start;gap:14px;padding:14px;border-radius:10px;margin-bottom:10px;background:rgba(201,160,80,.07);border:1px solid rgba(201,160,80,.15);transition:background .2s}
.aw-row:hover{background:rgba(201,160,80,.13)}
.aw-icon{font-size:26px;flex-shrink:0;margin-top:2px}
.aw-info strong{display:block;font-size:13.5px;color:#fff;margin-bottom:3px;font-weight:600}
.aw-info span{font-size:12px;color:#888;line-height:1.5}

/* ABOUT */
.ab-wrap{background:#fff}
.ab-inner{max-width:var(--max);margin:0 auto;padding:90px 40px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.chk-list{display:flex;flex-direction:column;gap:14px;margin:24px 0 32px}
.chk{display:flex;align-items:center;gap:12px;font-size:15px;color:#444}
.chk-ic{width:22px;height:22px;border-radius:50%;background:rgba(201,160,80,.15);border:1px solid rgba(201,160,80,.3);display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--gold);flex-shrink:0}
.cert-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.cert-card{background:var(--cream);border:1px solid var(--border);border-radius:var(--r);padding:24px 20px;text-align:center;transition:all .25s}
.cert-card:hover{border-color:var(--gold);transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.08)}
.cert-card.dk{background:var(--dark);grid-column:1/-1}
.cc-ic{font-size:30px;margin-bottom:10px}
.cc-name{font-family:var(--fh);font-size:15px;color:var(--dark);margin-bottom:6px}
.cert-card.dk .cc-name{color:#fff}
.cc-desc{font-size:12.5px;color:var(--muted);line-height:1.55}
.cert-card.dk .cc-desc{color:#888}

/* SERVICES */
.svc-wrap{background:var(--cream2)}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:50px}
.svc-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:32px 26px;transition:all .3s;position:relative;overflow:hidden}
.svc-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform .3s}
.svc-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.1);border-color:transparent}
.svc-card:hover::after{transform:scaleX(1)}
.svc-ico{width:52px;height:52px;border-radius:12px;background:rgba(201,160,80,.1);border:1px solid rgba(201,160,80,.2);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px}
.svc-title{font-family:var(--fh);font-size:17px;color:var(--dark);margin-bottom:10px}
.svc-desc{font-size:13.5px;color:var(--muted);line-height:1.7;margin-bottom:20px}
.svc-links{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.svc-learn{font-size:13px;color:var(--gold);font-weight:600;text-decoration:underline;cursor:pointer}
.svc-btn{font-size:12.5px;padding:8px 16px;background:rgba(201,160,80,.1);color:var(--gold-dk);border-radius:7px;font-weight:600;transition:all .2s;border:1px solid rgba(201,160,80,.2);cursor:pointer;font-family:var(--fb)}
.svc-btn:hover{background:var(--gold);color:#fff}

/* PROCESS */
.proc-wrap{background:var(--dark)}
.proc-inner{max-width:var(--max);margin:0 auto;padding:90px 40px}
.proc-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:24px;margin-top:56px;position:relative}
.proc-line{position:absolute;top:36px;left:60px;right:60px;height:2px;background:linear-gradient(90deg,transparent,rgba(201,160,80,.4),transparent);z-index:0}
.proc-step{text-align:center;position:relative;z-index:1}
.step-circ{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-dk));display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-family:var(--fh);font-size:20px;color:#fff;box-shadow:0 8px 24px rgba(201,160,80,.3)}
.step-t{font-family:var(--fh);font-size:16px;color:#fff;margin-bottom:10px}
.step-d{font-size:13px;color:#888;line-height:1.65}

/* WHY US */
.why-wrap{background:#fff}
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:50px}
.why-card{background:var(--cream);border:1px solid var(--border);border-radius:16px;padding:30px 26px;transition:all .3s}
.why-card:hover{border-color:var(--gold);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.07);background:#fff}
.why-ic{font-size:32px;margin-bottom:14px}
.why-t{font-family:var(--fh);font-size:17px;color:var(--dark);margin-bottom:8px}
.why-d{font-size:13.5px;color:var(--muted);line-height:1.7}

/* PROJECTS */
.proj-wrap{background:var(--cream2)}
.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:50px}
.proj-card{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/3;cursor:pointer;transition:transform .3s}
.proj-card:hover{transform:scale(1.02)}
.proj-card:hover .proj-ov{opacity:1}
.proj-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:50px}
.proj-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.1) 60%,transparent 100%);opacity:.65;transition:opacity .3s;display:flex;align-items:flex-end;padding:18px}
.proj-name{color:#fff;font-size:13px;font-weight:500;line-height:1.4}

/* AWARDS */
.aw-wrap{background:var(--dark2)}
.aw-inner{max-width:var(--max);margin:0 auto;padding:90px 40px}
.aw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:50px}
.aw-card{background:rgba(255,255,255,.04);border:1px solid rgba(201,160,80,.2);border-radius:18px;padding:40px 30px;text-align:center;transition:all .3s}
.aw-card:hover{background:rgba(201,160,80,.07);border-color:var(--gold);transform:translateY(-4px)}
.aw-card-ic{font-size:46px;margin-bottom:18px}
.aw-card-t{font-family:var(--fh);font-size:18px;color:#fff;margin-bottom:10px}
.aw-card-d{font-size:13.5px;color:#777;line-height:1.7}

/* REVIEWS */
.rev-wrap{background:var(--cream)}
.rev-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:44px}
.rev-box{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px 26px;display:flex;align-items:center;gap:16px}
.rev-score{font-family:var(--fh);font-size:44px;color:var(--gold);line-height:1}
.rev-stars{color:var(--gold);font-size:17px;letter-spacing:2px}
.rev-count{font-size:12.5px;color:var(--muted);margin-top:3px}
.rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.rev-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:26px;transition:all .25s}
.rev-card:hover{border-color:var(--gold);box-shadow:0 8px 28px rgba(0,0,0,.07)}
.rev-s{color:var(--gold);font-size:13px;letter-spacing:2px;margin-bottom:12px}
.rev-t{font-size:14px;color:#555;line-height:1.75;margin-bottom:16px}
.rev-a{display:flex;align-items:center;gap:10px;font-weight:600;font-size:14px;color:var(--dark)}
.rev-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-dk));display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;font-weight:700;flex-shrink:0}

/* CONTACT SECTION */
.ct-wrap{background:var(--dark)}
.ct-inner{max-width:var(--max);margin:0 auto;padding:90px 40px;display:grid;grid-template-columns:1fr 1.2fr;gap:70px;align-items:start}
.ct-title{font-family:var(--fh);font-size:36px;color:#fff;line-height:1.2;margin-bottom:14px}
.ct-sub{font-size:15px;color:#888;line-height:1.8;margin-bottom:32px}
.ct-det{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px}
.ct-det-ic{width:42px;height:42px;border-radius:10px;background:rgba(201,160,80,.1);border:1px solid rgba(201,160,80,.2);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.ct-det-lbl{font-size:11.5px;color:#666;letter-spacing:.8px;text-transform:uppercase;margin-bottom:3px}
.ct-det-val{font-size:14px;color:#ccc;line-height:1.6}
.ct-det-val a{color:var(--gold)}

/* FORM */
.form{display:flex;flex-direction:column;gap:14px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.f-lbl{font-size:12.5px;color:#888;letter-spacing:.5px;text-transform:uppercase;font-weight:500;margin-bottom:5px}
.f-in{width:100%;padding:13px 16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:9px;color:#fff;font-size:14px;font-family:var(--fb);transition:border-color .2s}
.f-in:focus{outline:none;border-color:var(--gold);background:rgba(255,255,255,.08)}
.f-in::placeholder{color:#555}
.f-sel{width:100%;padding:13px 16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:9px;color:#ccc;font-size:14px;font-family:var(--fb);appearance:none;transition:border-color .2s}
.f-sel:focus{outline:none;border-color:var(--gold)}
.f-sel option{background:#1e1e1e;color:#ccc}
textarea.f-in{resize:vertical;min-height:110px}
.f-submit{padding:15px;background:var(--gold);color:#fff;border-radius:10px;font-size:15px;font-weight:600;font-family:var(--fb);transition:all .25s;cursor:pointer;border:none}
.f-submit:hover{background:var(--gold-dk);transform:translateY(-2px);box-shadow:0 8px 26px rgba(201,160,80,.3)}

/* FAQ */
.faq-wrap{background:#fff}
.faq-inner{max-width:860px;margin:0 auto;padding:90px 40px}
.faq-item{border-bottom:1px solid var(--border)}
.faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;font-size:15px;font-weight:600;color:var(--dark);background:none;border:none;cursor:pointer;font-family:var(--fb);text-align:left;transition:color .2s}
.faq-q:hover{color:var(--gold)}
.faq-tog{width:28px;height:28px;border-radius:50%;background:rgba(201,160,80,.1);border:1px solid rgba(201,160,80,.2);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--gold);flex-shrink:0;transition:all .25s}
.faq-item.open .faq-tog{background:var(--gold);color:#fff;transform:rotate(45deg)}
.faq-ans{max-height:0;overflow:hidden;transition:max-height .35s ease}
.faq-item.open .faq-ans{max-height:200px}
.faq-ans-inner{padding-bottom:20px;font-size:14px;color:var(--muted);line-height:1.8}

/* PAGE HERO */
.pg-hero{background:var(--dark);padding:100px 40px 80px;position:relative;overflow:hidden}
.pg-hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0C0C0C 0%,#1A1510 100%)}
.pg-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,160,80,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(201,160,80,.06) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse 80% 60% at 50% 100%,black,transparent)}
.pg-hero-c{position:relative;z-index:1;max-width:800px;margin:0 auto;text-align:center}
.pg-h1{font-family:var(--fh);font-size:clamp(30px,4vw,52px);color:#fff;margin-bottom:14px;line-height:1.2}
.pg-sub{font-size:16px;color:#999;line-height:1.75}

/* SUCCESS */
.success{background:rgba(201,160,80,.1);border:1px solid rgba(201,160,80,.3);border-radius:12px;padding:32px;text-align:center}
.suc-ic{font-size:44px;margin-bottom:12px}
.suc-t{font-family:var(--fh);font-size:22px;color:#fff;margin-bottom:8px}
.suc-s{font-size:14px;color:#888}

/* FOOTER */
.footer{background:#0A0A0A;padding:70px 40px 28px}
.footer-inner{max-width:var(--max);margin:0 auto}
.ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.6fr;gap:56px;margin-bottom:56px}
.ft-logo{font-family:var(--fh);font-size:24px;color:#fff;margin-bottom:14px}
.ft-logo span{color:var(--gold)}
.ft-tag{font-size:13.5px;color:#666;line-height:1.8;margin-bottom:22px}
.ft-social{display:flex;gap:10px}
.soc-btn{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:15px;color:#888;transition:all .2s;text-decoration:none}
.soc-btn:hover{background:var(--gold);border-color:var(--gold);color:#fff;transform:translateY(-2px)}
.ft-col-t{font-family:var(--fh);font-size:16px;color:#fff;margin-bottom:20px}
.ft-lnk{display:block;font-size:13.5px;color:#666;margin-bottom:11px;transition:color .2s;cursor:pointer}
.ft-lnk:hover{color:var(--gold)}
.ft-cr{display:flex;gap:11px;font-size:13.5px;margin-bottom:14px;color:#666;line-height:1.55}
.ft-cr a{color:#888;transition:color .2s}.ft-cr a:hover{color:var(--gold)}
.ft-btm{border-top:1px solid #1a1a1a;padding-top:22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:12.5px;color:#555}
.ft-btm a{color:#555;transition:color .2s}.ft-btm a:hover{color:var(--gold)}

/* WA FAB */
.wa-fab{position:fixed;bottom:28px;right:28px;z-index:999;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 6px 24px rgba(37,211,102,.45);transition:transform .2s;text-decoration:none}
.wa-fab:hover{transform:scale(1.1)}

/* PACKAGES PAGE */
.pkg-card{background:#fff;border-radius:20px;padding:40px 32px;border:1px solid var(--border);position:relative;transition:all .3s}
.pkg-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.1)}
.pkg-card.pop{border:2px solid var(--gold);box-shadow:0 24px 60px rgba(201,160,80,.18);transform:translateY(-10px)}
.pkg-card.pop:hover{transform:translateY(-14px)}
.pkg-badge{position:absolute;top:-16px;left:50%;transform:translateX(-50%);background:var(--gold);color:#fff;padding:5px 22px;border-radius:100px;font-size:12px;font-weight:700;letter-spacing:1px;white-space:nowrap}
.pkg-name{font-family:var(--fh);font-size:24px;margin-bottom:8px;color:var(--dark)}
.pkg-price{font-family:var(--fh);font-size:38px;color:var(--gold);line-height:1}
.pkg-unit{font-size:14px;color:var(--muted);margin-left:2px}
.pkg-feat{display:flex;flex-direction:column;gap:12px;margin:28px 0 32px}
.pkg-f{display:flex;gap:10px;font-size:14px;color:#444;align-items:flex-start}

/* RESPONSIVE */
@media(max-width:1100px){
  .svc-grid{grid-template-columns:repeat(2,1fr)}
  .proc-steps{grid-template-columns:repeat(3,1fr)}
  .proc-line{display:none}
  .hero-inner{grid-template-columns:1fr}
  .ab-inner{grid-template-columns:1fr}
  .ct-inner{grid-template-columns:1fr}
  .ft-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  :root{--nav:62px}
  .topbar{display:none}
  .navbar{padding:0 20px}
  .nav-links,.nav-cta{display:none}
  .hamburger{display:flex}
  .hero-inner{padding:60px 20px}
  .hero-stats{gap:18px}
  .sec,.faq-inner,.aw-inner,.proc-inner{padding:60px 20px}
  .ab-inner,.ct-inner{padding:60px 20px}
  .svc-grid{grid-template-columns:1fr}
  .why-grid{grid-template-columns:1fr 1fr}
  .proj-grid{grid-template-columns:1fr 1fr}
  .aw-grid{grid-template-columns:1fr}
  .rev-grid{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
  .footer{padding:50px 20px 24px}
  .ft-grid{grid-template-columns:1fr}
  .pg-hero{padding:80px 20px 60px}
}
@media(max-width:480px){
  .hero-btns{flex-direction:column}
  .why-grid,.proj-grid{grid-template-columns:1fr}
  .cert-grid{grid-template-columns:1fr}
  .cert-card.dk{grid-column:auto}
  .hero-stats{flex-direction:column;gap:18px}
}

/* ANIMS */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .6s ease both}
.fu1{animation-delay:.08s}.fu2{animation-delay:.16s}.fu3{animation-delay:.24s}.fu4{animation-delay:.32s}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_MENU = [
  { label: "Company",   path: "/about",    sub: ["About Us","Our Story","Awards & Certifications"] },
  { label: "Services",  path: "/services", sub: ["Architecture","Construction","Interior Design","Renovation"] },
  { label: "Projects",  path: "/projects" },
  { label: "Packages",  path: "/packages", sub: ["Basic Package","Standard Package","Premium Package"] },
  { label: "Resources", path: "/resources",sub: ["Blog","FAQs","Download Brochure"] },
];

const SERVICES = [
  { icon:"🏛️", title:"Architecture Services in Chennai",   short:"Architecture",   desc:"Our expert architects create innovative and functional designs tailored to your unique vision and needs.",        cta:"Get Architecture Help",  path:"/services/architecture" },
  { icon:"🏗️", title:"Construction Services in Chennai",   short:"Construction",   desc:"As a top construction company in Chennai, we deliver exceptional residential and commercial projects.",          cta:"Start Your Construction", path:"/services/construction" },
  { icon:"🛋️", title:"Interior Design Services in Chennai",short:"Interior Design",desc:"Transform your spaces with bespoke interior design solutions that reflect your personal style perfectly.",       cta:"Talk to Our Designers",   path:"/services/interior" },
  { icon:"🔨", title:"Renovation Services in Chennai",     short:"Renovation",     desc:"Revitalise your existing spaces with our expert renovation services, enhancing functionality and aesthetic.",   cta:"Plan Your Renovation",    path:"/services/renovation" },
];

const PROCESS = [
  { n:"01", t:"Discussion",  d:"Initial meeting to understand scope, design ideas, functional needs, and timelines." },
  { n:"02", t:"Agreement",   d:"Finalise contract, scope of work, budget milestones, and delivery schedule." },
  { n:"03", t:"Design",      d:"Architect presents blueprints and 3D renders with full client feedback loops." },
  { n:"04", t:"Execution",   d:"Construction begins with real-time tracking, quality checks and site updates." },
  { n:"05", t:"Handover",    d:"Final walkthrough, snag-list resolution and official handover of your dream space." },
];

const WHY = [
  { ic:"🏆", t:"Unmatched Expertise",    d:"15+ years of experience and a team of highly skilled architects, engineers and project managers." },
  { ic:"✅", t:"Quality Assurance",      d:"ISO 9001:2015 certified, ensuring premium quality in every project we undertake." },
  { ic:"🔭", t:"Transparency & Trust",  d:"Our project tracking app keeps you informed at every stage with clear communication." },
  { ic:"🧭", t:"Vastu Compliant",        d:"Expertise in creating Vastu-compliant homes for harmony, wellness and prosperity." },
  { ic:"⏱️", t:"On-Time Delivery",       d:"We understand the importance of deadlines and consistently deliver on schedule." },
  { ic:"👤", t:"Personalized Approach",  d:"Dedicated architect and project manager assigned to every project for tailored service." },
];

const PROJECTS = [
  { name:"Palatial G+2 Luxury Home – Sholinganallur",   bg:"linear-gradient(135deg,#1a2a3a,#2c4a6e)", em:"🏰" },
  { name:"Elite G+2 Farmhouse – Mugaiyur ECR",           bg:"linear-gradient(135deg,#2a1a1a,#6e3a2c)", em:"🌿" },
  { name:"Elegant G+1 Residence – Vandalur, Chennai",    bg:"linear-gradient(135deg,#1a2a1a,#2c6e3a)", em:"🏡" },
  { name:"Luxury G+2 Villa – Adityaram Township",        bg:"linear-gradient(135deg,#2a2a1a,#6e6a2c)", em:"🏛️" },
  { name:"Compact G+1 Urban Home – West Tambaram",       bg:"linear-gradient(135deg,#2a1a2a,#6e2c6a)", em:"🏘️" },
  { name:"Premium Cityside Residence – West Tambaram",   bg:"linear-gradient(135deg,#1a2a2a,#2c6e6a)", em:"🏢" },
  { name:"Commercial Building – Mogappair, Chennai",     bg:"linear-gradient(135deg,#2a2a2a,#555)",    em:"🏬" },
  { name:"Contemporary Family Home – Manapakkam",        bg:"linear-gradient(135deg,#1e1a2a,#4a3a6e)", em:"🏠" },
  { name:"Vertical Living Residence – Navalur",          bg:"linear-gradient(135deg,#2a1e1a,#6e4a3a)", em:"🏙️" },
  { name:"Premium Interior – Vengaivasal, Chennai",      bg:"linear-gradient(135deg,#1a2a1e,#3a6e4a)", em:"🛋️" },
  { name:"Premium Interior Project – Porur",             bg:"linear-gradient(135deg,#22183a,#5a3a7a)", em:"🪴" },
  { name:"Elegant Coastal Home – Uthandi, Chennai",      bg:"linear-gradient(135deg,#182a2a,#3a7a7a)", em:"🌊" },
];

const REVIEWS = [
  { n:"Ashma Fathima",   t:"Their expertise and guidance through the process made the entire journey seamless and stress-free. MSK team communication was outstanding at every step." },
  { n:"Muthu Thinesh",   t:"MSK Construction's expertise in construction, design and project management made our renovation project stress-free and successful." },
  { n:"Magasidesai Desai",t:"Professional, courteous, and dedicated to delivering high-quality results. Best construction company in ECR!" },
  { n:"Daisy",            t:"My villa has been constructed by MSK. Everyone on the team is personally invested in producing quality work. Great work, kudos!" },
  { n:"Sivani Senthil",   t:"MSK Construction's commitment to excellence shines in every aspect of their work. Highly recommend for your Dream House!" },
  { n:"Revathi Arun",     t:"I am delighted to recommend MSK Construction for their exceptional quality of construction and outstanding customer service." },
];

const FAQS = [
  { q:"What services do you offer?",           a:"We offer architecture, construction, interior design, and renovation services for residential and commercial projects in Chennai." },
  { q:"How long does it take to complete a project?", a:"A typical residential home takes 12–18 months from design to handover, depending on scope and complexity." },
  { q:"Can I get a free consultation?",        a:"Yes! We offer a free initial consultation to understand your requirements and provide a complete overview of our services." },
  { q:"Do you handle both residential and commercial projects?", a:"Yes, MSK Construction handles luxury villas, independent homes, apartments, and commercial buildings across Chennai." },
  { q:"Are your services available outside Chennai?", a:"Our primary operations are in Chennai, but we do undertake select projects in wider Tamil Nadu." },
  { q:"Do you offer turnkey solutions?",       a:"Yes, complete turnkey solutions from design through construction to final handover — one point of contact for everything." },
  { q:"What sets you apart?",                  a:"ISO 9001:2015 certification, Silicon India recognition, a project tracking app, and 15+ years of proven excellence." },
  { q:"How do I track my project's progress?", a:"We provide a dedicated project tracking app with real-time updates on milestones, materials and timelines." },
  { q:"How much does it cost to build a house in Chennai?", a:"Our packages start from ₹1,799/sqft. Final cost depends on design, materials and location. Contact us for a free estimate." },
];

/* ─────────────────────────────────────────────
   TOPBAR
───────────────────────────────────────────── */
function Topbar() {
  return (
    <div className="topbar">
      <span>📍 No 1A, Adityaram Township, Sholinganallur, Chennai 600115</span>
      <div className="tb-r">
        <a href="tel:+917708668707">📞 +91 77086 68707</a>
        <span className="tb-div">|</span>
        <a href="mailto:enquiries@mskconstruction.in">✉ enquiries@mskconstruction.in</a>
        <span className="tb-div">|</span>
        <a href="https://www.instagram.com/msk__construction/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.youtube.com/@mskconstruction" target="_blank" rel="noreferrer">YouTube</a>
        <a href="https://in.linkedin.com/company/mskconstruction" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const [mob, setMob] = useState(false);
  useEffect(() => { setMob(false); }, [pathname]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("/")}>
          MSK<span> Construction</span>
        </div>

        <ul className="nav-links">
          {NAV_MENU.map(item => (
            <li key={item.label} className="nav-item">
              <button
                className={`nav-btn${pathname.startsWith(item.path) && item.path !== "/" ? " act" : pathname === "/" && item.path === "/" ? " act" : ""}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
                {item.sub && (
                  <span className="nav-chev">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M5 6L0 0h10z"/></svg>
                  </span>
                )}
              </button>
              {item.sub && (
                <div className="nav-dd">
                  {item.sub.map(s => (
                    <button key={s} onClick={() => navigate(item.path)}>{s}</button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={() => navigate("/contact")}>Contact Us</button>
        <button className="hamburger" onClick={() => setMob(o => !o)}>
          <span/><span/><span/>
        </button>
      </nav>

      <div className={`mob-menu${mob ? " open" : ""}`}>
        {NAV_MENU.map(item => (
          <button key={item.label} className="mob-lnk" onClick={() => navigate(item.path)}>{item.label}</button>
        ))}
        <button className="mob-lnk btn btn-g" style={{ marginTop:12, textAlign:"center" }} onClick={() => navigate("/contact")}>
          Contact Us
        </button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE HERO
───────────────────────────────────────────── */
function PageHero({ tag, title, sub }) {
  return (
    <div className="pg-hero">
      <div className="pg-hero-bg"/><div className="pg-hero-grid"/>
      <div className="pg-hero-c">
        {tag && <span className="tag" style={{ marginBottom:16 }}>{tag}</span>}
        <h1 className="pg-h1">{title}</h1>
        {sub && <p className="pg-sub">{sub}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function ContactForm() {
  const [f, setF] = useState({ fn:"", ph:"", em:"", loc:"", svc:"", msg:"" });
  const [sent, setSent] = useState(false);
  const h = e => setF(p => ({ ...p, [e.target.name]: e.target.value }));
  if (sent) return (
    <div className="success">
      <div className="suc-ic">✅</div>
      <div className="suc-t">Message Sent Successfully!</div>
      <div className="suc-s">Our team will get back to you within 24 hours.</div>
    </div>
  );
  return (
    <div className="form">
      <div className="form-row">
        <div><div className="f-lbl">First Name</div><input className="f-in" name="fn" placeholder="Your name" value={f.fn} onChange={h}/></div>
        <div><div className="f-lbl">Mobile</div><input className="f-in" name="ph" placeholder="+91 XXXXX XXXXX" value={f.ph} onChange={h}/></div>
      </div>
      <div><div className="f-lbl">Email</div><input className="f-in" name="em" type="email" placeholder="you@example.com" value={f.em} onChange={h}/></div>
      <div><div className="f-lbl">Location</div><input className="f-in" name="loc" placeholder="Your area / city" value={f.loc} onChange={h}/></div>
      <div>
        <div className="f-lbl">Service</div>
        <select className="f-sel" name="svc" value={f.svc} onChange={h}>
          <option value="">Select a service</option>
          <option>Construction</option><option>Architecture</option>
          <option>Interior Design</option><option>Renovation</option>
        </select>
      </div>
      <div><div className="f-lbl">Message</div><textarea className="f-in" name="msg" placeholder="Tell us about your project..." value={f.msg} onChange={h}/></div>
      <button className="f-submit" onClick={() => setSent(true)}>Send Message →</button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-wrap">
      <div className="faq-inner">
        <div className="tc">
          <span className="tag">FAQ</span>
          <h2 className="h2">Got Questions? We've Got Answers!</h2>
          <p className="sub" style={{ margin:"0 auto" }}>Find answers to common queries about our services, process, and more.</p>
        </div>
        <div style={{ marginTop:44 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item${open===i?" open":""}`}>
              <button className="faq-q" onClick={() => setOpen(open===i ? null : i)}>
                <span>{faq.q}</span>
                <span className="faq-tog">+</span>
              </button>
              <div className="faq-ans"><div className="faq-ans-inner">{faq.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="ft-grid">
          <div>
            <div className="ft-logo">MSK<span> Construction</span></div>
            <p className="ft-tag">MSK Construction delivers quality and innovative building solutions with integrity and excellence across Chennai.</p>
            <div className="ft-social">
              {[{h:"https://www.facebook.com/people/MSK-Construction/100089640972724/",i:"f"},{h:"https://www.instagram.com/msk__construction/",i:"📸"},{h:"https://in.linkedin.com/company/mskconstruction",i:"in"},{h:"https://www.youtube.com/@mskconstruction",i:"▶"}].map(s => (
                <a key={s.i} href={s.h} target="_blank" rel="noreferrer" className="soc-btn">{s.i}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="ft-col-t">Quick Links</div>
            {[["Home","/"],["About","/about"],["Projects","/projects"],["Career","/career"],["Contact","/contact"],["Vendor Registration","/vendor"]].map(([l,p]) => (
              <span key={l} className="ft-lnk" onClick={() => navigate(p)}>{l}</span>
            ))}
          </div>
          <div>
            <div className="ft-col-t">Services</div>
            {["Construction","Architecture","Interior","Renovation"].map(s => (
              <span key={s} className="ft-lnk" onClick={() => navigate(`/services/${s.toLowerCase()}`)}>{s}</span>
            ))}
          </div>
          <div>
            <div className="ft-col-t">Contact Us</div>
            <div className="ft-cr"><span>📞</span><div><a href="tel:+917708668707">+91 77086 68707</a><br/><a href="tel:+917200094121">+91 7200094121</a></div></div>
            <div className="ft-cr"><span>✉</span><a href="mailto:enquiries@mskconstruction.in">enquiries@mskconstruction.in</a></div>
            <div className="ft-cr"><span>📍</span><span>No 1A, 1st Floor, Adityaram Township, Phase 1, Sholinganallur, Chennai 600115</span></div>
          </div>
        </div>
        <div className="ft-btm">
          <span>© 2010–2026 MSK Construction. All rights reserved.</span>
          <span onClick={() => navigate("/privacy")} style={{ cursor:"pointer" }}>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGES
═══════════════════════════════════════════ */
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"/><div className="hero-grid"/><div className="hero-glow"/>
        <div className="hero-inner">
          <div>
            <div className="hero-badge fu">🏆 Top 10 Architecture Firms Chennai 2024</div>
            <h1 className="hero-h1 fu fu1">
              Building Your <em>Dream Home</em><br/>in Chennai with Unmatched Excellence
            </h1>
            <p className="hero-p fu fu2">MSK Construction — trusted builders in Chennai delivering expert architecture, interior design, and renovation services.</p>
            <div className="hero-btns fu fu3">
              <button className="btn btn-g" onClick={() => navigate("/contact")}>Contact Us for a Free Consultation</button>
              <button className="btn btn-ow" onClick={() => navigate("/projects")}>View Our Projects</button>
            </div>
            <div className="hero-stats fu fu4">
              {[{n:"15+",l:"Years of Excellence"},{n:"500+",l:"Projects Completed"},{n:"200+",l:"Happy Clients"}].map(s => (
                <div key={s.l}><div className="stat-n">{s.n}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-panel fu fu2">
            <div className="hp-title">Awards & Certifications</div>
            {[
              { ic:"🏅", t:"Top 10 Architecture Firms in Chennai", s:"Awarded by Silicon India Real Estate · 2024" },
              { ic:"🌟", t:"Top Contractors in Residence & Construction", s:"Recognised by India Glory Awards (IGA)" },
              { ic:"✅", t:"ISO 9001:2015 Certified", s:"International Quality Management Standard" },
            ].map(a => (
              <div className="aw-row" key={a.t}>
                <div className="aw-icon">{a.ic}</div>
                <div className="aw-info"><strong>{a.t}</strong><span>{a.s}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <div className="ab-wrap">
        <div className="ab-inner">
          <div>
            <span className="tag">About Us</span>
            <h2 className="h2">15+ Years of Building Excellence in Chennai</h2>
            <p className="sub">At MSK Construction, we bring over 15 years of experience crafting luxury homes and villas in Chennai. Our ISO 9001:2015 certification and recognition as one of the Top 10 Architecture Firms in Chennai 2024 stand as testament to our unwavering commitment to excellence.</p>
            <div className="chk-list">
              {["15+ years of excellence in turnkey construction.","Dedicated architects and personalised project management.","ISO-certified for unmatched quality assurance."].map(c => (
                <div className="chk" key={c}><div className="chk-ic">✓</div>{c}</div>
              ))}
            </div>
            <button className="btn btn-g" onClick={() => navigate("/contact")}>Request Your Free Consultation Today</button>
          </div>
          <div className="cert-grid">
            <div className="cert-card dk"><div className="cc-ic">🏆</div><div className="cc-name">Top 10 Architecture Firms 2024</div><div className="cc-desc">Awarded by Silicon India Real Estate Magazine, Chennai</div></div>
            <div className="cert-card"><div className="cc-ic">🌟</div><div className="cc-name">India Glory Award</div><div className="cc-desc">Top Contractors in Residence & Construction</div></div>
            <div className="cert-card"><div className="cc-ic">✅</div><div className="cc-name">ISO 9001:2015</div><div className="cc-desc">International Quality Management Standard</div></div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="svc-wrap">
        <div className="sec">
          <div className="tc"><span className="tag">Our Services</span><h2 className="h2">Construction, Architecture, and Design Services in Chennai</h2><p className="sub tc">Explore our comprehensive range of services designed to bring your dream home to life with impeccable quality.</p></div>
          <div className="svc-grid">
            {SERVICES.map(s => (
              <div className="svc-card" key={s.short}>
                <div className="svc-ico">{s.icon}</div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-links">
                  <span className="svc-learn" onClick={() => navigate(s.path)}>Learn More</span>
                  <button className="svc-btn" onClick={() => navigate(s.path)}>{s.cta}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="proc-wrap">
        <div className="proc-inner">
          <div className="tc">
            <span className="tag" style={{ background:"rgba(201,160,80,.15)",color:"var(--gold)" }}>Our Process</span>
            <h2 className="h2 h2-w">Our Streamlined Construction Process: From Concept to Completion</h2>
            <p className="sub" style={{ margin:"0 auto",color:"#888" }}>Experience a transparent and efficient journey, ensuring your dream home is built to perfection.</p>
          </div>
          <div className="proc-steps">
            <div className="proc-line"/>
            {PROCESS.map(s => (
              <div className="proc-step" key={s.n}>
                <div className="step-circ">{s.n}</div>
                <h4 className="step-t">{s.t}</h4>
                <p className="step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="why-wrap">
        <div className="sec">
          <div className="tc"><span className="tag">Why Choose Us</span><h2 className="h2">Why MSK Construction Stands Apart</h2><p className="sub tc">Choosing MSK Construction means choosing excellence in every dimension.</p></div>
          <div className="why-grid">
            {WHY.map(w => (
              <div className="why-card" key={w.t}>
                <div className="why-ic">{w.ic}</div>
                <h4 className="why-t">{w.t}</h4>
                <p className="why-d">{w.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <button className="btn btn-g" onClick={() => navigate("/about")}>Learn More</button>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="proj-wrap">
        <div className="sec">
          <div className="tc"><span className="tag">Portfolio</span><h2 className="h2">Our Featured Projects</h2><p className="sub tc">Discover our portfolio of stunning residential and commercial projects showcasing our commitment to quality.</p></div>
          <div className="proj-grid">
            {PROJECTS.map((p,i) => (
              <div className="proj-card" key={i} onClick={() => navigate("/projects")}>
                <div className="proj-ph" style={{ background:p.bg }}><span>{p.em}</span></div>
                <div className="proj-ov"><div className="proj-name">{p.name}</div></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <button className="btn btn-g" onClick={() => navigate("/projects")}>View More Projects</button>
          </div>
        </div>
      </div>

      {/* AWARDS */}
      <div className="aw-wrap">
        <div className="aw-inner">
          <div className="tc">
            <span className="tag" style={{ background:"rgba(201,160,80,.15)",color:"var(--gold)" }}>Recognition</span>
            <h2 className="h2 h2-w">Our Awards & Certifications</h2>
            <p className="sub" style={{ margin:"0 auto",color:"#888" }}>Recognised for excellence in architecture and construction across Chennai.</p>
          </div>
          <div className="aw-grid">
            {[
              { ic:"🏅", t:"Top 10 Architecture Firms in Chennai",    d:"Awarded by Silicon India Real Estate for architectural excellence and innovation." },
              { ic:"🌟", t:"Top Contractors in Residence & Construction", d:"Recognised by India Glory Awards for outstanding construction quality and delivery." },
              { ic:"✅", t:"ISO 9001:2015 Certified",                  d:"International quality management standard ensuring premium quality in every project." },
            ].map(a => (
              <div className="aw-card" key={a.t}>
                <div className="aw-card-ic">{a.ic}</div>
                <h4 className="aw-card-t">{a.t}</h4>
                <p className="aw-card-d">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="rev-wrap">
        <div className="sec">
          <div className="rev-head">
            <div><span className="tag">Testimonials</span><h2 className="h2">Google Reviews</h2></div>
            <div className="rev-box">
              <div className="rev-score">5.0</div>
              <div><div className="rev-stars">★★★★★</div><div className="rev-count">200+ Reviews</div></div>
            </div>
          </div>
          <div className="rev-grid">
            {REVIEWS.map(r => (
              <div className="rev-card" key={r.n}>
                <div className="rev-s">★★★★★</div>
                <p className="rev-t">"{r.t}"</p>
                <div className="rev-a"><div className="rev-av">{r.n[0]}</div>{r.n}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",gap:14,marginTop:36,justifyContent:"center",flexWrap:"wrap" }}>
            <a href="https://g.co/kgs/u455169" target="_blank" rel="noreferrer" className="btn btn-od">Read More Reviews</a>
            <a href="https://g.page/r/CUphee_5aq69EBE/review" target="_blank" rel="noreferrer" className="btn btn-g">Leave a Review on Google</a>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="ct-wrap">
        <div className="ct-inner">
          <div>
            <span className="tag" style={{ background:"rgba(201,160,80,.15)",color:"var(--gold)" }}>Get In Touch</span>
            <h2 className="ct-title">Ready to Bring Your Vision to Life?</h2>
            <p className="ct-sub">Get a free consultation with our experts and start your project today.</p>
            {[
              { ic:"📞",lbl:"Phone",    val:<><a href="tel:+917708668707">+91 77086 68707</a><br/><a href="tel:+917200094121">+91 7200094121</a></> },
              { ic:"✉", lbl:"Email",   val:<a href="mailto:enquiries@mskconstruction.in">enquiries@mskconstruction.in</a> },
              { ic:"📍",lbl:"Address", val:"No 1A, 1st Floor, Adityaram Township, Sholinganallur, Chennai 600115" },
              { ic:"⏰",lbl:"Hours",   val:"Mon–Sat: 9 AM – 7 PM · Sun: By Appointment" },
            ].map(d => (
              <div className="ct-det" key={d.lbl}>
                <div className="ct-det-ic">{d.ic}</div>
                <div><div className="ct-det-lbl">{d.lbl}</div><div className="ct-det-val">{d.val}</div></div>
              </div>
            ))}
          </div>
          <ContactForm/>
        </div>
      </div>

      <FAQ/>
    </>
  );
}

/* ── ABOUT ── */
function AboutPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHero tag="About Us" title="15+ Years of Building Excellence" sub="Trusted builders in Chennai delivering expert architecture, construction, interior design, and renovation with an unwavering commitment to quality." />
      <div className="ab-wrap">
        <div className="ab-inner">
          <div>
            <span className="tag">Our Story</span>
            <h2 className="h2">Building Dreams Since 2010</h2>
            <p className="sub" style={{ marginBottom:16 }}>Founded in 2010, MSK Construction began as a small construction firm with a vision to transform Chennai's residential landscape. Over 15 years, we've grown into a full-service construction company, delivering hundreds of luxury homes, villas, and commercial spaces.</p>
            <p className="sub">Our ISO 9001:2015 certification and Silicon India recognition affirm our commitment to quality, transparency, and excellence in every project.</p>
            <div className="chk-list" style={{ marginTop:24 }}>
              {["500+ projects completed across Chennai","Team of 50+ dedicated architects and engineers","ISO 9001:2015 certified quality processes","Vastu-compliant design expertise"].map(c => (
                <div className="chk" key={c}><div className="chk-ic">✓</div>{c}</div>
              ))}
            </div>
            <button className="btn btn-g" style={{ marginTop:8 }} onClick={() => navigate("/contact")}>Work With Us</button>
          </div>
          <div className="cert-grid">
            {WHY.map(w => (
              <div className="cert-card" key={w.t}><div className="cc-ic">{w.ic}</div><div className="cc-name">{w.t}</div><div className="cc-desc">{w.d}</div></div>
            ))}
          </div>
        </div>
      </div>
      <FAQ/>
    </>
  );
}

/* ── PROJECTS ── */
function ProjectsPage() {
  const navigate = useNavigate();
  const extra = [
    { name:"Elevated Suburban Home – Madhavaram",  bg:"linear-gradient(135deg,#1a1a2a,#3a3a6e)", em:"🏗️" },
    { name:"Elite G+1 Family Home – Pallikaranai", bg:"linear-gradient(135deg,#2a1a10,#6e4a20)", em:"🏠" },
    { name:"G+2 Elegant Residence – Valasaravakkam",bg:"linear-gradient(135deg,#10201a,#206e4a)",em:"🌳" },
    { name:"G+3 Urban Residence – Pudupakkam",     bg:"linear-gradient(135deg,#201a10,#6e5a20)", em:"🏢" },
    { name:"G+2 Modern Living Home – Akkarai",     bg:"linear-gradient(135deg,#1a2020,#3a6060)", em:"🌊" },
    { name:"Commercial Space – Thazhambur",         bg:"linear-gradient(135deg,#202020,#505050)", em:"🏬" },
  ];
  const all = [...PROJECTS, ...extra];
  return (
    <>
      <PageHero tag="Portfolio" title="Our Featured Projects" sub="A portfolio of stunning residential and commercial projects showcasing our commitment to quality, innovation, and excellence." />
      <div className="proj-wrap">
        <div className="sec">
          <div className="proj-grid" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))" }}>
            {all.map((p,i) => (
              <div className="proj-card" key={i}>
                <div className="proj-ph" style={{ background:p.bg }}><span>{p.em}</span></div>
                <div className="proj-ov"><div className="proj-name">{p.name}</div></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <button className="btn btn-g" onClick={() => navigate("/contact")}>Start Your Project Today</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── SERVICES ── */
function ServicesPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHero tag="Services" title="Expert Construction & Design Services" sub="Comprehensive architecture, construction, interior design and renovation services tailored to bring your dream home to life." />
      <div className="svc-wrap">
        <div className="sec">
          <div className="svc-grid">
            {SERVICES.map(s => (
              <div className="svc-card" key={s.short}>
                <div className="svc-ico">{s.icon}</div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-links">
                  <button className="svc-btn" onClick={() => navigate("/contact")}>{s.cta}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="proc-wrap">
        <div className="proc-inner">
          <div className="tc">
            <span className="tag" style={{ background:"rgba(201,160,80,.15)",color:"var(--gold)" }}>How We Work</span>
            <h2 className="h2 h2-w">Our Construction Process</h2>
          </div>
          <div className="proc-steps">
            <div className="proc-line"/>
            {PROCESS.map(s => (
              <div className="proc-step" key={s.n}>
                <div className="step-circ">{s.n}</div>
                <h4 className="step-t">{s.t}</h4>
                <p className="step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FAQ/>
    </>
  );
}

/* ── CONTACT ── */
function ContactPage() {
  return (
    <>
      <PageHero tag="Contact" title="Get In Touch With Our Experts" sub="Reach out for a free consultation — our team is ready to discuss your project and provide tailored solutions." />
      <div className="ct-wrap" style={{ minHeight:"60vh" }}>
        <div className="ct-inner" style={{ paddingTop:80 }}>
          <div>
            <span className="tag" style={{ background:"rgba(201,160,80,.15)",color:"var(--gold)" }}>Let's Talk</span>
            <h2 className="ct-title">Let's Build Something Extraordinary Together</h2>
            <p className="ct-sub">Fill out the form and our team will get back to you within 24 hours with a personalised plan for your project.</p>
            {[
              { ic:"📞",lbl:"Phone",    val:<><a href="tel:+917708668707">+91 77086 68707</a><br/><a href="tel:+917200094121">+91 7200094121</a></> },
              { ic:"✉", lbl:"Email",   val:<a href="mailto:enquiries@mskconstruction.in">enquiries@mskconstruction.in</a> },
              { ic:"📍",lbl:"Office",  val:"No 1A, 1st Floor, Adityaram Township, Phase 1, Sholinganallur, Chennai 600115" },
              { ic:"⏰",lbl:"Hours",   val:"Mon–Sat: 9 AM – 7 PM · Sun: By Appointment" },
            ].map(d => (
              <div className="ct-det" key={d.lbl}>
                <div className="ct-det-ic">{d.ic}</div>
                <div><div className="ct-det-lbl">{d.lbl}</div><div className="ct-det-val">{d.val}</div></div>
              </div>
            ))}
          </div>
          <ContactForm/>
        </div>
      </div>
      <FAQ/>
    </>
  );
}

/* ── PACKAGES ── */
function PackagesPage() {
  const navigate = useNavigate();
  const pkgs = [
    { name:"Basic",   price:"₹1,799", popular:false, feats:["Quality construction materials","Standard architectural design","Standard finishing & flooring","Civil & structural work","Dedicated project manager","Standard electrical & plumbing"] },
    { name:"Premium", price:"₹2,299", popular:true,  feats:["Premium construction materials","Custom architectural design","Premium finishing & flooring","Full electrical & plumbing","Interior design consultation","Project tracking app access","1-year warranty"] },
    { name:"Luxury",  price:"₹2,999", popular:false, feats:["Luxury imported materials","Award-winning architecture","Luxury interiors & fittings","Smart home integration","Full interior design service","Priority project management","5-year warranty","Vastu consultation"] },
  ];
  return (
    <>
      <PageHero tag="Packages" title="Transparent Construction Packages" sub="Flexible pricing packages designed to suit every budget without compromising on quality." />
      <div style={{ background:"var(--cream2)" }}>
        <div className="sec">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:28, alignItems:"start" }}>
            {pkgs.map(p => (
              <div key={p.name} className={`pkg-card${p.popular?" pop":""}`}>
                {p.popular && <div className="pkg-badge">MOST POPULAR</div>}
                <div className="pkg-name">{p.name}</div>
                <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:28 }}>
                  <span className="pkg-price">{p.price}</span>
                  <span className="pkg-unit">/sqft</span>
                </div>
                <div className="pkg-feat">
                  {p.feats.map(f => (
                    <div className="pkg-f" key={f}><span style={{ color:"var(--gold)",fontWeight:700,marginTop:1 }}>✓</span>{f}</div>
                  ))}
                </div>
                <button className="btn btn-g" style={{ width:"100%",justifyContent:"center" }} onClick={() => navigate("/contact")}>Get Started</button>
              </div>
            ))}
          </div>
          <p style={{ textAlign:"center",color:"var(--muted)",fontSize:14,marginTop:32 }}>
            * Prices are indicative. Final cost depends on design complexity, materials and location.{" "}
            <span style={{ color:"var(--gold)",fontWeight:600,cursor:"pointer" }} onClick={() => navigate("/contact")}>Get a custom quote →</span>
          </p>
        </div>
      </div>
      <FAQ/>
    </>
  );
}

/* ── PLACEHOLDER ── */
function Placeholder({ title, sub }) {
  const navigate = useNavigate();
  return (
    <>
      <PageHero title={title} sub={sub} />
      <div style={{ background:"#fff",padding:"80px 40px",textAlign:"center" }}>
        <p style={{ color:"var(--muted)",fontSize:15,marginBottom:24 }}>This page is coming soon. In the meantime, feel free to contact us.</p>
        <button className="btn btn-g" onClick={() => navigate("/contact")}>Get In Touch</button>
      </div>
    </>
  );
}

/* ── 404 ── */
function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:"70vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:40 }}>
      <div style={{ fontFamily:"var(--fh)",fontSize:80,color:"var(--gold)",lineHeight:1 }}>404</div>
      <h2 style={{ fontFamily:"var(--fh)",fontSize:28,color:"var(--dark)" }}>Page Not Found</h2>
      <p style={{ color:"var(--muted)",fontSize:15 }}>The page you're looking for doesn't exist.</p>
      <button className="btn btn-g" onClick={() => navigate("/")}>Go Back Home</button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   APP
═══════════════════════════════════════════ */
function AppShell() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0,0); }, [pathname]);
  return (
    <div>
      <Topbar/>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/"                element={<HomePage/>} />
          <Route path="/about"           element={<AboutPage/>} />
          <Route path="/projects"        element={<ProjectsPage/>} />
          <Route path="/services"        element={<ServicesPage/>} />
          <Route path="/services/:slug"  element={<ServicesPage/>} />
          <Route path="/contact"         element={<ContactPage/>} />
          <Route path="/packages"        element={<PackagesPage/>} />
          <Route path="/resources"       element={<Placeholder title="Resources" sub="Guides, FAQs, and downloadable brochures from MSK Construction." />} />
          <Route path="/career"          element={<Placeholder title="Careers at MSK Construction" sub="Join our growing team and build something extraordinary." />} />
          <Route path="/vendor"          element={<Placeholder title="Vendor Registration" sub="Register as a trusted vendor partner with MSK Construction." />} />
          <Route path="/privacy"         element={<Placeholder title="Privacy Policy" sub="How MSK Construction handles your data and privacy." />} />
          <Route path="*"                element={<NotFound/>} />
        </Routes>
      </main>
      <Footer/>
      <a className="wa-fab" href="https://wa.me/917708668707" target="_blank" rel="noreferrer" title="Chat on WhatsApp">💬</a>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
        <AppShell/>
    </>
  );
}