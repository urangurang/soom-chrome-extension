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
  
});

// functions
function createNotification() {
  chrome.notifications.getAll(function(notifications) {
    console.log(notifications);
  });

  chrome.notifications.getPermissionLevel(function(permissionLevel) {
    if (permissionLevel === "granted") {
      chrome.notifications.create(
        "soom",
        {
          type: "basic",
          iconUrl: "icon.png",
          title: "Soom",
          message: "Soom is running"
        },
      );
    }
  });

  chrome.notifications.create('reminder', {
    type: 'basic',
    title: "SOOM",
    iconUrl: 'urang.png',
    message: "Time to deep breathe"
  })
}

function loadSoomData() {
  return ""
}
function save() {
}

function showNextSoomTime() {
}
function setExpectedInterval(interval) {
}
function setExpectedCount(count) {
}
function reset() {
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
      <button @click="createNotification">알람 테스트</button>
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
