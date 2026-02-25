#!/usr/bin/env python3
"""Take focused screenshots of each card section"""

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    print("Loading https://www.nexoragrowth.es...")
    page.goto("https://www.nexoragrowth.es", wait_until="networkidle")

    time.sleep(2)

    # Scroll to Testimonials section
    page.locator("text=Lo dicen los que ya lo usaron").first.evaluate(
        "el => el.scrollIntoView()"
    )
    time.sleep(1)
    ss1 = "D:/Dev/nexora/section_testimonials.png"
    page.screenshot(path=ss1)
    print(f"[OK] Testimonials section: {ss1}")

    # Scroll to Pillars section
    page.locator("text=Como llenamos tu agenda en 30 dias").first.evaluate(
        "el => el.scrollIntoView()"
    )
    time.sleep(1)
    ss2 = "D:/Dev/nexora/section_pillars.png"
    page.screenshot(path=ss2)
    print(f"[OK] Pillars section: {ss2}")

    # Scroll to Niches section
    page.locator("text=Probado en estos rubros").first.evaluate(
        "el => el.scrollIntoView()"
    )
    time.sleep(1)
    ss3 = "D:/Dev/nexora/section_niches.png"
    page.screenshot(path=ss3)
    print(f"[OK] Niches section: {ss3}")

    # Scroll to Comparison section
    page.locator("text=¿Funciona para tu negocio?").first.evaluate(
        "el => el.scrollIntoView()"
    )
    time.sleep(1)
    ss4 = "D:/Dev/nexora/section_comparison.png"
    page.screenshot(path=ss4)
    print(f"[OK] Comparison section: {ss4}")

    browser.close()
    print(f"\n[OK] All section screenshots captured")
