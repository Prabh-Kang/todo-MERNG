import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Typography, Input, makeStyles, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { MdAddBox } from 'react-icons/md';
import { add_todo, fetch_todos } from './Constants';

function AddTodo() {
	const inputRef = useRef();

	useEffect(() => {

		inputRef.current.focus();
	
	}, [])

	const [title, setTitle] = useState("");

	const handleTitle = (e) => {
		setTitle(e.target.value);
	}

	const submitHandler = (e) => {

		if (title !== "") {
		addTodo({variables: { title, completed:false }})
		setTitle("");
		inputRef.current.focus();
		}
	}


	const [addTodo] = useMutation(add_todo, {refetchQueries:[{query:fetch_todos}]})

	const useStyle = makeStyles({
		buttonStyle: {
			margin: "20px",
			fontWeight: "800",
		}
		
	});

	const classes = useStyle();



	return (

		<div className="addTodoDiv">
          
            <TextField
              value={title}
              variant="outlined"              
              inputRef={inputRef}
              label="Enter the todo"
              onChange={(e) => handleTitle(e)}
              InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton onClick={e=> {submitHandler(e)}}><MdAddBox style={{color:"blue"}}/></IconButton></InputAdornment>,

          }}
              	
              
            />

		</div>

		)
}

export default AddTodo;