import * as Yup from "yup";

//*----------------------------------------------------cooperation Schema
export const cooperationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "نام نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام الزامی است")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام خانوادگی نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام خانوادگی نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام خانوادگی الزامی است")
    .lowercase(),

  job: Yup.string().max(65, "شغل باید حداکثر شامل 65 کاراکتر باشد"),
  // .required("شغل الزامی است")

  // .min(3, "شغل باید حداقل شامل 3 کاراکتر باشد")
  // .matches(
  //   /^(\p{L}+\s{0,1})+$/u,
  //   "شغل نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
  // )
  mobile: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "شماره موبایل وارد شده صحیح نیست"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "آدرس ایمیل معتبر نیست"
    )
    .required("آدرس ایمیل الزامی است"),

  message: Yup.string()
    .required("پیام الزامی است")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "پیام باید حداقل 10 کاراکتر باشد"),

  resume: Yup.mixed()
    .required("ارسال رزومه الزامی است")
    .test("fileFormat", "فایل رزومه باید با فرمت pdf باشد", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(file.name.split(".").pop());
        });
      }
      return true;
    })
    .test("fileSize", "حجم فایل باید کمتر از 1 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 1;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد فایل‌ها نباید بیشتر از 1 فایل باشد", (value) => {
      if (value) {
        return value.length <= 1;
      }
      return true;
    })
    .test("filesExist", "ارسال رزومه الزامی است", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("Captcha الزامی است"),
});
//*----------------------------------------------------/cooperation Schema

//*----------------------------------------------------question Schema
export const questionSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "نام نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام الزامی است")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام خانوادگی نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام خانوادگی نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام خانوادگی الزامی است")
    .lowercase(),

  job: Yup.string().max(65, "شغل باید حداکثر شامل 65 کاراکتر باشد"),
  // .required("شغل الزامی است")
  // .min(3, "شغل باید حداقل شامل 3 کاراکتر باشد")
  // .matches(
  //   /^(\p{L}+\s{0,1})+$/u,
  //   "شغل نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
  // )

  mobile: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "شماره موبایل وارد شده صحیح نیست"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "آدرس ایمیل معتبر نیست"
    )
    .required("آدرس ایمیل الزامی است"),

  message: Yup.string()
    .required("پیام الزامی است")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "پیام باید حداقل 10 کاراکتر باشد"),

  images: Yup.mixed()
    .test(
      "fileFormat",
      "فایل عکس باید با فرمت‌های jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("fileSize", "حجم فایل باید کمتر از 5 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 4 عکس باشد", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("Captcha الزامی است"),
});
//*----------------------------------------------------/question Schema

//*----------------------------------------------------custom Product Schema
export const customProductYupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "نام نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام الزامی است")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام خانوادگی نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام خانوادگی نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام خانوادگی الزامی است")
    .lowercase(),

  job: Yup.string()
    .max(65, "شغل باید حداکثر شامل 65 کاراکتر باشد")
    .min(3, "شغل باید حداقل شامل 3 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "شغل نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("شغل الزامی است"),

  mobile: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "شماره موبایل وارد شده صحیح نیست"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "آدرس ایمیل معتبر نیست"
    )
    .required("آدرس ایمیل الزامی است"),

  message: Yup.string()
    .required("پیام الزامی می‌باشد")
    .min(10, "پیام باید حداقل 10 کاراکتر باشد"),

  address: Yup.string()
    .required("آدرس الزامی است")
    .min(10, "آدرس نمی‌تواند کمتر از 10 کاراکتر باشد"),

  postalCode: Yup.string()
    .required("کد پستی الزامی است")
    .min(3, "کد پستی نمی‌تواند کمتر از 3 کاراکتر باشد"),
});
//*----------------------------------------------------/custom Product Schema

//*----------------------------------------------------custom Product Backend Schema
export const customProductBackendYupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "نام نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام الزامی است")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام خانوادگی نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام خانوادگی نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام خانوادگی الزامی است")
    .lowercase(),

  job: Yup.string()
    .max(65, "شغل باید حداکثر شامل 65 کاراکتر باشد")
    .min(3, "شغل باید حداقل شامل 3 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "شغل نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("شغل الزامی است"),

  mobile: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "شماره موبایل وارد شده صحیح نیست"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "آدرس ایمیل معتبر نیست"
    )
    .required("آدرس ایمیل الزامی است"),

  message: Yup.string()
    .required("پیام الزامی می‌باشد")
    .min(10, "پیام باید حداقل 10 کاراکتر باشد"),

  address: Yup.string()
    .required("آدرس الزامی است")
    .min(10, "آدرس نمی‌تواند کمتر از 10 کاراکتر باشد"),

  postalCode: Yup.string()
    .required("کد پستی الزامی است")
    .min(3, "کد پستی نمی‌تواند کمتر از 3 کاراکتر باشد"),

  files: Yup.mixed()
    .test("fileFormat", "فایل باید با فرمت‌های  pdf باشد", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(file.name.split(".").pop());
        });
      }
      return true;
    })
    .test("fileSize", "حجم فایل باید کمتر از 5 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد فایل‌ها نباید بیشتر از 4 عکس باشد", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),

  images: Yup.mixed()
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 5 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 4 عکس باشد", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    }),

  recaptcha: Yup.string().required("Captcha الزامی است"),
});
//*----------------------------------------------------/custom Product Backend Schema

//*----------------------------------------------------edit custom Product Status Schema
export const customProductEditStatusSchema = Yup.object().shape({
  status: Yup.string()
    .required("انتخاب وضعیت الزامی است")
    .oneOf(
      ["waiting", "inProgress", "completed", "rejected"],
      "وضعیت باید یکی از موارد تعیین شده باشد"
    ),
});
//*----------------------------------------------------/edit custom Product Status Schema

//*----------------------------------------------------edit order Status Schema
export const orderEditStatusSchema = Yup.object().shape({
  status: Yup.string()
    .required("انتخاب وضعیت الزامی است")
    .oneOf(
      ["waiting", "inProgress", "completed", "canceled"],
      "وضعیت باید یکی از موارد تعیین شده باشد"
    ),
});
//*----------------------------------------------------/edit custom Product Status Schema

//*----------------------------------------------------personal info Schema
export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "نام نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام الزامی است")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام خانوادگی نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام خانوادگی نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام خانوادگی الزامی است")
    .lowercase(),

  job: Yup.string()
    .max(65, "شغل نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .min(3, "شغل نمی‌تواند کمتر 3 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "شغل نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("شغل الزامی است"),

  mobile: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "شماره موبایل وارد شده صحیح نیست"),

  address: Yup.string()
    .required("آدرس الزامی است")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "آدرس نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "آدرس نمی‌تواند کمتر از 10 کاراکتر باشد"),

  field: Yup.string()
    .min(3, "رشته تحصیلی نمی‌تواند کمتر از 3 کاراکتر باشد")
    .max(65, "رشته تحصیلی نمی‌تواند کمتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "رشته تحصیلی نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    ),
  // .required("شغل الزامی می‌باشد"),

  postalCode: Yup.string()
    .required("کد پستی الزامی است")
    // .matches(
    //   /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
    //   "کد پستی وارد شده اشتباه است"
    // )
    .min(3, "کد پستی نمی‌تواند کمتر از 3 کاراکتر باشد"),
});
//*----------------------------------------------------/personal info Schema

//*----------------------------------------------------edit user role Schema
export const editUserRoleSchema = Yup.object().shape({
  role: Yup.string()
    .required("انتخاب نقش الزامی است")
    .oneOf(
      ["user", "admin", "operator"],
      "نقش باید یکی از موارد تعیین شده باشد"
    ),
});
//*----------------------------------------------------/edit user role Schema

//*----------------------------------------------------register Schema
export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "نام نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام الزامی است")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد")
    .max(65, "نام خانوادگی نمی‌تواند بیشتر از 65 کاراکتر باشد")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "نام خانوادگی نمی‌تواند شامل اعداد و کاراکترهای خاص باشد"
    )
    .required("نام خانوادگی الزامی است")
    .lowercase(),

  mobile: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "شماره موبایل وارد شده صحیح نیست"),

  email: Yup.string()
    .required("آدرس ایمیل الزامی است")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "آدرس ایمیل معتبر نیست"
    ),

  password: Yup.string()
    .required("رمز ورود الزامی است")
    .matches(/^[^آ-ی]+$/, "رمز ورود نمی‌تواند شامل حروف فارسی باشد")
    .min(8, "رمز ورود نمی‌تواند کمتر از 8 کاراکتر باشد"),
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد")
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(
  //   /(?=.*[!@#$%^&*])/,
  //   "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد"
  // ),

  confirmPassword: Yup.string()
    .required("تکرار رمز ورود الزامی است")
    .oneOf([Yup.ref("password"), null], "رمزهای ورود یکسان نیستند"),

  recaptcha: Yup.string().required("Captcha الزامی است"),
});
//*----------------------------------------------------/register Schema

//*----------------------------------------------------login Schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("آدرس ایمیل الزامی است")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "آدرس ایمیل معتبر نیست"
    ),

  password: Yup.string()
    .required("رمز ورود الزامی است")
    .matches(/^[^آ-ی]+$/, "رمز ورود نمی‌تواند شامل حروف فارسی باشد")
    .min(8, "رمز ورود نمی‌تواند کمتر از 8 کاراکتر باشد"),
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(/(?=.*[!@#$%^&*])/, "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد")
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد"),

  recaptcha: Yup.string().required("Captcha الزامی است"),
  // rememberMe: Yup.boolean(),
});
//*----------------------------------------------------/login Schema

//*----------------------------------------------------forgetPassword Schema
export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("آدرس ایمیل الزامی است")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "آدرس ایمیل معتبر نیست"
    ),
});
//*----------------------------------------------------/forgetPassword Schema

//*----------------------------------------------------resetPassword Schema
export const resetPasswordSchema = Yup.object().shape({
  // email: Yup.string()
  //   .required("آدرس ایمیل الزامی است")
  //   .matches(
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
  //     "آدرس ایمیل معتبر نیست"
  //   ),

  password: Yup.string()
    .required("رمز ورود الزامی است")
    .matches(/^[^آ-ی]+$/, "رمز ورود نمی‌تواند شامل حروف فارسی باشد")
    .min(8, "رمز ورود نمی‌تواند کمتر از 8 کاراکتر باشد"),
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(/(?=.*[!@#$%^&*])/, "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد")
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد"),

  confirmPassword: Yup.string()
    .required("تکرار رمز ورود الزامی است")
    .oneOf([Yup.ref("password"), null], "رمزهای ورود یکسان نیستند"),
});
//*----------------------------------------------------/resetPassword Schema

//*----------------------------------------------------createProduct Schema
export const createProductSchema = Yup.object().shape({
  faName: Yup.string()
    .min(2, "نام فارسی محصول نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "نام فارسی محصول نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("نام فارسی محصول الزامی است"),

  arName: Yup.string()
    .min(2, "نام عربی محصول نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "نام عربی محصول نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("نام عربی محصول الزامی است"),

  enName: Yup.string()
    .min(2, "نام انگلیسی محصول نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([A-Za-z0-9])+\s*)+$/,
    //   "نام انگلیسی محصول نمی‌تواند شامل حروف فارسی و کاراکترهای خاص باشد"
    // )
    .required("نام انگلیسی محصول الزامی است"),

  faSlug: Yup.string().required("اسلاگ فارسی محصول الزامی است"),

  arSlug: Yup.string().required("اسلاگ عربی محصول الزامی است"),

  enSlug: Yup.string().required("اسلاگ انگلیسی محصول الزامی است"),

  faFullDescription: Yup.string()
    .required("توضیحات کامل فارسی محصول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "توضیحات کامل فارسی محصول نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "توضیحات کامل فارسی محصول باید حداقل 10 کاراکتر باشد"),

  arFullDescription: Yup.string()
    .required("توضیحات کامل عربی محصول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "توضیحات کامل عربی محصول نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "توضیحات کامل عربی محصول باید حداقل 10 کاراکتر باشد"),

  enFullDescription: Yup.string()
    .required("توضیحات کامل انگلیسی محصول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "توضیحات کامل انگلیسی محصول نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "توضیحات کامل انگلیسی محصول باید حداقل 10 کاراکتر باشد"),

  faUseCases: Yup.string()
    .required("موارد مصرف فارسی محصول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "موارد مصرف فارسی محصول نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "موارد مصرف فارسی محصول باید حداقل 10 کاراکتر باشد"),

  arUseCases: Yup.string()
    .required("موارد مصرف عربی محصول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "موارد مصرف عربی محصول نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "موارد مصرف عربی محصول باید حداقل 10 کاراکتر باشد"),

  enUseCases: Yup.string()
    .required("موارد مصرف انگلیسی محصول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "موارد مصرف انگلیسی محصول نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "موارد مصرف انگلیسی محصول باید حداقل 10 کاراکتر باشد"),

  status: Yup.string().required("انتخاب وضعیت محصول الزامی است"),

  special: Yup.string().required("انتخاب وضعیت محصول الزامی است"),

  faPrice: Yup.string()
    .min(6, "قیمت محصول نمی‌تواند کمتر از 6 کاراکتر باشد")
    .required("قیمت محصول الزامی است")
    .matches(/^([1-9])([0-9])+$/, "قیمت محصول صحیح نیست"),

  enPrice: Yup.string()
    // .min(1, "قیمت محصول نمی‌تواند کمتر از 1 کاراکتر باشد")
    // .matches(/^([1-9])([0-9])+$/, "قیمت محصول صحیح نیست"),
    .required("قیمت محصول الزامی است"),

  qty: Yup.string()
    .matches(/^([1-9])([0-9])+$/, "تعداد محصول صحیح نیست")
    .required("تعداد محصول الزامی است"),

  images: Yup.mixed()
    .required("عکس محصول الزامی می‌باشد")
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 20 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 20;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 6 عکس باشد", (value) => {
      if (value) {
        return value.length <= 6;
      }
      return true;
    })
    .test("filesExist", "عکس محصول الزامی است", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    }),

  guideImages: Yup.mixed()
    .required("عکس راهنمای محصول الزامی می‌باشد")
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 20 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 20;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 3 عکس باشد", (value) => {
      if (value) {
        return value.length <= 3;
      }
      return true;
    })
    .test("filesExist", "عکس راهنمای محصول الزامی می‌باشد", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    }),

  guideVideos: Yup.mixed()
    // .required("فیلم راهنمای محصول الزامی می‌باشد")
    .test("filesFormat", "فیلم باید با فرمت mp4 باشد", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["mp4"];
          return supportedFormats.includes(file?.name.split(".").pop());
        });
      }
      return true;
    })
    .test("filesSize", "حجم فیلم باید کمتر از 50 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 50;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد فیلم نباید بیشتر از 3 فیلم باشد", (value) => {
      if (value) {
        return value.length <= 3;
      }
      return true;
    }),
  // .test("filesExist", "عکس راهنمای محصول الزامی می‌باشد", (value) => {
  //   if (value) {
  //     return value.length !== 0;
  //   }
  //   return true;
  // }),

  files: Yup.mixed()
    // .required("فایل‌های محصول الزامی می‌باشد")
    .test("filesFormat", "فایل‌ها باید با فرمت pdf باشد", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(file?.name.split(".").pop());
        });
      }
      return true;
    })
    .test("filesSize", "حجم فایل باید کمتر از 2 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 0.5;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد فایل‌ها نباید بیشتر از 3 فایل باشد", (value) => {
      if (value) {
        return value.length <= 3;
      }
      return true;
    }),
  // .test("filesExist", "فایل محصول الزامی می‌باشد", (value) => {
  //   if (value) {
  //     return value.length !== 0;
  //   }
  //   return true;
  // }),
});
//*----------------------------------------------------/createProduct Schema

//*----------------------------------------------------createEvent Schema
export const createEventSchema = Yup.object().shape({
  faTitle: Yup.string()
    .min(2, "عنوان فارسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان فارسی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان فارسی الزامی است"),

  arTitle: Yup.string()
    .min(2, "عنوان عربی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان عربی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان عربی الزامی است"),

  enTitle: Yup.string()
    .min(2, "عنوان انگلیسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([A-Za-z0-9])+\s*)+$/,
    //   "عنوان انگلیسی نمی‌تواند شامل حروف فارسی و کاراکترهای خاص باشد"
    // )
    .required("عنوان انگلیسی الزامی است"),

  faSlug: Yup.string().required("اسلاگ فارسی الزامی است"),

  arSlug: Yup.string().required("اسلاگ عربی الزامی است"),

  enSlug: Yup.string().required("اسلاگ انگلیسی الزامی است"),

  faFirstBody: Yup.string()
    .required("متن فارسی اول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن فارسی اول نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "متن فارسی اول باید حداقل 10 کاراکتر باشد"),

  arFirstBody: Yup.string()
    .required("متن عربی اول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن عربی اول نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "متن عربی اول باید حداقل 10 کاراکتر باشد"),

  enFirstBody: Yup.string()
    .required("متن انگلیسی اول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن انگلیسی اول نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "متن انگلیسی اول باید حداقل 10 کاراکتر باشد"),

  faSecondBody: Yup.string()
    .required("متن فارسی دوم الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن فارسی دوم نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "متن فارسی دوم باید حداقل 10 کاراکتر باشد"),

  arSecondBody: Yup.string()
    .required("متن عربی دوم الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن عربی دوم نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "متن عربی دوم باید حداقل 10 کاراکتر باشد"),

  enSecondBody: Yup.string()
    .required("متن انگلیسی دوم الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن انگلیسی دوم نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "متن انگلیسی دوم باید حداقل 10 کاراکتر باشد"),

  // faKeyword: Yup.array().of(
  //   Yup.string()
  //     .min(2, "کلمه کلیدی باید حداقل 2 کاراکتر باشد")
  //     .matches(
  //       /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
  //       "کلمه کلیدی نمی‌تواند شامل کاراکترهای خاص باشد"
  //     )
  // ),

  // enKeyword: Yup.array().of(
  //   Yup.string()
  //     .min(2, "کلمه کلیدی باید حداقل 2 کاراکتر باشد")
  //     .matches(
  //       /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
  //       "کلمه کلیدی نمی‌تواند شامل کاراکترهای خاص باشد"
  //     )
  // ),

  // arKeyword: Yup.array().of(
  //   Yup.string()
  //     .min(2, "کلمه کلیدی باید حداقل 2 کاراکتر باشد")
  //     .matches(
  //       /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
  //       "کلمه کلیدی نمی‌تواند شامل کاراکترهای خاص باشد"
  //     )
  // ),

  status: Yup.string().required("انتخاب وضعیت الزامی است"),

  images: Yup.mixed()
    .required("عکس رویداد الزامی می‌باشد")
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 20 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 20;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 1 عکس باشد", (value) => {
      if (value) {
        return value.length <= 1;
      }
      return true;
    })
    .test("filesExist", "عکس رویداد الزامی است", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    }),
});
//*----------------------------------------------------/createEvent Schema

//*----------------------------------------------------createNews Schema
export const createNewsSchema = Yup.object().shape({
  faTitle: Yup.string()
    .min(2, "عنوان فارسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان فارسی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان فارسی الزامی است"),

  arTitle: Yup.string()
    .min(2, "عنوان عربی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان عربی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان عربی الزامی است"),

  enTitle: Yup.string()
    .min(2, "عنوان انگلیسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([A-Za-z0-9])+\s*)+$/,
    //   "عنوان انگلیسی نمی‌تواند شامل حروف فارسی و کاراکترهای خاص باشد"
    // )
    .required("عنوان انگلیسی الزامی است"),

  faSlug: Yup.string().required("اسلاگ فارسی الزامی است"),

  arSlug: Yup.string().required("اسلاگ عربی الزامی است"),

  enSlug: Yup.string().required("اسلاگ انگلیسی الزامی است"),

  faFirstBody: Yup.string()
    .required("متن فارسی اول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن فارسی اول نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "متن فارسی اول باید حداقل 10 کاراکتر باشد"),

  arFirstBody: Yup.string()
    .required("متن عربی اول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن عربی اول نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "متن عربی اول باید حداقل 10 کاراکتر باشد"),

  enFirstBody: Yup.string()
    .required("متن انگلیسی اول الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن انگلیسی اول نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "متن انگلیسی اول باید حداقل 10 کاراکتر باشد"),

  faSecondBody: Yup.string()
    .required("متن فارسی دوم الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن فارسی دوم نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "متن فارسی دوم باید حداقل 10 کاراکتر باشد"),

  arSecondBody: Yup.string()
    .required("متن عربی دوم الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن عربی دوم نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "متن عربی دوم باید حداقل 10 کاراکتر باشد"),

  enSecondBody: Yup.string()
    .required("متن انگلیسی دوم الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن انگلیسی دوم نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "متن انگلیسی دوم باید حداقل 10 کاراکتر باشد"),

  category: Yup.string().required("انتخاب دسته‌بندی الزامی است"),

  status: Yup.string().required("انتخاب وضعیت الزامی است"),

  images: Yup.mixed()
    .required("عکس خبر الزامی می‌باشد")
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 20 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 20;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 1 عکس باشد", (value) => {
      if (value) {
        return value.length <= 1;
      }
      return true;
    })
    .test("filesExist", "عکس خبر الزامی است", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    }),

  videos: Yup.mixed()
    // .required("فیلم خبر الزامی می‌باشد")
    .test("filesFormat", "فیلم باید با فرمت  mp4 باشد", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["mp4"];
          return supportedFormats.includes(file?.name.split(".").pop());
        });
      }
      return true;
    })
    .test("filesSize", "حجم فیلم باید کمتر از 50 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 50;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد فیلم نباید بیشتر از 1 فیلم باشد", (value) => {
      if (value) {
        return value.length <= 1;
      }
      return true;
    }),
  // .test("filesExist", "فیلم خبر الزامی است", (value) => {
  //   if (value) {
  //     return value.length !== 0;
  //   }
  //   return true;
  // }),
});
//*----------------------------------------------------/createNews Schema

//*----------------------------------------------------createGallery Schema
export const createGallerySchema = Yup.object().shape({
  faTitle: Yup.string()
    .min(2, "عنوان فارسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان فارسی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان فارسی الزامی است"),

  arTitle: Yup.string()
    .min(2, "عنوان عربی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان عربی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان عربی الزامی است"),

  enTitle: Yup.string()
    .min(2, "عنوان انگلیسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([A-Za-z0-9])+\s*)+$/,
    //   "عنوان انگلیسی نمی‌تواند شامل حروف فارسی و کاراکترهای خاص باشد"
    // )
    .required("عنوان انگلیسی الزامی است"),

  faSlug: Yup.string().required("اسلاگ فارسی الزامی است"),

  arSlug: Yup.string().required("اسلاگ عربی الزامی است"),

  enSlug: Yup.string().required("اسلاگ انگلیسی الزامی است"),

  status: Yup.string().required("انتخاب وضعیت الزامی است"),

  images: Yup.mixed()
    // .required("عکس الزامی می‌باشد")
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 20 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 20;
        });
      }
      return true;
    }),
  // .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 15 عکس باشد", (value) => {
  //   if (value) {
  //     return value.length <= 15;
  //   }
  //   return true;
  // })
  // .test("filesExist", "عکس الزامی است", (value) => {
  //   if (value) {
  //     return value.length !== 0;
  //   }
  //   return true;
  // })
  videos: Yup.mixed()
    .test("filesFormat", "فیلم باید با فرمت  mp4 باشد", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["mp4"];
          return supportedFormats.includes(file?.name.split(".").pop());
        });
      }
      return true;
    })
    .test("filesSize", "حجم فیلم باید کمتر از 50 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 50;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد فیلم نباید بیشتر از 3 فیلم باشد", (value) => {
      if (value) {
        return value.length <= 3;
      }
      return true;
    }),
  // .test("filesExist", "فیلم خبر الزامی است", (value) => {
  //   if (value) {
  //     return value.length !== 0;
  //   }
  //   return true;
  // }),
});
//*----------------------------------------------------/createGallery Schema

//*----------------------------------------------------createSelectedGallery Schema
export const createSelectedGallerySchema = Yup.object().shape({
  images: Yup.mixed()
    .required("عکس الزامی می‌باشد")
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 20 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 20;
        });
      }
      return true;
    })
    // .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 15 عکس باشد", (value) => {
    //   if (value) {
    //     return value.length <= 15;
    //   }
    //   return true;
    // })
    .test("filesExist", "عکس الزامی است", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    }),
});
//*----------------------------------------------------/createSelectedGallery Schema

//*----------------------------------------------------FAQuestions Schema
export const createFAQuestionSchema = Yup.object().shape({
  faTitle: Yup.string()
    .min(2, "عنوان فارسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9؟?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "عنوان فارسی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان فارسی الزامی است"),

  arTitle: Yup.string()
    .min(2, "عنوان عربی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9؟?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "عنوان عربی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان عربی الزامی است"),

  enTitle: Yup.string()
    .min(2, "عنوان انگلیسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "عنوان انگلیسی نمی‌تواند شامل حروف فارسی و کاراکترهای خاص باشد"
    // )
    .required("عنوان انگلیسی الزامی است"),

  faBody: Yup.string()
    .required("متن فارسی الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن فارسی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "متن فارسی باید حداقل 10 کاراکتر باشد"),

  arBody: Yup.string()
    .required("متن عربی الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن عربی نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "متن عربی باید حداقل 10 کاراکتر باشد"),

  enBody: Yup.string()
    .required("متن انگلیسی الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن انگلیسی نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "متن انگلیسی باید حداقل 10 کاراکتر باشد"),

  status: Yup.string().required("انتخاب وضعیت الزامی است"),
});
//*----------------------------------------------------/FAQuestions Schema
export const createTechProductSchema = Yup.object().shape({
  faTitle: Yup.string()
    .min(2, "عنوان فارسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان فارسی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان فارسی الزامی است"),

  arTitle: Yup.string()
    .min(2, "عنوان عربی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([a-zA-Zآ-ی0-9])+\s*)+$/,
    //   "عنوان عربی نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .required("عنوان عربی الزامی است"),

  enTitle: Yup.string()
    .min(2, "عنوان انگلیسی نمی‌تواند کمتر از 2 کاراکتر باشد")
    // .matches(
    //   /^(([A-Za-z0-9])+\s*)+$/,
    //   "عنوان انگلیسی نمی‌تواند شامل حروف فارسی و کاراکترهای خاص باشد"
    // )
    .required("عنوان انگلیسی الزامی است"),

  faBody: Yup.string()
    .required("متن فارسی الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن فارسی اول نمی‌تواند شامل کاراکترهای خاص باشد"
    // )
    .min(10, "متن فارسی باید حداقل 10 کاراکتر باشد"),

  arBody: Yup.string()
    .required("متن عربی الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Zآ-ی0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن عربی اول نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "متن عربی باید حداقل 10 کاراکتر باشد"),

  enBody: Yup.string()
    .required("متن انگلیسی الزامی می‌باشد")
    // .matches(
    //   /^([a-zA-Z0-9?><;,.()[\]\-_+=!@%\^&*']*\s?)+$/,
    //   "متن انگلیسی اول نمی‌تواند شامل حروف فارسی باشد "
    // )
    .min(10, "متن انگلیسی باید حداقل 10 کاراکتر باشد"),

  status: Yup.string().required("انتخاب وضعیت الزامی است"),

  link: Yup.string()
    .min(2, "لینک نمی‌تواند کمتر از 2 کاراکتر باشد")
    .matches(
      /^([a-zA-Z0-9?><;:,.()[\]\-_+=!@%\/^&*#']*\s?)+$/,
      "لینک نمی‌تواند شامل کاراکترهای خاص باشد"
    )
    .required("عنوان فارسی الزامی است"),

  image: Yup.mixed()
    .required("عکس رویداد الزامی می‌باشد")
    .test(
      "filesFormat",
      "عکس باید با فرمت‌های  jpg, jpeg, png باشد",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg"];
            return supportedFormats.includes(file?.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("filesSize", "حجم عکس باید کمتر از 20 مگابایت باشد", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 20;
        });
      }
      return true;
    })
    .test("filesCount", "تعداد عکس‌ها نباید بیشتر از 1 عکس باشد", (value) => {
      if (value) {
        return value.length <= 1;
      }
      return true;
    })
    .test("filesExist", "عکس رویداد الزامی است", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    }),
});

//*----------------------------------------------------addProductCommentSchema
export const addProductCommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required("نظر الزامی می‌باشد")
    .min(10, "نظر باید حداقل 10 کاراکتر باشد"),
});
//*----------------------------------------------------/addProductCommentSchema

//*----------------------------------------------------editProductCommentSchema
export const editProductCommentSchema = Yup.object().shape({
  status: Yup.string().required("انتخاب وضعیت الزامی است"),
});
//*----------------------------------------------------/editProductCommentSchema
