"use client";
import {useCallback, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation} from "swiper/modules";

import BlurTextReveal from "../ui/BlurTextReveal";
import FadeInOnScroll from "../ui/FadeInOnScroll";
import WordShiftButton from "../ui/WordShiftButton";
import DividerPlus from "../ui/DividerPlus";
import TestimonialCard from "./TestimonialCard";
import {TestimonialsData} from "../../data/TestimonialsData";

export default function Testimonials({customClass = "", swiperOptions = {}, showBottomLine = false}) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // Navegação por título (ainda funciona)
  const handleCompanyClick = useCallback((companyIndex) => {
    // Encontra o primeiro depoimento daquele grupo
    let targetIndex = 0;
    for (let i = 0; i < TestimonialsData.length; i++) {
      if (TestimonialsData[i].companyName === TestimonialsData[companyIndex].companyName) {
        targetIndex = i;
        break;
      }
    }
    swiperRef.current?.slideToLoop(targetIndex);
  }, []);

  return (
    <section id="testimonials" className={`testimonials-section ${customClass}`.trim()}>
      <div className="testimonials-section__container">
        <div className="testimonials-section__header">
          <BlurTextReveal
            as="h2"
            text="História.dos.clientes"
            animationType="chars"
            stagger={0.05}
            className="testimonials-section__title"
          />

          <div className="testimonials-section__introWrap">
            <FadeInOnScroll delay={0.3}>
              <p className="testimonials-section__intro">
                Pequenos ou grandes projetos.
                <br /> A qualidade é a mesma.
              </p>
            </FadeInOnScroll>
          </div>
        </div>

        <div className="testimonials-section__divider">
          <DividerPlus
            customClass="testimonials-section__dividerInner"
            lineClass="testimonials-section__dividerLine"
            plusClass="testimonials-section__dividerPlus"
            iconColor="#272727"
          />
        </div>

        <div className="testimonials-section__main">
          <div className="testimonials-section__left">
            <div className="testimonial-company-list">
              {[...new Set(TestimonialsData.map((item) => item.companyName))].map((companyName, index) => {
                const isActive = TestimonialsData[activeIndex]?.companyName === companyName;
                return (
                  <button
                    key={companyName}
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    className={`testimonial-company-button ${isActive ? "is-active" : ""}`}
                    onClick={() => handleCompanyClick(index)}>
                    <span className="title">{companyName}</span>
                    <span className={`icon ${isActive ? "is-visible" : ""}`} aria-hidden="true">
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="testimonial-nav">
              <button
                type="button"
                className="custom-arrow left js-testimonials-prev"
                aria-label="Previous testimonial">
                <span className="arrow-icon">←</span>
              </button>
              <button type="button" className="custom-arrow right js-testimonials-next" aria-label="Next testimonial">
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </div>

          <div className="testimonials-section__swiperWrap">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation]}
              effect="fade"
              fadeEffect={{crossFade: true}}
              speed={600}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              navigation={{
                prevEl: ".js-testimonials-prev",
                nextEl: ".js-testimonials-next",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              className="testimonials-swiper swiper-row"
              {...swiperOptions}>
              {TestimonialsData.map((item, index) => (
                <SwiperSlide key={index} className="testimonial-slide">
                  <TestimonialCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="testimonials-section__cta">
              <WordShiftButton text="Traga o seu projeto →" target="_blank" href="https://wa.me/5516981984000" />
            </div>
          </div>
        </div>
      </div>

      {showBottomLine && (
        <div className="testimonials-section__bottomLine">
          <DividerPlus
            customClass="testimonials-section__dividerInner"
            lineClass="testimonials-section__dividerLine"
            plusClass="testimonials-section__dividerPlus"
            iconColor="#272727"
          />
        </div>
      )}
    </section>
  );
}
