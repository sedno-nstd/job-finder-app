"use client";
import Image from "next/image";
import { Heart, MessageSquare, User, Search, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { vacancies } from "@/src/domain/vacancy/types";

const ACTIONS = [
  { id: "chats", icon: MessageSquare, href: "/chats", label: "Chats" },
  { id: "saved", icon: Heart, href: "/saved", label: "Saved" },
  { id: "profile", icon: User, href: "/profile", label: "Profile" },
];

export function HeaderNavigation() {
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [showSuggestions, setShowSuggestion] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const suggestion = useMemo(() => {
    if (title.length < 1) return [];

    const allTitles = vacancies.map((v) => v.title);
    const uniqueTitles = Array.from(new Set(allTitles));

    return uniqueTitles
      .filter((t) => t.toLowerCase().includes(title.toLowerCase()))
      .slice(0, 5);
  }, [title]);

  const selectSuggestion = (value: string) => {
    locationInputRef.current?.focus();
    setTitle(value);
    setShowSuggestion(false);
  };

  return (
    <div className="max-h-[80px] my-4 flex flex-row items-center">
      <div className="flex mx-8">
        <Image
          src="/images/HeaderNavigation/logo.png"
          width={110}
          height={40}
          alt="logo"
        />
      </div>
      <div className="mr-2 h-[48px] flex flex-row ">
        <div className="border-t flex flex-row relative border-b border-l hover:border-blue-600 focus-within:border-blue-600 border-[#a1afc1] rounded-l-md w-[820px]">
          <div className="flex items-center pl-2">
            <Search size={22} className="text-[#5a6f87]" />
          </div>
          <input
            className="text-[#5a6f87] h-full w-full px-3 outline-none"
            placeholder="I search vacancies..."
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setShowSuggestion(true);
            }}
          />

          <div className="absolute w-full top-6 ">
            {showSuggestions && suggestion.length > 0 && (
              <div className="absolute top-full pt-6 left-0 w-full">
                <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden py-2">
                  <ul className="flex flex-col">
                    {suggestion.map((title, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-0 border-gray-50"
                        onClick={() => selectSuggestion(title)}
                      >
                        <Search size={22} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center hover:border-blue-600 focus-within:border-blue-600 border-t border-b border-l border-[#a1afc1] w-[280px]">
          <div className="flex items-center pl-2 absolute">
            <MapPin size={22} className="text-[#5a6f87] select-none" />
          </div>
          <input
            ref={locationInputRef}
            className="text-[#5a6f87] h-full pl-10 w-full outline-none"
            placeholder="In region..."
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="flex items-center h-full">
          <button
            className={clsx(
              "cursor-pointer bg-[#0B64D9] hover:bg-[#0A58BF] duration-200 transition-all text-white px-3 rounded-r-md font-semibold h-full"
            )}
            onClick={() => {}}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-row px-5 items-center">
        {ACTIONS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="p-3 hover:bg-[#6380a61a] rounded-lg relative flex flex-row gap-2 text-[#5a6f87] hover:text-[#2d3540] font-medium"
          >
            <item.icon size={24} className="" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
