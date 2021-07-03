function hallo(message) {
  return message;
}

function tambahan(a, b) {
  return a + b;
}

const mahasiswi = {
  nama: "Feby",
  umur: "20",
  cetakMahasiswi() {
    return `Hallo nama saya ${this.nama} berumur ${this.umur} tahun`;
  },
};

class mahasiswa {
  // constructor adalah method yang otomatis di jalankan ketika class di instansiasi
  constructor() {
    console.log("Ini adalah class mahasiswa");
  }
}

// Export cara 1
// module.exports.hallo = hallo;
// module.exports.tambahan = tambahan;
// module.exports.mahasiswi = mahasiswi;
// module.exports.mahasiswa = mahasiswa;

// Export cara 2
// module.exports = {
//   hallo: hallo,
//   tambahan: tambahan,
//   mahasiswi: mahasiswi,
//   mahasiswa: mahasiswa,
// };

// Export cara 3
// jika nama property dan value sama lebih baik menggunakan cara ke 3 karena javascript otomatis langsung mengetahui jika nama properti dan valuenya sama.
module.exports = { hallo, tambahan, mahasiswi, mahasiswa };
