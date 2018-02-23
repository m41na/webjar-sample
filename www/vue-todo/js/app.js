/*global Vue, todoStorage */

(function (exports) {

	'use strict';

	var filters = {
		all: function (todos) {
			return todos;
		},
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		completed: function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			});
		}
	};

	exports.app = new Vue({

		// the root element that will be compiled
		el: '.todoapp',

		// app initial state
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		},

		// watch todos change for localStorage persistence
		watch: {
			todos: {
				deep: true,
				handler: todoStorage.save
			}
		},

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			filteredTodos: function () {
				return filters[this.visibility](this.todos);
			},
			remaining: function () {
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			}
		},

		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {

			pluralize: function (word, count) {
				return word + (count === 1 ? '' : 's');
			},

			addTodo: function () {
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				
				let self = this;
				$.ajax({
					url: 'http://localhost:7080/ws/u/todos/add_todo',
					type: 'post',
					data: JSON.stringify({name: value}),
					contentType: 'application/json',
					success(data){
						console.log(data)
						self.todos.push({ title: value, completed: false });
						self.newTodo = '';
					},
					error(xhr){
						console.log(xhr.responseText)
					}
				});
				
			},

			removeTodo: function (todo) {
				let self = this;
				$.ajax({
					url: 'http://localhost:7080/ws/u/todos/remove_todo',
					type: 'post',
					data: JSON.stringify({name: todo.title}),
					contentType: 'application/json',
					success(data){
						console.log(data)
						var index = self.todos.indexOf(todo);
						self.todos.splice(index, 1);
					},
					error(xhr){
						console.log(xhr.responseText)
					}
				});
				
			},

			editTodo: function (todo) {
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},

			doneEdit: function (todo) {
				if (!this.editedTodo) {
					return;
				}
				
				$.ajax({
					url: 'http://localhost:7080/ws/u/todos/rename_todo',
					type: 'post',
					data: JSON.stringify({current: this.beforeEditCache, name: todo.title}),
					contentType: 'application/json',
					success(data){
						console.log(data)
						self.editedTodo = null;
						todo.title = todo.title.trim();
						
						if (!todo.title) {
							self.removeTodo(todo);
						}
					},
					error(xhr){
						console.log(xhr.responseText)
					}
				});
			},

			cancelEdit: function (todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {
				let self = this;
				$.ajax({
					url: 'http://localhost:7080/ws/u/todos/clear_completed',
					type: 'post',
					data: JSON.stringify({}),
					contentType: 'application/json',
					success(data){
						console.log(data)
						self.todos = filters.active(self.todos);
					},
					error(xhr){
						console.log(xhr.responseText)
					}
				});
			},
			
			toggleCompleted: function(todo){
				let self = this;
				$.ajax({
					url: 'http://localhost:7080/ws/u/todos/update_todo_status',
					type: 'post',
					data: JSON.stringify({name: todo.title, done: !todo.coompleted}),
					contentType: 'application/json',
					success(data){
						console.log(data)
					},
					error(xhr){
						console.log(xhr.responseText)
					}
				});
			}
		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			'todo-focus': function (el, binding) {
				if (binding.value) {
					el.focus();
				}
			}
		},
		
		mounted(){
			let self = this;
			$.ajax({
				url: 'http://localhost:7080/ws/q/todos/all_todos',
				type: 'post',
				data: JSON.stringify({}),
				contentType: 'application/json',
				success(data){
					let rows = data['all_todos'];
					var names = rows.reduce((acc, val)=>{
						acc.push({title: val.item_name, completed: val.completed == 1});
						return acc;
					}, []);
					console.log(names);
					self.todos = names;
				},
				error(xhr){
					console.log(xhr.responseText)
				}
			});
		}
	});

})(window);
