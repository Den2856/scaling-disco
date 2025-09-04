import Header from "../components/Header"
import Footer from "../components/Footer"
import Hero from "../components/home/Hero"
import ProgressBar from "../components/ui/ProgressBar"
import CommercialCoverflow from "../components/ui/commercial/CommercialSpotlight"
import Projects from "../components/ui/default/Projects"
import Skills from "../components/ui/skils/Skills"

export default function Home() {


  return (
    <>
      <ProgressBar />
      <Header />
      <Hero />
      <Skills />
      <CommercialCoverflow />
      <Projects />
      <Footer />
    </>

  )
}
