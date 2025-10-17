import SectionContainer from '../layouts/section-container';

const HeroSection = () => {
  return (
    <SectionContainer>
      <div className="mx-auto w-full space-y-1 py-5 text-center md:px-20">
        <h2 className="py-4 text-4xl font-bold text-foreground">Selamat datang di</h2>
        <div className="flex flex-col py-4">
          <h1 className="text-5xl font-bold text-foreground uppercase">Toko Resmi Kami Kevin Computers Shop </h1>
        </div>
        <p className="px-4 py-5 text-center text-lg text-foreground">
          Situs ini dipersiapkan sebagai pusat informasi dan pembelanjaan perangkat lunak untuk kebutuhan Anda. Anda dapat memilih dan membeli
          perangkat lunak terbaik yang sesuai dengan kebutuhan Anda.
        </p>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
