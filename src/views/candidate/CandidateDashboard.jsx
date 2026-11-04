import React, { useState } from 'react';
import Icon from '../../components/Icon';
import SmestaLogo from '../../assets/images/smesta_text_transparent.png';

export default function CandidateDashboard({ onHome, onBrowseJobs, onLogout, onOpenDisc, onOpenMdt, onOpenBiodata }) {
  const [cvFile, setCvFile] = useState(null);
  const [photo, setPhoto] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Nadia Permata',
    role: 'Backend Engineer',
    location: 'Surabaya',
    email: 'nadia.permata@email.com',
    phone: '0812 3456 7890',
    education: 'S1 Teknik Informatika'
  });
  const updateProfile = event => {
    const { name, value } = event.target;
    setProfile(current => ({ ...current, [name]: value }));
    setProfileSaved(false);
  };
  const updatePhoto = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result || ''));
    reader.readAsDataURL(file);
    setProfileSaved(false);
  };
  const saveProfile = event => {
    event.preventDefault();
    setProfileSaved(true);
  };
  return <div className="candidate-dashboard">
    <header className="candidate-dashboard-header">
      <button className="candidate-dashboard-logo" type="button" onClick={onHome} aria-label="Kembali ke halaman awal"><img src={SmestaLogo} alt="SMESTA"/><span>CAREER</span></button>
      <div className="candidate-account"><span>NP</span><div><b>Nadia Permata</b><small>Kandidat</small></div><button onClick={onLogout} title="Keluar">↗</button></div>
    </header>
    <main className="candidate-dashboard-main">
      <section className="candidate-welcome"><div><span>SELAMAT DATANG KEMBALI</span><h1>Halo, Nadia 👋</h1><p>Pantau perkembangan lamaran dan temukan kesempatan karier terbaikmu.</p></div><button onClick={onBrowseJobs}><Icon name="search" size={17}/> Cari Lowongan</button></section>
      <section className="candidate-summary">
        <article><span className="summary-icon blue"><Icon name="briefcase"/></span><div><small>Total Lamaran</small><b>3</b><p>Seluruh lamaranmu</p></div></article>
        <article><span className="summary-icon cyan"><Icon name="pipeline"/></span><div><small>Dalam Proses</small><b>2</b><p>Sedang ditinjau tim HR</p></div></article>
        <article><span className="summary-icon orange">◷</span><div><small>Jadwal Interview</small><b>1</b><p>Minggu ini</p></div></article>
      </section>
      <div className="candidate-dashboard-grid">
        <section className="candidate-panel applications-panel candidate-profile-panel">
          <header><div><h2>Informasi Kandidat</h2><p>Perbarui data profil yang digunakan dalam proses rekrutmen</p></div><button onClick={onOpenBiodata}>Lengkapi Biodata</button></header>
          <form className="candidate-profile-overview candidate-profile-content" onSubmit={saveProfile}>
            <div className="candidate-profile-identity editable">
              <label className="candidate-photo-upload" title="Upload foto profil">
                {photo ? <img src={photo} alt="Foto kandidat"/> : <span>NP</span>}
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={updatePhoto}/><i>Ubah foto</i>
              </label>
              <div><small>PROFIL KANDIDAT</small><input className="candidate-name-input" name="name" value={profile.name} onChange={updateProfile}/><div className="candidate-role-row"><input name="role" value={profile.role} onChange={updateProfile}/><span>·</span><input name="location" value={profile.location} onChange={updateProfile}/></div></div>
            </div>
            <div className="candidate-profile-details editable">
              <label><small>ID Kandidat</small><input value="CAN-2026-0184" readOnly/></label>
              <label><small>Email</small><input name="email" type="email" value={profile.email} onChange={updateProfile}/></label>
              <label><small>No. HP</small><input name="phone" type="tel" value={profile.phone} onChange={updateProfile}/></label>
              <label><small>Pendidikan terakhir</small><input name="education" value={profile.education} onChange={updateProfile}/></label>
            </div>
            <div className="candidate-cv-upload">
              <div className="candidate-cv-icon">CV</div>
              <div><small>CURRICULUM VITAE</small><b>{cvFile ? cvFile.name : 'CV belum diunggah'}</b><p>{cvFile ? `${Math.max(1, Math.round(cvFile.size / 1024))} KB · Siap digunakan` : 'Format PDF, maksimal 5 MB'}</p></div>
              <label><input type="file" accept="application/pdf,.pdf" onChange={event => setCvFile(event.target.files?.[0] || null)}/>{cvFile ? 'Ganti CV' : 'Upload CV'}</label>
            </div>
            <div className="candidate-profile-save"><span>{profileSaved ? '✓ Perubahan profil tersimpan' : 'Pastikan data sudah benar sebelum disimpan.'}</span><button type="submit">Simpan Perubahan</button></div>
          </form>
        </section>
        <aside className="candidate-dashboard-side">
          <section className="candidate-panel disc-invitation biodata-invitation"><span>PROFIL KANDIDAT</span><h3>Form Biodata Pelamar</h3><p>Lengkapi data pribadi, pendidikan, pengalaman kerja, dan referensi untuk proses rekrutmen.</p><div><b>5 bagian</b><small>± 15 menit</small></div><button onClick={onOpenBiodata}>Isi Biodata →</button></section>
          <section className="candidate-panel disc-invitation"><span>ASSESSMENT TERSEDIA</span><h3>Tes Kepribadian DISC</h3><p>Kenali gaya kerja dan cara komunikasimu melalui 24 soal pilihan.</p><div><b>24 soal</b><small>± 15 menit</small></div><button onClick={onOpenDisc}>Mulai Tes DISC →</button></section>
          <section className="candidate-panel mdt-invitation"><span>ASSESSMENT TERSEDIA</span><h3>Tes MDT</h3><p>Pilih pernyataan yang paling menggambarkan dirimu melalui form assessment resmi.</p><div><b>Pilihan A/B</b><small>Google Forms</small></div><button onClick={onOpenMdt}>Mulai Tes MDT →</button></section>
          <section className="candidate-panel profile-card"><div className="profile-ring"><span>75%</span></div><h3>Lengkapi profilmu</h3><p>Profil lengkap meningkatkan peluangmu dilihat recruiter.</p><ul><li className="done">Data pribadi</li><li className="done">Riwayat pendidikan</li><li>Pengalaman kerja</li><li>Unggah CV terbaru</li></ul><button>Lengkapi Profil</button></section>
          <section className="candidate-panel interview-card"><span>JADWAL TERDEKAT</span><h3>Technical Interview</h3><p>Backend Engineer</p><div><b>07 Nov 2026</b><small>10:30 WIB · Online Meeting</small></div><button>Lihat Jadwal</button></section>
        </aside>
      </div>
    </main>
  </div>;
}
