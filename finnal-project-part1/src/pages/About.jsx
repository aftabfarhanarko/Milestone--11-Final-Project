"use client";

import React, { useState } from "react";

const tabs = [
  { id: "story", label: "Story" },
  { id: "mission", label: "Mission" },
  { id: "success", label: "Success" },
  { id: "team", label: " Others" },
];

const content = {
  story: ` 📘 ZapShift began with a simple but powerful question: How can delivery be made faster, smoother, and more predictable for everyone?
From day one, we saw the challenges people faced—slow delivery, missing parcels, unclear tracking, and inconsistent service.
What started as a small idea turned into a strong vision to change the logistics experience in Bangladesh.
In the early days, we operated with a minimal team, a handful of routes, and a belief that technology could transform the delivery landscape.
We listened closely to customers, understood their daily struggles, and shaped our system around real needs.
Every improvement we made added new life to our platform—from automated booking to real-time tracking.
As more individuals and businesses trusted us, ZapShift expanded its service centers across major districts.
We built a network that connects people, businesses, and opportunities with reliability and transparency.
Over time, we embraced data-driven operations, ensuring faster delivery routes and better decision-making.
Our story is rooted in innovation, but shaped by the customers who believed in us at every step.
The journey wasn’t always smooth, but every challenge made us better, sharper, and more committed.
At ZapShift, we don’t just deliver parcels—we deliver trust, speed, and satisfaction.
We believe a great delivery experience can change how businesses operate and how people connect.
Our growth reflects the dedication of our team, the feedback of our clients, and the impact we aim to create.
From a startup to a rising logistics platform, our evolution is built on ambition and passion.
We continue investing in new systems, expanding our coverage, and improving our services.
Each milestone becomes a reminder of how far we’ve come and how far we still want to go.
ZapShift stands today as a reliable partner for delivery needs across Bangladesh.
And still, this is just the beginning of our journey.
We are writing new chapters every day alongside the customers we serve.
Their stories, their needs, and their experiences shape who we become next.
Our story is more than a timeline—it’s a commitment to growth, trust, and innovation.
With each parcel delivered, we build stronger connections and a stronger future.
ZapShift is here to redefine logistics with heart, intelligence, and reliability.
We look ahead with confidence, knowing the best part of our story is yet to come.`,

  mission: `
🎯Our mission is simple yet powerful: to make delivery services smarter, faster, and easier for everyone.
We believe logistics shouldn’t be complicated—it should be seamless, reliable, and accessible.
ZapShift is committed to creating a delivery ecosystem that blends technology with human care.
We aim to offer accurate tracking, clear communication, and dependable service across all districts.
Our goal is to eliminate uncertainty from the delivery process and give customers full control.
Every system we build is designed to reduce delays, increase transparency, and improve efficiency.
We strive to make parcel movement smoother for individuals, SMEs, corporates, and e-commerce brands.
Our mission extends beyond basic delivery—we want to empower businesses with logistics intelligence.
We invest in modern software, trained teams, and optimized routes to maintain high performance.
Each innovation reflects our dedication to accuracy, speed, and continuous improvement.
We aim to expand our service centers, improve district coverage, and strengthen operational flow.
Customer trust is the heart of our mission, and every decision we make reflects that value.
ZapShift wants to ensure that every pickup and every drop-off feels effortless.
Our mission includes supporting local businesses with dependable logistics solutions.
We believe in affordability without compromising quality or safety.
We remain committed to creating a delivery platform that listens, learns, and evolves.
Building a nationwide network requires patience, planning, and passion—and we embrace all three.
Our service is driven by data, but powered by people who genuinely care.
We aim to set new standards in delivery reliability and customer experience.
Every day, we work to simplify logistics for families, entrepreneurs, and enterprises.
Our approach is not just operational—it is vision-driven and customer-first.
We want to redefine what people expect when they book a delivery.
ZapShift’s mission is to connect communities, support growth, and enable opportunities.
With every improvement, we move closer to becoming the most trusted delivery partner in Bangladesh.
We strive to build a future where deliveries are quick, clear, and worry-free.
Our mission doesn't end at delivering parcels—it continues with delivering satisfaction.
ZapShift is here to build a smarter logistics future for everyone.`,

  success: `🏆 
For ZapShift, success is not defined by numbers alone—it is defined by trust, consistency, and customer experience.
Our growth reflects the confidence that clients place in us every day.
We measure success by the reliability of our service and the satisfaction of our users.
Every successful delivery, every positive review, and every referral strengthens our foundation.
We built a system where customers know what to expect: speed, clarity, and care.
Our ability to deliver safely and on time forms the heart of our progress.
We have expanded our district coverage and created a strong network of service centers.
Our partnerships with SMEs, corporates, and e-commerce companies highlight our capability.
These collaborations show that businesses trust us to deliver at scale and with precision.
We have reduced delivery times significantly through route optimization and data insight.
Our success also comes from embracing modern technology early and effectively.
Thousands of parcels have been handled safely, earning long-term client loyalty.
Success is also measured by how smoothly our internal teams operate.
From pickup agents to customer support, every team member contributes to excellence.
We have overcome challenges, improved systems, and enhanced standards continuously.
Each obstacle we faced shaped our culture of resilience and innovation.
Our success is built on feedback—the more we listen, the more we improve.
We focus on creating meaningful impact rather than just completing deliveries.
Our accomplishments reflect smart planning, disciplined execution, and customer-first thinking.
We ensure transparency, accuracy, and consistency at every step.
As we grow, we maintain the reliability and care that built our reputation.
Success for ZapShift is not just today’s achievements but tomorrow’s potential.
We are committed to raising our standards with each passing year.
Our vision is to become the top delivery and logistics partner across the country.
Every milestone motivates us to set new goals and reach higher.
We celebrate our success, but we stay grounded in our mission.
ZapShift’s progress is a journey fueled by determination, trust, and innovation`,

  team: `✨ 
Beyond logistics, ZapShift represents innovation, responsibility, and long-term ambition.
We are continuously exploring new ways to enhance the delivery experience.
Our team works every day to improve booking flow, tracking accuracy, and overall usability.
We invest in research to introduce smarter tools, features, and automation.
District-based search, digital booking, and service center mapping are part of our expanded vision.
We focus heavily on building a platform that is simple, efficient, and future-ready.
Sustainability is another area we care about—optimizing routes reduces fuel use and travel time.
We value strong customer relationships and long-lasting partnerships.
Training programs ensure our staff stays skilled, professional, and customer-focused.
We also focus on user education, helping customers better understand logistics processes.
Our support team is dedicated to solving issues quickly and clearly.
As we grow, we evaluate new districts, new services, and new operational methods.
Innovation for us is not occasional—it’s a constant process.
We aim to introduce smart delivery notifications, improved dashboards, and advanced analytics.
The goal is to give businesses deeper insight into their logistics activities.
We believe in transparency—not only in tracking but in communication, pricing, and policy.
ZapShift also emphasizes accessibility; we want everyone to use delivery services with confidence.
From students to entrepreneurs, everyone deserves reliable logistics support.
Our long-term plans include expanding into rural areas to improve accessibility.
We aim to become a platform that empowers individuals and strengthens business operations.
Beyond features, we want to shape a responsible, modern logistics ecosystem.
We continue to learn from global practices and local challenges.
Our team works with dedication because we believe in the value we deliver.
ZapShift isn’t just another service—it’s a movement toward smarter delivery.
We dream of a Bangladesh where logistics is stress-free, fast, and transparent.
With every update and innovation, we take one more step toward that future.
We remain committed to excellence, growth, and meaningful impact.
For us, the “others” section isn’t additional—it’s an extension of everything we stand for.`,
};

export default function About() {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className=" min-h-screen">
      <section className="mx-auto max-w-5xl rounded-2xl bg-white p-8 md:p-15 shadow-lg my-20">
        {/* Header */}
        <div className="mb-8 ">
          <h2 className="mb-2 text-3xl font-bold text-secondary">About Us</h2>
          <p className="text-md  text-thried font-medium max-w-[420px]">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Tabs */}
        <div className="relative mb-8 border-b border-base-300">
          <div className="flex space-x-5  md:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 pb-3  text-md font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-lime-600"
                    : "text-secondary hover:text-gray-700"
                }`}
              >
                {/* Tick Mark - Only on Active Tab */}
                {activeTab === tab.id && (
                  <svg
                    className="h-4 w-4 text-lime-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                {/* Tab Label */}
                <span>{tab.label}</span>

                {/* Underline */}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-600"></span>
                )}
              </button>
            ))}
          </div>

          {/* Animated Underline (Optional - Keep if you want smooth slide) */}
        </div>

        {/* Content */}
        <div className=" text-thried leading-relaxed  ">
          <p className=" text-justify font-medium ">{content[activeTab]}</p>
        </div>
      </section>
    </div>
  );
}
// export default About;
