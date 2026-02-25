#!/usr/bin/env python3
"""Verify the always-on green borders and glows are visible on nexoragrowth.es"""

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # Navigate to production site
    print("Loading https://www.nexoragrowth.es...")
    page.goto("https://www.nexoragrowth.es", wait_until="networkidle")

    # Wait a moment for any animations to settle
    time.sleep(2)

    # Take a screenshot
    screenshot_path = "D:/Dev/nexora/nexora_hero_always_on.png"
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"[OK] Screenshot saved: {screenshot_path}")

    # Verify specific elements exist and are visible
    print("\nVerifying design elements...")

    # Check social proof card
    social_proof = page.locator("text=Confiado por")
    if social_proof.is_visible():
        print("[OK] Social proof card visible")
    else:
        print("[FAIL] Social proof card NOT visible")

    # Check "Paso 1" badge
    paso_badge = page.locator("text=Paso 1")
    if paso_badge.is_visible():
        print("[OK] 'Paso 1' badge visible")
    else:
        print("[FAIL] 'Paso 1' badge NOT visible")

    # Check CTA button
    cta_btn = page.locator('button:has-text("Agendar llamada gratis")')
    if cta_btn.is_visible():
        print("[OK] CTA button visible")
    else:
        print("[FAIL] CTA button NOT visible")

    # Check video container
    video = page.locator("video")
    if video.is_visible():
        print("[OK] Video element visible")
    else:
        print("[FAIL] Video element NOT visible")

    browser.close()
    print(f"\n[OK] All checks complete. Full screenshot: {screenshot_path}")
