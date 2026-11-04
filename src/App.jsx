import React, { useMemo, useState } from 'react';
import { candidates, interviews, jobs } from './data';
import RecruitmentDashboard from './views/dashboard/Dashboard';
import CandidateAuth from './views/auth/CandidateAuth';
import CandidateDashboard from './views/candidate/CandidateDashboard';
import DiscAssessment from './views/disc/DiscAssessment';
import DiscIntro from './views/disc/DiscIntro';
import MdtAssessment from './views/mdt/MdtAssessment';
import ApplicantBiodata from './views/candidate/ApplicantBiodata';
import { recruitmentNavigation } from './routes';
import { clearCandidateUserCookie, getCandidateUserCookie } from './utils/candidateSession';
import AuthServices from './services/recruitment/AuthServices';

const icons = {
  dashboard: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
  pipeline: '<path d="M4 5h16M7 12h10M10 19h4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  report: '<path d="M4 19V9M10 19V5M16 19v-7M22 19V2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.02A1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.02A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'
};

function Icon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

function Logo() {
  return <div className="logo"><div className="logo-mark"><span/><span/><span/></div><div><strong>SMESTA</strong><small>RECRUITMENT</small></div></div>;
}

const navigation = recruitmentNavigation.map(({ icon, label }) => [icon, label]);

function Login({ onLogin }) {
  const [show, setShow] = useState(false);
  return <div className="login-page">
    <div className="login-art"><Logo/><div className="art-copy"><div className="art-badge">Recruitment workspace</div><h1>Temukan talenta.<br/>Bangun masa depan.</h1><p>Kelola seluruh proses rekrutmen secara efisien dalam satu platform yang terintegrasi.</p></div><div className="orb orb-one"/><div className="orb orb-two"/><div className="talent-cards"><div className="floating-card"><span className="avatar" style={{background:'#6c63d8'}}>NP</span><div><b>Nadia Permata</b><small>Product Designer</small></div><em>92%</em></div><div className="floating-card second"><span className="avatar" style={{background:'#198ca2'}}>RM</span><div><b>Rizky Maulana</b><small>Backend Engineer</small></div><em>88%</em></div></div></div>
    <div className="login-panel"><div className="login-box"><div className="mobile-logo"><Logo/></div><p className="eyebrow">Selamat datang</p><h2>Masuk ke akun Anda</h2><p className="muted">Gunakan akun SMESTA untuk melanjutkan.</p><label>Email</label><input defaultValue="recruiter@smesta.id" type="email"/><label>Kata sandi</label><div className="password"><input defaultValue="password" type={show ? 'text' : 'password'}/><button onClick={() => setShow(!show)} type="button">{show ? 'Sembunyikan' : 'Lihat'}</button></div><div className="login-options"><label><input type="checkbox" defaultChecked/> Ingat saya</label><a href="#">Lupa kata sandi?</a></div><button className="primary login-button" onClick={onLogin}>Masuk ke SMESTA <Icon name="chevron" size={18}/></button><p className="demo-note">Demo: klik tombol masuk untuk melihat dashboard.</p></div></div>
  </div>;
}

function CardHead({title,subtitle,action,onClick}) { return <header className="card-head"><div><h3>{title}</h3>{subtitle&&<p>{subtitle}</p>}</div>{action&&<button onClick={onClick}>{action} <Icon name="chevron" size={15}/></button>}</header>; }

function CandidateTable({rows}) { return <div className="table-wrap"><table><thead><tr><th>Kandidat</th><th>Posisi</th><th>Tahap</th><th>Skor</th><th>Tanggal</th></tr></thead><tbody>{rows.map(c=><tr key={c.id}><td><div className="person"><span className="avatar" style={{background:c.color}}>{c.initials}</span><div><b>{c.name}</b><small>{c.id}</small></div></div></td><td>{c.role}</td><td><span className={`badge ${c.stage.toLowerCase().replace(' ','-')}`}>{c.stage}</span></td><td><span className="score">{c.score}</span></td><td>{c.date}</td></tr>)}</tbody></table></div>; }

function CandidatesPage() {
  const [query,setQuery]=useState(''); const [stage,setStage]=useState('Semua');
  const rows=useMemo(()=>candidates.filter(c=>(stage==='Semua'||c.stage===stage)&&(`${c.name} ${c.role}`.toLowerCase().includes(query.toLowerCase()))),[query,stage]);
  return <Page title="Kandidat" subtitle="Kelola seluruh kandidat dalam proses rekrutmen." button="Tambah Kandidat"><div className="card list-card"><div className="filters"><div className="search-box"><Icon name="search" size={18}/><input placeholder="Cari nama atau posisi..." value={query} onChange={e=>setQuery(e.target.value)}/></div><select value={stage} onChange={e=>setStage(e.target.value)}><option>Semua</option><option>Applied</option><option>Screening</option><option>Technical Test</option><option>Interview</option><option>Offer</option></select><span>{rows.length} kandidat</span></div><CandidateTable rows={rows}/></div></Page>;
}

function JobsPage() { return <Page title="Lowongan" subtitle="Buat dan pantau kebutuhan talenta perusahaan." button="Buat Lowongan"><div className="job-grid">{jobs.map((j,i)=><article className="card job-card" key={j.title}><div className={`job-icon j${i}`}><Icon name="briefcase"/></div><span className={`status ${j.status.toLowerCase()}`}>{j.status}</span><h3>{j.title}</h3><p>{j.department} · {j.location}</p><div className="job-meta"><div><b>{j.candidates}</b><small>Kandidat</small></div><div><b>{j.date}</b><small>Ditutup</small></div></div><button>Lihat Detail <Icon name="chevron" size={15}/></button></article>)}</div></Page>; }

function PipelinePage(){ const stages=['Applied','Screening','Technical Test','Interview','Offer']; return <Page title="Pipeline" subtitle="Pantau perjalanan setiap kandidat."><div className="kanban">{stages.map(stage=><div className="kanban-col" key={stage}><header><b>{stage}</b><span>{candidates.filter(c=>c.stage===stage).length}</span></header>{candidates.filter(c=>c.stage===stage).map(c=><article className="card mini-candidate" key={c.id}><div className="person"><span className="avatar" style={{background:c.color}}>{c.initials}</span><div><b>{c.name}</b><small>{c.role}</small></div></div><footer><span>Skor <b>{c.score}</b></span><button>•••</button></footer></article>)}</div>)}</div></Page>; }

function InterviewPage(){ return <Page title="Interview" subtitle="Atur agenda dan evaluasi interview kandidat." button="Jadwalkan Interview"><div className="card interview-page"><div className="date-panel"><span>NOV</span><strong>03</strong><small>Selasa</small></div><div className="interview-list">{interviews.map(x=><div className="interview-row" key={x.time}><time>{x.time}<small>WIB</small></time><i style={{background:x.color}}/><div className="person"><span className="avatar" style={{background:x.color}}>{x.name.split(' ').map(y=>y[0]).join('').slice(0,2)}</span><div><b>{x.name}</b><small>{x.role}</small></div></div><span className="interview-type">{x.type}</span><button className="outline">Detail</button></div>)}</div></div></Page>; }

function Page({title,subtitle,button,children}){ return <><div className="page-title"><div><h1>{title}</h1><p>{subtitle}</p></div>{button&&<button className="primary"><Icon name="plus"/> {button}</button>}</div>{children}</>; }

function App(){
  const [showAuth, setShowAuth] = useState(false);
  const [publicPage, setPublicPage] = useState('career');
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('smesta-candidate-auth') === '1');
  const [candidateUser, setCandidateUser] = useState(() => {
    const storedUser = getCandidateUserCookie();
    return storedUser?.candidate || storedUser;
  });
  const authenticated = (user) => {
    sessionStorage.setItem('smesta-candidate-auth', '1');
    setCandidateUser(user);
    setIsLoggedIn(true);
    setShowAuth(false);
    setPublicPage('candidate');
  };
  const logout = async () => {
    const token = sessionStorage.getItem('smesta-candidate-token');
    try {
      if (token) await AuthServices.postLogout(token);
    } catch {
      // Sesi lokal tetap harus dibersihkan ketika API logout tidak tersedia.
    } finally {
      sessionStorage.removeItem('smesta-candidate-auth');
      sessionStorage.removeItem('smesta-candidate-token');
      clearCandidateUserCookie();
      setCandidateUser(null);
      setIsLoggedIn(false);
      setPublicPage('career');
    }
  };
  return <>{publicPage === 'mdt'
    ? <MdtAssessment onBack={() => setPublicPage('candidate')}/>
    : publicPage === 'biodata'
    ? <ApplicantBiodata onBack={() => setPublicPage('candidate')} onSubmit={() => { window.alert('Biodata berhasil dikirim sebagai demo.'); setPublicPage('candidate'); }}/>
    : publicPage === 'disc-intro'
    ? <DiscIntro onBack={() => setPublicPage('candidate')} onStart={() => setPublicPage('disc')}/>
    : publicPage === 'disc'
    ? <DiscAssessment onBack={() => setPublicPage('candidate')} onComplete={() => setPublicPage('candidate')}/>
    : publicPage === 'candidate'
      ? <CandidateDashboard candidate={candidateUser} onHome={() => setPublicPage('career')} onBrowseJobs={() => setPublicPage('career')} onLogout={logout} onOpenDisc={() => setPublicPage('disc-intro')} onOpenMdt={() => setPublicPage('mdt')} onOpenBiodata={() => setPublicPage('biodata')}/>
      : <RecruitmentDashboard candidate={candidateUser} onLogin={() => setShowAuth(true)} onOpenDashboard={() => setPublicPage('candidate')} isLoggedIn={isLoggedIn}/>}
    {showAuth && <CandidateAuth onClose={() => setShowAuth(false)} onAuthenticated={authenticated}/>}</>;
}

export default App;
