import React, { useMemo, useState } from 'react';
import { discQuestions } from '../../data/discQuestions';
import SmestaLogo from '../../../../distributor-channel/src/assets/images/smesta_text_transparent.png';

export default function DiscAssessment({ onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState(false);
  const question = discQuestions[step];
  const current = answers[question.number] || { p: null, k: null };
  const answered = useMemo(() => Object.values(answers).filter((answer) => answer.p && answer.k).length, [answers]);
  const remaining = discQuestions.length - answered;

  const choose = (type, choice) => {
    setAnswers((previous) => {
      const existing = previous[question.number] || { p: null, k: null };
      const next = { ...existing, [type]: choice };
      if (type === 'p' && next.k === choice) next.k = null;
      if (type === 'k' && next.p === choice) next.p = null;
      return { ...previous, [question.number]: next };
    });
  };

  const next = () => {
    if (!current.p || !current.k) return;
    if (step === discQuestions.length - 1) setReview(true);
    else setStep(step + 1);
  };

  if (review) return <div className="disc-page"><DiscHeader onBack={onBack}/><main className="disc-review"><span>LANGKAH TERAKHIR</span><h1>Periksa jawabanmu</h1><p>Pastikan seluruh soal sudah terisi sebelum mengirim jawaban.</p><div className="disc-review-summary"><b>{answered}</b><span>dari 24 soal terjawab</span><i style={{width:`${answered / 24 * 100}%`}}/></div><div className="disc-review-grid">{discQuestions.map((item) => { const value=answers[item.number]; return <button key={item.number} className={value?.p&&value?.k?'complete':''} onClick={()=>{setStep(item.number-1);setReview(false)}}><b>{item.number}</b><span>{value?.p&&value?.k?'Lengkap':'Belum lengkap'}</span></button>})}</div><div className="disc-review-actions"><button onClick={()=>setReview(false)}>Kembali mengisi</button><button disabled={answered!==24} onClick={onComplete}>Kirim Jawaban</button></div></main></div>;

  return <div className="disc-page"><DiscHeader onBack={onBack}/><main className="disc-main"><div className="disc-progress"><div><span>TES KEPRIBADIAN DISC</span><b>Soal {question.number} dari 24</b></div><div><i style={{width:`${answered / 24 * 100}%`}}/></div><small>{Math.round(answered / 24 * 100)}%</small></div><section className="disc-navigator"><header><div><b>Navigasi Soal</b><span>{remaining ? `${remaining} soal belum dikerjakan` : 'Semua soal sudah lengkap'}</span></div><div className="disc-nav-legend"><span><i className="complete"/> Lengkap</span><span><i/> Belum</span></div></header><div>{discQuestions.map((item) => { const value=answers[item.number]; const complete=value?.p&&value?.k; return <button key={item.number} className={`${complete?'complete':'incomplete'} ${item.number===question.number?'active':''}`} onClick={()=>setStep(item.number-1)} aria-label={`Buka soal ${item.number}, ${complete?'lengkap':'belum lengkap'}`}>{item.number}</button>})}</div></section><section className="disc-question-card"><header><span>{String(question.number).padStart(2,'0')}</span><div><h1>Pilih pernyataan yang paling sesuai</h1><p>Pilih satu untuk <b>Paling menggambarkan</b> dan satu untuk <b>Kurang menggambarkan</b>.</p></div></header><div className="disc-choice-head"><span>Pernyataan</span><b title="Paling menggambarkan">P</b><b title="Kurang menggambarkan">K</b></div>{question.statements.map((statement,index)=>{const choice=index+1;return <div className="disc-statement" key={statement}><label htmlFor={`q${question.number}-p${choice}`}><span>{String.fromCharCode(65+index)}</span>{statement}</label><input id={`q${question.number}-p${choice}`} type="radio" name={`p-${question.number}`} checked={current.p===choice} onChange={()=>choose('p',choice)} aria-label={`${statement}, paling menggambarkan`}/><input id={`q${question.number}-k${choice}`} type="radio" name={`k-${question.number}`} checked={current.k===choice} onChange={()=>choose('k',choice)} aria-label={`${statement}, kurang menggambarkan`}/></div>})}<div className="disc-legend"><span><b>P</b> Paling menggambarkan diri saya</span><span><b>K</b> Kurang menggambarkan diri saya</span></div></section><div className="disc-actions"><button disabled={step===0} onClick={()=>setStep(step-1)}>← Sebelumnya</button><span>{!current.p||!current.k?'Pilih P dan K untuk melanjutkan':'Jawaban tersimpan otomatis'}</span><button disabled={!current.p||!current.k} onClick={next}>{step===23?'Review Jawaban':'Selanjutnya →'}</button></div></main></div>;
}

function DiscHeader({ onBack }) { return <header className="disc-header"><button onClick={onBack}>← Kembali ke dashboard</button><div><img src={SmestaLogo} alt="SMESTA"/><span>ASSESSMENT</span></div><small>Jawaban tersimpan otomatis</small></header>; }
