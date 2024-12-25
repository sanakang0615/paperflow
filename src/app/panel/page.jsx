"use client";

import { useState, useEffect } from "react";
import { GradientBackground } from "@/components/gradient";
import { Container } from "@/components/container";
import { Heading, Lead } from "@/components/text";
import { Navbar } from "@/components/navbar";
import Tabs from "@/components/tabs";
import VersionList from "@/components/version-list";

export default function Panel() {
  const [paperList, setPaperList] = useState([]);
  const [currentPaper, setCurrentPaper] = useState("");
  const [enhancedRatio, setEnhancedRatio] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("—");
  const [paperCount, setPaperCount] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("paperList");
    if (stored) {
      const list = JSON.parse(stored);
      setPaperList(list);

      // 첫 번째 paper 기본 선택
      if (list.length > 0) {
        setCurrentPaper(list[0].pdfName);
      }

      // Paper Count
      const totalPapers = list.length;
      setPaperCount(totalPapers);

      // Enhanced Ratio = 2개 이상 버전이 있는 paper / 전체 paper
      const enhancedCount = list.filter(
        (item) => item.MermaidList && item.MermaidList.length > 1
      ).length;
      const ratio =
        totalPapers > 0
          ? Math.round((enhancedCount / totalPapers) * 100)
          : 0;
      setEnhancedRatio(ratio);

      // Last Updated (paper.updatedAt 중 가장 최근)
      let newestDate = 0;
      list.forEach((paper) => {
        if (paper.updatedAt) {
          const t = new Date(paper.updatedAt).getTime();
          if (t > newestDate) newestDate = t;
        }
      });
      if (newestDate) {
        const dateStr = new Date(newestDate).toLocaleString();
        setLastUpdated(dateStr);
      }
    }
  }, []);

  const handleTabChange = (pdfName) => {
    setCurrentPaper(pdfName);
  };

  // 통계 (Paper Count, Enhanced Ratio, Last Updated)
  const stats = [
    {
      name: "Paper Count",
      stat: paperCount,
    },
    {
      name: "Enhanced Ratio",
      stat: enhancedRatio + "%",
    },
    {
      name: "Last Updated",
      stat: lastUpdated,
    },
  ];

  return (
    <main className="overflow-hidden bg-gray-50 min-h-screen">
      <GradientBackground />
      <Container>
        <Navbar />
        <Heading as="h1" className="mt-20 text-center">
          Research Control Hub
        </Heading>
        <Lead className="mt-6 mb-14 max-w-3xl mx-auto text-center text-gray-700">
          Track progress, manage versions, and collaborate efficiently.
        </Lead>

        {/* 통계 3개 */}
        <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500 animate-smooth-fade-in">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 animate-smooth-fade-in">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs
            paperList={paperList}
            currentPaper={currentPaper}
            onTabChange={handleTabChange}
          />
        </div>

        {/* 현재 선택된 Paper의 버전 목록 */}
        <VersionList selectedPaper={currentPaper} />
      </Container>

      <div className="isolate flex justify-center p-6"></div>
    </main>
  );
}