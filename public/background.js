chrome.runtime.onInstalled.addListener(() => {
  console.log("service worker installed")
  chrome.alarms.create('demo-default-alarm', {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1,
  });
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
  // chrome.notifications.create('reminder', {
  //   type: 'basic',
  //   title: "Reminder",
  //   iconUrl: 'urang.png',
  //   message: "This is a reminder"
  // })
  console.log("Got an alarm!", alarm);
});

