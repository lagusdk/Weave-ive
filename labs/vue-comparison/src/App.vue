<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const tags = ['XR', 'Three.js', 'UX', 'Exhibition']
</script>

<template>
  <main>
    <p class="eyebrow">Vue + Vite comparison lab</p>
    <h1>같은 Experience Card를 Vue로 구현하기</h1>
    <p class="intro">
      메인 React 컴포넌트와 Props, 반응성, 이벤트 처리 방식을 비교하기 위한 작은 실습입니다.
    </p>

    <article class="experience-card">
      <div class="card-head">
        <div>
          <span class="status">Doing</span>
          <h2>Folding Birding</h2>
          <p>공간 인터랙션과 웹 기술을 엮어 만든 XR 전시 경험</p>
        </div>
        <small>2026.03 — 현재</small>
      </div>

      <div class="tags">
        <span v-for="tag in tags" :key="tag">#{{ tag }}</span>
      </div>

      <button type="button" :aria-expanded="isOpen" @click="isOpen = !isOpen">
        경험 자세히 보기 <span :class="{ rotated: isOpen }">⌄</span>
      </button>

      <p v-if="isOpen" class="details">
        Vue의 ref와 템플릿 디렉티브를 React의 useState 및 JSX 조건부 렌더링과 비교합니다.
      </p>
    </article>
  </main>
</template>
