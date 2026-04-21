import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "studio.html",
  "services.html",
  "work.html",
  "contact.html",
  "privacy.html",
  "support.html",
];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

for (const page of pages) {
  test(`${page} exists`, () => {
    assert.equal(fs.existsSync(path.join(root, page)), true);
  });
}

test("all pages include a title and shared assets", () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /<title>.+<\/title>/i);
    assert.match(html, /assets\/css\/styles\.css/i);
    assert.match(html, /assets\/js\/site\.js/i);
  }
});

test("all pages include links to privacy and support", () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /href="privacy\.html"/i);
    assert.match(html, /href="support\.html"/i);
  }
});

test("homepage introduces the new BreadsBasket studio clearly", () => {
  const html = read("index.html");
  assert.match(html, /BreadsBasket Studio/i);
  assert.match(html, /software atelier/i);
  assert.match(html, /iOS apps/i);
  assert.match(html, /casual games/i);
  assert.match(html, /advertising-supported products/i);
});

test("core navigation links the broader studio sections", () => {
  const html = read("index.html");
  assert.match(html, /href="studio\.html"/i);
  assert.match(html, /href="services\.html"/i);
  assert.match(html, /href="work\.html"/i);
  assert.match(html, /href="contact\.html"/i);
  assert.match(html, /href="privacy\.html"/i);
  assert.match(html, /href="support\.html"/i);
});

test("studio page explains the studio positioning", () => {
  const html = read("studio.html");
  assert.match(html, /About BreadsBasket Studio/i);
  assert.match(html, /editorial/i);
  assert.match(html, /product direction/i);
});

test("services page lists the new service lines", () => {
  const html = read("services.html");
  assert.match(html, /iOS product development/i);
  assert.match(html, /casual game production/i);
  assert.match(html, /live support operations/i);
  assert.match(html, /monetization systems/i);
});

test("work page presents product and studio capability tracks", () => {
  const html = read("work.html");
  assert.match(html, /Selected Work Patterns/i);
  assert.match(html, /Utility releases/i);
  assert.match(html, /ad-supported loops/i);
  assert.match(html, /release support/i);
});

test("contact and support pages route the named contacts", () => {
  const contact = read("contact.html");
  const support = read("support.html");
  assert.match(contact, /Benjamin/i);
  assert.match(contact, /William/i);
  assert.match(contact, /Catherine/i);
  assert.match(contact, /bussiness@breadsbasket\.com/i);
  assert.match(contact, /william@breadsbasket\.com/i);
  assert.match(contact, /support@breadsbasket\.com/i);
  assert.match(support, /Catherine/i);
  assert.match(support, /Frequently Asked Questions/i);
});

test("privacy page contains extended policy sections", () => {
  const html = read("privacy.html");
  assert.match(html, /Privacy Policy/i);
  assert.match(html, /Information We Collect/i);
  assert.match(html, /How We Use Information/i);
  assert.match(html, /Product Diagnostics and Analytics/i);
  assert.match(html, /Advertising and Monetization/i);
  assert.match(html, /Data Retention/i);
  assert.match(html, /International Transfers/i);
  assert.match(html, /Your Choices and Rights/i);
});

test("shared stylesheet defines the distinct breadsbasket visual system", () => {
  const css = read("assets/css/styles.css");
  assert.match(css, /Fraunces/i);
  assert.match(css, /--paper/i);
  assert.match(css, /--wheat/i);
  assert.match(css, /--ink/i);
});
