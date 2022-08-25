const todoReducer = (state=(JSON.parse(localStorage.getItem('todos')) || []), action) => {
  switch(action.type){
    case 'ADD_TODO':
      const newTodos = [...state, action.payload]; 
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;

    case 'DELETE_TODO':
      const newListArrayDel = state.filter((item1) => {
        return action.payload !== item1.id; //action.payload = id (id of item to delete)
      });
      localStorage.setItem('todos', JSON.stringify(newListArrayDel));
      return newListArrayDel;

    case 'CLEAR_COMPLETED':
      const newListArrayClr = state.filter(item1 => !item1.isCompleted);
      localStorage.setItem("todos", JSON.stringify(newListArrayClr));
      return newListArrayClr;
      
    default:
      return state;
  }
}
export default todoReducer;