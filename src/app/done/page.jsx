"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/utils/pdfWorkerPolyfill";
import { getCompletion } from "@/components/openai-helper";
import { GradientBackground } from "@/components/gradient";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Heading } from "@/components/text";
import MermaidComponent from "@/components/mermaid-component";

export default function Done() {
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);

  const router = useRouter();

  // 시스템 프롬프트 예시


  useEffect(() => {
    // 세션 스토리지에서 최근 업로드된 파일명, 텍스트, 다이어그램 불러오기
    const savedFilename = sessionStorage.getItem("filename");
    if (savedFilename) {
      setFilename(savedFilename);
    }
    const storedContent = sessionStorage.getItem("content");
    if (storedContent) {
      setContent(storedContent);
    }
    const storedMermaidCode = sessionStorage.getItem("mermaidCode");
    if (storedMermaidCode) {
      setMermaidCode(storedMermaidCode);
    }
  }, []);

  // 업그레이드 시: GPT에게 mermaid 코드를 새로 받아옴
  const handleUpgrade = async () => {
    setLoadingUpgrade(true);
    try {
      const userPrompt = `Please provide the updated Mermaid Diagram code. The content was: \`${content}\`, and the diagram was: \`\`\`${mermaidCode}`;
      const response = await getCompletion("gpt-4o-mini", upgradeSystemPrompt, userPrompt, apiKey);

      // 새로 받아온 mermaid 코드를 추출
      const newMermaidCode = extractMermaidDiagram(response);
      // 상태에 반영
      setMermaidCode(newMermaidCode);

      // **버전 이력에도 추가** (세션 스토리지)
      addUpgradeVersion(filename, newMermaidCode);

      setLoadingUpgrade(false);
    } catch (error) {
      console.error("Error generating Mermaid diagram:", error);
      setLoadingUpgrade(false);
    }
  };

  // 응답에서 mermaid 코드만 추출
  function extractMermaidDiagram(text) {
    // 백틱 3개로 둘러싸인 코드 블록만 추출
    const pattern = /```(.*?)```/gs;
    const diagrams = [...text.matchAll(pattern)].map((match) => match[1]);

    if (diagrams.length === 0) return text;

    let cleaned = diagrams[0].trim();
    if (cleaned.startsWith("mermaid")) {
      cleaned = cleaned.slice("mermaid".length).trim();
    }
    return cleaned;
  }

  /**
   * [핵심] 이미 존재하는 pdfName에 새 버전을 추가
   */
  const addUpgradeVersion = (pdfName, upgradedMermaidCode) => {
    let storedData = sessionStorage.getItem("paperList");
    let paperList = storedData ? JSON.parse(storedData) : [];

    const existingPaperIndex = paperList.findIndex((item) => item.pdfName === pdfName);
    if (existingPaperIndex >= 0) {
      // 기존 paper의 버전 목록에 새 mermaid 추가
      paperList[existingPaperIndex].MermaidList.push(upgradedMermaidCode);
    } else {
      // 혹시나 기존이 없으면 새로 추가
      paperList.push({
        pdfName,
        MermaidList: [upgradedMermaidCode],
      });
    }

    // 저장
    sessionStorage.setItem("paperList", JSON.stringify(paperList));
    // 세션 스토리지 최신값 업데이트
    sessionStorage.setItem("mermaidCode", upgradedMermaidCode);
  };

  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <Container>
        <Navbar />
        <Heading as="h1" className="mt-20 text-center mb-6">Your Paper Flow</Heading>
        {/* API Key 입력 */}
        <div className="mb-12">
          <label
            htmlFor="api-key"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            API Key
          </label>
          <input
            id="api-key"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="divide-y mt-18 divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex flex-col items-center">
          <div className="px-4 py-5 sm:px-6 text-center font-semibold text-lg">
            {/* 파일명 표시 */}
            {"📄 " + filename}
          </div>
          <div
            className="flex justify-center items-center w-full h-full"
            style={{ minHeight: "100vh" }}
          >
            <div className="my-12 w-full max-w-4xl">
              <MermaidComponent
                mermaidCode={mermaidCode}
                id="paper-diagram"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          {/* 우측 하단 패널(업그레이드 버튼 등) */}
          <div className="flex flex-col items-center w-full space-y-6" />
          <div
            className="fixed right-6 bottom-20 isolate flex flex-col items-stretch w-64 
              rounded-2xl bg-white shadow-2xl border border-gray-300"
            style={{ zIndex: 50 }}
          >
            {/* 헤더 */}
            <div
              className="px-6 py-3 text-center text-lg font-semibold tracking-wider text-white 
                rounded-t-2xl bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80"
            >
              More Options
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center px-6 py-4 bg-white text-gray-900 
                         font-semibold text-base tracking-wide hover:bg-gray-100 
                         focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out"
              disabled={loadingUpgrade}
              onClick={handleUpgrade}
            >
              {loadingUpgrade ? "Loading..." : "Upgrade with AI ✨"}
            </button>
            <div className="border-t border-gray-300"></div>
            <button
              type="button"
              className={`inline-flex items-center justify-center px-6 py-4 rounded-b-2xl bg-white text-gray-900 
                font-semibold text-base tracking-wide hover:bg-gray-100 
                focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out ${
                  loadingUpgrade ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
              Save to my panel 📂
            </button>
          </div>
        </div>
      </Container>
      <div className="isolate flex justify-center p-6"></div>
    </main>
  );
}