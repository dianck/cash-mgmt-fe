describe('View Page Details', () => {
  it("login, verify logout button, perform logout, and verify login button", () => {
    cy.visit("/");

    // Klik tombol login
    cy.get('[data-cy="login-button"]').click();

    // Verifikasi masuk ke halaman login
    cy.url().should("include", "/login");

    // Isi form login
    cy.get('[data-cy="username-input"]').type("graha");
    cy.get('[data-cy="password-input"]').type("Asd123");

    // Klik tombol submit login
    cy.get('[data-cy="submit-login"]').click();

    // Verifikasi login berhasil dan tombol logout muncul
    cy.get('[data-cy="logout-button"]', { timeout: 10000 }).should("exist");

    // Klik tombol logout
    cy.get('[data-cy="logout-button"]').click();

    // Verifikasi kembali ke halaman login ATAU homepage
    cy.url().should("include", "/");

    // Verifikasi tombol login muncul lagi
    cy.get('[data-cy="login-button"]').should("exist");
  });
});


// describe('View Page Details', () => {
//   it("login, verify logout button, verify menu", () => {
//     cy.visit("/");

//     // Klik tombol login
//     cy.get('[data-cy="login-button"]').click();

//     // Verifikasi masuk ke halaman login
//     cy.url().should("include", "/login");

//     // Isi form login
//     cy.get('[data-cy="username-input"]').type("graha");
//     cy.get('[data-cy="password-input"]').type("Asd123");

//     // Klik tombol submit login
//     cy.get('[data-cy="submit-login"]').click();

//     // Verifikasi login berhasil dan tombol logout muncul
//     cy.get('[data-cy="logout-button"]', { timeout: 10000 }).should("exist");

//     // Verifikasi beberapa menu muncul
//     cy.get('[data-cy="menu-cash"]').should("exist");
//     cy.get('[data-cy="menu-business"]').should("exist");
//     cy.get('[data-cy="menu-gold"]').should("exist");
//     cy.get('[data-cy="menu-dasboard"]').should("exist");
//     cy.get('[data-cy="menu-events"]').should("exist");
//     cy.get('[data-cy="menu-records"]').should("exist");
//   });
// });
