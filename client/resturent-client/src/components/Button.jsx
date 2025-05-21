import React from "react";

export default function SlideArrowButton({
  text,
  primaryColor = "#F90806",
  className = "",
  ...props
}) {
  return (
    <div
      className={`group relative rounded-full border border-white bg-white p-2 text-xl font-semibold ${className}`}
      {...props}
    >
      <div
        className="absolute left-0 top-0 flex h-full w-11 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full"
        style={{ backgroundColor: primaryColor }}
      >
        <span className="mr-3 text-white transition-all duration-200 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 122.88"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M61.44,0A61.44,61.44,0,1,1,0,61.44,61.44,61.44,0,0,1,61.44,0Zm-10,58.05c3.28-2.23,4.93-5.16,4.65-11.85V29c0-2.4-4.4-2.69-4.62,0l-.16,14a2,2,0,1,1-3.93,0l.17-14.44c0-2.58-4.21-2.84-4.27,0,0,4-.16,10.43-.16,14.44a1.7,1.7,0,1,1-3.34,0L40,28.61a2.34,2.34,0,0,0-3.69-1.73c-1.55,1-1.24,3-1.3,4.65L34.43,48c.09,4.79,1.35,8.68,5.09,10.33a9.73,9.73,0,0,0,2.28.59L40.51,92.07a4.22,4.22,0,0,0,4.16,4.33h.52a4.75,4.75,0,0,0,4.67-4.87L48.73,58.91a7.17,7.17,0,0,0,2.74-.86ZM71.64,90.86,71.58,61.8c-12.65-7.31-8.62-35.46,4-35.31,15.38.18,17.2,31.73,4,35.2l1,29.32c.19,6.87-8.92,7.5-8.93-.15Z"
            />
          </svg>
        </span>
      </div>
      <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-black transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
        {text}
      </span>
    </div>
  );
}
