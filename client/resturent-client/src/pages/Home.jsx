import HeroSlider from "../components/ui/home/HeroSlider";
import ExploreMenu from "../components/ui/home/ExploreMenu";
import Menu from "../components/ui/home/Menu";

const heroImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1629390411759-66d56e76705c?q=80&w=2052&auto=format&fit=crop",
    heading: "Order your Favourite Food Here",
    description: "Choose from a diverse menu featuring a delectable..",
    buttonText: "View Menu",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1642574551546-c71ccd2e37f6?q=80&w=2070&auto=format&fit=crop",
    heading: "Delicious Meals Delivered",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  ",
    buttonText: "Order Now",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1728287506854-e3de67cbac24?q=80&w=2070&auto=format&fit=crop",
    heading: "Experience Fine Dining",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  .",
    buttonText: "Book a Table",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1642574551546-c71ccd2e37f6?q=80&w=2070&auto=format&fit=crop",
    heading: "Delicious Meals Delivered",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  ",
    buttonText: "Order Now",
  },
];

const Home = () => {
  return (
    <main className="w-full ">
      <HeroSlider images={heroImages} />
      <section className="mt-8 md:px-[3%] lg:px-[4%] xl:px-[5%]">
        <ExploreMenu />
        <hr className="border-t-2 border-gray-600 my-8" />
      </section>
      <section className="py-8 md:px-[3%] lg:px-[4%] xl:px-[5%]">
        <Menu />
      </section>
    </main>
  );
};

export default Home;
