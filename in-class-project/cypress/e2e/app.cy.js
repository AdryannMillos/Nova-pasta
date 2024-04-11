import assert from 'assert';
class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    imageUrlFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit')
  }

  typeTitle(text) { 
    if(!text) return;
    this.elements.titleInput().type(text);
  }

  typeUrl(text) {
    if(!text) return;
    this.elements.imageUrlInput().type(text);
  }

  clickSubmit() {
    this.elements.submitBtn().click();
  }
}

const registerForm = new RegisterForm();
const colors = {
  error: 'rgb(220, 53, 69)',
  success: ''
} 
describe("Image Registration", () => {
  describe("Submitting an image with invalid inputs", () => {
    after(() => {
    cy.clearAllLocalStorage();   
  })
    const input = {
      title: '',
      url: ''
    }
    it("Given I am on the image registration page", () => {
      cy.visit("/");
    });

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title);
    });

    it(`Then I enter "${input.url}" in the url field`, () => {
      registerForm.typeUrl(input.url);
    });

    
    it(`Then I click then submit button`, () => {
      registerForm.clickSubmit();
    });

    it(`Then I should see "Please type a title for the image" message above the title field`, () => {
      registerForm.elements.titleFeedback().should('be.visible').should('contains.text', 'Please type a title for the image');
    });

    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements.imageUrlFeedback().should('be.visible').should('contains.text', 'Please type a valid URL');
    });

    it(`And I should see an exclamation icon in the title and URL fields`, () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element)
        const border = styles.getPropertyValue('border-right-color');
        assert.strictEqual(border, colors.error);
      })
    });

  });
});
