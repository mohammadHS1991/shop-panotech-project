import * as Yup from "yup";

//*----------------------------------------------------cooperation Schema
export const enCooperationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "FirstName cannot be less than 2 characters")
    .max(65, "FirstName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "FirstName cannot contain numbers or special characters"
    )
    .required("FirstName is required")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "LastName cannot be less than 2 characters")
    .max(65, "LastName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "LastName cannot contain numbers or special characters"
    )
    .required("LastName is required.")
    .lowercase(),

  job: Yup.string().max(65, "Job cannot be longer than 65 characters"),
  // .min(3, "Job cannot be less than 3 characters")
  //   .required("Job is required.")
  //   .matches(
  //     /^(\p{L}+\s{0,1})+$/u,
  //     "Job cannot contain numbers or special characters"
  //   ),

  mobile: Yup.string()
    // .required("Mobile number is required")
    .matches(
      /^[1-9]{1}[\d]{8,10}$/,
      "The mobile number entered is not correct"
    ),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "The email is not valid"
    )
    .required("Email is required"),

  message: Yup.string()
    .required("Message is required")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "Message cannot be less than 10 characters"),

  resume: Yup.mixed()
    .required("Submitting a resume is required")
    .test("fileFormat", "The resume file must be in pdf format", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(file.name.split(".").pop());
        });
      }
      return true;
    })
    .test("fileSize", "File size must be less than 1 mb", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 1;
        });
      }
      return true;
    })
    .test(
      "filesCount",
      "The number of files should not exceed 1 file.",
      (value) => {
        if (value) {
          return value.length <= 1;
        }
        return true;
      }
    )
    .test("filesExist", "Submitting a resume is required", (value) => {
      if (value) {
        return value.length !== 0;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("Captcha is required"),
});
//*----------------------------------------------------/cooperation Schema

//*----------------------------------------------------question Schema
export const enQuestionSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "FirstName cannot be less than 2 characters")
    .max(65, "FirstName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "FirstName cannot contain numbers or special characters"
    )
    .required("FirstName is required")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "LastName cannot be less than 2 characters")
    .max(65, "LastName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "LastName cannot contain numbers or special characters"
    )
    .required("LastName is required")
    .lowercase(),

  job: Yup.string().max(65, "Job cannot be longer than 65 characters"),
  // .min(3, "Job cannot be less than 3 characters")
  // .matches(
  //   /^(\p{L}+\s{0,1})+$/u,
  //   "Job cannot contain numbers or special characters"
  // ),

  mobile: Yup.string()
    // .required("Mobile number is required")
    .matches(
      /^[1-9]{1}[\d]{8,10}$/,
      "The mobile number entered is not correct"
    ),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "The email is not valid"
    )
    .required("Email is required"),

  message: Yup.string()
    .required("Message is required")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "Message cannot be less than 10 characters"),

  images: Yup.mixed()
    .test(
      "fileFormat",
      "The image file must be in jpg, jpeg, png formats",
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
    .test("fileSize", "Image size must be less than 5 mb", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "The number of images should not exceed 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("Captcha is required"),
});
//*----------------------------------------------------/question Schema

//*----------------------------------------------------custom Product Schema
export const enCustomProductYupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "FirstName cannot be less than 2 characters")
    .max(65, "FirstName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "FirstName cannot contain numbers or special characters"
    )
    .required("FirstName is required")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "LastName cannot be less than 2 characters")
    .max(65, "LastName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "LastName cannot contain numbers or special characters"
    )
    .required("LastName is required")
    .lowercase(),

  job: Yup.string()
    .min(3, "Job cannot be less than 3 characters")
    .max(65, "Job cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "Job cannot contain numbers or special characters"
    )
    .required("Job is required"),

  mobile: Yup.string()
    // .required("Mobile number is required")
    .matches(
      /^[1-9]{1}[\d]{8,10}$/,
      "The mobile number entered is not correct"
    ),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "The email is not valid"
    )
    .required("Email is required"),

  message: Yup.string()
    .required("Message is required")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "Message cannot be less than 10 characters"),

  address: Yup.string()
    .required("Address is required")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "Address cannot contain numbers or special characters"
    // )
    .min(10, "Address cannot be less than 10 characters"),

  postalCode: Yup.string()
    .required("Postal Code is required")
    // .matches(
    //   /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
    //   "کد پستی وارد شده اشتباه است"
    // )
    .min(3, "Postal Code cannot be less than 3 characters"),

  files: Yup.mixed()
    .test(
      "fileFormat",
      "The files must be in pdf, jpg, jpeg, png formats",
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
    .test("fileSize", "File size must be less than 5 mb", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "The number of files should not exceed 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),
  recaptcha: Yup.string().required("Captcha is required"),
});
//*----------------------------------------------------/custom Product Schema

//*----------------------------------------------------custom Product Backend Schema
export const enCustomProductBackendYupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "FirstName cannot be less than 2 characters")
    .max(65, "FirstName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "FirstName cannot contain numbers or special characters"
    )
    .required("FirstName is required")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "LastName cannot be less than 2 characters")
    .max(65, "LastName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "LastName cannot contain numbers or special characters"
    )
    .required("LastName is required")
    .lowercase(),

  job: Yup.string()
    .min(3, "Job cannot be less than 3 characters")
    .max(65, "Job cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "Job cannot contain numbers or special characters"
    )
    .required("Job is required"),

  mobile: Yup.string()
    // .required("Mobile number is required")
    .matches(
      /^[1-9]{1}[\d]{8,10}$/,
      "The mobile number entered is not correct"
    ),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "The email is not valid"
    )
    .required("Email is required"),

  message: Yup.string()
    .required("Message is required")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "پیام نمی‌تواند شامل کاراکترهای خاص باشد "
    // )
    .min(10, "Message cannot be less than 10 characters"),

  address: Yup.string()
    .required("Address is required")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "Address cannot contain numbers or special characters"
    // )
    .min(10, "Address cannot be less than 10 characters"),

  postalCode: Yup.string()
    .required("Postal Code is required")
    // .matches(
    //   /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
    //   "کد پستی وارد شده اشتباه است"
    // )
    .min(3, "Postal Code cannot be less than 3 characters"),

  files: Yup.mixed()
    .test("fileFormat", "The file must be in pdf format", (value) => {
      if (value) {
        return value.every((file) => {
          const supportedFormats = ["pdf"];
          return supportedFormats.includes(file.name.split(".").pop());
        });
      }
      return true;
    })
    .test("fileSize", "File size must be less than 5 mb", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "The number of files should not exceed 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    })
    .nullable(),

  images: Yup.mixed()
    .test(
      "filesFormat",
      "The image must be in jpg, jpeg, png formats",
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
    .test("filesSize", "Image size must be less than 5 mb", (value) => {
      if (value) {
        return value.every((file) => {
          return file.size <= 1024 * 1024 * 5;
        });
      }
      return true;
    })
    .test("filesCount", "The number of images should not exceed 4", (value) => {
      if (value) {
        return value.length <= 4;
      }
      return true;
    }),

  recaptcha: Yup.string().required("Captcha is required"),
});
//*----------------------------------------------------/custom Product Backend Schema

//*----------------------------------------------------personal info Schema
export const enPersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "FirstName cannot be less than 2 characters")
    .max(65, "FirstName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "FirstName cannot contain numbers or special characters"
    )
    .required("FirstName is required")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "LastName cannot be less than 2 characters")
    .max(65, "LastName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "LastName cannot contain numbers or special characters"
    )
    .required("LastName is required")
    .lowercase(),

  job: Yup.string()
    .min(3, "Job cannot be less than 3 characters")
    .max(65, "Job cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "Job cannot contain numbers or special characters"
    )
    .required("Job is required"),

  mobile: Yup.string()
    // .required("Mobile number is required")
    .matches(
      /^[1-9]{1}[\d]{8,10}$/,
      "The mobile number entered is not correct"
    ),

  address: Yup.string()
    .required("Address is required")
    // .matches(
    //   /^[^|\<>[\]{}`\\()';&$]+$/,
    //   "Address cannot contain numbers or special characters"
    // )
    .min(10, "Address cannot be less than 10 characters"),

  field: Yup.string()
    .min(3, "Field of study cannot be less than 3 characters")
    .max(65, "Field of study cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "Field of study cannot contain numbers or special characters"
    ),

  postalCode: Yup.string()
    .required("Postal Code is required")
    // .matches(
    //   /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
    //   "کد پستی وارد شده اشتباه است"
    // )
    .min(3, "Postal Code cannot be less than 3 characters"),
});
//*----------------------------------------------------/personal info Schema
//*----------------------------------------------------register Schema
export const enRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "FirstName cannot be less than 2 characters")
    .max(65, "FirstName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "FirstName cannot contain numbers or special characters"
    )
    .required("FirstName is required")
    .lowercase(),

  lastName: Yup.string()
    .min(2, "LastName cannot be less than 2 characters")
    .max(65, "LastName cannot be longer than 65 characters")
    .matches(
      /^(\p{L}+\s{0,1})+$/u,
      "LastName cannot contain numbers or special characters"
    )
    .required("LastName is required")
    .lowercase(),

  mobile: Yup.string()
    // .required("Mobile number is required")
    .matches(
      /^[1-9]{1}[\d]{8,10}$/,
      "The mobile number entered is not correct"
    ),

  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "The email is not valid"
    )
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[^آ-ی]+$/,
      "The password cannot contain Persian or Arabic letters."
    )
    .min(8, "Password cannot be less than 8 characters"),
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد")
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(
  //   /(?=.*[!@#$%^&*])/,
  //   "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد"
  // ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "The passwords are not the same."),

  recaptcha: Yup.string().required("Captcha is required"),
});
//*----------------------------------------------------/register Schema

//*----------------------------------------------------login Schema
export const enLoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "The email is not valid"
    )
    .required("Email is required"),

  password: Yup.string()
    .required("رمز ورود الزامی است")
    .matches(/^[^آ-ی]+$/, "رمز ورود نمی‌تواند شامل حروف فارسی باشد")
    .min(8, "رمز ورود نمی‌تواند کمتر از 8 کاراکتر باشد"),
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(/(?=.*[!@#$%^&*])/, "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد")
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد"),

  recaptcha: Yup.string().required("Captcha is required"),
  // rememberMe: Yup.boolean(),
});
//*----------------------------------------------------/login Schema

//*----------------------------------------------------forgetPassword Schema
export const enForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
      "The email is not valid"
    )
    .required("Email is required"),
});
//*----------------------------------------------------/forgetPassword Schema

//*----------------------------------------------------resetPassword Schema
export const enResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[^آ-ی]+$/,
      "The password cannot contain Persian or Arabic letters."
    )
    .min(8, "Password cannot be less than 8 characters"),
  // .matches(/(?=.*[a-z])/, "رمز ورود باید حداقل شامل یک حرف کوچک باشد")
  // .matches(/(?=.*[A-Z])/, "رمز ورود باید حداقل شامل یک حرف بزرگ باشد")
  // .matches(/(?=.*[0-9])/, "رمز ورود باید حداقل شامل یک عدد باشد")
  // .matches(/(?=.*[!@#$%^&*])/, "رمز ورود باید حداقل شامل یک کاراکتر خاص باشد")
  // .max(64, "رمز ورود نمی‌تواند بیشتر از 64 کاراکتر باشد"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "The passwords are not the same."),
});
//*----------------------------------------------------/resetPassword Schema

//*----------------------------------------------------addProductCommentSchema
export const enAddProductCommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Comment is required")
    .min(10, "Comment cannot be less than 10 characters"),
});
//*----------------------------------------------------/addProductCommentSchema
