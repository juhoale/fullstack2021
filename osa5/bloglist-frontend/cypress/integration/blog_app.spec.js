describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'Testaaja',
      password: 'salasana',
      name: 'Timo Testaaja'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('salasana')
      cy.get('#loginBtn').click()

      cy.contains('Timo Testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('password')
      cy.get('#loginBtn').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'Testaaja', password: 'salasana' })
    })

    it('a blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Testiä pukkaa')
      cy.get('#author').type('Testittelijä')
      cy.get('#url').type('testit.com/testi')
      cy.get('#createBtn').click()
      cy.contains('Testiä pukkaa Testittelijä')
    })

    it('Blog can be liked', function() {
      cy.login({ username: 'Testaaja', password: 'salasana' })
      cy.createBlog({ title: 'Tykkää tästä', author: 'Jaska', url: 'parhaat.blogit/1' })
      cy.contains('view').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    it('Blogs creator can delete blog', function() {
      cy.login({ username: 'Testaaja', password: 'salasana' })
      cy.createBlog({ title: 'Poista tää', author: 'Jaska', url: 'parhaat.blogit/1' })
      cy.contains('view').click()
      cy.contains('Delete').click()
      cy.contains('Blog deleted')
    })

    it('most liked blog is at the top of the list', function () {
      cy.login({ username: 'Testaaja', password: 'salasana' })

      cy.createBlog({ title: 'Ok blog', author: 'Jaska', url: 'ok.blogit/1' })
      cy.createBlog({ title: 'Worst blog', author: 'Jaska', url: 'surkeimmat.blogit/1' })
      cy.createBlog({ title: 'Best blog', author: 'Jaska', url: 'parhaat.blogit/1' })

      cy.contains('Ok blog').contains('view').click()
      cy.contains('Worst blog').contains('view').click()
      cy.contains('Best blog').contains('view').click()

      cy.contains('Ok blog').contains('Like').click()
      cy.contains('Best blog').contains('Like').click().click()
      cy.wait(3000)

      cy.get('#blog').first().should('contain', 'Best blog')
    })
  })
})