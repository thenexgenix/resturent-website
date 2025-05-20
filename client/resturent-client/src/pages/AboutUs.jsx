import React from 'react';
import Hero from '../components/ui/about-us/Hero';
import Story from '../components/ui/about-us/Story';
import Team from './../components/ui/about-us/Team';
import History from './../components/ui/about-us/History';
import Location from './../components/ui/about-us/location';

const AboutUs = () => {
    return (
        <>
            <section>
                <Hero/>
                <Story/>
                <Team/>
                <History/>
                <Location/>
            </section>
        </>
    );
};

export default AboutUs;