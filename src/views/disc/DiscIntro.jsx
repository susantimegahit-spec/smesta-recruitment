import React, { useState } from 'react';
import SmestaLogo from '../../assets/images/smesta_text_transparent.png';

export default function DiscIntro({ onBack, onStart }) {
  const [ready, setReady] = useState(false);
  return <div className="disc-intro-page">
    <header className="disc-header"><button onClick={onBack}>← Kembali ke dashboard</button><div><img src={SmestaLogo} alt="SMESTA"/><span>ASSESSMENT</span></div><small>DISC Personality Assessment</small></header>
    <main className="disc-intro-main">
      <section className="disc-intro-hero"><span>ASSESSMENT KANDIDAT</span><h1>Tes Kepribadian DISC</h1><p>Tes ini membantu kami memahami kecenderungan gaya kerja, komunikasi, dan cara kamu merespons situasi.</p><div className="disc-intro-meta"><div><b>24</b><span>Jumlah soal</span></div><div><b>± 15 menit</b><span>Estimasi waktu</span></div><div><b>2 pilihan</b><span>Setiap soal</span></div></div></section>
      <section className="disc-intro-card">
        <div className="disc-intro-title"><span>i</span><div><h2>Sebelum kamu mulai</h2><p>Baca petunjuk berikut agar pengisian berjalan dengan benar.</p></div></div>
        <ol className="disc-instructions">
          <li><b>01</b><div><strong>Baca empat pernyataan</strong><p>Setiap soal berisi empat pernyataan tentang sikap atau kebiasaan.</p></div></li>
          <li><b>02</b><div><strong>Pilih satu pernyataan P</strong><p>P adalah pernyataan yang <em>paling menggambarkan</em> dirimu.</p></div></li>
          <li><b>03</b><div><strong>Pilih satu pernyataan K</strong><p>K adalah pernyataan yang <em>kurang menggambarkan</em> dirimu.</p></div></li>
          <li><b>04</b><div><strong>P dan K harus berbeda</strong><p>Satu pernyataan tidak dapat dipilih sebagai P dan K sekaligus.</p></div></li>
        </ol>
        <div className="disc-intro-reminder"><span>✦</span><p><b>Jawablah secara spontan dan jujur.</b> Tidak ada jawaban benar atau salah. Pilih yang paling sesuai dengan dirimu saat ini.</p></div>
        <label className="disc-intro-check"><input type="checkbox" checked={ready} onChange={(event) => setReady(event.target.checked)}/> Saya telah membaca dan memahami petunjuk pengisian.</label>
        <div className="disc-intro-actions"><button onClick={onBack}>Nanti Saja</button><button disabled={!ready} onClick={onStart}>Mulai Tes DISC →</button></div>
      </section>
      <small className="disc-intro-note">Pastikan koneksi internet stabil dan kamu memiliki waktu yang cukup sebelum memulai.</small>
    </main>
  </div>;
}
