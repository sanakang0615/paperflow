"use client"; // 클라이언트 컴포넌트로 명시

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // next/router 대신 next/navigation 사용
import "@/utils/pdfWorkerPolyfill";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { getCompletion } from "@/components/openai-helper";
import { GradientBackground } from '@/components/gradient'
import { Container } from '@/components/container'
import { Navbar } from '@/components/navbar'
import { Subheading, Heading, Lead } from '@/components/text'
import MermaidComponent from "@/components/mermaid-component";
export default function Done() {
  const [file, setFile] = useState(null);
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const upgradeSystemPrompt =
        `
        You will be given the research paper content and summarizing diagram mermaid code. You should keep the basic diagram, but upgrade the diagram by following instruction.
        아래의 Stage 1 - Stage 2  순서로 생각의 흐름을 따라가세요. Stage 1는 내부적으로 처리하고, 최종 답변으로 Stage 2의 Mermaid 코드만 제공해주세요. 모든 critical thought 이 다이어그램에 드러나야 합니다.

        <Stage 1>

        1. 모든 답변 내용은 한글이 되어야 한다.
        2. 각 문장마다 출처 표시는 하지 않아도 된다.
        3. 기존 Diagram에서의 section과 각 섹션별 claim-evidence 관계에 대해 비판적인 접근을 취할 거야. 이 연구의 완결성과 논리를 비판하는 Devil's Advocate'의 역할을 수행해야해. 여기서는 새로운 접근 방식 그리고 관련된 노트를 추가하면서, 현재 method의 문제점을 지적하고 이를 더 보완할 방식을 언급할 수 있게 하는 거야.
        4. 저자의 연구 스타일과 방향성을 모두 고려해줘. CER과 IMRD 흐름에 걸쳐서 우리가 분석했던 논문의 논리 구조 및 주장, 근거를 모두 고려해서 제안해 주면 좋겠어. 즉, 저자가 관심있어하는 연구의 큰 방향성을 고려하여 해당 방향으로 발전할 수 있게 비판점을 제시해줘. 저자의 문체 및 논리 전개 방식을 차용하여 그와 잘 조화를 이루는 방향으로 제시해줘.
        5. 이 때, 각 섹션 중 어떠한 claim 또는 Evidence에 대한 비판인지를 함께 기억해 줘. 나중에 다이어그램에 반영하고 싶어.
        6. 최소 10개의 아이디어를 부탁해. 질문의 난이도는 대학원생 박사 또는 교수진 정도로 아주 연구론적으로 집중되게 해줘.
        7. 만약 의미적으로 같은 용어 (e.g., GAN = Generative Adversarial Network)이 나온다면 모두 같은 용어 (e.g., GAN)으로 통일해줘. 즉, "GAN" 관련 용어는 모두 "GAN"으로 통일시키는 거야. 예시: "The proposed model ($7) operates in ($R1, $H ) an unsupervised manner. ($8)"라는 예시에서는"proposed model"는 이 논문에 제시하는 방법론/모델이니깐 이거에 대한 건 전부 이걸로 태깅해야겠지 또한 "unsupervised manner."는 unsupervised model 같은 용어와도 의미론적으로 같을테니 모두 이걸로 묶어야겠지.

        ---

        <Stage 2>
        이제, 방금 답변을 기준으로 예전에 너가 나한테 줬던 머메이드 다이어그램에 위 답변을 추가시켜줘. 누락없이 전부 다 포함시켜줘. 너가 주었던 머메이드 다이어그램을 아래에 줄게. 비판적인 접근(Devil's Advocate)에 해당하는 Claim 10개는  classDef critique_approach(fill: #FF355E, stroke: #8B0000)로 부탁할게. 이 때 각 접근이 비판했던 대상이 노드들에 edge를 연결해서 한 눈에 볼 수 있는 dynamic graph를 줘. 즉, critique_approach 노드들은 따로 하나의 section으로 모여있기 보단, 기존의 섹션 내부의 노드들과 연결되어 있어야 해. syntax에러가 나지 않게 주의해줘. 기존 코드에 critique_approach 노드와 엣지만 딱 올려서 추가하는 거야. 나머지는 무조건 동일해야 해.
        ---

        # 기존 Mermaid Code (여기에 critique_approach 노드를 이어붙이면 돼.) 기존 코드 관련해선 노드 종류 및 색상 모두 변하지 않게 주의해 줘. 기존 코드에 critique_approach_1, critique_approach_2노드와 엣지만 딱 올려서 추가하는 거야. 나머지는 무조건 동일해야 해.
        # critique_approach node는 "classDef critique_approach fill: #FF355E,stroke: #8B0000,stroke-width:2px,color:#000;"로 부탁해 (classDef에선 comma 뒤에 스페이스 없도록 아주 주의해줘. 절대 없어야 해.)
        
        graph TB
        %% Define Colors %%
        classDef question fill:#EF9A9A,stroke:#B71C1C,stroke-width:2px,color:#000;
        classDef solution fill:#BBDEFB,stroke:#0D47A1,stroke-width:2px,color:#000;
        classDef method fill:#C8E6C9,stroke:#1B5E20,stroke-width:2px,color:#000;
        classDef result fill:#FFF59D,stroke:#F57F17,stroke-width:2px,color:#000;
        classDef discussion fill:#FFCCBC,stroke:#BF360C,stroke-width:2px,color:#000;
        classDef conclusion fill:#C5E1A5,stroke:#33691E,stroke-width:2px,color:#000;
        classDef link fill:#FFECB3,stroke:#FF6F00,stroke-width:2px,color:#000;

        %% Introduction: Research Question and Proposed Solution %%
        subgraph Introduction
        I1["연구 문제: 리뷰에서 속성별 감정 점수를 추출하는 문제"]:::question
        I2["연구 문제: 누락된 속성의 감정 점수를 보정하는 방법"]:::question
        I3["연구 목표: 머신러닝과 구조적 모델 결합"]:::question
        S1["제안된 솔루션: 딥러닝 CNN-LSTM 하이브리드 모델"]:::solution
        S2["제안된 솔루션: 리뷰어 행동 모델을 통한 누락 보정"]:::solution
        end

        %% Method: Experimental Design and Data %%
        subgraph Method
        M1["실험 방법: 속성별 점수 예측을 위한 구조적 모델"]:::method
        M2["데이터: Yelp 리뷰 텍스트 및 속성별 평점"]:::method
        M3["모델 설계: EM 알고리즘과 베이즈 규칙 활용"]:::method
        M4["검증: 홀드아웃 샘플을 사용한 모델 평가"]:::method
        end

        %% Results: Key Findings and Relationships %%
        subgraph Results
        R1["결과: CNN-LSTM 모델의 성능이 기존 방법보다 우수"]:::result
        R2["결과: 속성별 누락 보정이 평균 점수에 유의미한 영향"]:::result
        R3["결과: 리뷰어 세그먼트 분석으로 다양한 동기 파악"]:::result
        end

        %% Discussion: Contributions and Limitations %%
        subgraph Discussion
        D1["기여: 감정 분석에서 언어 구조의 중요성 강조"]:::discussion
        D2["기여: 사회과학과 공학적 접근 방식의 융합"]:::discussion
        L1["한계: 속성 중요도와 리뷰 빈도의 불일치"]:::discussion
        L2["한계: 일부 리뷰의 전략적 편향 가능성"]:::discussion
        end

        %% Conclusion: Future Directions %%
        subgraph Conclusion
        C1["향후 연구: 리뷰어 행동과 속성 누락 연구 확대"]:::conclusion
        C2["향후 연구: 다른 도메인에 모델 적용 검토"]:::conclusion
        end

        %% Interconnections %%
        I1 --> S1
        I2 --> S2
        I3 --> S1

        S1 --> M1
        S2 --> M3
        M1 --> M2
        M3 --> M4

        M4 --> R1
        M3 --> R2
        R1 --> D1
        R2 --> D2
        R3 --> D1

        D1 --> C1
        D2 --> C2
        L1 --> C1
        L2 --> C2
        `
  

  
    function extractMermaidDiagram(text) {
      // %%로 둘러싸인 모든 문자열 삭제 (중첩 포함)
      const withoutDoublePercent = removeBetweenMarkers(text, '%%');
    
      // %로 둘러싸인 모든 문자열 삭제 (중첩 포함)
      const cleanedText = removeBetweenMarkers(withoutDoublePercent, '%');
    
      // Triple backticks로 둘러싸인 모든 코드 블록 추출
      const pattern = /```(.*?)```/gs;
      const diagrams = [...cleanedText.matchAll(pattern)].map(match => match[1]);
    
      if (diagrams.length === 0) {
        return cleanedText;
      }
    
      // 'mermaid'로 시작하면 삭제하고 나머지 반환
      const cleanedDiagrams = diagrams.map(diagram => {
        let cleanedDiagram = diagram.trim();
        if (cleanedDiagram.startsWith('mermaid')) {
          cleanedDiagram = cleanedDiagram.slice('mermaid'.length).trim();
        }
        return cleanedDiagram;
      });
    
      return cleanedDiagrams[0];
    }
    
    // 중첩된 마커 사이의 텍스트를 모두 제거하는 함수
    function removeBetweenMarkers(text, marker) {
      const regex = new RegExp(`${marker}[^${marker}]*${marker}`, 'gs');
      let cleanedText = text;
      while (regex.test(cleanedText)) {
        cleanedText = cleanedText.replace(regex, '');
      }
      return cleanedText;
    }
          
  const handleUpgrade = async () => {
    setLoadingUpgrade(true)
    try {
      const userPrompt = "Please provide the updated Mermaid Diagram code. The content was: `" + content + "`, and the diagram was: ```"+ mermaidCode
      const response = await getCompletion("gpt-4o-mini", upgradeSystemPrompt, userPrompt);

      console.log("응답: ", response)
      setMermaidCode(extractMermaidDiagram(response))
      console.log("Enhanced:", extractMermaidDiagram(response))
      setLoadingUpgrade(false)
      return extractMermaidDiagram(response);
      
    } catch (error) {
      setLoadingUpgrade(false)
      console.error("Error generating Mermaid diagram:", error);
      throw error;
    }
  }
  const upgradeMermaidCode = async (text) => {
    
  };

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
        <Heading as="h1" className="mt-2">Paper Flow Done!</Heading>
        <Lead className="mt-6 max-w-3xl">
          Track progress, manage versions, and collaborate efficiently.
        </Lead>
        <div className="divide-y mt-14 divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex flex-col items-center">
          <div className="px-4 py-5 sm:px-6 text-center font-semibold text-lg">
            {'📄 '+content.slice(0, 78)+'...'}
          </div>
          <div className="flex justify-center items-center w-full h-full" style={{ minHeight: '100vh' }}>
            <div className="my-12 w-full max-w-4xl">
              <MermaidComponent 
                mermaidCode={mermaidCode} 
                id="paper-diagram" 
                style={{ width: '100%', height: 'auto' }} 
              />
            </div>
          </div>

        
    <div className="flex flex-col items-center w-full space-y-6">

      <div className="w-full max-w-3xl">
           
          </div>
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

  {/* 버튼 1 */}
  <button
    type="button"
    className="inline-flex items-center justify-center px-6 py-4 bg-white text-gray-900 
               font-semibold text-base tracking-wide hover:bg-gray-100 
               focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out"
               disabled={loadingUpgrade}
               onClick={handleUpgrade}
 >
     {loadingUpgrade ? 'Loading...' : 'Upgrade with AI ✨'}
  </button>

  {/* 구분선 */}
  <div className="border-t border-gray-300"></div>

  {/* 버튼 2 */}
  <button
    type="button"
    className={`inline-flex items-center justify-center px-6 py-4 rounded-b-2xl bg-white text-gray-900 
                font-semibold text-base tracking-wide hover:bg-gray-100 
                focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out ${
                  loadingUpgrade ? 'cursor-not-allowed opacity-50' : ''
                }`}
  >
    Save to my panel 📂
  </button>
</div>

        
      </div>
        </div>

      </Container>
      <div className="isolate flex justify-center p-6"></div>
    </main>
  );
}
