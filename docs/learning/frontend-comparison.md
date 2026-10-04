# Frontend comparison lab

Weave:ive의 제품 코드는 `Next.js + React + TypeScript`로 구현합니다. Vue와 Webpack은 제품에 혼용하지 않고, 같은 Experience Card를 작은 실습으로 다시 구현해 차이를 비교합니다.

## 비교 대상

| 주제 | 메인 앱 | Vue 실습 | Webpack 실습 |
| --- | --- | --- | --- |
| 컴포넌트 | React JSX | Vue SFC | React JSX |
| 반응 상태 | `useState` | `ref` | `useState` |
| 조건부 UI | JSX 표현식 | `v-if` | JSX 표현식 |
| 반복 렌더링 | `Array.map` | `v-for` | `Array.map` |
| 빌드 도구 | Next.js Turbopack | Vite | 직접 설정한 Webpack |
| 학습 초점 | 제품 구조와 SSR | 프레임워크 모델 비교 | entry, loader, plugin, chunk |

## 실행

```bash
npm run dev
npm run dev:vue
npm run dev:webpack
```

메인 앱은 `3000`, Vue 실습은 Vite가 안내하는 포트, Webpack 실습은 `5174` 포트를 사용합니다.

## 관찰할 질문

1. React의 state 갱신과 Vue의 ref 갱신은 템플릿에 어떻게 반영되는가?
2. React Props와 Vue `defineProps`는 타입을 어떻게 표현하는가?
3. Next.js의 Server/Client 경계는 일반 SPA와 무엇이 다른가?
4. Vite와 Webpack은 개발 서버와 production bundle을 어떻게 만드는가?
5. Webpack의 loader와 plugin은 각각 어떤 문제를 해결하는가?
