<script setup lang="ts">
const props = defineProps({
  isPhoneValid: Boolean,
})

const emit = defineEmits(['updatePhone', 'update:isPhoneValid'])

const phoneRef = ref(null)
const phone = ref < string | null > (null)
const isPhoneFocused = ref < boolean > (false)

function handleBlur() {
  const regExp = /^(?:\+7|8)?[789]\d{9}$/
  const newIsPhoneValid = phone.value ? regExp.test(phone.value) : true
  emit('update:isPhoneValid', newIsPhoneValid)
  isPhoneFocused.value = false
}
</script>

<template>
  <fieldset class="phone">
    <Transition name="fade">
      <legend
        v-if="isPhoneFocused"
        class="phone__legend"
      >
        Телефон
      </legend>
    </Transition>
    <input
      ref="phoneRef"
      v-model="phone"
      type="tel"
      placeholder="Телефон"
      pattern="\+?\d{1,3}?\d{1,12}"
      class="phone__input"
      @input="emit('updatePhone', phone)"
      @focus="isPhoneFocused = true"
      @blur="handleBlur"
    >
  </fieldset>
  <p
    v-if="!isPhoneValid"
    class="error"
  >
    Неверный формат
  </p>
</template>

<style scoped>
.phone {
  position: relative;
  border: none;
  text-align: left;
  margin-bottom: 16px;
}

.phone__legend {
  position: absolute;
  padding: 0 14px;
  top: -12px;
  left: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: var(--main-color);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  transition: all 0.3s ease;
}

.phone__input {
  width: 100%;
  padding: 10px 0 10px 46px;
  border-radius: 10px;
  border: 1px solid #D9DAD9;
  outline: none;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4OTg5ODkiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE4Ny0xLjM1VDguMiAxNS44cS0yLjUtMi41LTMuODUtNS41NVQzIDQuMDVWM2g1LjlsLjkyNSA1LjAyNWwtMi44NSAyLjg3NXEuNTUuOTc1IDEuMjI1IDEuODV0MS40NSAxLjYyNXEuNzI1LjcyNSAxLjU4OCAxLjM4OFQxMy4xIDE3bDIuOS0yLjlsNSAxLjAyNVYyMWgtMS4wNVoiLz48L3N2Zz4=") no-repeat 20px center;
  color: var(--dark-grey);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.15s linear;
}

.phone__input:hover {
  border: 1px solid #000000;
}

.phone__input:focus {
  border: 1px solid var(--main-color);
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNjZjg4MDIiIGQ9Ik0xOS45NSAyMXEtMy4xMjUgMC02LjE3NS0xLjM2M3QtNS41NS0zLjg2MnEtMi41LTIuNS0zLjg2Mi01LjU1VDMgNC4wNXEwLS40NS4zLS43NXQuNzUtLjNIOC4xcS4zNSAwIC42MjUuMjM4dC4zMjUuNTYybC42NSAzLjVxLjA1LjQtLjAyNS42NzVUOS40IDguNDVMNi45NzUgMTAuOXEuNS45MjUgMS4xODcgMS43ODd0MS41MTMgMS42NjNxLjc3NS43NzUgMS42MjUgMS40MzhUMTMuMSAxN2wyLjM1LTIuMzVxLjIyNS0uMjI1LjU4OC0uMzM4dC43MTItLjA2MmwzLjQ1LjdxLjM1LjEuNTc1LjM2M1QyMSAxNS45djQuMDVxMCAuNDUtLjMuNzV0LS43NS4zWiIvPjwvc3ZnPg==") no-repeat 20px center;
}

.phone__input::-webkit-outer-spin-button,
.phone__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.phone__input[type=number] {
  -moz-appearance: textfield;
}

.phone svg {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  cursor: pointer;
  fill: #BABABA;
  transition: all 0.15s linear;
}

.phone svg:hover {
  fill: #888888;
}

.phone svg:active {
  fill: #343434;
}

.error {
  text-align: left;
  margin: -12px 0 6px 16px;
  color: rgba(228, 0, 0, 0.87);
  font-family: Roboto, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-to, .fade-leave-from {
  margin: 0;
  padding: 0 14px;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
}

.fade-enter-from, .fade-leave-to {
  margin: 0 14px;
  padding: 0;
  opacity: 0;
  background: rgba(255, 255, 255, 0);
}
</style>
