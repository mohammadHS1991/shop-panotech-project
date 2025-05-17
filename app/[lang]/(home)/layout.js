import Footer from "../components/headerFooterComponents/Footer";
import Header from "../components/headerFooterComponents/Header";
import IslandContactUs from "../components/contactUsAboutComponents/ContactUs/IslandContactUs";



export default function HomeLayout({ children,params }) {
  return (
    
      <>
        {/* <Header lang={params.lang} /> */}
        <Header params={params} />
          {children}
        <Footer lang={params.lang}/>
        <IslandContactUs lang={params.lang}/>
      </>
  );
}
