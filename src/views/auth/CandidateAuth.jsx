import React, { useEffect, useState } from 'react';
import SmestaLogo from '../../../../distributor-channel/src/assets/images/smesta_text_transparent.png';

const PasswordIcon = ({ visible }) => <svg viewBox="0 0 24 24" aria-hidden="true">
  {visible ? <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></> : <><path d="M3 3l18 18"/><path d="M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a16.6 16.6 0 0 1-2.1 2.8M6.4 6.4C3.9 8.1 2.5 12 2.5 12s3.5 6 9.5 6a9.8 9.8 0 0 0 3.1-.5M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>}
</svg>;

export default function CandidateAuth({ onClose, onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const isRegister = mode === 'register';

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose(); };
    document.body.classList.add('auth-modal-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.classList.remove('auth-modal-open'); window.removeEventListener('keydown', closeOnEscape); };
  }, [onClose]);

  const submit = (event) => {
    event.preventDefault();
    if (isRegister) {
      window.alert('Registrasi berhasil. Silakan masuk menggunakan akun kandidat Anda.');
      setMode('login');
      return;
    }
    onAuthenticated();
  };

  return <div className="auth-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <button className="auth-modal-close" aria-label="Tutup" onClick={onClose}>×</button>
      <div className="auth-modal-side"><span>SMESTA CAREER</span><h2>Langkah baru untuk karier terbaikmu.</h2><p>Satu akun untuk menemukan posisi dan memantau seluruh proses lamaran.</p><div><b>✓ Mudah digunakan</b><b>✓ Proses transparan</b><b>✓ Data tersimpan aman</b></div></div>
      <div className="auth-modal-main">
        <div className="auth-logo"><img src={SmestaLogo} alt="SMESTA"/><span>CAREER</span></div>
        <div className="auth-tabs" role="tablist"><button className={!isRegister ? 'active' : ''} onClick={() => setMode('login')}>Masuk</button><button className={isRegister ? 'active' : ''} onClick={() => setMode('register')}>Daftar</button></div>
        <header><h2 id="auth-modal-title">{isRegister ? 'Buat akun kandidat' : 'Selamat datang kembali'}</h2><p>{isRegister ? 'Lengkapi data dasar untuk memulai perjalanan kariermu.' : 'Masuk untuk melanjutkan proses lamaranmu.'}</p></header>
        <form onSubmit={submit}>
          {isRegister && <div className="auth-field"><label>Nama lengkap</label><input required placeholder="Contoh: Nadia Permata" autoComplete="name"/></div>}
          <div className="auth-field"><label>Email</label><input required type="email" placeholder="nama@email.com" autoComplete="email"/></div>
          {isRegister && <div className="auth-field"><label>Nomor WhatsApp</label><input required type="tel" placeholder="08xxxxxxxxxx" autoComplete="tel"/></div>}
          <div className="auth-field"><label>Kata sandi</label><div className="auth-password"><input required minLength="6" type={showPassword ? 'text' : 'password'} placeholder="Minimal 6 karakter" autoComplete={isRegister ? 'new-password' : 'current-password'}/><button className="password-visibility" type="button" aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'} title={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'} onClick={() => setShowPassword(!showPassword)}><PasswordIcon visible={showPassword}/></button></div></div>
          {isRegister ? <label className="auth-check"><input required type="checkbox"/> Saya menyetujui syarat penggunaan dan kebijakan privasi.</label> : <div className="auth-options"><label className="auth-check"><input type="checkbox"/> Ingat saya</label><button type="button">Lupa kata sandi?</button></div>}
          <button className="auth-submit" type="submit">{isRegister ? 'Buat Akun' : 'Masuk ke Akun'}</button>
        </form>
        <p className="auth-switch">{isRegister ? 'Sudah memiliki akun?' : 'Belum memiliki akun?'} <button onClick={() => setMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Masuk sekarang' : 'Daftar gratis'}</button></p>
      </div>
    </section>
  </div>;
}
