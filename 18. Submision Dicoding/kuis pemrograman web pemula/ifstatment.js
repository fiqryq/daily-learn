/**
 * Buatlah logika if untuk mengevaluasi nilai score dengan ketentuan:
 *  1. Jika nilai score lebih atau sama dengan 90
 *      - Isi variabel result dengan nilai: 'Selamat! Anda mendapatkan nilai A.'
 *  2. Jika nilai score ada di antara 80 hingga 89
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai B.'
 *  3. Jika nilai score ada di antara 70 hingga 79
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai C.'
 *  4. Jika nilai score ada di antara 60 hingga 69:
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai D.'
 *  5. Jika nilai score di bawah 60:
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai E.'
 *
 *
 *  Note: - Mohon untuk tidak menghapus kode yang sudah ada sebelumnya.
 *        - Anda tidak perlu membuat variabel result dan score secara manual.
 *          Gunakan variabel yang sudah disediakan.
 *
 */

function scoreChecker(score) {
  let result;

  // TODO
  if (score >= 90) {
    result = "Selamat! Anda mendapatkan nilai A.";
  } else if (score >= 80 || score < 90) {
    result = "Selamat! Anda mendapatkan nilai B.";
  } else if (score >= 70 || score < 80) {
    result = "Selamat! Anda mendapatkan nilai C.";
  } else if (score >= 60 || score < 70) {
    result = "Selamat! Anda mendapatkan nilai D.";
  } else if (score < 60) {
    result = "Selamat! Anda mendapatkan nilai E.";
  }
  // Jangan hapus kode ini
  return result;
}

console.log(scoreChecker(80));
console.log(scoreChecker(81));
console.log(scoreChecker(82));
console.log(scoreChecker(83));
console.log(scoreChecker(84));
console.log(scoreChecker(85));
console.log(scoreChecker(86));
console.log(scoreChecker(87));
console.log(scoreChecker(88));
console.log(scoreChecker(89));
console.log(scoreChecker(90));

/**
 * Hiraukan kode di bawah ini
 */
module.exports = scoreChecker;
