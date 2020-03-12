export const routes = {
  serverURL: 'http://localhost:3000',
  getTodos: 'getTodos',
  getUsers: 'getUsers',
  addTodo: 'addTodo',
  addUser: 'addUser',
  deleteTodo: 'deleteTodo',
  deleteUser: 'deleteUser',
  updateTodo: 'updateTodo',
  disableTodo: 'disableTodo',
  updateTodos: 'updateTodos'
};

export const angularComponent = {
  selector: {
    app: 'app-root',
    mainTable: 'app-main-table',
    users: 'app-users'
  },
  templateUrl: {
    app: './app.component.html',
    mainTable: './main-table.component.html',
    users: './users.component.html',
    add: './add.component.html',
    dialogDelete: 'dialog-delete.component.html'
  },
  styleUrls: {
    app: ['./app.component.css'],
    mainTable: ['./main-table.component.css'],
    users: ['./users.component.css'],
    add: ['./add.component.css'],
    dialogDelete: ['dialog-delete.component.css']
  }
};

export const snack = {
  duration: 3000,
  close: 'Close',
  success: {
    todo: 'Todo was added successfully',
    user: 'User was added successfully',
    todoAndUser: 'Todo and user were added successfully'
  },
  error: {
    todo: 'Some data is filled wrong',
    user: 'User already exists',
    todoAndUser: 'Todo was added successfuly, but user already exists'
  }
};

export const deleteDialog = {
  width: '300px'
};