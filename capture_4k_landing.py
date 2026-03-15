#!/usr/bin/env python3
"""Capture full landing page in 4K resolution"""

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    # 4K resolution: 3840x2160
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 3840, "height": 2160})

    print("Loading https://www.nexoragrowth.es in 4K...")
    page.goto("https://www.nexoragrowth.es", wait_until="networkidle")

    time.sleep(3)

    # Full page screenshot in 4K
    screenshot_path = "D:/Dev/nexora/nexora_landing_4k_full.png"
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"[OK] 4K full page screenshot: {screenshot_path}")

    browser.close()
    print(f"[OK] Screenshot captured successfully")
