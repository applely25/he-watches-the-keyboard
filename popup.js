const toastDiv = document.getElementById("success");

chrome.storage.local.get(["max", "time"], (result) => {
  if (result.max) document.getElementById("max").value = result.max;
  if (result.time) document.getElementById("time").value = result.time;
});

document.getElementById("save").addEventListener("click", () => {
  const max = parseInt(document.getElementById("max").value);
  const time = parseInt(document.getElementById("time").value);
  chrome.storage.local.set({ max, time }, () => {
    toastDiv.classList.toggle("active");
    setTimeout(() => {
      toastDiv.classList.toggle("active");
    }, 2000);
  });
});
