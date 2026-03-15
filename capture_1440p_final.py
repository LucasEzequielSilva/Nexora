import asyncio
from playwright.async_api import async_playwright

async def capture_1440p_final():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        print("Loading https://www.nexoragrowth.es...")
        await page.goto("https://www.nexoragrowth.es", wait_until="networkidle")
        
        print("Waiting for particles to accumulate and all animations to settle...")
        # Wait for initial load
        await page.wait_for_timeout(1000)
        
        # Scroll to bottom to trigger all lazy-loaded elements
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)
        
        # Scroll back to top
        await page.evaluate("window.scrollTo(0, 0)")
        
        # Wait for particles to accumulate and animations to stabilize
        await page.wait_for_timeout(5000)
        
        # Get full page height
        full_height = await page.evaluate("document.body.scrollHeight")
        
        # Set viewport to capture full page
        await page.set_viewport_size({"width": 1440, "height": full_height})
        
        # Final wait to ensure everything is rendered
        await page.wait_for_timeout(2000)
        
        filename = "nexora_landing_1440p_final.png"
        await page.screenshot(path=filename, full_page=True)
        
        await browser.close()
        print(f"[OK] Final 1440p screenshot: {filename}")
        print(f"[OK] Resolution: 1440 x {full_height}px")
        print(f"[OK] Particles accumulated, all animations settled")

asyncio.run(capture_1440p_final())
