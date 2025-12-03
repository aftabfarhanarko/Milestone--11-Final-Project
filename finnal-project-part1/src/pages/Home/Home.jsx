import React from "react";
import Banner from "./HomeComponents/Banner";
import OurServices from "./HomeComponents/OurServices";
import Company from "./HomeComponents/Company";
import Safe from "./HomeComponents/Safe";
import SecondBanner from "./HomeComponents/SecondBanner";
import Work from "./HomeComponents/Work";
import TextSections from "./HomeComponents/TextSections";
import MenuCard from "./HomeComponents/MenuCard";


const reivewPromis = fetch("/reviews.json").then(res => res.json());
const Home = () => {
  return (
    <div className="px-0.5">
      <section className="my-10">
        <Banner></Banner>
      </section>
      <section className="my-20">
        <Work></Work>
      </section>

      <section className="my-20">
        <OurServices></OurServices>
      </section>
      <section className="my-20">
        <Company></Company>
      </section>

      <section className="my-20">
        <Safe></Safe>
      </section>
      <section className="my-20">
       <SecondBanner></SecondBanner>
      </section>
      <section className="my-20">
       <MenuCard reivewPromis={reivewPromis}></MenuCard>
      </section>
      <section className="my-20">
       <TextSections></TextSections>
      </section>
    </div>
  );
};

export default Home;
