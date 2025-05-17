import { BsCartCheckFill, BsCartFill } from "react-icons/bs";
import {
  FaUser,
  FaUserEdit,
  FaProductHunt,
  FaShoppingCart,
} from "react-icons/fa";

export const header = {
  fa: {
    logoTitle: "پانوتک",

    center: {
      home: "خانه",
      technology: "فناوری",
      shop: "فروشگاه",
      blog: "بلاگ",
      gallery: "گالری",
      about: "درباره ما",
      contact: "تماس با ما",
    },
    left: {
      logIn: "ورود",
      register: "عضویت",
      logOut: "خروج",
      userAccount: "حساب کاربری",
      adminPanel: "پنل مدیریت",
      emptyCart: "سبد خرید شما خالیست",
      qty: "تعداد",
      price: "قیمت",
      totalPrice: "قیمت کل",
      totalCartPrice: "قیمت کل سبد خرید",
      cart: "سبد خرید",
      search: "جستجو",
    },
  },

  en: {
    logoTitle: "Panotech",

    center: {
      home: "Home",
      technology: "Technology",
      shop: "Shop",
      blog: "Blogs",
      gallery: "Gallery",
      about: "About Us",
      contact: "Contact Us",
    },
    left: {
      logIn: "Log In",
      register: "Register",
      logOut: "Log Out",
      userAccount: "User Account",
      adminPanel: "Admin Panel",
      emptyCart: "Your Cart is Empty",
      qty: "qty",
      price: "Price",
      totalPrice: "Total Price",
      totalCartPrice: "Total Cart Price",
      cart: "Cart",
      search: "Search",
    },
  },

  ar: {
    logoTitle: "پانوتک",

    center: {
      home: "الصفحة الرئيسية",
      technology: "تكنولوجيا",
      shop: "محل",
      blog: "مدونات",
      gallery: "رواق",
      about: "معلومات عنا",
      contact: "اتصل بنا",
    },
    left: {
      logIn: "دخول",
      register: "التسجيل",
      logOut: "تسجيل الخروج",
      userAccount: "حساب المستخدم",
      adminPanel: "لوحة الإدارة",
      emptyCart: "سلة التسوق الخاصة بك فارغة",
      qty: "كمية",
      price: "سعر",
      totalPrice: "السعر الاجمالي",
      totalCartPrice: "السعر الإجمالي لعربة التسوق",
      cart: "عربة التسوق",
      search: "يبحث",
    },
  },
};

export const footer = {
  socialLinks: {
    email: {
      link: "info@parsbiotech.ir",
      tooltip: "info@parsbiotech.ir",
    },
    linkedin: {
      link: "https://www.linkedin.com/company/nanozistpolymerpars",
      tooltip: "nanozistpolymerpars",
    },
    whatsapp: {
      link: "https://wa.me/989929469332",
      tooltip: "+989929469332",
    },
    telegram: {
      link: "https://telegram.me/panotech1",
      tooltip: "@Panotech1",
    },
    instagram: {
      link: "https://instagram.com/panotech",
      tooltip: "@Panotech",
    },
  },
  fa: {
    right: {
      address:
        "تهران، بلوار کشاورز، نبش کوی 16 آذر، پلاک 78، طبقه پنجم، واحد 502",
      phoneNumber: "021-28428415",
      fax: "021-28428415 داخلی 2",
      email: "info@parsbiotech.ir",
    },
    center: {
      body: [
        "نسل نوین نانو کامپوزیت‌های سلولز باکتریایی",
        "با بهترین کیفیت و بیشترین میزان تولید در جهان​",
      ],
    },
    left: {
      links: [
        {
          id: 1,
          title: "پانوتک",
          path: "http://panotech.ir",
          innerLink: false,
        },
        // { id: 2, title: "های می", path: "#", innerLink: false },
        { id: 3, title: "سؤالات متداول", path: "faqs", innerLink: true },
      ],
    },
  },

  en: {
    right: {
      address:
        "unit 502, 5th floor, No.78, 16 Azar alley, Keshavarz Boulevard, Tehran, Iran",
      phoneNumber: "+982128428415",
      fax: "+982128428415-2",
      email: "info@parsbiotech.ir",
    },
    center: {
      body: [
        `New generation of bacterial cellulose nanocomposites`,
        `With the best quality and the largest production in the world`,
      ],
    },
    left: {
      links: [
        {
          id: 1,
          title: "PanoTech",
          path: "http://panotech.ir",
        },
        { id: 2, title: "HiMe", path: "#" },
        { id: 3, title: "FAQs", path: "faqs" },
      ],
    },
  },

  ar: {
    right: {
      address:
        "رقم 78، الطابق الخامس، الوحدة 502، زاوية 16 آزار، جادة كيشاورز، طهران",
      phoneNumber: "982128428415+",
      fax: "982128428415-2+",
      email: "info@parsbiotech.ir",
    },
    center: {
      body: [
        `جيل جديد من المركبات النانوية السليلوزية البكتيرية`,
        `بأفضل جودة وأكبر كمية إنتاج في العالم​`,
      ],
    },
    left: {
      links: [
        {
          id: 1,
          title: "پانوتک",
          path: "http://panotech.ir",
          innerLink: false,
        },
        { id: 2, title: "های می", path: "#", innerLink: false },
        { id: 3, title: "الأسئلة المتداولة", path: "faqs", innerLink: true },
      ],
    },
  },
};

export const mainLayout = {
  fa: {
    defaultTitle: "شرکت پانوتک",
    templateTitle: "پانوتک",
  },

  en: {
    defaultTitle: "Panotech Company",
    templateTitle: "Panotech",
  },

  ar: {
    defaultTitle: "شركة پانوتک",
    templateTitle: "پانوتک",
  },
};

export const home = {
  fa: {
    companyIntroduction: {
      title: `معرفی شرکت`,
      body: `شرکت پانوتک در حوزه تولید محصولات درمان زخم و مراقبت از پوست با تکیه بر تولید نانو الیاف سلولز باکتریایی فعالیت می‌کند. این شرکت توانست در سال 98 دانش بنیان شود و پس از با موفقیت سپری کردن تمامی تست‌های اداره کل تجهیزات پزشکی سازمان غذا و دارو و دریافت ایزو 13485، در سال 1403 موفق به اخذ مجوز شد. این فناوری برای اولین بار در ایران تجاری‌سازی شده است. سبد محصولات این شرکت حاوی انواع پانسمان‌های زخم، ژل‌های ترمیم زخم، محلول‌های شست و شوی زخم، بندآورنده‌های خون و سایر لوازم درمان زخم، همچنین انواع ماسک‌های زیبایی صورت و سرم‌های پوستی می‌باشد.`,
    },

    // technology: {
    //   img: technologyIntroduction,
    //   title: "فناوری نانو الیاف سلولز باکتریایی",
    //   body: `نانو زیست کامپوزیت‌های سلولزی کاربردهای فراوانی در حوزه‌های مختلف دارند. توانایی تولید این محصولات به صورت کامل در شرکت پانوتک وجود دارد. از این نانو کامپوزیت‌ها در امور تحقیقاتی و برخی پروژه‌ها می‌توان استفاده کرد. تولید فیلم‌های سلولز باکتریایی در ابعاد مختلف در کنار تولید این فیلم‌ها با نانو ذرات و مواد مختلف یکی از ویژگی‌های محصولات تولیدی این شرکت است. باکتری‌های ما می‌توانند معجزه کنند. آن‌ها با روش تولید اختصاصی شرکت پانوتک بیشترین بازدهی تولید را در حداقل زمان خواهند داشت. نانو الیاف سلولزی تولیدی با قطر کمتر از 40 نانومتر خواص بسیار شگفت‌انگیزی را ایجاد می‌کنند. این خواص باعث کاربرد این نانو الیاف در حوزه‌های مختلف می‌شود.`,
    // },

    metaData: {
      title: "صفحه اصلی",
      description:
        "شرکت پانوتک، تولیدکننده محصولات سلولزی در ابعاد و ضخامت‌های متنوع",
      owner: "شرکت پانوتک",
      creator: "سید محمد مهدی هاشمی",
      keywords: [
        "تولیدکننده محصولات آرایشی بهداشتی",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },

    readMore: "مطالعه بیشتر",
  },

  en: {
    companyIntroduction: {
      title: `Company Introduction`,
      body: `Panotech Company operates in the field of wound treatment and skin care products, relying on the production of bacterial cellulose nanofibers. The company was able to become a knowledge-based company in 2019 and, after successfully passing all the tests of the Medical Devices Directorate of the Food and Drug Administration and receiving ISO 13485, it was able to obtain a license in 2014. This technology has been commercialized for the first time in Iran. The company's product portfolio includes various wound dressings, wound healing gels, wound washing solutions, blood stoppers and other wound treatment supplies, as well as various types of facial beauty masks and skin serums.`,
    },

    // technology: {
    //   img: technologyIntroduction,
    //   title: "Bacterial Cellulose Nanofiber Technology",
    //   body: `Cellulose nano-biocomposites have many applications in different fields. The ability to produce these products in full is available at Nano Biopolymer Pars Company. These nano-composites can be used in research and some projects. The production of bacterial cellulose films in different dimensions, along with the production of these films with different nanoparticles and materials, is one of the features of the products produced by this company. Our bacteria can work miracles. With the exclusive production method of Nano Biopolymer Pars Company, they will have the highest production efficiency in the shortest time. Cellulose nano-fibers produced with a diameter of less than 40 nanometers create very amazing properties. These properties make these nano-fibers useful in different fields.`,
    // },

    metaData: {
      title: "home page",
      description:
        "Panotech Company, manufacturer of cellulose products in various dimensions and thicknesses",
      owner: "Panotech Company",
      creator: "seyed mohammad mahdi hashemi",
      keywords: [
        "Cosmetics manufacturer",
        "Manufacturer of wound treatment products",
        "Cellulose products manufacturer",
      ],
    },

    readMore: "Read more",
  },

  ar: {
    companyIntroduction: {
      title: `مقدمة الشركة`,
      body: `شركة نانو زيست بوليمر بارس تعمل في مجال معالجة الجروح ومنتجات العناية بالبشرة، وتعتمد على إنتاج ألياف السليلوز البكتيرية النانوية. تمكنت هذه الشركة من التحول إلى شركة معرفية في عام 2019، وبعد اجتيازها بنجاح جميع اختبارات مديرية الأجهزة الطبية في هيئة الغذاء والدواء وحصولها على شهادة الأيزو 13485، نجحت في الحصول على الترخيص في عام 2014. تم تسويق هذه التكنولوجيا لأول مرة في إيران. تشمل مجموعة منتجات الشركة مجموعة متنوعة من ضمادات الجروح، ومواد هلامية لشفاء الجروح، ومحاليل غسل الجروح، ومميعات الدم، ومستلزمات علاج الجروح الأخرى، بالإضافة إلى مجموعة متنوعة من أقنعة تجميل الوجه ومصل البشرة.`,
    },

    // technology: {
    //   img: technologyIntroduction,
    //   title: "تكنولوجيا ألياف السليلوز البكتيرية النانوية",
    //   body: `تتمتع المركبات الحيوية النانوية السليلوزية بالعديد من التطبيقات في مختلف المجالات. القدرة على إنتاج هذه المنتجات بالكامل متاحة في شركة نانو زيست بوليمر بارس. يمكن استخدام هذه المركبات النانوية في الأبحاث وبعض المشاريع. ومن مميزات منتجات هذه الشركة إنتاج أفلام السليلوز البكتيرية بأبعاد مختلفة، إلى جانب إنتاج هذه الأفلام بالجسيمات النانوية والمواد المختلفة. يمكن لبكتيريا أجسامنا أن تصنع المعجزات. بفضل طريقة الإنتاج الحصرية لشركة پانوتک، سوف يتم تحقيق أعلى كفاءة إنتاجية في أقصر وقت. تنتج ألياف السليلوز النانوية التي يبلغ قطرها أقل من 40 نانومتر خصائص مذهلة للغاية. وتسمح هذه الخصائص باستخدام هذه الألياف النانوية في مجالات مختلفة.`,
    // },

    metaData: {
      title: "الصفحة الرئيسية",
      description:
        "شركة پانوتک، منتجة منتجات السليلوز بمختلف الأحجام والسماكات",
      owner: "شركة پانوتک",
      creator: "سید محمد مهدی هاشمی",
      keywords: [
        "تولیدکننده محصولات آرایشی بهداشتی",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },

    readMore: "اقرأ المزيد",
  },
};

export const technology = {
  fa: {
    metaData: {
      title: "فناوری",
      description:
        "فناوری و نوآوری پانوتک در تولید محصولات سلولزی و پانسمان زخم",
      keywords: [
        "تولیدکننده محصولات آرایشی بهداشتی",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    contents: [
      {
        id: 1,
        title: "فناوری",
        body: `نانو زیست کامپوزیت‌های سلولزی کاربردهای فراوانی در حوزه‌های مختلف دارند. توانایی تولید این محصولات به صورت کامل در شرکت پانوتک وجود دارد. از این نانو کامپوزیت‌ها در امور تحقیقاتی و برخی پروژه‌ها می‌توان استفاده کرد. تولید فیلم‌های سلولز باکتریایی در ابعاد مختلف در کنار تولید این فیلم‌ها با نانو ذرات و مواد مختلف یکی از ویژگی‌های محصولات تولیدی این شرکت است. باکتری‌های ما می‌توانند معجزه کنند. آن‌ها با روش تولید اختصاصی شرکت پانوتک بیشترین بازدهی تولید را در حداقل زمان خواهند داشت. نانو الیاف سلولزی تولیدی با قطر کمتر از 40 نانومتر خواص بسیار شگفت‌انگیزی را ایجاد می‌کنند. این خواص باعث کاربرد این نانو الیاف در حوزه‌های مختلف می‌شود`,
        bg: `bg-[url("/images/productsPage/productsBg01.webp")]`,
        side: "flex-row",
        // color: "primary",
      },
      {
        id: 2,
        title: "تمایز ما",
        body: `اعضای شرکت با توجه به داشتن سال‌ها تجربه کار بر روی تولید و سنتز نانو سلولز باکتریایی پتانسیل و توانایی بسیار بالایی برای تولید محصولات مختلف نانو کامپوزیت سلولز باکتریایی برای کاربردهای گوناگون دارند. 5 دلیل برتری محصولات ما نسبت به رقبا را می‌توان موارد زیر دانست: 1- داشتن تیم قوی و پر انرژی 2- بیشترین نرخ تولید در جهان 3- بهینه‌سازی فرآیند تولید به صورت تکرارپذیر 4- کم‌هزینه‌ترین و پر‌بازده‌ترین فرآیند تولید در جهان 5- توانایی تولید انواع مشتقات نانو سلولز باکتریایی با کیفیت بالا`,
        bg: `bg-[url("/images/productsPage/productsBg01.webp")]`,
        side: "flex-row-reverse",
        // color: "primary",
      },
    ],
    sectionTitle: "سبد محصولات",
  },
  en: {
    metaData: {
      title: "Technology",
      description:
        "Technology and innovation of Panotech in the production of cellulose products and wound dressings",
      keywords: [
        "Cosmetics manufacturer",
        "Manufacturer of wound treatment products",
        "Cellulose products manufacturer",
      ],
    },
    contents: [
      {
        id: 1,
        title: "Technology",
        body: `Cellulose nano-biocomposites have many applications in different fields. The ability to produce these products in full is available at Nano Biopolymer Pars Company. These nano-composites can be used in research and some projects. The production of bacterial cellulose films in different dimensions, along with the production of these films with different nanoparticles and materials, is one of the features of the products produced by this company. Our bacteria can work miracles. With the exclusive production method of Nano Biopolymer Pars Company, they will have the highest production efficiency in the shortest time. Cellulose nano-fibers produced with a diameter of less than 40 nanometers create very amazing properties. These properties make these nano-fibers useful in different fields.`,
        bg: `bg-[url("/images/productsPage/productsBg01.webp")]`,
        side: "flex-row",
        // color: "primary",
      },
      {
        id: 2,
        title: "Our distinction",
        body: `With years of experience in the production and synthesis of bacterial nanocellulose, the company's members have a very high potential and ability to produce various bacterial cellulose nanocomposite products for various applications. The 5 reasons why our products are superior to our competitors are as follows: 1- Having a strong and energetic team 2- The highest production rate in the world 3- Optimized production process in a repeatable manner 4- The least expensive and most efficient production process in the world 5- Ability to produce a variety of high-quality bacterial nanocellulose derivatives`,
        bg: `bg-[url("/images/productsPage/productsBg01.webp")]`,
        side: "flex-row-reverse",
      },
    ],
    sectionTitle: "Products Categories",
  },
  ar: {
    metaData: {
      title: "تكنولوجيا",
      description:
        "تكنولوجيا وابتكار پانوتک في إنتاج المنتجات السليولوزية وضمادات الجروح",
      keywords: [
        "تولیدکننده محصولات آرایشی بهداشتی",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    contents: [
      {
        id: 1,
        title: "تكنولوجيا",
        body: `تتمتع المركبات الحيوية النانوية السليلوزية بالعديد من التطبيقات في مختلف المجالات. القدرة على إنتاج هذه المنتجات بالكامل متاحة في شركة نانو زيست بوليمر بارس. يمكن استخدام هذه المركبات النانوية في الأبحاث وبعض المشاريع. ومن مميزات منتجات هذه الشركة إنتاج أفلام السليلوز البكتيرية بأبعاد مختلفة، إلى جانب إنتاج هذه الأفلام بالجسيمات النانوية والمواد المختلفة. يمكن لبكتيريا أجسامنا أن تصنع المعجزات. بفضل طريقة الإنتاج الحصرية لشركة پانوتک، سوف يتم تحقيق أعلى كفاءة إنتاجية في أقصر وقت. تنتج ألياف السليلوز النانوية التي يبلغ قطرها أقل من 40 نانومتر خصائص مذهلة للغاية. وتسمح هذه الخصائص باستخدام هذه الألياف النانوية في مجالات مختلفة`,
        bg: `bg-[url("/images/productsPage/productsBg01.webp")]`,
        side: "flex-row",
      },
      {
        id: 2,
        title: "تميزنا",
        body: `بفضل سنوات الخبرة في العمل على إنتاج وتوليف النانوسليلوز البكتيري، يتمتع أعضاء الشركة بإمكانيات وقدرة كبيرة على إنتاج منتجات نانوية مركبة من السليلوز البكتيري لمختلف التطبيقات. الأسباب الخمسة التي تجعل منتجاتنا متفوقة على منافسينا هي: 1- وجود فريق قوي وحيوي 2- أعلى معدل إنتاج في العالم 3- عملية إنتاج مُحسّنة بطريقة قابلة للتكرار 4- أقل عملية إنتاج تكلفة وأكثرها كفاءة في العالم العالم 5- القدرة على الإنتاج مشتقات نانوسليلوز بكتيرية عالية الجودة متنوعة`,
        bg: `bg-[url("/images/productsPage/productsBg01.webp")]`,
        side: "flex-row-reverse",
      },
    ],
    sectionTitle: "سلة من المنتجات",
  },
};

export const shop = {
  fa: {
    metaData: {
      title: "فروشگاه",
      description:
        "خرید محصولات سلولزی با کیفیت بالا در ابعاد و ضخامت‌های مختلف و یا با ابعاد مورد نظر شما",
      keywords: [
        "تولیدکننده محصولات آرایشی بهداشتی",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "محصولات مرتبط با",
    },

    sectionTitle: {
      readyProducts: "محصولات آماده",
      customProduct: "محصول سفارشی",
      similarProducts: "محصولات مشابه",
    },

    customProductForm: {
      title: "فرم درخواست محصول سفارشی",
      firstName: "نام",
      lastName: "نام خانوادگی",
      email: "ایمیل",
      mobile: "شماره همراه",
      job: "شغل",
      postalCode: "کد پستی",
      message: "پیام",
      address: "آدرس کامل",
      files: {
        title: "ارسال عکس یا فایل",
        formats: "فرمت‌های قابل قبول: jpg , jpeg , png , pdf",
        note: "لطفاً قبل از ارسال فایل، ایمیل و captcha را کامل کنید",
        btn: "ارسال فایل",
      },
      uploadErr: "آپلود با مشکل مواجه شد",
      fileUploadErr: "آپلود فایل با مشکل مواجه شد",
      fileUploadSuccess: "آپلود فایل با موفقیت انجام شد",
      imgUploadErr: "آپلود عکس با مشکل مواجه شد",
      imgUploadSuccess: "آپلود عکس با موفقیت انجام شد",
      submitBtn: "ارسال",
      cancelBtn: "انصراف",
      submitErr: "ارسال درخواست با مشکل مواجه شد",
      submitSuccess: "درخواست با موفقیت ارسال شد",
    },
    noProducts: "محصولی برای نمایش وجود ندارد",

    customProductApi: {
      subject: "پانوتک | درخواست محصول سفارشی",
      dearUser: "عزیز",
      hello: "با سلام و احترام",
      orderCode: "کد سفارش",
      submitText:
        "سفارش شما با موفقیت ثبت شد. همکاران ما در حال بررسی سفارش شما هستند. نتیجه از طریق ایمیل به شما اطلاع رسانی خواهد شد",
      inProgress:
        "همکاران ما در حال آماده‌سازی سفارش شما هستند. نتیجه از طریق ایمیل به شما اطلاع رسانی خواهد شد.",
      completed: "سفارش شما آماده شده است و به زودی به دست شما خواهد رسید.",
      rejected:
        "متأسفانه سفارش شما رد شد. شما می‌توانید برای دریافت علت با شماره 02128428415 تماس بگیرید",
      thanks: "با تشکر",
      companyName: "پانوتک",
    },

    singleProduct: {
      customProductNote: [
        "برای سفارش بیشتر از 30 عدد، لطفاً از",
        "فرم درخواست محصول سفارشی",
        "استفاده نمایید.",
      ],
      price: "قیمت",
      tabs: {
        fullDescription: "توضیحات محصول",
        userGuide: "راهنمای استفاده",
        uses: "موارد استفاده",
        files: "کاتالوگ",
      },
      metaData: "قیمت و خرید",
    },

    cartBtns: "افزودن به سبد خرید",
  },

  en: {
    metaData: {
      title: "Shop",
      description:
        "Purchase high-quality cellulose products in various sizes and thicknesses or in your desired dimensions.",
      keywords: [],
      related: "Products Related to",
    },

    sectionTitle: {
      readyProducts: "Ready-made Products",
      customProduct: "Customized Product",
      similarProducts: "Similar Products",
    },

    customProductForm: {
      title: "Custom product request form",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      mobile: "Mobile Number",
      job: "Job",
      postalCode: "Postal Code",
      message: "Message",
      address: "Full Address",
      files: {
        title: "Send a Photo or File",
        formats: "Acceptable Formats: jpg, jpeg, png, pdf",
        note: "Please complete the email and captcha before submitting the file.",
        btn: "Send File",
      },
      uploadErr: "There was a problem uploading.",
      fileUploadErr: "There was a problem uploading the file.",
      fileUploadSuccess: "File upload completed successfully.",
      imgUploadErr: "There was a problem uploading the file.",
      imgUploadSuccess: "Image upload completed successfully.",
      submitBtn: "Submit",
      cancelBtn: "Cancel",
      submitErr: "There was a problem sending the request.",
      submitSuccess: "Request sent successfully.",
    },

    noProducts: "There are no products",

    customProductApi: {
      subject: "Panotech | Customizes product request",
      dearUser: "Dear",
      hello: "Greetings and respect",
      orderCode: "Order Code",
      submitText:
        "Your order has been successfully placed. Our colleagues are reviewing your order. You will be notified of the result via email",
      inProgress:
        "Our colleagues are preparing your order. You will be notified of the result via email.",
      completed: "Your order is ready and will be delivered to you soon.",
      rejected:
        "Unfortunately, your order was rejected. You can call +982128428415 to get the reason.",
      thanks: "Thanks",
      companyName: "Panotech",
    },

    singleProduct: {
      customProductNote: [
        "To order more than 30 pieces, please use",
        "the custom product request form.",
        "",
      ],
      price: "Price",
      tabs: {
        fullDescription: "Description",
        userGuide: "User Guide",
        uses: "Uses",
        files: "Catalog",
      },
      metaData: "Price and Purchase",
    },

    cartBtns: "Add to Cart",
  },

  ar: {
    metaData: {
      title: "محل",
      description:
        "شراء منتجات السليلوز عالية الجودة بأبعاد وسماكات مختلفة أو بالأبعاد التي تريدها",
      keywords: [
        "تولیدکننده محصولات آرایشی بهداشتی",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "المنتجات المتعلقة بـ",
    },

    sectionTitle: {
      readyProducts: "منتجات جاهزة",
      customProduct: "منتج مخصص",
      similarProducts: "منتجات مماثلة",
    },

    customProductForm: {
      title: "نموذج طلب منتج مخصص",
      firstName: "الاسم",
      lastName: "اسم العائلة",
      email: "بريد إلكتروني",
      mobile: "رقم الهاتف المحمول",
      job: "وظيفة",
      postalCode: "رمز بريدي",
      message: "رسالة",
      address: "العنوان الكامل",
      files: {
        title: "إرسال الصورة أو الملف",
        formats: "التنسيقات المقبولة: jpg , jpeg , png , pdf",
        note: "يرجى إكمال البريد الإلكتروني والكابتشا قبل إرسال الملف.",
        btn: "إرسال الملف",
      },
      uploadErr: "حدثت مشكلة أثناء التحميل",
      fileUploadErr: "حدثت مشكلة أثناء تحميل الملف",
      fileUploadSuccess: "تم تحميل الملف بنجاح",
      imgUploadErr: "حدثت مشكلة أثناء تحميل الصورة",
      imgUploadSuccess: "تم تحميل الصورة بنجاح",
      submitBtn: "ارسال",
      cancelBtn: "إلغاء",
      submitErr: "حدثت مشكلة أثناء إرسال الطلب",
      submitSuccess: "تم إرسال الطلب بنجاح",
    },

    noProducts: "لا توجد منتجات لعرضها",

    customProductApi: {
      subject: "نانو زیست پلمیر پارس | طلب منتج مخصص",
      dearUser: "عزيزي",
      hello: "تحياتي واحترامي",
      orderCode: "رمز الطلب",
      submitText:
        "لقد تم تقديم طلبك بنجاح. يقوم زملاؤنا بمراجعة طلبك. سيتم إعلامك بالنتيجة عبر البريد الإلكتروني",
      inProgress:
        "زملائنا يقومون بإعداد طلبك. سيتم إعلامك بالنتيجة عبر البريد الإلكتروني.",
      completed: "تم تجهيز طلبك وسيتم تسليمه لك قريبا",
      rejected:
        "لسوء الحظ، تم رفض طلبك. يمكنك الاتصال على 982128428415+ لمعرفة السبب",
      thanks: "شكرًا",
      companyName: "نانو زیست پلمیر پارس",
    },

    singleProduct: {
      customProductNote: [
        "لطلب أكثر من 30 قطعة، يرجى استخدام",
        "نموذج طلب المنتج المخصص",
        "",
      ],
      price: "سعر",
      tabs: {
        fullDescription: "وصف",
        userGuide: "دليل المستخدم",
        uses: "حالات الاستخدام",
        files: "كتالوج",
      },
      metaData: "السعر والشراء",
    },

    cartBtns: "أضف إلى السلة",
  },
};

export const blogs = {
  fa: {
    metaData: {
      title: "بلاگ",
      description:
        "جدیدترین خبرهای حوزه محصولات نانو سلولزی و درمان زخم و جدیدترین رویدادهای شرکت پانوتک",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },

    sectionTitle: {
      news: "اخبار",
      events: "رویدادهای شرکت",
    },

    readMore: "مطالعه بیشتر",
    noNews: "خبری برای نمایش وجود ندارد",
  },

  en: {
    metaData: {
      title: "Blogs",
      description:
        "The latest news in the field of nanocellulose products and wound treatment and the latest events of Panotech Company",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },

    sectionTitle: {
      news: "News",
      events: "Company events",
    },

    readMore: "Read more",
    noNews: "There is no news to display.",
  },

  ar: {
    metaData: {
      title: "مدونات",
      description:
        "آخر الأخبار في مجال المنتجات السليولوزية وعلاج الجروح وآخر أحداث شركة پانوتک",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },

    sectionTitle: {
      news: "أخبار",
      events: "أحداث الشركة",
    },

    readMore: "اقرأ المزيد",
    noNews: "لا يوجد اخبار لعرضها.",
  },
};

export const news = {
  fa: {
    metaData: {
      title: "اخبار",
      description: "جدیدترین خبرهای حوزه محصولات نانو سلولزی و درمان زخم",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "اخبار مرتبط با",
    },

    category: { educational: "آموزشی", news: "خبری" },
    carouselTitle: "اخبار دیگر",
  },

  en: {
    metaData: {
      title: "News",
      description:
        "The latest news in the field of nanocellulose products and wound treatment",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "News Related to",
    },

    category: { educational: "Educational", news: "News" },
    carouselTitle: "News",
  },

  ar: {
    metaData: {
      title: "أخبار",
      description: "آخر الأخبار في مجال المنتجات السليولوزية وعلاج الجروح",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "اخبار متعلقة بـ",
    },

    category: { educational: "تعليمي", news: "أخبار" },
    carouselTitle: "أخبار",
  },
};

export const events = {
  fa: {
    metaData: {
      title: "رویدادهای شرکت",
      description: "جدیدترین رویدادهای شرکت نانو زیست پلمیر پارس",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "رویدادهای مرتبط با",
    },
    carouselTitle: "رویدادهای دیگر",
  },

  en: {
    metaData: {
      title: "Company Events",
      description: "The latest events of Panotech Company",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "Events Related to",
    },
    carouselTitle: "Events",
  },

  ar: {
    metaData: {
      title: "أحداث الشركة",
      description: "أحدث أحداث شركة نانو زيست بوليمر بارس",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
      related: "الأحداث المتعلقة بـ",
    },
    carouselTitle: "أحداث",
  },
};

export const gallery = {
  fa: {
    metaData: {
      title: "گالری",
      description: "گالری تصاویر شرکت پانوتک",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: "تصاویر رویدادهای شرکت",
  },

  en: {
    metaData: {
      title: "Gallery",
      description: "Photo gallery of Panotech company",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: "Pictures of Company Events",
  },

  ar: {
    metaData: {
      title: "رواق",
      description: "رواق لشركة پانوتک",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: "صور من أحداث الشركة",
  },
};

export const aboutUs = {
  fa: {
    metaData: {
      title: "درباره ما",
      description:
        "شرکت پانوتک با نام سابق نانو سلوپان، برای اولین بار در چالش‌های نوآوری و فناوری ستاد ویژه توسعه فناوری نانو شناخته شد. در آذرماه 1396 در جریان چالش فناورانه « زخم پوش‌های زخم پای دیابتی » توانست بین 98 طرح شرکت‌کننده در این چالش، بعد از انجام تست‌های ساختاری و کیفی رتبه اول را کسب کند.",
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: {
      history: "تاریخچه",
      brands: "برندها",
    },

    history: (
      <>
        <p className="text-justify">
          شرکت پانوتک در سال 1396 در قالب استارت‌آپ نانو سلوپان شروع به کار کرد.
          این شرکت در حوزه تولید محصولات درمان زخم و مراقبت از پوست با تکیه بر
          تولید نانو الیاف سلولز باکتریایی فعالیت می‌کند. در آذرماه 1396 ستاد
          ویژه توسعه فناوری نانو فراخوانی را با عنوان ساخت زخم‌پوش‌های مبتنی بر
          نانو الیاف به منظور درمان زخم پای دیابتی منتشر کرد. استارت‌آپ نانو
          سلوپان در بین 98 طرح شرکت کننده در این فراخوان توانست رتبه اول را کسب
          کند و در همان زمان شتابدهنده شزان (مجموعه کارخانه نوآوری هم‌آوا فعلی)
          به عنوان سرمایه‌گذار حاضر شد این تیم را برای ورود به دوره شتابدهی خود
          انتخاب کند. بعد از سپری‌کردن دوره شتابدهی، استارت‌آپ نانوسلوپان به
          پانوتک تغییر نام داد و شرکت نانو زیست پلیمر پارس را در آذرماه 1397
          تأسیس کرد.
        </p>
        <p className="text-justify">
          این شرکت در سال 97 توانست گواهی تأییدیه واحد ارزیابی محصولات ستاد
          توسعه فناوری نانو را اخذ نماید و در سال 98 نیز با تأیید کارگروه
          ارزیابی شرکت‌های دانش بنیان معاونت علمی و فناوری ریاست جمهوری، دانش
          بنیان شود. در سال 99 صندوق پرشین دارو البرز به عنوان سرمایه‌گذار بعدی
          بر روی تیم سرمایه‌گذاری کرد. در همین سال شرکت با توجه به استقرار در
          فضای کارخانه نوآوری آزادی، به عضویت شرکت‌های پارک فناوری پردیس درآمد.
          در سال 99 با توجه به نیاز شرکت به داشتن دفتر مستقل و فضای کار
          آزمایشگاهی مجزا، به عنوان بخشی از فرآیند تحقیق و توسعه، شرکت موفق به
          عضویت در مرکز رشد دانشگاه الزهرا (س) شد تا بتواند علاوه بر داشتن دفتر
          کار، فضای آزمایشگاهی مورد نیاز خودش را تأمین کند. قرارداشتن فضای مرکز
          رشد در یکی از بهترین نقاط کلانشهر تهران دسترسی بسیار خوبی را به منظور
          شبکه‌سازی قوی برای شرکت محیا کرده است.
        </p>
        <p className="text-justify">
          شرکت پانوتک سابقه حضور در چندین جشنواره فناوری نانو را در سال‌های
          1398، 1399، 1401 و 1403 دارد. علاوه بر این در نمایشگاه‌های اینوتکس و
          ربع رشیدی نیز حضور داشته است. در حال حاضر این شرکت با سرمایه‌گذاری
          شرکت داروسازی روناک فضای تولید مورد نظر خود را آماده سازی کرده است و
          موفق شد مجوزهای لازم را از اداره کل تجهیزات و ملزومات پزشکی وزارت
          بهداشت دریافت نماید. همچنین موفق به اخذ استاندارد ایزو 13485 شد.
        </p>
      </>
    ),

    // brands: [
    //   {
    //     id: 1,
    //     name: "PanoTech",
    //     img: panotechLogo,
    //     description: `پانوتک اولین محصول شرکت است. این محصول زخم‌پوش نوین هیدروژلی کاملاً طبیعی به منظور درمان زخم‌های مزمن است. محصول مشابه پانوتک در کشورهای آلمان، کانادا، تایوان، لهستان و آمریکا تولید و در بازار جهانی عرضه شده است که البته فعلاً در ایران در دسترس نمی‌باشند و برای اولین بار در ایران تجاری‌سازی شده است. سبد محصولات پانوتک حاوی انواع پانسمان‌های زخم، ژل‌های ترمیم زخم، محلول‌های شست و شوی زخم، بندآورنده‌های خون و سایر لوازم درمان زخم می‌باشد.`,
    //   },
    //   {
    //     id: 2,
    //     name: "HiMe",
    //     img: himeLogo,
    //     description: `از سال 1402 این شرکت گام‌هایی جهت ورود به حوزه آرایشی و بهداشتی برداشته است که اولین محصولات سبد محصولات این شرکت با این فناوری در زمینه ماسک‌های زیبایی صورت و سرم‌های پوستی است. این شرکت بر پایه نانوالیاف سلولزی در حوزه آرایشی و بهداشتی، ۵ محصول با برند تجاری هایمی(HiMe) فرموله کرده است. این محصولات شامل ماسک و سرم مغذی آبرسان، سرم لایه‌بردار، ماسک و سرم آکنه می‌شود. با افتخار تولید این نوع ماسک‌های نوین برای اولین بار در ایران توسط این شرکت انجام شده است. به دلیل مزایای استفاده از این نوع ماسک، اثرات و نفوذ مواد موثره بیشتر و عمیق‌تر است. علاوه بر آن این نوع ماسک‌ها درصد آبرسانی بالایی دارند و حس دلنشین و مطبوعی بعد از استفاده بر روی پوست ایجاد می‌کنند.`,
    //   },
    // ],
  },

  en: {
    metaData: {
      title: "About Us",
      description: `Panotech Company, formerly known as Nano Cellopane, was recognized for the first time in the Innovation and Technology Challenges of the Special Task Force for the Development of Nanotechnology. In December 2017, during the technological challenge of "Diabetic Foot Wound Dressings", it was able to win first place among 98 participating designs in this challenge, after conducting structural and quality tests.`,
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: {
      history: "History",
      brands: "Brands",
    },

    history: (
      <>
        <p className="text-justify">
          Panotech Company started its operations in 2017 as a startup called
          Nano Cellophane. The company operates in the field of wound treatment
          and skin care products, relying on the production of bacterial
          cellulose nanofibers. In December 2017, the Special Task Force for the
          Development of Nanotechnology published a call for proposals entitled
          “Making wound dressings based on nanofibers for the treatment of
          diabetic foot ulcers.” The Nano Cellophane startup won first place
          among the 98 projects participating in this call, and at the same
          time, the Shezan Accelerator (currently the Hamava Innovation Factory
          Complex) agreed to select the team as an investor to enter its
          acceleration period. After completing the acceleration period, the
          Nano Cellophane startup changed its name to Panotech and established
          Panotech Company in December 2018.
        </p>
        <p className="text-justify">
          In 2018, the company was able to obtain a certificate of approval from
          the Product Evaluation Unit of the Nanotechnology Development
          Headquarters, and in 2019, it became a knowledge-based company with
          the approval of the Knowledge-Based Companies Evaluation Working Group
          of the Presidential Vice-President for Science and Technology. In
          2019, the Alborz Persian Drug Fund invested in the team as the next
          investor. In the same year, the company became a member of the Pardis
          Technology Park companies due to its location in the Azadi Innovation
          Factory. In 2019, due to the company’s need to have an independent
          office and separate laboratory workspace as part of the research and
          development process, the company succeeded in becoming a member of the
          Growth Center of Al-Zahra University so that it could provide its own
          laboratory space in addition to having an office. The location of the
          growth center space in one of the best locations in the Tehran
          metropolis has provided the company with excellent access for strong
          networking.
        </p>
        <p className="text-justify">
          Panotech Company has a history of participating in several
          nanotechnology festivals in 2019, 2020, 2021 and 2024. In addition, it
          has also participated in the Innotex and Rabe Rashidi exhibitions.
          Currently, this company has prepared its desired production space with
          the investment of Ronak Pharmaceutical Company and succeeded in
          receiving the necessary permits from the General Directorate of
          Medical Equipment and Supplies of the Ministry of Health. It also
          succeeded in obtaining the ISO 13485 standard.
        </p>
      </>
    ),

    // brands: [
    //   {
    //     id: 1,
    //     name: "PanoTech",
    //     img: panotechLogo,
    //     description: `PanoTech is the company's first product. This is a new, all-natural hydrogel wound dressing for the treatment of chronic wounds. Similar products to PanoTech have been produced and marketed in Germany, Canada, Taiwan, Poland, and the United States, but are not currently available in Iran, and this is the first time that PanoTech has been commercialized in Iran. PanoTech's product portfolio includes a variety of wound dressings, wound healing gels, wound irrigation solutions, blood thinners, and other wound care supplies.`,
    //   },
    //   {
    //     id: 2,
    //     name: "HiMe",
    //     img: himeLogo,
    //     description: `Since 1402, the company has taken steps to enter the field of cosmetics and health care, and the first products in the company's product portfolio with this technology are facial beauty masks and skin serums. The company has formulated 5 products under the HiMe brand based on cellulose nanofibers in the field of cosmetics and health care. These products include a nourishing hydrating mask and serum, an exfoliating serum, and an acne mask and serum. It is with pride that this company has produced this type of new mask for the first time in Iran. Due to the advantages of using this type of mask, the effects and penetration of the active ingredients are greater and deeper. In addition, these types of masks have a high percentage of hydration and create a pleasant and pleasant feeling on the skin after use.`,
    //   },
    // ],
  },

  ar: {
    metaData: {
      title: "معلومات عنا",
      description: `تم تكريم شركة بارس نانو بيوبوليمر، المعروفة سابقاً باسم نانو سيلوبان، لأول مرة في تحديات الابتكار والتكنولوجيا في المقر الخاص لتطوير تكنولوجيا النانو. وفي ديسمبر 2016، تمكنت خلال التحدي التكنولوجي "ضمادات جروح القدم السكرية" من الفوز بالمركز الأول من بين 98 تصميماً مشاركاً في هذا التحدي، بعد إجراء الاختبارات الهيكلية والنوعية.`,
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: {
      history: "تاريخ",
      brands: "العلامات التجارية",
    },

    history: (
      <>
        <p className="text-justify">
          بدأت شركة نانو زیست پلمیر پارس أعمالها في عام 2017 كشركة ناشئة في مجال
          السيلوفان النانوي. تعمل هذه الشركة في مجال معالجة الجروح ومنتجات
          العناية بالبشرة، وتعتمد على إنتاج ألياف السليلوز البكتيرية النانوية.
          في ديسمبر 2017، نشرت فرقة العمل الخاصة لتطوير تكنولوجيا النانو دعوة
          لتقديم مقترحات بعنوان "صنع ضمادات الجروح على أساس الألياف النانوية
          لعلاج تقرحات القدم السكرية". فاز مشروع نانو سلوپان الناشئ بالمركز
          الأول من بين 98 مشروعًا مشاركًا في هذه الدعوة، وفي الوقت نفسه، وافق
          مسرع شزان (مجمع مصنع هامافا للابتكار) على اختيار الفريق كمستثمر لدخول
          فترة التسريع الخاصة به. بعد الانتهاء من فترة التسريع، قامت شركة نانو
          سلوپان الناشئة بتغيير اسمها إلى پانونک وتأسيس شركة نانو زیست پلمیر
          پارس في ديسمبر 2018.
        </p>
        <p className="text-justify">
          في عام 2018، تمكنت هذه الشركة من الحصول على شهادة اعتماد من وحدة تقييم
          المنتجات التابعة لمقر تطوير تكنولوجيا النانو، وفي عام 2019، أصبحت
          قائمة على المعرفة بموافقة مجموعة عمل تقييم الشركات القائمة على المعرفة
          التابعة لنائب الرئيس. رئيس العلوم والتكنولوجيا. في عام 2010، أصبح
          صندوق دار البرز الفارسي المستثمر التالي للاستثمار في الفريق. وفي العام
          نفسه، أصبحت الشركة عضواً في شركات حديقة برديس للتكنولوجيا، نظراً
          لموقعها في مصنع آزادي للإبداع. في عام 2010، ونظراً لحاجة الشركة إلى
          مكتب مستقل ومساحة عمل مختبرية منفصلة، كجزء من عملية البحث والتطوير،
          نجحت الشركة في أن تصبح عضواً في مركز نمو جامعة الزهراء (س) حتى تتمكن
          من أن يكون لديه مساحة مختبرية بالإضافة إلى مكتب. توفير احتياجاته
          الخاصة. لقد أتاح موقع مركز النمو في أحد أفضل المواقع في مدينة طهران
          للشركة إمكانية الوصول الممتازة إلى شبكات قوية.
        </p>
        <p className="text-justify">
          لدى شركة نانو زيست پلیمر پارس تاريخ في المشاركة في العديد من مهرجانات
          النانوتكنولوجي في عام 2019 و 2020 و 2022 و 2024. كما شارك أيضًا في
          معارض اینوتکس و ربع رشیدی. حاليا قامت هذه الشركة بتجهيز مساحة الإنتاج
          المطلوبة باستثمار شركة روناك للأدوية ونجحت في الحصول على التصاريح
          اللازمة من المديرية العامة للمعدات واللوازم الطبية في وزارة الصحة. كما
          نجحت في الحصول على معيار ISO 13485.
        </p>
      </>
    ),

    // brands: [
    //   {
    //     id: 1,
    //     name: "PanoTech",
    //     img: panotechLogo,
    //     description: `پانوتک هو المنتج الأول للشركة. هذا منتج جديد لضمادة الجروح الهيدروجيلية الطبيعية لعلاج الجروح المزمنة. تم إنتاج منتج مماثل لـپانوتک وتسويقه في ألمانيا وكندا وتايوان وبولندا والولايات المتحدة، ولكنه غير متوفر حاليًا في إيران وتم تسويقه في إيران لأول مرة. تشتمل مجموعة منتجات پانوتک على مجموعة متنوعة من ضمادات الجروح، ومواد هلامية لشفاء الجروح، ومحاليل غسل الجروح، ومميعات الدم، ومستلزمات علاج الجروح الأخرى.`,
    //   },
    //   {
    //     id: 2,
    //     name: "HiMe",
    //     img: himeLogo,
    //     description: `منذ عام 1402، اتخذت الشركة خطوات للدخول في مجال مستحضرات التجميل والعناية الصحية، حيث كانت أول منتجات الشركة في محفظة منتجاتها التي تستخدم هذه التقنية هي أقنعة تجميل الوجه ومصل البشرة. قامت هذه الشركة بتصنيع 5 منتجات تحت العلامة التجارية HiMe في مجال مستحضرات التجميل المعتمدة على ألياف السليلوز النانوية. تتضمن هذه المنتجات أقنعة ومصلات مغذية ومرطبة، ومصلات تقشير، وأقنعة ومصلات لعلاج حب الشباب. وتفتخر هذه الشركة بإنتاج هذا النوع الجديد من القناع لأول مرة في إيران. بفضل فوائد استخدام هذا النوع من الأقنعة، فإن تأثيرات وتغلغل المكونات النشطة أكبر وأعمق. بالإضافة إلى ذلك، تتمتع هذه الأنواع من الأقنعة بنسبة عالية من الترطيب وتخلق شعورًا لطيفًا وممتعًا على البشرة بعد الاستخدام.`,
    //   },
    // ],
  },
};

export const contactUs = {
  fa: {
    metaData: {
      title: "تماس با ما",
      description: `راه‌های ارتباطی با ما برای درخواست همکاری، پرسش سؤال و یا انتقاد و پیشنهاد`,
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: {
      contactWays: "راه‌های تماس",
      contactForms: "فرم‌های ارتباط",
    },

    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.48506546387938!2d51.391399!3d35.7074974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff42c734f551%3A0x485185dfcb14a998!2sNano%20Zist%20Polymer%20Pars%20(Panotech)!5e0!3m2!1sen!2s!4v1730278920578!5m2!1sen!2s",
    forms: {
      text: "در صورت تمایل به ارتباط، لطفاً پس از انتخاب زمینه ارتباط، فرم مربوطه را تکمیل کنید.",
      formsSelection: {
        cooperationForm: "همکاری",
        questionForm: "سؤال",
        suggestionForm: "انتقاد و پیشنهاد",
        label: "انتخاب زمینه ارتباط",
      },
      title: {
        cooperationForm: "فرم درخواست همکاری",
        questionForm: "فرم سؤال",
        suggestionForm: "فرم انتقاد و پیشنهاد",
      },
      firstName: "نام",
      lastName: "نام خانوادگی",
      email: "ایمیل",
      mobile: "شماره همراه",
      job: "شغل",
      message: "پیام",
      files: {
        cooperationForm: {
          title: "ارسال روزمه",
          formats: "فرمت‌های قابل قبول: pdf",
        },
        questionForm: {
          title: "ارسال عکس",
          formats: "فرمت‌های قابل قبول: jpg , jpeg , png",
        },
        note: "لطفاً قبل از ارسال فایل، ایمیل و captcha را کامل کنید",
        btn: "ارسال فایل",
      },
      uploadErr: "آپلود با مشکل مواجه شد",
      uploadSuccess: "آپلود با موفقیت انجام شد",
      submitBtn: "ارسال",
      cancelBtn: "انصراف",
      submitErr: "ارسال درخواست با مشکل مواجه شد",
      submitSuccess: "درخواست با موفقیت ارسال شد",
    },
  },

  en: {
    metaData: {
      title: "Contact Us",
      description: `Ways to contact us to request cooperation, ask questions, or make criticisms and suggestions`,
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: {
      contactWays: "Ways to Contact",
      contactForms: "Contact Forms",
    },

    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.48506546387938!2d51.391399!3d35.7074974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff42c734f551%3A0x485185dfcb14a998!2sNano%20Zist%20Polymer%20Pars%20(Panotech)!5e0!3m2!1sen!2s!4v1730278920578!5m2!1sen!2s",
    forms: {
      text: "If you would like to contact us, please complete the relevant form after selecting the field of contact.",
      formsSelection: {
        cooperationForm: "Cooperation",
        questionForm: "Question",
        suggestionForm: "Criticism and Suggestions",
        label: "Select Contact Field",
      },

      title: {
        cooperationForm: "Cooperation Request Form",
        questionForm: "Question Form",
        suggestionForm: "Criticism and Suggestion form",
      },
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      mobile: "Mobile Number",
      job: "Job",
      message: "Message",
      files: {
        cooperationForm: {
          title: "Send Resume",
          formats: "Acceptable Formats:  pdf",
        },
        questionForm: {
          title: "Send Image",
          formats: "Acceptable Formats: jpg, jpeg, png",
        },
        note: "Please complete the email and captcha before submitting the file.",
        btn: "Send File",
      },
      uploadErr: "There was a problem uploading.",
      uploadSuccess: "Upload completed successfully.",
      submitBtn: "Submit",
      cancelBtn: "Cancel",
      submitErr: "There was a problem sending the request.",
      submitSuccess: "Request sent successfully.",
    },
  },

  ar: {
    metaData: {
      title: "اتصل بنا",
      description: `طرق التواصل معنا لطلب التعاون أو طرح الأسئلة أو النقد والاقتراح`,
      keywords: [
        "خبرهای حوزه محصولات نانو سلولز",
        "تولیدکننده محصولات درمان زخم",
        "تولیدکننده محصولات سلولزی",
      ],
    },
    sectionTitle: {
      contactWays: "طرق الاتصال",
      contactForms: "نماذج الاتصال",
    },

    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.48506546387938!2d51.391399!3d35.7074974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff42c734f551%3A0x485185dfcb14a998!2sNano%20Zist%20Polymer%20Pars%20(Panotech)!5e0!3m2!1sen!2s!4v1730278920578!5m2!1sen!2s",

    forms: {
      text: "إذا كنت ترغب في التواصل، يرجى إكمال النموذج الخاص بذلك بعد اختيار مجال التواصل.",
      formsSelection: {
        cooperationForm: "تعاون",
        questionForm: "سؤال",
        suggestionForm: "النقد والاقتراح",
        label: "حدد سياق الاتصال",
      },

      title: {
        cooperationForm: "نموذج طلب التعاون",
        questionForm: "نموذج سؤال",
        suggestionForm: "نموذج النقد والاقتراح",
      },
      firstName: "الاسم",
      lastName: "اسم العائلة",
      email: "بريد إلكتروني",
      mobile: "رقم الهاتف المحمول",
      job: "وظيفة",
      message: "رسالة",
      files: {
        cooperationForm: {
          title: "إرسال السيرة الذاتية",
          formats: "التنسيقات المقبولة:  pdf",
        },
        questionForm: {
          title: "إرسال الصورة",
          formats: "التنسيقات المقبولة: jpg, jpeg, png",
        },
        note: "يرجى إكمال البريد الإلكتروني والكابتشا قبل إرسال الملف",
        btn: "إرسال الملف",
      },
      uploadErr: "حدثت مشكلة أثناء التحميل",
      uploadSuccess: "تم التحميل بنجاح",
      submitBtn: "ارسال",
      cancelBtn: "إلغاء",
      submitErr: "حدثت مشكلة أثناء إرسال الطلب",
      submitSuccess: "تم إرسال الطلب بنجاح",
    },
  },
};

export const cart = {
  fa: {
    metaData: {
      title: "سبد خرید",
      description: `سبد خرید`,
      keywords: [],
    },

    emptyCart: "سبد خرید شما خالیست",
    itemsNums: "تعداد اقلام",
    totalCartPrice: "قیمت کل سبد خرید",
    continueShopping: "ادامه خرید",
    price: "قیمت",
    totalPrice: "قیمت کل",
    viewProduct: "مشاهده محصول",
  },

  en: {
    metaData: {
      title: "Cart",
      description: `Cart`,
      keywords: [],
    },

    emptyCart: "Your shopping cart is empty.",
    itemsNums: "Number of items",
    totalCartPrice: "Total Cart Price",
    continueShopping: "Continue Shopping",
    price: "Price",
    totalPrice: "Total Price",
    viewProduct: "View Product",
  },

  ar: {
    metaData: {
      title: "عربة التسوق",
      description: `عربة التسوق`,
      keywords: [],
    },

    emptyCart: "سلة التسوق الخاصة بك فارغة",
    itemsNums: "عدد العناصر",
    totalCartPrice: "السعر الإجمالي للسلة",
    continueShopping: "مواصلة التسوق",
    price: "سعر",
    totalPrice: "السعر الإجمالي",
    viewProduct: "عرض المنتج",
  },
};

export const finishOrder = {
  fa: {
    metaData: {
      title: "اطلاعات سفارش",
      description: `Cart`,
      keywords: [],
    },

    emptyCart: "سبد خرید شما خالیست",
    itemsNums: "تعداد اقلام",
    totalCartPrice: "قیمت کل سبد خرید",
    shippingCost: "هزینه ارسال",
    shippingPrice: "500000",
    amountPayable: "مبلغ قابل پرداخت",
    submitBtn: "تکمیل خرید",
    submitErr: "ثبت سفارش با مشکل مواجه شد",
    submitSuccess: "ثبت سفارش با موفقیت انجام شد",
    orderCode: "کد سفارش",
    close: "بستن",

    paymentText: (
      <p className="text-primary text-justify">
        لطفاً پس از تکمیل خرید، مبلغ قابل پرداخت را به شماره کارت{" "}
        <span className="text-success">xxxx-xxxx-xxxx-xxxx</span> به نام شرکت{" "}
        <span className="text-success">پانوتک</span> واریز کرده و رسید پرداخت را
        همراه با <span className="text-success">نام و نام خانوادگی</span> در
        پیام رسان بله به شماره <span className="text-success">09122064052</span>{" "}
        ارسال کنید.
      </p>
    ),
  },

  en: {
    metaData: {
      title: "Order Information",
      description: `Order Information`,
      keywords: [],
    },

    emptyCart: "Your shopping cart is empty.",
    itemsNums: "Number of items",
    totalCartPrice: "Total Cart Price",
    shippingCost: "Shipping Cost",
    shippingPrice: "20",
    amountPayable: "Amount Payable",
    submitBtn: "Complete Order",
    submitErr: "There was a problem placing the order.",
    submitSuccess: "Order placed successfully.",
    orderCode: "Order Code",
    close: "Close",

    paymentText: (
      <p className="text-primary text-justify">
        After completing the order, please deposit the payable amount to the
        card number <span className="text-success">xxxx-xxxx-xxxx-xxxx</span> in
        the name of <span className="text-success">Panotech</span>
        and send the payment receipt along with{" "}
        <span className="text-success">your name and surname</span>in the
        messenger Bale to the number{" "}
        <span className="text-success">09122064052</span> ارسال کنید.
      </p>
    ),
  },
  ar: {
    metaData: {
      title: "معلومات الطلب",
      description: `معلومات الطلب`,
      keywords: [],
    },

    emptyCart: "سلة التسوق الخاصة بك فارغة",
    itemsNums: "عدد العناصر",
    totalCartPrice: "السعر الإجمالي للسلة",
    shippingCost: "تكلفة الشحن",
    shippingPrice: "20",
    amountPayable: "المبلغ المستحق",
    submitBtn: "اكمل الطلب",
    submitErr: "حدثت مشكلة أثناء تقديم الطلب",
    submitSuccess: "تم تقديم الطلب بنجاح",
    orderCode: "رمز الطلب",
    close: "يغلق",

    paymentText: (
      <p className="text-primary text-justify">
        الرجاء بعد اتمام الطلب دفع المبلغ على رقم البطاقة
        <span className="text-success">xxxx-xxxx-xxxx-xxxx</span> قم بالإيداع
        باسم <span className="text-success">پانوتک</span>
        وأرسل إيصال الدفع مع <span className="text-success">اسمك ولقبك</span>في
        رسول بله إلى الرقم <span className="text-success">09122064052</span>
      </p>
    ),
  },
};

export const faqsData = {
  fa: {
    metaData: {
      title: "سؤالات متداول",
      description: `سؤالات پرتکرار و متداول که در حین خرید و یا مطالعه سایت با آن مواجه شوید`,
      keywords: ["سؤالات متداول", "سؤالات پر تکرار"],
    },
    noQuestions: "سؤالی برای نمایش وجود ندارد.",
  },
  en: {
    metaData: {
      title: "FAQs",
      description: `Frequently asked questions that you may encounter while shopping or browsing the siten`,
      keywords: [],
    },
    noQuestions: "There are no questions to display.",
  },
  ar: {
    metaData: {
      title: "الأسئلة المتداولة",
      description: `الأسئلة الشائعة التي قد تواجهك أثناء التسوق أو قراءة الموقع`,
      keywords: [],
    },
    noQuestions: "لا توجد أسئلة لعرضها.",
  },
};

export const profile = {
  fa: {
    metaData: {
      title: "حساب کاربری",
      description: `اطلاعات حساب کاربری اعضای سایت`,
      keywords: [],
    },

    sidebarLinks: [
      {
        id: 1,
        title: "اطلاعات حساب کاربری",
        path: "",
        icon: (
          <FaUser
            size={18}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105 ms-1"
          />
        ),
      },
      {
        id: 2,
        title: "ویرایش اطلاعات کاربری",
        path: "/personal-info",
        icon: (
          <FaUserEdit
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 3,
        title: "سبد خرید",
        path: "/cart",
        icon: (
          <BsCartFill
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 4,
        title: "خریدهای قبلی",
        path: "/completed-orders",
        icon: (
          <BsCartCheckFill
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 5,
        title: "محصول سفارشی",
        path: "/custom-products-orders",
        icon: (
          <FaProductHunt
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
    ],

    sidebarFullname: "نام و نام خانوادگی",

    profileForms: {
      title: { view: "اطلاعات کاربری", edit: "ویرایش اطلاعات کاربری" },
      firstName: "نام",
      lastName: "نام خانوادگی",
      email: "ایمیل",
      mobile: "شماره همراه",
      field: "رشته تحصیلی",
      job: "شغل",
      postalCode: "کد پستی",
      address: "آدرس کامل",

      submitBtn: "ویرایش",
      cancelBtn: "انصراف",

      submitErr: "ویرایش اطلاعات با مشکل مواجه شد",
      submitSuccess: "اطلاعات با موفقیت ویرایش شد",
    },
  },
  en: {
    metaData: {
      title: "User Account",
      description: `Site member account information`,
      keywords: [],
    },

    sidebarLinks: [
      {
        id: 1,
        title: "Account Information",
        path: "",
        icon: (
          <FaUser
            size={18}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105 ms-1"
          />
        ),
      },
      {
        id: 2,
        title: "Edit User Information",
        path: "/personal-info",
        icon: (
          <FaUserEdit
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 3,
        title: "Cart",
        path: "/cart",
        icon: (
          <BsCartFill
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 4,
        title: "Previous Orders",
        path: "/completed-orders",
        icon: (
          <BsCartCheckFill
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 5,
        title: "Customized Product Orders",
        path: "/custom-products-orders",
        icon: (
          <FaProductHunt
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
    ],

    sidebarFullname: "Full Name",

    profileForms: {
      title: { view: "User Information", edit: "Edit User Information" },
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      mobile: "Mobile Number",
      job: "Job",
      field: "Field of Study",
      postalCode: "Postal Code",
      address: "Full Address",

      submitBtn: "Edit",
      cancelBtn: "Cancel",

      submitErr: "There was a problem editing the information.",
      submitSuccess: "Information successfully edited.",
    },
  },
  ar: {
    metaData: {
      title: "حساب المستخدم",
      description: `معلومات حساب المستخدم لأعضاء الموقع`,
      keywords: [],
    },

    sidebarLinks: [
      {
        id: 1,
        title: "معلومات حساب المستخدم",
        path: "",
        icon: (
          <FaUser
            size={18}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105 ms-1"
          />
        ),
      },
      {
        id: 2,
        title: "تحرير معلومات المستخدم",
        path: "/personal-info",
        icon: (
          <FaUserEdit
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 3,
        title: "عربة التسوق",
        path: "/cart",
        icon: (
          <BsCartFill
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 4,
        title: "الطلبات السابقة",
        path: "/completed-orders",
        icon: (
          <BsCartCheckFill
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
      {
        id: 5,
        title: "طلبات المنتجات المخصصة",
        path: "/custom-products-orders",
        icon: (
          <FaProductHunt
            size={22}
            className="text-success group-hover:text-primary transition-all duration-250 ease-in-out group-hover:scale-105"
          />
        ),
      },
    ],

    sidebarFullname: "الاسم و اللقب",

    profileForms: {
      title: { view: "معلومات المستخدم", edit: "تحرير معلومات المستخدم" },
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "بريد إلكتروني",
      mobile: "رقم الهاتف المحمول",
      job: "وظيفة",
      field: "مجال الدراسة",
      postalCode: "رمز بريدي",
      address: "العنوان الكامل",

      submitBtn: "تحریر",
      cancelBtn: "إلغاء",

      submitErr: "حدثت مشكلة أثناء تحرير المعلومات.",
      submitSuccess: "تم تحرير المعلومات بنجاح.",
    },
  },
};

export const editProfile = {
  fa: {
    metaData: {
      title: "ویرایش اطلاعات کاربری",
      description: `ویرایش اطلاعات حساب کاربری اعضای سایت`,
      keywords: [],
    },
  },
  en: {
    metaData: {
      title: "Edit User Information",
      description: `Edit site member account information`,
      keywords: [],
    },
  },
  ar: {
    metaData: {
      title: "تحرير معلومات المستخدم",
      description: `تحرير معلومات حساب المستخدم لأعضاء الموقع`,
      keywords: [],
    },
  },
};

export const completedOrdersData = {
  fa: {
    metaData: {
      title: "خریدهای قبلی",
      description: `لیست خریدهای قبلی اعضای سایت`,
      keywords: [],
    },
    noOrders: "سفارشی برای نمایش وجود ندارد",
    orderDate: "تاریخ ثبت سفارش",
    orderCode: "کد سفارش",
    amount: "مبلغ",
    shippingPrice: "هزینه ارسال",
    qty: "تعداد",
  },
  en: {
    metaData: {
      title: "Previous Orders",
      description: `List of previous purchases by site members`,
      keywords: [],
    },
    noOrders: "There are no orders to display.",
    orderDate: "Order Date",
    orderCode: "Order Code",
    amount: "Amount",
    shippingPrice: "Shipping Price",
    qty: "Count",
  },
  ar: {
    metaData: {
      title: "الطلبات السابقة",
      description: `قائمة المشتريات السابقة لأعضاء الموقع`,
      keywords: [],
    },
    noOrders: "لا توجد أوامر لعرضها",
    orderDate: "تاريخ تسجيل الطلب",
    orderCode: "رمز الطلب",
    amount: "كمية",
    shippingPrice: "سعر الشحن",
    qty: "رقم",
  },
};

export const profileCustomProductsData = {
  fa: {
    metaData: {
      title: "محصول سفارشی",
      description: `لیست محصولات سفارشی قبلی اعضای سایت`,
      keywords: [],
    },
    noOrders: "سفارشی برای نمایش وجود ندارد",
    message: "پیام",
    orderDate: "تاریخ ثبت سفارش",
    orderCode: "کد سفارش",
    viewOrder: "مشاهده سفارش",
    orderStatus: "وضعیت سفارش",
    waiting: "در انتظار",
    inProgress: "در حال انجام",
    completed: "کامل شده",
    rejected: "رد شده",
  },
  en: {
    metaData: {
      title: "Customized Product Orders",
      description: `List of previous Customized Product Orders by site members`,
      keywords: [],
    },
    noOrders: "There are no orders to display.",
    message: "Message",
    orderDate: "Order Date",
    orderCode: "Order Code",
    viewOrder: "View Order",
    orderStatus: "Order Status",
    waiting: "Waiting",
    inProgress: "In Progress",
    completed: "Completed",
    rejected: "Rejected",
  },
  ar: {
    metaData: {
      title: "طلبات المنتجات المخصصة",
      description: `قائمة طلبات المنتجات المخصصة السابقة التي قدمها أعضاء الموقع`,
      keywords: [],
    },
    noOrders: "لا توجد أوامر لعرضها",
    message: "رسالة",
    orderDate: "تاريخ تسجيل الطلب",
    orderCode: "رمز الطلب",
    viewOrder: "عرض الطلب",
    orderStatus: "حالة الطلب",
    waiting: "منتظر",
    inProgress: "في تَقَدم",
    completed: "مكتمل",
    rejected: "مرفوض",
  },
};

export const profileSingleCustomProductData = {
  fa: {
    metaData: {
      title: "مشاهده محصول سفارشی",
      description: `مشاهده اطلاعات سفارش محصول سفارشی`,
      keywords: [],
    },

    firstName: "نام",
    lastName: "نام خانوادگی",
    email: "ایمیل",
    mobile: "شماره همراه",
    job: "شغل",
    postalCode: "کد پستی",
    address: "آدرس کامل",
    message: "پیام",
    status: "وضعیت سفارش",
    waiting: "در انتظار",
    inProgress: "در حال انجام",
    completed: "کامل شده",
    rejected: "رد شده",
    return: "بازگشت",
  },
  en: {
    metaData: {
      title: "View Customized Product Order",
      description: `View customized product order information`,
      keywords: [],
    },

    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    mobile: "Mobile Number",
    job: "Job",
    postalCode: "Postal Code",
    address: "Full Address",
    message: "Message",
    status: "Status",
    waiting: "Waiting",
    inProgress: "In Progress",
    completed: "Completed",
    rejected: "Rejected",
    return: "Return",
  },
  ar: {
    metaData: {
      title: "عرض طلب المنتج المخصص",
      description: `عرض معلومات طلب المنتج المخصص`,
      keywords: [],
    },

    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "بريد إلكتروني",
    mobile: "رقم الهاتف المحمول",
    job: "وظيفة",
    postalCode: "رمز بريدي",
    address: "العنوان الكامل",
    message: "رسالة",
    status: "حالة",
    waiting: "منتظر",
    inProgress: "في تَقَدم",
    completed: "مكتمل",
    rejected: "مرفوض",
    return: "يعود",
  },
};

export const register = {
  fa: {
    metaData: {
      title: "ثبت نام",
      description: `صفحه ثبت نام در سایت پانوتک`,
      keywords: [],
    },

    logoTitle: "پانوتک",
    firstName: "نام",
    lastName: "نام خانوادگی",
    email: "ایمیل",
    mobile: "شماره همراه",
    password: "رمز ورود",
    confirmPassword: "تکرار رمز ورود",

    submitBtn: "ثبت نام",
    cancelBtn: "انصراف",

    registered: ["قبلاً ثبت نام کرده اید؟", "وارد شوید"],

    status201: "ثبت نام با موفقیت انجام شد",
    status400: "شما قبلاً ثبت نام کرده‌اید",
    status422: "موارد وارد شده اشتباه است",
    status403: "دسترسی غیر مجاز",
    status500: "مشکلی در سرور پیش آمد.",
    registerErr: "مشکلی پیش آمد.",

    registerApi: {
      mailSubject: "پانوتک | ثبت نام موفق",
      dearUser: "عزیز",
      hello: "با سلام و احترام",
      mailBody: "به سایت پانوتک خوش آمدید.",
      companyName: "پانوتک",
    },
  },
  en: {
    metaData: {
      title: "Register",
      description: `Panotech website registration page`,
      keywords: [],
    },

    logoTitle: "Panotech",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    mobile: "Mobile Number",
    password: "Password",
    confirmPassword: "Confirm Password",

    submitBtn: "Register",
    cancelBtn: "Cancel",

    registered: ["Already registered?", "Log in"],

    status201: "Registration was successful.",
    status400: "You are already registered.",
    status422: "The items entered are not correct.",
    status403: "Access denied.",
    status500: "There was a problem with the server.",
    registerErr: "There was a problem.",

    registerApi: {
      subject: "Panotech | Successful registration",
      dearUser: "Dear",
      hello: "Greetings and respect",
      mailBody: "Welcome to the Panotech website.",
      companyName: "Panotech",
    },
  },
  ar: {
    metaData: {
      title: "التسجيل",
      description: `صفحة التسجيل على موقع پانوتک`,
      keywords: [],
    },

    logoTitle: "پانوتک",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "بريد إلكتروني",
    mobile: "رقم الهاتف المحمول",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",

    submitBtn: "التسجيل",
    cancelBtn: "إلغاء",

    registered: ["مسجلة بالفعل؟", "تسجيل الدخول"],

    status201: "تم التسجيل بنجاح",
    status400: "أنت مسجل بالفعل",
    status422: "العناصر المدخلة غير صحيحة",
    status403: "تم الرفض",
    status500: "كانت هناك مشكلة مع الخادم.",
    registerErr: "كانت هناك مشكلة.",

    registerApi: {
      subject: "نانو زیست پلمیر پارس | تسجيل ناجح",
      dearUser: "عزيزي",
      hello: "تحياتي واحترامي",
      mailBody: "مرحبا بكم في موقع نانو زیست پلمیر پارس.",
      companyName: "نانو زیست پلمیر پارس",
    },
  },
};

export const login = {
  fa: {
    metaData: {
      title: "ورود",
      description: `صفحه ورود به سایت پانوتک`,
      keywords: [],
    },

    logoTitle: "پانوتک",

    email: "ایمیل",
    password: "رمز ورود",
    submitBtn: "ورود",
    cancelBtn: "انصراف",

    status200: "ورود با موفقیت انجام شد",
    status422: "موارد وارد شده اشتباه است",
    status500: "مشکلی در سرور پیش آمد.",

    forgotten: ["رمز خود را فراموش کرده‌اید؟", "بازیابی رمز ورود"],
    notRegistered: ["حساب کاربری ندارید؟", "ثبت نام کنید"],
  },

  en: {
    metaData: {
      title: "Login",
      description: `Panotech website login page`,
      keywords: [],
    },

    logoTitle: "Panotech",

    email: "Email",
    password: "Password",
    submitBtn: "Login",
    cancelBtn: "Cancel",

    status200: "Login successful.",
    status422: "The items entered are not correct.",
    status500: "There was a problem with the server.",

    forgotten: ["Forgot your password?", "Reset Password"],
    notRegistered: ["Don't have an account?", "Register"],
  },

  ar: {
    metaData: {
      title: "دخول",
      description: `صفحة تسجيل الدخول لموقع پانوتک`,
      keywords: [],
    },

    logoTitle: "پانوتک",

    email: "بريد إلكتروني",
    password: "كلمة المرور",
    submitBtn: "تسجيل الدخول",
    cancelBtn: "إلغاء",

    status200: "تم تسجيل الدخول بنجاح",
    status422: "العناصر المدخلة غير صحيحة",
    status500: "كانت هناك مشكلة مع الخادم.",

    forgotten: ["نسيت كلمة السر؟", "إعادة تعيين كلمة المرور"],
    notRegistered: ["ليس لديك حساب؟", "اشتراك"],
  },
};

export const forgetPassword = {
  fa: {
    metaData: {
      title: "فراموشی رمز ورود",
      description: `صفحه فراموشی رمز ورود سایت پانوتک`,
      keywords: [],
    },
    logoTitle: "پانوتک",
    email: "ایمیل",
    submitBtn: "ارسال ایمیل",
    cancelBtn: "انصراف",

    status200: "ایمیل با موفقیت ارسال شد",
    status403: "دسترسی غیر مجاز",
    status404: "کاربری با این ایمیل ثبت نشده است",
    status500: "مشکلی در سرور پیش آمد.",

    api: {
      mailSubject: "پانوتک | تغییر رمز ورود",
      dearUser: "عزیز",
      hello: "با سلام و احترام",
      mailBody: "برای تغییر رمز ورود روی لینک زیر کلیک کنید",
    },
  },
  en: {
    metaData: {
      title: "Forgot Password",
      description: `Panotech website forgot password page`,
      keywords: [],
    },
    logoTitle: "Panotech",
    email: "Email",
    submitBtn: "Send Email",
    cancelBtn: "Cancel",

    status200: "Email sent successfully.",
    status403: "Access denied.",
    status404: "There is no registered user with this email address.",
    status500: "There was a problem with the server.",

    api: {
      mailSubject: "Panotech | Reset Password",
      dearUser: "Dear",
      hello: "Greetings and respect",
      mailBody: "Click on the link below to change your password",
    },
  },
  ar: {
    metaData: {
      title: "نسيت كلمة السر",
      description: `صفحة نسيت كلمة المرور لموقع پانوتک`,
      keywords: [],
    },
    logoTitle: "پانوتک",
    email: "بريد إلكتروني",
    submitBtn: "إرسال",
    cancelBtn: "إلغاء",

    status200: "تم إرسال البريد الإلكتروني بنجاح",
    status403: "تم الرفض",
    status404: "المستخدم غير مسجل بهذا البريد الإلكتروني",
    status500: "كانت هناك مشكلة مع الخادم.",

    api: {
      mailSubject: "های می | إعادة تعيين كلمة المرور",
      dearUser: "عزيزي",
      hello: "تحياتي واحترامي",
      mailBody: "انقر على الرابط أدناه لتغيير كلمة المرور الخاصة بك",
    },
  },
};

export const resetPassword = {
  fa: {
    metaData: {
      title: "بازیابی رمز ورود",
      description: `صفحه بازیابی رمز ورود سایت پانوتک`,
      keywords: [],
    },

    logoTitle: "پانوتک",
    password: "رمز ورود",
    confirmPassword: "تکرار رمز ورود",
    submitBtn: "تغییر رمز ورود",
    cancelBtn: "انصراف",

    status200: "رمز ورود با موفقیت تغییر کرد",
    status400: "توکن نامعتبر، لطفاً مجدداً تلاش کنید",
    status403: "دسترسی غیر مجاز",
    status500: "مشکلی در سرور پیش آمد.",
  },

  en: {
    metaData: {
      title: "Forgot Password",
      description: `Panotech website reset password page`,
      keywords: [],
    },

    logoTitle: "Panotech",
    password: "Password",
    confirmPassword: "Confirm Password",
    submitBtn: "Change Password",
    cancelBtn: "Cancel",

    status200: "Password changed successfully.",
    status400: "Invalid token, please try again.",
    status403: "Access denied.",
    status500: "There was a problem with the server.",
  },

  ar: {
    metaData: {
      title: "نسيت كلمة السر",
      description: `صفحة إعادة تعيين كلمة المرور لموقع پانوتک`,
      keywords: [],
    },

    logoTitle: "پانوتک",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    submitBtn: "تغيير كلمة المرور",
    cancelBtn: "إلغاء",

    status200: "تم تغيير كلمة المرور بنجاح",
    status400: "الرمز غير صالح، يرجى المحاولة مرة أخرى",
    status403: "تم الرفض",
    status500: "كانت هناك مشكلة مع الخادم.",
  },
};

export const orderTexts = {
  fa: {
    orderApi: {
      submitSubject: "پانوتک | ثبت سفارش جدید",
      statusSubject: "پانوتک | تغییر وضعیت سفارش",
      dearUser: "عزیز",
      hello: "با سلام و احترام",
      orderCode: "کد سفارش",
      submitText:
        "سفارش شما با موفقیت ثبت شد. همکاران ما در حال بررسی سفارش شما هستند. نتیجه از طریق ایمیل به شما اطلاع رسانی خواهد شد",
      inProgress:
        "همکاران ما در حال آماده‌سازی سفارش شما هستند. نتیجه از طریق ایمیل به شما اطلاع رسانی خواهد شد.",
      completed: "سفارش شما آماده شده است و به زودی به دست شما خواهد رسید.",
      thanks: "با تشکر",
      companyName: "پانوتک",
    },
  },
  en: {
    orderApi: {
      subject: "Panotech | Customizes product request",
      dearUser: "Dear",
      hello: "Greetings and respect",
      orderCode: "Order Code",

      submitText:
        "Your order has been successfully placed. Our colleagues are reviewing your order. You will be notified of the result via email",
      inProgress:
        "Our colleagues are preparing your order. You will be notified of the result via email.",
      completed: "Your order is ready and will be delivered to you soon.",
      thanks: "Thanks",
      companyName: "Panotech",
    },
  },
  ar: {
    orderApi: {
      subject: "نانو زیست پلمیر پارس | طلب منتج مخصص",
      dearUser: "عزيزي",
      hello: "تحياتي واحترامي",
      orderCode: "رمز الطلب",
      submitText:
        "لقد تم تقديم طلبك بنجاح. يقوم زملاؤنا بمراجعة طلبك. سيتم إعلامك بالنتيجة عبر البريد الإلكتروني",
      inProgress:
        "زملائنا يقومون بإعداد طلبك. سيتم إعلامك بالنتيجة عبر البريد الإلكتروني.",
      completed: "تم تجهيز طلبك وسيتم تسليمه لك قريبا",
      thanks: "شكرًا",
      companyName: "نانو زیست پلمیر پارس",
    },
  },
};

export const errorPage = {
  fa: {
    logoTitle: "پانوتک",
    errText: "متأسفانه مشکلی پیش آمده است. لطفاً مجدداً تلاش کنید.",
    resetBtn: "تلاش مجدد",
    homeBtn: "خانه",
  },
  en: {
    logoTitle: "Panotech",
    errText: "Sorry, something went wrong. Please try again.",
    resetBtn: "Try again",
    homeBtn: "Home",
  },
  ar: {
    logoTitle: "پانوتک",
    errText: "لسوء الحظ، كانت هناك مشكلة. يرجى المحاولة مرة أخرى.",
    resetBtn: "حاول ثانية",
    homeBtn: "الصفحة الرئيسية",
  },
};
