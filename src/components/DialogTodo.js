import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, TextField, Typography, Button, Checkbox, IconButton } from '@material-ui/core';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { edit_todo, fetch_todos } from './Constants';

function DialogTodo({ openEditTodoDialog,
						setOpenEditTodoDialog,
						updatedTodoTitle,
						setUpdatedTodoTitle,
						checked,
						setChecked,
						updateTodoId,
						 }) {

	
const [ editTodo ] = useMutation(edit_todo, { refetchQueries: [{ query:fetch_todos }] })

	const handleClose = () => {
		setOpenEditTodoDialog(false);
	}

	const handleChange = e => {
		setUpdatedTodoTitle(e.target.value)
	}

	const handleCheckbox = (event) => {
    setChecked(!checked);
  };

  	const handleUpdate = () => {

  		editTodo({ variables: { id:updateTodoId, title:updatedTodoTitle, completed:checked } })
  		handleClose();
  	}

console.log(updatedTodoTitle)

	return (
		
		<Dialog fullWidth open={openEditTodoDialog} onClose={handleClose}>
			<DialogTitle> 
				<Typography >Edit Todo</Typography>
			</DialogTitle>
			<Grid container 
			justify="center"
			direction="row"
			
			>
			<DialogContent> 
				<Grid item xs={10}>
				<TextField 
					value={updatedTodoTitle}
					onChange={e=>{handleChange(e)}}
					variant="outlined"

				/> 				
				</Grid>
				<Grid item xs={1}>
				<IconButton onClick={handleCheckbox}> { checked  ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> } </IconButton>
				</Grid>

			</DialogContent>
			</Grid>

			<DialogActions> 
				<Button color="primary" size="small" variant="contained" onClick={ handleUpdate }> Update Todo </Button>
				<Button color="secondary" size="small" variant="contained" onClick={handleClose}> Cancel </Button>


			</DialogActions>

		</Dialog>
		
		
		);
}

export default DialogTodo;