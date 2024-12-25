"use client";

import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * props:
 *  - paperList: [{pdfName, MermaidList:[...], updatedAt?...}]
 *  - currentPaper: 현재 선택된 paper의 pdfName
 *  - onTabChange: (pdfName) => void
 */
export default function Tabs({ paperList, currentPaper, onTabChange }) {
  const router = useRouter();

  // paperList → 탭 항목
  const dynamicTabs = paperList.map((item) => ({
    name: item.pdfName,
    pdfName: item.pdfName,
    href: "#",
    current: item.pdfName === currentPaper,
  }));

  // 맨 끝에 Add paper
  const finalTabs = [
    ...dynamicTabs,
    {
      name: "+ Add a new paper",
      pdfName: "add-new",
      href: "/upload",
      current: false,
    },
  ];

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "add-new") {
      router.push("/upload");
    } else {
      onTabChange(selectedValue);
    }
  };

  const handleTabClick = (tab) => {
    if (tab.pdfName === "add-new") {
      router.push("/upload");
    } else {
      onTabChange(tab.pdfName);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-5 sm:pb-0">
      <br />
      <div className="mt-6 sm:mt-8">
        {/* 모바일 (select) */}
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            value={currentPaper || "add-new"}
            onChange={handleSelectChange}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base 
                       focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {finalTabs.map((tab) => (
              <option key={tab.pdfName} value={tab.pdfName}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        {/* 데스크탑 (nav) */}
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {finalTabs.map((tab) => (
              <button
                key={tab.pdfName}
                onClick={() => handleTabClick(tab)}
                aria-current={tab.current ? "page" : undefined}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}