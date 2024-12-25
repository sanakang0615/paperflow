"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function VersionList({ selectedPaper }) {
  const [mermaidList, setMermaidList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!selectedPaper) {
      setMermaidList([]);
      return;
    }
    const storedData = sessionStorage.getItem("paperList");
    if (!storedData) {
      setMermaidList([]);
      return;
    }

    const parsed = JSON.parse(storedData);
    const found = parsed.find((item) => item.pdfName === selectedPaper);
    if (!found) {
      setMermaidList([]);
      return;
    }
    setMermaidList(found.MermaidList || []);
  }, [selectedPaper]);

  if (!selectedPaper) {
    return (
      <div className="mx-auto max-w-2xl mt-10 text-gray-500">
        No paper selected.
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-2 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Versions for "{selectedPaper}"
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Select a project version to view its graphs or create branches.
            </p>
          </div>
        </div>

        {mermaidList.length === 0 ? (
          <div className="mx-auto max-w-2xl px-2 lg:max-w-4xl lg:px-0 mt-10 text-gray-500">
            No versions found.
          </div>
        ) : (
          <div className="mt-16">
            <h2 className="sr-only">Version history</h2>
            <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
              <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {/* 하나의 카드에 버전 리스트 */}
                <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                  <div className="flex items-center border-b border-gray-200 p-4 sm:p-6">
                    <h3 className="text-base font-semibold text-gray-900">
                      Paper: {selectedPaper}
                    </h3>
                  </div>
                  <ul role="list" className="divide-y divide-gray-200">
                    {mermaidList.map((diagram, idx) => {
                      const versionName = `${selectedPaper} - v${idx + 1}`;
                      return (
                        <li key={idx} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-32 sm:w-32">
                              <img
                                alt={`Diagram version ${idx + 1}`}
                                src="/asset/paperweaver_1.png"
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-6 flex-1 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>{versionName}</h5>
                                <p className="mt-2 sm:mt-0">Seen</p>
                              </div>
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                This is the {idx + 1}-th version of the diagram.
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 sm:flex sm:justify-between">
                            <div className="flex items-center">
                              <CheckCircleIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-green-500"
                              />
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                {`Version ${idx + 1}`}
                              </p>
                            </div>

                            {/* 버튼들 */}
                            <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                              <div className="flex flex-1 justify-center">
                                <button
                                  onClick={() => {
                                    // View Graph → /done?paper=xxx&version=idx
                                    router.push(
                                      `/done?paper=${encodeURIComponent(
                                        selectedPaper
                                      )}&version=${idx}`
                                    );
                                  }}
                                  className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                >
                                  View Graph
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}