<script setup>
import { onBeforeMount, ref } from "vue";

// variables
const currentCount = ref(0);
const currentInterval = ref(0);
const existSoomData = ref(false);
const expectedCount = ref(5);
const expectedInterval = ref(30);

// lifecycle
onBeforeMount(() => {
  const loaded = loadSoomData();
  if (loaded !== null) {
    existSoomData.value = true;
    const soomData = loaded.split(",");
    currentInterval.value = soomData[0];
    currentCount.value = soomData[1];
    // update soom-nextTime
    let soomNextTime = Number(window.localStorage.getItem("soom-nextTime"));
    if (soomNextTime !== null) {
      while (new Date().getTime() > soomNextTime) {
        soomNextTime += currentInterval.value * 60 * 1000;
      }
      window.localStorage.setItem("soom-nextTime", soomNextTime);
    }
  }
});




// functions
function createNotification() {
  console.log(chrome)
  console.log(chrome.notifications)
  chrome.notifications.create('reminder', {
    type: 'basic',
    title: "Reminder",
    iconUrl: 'urang.png',
    message: "This is a reminder"
  })
}

function loadSoomData() {
  return window.localStorage.getItem("soom");
}
function save() {
  window.localStorage.setItem(
    "soom",
    `${expectedInterval.value},${expectedCount.value}`
  );
  window.localStorage.setItem(
    "soom-nextTime",
    new Date().getTime() + expectedInterval.value * 1000 * 60
  );

  currentInterval.value = expectedInterval.value;
  currentCount.value = expectedCount.value;
  existSoomData.value = true;
}
function showNextSoomTime() {
  const nextTime = Number(window.localStorage.getItem("soom-nextTime"));
  const nextSoomTime = new Date(nextTime);
  return nextSoomTime.toLocaleString("ko-KR", {
    hour: "numeric",
    minute: "numeric",
  });
}
function setExpectedInterval(interval) {
  if (expectedInterval.value + interval >= 60) {
    expectedInterval.value = 60;
    return;
  } else if (expectedInterval.value + interval <= 5) {
    expectedInterval.value = 5;
    return;
  }
  expectedInterval.value += interval;
}
function setExpectedCount(count) {
  if (expectedCount.value + count >= 10) {
    expectedCount.value = 10;
    return;
  } else if (expectedCount.value + count <= 1) {
    expectedCount.value = 1;
    return;
  }
  expectedCount.value += count;
}
function reset() {
  window.localStorage.removeItem("soom");
  window.localStorage.removeItem("soom-nextTime");
  existSoomData.value = false;
}
</script>
<template>
  <div>
    <div id="statusPanel">
      <div v-if="existSoomData">
        <div class="status">
          <span class="soomVariable">{{ currentInterval }}분</span> 마다
          <span class="soomVariable">{{ currentCount }}회</span> 씩
          <p style="margin-bottom: 4px">
            다음 심호흡 시간은 {{ showNextSoomTime() }} 입니다.
          </p>
        </div>
      </div>
      <div v-else>
        <div class="status">건강한 습관을 시작해보세요</div>
      </div>
    </div>
    <hr />
    <div>
      <div id="controller">
        <div class="setter">
          <span class="soomVariable">{{ expectedInterval }}분</span>
          간격으로
          <p class="minMaxDescriptor">(최소 5분, 최대 60분)</p>
          <div>
            <button @click="setExpectedInterval(-5)">-</button>
            <button @click="setExpectedInterval(+5)">+</button>
          </div>
        </div>
        <div class="setter">
          <span class="soomVariable">{{ expectedCount }}회</span>심호흡하기
          <p class="minMaxDescriptor">(최소 1회, 최대 10회)</p>
          <div>
            <button @click="setExpectedCount(-1)">-</button>
            <button @click="setExpectedCount(+1)">+</button>
          </div>
        </div>
      </div>
      <div id="alarm">
        <div v-if="existSoomData" id="reset" @click="reset">알람 해제</div>
        <div id="save" @click="save">알람 설정</div>
      </div>
      <div @click="createNotification">알람 테스트</div>
    </div>
  </div>
</template>

<style scoped>
#statusPanel {
  height: 90px;
}

#alarm {
  display: flex;
  column-gap: 10px;
}

#alarm > div {
  flex-basis: 100%;
}

.soomVariable {
  font-size: 1.3em;
  color: rgb(39, 39, 39);
}
.minMaxDescriptor {
  font-size: 0.7em;
  margin: 2px auto;
}
.status {
  color: #999;
  padding: 10px;
  text-align: left;
}
#controller {
  display: flex;
  column-gap: 10px;
}
#controller > div,
#save,
#reset {
  border-radius: 8px;
}
.setter {
  border: 1px solid #ccc;
  padding: 5px;
  flex-basis: 100%;
}
#save,
#reset {
  margin-top: 5px;
  border: 1px solid #ccc;
  padding: 5px;
}
#save:hover,
#reset:hover {
  background-color: rgb(182, 182, 182);
  transition-duration: 0.3s;
  color: aliceblue;
  cursor: pointer;
}
#save:active,
#reset:active {
  background-color: rgb(255, 255, 255);
  color: rgb(39, 39, 39);
}
</style>
