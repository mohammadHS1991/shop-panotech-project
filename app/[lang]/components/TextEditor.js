"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  FontBackgroundColor,
  FontColor,
  // FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  // MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Style,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  // TextPartLanguage,
  TodoList,
  Underline,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import "./TextEditor.css";
import { vazirFD } from "../fonts/font";
const TextEditor = ({ name, label, formik, lang = "fa" }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);
  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }
    return {
      editorConfig: {
        language: lang,
        toolbar: {
          items: [
            "sourceEditing",
            // "textPartLanguage",
            "|",
            "heading",
            "style",
            "|",
            "fontSize",
            // "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "specialCharacters",
            "link",
            // "mediaEmbed",
            "insertTable",
            "highlight",
            "blockQuote",
            "htmlEmbed",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        plugins: [
          Alignment,
          AutoImage,
          Autosave,
          BlockQuote,
          Bold,
          CloudServices,
          Essentials,
          FontBackgroundColor,
          FontColor,
          // FontFamily,
          FontSize,
          FullPage,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          // MediaEmbed,
          Mention,
          Paragraph,
          PasteFromOffice,
          SourceEditing,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Style,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          // TextPartLanguage,
          TodoList,
          Underline,
        ],
        // fontFamily: {
        //   supportAllValues: true,
        // },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            // {
            //   model: "heading1",
            //   view: "h1",
            //   title: "Heading 1",
            //   class: "ck-heading_heading1",
            // },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ],
            },
          ],
        },
        // placeholder: "Type or paste your content here!",
        style: {
          definitions: [
            {
              name: "Article category",
              element: "h3",
              classes: ["category"],
            },
            {
              name: "Title",
              element: "h2",
              classes: ["document-title"],
            },
            {
              name: "Subtitle",
              element: "h3",
              classes: ["document-subtitle"],
            },
            {
              name: "Info box",
              element: "p",
              classes: ["info-box"],
            },
            {
              name: "Side quote",
              element: "blockquote",
              classes: ["side-quote"],
            },
            {
              name: "Marker",
              element: "span",
              classes: ["marker"],
            },
            {
              name: "Spoiler",
              element: "span",
              classes: ["spoiler"],
            },
            {
              name: "Code (dark)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-dark"],
            },
            {
              name: "Code (bright)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-bright"],
            },
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);
  return (
    <div className="main-container !w-full">
      <label htmlFor={name} className={`${vazirFD.className} text-sm`}>
        {label}
      </label>
      <div
        className="editor-container editor-container_classic-editor editor-container_include-style"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor prose prose-strong:text-inherit !max-w-full">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                id={name}
                editor={ClassicEditor}
                config={editorConfig}
                data={formik.values[name]}
                onChange={(e, editor) =>
                  formik.setFieldValue(name, editor.getData())
                }
              />
            )}
          </div>
        </div>
        <p className={`text-xs mt-2 text-warning ${vazirFD.className}`}>
          {formik.errors[name]}
        </p>
      </div>
    </div>
  );
};

export default TextEditor;
