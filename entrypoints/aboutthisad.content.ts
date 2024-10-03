export default defineContentScript({
  matches: ["*://*.youtube.com/aboutthisad*"],
  allFrames: true,
  async main() {
    console.log("About This Ad script initialized");

    const blockAdButton = (await waitForElement(
      '[aria-label="Block ad"]'
    )) as HTMLButtonElement;
    if (!blockAdButton) return;

    console.log("Block ad button found");
    blockAdButton.click();

    const modalSubmitButton = (await waitForElement(
      '[aria-label="Stop seeing this ad?"] div[role="button"]:nth-child(2)'
    )) as HTMLButtonElement;
    if (!modalSubmitButton) return;

    console.log("Modal submit button found");
    modalSubmitButton.click();

    await new Promise((resolve) => setTimeout(resolve, 500));

    const closeButton = document.querySelector(
      'button[aria-label="Close"]'
    ) as HTMLButtonElement;
    if (closeButton) {
      console.log("Close button found");
      closeButton.click();
    }
  },
});

async function waitForElement(
  selector: string,
  timeout = 5000
): Promise<Element | null> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const element = document.querySelector(selector);
    if (element) return element;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  console.warn(`Element not found: ${selector}`);
  return null;
}
