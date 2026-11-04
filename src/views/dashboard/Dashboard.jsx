import React, { useEffect, useMemo, useState } from 'react';
import Icon from '../../components/Icon';
import JobVacancyServices from '../../services/recruitment/JobVacancyServices';
import SmestaLogo from '../../assets/images/smesta_text_transparent.png';
import SusantiMegahLogo from '../../assets/images/customer-portal-mark.png';
import JobDetail from '../job/JobDetail';

export default function Dashboard({ onLogin, isLoggedIn }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Semua Lokasi');
  const [department, setDepartment] = useState('Semua Departemen');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    JobVacancyServices.getAll().then((response) => setJobs(response?.data?.data || [])).finally(() => setLoading(false));
  }, []);

  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location))], [jobs]);
  const departments = useMemo(() => [...new Set(jobs.map((job) => job.department))], [jobs]);
  const visibleJobs = useMemo(() => jobs.filter((job) => {
    const text = `${job.title} ${job.department} ${job.location}`.toLowerCase();
    return job.status === 'Aktif' && text.includes(query.toLowerCase()) && (location === 'Semua Lokasi' || job.location === location) && (department === 'Semua Departemen' || job.department === department);
  }), [department, jobs, location, query]);
  const resetFilters = () => { setQuery(''); setLocation('Semua Lokasi'); setDepartment('Semua Departemen'); };

  if (selectedJob) return <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} onLogin={onLogin} isLoggedIn={isLoggedIn}/>;

  return <div className="career-page">
    <header className="career-header">
      <a className="career-brand career-logo-lockup" href="#top" aria-label="SMESTA Career"><img src={SmestaLogo} alt="SMESTA"/><span>CAREER</span></a>
      <button className="career-login" onClick={onLogin}>Masuk Kandidat</button>
    </header>
    <main>
      <section className="career-hero" id="top">
        <div className="career-hero-copy"><span className="career-kicker">KARIER DI SMESTA</span><h1>Temukan pekerjaan yang<br/><em>tepat untukmu.</em></h1><p>Bergabung bersama tim yang bertumbuh, berkolaborasi, dan menciptakan dampak nyata setiap hari.</p><div className="career-search"><Icon name="search" size={21}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari posisi atau departemen..."/><a href="#vacancies">Cari Lowongan</a></div><div className="career-trust"><span><b>{jobs.filter((job) => job.status === 'Aktif').length}</b> lowongan aktif</span><i/><span><b>3</b> kota penempatan</span><i/><span><b>1</b> langkah untuk melamar</span></div></div>
        <div className="career-hero-art" aria-hidden="true"><div className="career-orbit orbit-a"/><div className="career-orbit orbit-b"/><div className="career-person"><span>👩🏻‍💻</span></div><div className="career-float float-one"><span>✓</span><div><b>Application sent</b><small>Good luck on your journey!</small></div></div><div className="career-float float-two"><span>★</span><div><b>Great opportunity</b><small>Find your best role</small></div></div></div>
      </section>
      <section className="career-vacancies" id="vacancies">
        <div className="career-section-title"><div><span>PELUANG KARIER</span><h2>Lowongan tersedia</h2><p>Pilih kesempatan yang paling sesuai dengan pengalaman dan tujuan kariermu.</p></div><b>{visibleJobs.length} posisi ditemukan</b></div>
        <div className="career-filterbar"><label><span>Lokasi</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>Semua Lokasi</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Departemen</span><select value={department} onChange={(event) => setDepartment(event.target.value)}><option>Semua Departemen</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></label><button className="career-filter-reset" type="button" onClick={resetFilters}>↻ <span>Reset filter</span></button></div>
        {loading ? <div className="career-empty"><span className="vacancy-loader"/><p>Memuat lowongan...</p></div> : visibleJobs.length ? <div className="career-job-grid">{visibleJobs.map((job, index) => <article className="career-job" key={job.id}><div className="career-job-top"><span className={`career-job-icon tone-${index % 4}`}><Icon name="briefcase"/></span><span className="career-job-new">Aktif</span></div><p className="career-job-company">SMESTA · {job.department}</p><h3>{job.title}</h3><div className="career-job-tags"><span>⌖ {job.location}</span><span>◷ {job.employment}</span><span>♙ {job.vacancies} posisi</span></div><p className="career-job-desc">Kami mencari talenta yang antusias untuk bergabung dan berkembang bersama tim {job.department}.</p><div className="career-job-footer"><div><small>Batas lamaran</small><b>{job.date}</b></div><button onClick={() => setSelectedJob(job)}>Lihat &amp; Lamar <Icon name="chevron" size={16}/></button></div></article>)}</div> : <div className="career-empty"><Icon name="briefcase" size={36}/><h3>Belum ada lowongan yang cocok</h3><p>Coba gunakan kata kunci atau filter lainnya.</p><button onClick={resetFilters}>Tampilkan semua</button></div>}
      </section>
      <section className="career-process" id="process"><div><span>PROSES REKRUTMEN</span><h2>Sederhana dan transparan</h2><p>Kami ingin setiap kandidat mengetahui langkah berikutnya.</p></div><ol><li><b>01</b><span><strong>Pilih lowongan</strong><small>Temukan posisi yang sesuai.</small></span></li><li><b>02</b><span><strong>Kirim lamaran</strong><small>Lengkapi profil dan CV.</small></span></li><li><b>03</b><span><strong>Proses seleksi</strong><small>Ikuti tahapan bersama tim kami.</small></span></li></ol></section>
    </main>
    <footer className="career-footer" id="about">
      <div className="career-footer-content">
        <div className="career-footer-company"><img src={SusantiMegahLogo} alt="Susanti Megah"/><div><h3>PT Susanti Megah</h3><p>Portal rekrutmen resmi untuk menemukan talenta yang siap tumbuh dan berkembang bersama kami.</p></div></div>
        <div className="career-footer-links"><div><b>Karier</b><a href="#vacancies">Lowongan Tersedia</a><a href="#process">Proses Rekrutmen</a></div><div><b>Informasi</b><a href="#about">Tentang Perusahaan</a><a href="#about">FAQ Kandidat</a></div></div>
        <div className="career-footer-brand"><div className="career-brand career-logo-lockup"><img src={SmestaLogo} alt="SMESTA"/><span>CAREER</span></div><p>Kesempatan terbaik dimulai dari langkah pertamamu.</p></div>
      </div>
      <div className="career-footer-bottom"><small>© 2026 PT Susanti Megah. Seluruh hak dilindungi.</small><small>Proses rekrutmen tidak dipungut biaya dalam bentuk apa pun.</small></div>
    </footer>
  </div>;
}
