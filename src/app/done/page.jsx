"use client"; // 클라이언트 컴포넌트로 명시

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // next/router 대신 next/navigation 사용

import * as pdfjsLib from "pdfjs-dist/webpack";
import { getCompletion } from "@/components/openai-helper";
import { GradientBackground } from '@/components/gradient'
import { Container } from '@/components/container'
import { Navbar } from '@/components/navbar'
import { Subheading, Heading, Lead } from '@/components/text'
import MermaidComponent from "@/components/mermaid-component";
export default function Done() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");

  useEffect(() => {
    // 세션 스토리지에서 데이터 로드
    const storedContent = sessionStorage.getItem("content");
    const storedMermaidCode = sessionStorage.getItem("mermaidCode");

    if (storedContent) setContent(storedContent);
    if (storedMermaidCode) setMermaidCode(storedMermaidCode);
  }, []);

  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">Panel</Subheading>
        <Heading as="h1" className="mt-2">Upload a new paper</Heading>
        <Lead className="mt-6 max-w-3xl">
          Track progress, manage versions, and collaborate efficiently.
        </Lead>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            Your Paper Diagram
          </div>
          <div className="px-4 py-5 sm:p-6"><MermaidComponent mermaidCode={mermaidCode} id="paper-diagram"/></div>
        </div>
      </Container>
      <div className="isolate flex justify-center p-6"></div>
    </main>
  );
}
