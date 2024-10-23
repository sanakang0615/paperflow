"use client"; // 클라이언트 컴포넌트로 명시

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // next/router 대신 next/navigation 사용

import * as pdfjsLib from "pdfjs-dist/webpack";
import { getCompletion } from "@/components/openai-helper";
import { GradientBackground } from '@/components/gradient'
import { Container } from '@/components/container'
import { Navbar } from '@/components/navbar'
import { Subheading, Heading, Lead } from '@/components/text'

export default function Upload() {
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
        <h1 className="text-2xl font-bold">Upload Complete!</h1>
        <p className="mt-4">Here is the extracted content from your PDF:</p>
        <pre className="p-4 mt-2 bg-gray-100 rounded">{content}</pre>

        <h2 className="text-xl font-semibold mt-8">Mermaid Diagram Code:</h2>
        <pre className="p-4 mt-2 bg-gray-100 rounded">{mermaidCode}</pre>
        
      </Container>
      <div className="isolate flex justify-center p-6"></div>
    </main>
  );
}
