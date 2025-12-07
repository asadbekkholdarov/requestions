const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema(
  {
    xudud_nomi: String, // 1
    tuman_nomi: String, // 2
    mahalla_nomi: String, // 3
    kocha_nomi: String, // 4

    uy_raqami: String, // 5.1
    korpus_raqami: String, // 5.2
    xonadon_raqami: String, // 5.3

    yashaydi: {
      // 6
      type: String,
      enum: ['xa', 'yoq'],
    },

    yashamaydi_sababi: {
      // if yoq
      type: String,
      enum: ['bosh', 'mavsumiy', 'turar-joy emas', ''],
      default: '',
    },

    odam_soni: Number, // 7
    yer_maydoni: String, // 8  (8.6 sotix etc)
    qishloq_x: String,
    yirik_shoxli_mollar: Number, // 9
    qoy_echki_soni: Number, // 10
    parranda_soni: Number, // 11
    mevali_daraxtlar: Number, // 12
    manzarali_daraxtlar: Number, // 13
  },
  { timestamps: true }
);

module.exports = mongoose.model('FormData', FormDataSchema);
