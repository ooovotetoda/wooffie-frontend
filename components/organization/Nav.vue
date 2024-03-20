<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import type { Ref } from 'vue';
import type { OrganizationSection } from "~/types/organization";

const route = useRoute();
const router = useRouter();

const category = route.params.category;
const underlinePosition = ref("0");
const underlineWidth = ref("0px"); // Изначально устанавливаем в 0px

const navItems: Ref<HTMLElement[]> = ref([]);

const setActiveSection = (section: OrganizationSection | string) => {
  router.replace({ query: { section: section } });
};

const updateUnderlinePosition = (section: string) => {
  nextTick(() => {
    const activeItem = navItems.value.find(item => item.dataset.section === section);
    if (activeItem) {
      underlinePosition.value = `${activeItem.offsetLeft}px`;
      underlineWidth.value = `${activeItem.offsetWidth}px`;
    }
  });
};

watch(() => route.query.section, (newVal) => {
  const sectionKey = typeof newVal === 'string' ? newVal : Array.isArray(newVal) ? newVal[0] : 'services';
  updateUnderlinePosition(sectionKey);
}, { immediate: true });

onMounted(() => {
  navItems.value = Array.from(document.querySelectorAll('.nav__item'));
  // Определите начальный активный раздел здесь
  const initialSection = route.query.section || 'services';
  updateUnderlinePosition(initialSection);
});
</script>

<template>
  <nav class="nav">
    <ul  class="nav__list">
      <li
          class="nav__item"
          data-section="services"
          @click="setActiveSection('services')"
      >Услуги</li>
      <li
          v-if="category === 'vet' || category === 'groomer'"
          class="nav__item"
          data-section="clinic"
          @click="setActiveSection('clinic')"
      >Клиники
      </li>
      <li
          v-else-if="category === 'clinic' || category === 'salon'"
          class="nav__item"
          data-section="specialists"
          @click="setActiveSection('specialists')"
      >Специалисты
      </li>
      <li
          class="nav__item"
          data-section="gallery"
          @click="setActiveSection('gallery')"
      >Фотогалерея</li>
      <li
          class="nav__item"
          data-section="feedback"
          @click="setActiveSection('feedback')"
      >Отзывы</li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  margin: 60px 0;
  border-bottom: 1px solid #D9DAD9;

  &__list {
    position: relative;
    display: flex;
    align-items: center;
    list-style-type: none;

    &:before {
      content: "";
      position: absolute;
      left: v-bind(underlinePosition);
      bottom: 0;
      width: v-bind(underlineWidth);
      height: 3px;
      background-color: rgba(221, 185, 164, 0.50);
      transition: all 0.15s ease-in-out;
    }
  }

  &__item {
    width: 200px;
    padding: 12px;
    border-bottom: 3px solid #FFFFFF;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }
}

@media (max-width: 640px) {
  .nav {
    width: 100vw;
    margin: 24px 0 24px -20px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &__list {
      padding: 0 20px;

      &:after {
        content: "a";
        width: 20px;
        min-width: 20px;
        opacity: 0;
      }
    }

    &__item {
      padding: 16px 24px;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>