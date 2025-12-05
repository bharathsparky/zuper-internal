"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const navigation = [
  { name: "Customers", href: "#", current: true },
  { name: "Co-workers", href: "#", current: false },
  { name: "Migration", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
];

const regions = [
  "ap-southeast-2",
  "us-east-1",
  "us-west-2",
  "eu-west-1",
  "ap-south-1",
];

export default function Header() {
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("ap-southeast-2");

  return (
    <header className="bg-slate-800 pb-12">
      {/* Top Row - Logo and User */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="122"
              height="40"
              fill="none"
              viewBox="0 0 122 40"
            >
              <path
                d="M118.288 13.051v.328h-.933v2.431h-.376v-2.431h-.932v-.328h2.241zm.466 0h.535l.794 2.331.787-2.331h.522v2.759h-.345v-1.628-.279-.421l-.781 2.328h-.373l-.794-2.328v.086.307.307 1.628h-.345v-2.759zm-53.18 8.007c0 2.069-1.309 3.083-3.432 3.083s-3.432-1.034-3.432-3.083v-8.007h-2.921v8.379c0 3.524 2.603 5.372 6.364 5.372s6.363-1.848 6.363-5.372v-8.379h-2.931l-.01 8.007zm13.516-8.007h-7.762v13.772h2.994v-4.648h4.786c3.391 0 5.3-1.848 5.3-4.545s-1.909-4.579-5.317-4.579zm-.097 6.531h-4.689v-3.897h4.689c1.478 0 2.417.766 2.417 1.928-.014 1.217-.96 1.965-2.417 1.965v.003zm10.43-1.147v-2.769h8.58v-2.617H86.43v13.759h11.674v-2.531-.162h-6.298-2.382v-2.986h7.289v-2.693h-7.289zm19.459 3.323h.235c3.325 0 5.079-1.807 5.079-4.324 0-2.672-1.792-4.383-5.179-4.383h-8.228V26.81h2.994v-5.741l1.004.903 5.373 4.828h4.064l-5.607-5.041h.265zm-5.099-2.262v-3.814h4.899c1.516 0 2.521.745 2.521 1.886 0 1.2-1.036 1.928-2.521 1.928h-4.899zm-58.865 4.632l7.399-11.079H41.358l-1.733 2.617 7.31-.014-7.31 11.145 13.048.021 1.789-2.707-9.544.017z"
                fill="#FFF"
              />
              <g fill="#fd5000">
                <path d="M25.062 13.055l-6.336 9.614h5.107 1.55 5.11l6.339-9.614H25.062z" />
                <path d="M16.346 2.068L9.105 13.055h15.959l7.244-10.986H16.346z" />
              </g>
              <g fill="#FFF">
                <path d="M6.339 17.227L0 26.84h11.771l6.339-9.614H6.339z" />
                <path d="M11.771 26.84L4.527 37.826H20.49l7.244-10.986H11.771z" />
              </g>
            </svg>
          </a>

          {/* Right side - Region & User */}
          <div className="flex items-center gap-5">
            {/* Region Selector */}
            <div className="relative">
              <button
                onClick={() => setRegionMenuOpen(!regionMenuOpen)}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <span>{selectedRegion}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {regionMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        setSelectedRegion(region);
                        setRegionMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        region === selectedRegion
                          ? "text-indigo-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Avatar */}
            <button className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center ring-2 ring-gray-400">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Row - Inside dark header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mt-2">
        <nav className="flex items-center gap-3">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-all ${
                item.current
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Click outside to close menus */}
      {regionMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setRegionMenuOpen(false)}
        />
      )}
    </header>
  );
}
