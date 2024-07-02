import { Slide, Fade } from "react-awesome-reveal";

const Hero = ({ searchesMade }) => {
  return (
    <div>
      {!searchesMade ? (
        <Fade>
          <div
            className="hero lg:w-full h-44 mb-12 font-playwrite"
            style={{
              backgroundImage: "url(./recipeHero.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <Slide direction="down" delay={100}>
                  <h1 className="mb-5 text-5xl tracking-wide text-white font-bold underline leading-relaxed">
                    Recipe Finder
                  </h1>
                </Slide>
              </div>
            </div>
          </div>
        </Fade>
      ) : (
        <div
          className="hero lg:w-full h-44 mb-12 font-playwrite"
          style={{
            backgroundImage: "url(./recipeHero.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl tracking-wide text-white font-bold underline leading-relaxed">
                Recipe Finder
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
