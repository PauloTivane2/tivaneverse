import { 
  Navbar, 
  Profile, 
  Expertise, 
  Projects, 
  Services, 
  Contact, 
  Footer 
} from "@/src/components"
import { MatrixRainStatic } from "@/src/components/effects/MatrixRain"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Matrix Rain Effect - Background */}
      <MatrixRainStatic intensity={40} speed={3} />
      
      {/* Content */}
      <Navbar />
      <Profile />
      <Expertise />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
