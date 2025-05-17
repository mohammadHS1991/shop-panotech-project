import * as Yup from "yup";

//*----------------------------------------------------cooperation Schema
export const arCooperationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأول أقل من حرفين")
    .max(65, "لا يمكن أن يتجاوز الاسم الأول 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأول على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأول مطلوب")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأخير أقل من حرفين")
    .max(65, "لا يمكن أن يكون الاسم الأخير أطول من 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأخير على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأخير مطلوب")
    .lowercase(),

  job: Yup.string().max(65, "لا يمكن أن تكون الوظيفة أطول من 65 حرفًا"),
  // .min(3, "لا يمكن أن تقل الوظيفة عن 3 أحرف")
  // .required("مطلوب وظيفة")
  // .matches(
  //   /^(\p{L}+\s{0,1})+$/u,
  //   "لا يمكن أن تحتوي الوظيفة على أرقام أو أحرف خاصة"
  // ),

  mobile: Yup.string()
    // .required("رقم الجوال مطلوب")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "رقم الجوال المدخل غير صحيح"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "البريد الإلكتروني غير صالح"
    )
    .required("البريد الإلكتروني مطلوب"),

  message: Yup.string()
    .required("الرسالة مطلوبة")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "لا يمكن أن تقل الرسالة عن 10 أحرف"),

  resume: Yup.mixed()
    .required("يجب تقديم السيرة الذاتية")
    .test("fileFormat", "يجب أن يكون ملف السيرة الذاتية بصيغة pdf", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(file.name.split(".").pop());
        });
      }
      return true;
    })
    .test("fileSize", "يجب أن يكون حجم الملف أقل من 1 مغابايت", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 1;
        });
      }
      return true;
    })
    .test("filesCount", "يجب ألا يتجاوز عدد الملفات ملف واحد", (value) => {
      if (value) {
        return value.length <= 1;
      }
      return true;
    })
    .test("filesExist", "يجب تقديم السيرة الذاتية", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("مطلوب الكابتشا"),
});
//*----------------------------------------------------/cooperation Schema

//*----------------------------------------------------question Schema
export const arQuestionSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأول أقل من حرفين")
    .max(65, "لا يمكن أن يتجاوز الاسم الأول 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأول على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأول مطلوب")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأخير أقل من حرفين")
    .max(65, "لا يمكن أن يكون الاسم الأخير أطول من 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأخير على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأخير مطلوب")
    .lowercase(),

  job: Yup.string().max(65, "لا يمكن أن تكون الوظيفة أطول من 65 حرفًا"),
  // .min(3, "لا يمكن أن تقل الوظيفة عن 3 أحرف")
  // .matches(
  //   /^(\p{L}+\s{0,1})+$/u,
  //   "لا يمكن أن تحتوي الوظيفة على أرقام أو أحرف خاصة"
  // ),

  mobile: Yup.string()
    // .required("رقم الجوال مطلوب")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "رقم الجوال المدخل غير صحيح"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "البريد الإلكتروني غير صالح"
    )
    .required("البريد الإلكتروني مطلوب"),

  message: Yup.string()
    .required("الرسالة مطلوبة")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "لا يمكن أن تقل الرسالة عن 10 أحرف"),

  images: Yup.mixed()
    .test("fileFormat", "يجب أن تكون الصورة بصيغة jpg، jpeg، png", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["jpg", "png", "jpeg"];
          return supportedFormats.includes(file.name.split(".").pop());
        });
      }
      return true;
    })
    .test("fileSize", "يجب أن يكون حجم الصورة أقل من 5 مغابايت", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "يجب ألا يتجاوز عدد الصور 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("مطلوب الكابتشا"),
});
//*----------------------------------------------------/question Schema

//*----------------------------------------------------custom Product Schema
export const arCustomProductYupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأول أقل من حرفين")
    .max(65, "لا يمكن أن يتجاوز الاسم الأول 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأول على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأول مطلوب")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأخير أقل من حرفين")
    .max(65, "لا يمكن أن يكون الاسم الأخير أطول من 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأخير على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأخير مطلوب")
    .lowercase(),

  job: Yup.string()
    .min(3, "لا يمكن أن تقل الوظيفة عن 3 أحرف")
    .max(65, "لا يمكن أن تكون الوظيفة أطول من 65 حرفًا")
    .required("مطلوب وظيفة")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن تحتوي الوظيفة على أرقام أو أحرف خاصة"
    ),

  mobile: Yup.string()
    // .required("رقم الجوال مطلوب")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "رقم الجوال المدخل غير صحيح"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "البريد الإلكتروني غير صالح"
    )
    .required("البريد الإلكتروني مطلوب"),

  message: Yup.string()
    .required("الرسالة مطلوبة")
    .min(10, "لا يمكن أن تقل الرسالة عن 10 أحرف"),

  address: Yup.string()
    .required("العنوان مطلوب")
    .min(10, "لا يمكن أن يكون العنوان أقل من 10 أحرف"),

  postalCode: Yup.string()
    .required("الرمز البريدي مطلوب")
    .min(3, "لا يمكن أن يكون الرمز البريدي أقل من 3 أحرف"),

  files: Yup.mixed()
    .test(
      "fileFormat",
      "يجب أن تكون الملفات بصيغة pdf، jpg، jpeg، png",
      (value) => {
        if (value) {
          return value.every((file) => {
            const supportedFormats = ["jpg", "png", "jpeg", "pdf"];
            return supportedFormats.includes(file.name.split(".").pop());
          });
        }
        return true;
      }
    )
    .test("fileSize", "يجب أن يكون حجم الملف أقل من 5 مغابايت", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "يجب ألا يتجاوز عدد الملفات 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("مطلوب الكابتشا"),
});
//*----------------------------------------------------/custom Product Schema

//*----------------------------------------------------custom Product Backend Schema
export const arCustomProductBackendYupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأول أقل من حرفين")
    .max(65, "لا يمكن أن يتجاوز الاسم الأول 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأول على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأول مطلوب")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأخير أقل من حرفين")
    .max(65, "لا يمكن أن يكون الاسم الأخير أطول من 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأخير على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأخير مطلوب")
    .lowercase(),

  job: Yup.string()
    .min(3, "لا يمكن أن تقل الوظيفة عن 3 أحرف")
    .max(65, "لا يمكن أن تكون الوظيفة أطول من 65 حرفًا")
    .required("مطلوب وظيفة")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن تحتوي الوظيفة على أرقام أو أحرف خاصة"
    ),

  mobile: Yup.string()
    // .required("رقم الجوال مطلوب")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "رقم الجوال المدخل غير صحيح"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "البريد الإلكتروني غير صالح"
    )
    .required("البريد الإلكتروني مطلوب"),

  message: Yup.string()
    .required("الرسالة مطلوبة")

    .min(10, "لا يمكن أن تقل الرسالة عن 10 أحرف"),

  address: Yup.string()
    .required("العنوان مطلوب")
    .min(10, "لا يمكن أن يكون العنوان أقل من 10 أحرف"),

  postalCode: Yup.string()
    .required("الرمز البريدي مطلوب")
    .min(3, "لا يمكن أن يكون الرمز البريدي أقل من 3 أحرف"),

  files: Yup.mixed()
    .test("fileFormat", "يجب أن يكون الملف بصيغة pdf", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(file.name.split(".").pop());
        });
      }
      return true;
    })
    .test("fileSize", "يجب أن يكون حجم الملف أقل من 5 مغابايت", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "يجب ألا يتجاوز عدد الملفات 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),

  images: Yup.mixed()
    .test("filesFormat", "يجب أن تكون الصورة بصيغة jpg، jpeg، png", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["jpg", "png", "jpeg"];
          return supportedFormats.includes(file?.name.split(".").pop());
        });
      }
      return true;
    })
    .test("filesSize", "يجب أن يكون حجم الصورة أقل من 5 مغابايت", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "يجب ألا يتجاوز عدد الصور 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    }),

  recaptcha: Yup.string().required("مطلوب الكابتشا"),
});
//*----------------------------------------------------/custom Product Backend Schema

//*----------------------------------------------------personal info Schema
export const arPersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأول أقل من حرفين")
    .max(65, "لا يمكن أن يتجاوز الاسم الأول 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأول على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأول مطلوب")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأخير أقل من حرفين")
    .max(65, "لا يمكن أن يكون الاسم الأخير أطول من 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأخير على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأخير مطلوب")
    .lowercase(),

  job: Yup.string()
    .min(3, "لا يمكن أن تقل الوظيفة عن 3 أحرف")
    .max(65, "لا يمكن أن تكون الوظيفة أطول من 65 حرفًا")
    .required("مطلوب وظيفة")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن تحتوي الوظيفة على أرقام أو أحرف خاصة"
    ),

  mobile: Yup.string()
    // .required("رقم الجوال مطلوب")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "رقم الجوال المدخل غير صحيح"),

  address: Yup.string()
    .required("العنوان مطلوب")
    .min(10, "لا يمكن أن يكون العنوان أقل من 10 أحرف"),

  field: Yup.string()
    .min(3, "لا يمكن أن يقل مجال الدراسة عن 3 أحرف")
    .max(65, "لا يجوز أن يتجاوز مجال الدراسة 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يجوز أن يحتوي مجال الدراسة على أرقام أو أحرف خاصة"
    ),

  postalCode: Yup.string()
    .required("الرمز البريدي مطلوب")
    .min(3, "لا يمكن أن يكون الرمز البريدي أقل من 3 أحرف"),
});
//*----------------------------------------------------/personal info Schema
//*----------------------------------------------------register Schema
export const arRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأول أقل من حرفين")
    .max(65, "لا يمكن أن يتجاوز الاسم الأول 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأول على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأول مطلوب")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "لا يمكن أن يكون الاسم الأخير أقل من حرفين")
    .max(65, "لا يمكن أن يكون الاسم الأخير أطول من 65 حرفًا")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "لا يمكن أن يحتوي الاسم الأخير على أرقام أو أحرف خاصة"
    )
    .required("الاسم الأخير مطلوب")
    .lowercase(),

  mobile: Yup.string()
    // .required("رقم الجوال مطلوب")
    .matches(/^[1-9]{1}[\d]{8,10}$/, "رقم الجوال المدخل غير صحيح"),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "البريد الإلكتروني غير صالح"
    )
    .required("البريد الإلكتروني مطلوب"),

  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .matches(
      /^[^آ-ی]+$/,
      "لا يمكن أن تحتوي كلمة المرور على أحرف فارسية أو عربية"
    )
    .min(8, "لا يمكن أن تقل كلمة المرور عن 8 أحرف"),
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد")
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(
  //   /(?=.*[!@#$%^&*])/,
  //   "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد"
  // ),

  confirmPassword: Yup.string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("password"), null], "كلمات المرور ليست هي نفسها"),

  recaptcha: Yup.string().required("مطلوب الكابتشا"),
});
//*----------------------------------------------------/register Schema

//*----------------------------------------------------login Schema
export const arLoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "البريد الإلكتروني غير صالح"
    )
    .required("البريد الإلكتروني مطلوب"),

  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .matches(
      /^[^آ-ی]+$/,
      "لا يمكن أن تحتوي كلمة المرور على أحرف فارسية أو عربية"
    )
    .min(8, "لا يمكن أن تقل كلمة المرور عن 8 أحرف"),
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(/(?=.*[!@#$%^&*])/, "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد")
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد"),

  recaptcha: Yup.string().required("مطلوب الكابتشا"),
  // rememberMe: Yup.boolean(),
});
//*----------------------------------------------------/login Schema

//*----------------------------------------------------forgetPassword Schema
export const arForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "البريد الإلكتروني غير صالح"
    )
    .required("البريد الإلكتروني مطلوب"),
});
//*----------------------------------------------------/forgetPassword Schema

//*----------------------------------------------------resetPassword Schema
export const arResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .matches(
      /^[^آ-ی]+$/,
      "لا يمكن أن تحتوي كلمة المرور على أحرف فارسية أو عربية"
    )
    .min(8, "لا يمكن أن تقل كلمة المرور عن 8 أحرف"),
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(/(?=.*[!@#$%^&*])/, "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد")
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد"),

  confirmPassword: Yup.string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("password"), null], "كلمات المرور ليست هي نفسها"),
});
//*----------------------------------------------------/resetPassword Schema

//*----------------------------------------------------addProductCommentSchema
export const arAddProductCommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required("التعليق مطلوبة")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "لا يمكن أن تقل التعليق عن 10 أحرف"),
});
//*----------------------------------------------------/addProductCommentSchema
