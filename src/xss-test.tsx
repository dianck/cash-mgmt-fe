// xss-test.ts
const unsafeInput = "<img src=x onerror=alert('XSS')>";
document.body.innerHTML = unsafeInput;
