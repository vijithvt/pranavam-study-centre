
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const studentImages = [
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=480&q=80",
    alt: "Student using laptop on bed",
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=480&q=80",
    alt: "Learning with code on monitor",
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=480&q=80",
    alt: "Laptop turned on for online class",
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=480&q=80",
    alt: "Desk setup, MacBook with code, student study",
  },
  {
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=480&q=80",
    alt: "Person using MacBook Pro, remote learning",
  },
];

const HomeImageCarousel = () => (
  <section className="max-w-5xl mx-auto px-4 py-6">
    <h2 className="text-center font-bold text-2xl sm:text-3xl text-primary mb-6 animate-fade-in">
      See students learning online with Pranavam tutors
    </h2>
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="relative"
    >
      <CarouselContent className="gap-6">
        {studentImages.map((img, i) => (
          <CarouselItem
            key={img.url}
            className="basis-4/5 xs:basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="bg-white border rounded-2xl shadow-lg overflow-hidden hover-scale">
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-56 object-cover object-center"
                draggable={false}
                loading="lazy"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </section>
);

export default HomeImageCarousel;
