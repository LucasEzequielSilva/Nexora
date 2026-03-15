import asyncio
from playwright.async_api import async_playwright

async def capture_1440p():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        print("Loading https://www.nexoragrowth.es in 1440p...")
        await page.goto("https://www.nexoragrowth.es", wait_until="networkidle")
        await page.wait_for_timeout(2000)  # Wait for animations
        
        # Get full page height
        full_height = await page.evaluate("document.body.scrollHeight")
        
        # Set viewport to capture full page
        await page.set_viewport_size({"width": 1440, "height": full_height})
        
        filename = "nexora_landing_1440p.png"
        await page.screenshot(path=filename, full_page=True)
        
        await browser.close()
        print(f"[OK] 1440p full page screenshot: {filename}")
        print(f"[OK] Resolution: 1440 x {full_height}px")

asyncio.run(capture_1440p())
