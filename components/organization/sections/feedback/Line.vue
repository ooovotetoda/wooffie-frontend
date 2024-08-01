<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  all: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
})

const checked = defineModel < boolean > ({ default: true })

const lineFilledWidth = ref(props.all && props.count ? `${(props.count / props.all) * 100}%` : '0px')
</script>

<template>
  <li class="filter__item">
    <label>
      {{ label }}
      <input
        v-model="checked"
        type="checkbox"
      >
      <span class="checkmark" />
      <span class="checkmark__bg" />
    </label>
    <div class="filter__line">
      <div class="line__basic" />
      <span>{{ count }}</span>
    </div>
  </li>
</template>

<style scoped>
.filter__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 462px;
}

.filter__item label {
  padding-left: 30px;
  position: relative;
  user-select: none;
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}

.filter__item label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.filter__item label input:checked ~ .checkmark {
  background-color: var(--main-color);
  border: 2px solid var(--main-color);
}

.filter__item label .checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  height: 18px;
  width: 18px;
  border: 2px solid rgba(0, 0, 0, 0.48);
  border-radius: 2px;
  background-color: transparent;
  transform: translateY(-50%);
  z-index: 3;
  transition: all 0.1s ease-in-out;
}

.filter__item label .checkmark:after {
  position: absolute;
  display: block;
  content: "";
  left: 50%;
  top: 43%;
  width: 5px;
  height: 11px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
  z-index: 4;
}

.filter__item label .checkmark__bg {
  content: '';
  position: absolute;
  top: 2px;
  bottom: 0;
  left: 0;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: transparent;
  scale: 1.8;
  z-index: 1;
  transition: all 0.1s ease-in-out;
}

.filter__item:hover .checkmark__bg {
  background: var(--hover-grey);
}

.filter__line {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
}

.filter__line span {
  position: absolute;
  right: 0;
  transform: translateX(calc(100% + 16px));
  color: var(--text-dark);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.line__basic {
  position: relative;
  width: 273px;
  height: 8px;
  border-radius: 8px;
  background: #EEE;
}

.line__basic:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100% - var(--lineFilledWidth));
  border-radius: 8px;
  background: rgba(221, 185, 164, 0.50);
}

@media (max-width: 640px) {
  .filter__item {
    width: auto;
    gap: 8px;
    margin-bottom: 4px;
  }

  .filter__item label {
    font-size: 14px;
  }

  .filter__line {
    width: 100%;
    max-width: 60%;
  }

  .line__basic {
    width: 100%;
  }

  .filter__line span {
    display: none;
  }
}
</style>
