const EmailBodyTemplate = (
  lang,
  subject,
  name,
  hello,
  body,
  thanks = "",
  link = "",
  orderCode = ""
) => {
  return `<div dir={${lang === "en" ? "ltr" : "rtl"}}>
      <div
        style="
          width: 600px;
          border-radius: 10px;
          margin: 50px auto;
          box-shadow: 0px 0px 5px 0px #2d7438;
          padding: 20px;
        ">
      <div style="text-align: center">
          <a
            href="https://panotech.ir"
            target="_blank"
            title="panotech.ir"
          >
            <img src="https://parsbiotech.ir/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FnanozistLogo.45ccfa3f.png&w=256&q=75" alt="logo" style="width: 150px" />
          </a>
        </div>
        <h1
          style="
            color: #2d7438;
            text-align: center;
          "
        >
          ${subject}
        </h1>
        <hr style="border-top: 1px solid #2d7438" />
        <div
          style={text-align:${
            lang === "en" ? "left" : "right"
          }; padding: 0 30px}
        >
          <h2 style="color: #2d7438;direction: ${
            lang === "en" ? "ltr" : "rtl"
          }; ">
            ${name}
          </h2>
          <h3 style="color: #2d7438;direction: ${
            lang === "en" ? "ltr" : "rtl"
          };">
            ${hello}
          </h3>
          <p
            style="
              color: #2d7438;
              font-weight: 700;
              font-size: 20px;
              text-align: justify;
              padding: 0 20px;
              direction: ${lang === "en" ? "ltr" : "rtl"};
            "
          >
            ${body}
          </p>
         
          <h3 style="color: #2d7438;direction: ${
            lang === "en" ? "ltr" : "rtl"
          }">
            ${orderCode}
          </h3>
          <h3 style="color: #2d7438;direction: ${
            lang === "en" ? "ltr" : "rtl"
          }">
            ${thanks}
          </h3>
          <h3 style="color: #2d7438;direction: ${
            lang === "en" ? "ltr" : "rtl"
          }">
            ${lang === "en" ? "Panotech" : "پانوتک"}
          </h3>
        </div>
        <a href="${link}" style="color: #2d7438" target="_blank">${link}</a>

      </div>
    </div>`;
};

export default EmailBodyTemplate;
