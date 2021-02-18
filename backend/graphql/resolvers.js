const Todo = require('../mongodb/todo');

module.exports = {
    Query: {
        getTodos: async () => {
            return await Todo.find().sort({ createdAt: -1 });
            
        }
    },

    Mutation: {

        addTodo: (parent, { todoDetail: { title, completed } }) => {

            const newTodo = new Todo({ title, completed });

            return newTodo.save()
            .then(result => {
                return { ...result._doc, id:result.id }
            })
            .catch(err => console.log(err))
        },

        editTodo: (_, { todoDetail: { id, title, completed } }) => {
            
            const updateFields = {};
            if (title) {
                updateFields.title = title;
            }
            if(completed != null) {
                updateFields.completed = completed;
            }
            console.log(updateFields)

            return Todo.findByIdAndUpdate(id,
                updateFields,
                {upsert:true,
                    new:true}
            )
               .then(result => {
                console.log(result._doc)
                return { ...result._doc, id:result.id }    
                })
            .catch(err => console.log(err))

        },

        deleteTodo: async(_, {sendId: { id }}) => {
            return await Todo.findByIdAndRemove(id).then(deletedTodo => deletedTodo)
            
        }

    }
}