"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/utils/pdfWorkerPolyfill";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { getCompletion } from "@/components/openai-helper";
import { GradientBackground } from "@/components/gradient";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Lead, Heading } from "@/components/text";
import { IoAdd, IoCheckmark } from "react-icons/io5";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  const systemPrompt = `Your system prompt here`;

  const extractMermaidDiagram = (text) => {
    const pattern = /```(.*?)```/gs;
    const diagrams = [...text.matchAll(pattern)].map((match) => match[1]);

    if (diagrams.length === 0) return text;

    let cleanedDiagram = diagrams[0].trim();
    if (cleanedDiagram.startsWith("mermaid")) {
      cleanedDiagram = cleanedDiagram.slice("mermaid".length).trim();
    }

    return cleanedDiagram;
  };

  const generateMermaidCode = async (text) => {
    try {
      const userPrompt = "Please provide the Mermaid Diagram code for the following text: " + text;
      const response = await getCompletion("gpt-4o-mini", systemPrompt, userPrompt, apiKey);
      return extractMermaidDiagram(response);
    } catch (error) {
      console.error("Error generating Mermaid diagram:", error);
      throw error;
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      let processedFileName = selected.name;
      if (processedFileName.endsWith(".pdf")) {
        processedFileName = processedFileName.slice(0, -4);
      }
      if (processedFileName.length > 30) {
        processedFileName = processedFileName.slice(0, 30) + "...";
      }
      setFile(selected);
      setFileName(processedFileName);
    }
  };

  const extractTextFromPDF = async (pdfFile) => {
    setLoading(true);
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      try {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let textContent = "";

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const pageText = await page.getTextContent();
          const pageStrings = pageText.items.map((item) => item.str);
          textContent += pageStrings.join(" ");
        }

        const generatedMermaidCode = await generateMermaidCode(textContent);
        saveToStorage(fileName, generatedMermaidCode, textContent);
        router.push("/done");
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fileReader.readAsArrayBuffer(pdfFile);
  };

  const saveToStorage = (pdfName, newMermaidCode, fullText) => {
    let storedData = sessionStorage.getItem("paperList");
    let paperList = storedData ? JSON.parse(storedData) : [];

    const timestamp = new Date().toISOString();
    const existingPaperIndex = paperList.findIndex((item) => item.pdfName === pdfName);

    if (existingPaperIndex >= 0) {
      paperList[existingPaperIndex].MermaidList.push({
        code: newMermaidCode,
        createdAt: timestamp,
      });
    } else {
      paperList.push({
        pdfName,
        MermaidList: [
          {
            code: newMermaidCode,
            createdAt: timestamp,
          },
        ],
      });
    }

    sessionStorage.setItem("paperList", JSON.stringify(paperList));
    sessionStorage.setItem("filename", pdfName);
    sessionStorage.setItem("content", fullText);
    sessionStorage.setItem("mermaidCode", newMermaidCode);
    sessionStorage.setItem("timestamp", timestamp);
  };

  const handleUpload = () => {
    if (file) extractTextFromPDF(file);
  };

  return (
    <main className="overflow-hidden bg-gray-100 min-h-screen">
      <GradientBackground />
      <Container>
        <Navbar />
        <Heading as="h1" className="mt-20 text-center text-gray-900">
          Upload a new paper
        </Heading>
        <Lead className="mt-6 mb-20 max-w-3xl mx-auto text-center text-gray-700">
          Track progress, manage versions, and collaborate efficiently.
        </Lead>

        <div className="p-10 mt-10 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
          <div className="mb-6">
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
              onChange={(e) => {
                setApiKey(e.target.value);
                sessionStorage.setItem("MY_API_KEY", e.target.value);
              }}
              placeholder="Enter your API key..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer 
                      hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 ease-in-out"
          >
            {file ? (
              <>
                <IoCheckmark className="text-4xl text-indigo-500" />
                <span className="mt-2 text-lg font-medium text-gray-600">
                  Upload Complete!
                </span>
              </>
            ) : (
              <>
                <IoAdd className="text-5xl text-gray-400" />
                <span className="mt-4 text-sm font-medium text-gray-500">
                  Click to Upload
                </span>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-8 w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold 
                        text-white/90 rounded-xl shadow-md transition-all duration-300 ease-in-out ${
              loading
                ? "bg-gradient-to-r from-gray-400/70 to-gray-500/70 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 hover:from-indigo-600/90 hover:via-purple-600/90 hover:to-pink-600/90"
            } focus:outline-none focus:ring-4 focus:ring-indigo-300/50`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white/70"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              "Upload and Process ✨"
            )}
          </button>
        </div>
      </Container>
    </main>
  );
}
