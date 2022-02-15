import "./about.scss";
import aboutImgDesktop from "../../assets/shared/desktop/image-best-gear.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about__info">
        <h2 className="heading-secondary">
          Bringing you the <span>best</span> audio gear
        </h2>
        <p className="text-primary">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className="about__img">
        <img src={aboutImgDesktop} alt="" />
      </div>
    </section>
  );
};

export default About;
