<script setup lang="ts">
const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n" +
  "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.\n" +
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."

const isLiked = ref<boolean>(false)
const isDisliked = ref<boolean>(false)

const handleLike = () => {
  isLiked.value = !isLiked.value;
  if (isLiked.value) {
    isDisliked.value = false;
  }
}

const handleDislike = () => {
  isDisliked.value = !isDisliked.value;
  if (isDisliked.value) {
    isLiked.value = false;
  }
}
</script>

<template>
<div class="comment">
  <div class="comment__header">
    <div class="comment__icon">
      <img src="/images/user-icon.svg" alt="avatar">
    </div>
    <div class="comment__info">
      <div class="comment__tel">+7 988 32 XX XXX</div>
      <div class="comment__status">Клиент</div>
    </div>
  </div>
  <div class="comment__subheader">
    <Rating :rating="4"/>
    <span class="comment__date">13.10.2023</span>
  </div>
  <p class="comment__copy">{{ text }}</p>

  <div class="comment__estimations">
    <div class="comment__estimations__item">
      <button @click="handleLike" :class="{ liked: isLiked }">
        <IconsLike />
      </button>
      <span class="comment__estimations__count">2</span>
    </div>

    <div class="comment__estimations__item">
      <button @click="handleDislike" :class="{ disliked: isDisliked }">
        <IconsDislike />
      </button>
      <span class="comment__estimations__count">1</span>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.comment {
  margin-bottom: 48px;

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  &__icon {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__tel {
    margin-bottom: 4px;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &__status {
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__subheader {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  &__date {
    margin-top: 4px;
    color: $dark-grey;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  &__copy {
    margin-bottom: 8px;
    overflow: hidden;
    color: $text-dark;
    font-feature-settings: 'clig' off, 'liga' off;
    text-overflow: ellipsis;
    font-family: Roboto, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; /* 166.667% */
  }

  &__estimations {
    display: flex;
    align-items: center;
    gap: 32px;

    &__item {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        svg {
          color: rgba(0, 0, 0, 0.48);
          transition: all 0.1s ease-in-out;
        }

        &:hover {
          svg {
            color: rgba(225, 175, 87, 0.6);
          }
        }

        &:active {
          scale: 0.75;
        }

        &.liked {
          svg {
            color: $main-color;
          }
        }

        &.disliked {
          svg {
            color: $main-color;
          }
        }
      }
    }

    &__count {
      overflow: hidden;
      color: rgba(0, 0, 0, 0.48);
      font-feature-settings: 'clig' off, 'liga' off;
      text-overflow: ellipsis;
      font-family: Roboto, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px; /* 166.667% */
    }
  }
}
</style>