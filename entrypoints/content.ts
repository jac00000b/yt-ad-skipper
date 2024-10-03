export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  allFrames: true,
  async main() {
    console.log("Hello from main content.");

    let lastClickTime = 0;
    const CLICK_COOLDOWN = 5000;

    function handleVideoAd() {
      const adCenterButton = document.querySelector(
        '[aria-label="My Ad Center"]'
      ) as HTMLButtonElement;
      const adElement = document.querySelector(".video-ads.ytp-ad-module");

      if (adCenterButton && adElement && adElement.children.length > 0) {
        const currentTime = Date.now();
        if (currentTime - lastClickTime > CLICK_COOLDOWN) {
          adCenterButton.click();
          lastClickTime = currentTime;
        }
      }
    }

    const observer = new MutationObserver(handleVideoAd);
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
