import { useState } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

const tags = ["XR", "Three.js", "UX", "Exhibition"];

function ExperienceCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <p className="eyebrow">React + TypeScript + Webpack lab</p>
      <h1>프레임워크 뒤의 번들링 직접 보기</h1>
      <p className="intro">
        entry, loader, plugin, content hash와 chunk 분리를 직접 설정한 비교 실습입니다.
      </p>
      <article>
        <span className="status">Doing</span>
        <h2>Folding Birding</h2>
        <p>공간 인터랙션과 웹 기술을 엮어 만든 XR 전시 경험</p>
        <div className="tags">
          {tags.map((tag) => <span key={tag}>#{tag}</span>)}
        </div>
        <button type="button" onClick={() => setIsOpen((value) => !value)}>
          경험 자세히 보기 <span>{isOpen ? "⌃" : "⌄"}</span>
        </button>
        {isOpen ? (
          <p className="details">
            Webpack이 TypeScript와 CSS를 어떤 loader로 처리하고 결과물을 어떻게 chunk로 나누는지 확인합니다.
          </p>
        ) : null}
      </article>
    </main>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
createRoot(rootElement).render(<ExperienceCard />);
