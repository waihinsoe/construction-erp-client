import type { Service } from "@/types/content";
export const services: Service[] = [
  {
    id: "residential",
    slug: "residential",
    title: {
      en: "Residential construction",
      ja: "住宅建設",
      my: "လူနေအိမ်ရာ ဆောက်လုပ်ခြင်း",
    },
    description: {
      en: "Considered homes, built around the way you live. From quiet retreats to connected communities, every detail has a purpose.",
      ja: "暮らしに寄り添う住まい。静かな住宅から地域とつながる集合住宅まで、細部に意味のある設計を行います。",
      my: "သင့်နေထိုင်မှုပုံစံကို အခြေပြု၍ စဉ်းစားတည်ဆောက်ထားသော အိမ်များ။ အေးချမ်းသည့် အိမ်ရာမှ အချင်းချင်း ဆက်နွယ်သည့် အသိုက်အဝန်းအထိ အသေးစိတ်တိုင်းတွင် ရည်ရွယ်ချက်ရှိသည်။",
    },
    image: "/images/house.jpg",
    icon: "home",
  },
  {
    id: "commercial",
    slug: "commercial",
    title: {
      en: "Commercial development",
      ja: "商業施設開発",
      my: "စီးပွားရေးအဆောက်အအုံ ဖွံ့ဖြိုးတိုးတက်ရေး",
    },
    description: {
      en: "Distinctive workplaces and welcoming destinations that give businesses room to grow.",
      ja: "企業の成長を支える個性的なオフィスと、人々が集う商業空間をつくります。",
      my: "စီးပွားရေးလုပ်ငန်းများ တိုးတက်နိုင်ရန် ထူးခြားသည့် အလုပ်ခွင်နှင့် လူများကို ကြိုဆိုသော နေရာများ ဖန်တီးပေးသည်။",
    },
    image: "/images/tower.jpg",
    icon: "building",
  },
  {
    id: "industrial",
    slug: "industrial",
    title: {
      en: "Industrial construction",
      ja: "産業施設建設",
      my: "စက်မှုအဆောက်အအုံ ဆောက်လုပ်ခြင်း",
    },
    description: {
      en: "Practical, resilient facilities designed for efficient operations and long-term adaptability.",
      ja: "効率的な運営と将来の変化に対応する、実用性と耐久性を備えた施設を設計します。",
      my: "ထိရောက်စွာ လည်ပတ်နိုင်ပြီး ရေရှည်ပြောင်းလဲမှုနှင့် လိုက်လျောညီထွေဖြစ်စေရန် လက်တွေ့ကျ၍ ခံနိုင်ရည်ရှိသော အဆောက်အအုံများ ဒီဇိုင်းရေးဆွဲသည်။",
    },
    image: "/images/construction.jpg",
    icon: "factory",
  },
  {
    id: "renovation",
    slug: "renovation",
    title: {
      en: "Renovation & restoration",
      ja: "改修・修復",
      my: "ပြုပြင်မွမ်းမံခြင်းနှင့် ပြန်လည်ထိန်းသိမ်းခြင်း",
    },
    description: {
      en: "A new chapter for existing spaces. We balance original character with contemporary performance.",
      ja: "既存の空間に新しい可能性を。建物の個性を守りながら、現代の性能を取り入れます。",
      my: "ရှိပြီးသား နေရာများအတွက် အခန်းသစ်တစ်ခု။ မူလစရိုက်လက္ခဏာနှင့် ခေတ်မီစွမ်းဆောင်ရည်ကို မျှတစွာ ပေါင်းစပ်သည်။",
    },
    image: "/images/interior.jpg",
    icon: "ruler",
  },
  {
    id: "architecture",
    slug: "architecture",
    title: {
      en: "Architecture & management",
      ja: "建築設計・プロジェクト管理",
      my: "ဗိသုကာနှင့် စီမံခန့်ခွဲမှု",
    },
    description: {
      en: "One connected vision, from the first sketch to the final handover. Clear planning at every stage.",
      ja: "最初のスケッチから引き渡しまで、一貫したビジョンと明確な計画で進めます。",
      my: "ပထမဆုံးပုံကြမ်းမှ နောက်ဆုံးလွှဲပြောင်းမှုအထိ တစ်ဆက်တည်းသော အမြင်ဖြင့် အဆင့်တိုင်းကို ရှင်းလင်းစွာ စီစဉ်သည်။",
    },
    image: "/images/building.jpg",
    icon: "compass",
  },
];
