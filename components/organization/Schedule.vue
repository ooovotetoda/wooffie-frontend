<script setup lang="ts">

</script>

<template>
<div class="schedule">
  <h3 class="schedule__title">График</h3>
  <div class="schedule__row">
    <div class="schedule__item">
      <div class="schedule__weekday">пн</div>
      <div class="schedule__subitem">
        <span class="schedule__date">27</span>
        <span class="schedule__time">Нет записи</span>
      </div>
    </div>
    <div class="schedule__item">
      <div class="schedule__weekday">вт</div>
      <div class="schedule__subitem">
        <span class="schedule__date">28</span>
        <span class="schedule__time">09:00-11:00</span>
      </div>
    </div>
    <div class="schedule__item">
      <div class="schedule__weekday">ср</div>
      <div class="schedule__subitem">
        <span class="schedule__date">29</span>
        <span class="schedule__time">09:00-18:00</span>
      </div>
    </div>
  </div>

  <div class="schedule__row">
    <div class="schedule__item">
      <div class="schedule__weekday">чт</div>
      <div class="schedule__subitem">
        <span class="schedule__date">30</span>
        <span class="schedule__time">09:00-18:00</span>
      </div>
    </div>
    <div class="schedule__item">
      <div class="schedule__weekday">пт</div>
      <div class="schedule__subitem">
        <span class="schedule__date">1</span>
        <span class="schedule__time">09:00-18:00</span>
      </div>
    </div>
    <div class="schedule__item">
      <div class="schedule__weekday">сб</div>
      <div class="schedule__subitem">
        <span class="schedule__date">2</span>
        <span class="schedule__time">Нет записи</span>
      </div>
    </div>
  </div>
  <div class="schedule__row">
    <div class="schedule__item">
      <div class="schedule__weekday">вс</div>
      <div class="schedule__subitem">
        <span class="schedule__date">3</span>
        <span class="schedule__time">Нет записи</span>
      </div>
    </div>
  </div>
  <div class="schedule__street">
    <select name="street" id="street" class="schedule__input">
      <option>ул, Большая Садовая, д. 46</option>
      <option>ул, Большая Садовая, д. 47</option>
      <option>ул, Большая Садовая, д. 48</option>
    </select>
  </div>
</div>
</template>

<style scoped lang="scss">
.schedule {
  width: 334px;
  min-width: 334px;
  padding: 32px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.10);
  text-align: center;

  &__title {
    margin-bottom: 18px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__item {
    flex: 1;
  }

  &__weekday {
    padding: 4px 32px;
    background: rgba(221, 185, 164, 0.50);
    color: #824C27;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__subitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__street {
    position: relative;
    margin-top: 8px;
    width: 100%;
    
    &:before {
      content: "";
      position: absolute;
      top: -8px;
      right: 0;
      left: 0;
      height: 1px;
      background: #D9DAD9;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 12px;
      width: 8px;
      height: 4px;
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEyIDE1bC01LTVoMTBsLTUgNVoiLz48L3N2Zz4=") no-repeat center;
      transform: translateY(-50%);
    }
  }

  &__input {
    width: 100%;
    padding: 15px 14px;
    border: none;
    outline: none;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    appearance: none;

    &:hover {
      background-color: #F9F9F9;
    }
  }
}
</style>