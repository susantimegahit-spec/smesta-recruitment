import React, { useState } from 'react';
import SmestaLogo from '../../assets/images/smesta_text_transparent.png';

const steps = [
  ['pribadi', 'Data pribadi'],
  ['keluarga', 'Keluarga'],
  ['pendidikan', 'Pendidikan'],
  ['pengalaman', 'Pengalaman'],
  ['lainnya', 'Informasi lainnya']
];

const Field = ({ label, type = 'text', placeholder = '', wide = false, children }) => (
  <label className={wide ? 'biodata-field wide' : 'biodata-field'}>
    <span>{label}</span>
    {children || (type === 'textarea'
      ? <textarea rows="3" placeholder={placeholder}/>
      : <input type={type} placeholder={placeholder}/>)}
  </label>
);

const Select = ({ label, options, wide = false }) => (
  <Field label={label} wide={wide}>
    <select defaultValue=""><option value="" disabled>Pilih jawaban</option>{options.map(item => <option key={item}>{item}</option>)}</select>
  </Field>
);

const RepeatCard = ({ title, children, onRemove }) => <div className="biodata-repeat-card"><div className="biodata-repeat-head"><h3>{title}</h3>{onRemove && <button type="button" onClick={onRemove}>Hapus</button>}</div><div className="biodata-fields">{children}</div></div>;

export default function ApplicantBiodata({ onBack, onSubmit }) {
  const [step, setStep] = useState(0);
  const [formalEducation, setFormalEducation] = useState([1]);
  const [partners, setPartners] = useState([1]);
  const [families, setFamilies] = useState([1]);
  const [workExperiences, setWorkExperiences] = useState([1]);
  const addItem = setter => setter(items => [...items, (items.at(-1) || 0) + 1]);
  const removeItem = (setter, id) => setter(items => items.filter(item => item !== id));
  const active = steps[step][0];
  const next = () => setStep(current => Math.min(current + 1, steps.length - 1));
  const previous = () => setStep(current => Math.max(current - 1, 0));

  return <div className="biodata-page">
    <header className="biodata-header">
      <button onClick={onBack}>← Kembali ke dashboard</button>
      <div><img src={SmestaLogo} alt="SMESTA"/><span>CAREER</span></div>
      <small>Form Biodata Pelamar</small>
    </header>

    <main className="biodata-layout">
      <section className="biodata-form-card">
        <div className="biodata-title"><span>BIODATA PELAMAR</span><h1>Lengkapi informasi kandidat</h1><p>Pastikan data yang diberikan benar dan sesuai dokumen pendukung.</p></div>
        <div className="biodata-steps" role="tablist" aria-label="Tahapan pengisian biodata">{steps.map(([key, label], index) => <button type="button" role="tab" aria-selected={step === index} key={key} className={step === index ? 'active' : step > index ? 'done' : ''} onClick={() => setStep(index)}><i>{step > index ? '✓' : index + 1}</i><span>{label}</span></button>)}</div>

        <form onSubmit={event => event.preventDefault()}>
          {active === 'pribadi' && <section className="biodata-section">
            <header><span>A</span><div><h2>Data pribadi</h2><p>Identitas dan informasi kontak utama.</p></div></header>
            <div className="biodata-fields">
              <Field label="Posisi yang dilamar" placeholder="Contoh: Backend Engineer" wide/>
              <Field label="Nama lengkap" placeholder="Sesuai KTP"/><Field label="Nama panggilan"/>
              <Field label="Tempat lahir"/><Field label="Tanggal lahir" type="date"/>
              <Select label="Jenis kelamin" options={['Pria','Wanita']}/><Select label="Agama" options={['Islam','Kristen Protestan','Katolik','Hindu','Budha','Kong Hu Cu','Lainnya']}/>
              <Field label="Tinggi badan (cm)" type="number"/><Field label="Berat badan (kg)" type="number"/>
              <Field label="Golongan darah"/><Field label="Kewarganegaraan"/>
              <Field label="Alamat KTP" type="textarea" wide/><Field label="Alamat domisili" type="textarea" wide/>
              <Field label="Kota / kode pos"/><Field label="Provinsi"/><Field label="No. HP" type="tel"/><Field label="Email" type="email"/>
              <Field label="Nomor KTP"/><Field label="NPWP"/><Field label="SIM / Passport"/><Field label="Nomor dokumen"/>
              <Select label="Tempat tinggal saat ini" options={['Milik sendiri','Milik orang tua','Kontrak / sewa','Kost','Rumah perusahaan','Lainnya']}/>
              <Select label="Kendaraan" options={['Tidak ada','Mobil','Motor','Lainnya']}/>
              <Field label="Hobi / kegiatan waktu luang" type="textarea" wide/>
            </div>
          </section>}

          {active === 'keluarga' && <section className="biodata-section">
            <header><span>B</span><div><h2>Keluarga dan lingkungan</h2><p>Informasi pasangan, anak, orang tua, dan saudara.</p></div></header>
            <div className="biodata-fields"><Select label="Status perkawinan" options={['Belum menikah','Menikah','Cerai','Menikah kembali']}/><Field label="Tanggal menikah" type="date"/></div>
            {partners.map((id, index) => <RepeatCard key={id} title={`Pasangan / anak ${index + 1}`} onRemove={partners.length > 1 ? () => removeItem(setPartners, id) : null}><Select label="Hubungan" options={['Suami','Istri','Anak']}/><Field label="Nama lengkap"/><Field label="Usia" type="number"/><Field label="Pendidikan terakhir"/><Field label="Pekerjaan / jabatan"/><Field label="Perusahaan"/></RepeatCard>)}
            <button type="button" className="biodata-add" onClick={() => addItem(setPartners)}>+ Tambah pasangan / anak</button>
            {families.map((id, index) => <RepeatCard key={id} title={`Orang tua / saudara ${index + 1}`} onRemove={families.length > 1 ? () => removeItem(setFamilies, id) : null}><Select label="Hubungan" options={['Ayah','Ibu','Saudara']}/><Field label="Nama lengkap"/><Select label="Jenis kelamin" options={['Laki-laki','Perempuan']}/><Field label="Usia" type="number"/><Field label="Pendidikan terakhir"/><Field label="Pekerjaan / perusahaan"/></RepeatCard>)}
            <button type="button" className="biodata-add" onClick={() => addItem(setFamilies)}>+ Tambah orang tua / saudara</button>
          </section>}

          {active === 'pendidikan' && <section className="biodata-section">
            <header><span>D</span><div><h2>Riwayat pendidikan</h2><p>Pendidikan formal, pelatihan, bahasa, dan kemampuan komputer.</p></div></header>
            {formalEducation.map((id, index) => <RepeatCard key={id} title={`Pendidikan formal ${index + 1}`} onRemove={formalEducation.length > 1 ? () => removeItem(setFormalEducation, id) : null}><Select label="Tingkat" options={['SD','SMP','SMA / SMK','Akademi','Universitas','Pasca Sarjana']}/><Field label="Nama sekolah / kampus"/><Field label="Kota"/><Field label="Jurusan"/><Field label="Tahun masuk" type="number"/><Field label="Tahun selesai" type="number"/><Field label="Nilai / IPK"/><Field label="Gelar"/></RepeatCard>)}
            <button type="button" className="biodata-add" onClick={() => addItem(setFormalEducation)}>+ Tambah pendidikan formal</button>
            <div className="biodata-fields biodata-standalone-fields"><Field label="Judul skripsi / karya tulis terakhir" wide/><Field label="Alasan memilih jurusan tersebut" type="textarea" wide/></div>
            <RepeatCard title="Pendidikan nonformal"><Field label="Jenis kegiatan" placeholder="Kursus, seminar, lokakarya"/><Field label="Bidang / topik"/><Field label="Penyelenggara"/><Field label="Tahun" type="number"/><Field label="Lama kegiatan"/><Select label="Sertifikat" options={['Ada','Tidak ada']}/></RepeatCard>
            <Field label="Penghargaan / prestasi" type="textarea" wide/>
            <RepeatCard title="Kemampuan lainnya"><Field label="Bahasa dan tingkat penguasaan"/><Field label="Pengolahan kata"/><Field label="Pengolahan angka"/><Field label="Database / data"/><Field label="Aplikasi lainnya" wide/></RepeatCard>
          </section>}

          {active === 'pengalaman' && <section className="biodata-section">
            <header><span>F</span><div><h2>Pengalaman kerja dan organisasi</h2><p>Mulai dari pengalaman yang paling baru.</p></div></header>
            {workExperiences.map((id, index) => <RepeatCard key={id} title={`Pengalaman kerja ${index + 1}`} onRemove={workExperiences.length > 1 ? () => removeItem(setWorkExperiences, id) : null}><Field label="Nama perusahaan & jenis usaha"/><Field label="Jabatan"/><Field label="Tanggal masuk" type="month"/><Field label="Tanggal keluar" type="month"/><Field label="Nama atasan"/><Field label="Gaji terakhir"/><Field label="Alasan berhenti" type="textarea" wide/><Field label="Tugas dan tanggung jawab" type="textarea" wide/></RepeatCard>)}
            <button type="button" className="biodata-add" onClick={() => addItem(setWorkExperiences)}>+ Tambah pengalaman kerja</button>
            <RepeatCard title="Aktivitas organisasi / sosial"><Field label="Nama organisasi"/><Field label="Jenis kegiatan"/><Field label="Tahun masuk" type="number"/><Field label="Tahun keluar" type="number"/><Field label="Jabatan awal"/><Field label="Jabatan akhir"/></RepeatCard>
            <RepeatCard title="Riwayat sakit / kecelakaan"><Field label="Jenis"/><Field label="Tahun" type="number"/><Field label="Lama perawatan"/><Field label="Tempat opname"/><Field label="Dampak hingga sekarang" wide/></RepeatCard>
          </section>}

          {active === 'lainnya' && <section className="biodata-section">
            <header><span>J</span><div><h2>Informasi lainnya</h2><p>Pertanyaan umum, kesiapan kerja, dan referensi.</p></div></header>
            {[
              'Pernah melamar di grup perusahaan ini sebelumnya?', 'Sedang melamar ke perusahaan lain?', 'Memiliki pekerjaan sampingan?',
              'Pernah mengikuti psikotest?', 'Bersedia ditempatkan di luar kota?', 'Bersedia bekerja lembur?', 'Bersedia bekerja dalam sistem shift?'
            ].map(question => <div className="biodata-question" key={question}><b>{question}</b><select defaultValue=""><option value="" disabled>Pilih</option><option>Ya</option><option>Tidak</option></select><input placeholder="Tambahkan penjelasan (opsional)"/></div>)}
            <div className="biodata-fields">
              <Field label="Alasan tertarik melamar di perusahaan kami" type="textarea" wide/><Field label="Yang Anda ketahui tentang perusahaan" type="textarea" wide/>
              <Field label="Kekuatan diri" type="textarea"/><Field label="Hal yang masih perlu dikembangkan" type="textarea"/>
              <Field label="Pekerjaan yang Anda idamkan"/><Field label="Ekspektasi penghasilan"/><Field label="Fasilitas yang diharapkan"/><Field label="Kapan siap mulai bekerja?" type="date"/>
            </div>
            <RepeatCard title="Kontak darurat"><Field label="Nama"/><Field label="Hubungan"/><Field label="No. telepon" type="tel"/><Field label="Alamat" wide/></RepeatCard>
            <RepeatCard title="Referensi nonkeluarga"><Field label="Nama"/><Field label="Hubungan"/><Field label="No. telepon" type="tel"/><Field label="Pekerjaan"/></RepeatCard>
            <RepeatCard title="Kenalan yang bekerja di perusahaan / grup"><Field label="Nama"/><Field label="Hubungan"/><Field label="No. telepon" type="tel"/><Field label="Divisi / departemen"/></RepeatCard>
            <label className="biodata-declaration"><input type="checkbox"/> Saya menyatakan seluruh data yang diberikan benar dan dapat dipertanggungjawabkan.</label>
          </section>}

          <footer className="biodata-actions"><button type="button" className="secondary" onClick={step ? previous : onBack}>{step ? '← Sebelumnya' : 'Batal'}</button>{step < steps.length - 1 ? <button type="button" className="test-button" onClick={next}>Simpan & lanjutkan →</button> : <button type="button" className="test-button" onClick={onSubmit}>Kirim Biodata →</button>}</footer>
        </form>
      </section>
    </main>
  </div>;
}
