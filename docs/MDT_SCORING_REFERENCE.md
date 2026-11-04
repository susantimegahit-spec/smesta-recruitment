# Acuan Penilaian Tes MDT

Dokumen ini diturunkan dari workbook **Psikotest MDT (Jawaban)-2.xlsx**, khususnya sheet `Form Responses 1` dan `Skoring`. Dokumen ini hanya memuat struktur tes dan aturan penilaian; data identitas maupun jawaban peserta tidak disalin.

## Struktur tes

- Jumlah soal: **90**.
- Setiap soal memiliki dua pernyataan: **A** dan **B**.
- Peserta wajib memilih tepat satu jawaban pada setiap soal.
- Hasil terdiri dari **20 dimensi**, masing-masing berskala **0–9**.
- Setiap dimensi dihitung dari sembilan pasangan nomor soal dan pilihan yang bernilai `1`.
- Skor dimensi adalah jumlah seluruh kecocokan jawaban pada pemetaan dimensi tersebut.

```text
score(dimension) = sum(answer[question] === keyedChoice ? 1 : 0)
```

## Validasi jawaban

Sebelum melakukan penilaian:

1. Pastikan tersedia tepat 90 jawaban.
2. Setiap jawaban hanya boleh bernilai `A` atau `B`.
3. Pastikan seluruh skor dimensi berada pada rentang 0–9.
4. Hitung checksum `TA` dan `TB`; keduanya harus bernilai **45**.

```text
TA = G + L + I + T + V + S + D + C + E + R
TB = N + A + P + X + B + O + Z + K + W + F
```

Jika `TA !== 45` atau `TB !== 45`, hasil harus dianggap tidak valid dan tidak boleh ditampilkan sebagai hasil final.

## Nama dimensi

Nama berikut dipakai sebagai label yang mudah dipahami pada aplikasi. Kode huruf tetap menjadi identifier utama agar konsisten dengan workbook.

| Kode | Label aplikasi |
|---|---|
| N | Ketekunan menyelesaikan tugas |
| G | Intensitas kerja |
| A | Dorongan berprestasi |
| L | Peran kepemimpinan |
| P | Kebutuhan mengendalikan orang lain |
| I | Kemudahan mengambil keputusan |
| T | Tempo kerja mental |
| V | Energi dan aktivitas fisik |
| X | Kebutuhan untuk diperhatikan |
| S | Perluasan sosial |
| B | Kebutuhan menjadi bagian kelompok |
| O | Kebutuhan kedekatan personal |
| R | Orientasi teoretis dan penalaran |
| D | Minat pada detail |
| C | Keteraturan dan organisasi |
| Z | Kebutuhan akan perubahan |
| E | Pengendalian emosi |
| K | Ketegasan dan agresivitas kerja |
| F | Dukungan terhadap otoritas |
| W | Kebutuhan akan aturan dan pengarahan |

## Kunci skoring

Notasi `2B` berarti dimensi memperoleh satu poin jika jawaban soal nomor 2 adalah `B`.

| Kode | Jawaban yang bernilai 1 |
|---|---|
| N | 2B, 13B, 24B, 35B, 46B, 57B, 68B, 79B, 90B |
| G | 1A, 11A, 21A, 31A, 41A, 51A, 61A, 71A, 81A |
| A | 2A, 3B, 14B, 25B, 36B, 47B, 58B, 69B, 80B |
| L | 12A, 22A, 32A, 42A, 52A, 62A, 72A, 82A, 81B |
| P | 13A, 3A, 4B, 15B, 26B, 37B, 48B, 59B, 70B |
| I | 23A, 33A, 43A, 53A, 63A, 73A, 83A, 82B, 71B |
| T | 34A, 44A, 54A, 64A, 74A, 84A, 83B, 72B, 61B |
| V | 45A, 55A, 65A, 75A, 85A, 84B, 73B, 62B, 51B |
| X | 24A, 14A, 4A, 5B, 16B, 27B, 38B, 49B, 60B |
| S | 56A, 66A, 76A, 86A, 85B, 74B, 63B, 52B, 41B |
| B | 35A, 25A, 15A, 5A, 6B, 17B, 28B, 39B, 50B |
| O | 46A, 36A, 26A, 16A, 6A, 7B, 18B, 29B, 40B |
| R | 67A, 77A, 87A, 86B, 75B, 64B, 53B, 42B, 31B |
| D | 78A, 88A, 87B, 76B, 65B, 54B, 43B, 32B, 21B |
| C | 89A, 88B, 77B, 66B, 55B, 44B, 33B, 22B, 11B |
| Z | 57A, 47A, 37A, 27A, 17A, 7A, 8B, 19B, 30B |
| E | 89B, 78B, 67B, 56B, 45B, 34B, 23B, 12B, 1B |
| K | 68A, 58A, 48A, 38A, 28A, 18A, 8A, 9B, 20B |
| F | 79A, 69A, 59A, 49A, 39A, 29A, 19A, 9A, 10B |
| W | 90A, 80A, 70A, 60A, 50A, 40A, 30A, 20A, 10A |

## Aturan interpretasi

### N — Ketekunan menyelesaikan tugas

| Skor | Interpretasi |
|---|---|
| 0–3 | Cenderung ragu-ragu, menunda, atau menghindari situasi pengambilan keputusan. |
| 4 | Berhati-hati dan cenderung ragu-ragu. |
| 5–6 | Cukup bertanggung jawab terhadap pekerjaan. |
| 7–9 | Ketekunan dan tanggung jawab terhadap tugas tinggi. |

### G — Intensitas kerja

| Skor | Interpretasi |
|---|---|
| 0–4 | Bekerja cenderung untuk mengejar kesenangan, bukan untuk memberikan hasil yang baik. |
| 5–9 | Kemauan bekerja keras tinggi. |

### A — Dorongan berprestasi

| Skor | Interpretasi |
|---|---|
| 0–5 | Tujuan kurang pasti; dapat cepat merasa puas sehingga tidak melanjutkan usaha untuk sukses. |
| 6–9 | Tujuan terdefinisi jelas, kebutuhan sukses tinggi, dan ambisi pribadi tinggi. |

### L — Peran kepemimpinan

| Skor | Interpretasi |
|---|---|
| 0–4 | Cenderung tidak suka aktif menggunakan orang lain dalam bekerja. |
| 5–9 | Memproyeksikan diri sebagai pemimpin dan menggunakan pengaruh untuk mencapai tujuan. Polanya dapat bersifat persuasif, demokratis, atau otoriter. |

### P — Kebutuhan mengendalikan orang lain

| Skor | Interpretasi |
|---|---|
| 0–4 | Keinginan bertanggung jawab terhadap pekerjaan dan tindakan orang lain cenderung rendah. |
| 5–9 | Memiliki kebutuhan menerima tanggung jawab atas orang lain dan menjadi penanggung jawab. |

### I — Kemudahan mengambil keputusan

| Skor | Interpretasi |
|---|---|
| 0–3 | Ragu-ragu, menunda, atau menolak situasi pengambilan keputusan. |
| 4 | Berhati-hati hingga ragu-ragu dalam membuat keputusan. |
| 5–7 | Cukup mudah dan lancar, tetapi tetap berhati-hati dalam membuat keputusan. |
| 8–9 | Tidak ragu-ragu dalam proses pengambilan keputusan. |

### T — Tempo kerja mental

| Skor | Interpretasi |
|---|---|
| 0–3 | Cenderung melakukan sesuatu menurut kemauan sendiri. |
| 4–9 | Tergolong aktif secara internal dan mental. |

### V — Energi dan aktivitas fisik

| Skor | Interpretasi |
|---|---|
| 0–4 | Keaktifan rendah dan cenderung pasif. |
| 5–9 | Keaktifan fisik cukup baik dan cenderung sportif. |

### X — Kebutuhan untuk diperhatikan

| Skor | Interpretasi |
|---|---|
| 0–1 | Cenderung pemalu dan suka menyendiri. |
| 2–3 | Rendah hati dan tulus. |
| 4–5 | Memiliki pola pribadi yang khusus dan nyata. |
| 6–9 | Membutuhkan perhatian yang nyata. |

### S — Perluasan sosial

| Skor | Interpretasi |
|---|---|
| 0–5 | Penilaian terhadap hubungan sosial rendah dan cenderung kurang percaya pada orang lain. |
| 6–9 | Kepercayaan dalam hubungan sosial tinggi dan menyukai interaksi sosial. |

### B — Kebutuhan menjadi bagian kelompok

| Skor | Interpretasi |
|---|---|
| 0–3 | Selektif dan secara umum melepaskan diri dari kelompok. |
| 4–5 | Membutuhkan penerimaan dan pengakuan, tetapi tidak terlalu mudah dipengaruhi kelompok. |
| 6–9 | Kebutuhan disukai dan diakui tinggi serta mudah dipengaruhi kelompok. |

### O — Kebutuhan kedekatan personal

| Skor | Interpretasi |
|---|---|
| 0–2 | Tidak menyukai hubungan antarpribadi atau interaksi perseorangan. |
| 3–4 | Menyadari kebutuhan antarpribadi, tetapi dapat melepaskan diri dan tidak terlalu bergantung. |
| 5–9 | Ketergantungan terhadap pengakuan dan penerimaan diri sangat besar. |

### R — Orientasi teoretis dan penalaran

| Skor | Interpretasi |
|---|---|
| 0–4 | Perhatian praktis cenderung kurang. |
| 5–9 | Penekanan pada nilai-nilai penalaran tergolong tinggi. |

### D — Minat pada detail

| Skor | Interpretasi |
|---|---|
| 0–3 | Menyadari kebutuhan kecermatan, tetapi kurang berminat menangani detail. |
| 4–9 | Minat menangani hal-hal detail tergolong tinggi. |

### C — Keteraturan dan organisasi

| Skor | Interpretasi |
|---|---|
| 0–2 | Fleksibel hingga kurang teratur. |
| 3–5 | Teratur tetapi tetap fleksibel. |
| 6–9 | Keteraturan sangat tinggi dan dapat cenderung kaku. |

### Z — Kebutuhan akan perubahan

| Skor | Interpretasi |
|---|---|
| 8–9 | Tidak menyukai atau menolak perubahan; cenderung menggunakan pendekatan tradisional. |
| 7 | Tidak menyukai perubahan yang dipaksakan. |
| 5–6 | Mudah menyesuaikan diri. |
| 3–4 | Selektif dalam membuat perubahan dan berpikir jauh ke depan. |
| 0–2 | Mudah gelisah atau frustrasi karena perubahan dirasakan tidak cukup cepat. |

### E — Pengendalian emosi

| Skor | Interpretasi |
|---|---|
| 0–1 | Terbuka, cepat bereaksi, dan kurang menekankan pengendalian diri. |
| 2–3 | Terbuka. |
| 4–6 | Pendekatan emosional seimbang dan mampu mengendalikan perasaan. |
| 7–9 | Sangat menekankan pengendalian diri; dapat digunakan sebagai mekanisme pertahanan. |

### K — Ketegasan dan agresivitas kerja

| Skor | Interpretasi |
|---|---|
| 8–9 | Cenderung menghindari masalah atau menolak mengenali sesuatu sebagai masalah. |
| 6–7 | Menyukai lingkungan tenang, menghindari konflik, dan cenderung menunda masalah. |
| 5 | Kukuh pendirian dan cenderung keras kepala. |
| 3–4 | Agresi pribadi terkait pekerjaan, dorongan, dan semangat bersaing. |
| 0–2 | Agresif dan cenderung defensif. |

### F — Dukungan terhadap otoritas

| Skor | Interpretasi |
|---|---|
| 0–1 | Cenderung mementingkan diri dan berpotensi memberontak. |
| 2–3 | Mengurus kepentingan diri sendiri. |
| 4–5 | Setia terhadap perusahaan. |
| 6–9 | Setia dan membantu secara personal; motivasinya dapat bersifat politis. |

### W — Kebutuhan akan aturan dan pengarahan

| Skor | Interpretasi |
|---|---|
| 0–3 | Berorientasi pada tujuan dan mandiri. |
| 4–5 | Membutuhkan pengarahan serta harapan yang dirumuskan dengan jelas. |
| 6–9 | Orientasi tugas meningkat dan membutuhkan instruksi yang jelas. |

## Bentuk data yang direkomendasikan

Jawaban:

```json
{
  "1": "A",
  "2": "B",
  "3": "A"
}
```

Hasil penilaian:

```json
{
  "valid": true,
  "checksums": { "TA": 45, "TB": 45 },
  "dimensions": {
    "N": { "score": 6, "interpretation": "Cukup bertanggung jawab terhadap pekerjaan." },
    "G": { "score": 7, "interpretation": "Kemauan bekerja keras tinggi." }
  }
}
```

## Catatan implementasi

- Simpan kunci penilaian di modul terpisah dari komponen UI.
- Jangan mengubah teks interpretasi berdasarkan asumsi tanpa persetujuan HR/Psikolog yang berwenang.
- Hasil MDT merupakan bahan pertimbangan dan tidak boleh menjadi satu-satunya dasar keputusan rekrutmen.
- Batasi akses hasil rinci hanya untuk pihak yang berwenang karena hasil termasuk data evaluasi kandidat.
- Workbook menggunakan label dimensi huruf. Label deskriptif pada dokumen ini ditambahkan untuk keterbacaan aplikasi; kode huruf tetap menjadi sumber identitas dimensi.
