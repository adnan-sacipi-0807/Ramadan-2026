from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Emulate a mobile device since "auf dem Handy" was mentioned
    context = browser.new_context(viewport={"width": 375, "height": 812})
    page = context.new_page()

    # 1. Load page
    page.goto("http://localhost:8080/index.html")

    # 2. Verify Header Clean (screenshot top)
    page.screenshot(path="verification_header.png")

    # 3. Verify Sticky Navigation
    # Scroll down past the header to make tabs stick
    # The header is not huge, 200px should be enough to push it up
    page.evaluate("window.scrollBy(0, 200)")
    page.wait_for_timeout(500) # wait for scroll
    page.screenshot(path="verification_sticky.png")

    # 4. Verify Calendar Highlight
    # Click on "Kalender" tab
    page.click("button[data-tab='table']")
    page.wait_for_timeout(500)
    # Scroll to the highlighted row (class "today")
    # Need to find the element first
    today_row = page.locator("tr.today")
    if today_row.count() > 0:
        today_row.scroll_into_view_if_needed()
        print("Found today row")
    else:
        print("Today row not found!")

    page.screenshot(path="verification_calendar.png")

    # 5. Verify Footer Clean
    # Scroll to bottom
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(500)
    page.screenshot(path="verification_footer.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
