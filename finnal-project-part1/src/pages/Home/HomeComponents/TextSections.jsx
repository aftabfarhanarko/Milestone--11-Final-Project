import React from "react";

const TextSections = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-secondary ">
          Frequently Asked Question (FAQ)
        </h1>
        <p className="text-md font-medium text-thried max-w-[450px] mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div className="max-w-6xl px-4 mx-auto mt-12 space-y-5">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300
         ">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How does this posture corrector work?
          </div>
          <div className="collapse-content font-medium text-sm hover:border-t hover:border-base-300 pt-5">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>

        <div className="collapse  collapse-arrow bg-base-100 border border-base-300 ">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Is it suitable for all ages and body types?
          </div>
          <div className="collapse-content font-medium text-sm hover:border-t hover:border-base-300 pt-5">
            This question asks whether something can be safely used or enjoyed
            by people of all ages, from children to the elderly. It also
            considers whether it suits all body types, meaning it can
            accommodate different shapes and sizes comfortably. The purpose is
            to ensure that everyone can use it without risk of harm or
            discomfort. If it is suitable for all ages and body types, it is
            considered inclusive, adaptable, and safe for a wide range of users.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Does it really help with back pain and posture improvement?
          </div>
          <div className="collapse-content font-medium text-sm hover:border-t hover:border-base-300 pt-5">
            This question asks whether the product, activity, or method is
            genuinely effective in reducing back pain and improving posture. It
            seeks to know if using it can relieve discomfort, strengthen the
            back, or correct alignment over time. The aim is to ensure that it
            provides real benefits rather than just being a temporary or
            cosmetic solution. A positive answer indicates that it can
            contribute to better spinal health and overall body posture.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Does it have smart features like vibration alerts?
          </div>
          <div className="collapse-content font-medium text-sm hover:border-t hover:border-base-300 pt-5">
            This question asks whether the product includes advanced or “smart”
            functionalities, such as vibration alerts. It seeks to know if it
            can provide notifications, reminders, or feedback automatically to
            the user. The focus is on features that enhance convenience,
            interactivity, or usability beyond basic functions. A product with
            such smart features is considered more modern, responsive, and
            user-friendly.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Does it really help with back pain and posture improvement?
          </div>
          <div className="collapse-content font-medium text-sm hover:border-t hover:border-base-300 pt-5">
            This question asks about the method or process used to inform
            customers once a product becomes available again. It seeks to know
            whether notifications will be sent via email, SMS, app alerts, or
            other communication channels. The purpose is to ensure that
            interested buyers don’t miss the opportunity to purchase the item.
            Clear notification methods make it easier for customers to stay
            updated and act quickly when the product is restocked.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSections;
