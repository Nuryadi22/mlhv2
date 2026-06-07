export interface Account {
  id: string;
  name: string;
  username: string;
  password?: string;
}

export interface Application {
  id: string;
  name: string;
  link: string;
  accounts: Account[];
}

export interface Category {
  id: string;
  name: string;
  applications: Application[];
}

export const accountsData: Category[] = [
  {
    id: "emis",
    name: "EMIS",
    applications: [
      {
        id: "emis-4",
        name: "EMIS 4.0",
        link: "https://emis.kemenag.go.id/",
        accounts: [
          { id: "emis-4-1", name: "MI Cikembulan", username: "nsm.111232180052@gmail.com", password: "Abditam@22" },
          { id: "emis-4-2", name: "Kepala MI", username: "miscikembulan@gmail.com", password: "Dusunjapuh@123" },
          { id: "emis-4-3", name: "RA As-syifa", username: "nsm.101232180091@gmail.com", password: "Dusunjapuh1." },
          { id: "emis-4-4", name: "Kepala RA", username: "rukmini.fuad@gmail.com", password: "Dusunjapuh1." }
        ]
      },
      {
        id: "emis-gtk",
        name: "EMIS GTK",
        link: "https://emisgtk.kemenag.go.id/",
        accounts: [
          { id: "emis-gtk-1", name: "Admin/Kepala", username: "7052747650200023", password: "iipmiptah" },
          { id: "emis-gtk-2", name: "Nur Malihah", username: "0249767669210003", password: "nurmaazka" },
          { id: "emis-gtk-3", name: "Yuni Susanti", username: "1433767669210023", password: "yunisusanti" },
          { id: "emis-gtk-4", name: "Widayanti", username: "20212174184001", password: "widayanti" },
          { id: "emis-gtk-5", name: "Sifa Fauziah", username: "20212174192002", password: "sifa28" },
          { id: "emis-gtk-6", name: "Eka Mulkiatul", username: "20212174193002", password: "ekamulkiatul" },
          { id: "emis-gtk-7", name: "Nuryadi", username: "20212174199001", password: "22111999" },
          { id: "emis-gtk-8", name: "Enung Yuliawati", username: "5358753656300003", password: "mutiara" },
          { id: "emis-gtk-9", name: "Bayu Cristiyanto Nurrohman", username: "1840765667200012", password: "Panqerancrist" }
        ]
      },
      {
        id: "emis-dev",
        name: "EMIS DEV",
        link: "https://dev-emisgtk.kemenag.go.id/",
        accounts: [
          { id: "emis-dev-1", name: "Admin(SSO)", username: "nsm.111232180052@gmail.com", password: "Abditam@22" },
          { id: "emis-dev-2", name: "IIP MIPTAHUL MUNIR", username: "91000069120936", password: "281755" },
          { id: "emis-dev-3", name: "ENUNG YULIAWATI", username: "91000075113052", password: "545389" },
          { id: "emis-dev-4", name: "NUR MALIHAH", username: "91000089119446", password: "356328" },
          { id: "emis-dev-5", name: "YUNI SUSANTI", username: "91000089130562", password: "463394" },
          { id: "emis-dev-6", name: "BAYU CRISTIYANTO NURROHMAN", username: "20212257100003", password: "462514" },
          { id: "emis-dev-7", name: "Sifa Fauziah", username: "20212174192002", password: "942699" },
          { id: "emis-dev-8", name: "Eka Mulkiatul Hasanah", username: "20212174193002", password: "338783" },
          { id: "emis-dev-9", name: "WIDAYANTI", username: "20212174184001", password: "515672" },
          { id: "emis-dev-10", name: "NURYADI", username: "20212174199001", password: "391679" }
        ]
      }
    ]
  },
  {
    id: "verval",
    name: "VERVAL",
    applications: [
      {
        id: "sdm-pusdatin",
        name: "SDM PUSDATIN",
        link: "https://sdm.data.kemendikdasmen.go.id/",
        accounts: [
          { id: "sdm-pusdatin-1", name: "Admin", username: "mi.insancita@gmail.com", password: "Abditam@22" }
        ]
      },
      {
        id: "cek-nisn",
        name: "CEK NISN",
        link: "https://nisn.data.kemendikdasmen.go.id/",
        accounts: []
      },
      {
        id: "verval-pd",
        name: "VERVAL PD",
        link: "https://sso.data.kemendikdasmen.go.id/sys/login?appkey=348310F2-0262-4F5D-B7D1-41F92ECDCA93",
        accounts: [
          { id: "verval-pd-1", name: "Admin MI", username: "mi.insancita@gmail.com", password: "Abditam@22" },
          { id: "verval-pd-2", name: "Admin RA", username: "ra.assyifa.cikembulan@gmail.com", password: "Abditam@22" }
        ]
      },
      {
        id: "verval-ptk",
        name: "VERVAL PTK",
        link: "https://vervalptk.data.kemendikdasmen.go.id/",
        accounts: [
          { id: "verval-ptk-1", name: "Admin MI", username: "mi.insancita@gmail.com", password: "Abditam@22" }
        ]
      },
      {
        id: "verval-yayasan",
        name: "VERVAL YAYASAN",
        link: "https://vervalyayasan.data.kemendikdasmen.go.id/",
        accounts: [
          { id: "verval-yayasan-1", name: "Admin Yayasan", username: "", password: "" }
        ]
      }
    ]
  },
  {
    id: "ujian",
    name: "UJIAN",
    applications: [
      {
        id: "pdum",
        name: "PDUM",
        link: "https://pdum.kemenag.go.id/",
        accounts: [
          { id: "pdum-1", name: "Admin MI (SSO)", username: "nsm.111232180052@gmail.com", password: "Abditam@22" },
          { id: "pdum-2", name: "Admin RA (SSO)", username: "nsm.101232180091@gmail.com", password: "Dusunjapuh1." }
        ]
      },
      {
        id: "anbk",
        name: "ANBK",
        link: "https://pdum.kemenag.go.id/",
        accounts: [
          { id: "anbk-1", name: "ADMIN MI", username: "D02270421", password: "AN02270421*" }
        ]
      },
      {
        id: "dashboard-sulingjar",
        name: "Dashboard SULINGJAR",
        link: "https://dashboardslb.kemendikdasmen.go.id/login",
        accounts: [
          { id: "dash-sulingjar-1", name: "Admin MI (SSO)", username: "nsm.111232180052@gmail.com", password: "Abditam@22" },
          { id: "dash-sulingjar-2", name: "Admin RA (SSO)", username: "nsm.101232180091@gmail.com", password: "Dusunjapuh1." }
        ]
      },
      {
        id: "sulingjar",
        name: "SULINGJAR",
        link: "https://surveilingkunganbelajar.kemendikdasmen.go.id/",
        accounts: [
          { id: "sulingjar-1", name: "Guru", username: "ISI SESUAI KARTU", password: "" }
        ]
      },
      {
        id: "tka",
        name: "TKA",
        link: "https://tka.kemendikdasmen.go.id/",
        accounts: [
          { id: "tka-1", name: "Admin", username: "D02270421", password: "Abditam@22" }
        ]
      }
    ]
  },
  {
    id: "bos-bantuan",
    name: "BOS & BANTUAN",
    applications: [
      {
        id: "simsarpras",
        name: "SIMSARPRAS",
        link: "https://appmadrasah.kemenag.go.id/simsarpras/",
        accounts: [
          { id: "simsarpras-1", name: "Admin", username: "111232180052", password: "dusunjapuh" }
        ]
      },
      {
        id: "portal-bos",
        name: "PORTAL BOS",
        link: "https://bos.kemenag.go.id/",
        accounts: [
          { id: "portal-bos-1", name: "Admin (SSO)", username: "nsm.111232180052@gmail.com", password: "Abditam@22" }
        ]
      },
      {
        id: "pip-kemenag",
        name: "PIP KEMENAG",
        link: "https://pip.kemenag.go.id/login",
        accounts: []
      },
      {
        id: "pip-diknas",
        name: "PIP DIKNAS",
        link: "https://pip.kemendikdasmen.go.id/",
        accounts: []
      },
      {
        id: "edm",
        name: "EDM",
        link: "https://edm-fe.erkam-v2.kemenag.go.id/login",
        accounts: []
      },
      {
        id: "erkam",
        name: "ERKAM",
        link: "https://frontend.erkam-v2.kemenag.go.id/login",
        accounts: [
          { id: "erkam-1", name: "Operator", username: "3207222008970001", password: "201997Djatol" },
          { id: "erkam-2", name: "Kepala", username: "3207222007690003", password: "&1M2e628" }
        ]
      }
    ]
  },
  {
    id: "rapor-ijazah",
    name: "RAPOR & IJAZAH",
    applications: [
      {
        id: "portal-ijazah",
        name: "Portal Ijazah",
        link: "https://ijazah.pendidikan.go.id/",
        accounts: []
      },
      {
        id: "rapor-rdm",
        name: "Rapor RDM",
        link: "https://rapor.miscikembulan.sch.id/",
        accounts: [
          { id: "rapor-rdm-1", name: "Admin", username: "111232180052", password: "Cikembulan123" },
          { id: "rapor-rdm-2", name: "Bayu Cristiyanto Nurrohman", username: "1840765667200012", password: "17091989" },
          { id: "rapor-rdm-3", name: "Eka Mulkiatul Hasanah", username: "20212174193002", password: "23061993" },
          { id: "rapor-rdm-4", name: "Enung Yuliawati", username: "91000075113052", password: "26101975" },
          { id: "rapor-rdm-5", name: "Iip Miptahul Munir", username: "91000069120936", password: "20071969" },
          { id: "rapor-rdm-6", name: "Nur Malihah", username: "0249767669210003", password: "Nur120989" },
          { id: "rapor-rdm-7", name: "Sifa Fauziah", username: "3207186804920001", password: "Sf280492" },
          { id: "rapor-rdm-8", name: "Yuni Susanti", username: "91000089130562", password: "01111989" }
        ]
      },
      {
        id: "manajemen-ijazah",
        name: "Manajemen Ijazah",
        link: "https://ijazah.data.kemendikdasmen.go.id/manajemen/#/sign-in",
        accounts: [
          { id: "man-ijazah-1", name: "Admin MI (SSO)", username: "nsm.111232180052@gmail.com", password: "Abditam@22" }
        ]
      }
    ]
  },
  {
    id: "akreditasi",
    name: "AKREDITASI",
    applications: [
      {
        id: "ban-pdm",
        name: "BAN-PDM",
        link: "https://ban-pdm.id/",
        accounts: []
      },
      {
        id: "sispena",
        name: "SISPENA",
        link: "https://apps.ban-pdm.id/sispena3/login",
        accounts: [
          { id: "sispena-1", name: "Admin", username: "60708489", password: "60708489" }
        ]
      }
    ]
  },
  {
    id: "pengembangan-diri",
    name: "PENGEMBANGAN DIRI",
    applications: [
      {
        id: "omi",
        name: "OMI",
        link: "https://omi.kemenag.go.id/admin/login",
        accounts: [
          { id: "omi-1", name: "Admin", username: "mi.insancita@gmail.com", password: "Abditam@22" }
        ]
      },
      {
        id: "pintar-kemenag",
        name: "PINTAR KEMENAG",
        link: "https://pintar.kemenag.go.id/",
        accounts: []
      }
    ]
  },
  {
    id: "hiburan",
    name: "HIBURAN",
    applications: [
      {
        id: "facebook",
        name: "FACEBOOK",
        link: "https://www.facebook.com/share/1DuNktCgan/",
        accounts: [
          { id: "facebook-1", name: "Admin", username: "085862777511", password: "Insacit@2022" }
        ]
      },
      {
        id: "instagram",
        name: "INSTAGRAM",
        link: "https://www.instagram.com/",
        accounts: [
          { id: "instagram-1", name: "Admin (SSO FB)", username: "085862777511", password: "Insacit@2022" }
        ]
      },
      {
        id: "tiktok",
        name: "TIKTOK",
        link: "https://tiktok.com/@miscikembulan_official",
        accounts: [
          { id: "tiktok-1", name: "Admin (SSO FB)", username: "085862777511", password: "Insacit@2022" }
        ]
      },
      {
        id: "website-madrasah",
        name: "WEBSITE MADRASAH",
        link: "https://micikembulan.sch.id/",
        accounts: [
          { id: "web-madrasah-1", name: "Wordpress", username: "Admin", password: "Abditam@22" }
        ]
      },
      {
        id: "youtube",
        name: "YOUTUBE",
        link: "https://www.youtube.com/@miscikembulan_Official",
        accounts: [
          { id: "youtube-1", name: "Admin", username: "mi.cikembulan@gmail.com", password: "Abditam@22" }
        ]
      },
      {
        id: "rumah-web",
        name: "RUMAH WEB",
        link: "https://new.clientzone.rumahweb.com/",
        accounts: [
          { id: "rumah-web-1", name: "Admin", username: "mi.cikembulan@gmail.com", password: "Abditam@22" }
        ]
      },
      {
        id: "ayo-pramuka",
        name: "AYO PRAMUKA",
        link: "https://www.ayopramuka-kwarnas.id/",
        accounts: [
          { id: "ayo-pramuka-1", name: "Admin", username: "mi.insancita@gmail.com", password: "Abditam@22" }
        ]
      }
    ]
  },
  {
    id: "nuryadi",
    name: "Nuryadi",
    applications: [
      {
        id: "akun-nuryadi",
        name: "Akun Nuryadi",
        link: "",
        accounts: [
          {
            id: "akun-nuryadi-1",
            name: "Email 1",
            username: "wisnunuryadi5@gmail.com",
            password: "Perselak011"
          }
        ]
      }
    ]
  }
];
