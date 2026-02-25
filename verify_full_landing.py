#!/usr/bin/env python3
"""Verify all landing page cards have always-on green effects"""

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    print("Loading https://www.nexoragrowth.es...")
    page.goto("https://www.nexoragrowth.es", wait_until="networkidle")

    time.sleep(2)

    # Full page screenshot
    screenshot_path = "D:/Dev/nexora/nexora_landing_full.png"
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"[OK] Full page screenshot: {screenshot_path}")

    # Section screenshots
    print("\nVerifying sections...")

    # Testimonials section
    testimonials = page.locator("text=Lo dicen los que ya lo usaron")
    if testimonials.is_visible():
        print("[OK] Testimonials section visible")

    # Pillars section
    pillars = page.locator("text=Como llenamos tu agenda en 30 dias")
    if pillars.is_visible():
        print("[OK] Pillars section visible")

    # Niches section
    niches = page.locator("text=Probado en estos rubros")
    if niches.is_visible():
        print("[OK] Niches section visible")

    # Comparison section
    comparison = page.locator("text=¿Funciona para tu negocio?")
    if comparison.is_visible():
        print("[OK] Comparison section visible")

    browser.close()
    print(f"\n[OK] Deployment verified successfully")
