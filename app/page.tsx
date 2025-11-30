import LatestBlog from "./blogs/LatestBlogs";
import ContributionGraph from "./components/contributions/ContributionGraph";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import FeaturedProjects from "./components/projects/FeaturedProjects";
import SkillsMarquee from "./components/skills/SkillsMarquee";
import Container from "./components/ui/Container";

export default function Home() {
  return (
    <div>
      <main >
        <Container>
          <Hero />
          <SkillsMarquee />
          <FeaturedProjects />
          <LatestBlog />
          <ContributionGraph username="trev-sykes" />
          <Footer />
        </Container>
      </main>
    </div>
  );
}
