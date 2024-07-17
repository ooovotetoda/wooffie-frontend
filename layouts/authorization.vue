<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="main">
    <div class="auth__header">
      <button
        class="auth-back__button"
        @click="router.back()"
      >
        <span class="auth-back__text">Назад</span>
      </button>
    </div>
    <div class="wrapper">
      <div class="block">
        <NuxtLink to="/">
          <IconsClose class="block__close" />
        </NuxtLink>

        <slot />
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("public/authorization-bg.webp") no-repeat center;
  background-size: cover;
}

.main::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.26);
}

.wrapper {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  margin: auto;
  padding: 0 200px;
}

.auth__header {
  display: none;
}

.block {
  position: relative;
  width: 430px;
  padding: 56px;
  border-radius: 10px;
  background: var(--t-1100, #FFF);
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.10);
  z-index: 1;
}

.block svg {
  position: absolute;
  top: 26px;
  right: 26px;
  font-size: 24px;
  cursor: pointer;
}

@media (max-width: 640px) {
  .main {
    background: none;
  }

  .main::before {
    content: none;
  }

  .wrapper {
    height: auto;
    padding: 0;
    justify-content: center;
    align-items: flex-end;
  }

  .block {
    width: 100%;
    padding: 28px 32px;
    border-radius: 0;
    box-shadow: none;
  }

  .block svg {
    display: none;
  }

  .auth__header {
    position: relative;
    height: 382px;
    min-height: 382px;
    padding: 24px;
    display: block;
    background: url("public/authorization-bg.webp") no-repeat -70px 0;
    background-size: cover;
    background-position: center;
    border-radius: 0 0 80px 80px;
  }

  .auth__header::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.26);
    border-radius: 0 0 80px 80px;
  }

  .auth-back__button {
    position: relative;
    padding: 12px 16px 12px 8px;
    border: 1px white solid;
    border-radius: 10px;
    background: transparent;
    color: white;
    font-family: Roboto, sans-serif;
    z-index: 10;
  }

  .auth-back__text {
    position: relative;
    padding-left: 24px;
  }

  .auth-back__text::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -8px;
    width: 14px;
    height: 14px;
    transform: translate(100%, -50%);
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im03LjgyNSAxM2w1LjYgNS42TDEyIDIwbC04LThsOC04bDEuNDI1IDEuNGwtNS42IDUuNkgyMHYyeiIvPjwvc3ZnPg==") center no-repeat;
  }
}
</style>
