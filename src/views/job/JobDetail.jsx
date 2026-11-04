import React from 'react';
import Icon from '../../components/Icon';
import SmestaLogo from '../../../../distributor-channel/src/assets/images/smesta_text_transparent.png';

const detailByDepartment = {
  Technology: {
    summary: 'Bergabung dengan tim Technology untuk membangun solusi digital yang andal, aman, dan memberikan dampak langsung bagi proses bisnis perusahaan.',
    responsibilities: ['Mengembangkan dan memelihara aplikasi sesuai kebutuhan bisnis.', 'Berkolaborasi dengan product, design, dan quality assurance.', 'Menulis kode yang bersih, terdokumentasi, serta mudah diuji.', 'Melakukan analisis dan perbaikan terhadap kendala teknis.'],
    qualifications: ['Pendidikan minimal S1 Teknik Informatika atau bidang terkait.', 'Memiliki pengalaman relevan minimal 1 tahun.', 'Memahami Git, API, database, dan praktik pengembangan modern.', 'Mampu bekerja secara mandiri maupun dalam tim.']
  },
  Product: {
    summary: 'Bantu kami menciptakan pengalaman produk yang sederhana, konsisten, dan benar-benar membantu kebutuhan pengguna.',
    responsibilities: ['Menerjemahkan kebutuhan pengguna menjadi solusi desain.', 'Membuat user flow, wireframe, dan prototype.', 'Berkolaborasi dengan product manager dan engineer.', 'Menjaga konsistensi design system perusahaan.'],
    qualifications: ['Memiliki portofolio UI/UX atau product design.', 'Menguasai Figma dan proses design thinking.', 'Mampu menjelaskan keputusan desain dengan baik.', 'Teliti, terbuka terhadap feedback, dan berorientasi pengguna.']
  },
  default: {
    summary: 'Kami mencari talenta yang antusias, bertanggung jawab, dan siap berkembang bersama tim SMESTA.',
    responsibilities: ['Menjalankan pekerjaan sesuai target dan prosedur perusahaan.', 'Berkolaborasi dengan tim serta stakeholder terkait.', 'Menyusun laporan dan dokumentasi pekerjaan.', 'Berpartisipasi dalam perbaikan proses secara berkelanjutan.'],
    qualifications: ['Pendidikan minimal S1 atau sederajat.', 'Memiliki kemampuan komunikasi yang baik.', 'Teliti, proaktif, dan memiliki semangat belajar.', 'Mampu menggunakan aplikasi perkantoran.']
  }
};

export default function JobDetail({ job, onBack, onLogin, isLoggedIn }) {
  const detail = detailByDepartment[job.department] || detailByDepartment.default;
  const apply = () => {
    if (!isLoggedIn) {
      onLogin();
      return;
    }
    window.alert(`Lamaran untuk posisi ${job.title} berhasil dimulai sebagai demo.`);
  };

  return <div className="job-detail-page">
    <header className="job-detail-header"><button onClick={onBack}>← Kembali ke lowongan</button><div className="job-detail-header-actions"><div className="job-detail-logo"><img src={SmestaLogo} alt="SMESTA"/><span>CAREER</span></div>{!isLoggedIn && <button onClick={onLogin}>Masuk Kandidat</button>}{isLoggedIn && <span className="candidate-signed-in">✓ Kandidat masuk</span>}</div></header>
    <main className="job-detail-main">
      <section className="job-detail-hero">
        <div className="job-detail-icon"><Icon name="briefcase" size={28}/></div>
        <div className="job-detail-title"><span>{job.department}</span><h1>{job.title}</h1><div><b>⌖ {job.location}</b><b>◷ {job.employment}</b><b>♙ {job.vacancies} posisi</b></div></div>
        <button onClick={apply}>Lamar Posisi Ini</button>
      </section>
      <div className="job-detail-layout">
        <article className="job-detail-content">
          <section><h2>Tentang posisi ini</h2><p>{detail.summary}</p></section>
          <section><h2>Tanggung jawab</h2><ul>{detail.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h2>Kualifikasi</h2><ul>{detail.qualifications.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h2>Apa yang kami tawarkan</h2><div className="job-benefits"><span>▣ Lingkungan kolaboratif</span><span>↗ Pengembangan karier</span><span>♡ Asuransi kesehatan</span><span>◷ Work-life balance</span></div></section>
        </article>
        <aside className="job-detail-sidebar">
          <div><h3>Ringkasan lowongan</h3><dl><dt>ID Lowongan</dt><dd>{job.id}</dd><dt>Departemen</dt><dd>{job.department}</dd><dt>Lokasi</dt><dd>{job.location}</dd><dt>Tipe pekerjaan</dt><dd>{job.employment}</dd><dt>Batas lamaran</dt><dd>{job.date}</dd></dl></div>
          <div className="job-detail-note"><b>Perlu diketahui</b><p>Seluruh proses rekrutmen PT Susanti Megah tidak dipungut biaya dalam bentuk apa pun.</p></div>
          <button onClick={apply}>Lamar Sekarang</button>
        </aside>
      </div>
    </main>
  </div>;
}
