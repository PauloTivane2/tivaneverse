import { 
  Navbar, 
  Profile, 
  Expertise, 
  Projects, 
  Services, 
  Contact, 
  Footer 
} from "@/src/components"

export default function Home() {
  return (
    <main className="min-h-screen relative">
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
