/* eslint-disable no-undef */

const newTodo = "new todo"
const newTodoUpdated = "todo updated"
//const deleteButton = "Remove"
addTodo = (todo) => {
  cy.get('#add-todo').type(todo);
  cy.get('#add-todo-button').click()
}
clearInput = () => {
  cy.get('#add-todo').clear()
}
describe('Todo testing', () => {
    it('Should open the application', () => {
      cy.visit('http://localhost:8081')
      addTodo(newTodo)
      cy.contains(newTodo)
    })

    it('Should Deleted a todo',() => {
      cy.get('.delete-todo').click({ multiple: true });
      cy.get('#app').should('not.contain',newTodo);
    })

    it('should edit a todo',() => {
      addTodo(newTodo);
      cy.get('.edit-todo').click({multiple:true});
      clearInput()
      addTodo(newTodoUpdated);
      cy.get("#app").should('not.contain',newTodo);
      cy.get("#app").contains(newTodoUpdated);
    })

    it('edit todo status',() => {
      cy.get('#app').contains('TODO');
      cy.get('.state-select').select('DOING');
      cy.get('#app').contains('DOING')
    })
})