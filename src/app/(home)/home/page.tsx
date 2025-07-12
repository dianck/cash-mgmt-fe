import BalanceSection from "@/components/section/balance";
import HelloSection from "@/components/section/hello";
import Wrapper from "@/components/wrapper";

export default async function Home() {



  return (
    <Wrapper>
      <div className="py-4 sm:py-8">
        <HelloSection />
        <BalanceSection />

        {/* <HeroSection data-cy="hero-section"/> */}
        {/* <EventSection />
        <DestinationSection /> */}
        {/* <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-300 md:my-2 text-shadow">
          Halaman Home <span className="text-green-700">Dengan Login</span>
        </h2> */}
        <div>
         
        </div>
      </div>
    </Wrapper>
  );
}
