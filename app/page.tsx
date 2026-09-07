import Advantages from "@/components/Advantages/Advantages";
import Container from "@/components/Container/Container";
import Hero from "@/components/Hero/Hero";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";

export default function Home() {
  return (
    <main>
      <Container>
        <ThemeSwitcher />

        <Hero />

        <Advantages />
      </Container>
    </main>
  );
}
