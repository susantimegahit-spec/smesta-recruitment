import React, { useEffect, useState } from 'react';
import SmestaLogo from '../../assets/images/smesta_text_transparent.png';
import AuthServices from '../../services/recruitment/AuthServices';
import { clearCandidateUserCookie, setCandidateUserCookie } from '../../utils/candidateSession';

const PasswordIcon = ({ visible }) => <svg viewBox="0 0 24 24" aria-hidden="true">
  {visible ? <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></> : <><path d="M3 3l18 18"/><path d="M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a16.6 16.6 0 0 1-2.1 2.8M6.4 6.4C3.9 8.1 2.5 12 2.5 12s3.5 6 9.5 6a9.8 9.8 0 0 0 3.1-.5M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>}
</svg>;

export default function CandidateAuth({ onClose, onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', passwordConfirmation: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });
  const isRegister = mode === 'register';

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose(); };
    document.body.classList.add('auth-modal-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.classList.remove('auth-modal-open'); window.removeEventListener('keydown', closeOnEscape); };
  }, [onClose]);

  useEffect(() => {
    if (!toast.message) return undefined;
    const toastTimer = setTimeout(() => setToast({ type: '', message: '' }), 4000);
    return () => clearTimeout(toastTimer);
  }, [toast]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setToast({ type: '', message: '' });
    setShowPassword(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (isRegister) {
      if (formData.password !== formData.passwordConfirmation) {
        setToast({ type: 'error', message: 'Konfirmasi kata sandi tidak sama.' });
        return;
      }

      setSubmitting(true);
      setToast({ type: '', message: '' });
      try {
        const response = await AuthServices.postRegister({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
          terms_agreed: true
        });
        setMode('login');
        setFormData((current) => ({ ...current, name: '', phone: '', password: '', passwordConfirmation: '' }));
        setToast({ type: 'success', message: response?.message || 'Registrasi berhasil. Silakan masuk menggunakan akun kandidat Anda.' });
      } catch (error) {
        setToast({ type: 'error', message: error.message || 'Registrasi gagal. Silakan coba kembali.' });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setSubmitting(true);
    setToast({ type: '', message: '' });
    try {
      const response = await AuthServices.postLogin({
        email: formData.email.trim(),
        password: formData.password
      });
      const token = response?.data?.token || response?.data?.access_token || response?.token || response?.access_token;
      if (!token) throw new Error('Token login tidak ditemukan pada respons server.');
      sessionStorage.setItem('smesta-candidate-token', token);
      const meResponse = await AuthServices.getMe(token);
      const candidateUser = meResponse?.data?.candidate || meResponse?.data?.user || meResponse?.candidate || meResponse?.user || meResponse?.data || meResponse;
      setCandidateUserCookie(candidateUser);
      setToast({ type: 'success', message: response?.message || 'Login berhasil. Selamat datang kembali.' });
      await new Promise((resolve) => setTimeout(resolve, 900));
      onAuthenticated(candidateUser);
    } catch (error) {
      sessionStorage.removeItem('smesta-candidate-token');
      clearCandidateUserCookie();
      setToast({ type: 'error', message: error.message || 'Login gagal. Periksa kembali email dan kata sandi.' });
      setSubmitting(false);
    }
  };

  return <div className="auth-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    {toast.message && <div className={`auth-toast ${toast.type}`} role="alert"><span>{toast.type === 'success' ? '✓' : '!'}</span><p>{toast.message}</p><button type="button" aria-label="Tutup notifikasi" onClick={() => setToast({ type: '', message: '' })}>×</button></div>}
    <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <button className="auth-modal-close" aria-label="Tutup" onClick={onClose}>×</button>
      <div className="auth-modal-side"><span>SMESTA CAREER</span><h2>Langkah baru untuk karier terbaikmu.</h2><p>Satu akun untuk menemukan posisi dan memantau seluruh proses lamaran.</p><div><b>✓ Mudah digunakan</b><b>✓ Proses transparan</b><b>✓ Data tersimpan aman</b></div></div>
      <div className="auth-modal-main">
        <div className="auth-logo"><img src={SmestaLogo} alt="SMESTA"/><span>CAREER</span></div>
        <div className="auth-tabs" role="tablist"><button type="button" className={!isRegister ? 'active' : ''} onClick={() => changeMode('login')}>Masuk</button><button type="button" className={isRegister ? 'active' : ''} onClick={() => changeMode('register')}>Daftar</button></div>
        <header><h2 id="auth-modal-title">{isRegister ? 'Buat akun kandidat' : 'Selamat datang kembali'}</h2><p>{isRegister ? 'Lengkapi data dasar untuk memulai perjalanan kariermu.' : 'Masuk untuk melanjutkan proses lamaranmu.'}</p></header>
        <form onSubmit={submit}>
          {isRegister && <div className="auth-field"><label>Nama lengkap</label><input required name="name" value={formData.name} onChange={updateField} placeholder="Contoh: Nadia Permata" autoComplete="name"/></div>}
          <div className="auth-field"><label>Email</label><input required name="email" value={formData.email} onChange={updateField} type="email" placeholder="nama@email.com" autoComplete="email"/></div>
          {isRegister && <div className="auth-field"><label>Nomor WhatsApp</label><input required name="phone" value={formData.phone} onChange={updateField} type="tel" placeholder="08xxxxxxxxxx" autoComplete="tel"/></div>}
          <div className="auth-field"><label>Kata sandi</label><div className="auth-password"><input required name="password" value={formData.password} onChange={updateField} minLength="6" type={showPassword ? 'text' : 'password'} placeholder="Minimal 6 karakter" autoComplete={isRegister ? 'new-password' : 'current-password'}/><button className="password-visibility" type="button" aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'} title={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'} onClick={() => setShowPassword(!showPassword)}><PasswordIcon visible={showPassword}/></button></div></div>
          {isRegister && <div className="auth-field"><label>Konfirmasi kata sandi</label><input required name="passwordConfirmation" value={formData.passwordConfirmation} onChange={updateField} minLength="6" type={showPassword ? 'text' : 'password'} placeholder="Ulangi kata sandi" autoComplete="new-password"/></div>}
          {isRegister ? <label className="auth-check"><input required type="checkbox"/> Saya menyetujui syarat penggunaan dan kebijakan privasi.</label> : <div className="auth-options"><label className="auth-check"><input type="checkbox"/> Ingat saya</label><button type="button">Lupa kata sandi?</button></div>}
          <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? (isRegister ? 'Mendaftarkan...' : 'Memproses...') : isRegister ? 'Buat Akun' : 'Masuk ke Akun'}</button>
        </form>
        <p className="auth-switch">{isRegister ? 'Sudah memiliki akun?' : 'Belum memiliki akun?'} <button type="button" onClick={() => changeMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Masuk sekarang' : 'Daftar gratis'}</button></p>
      </div>
    </section>
  </div>;
}
