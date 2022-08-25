export const setMode = (mode) => {
  return {
    type: 'SET_MODE',
    payload: mode
    }
} 
export const addTodo = (text) => {
  return{
    type: 'ADD_TODO',
    payload: {text: text, id: new Date(), isCompleted: false }
  }
}
export const deleteTodo = (id) => {
  return{
    type: 'DELETE_TODO',
    payload: id
  }
}
export const clearCompleted = () => {
  return{
    type: 'CLEAR_COMPLETED'
  }
}