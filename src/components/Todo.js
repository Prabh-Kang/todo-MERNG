import React, { useState } from 'react';
import DialogTodo from './DialogTodo';
import { useMutation } from '@apollo/react-hooks';
import { fetch_todos, delete_todo } from './Constants';
import { IconButton, Button, makeStyles, Grid, Paper, Checkbox } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MdModeEdit, MdDelete } from 'react-icons/md';



function Todo({ id, title, completed, createdAt }) {
	let dateData = new Date(Number(createdAt))
	let date = dateData.getDate()
	let month = dateData.getMonth()
	let year = dateData.getFullYear()
	let time = `${date}-${month}-${year} `



	const [openEditTodoDialog, setOpenEditTodoDialog] = useState(false);
	const [updatedTodoTitle, setUpdatedTodoTitle] = useState("");
	const [checked, setChecked] = useState(true);
	const [updateTodoId, setUpdateTodoId] = useState("");
	
	const [deleteTodo] = useMutation(delete_todo, {refetchQueries: [{query:fetch_todos}]});

	const handleDelete = (e) => {
		const id = e.target.id;
		deleteTodo({ variables: { id } });
		
	}

	const handleEdit = e => {
		setOpenEditTodoDialog(true);
		let receivedCheckedStatus = e.target.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].checked;
		let title = e.target.parentNode.parentNode.childNodes[0].childNodes[0].data;
		setUpdatedTodoTitle(title);
		setChecked(receivedCheckedStatus);
		setUpdateTodoId(e.target.id);
	}

	const useStyles = makeStyles({
	
		paperClass: {
			width:"30%",
			margin:"20px auto",
			padding:"10px 30px 10px 30px",
			fontSize:"1.2rem",
			textAlign:"left"
		},
	});

	const theme = createMuiTheme({
  overrides: {
  	MuiIconButton: {
  		label: {
  			pointerEvents:"none",
  		}
  	 }
  	}
  });
	const classes = useStyles();
	
return (

	<>
		<ThemeProvider theme={theme}>

			<Paper elevation={3} className={classes.paperClass}>

				<Grid container alignItems="center" spacing={1} className={classes.gridContainer}>

					<Grid item md={9} sm={6} >
						{title} 
					</Grid>
					<Grid item md={1} sm={2}>
						<Checkbox 
							checked={completed}
													
							
						/>
							

					</Grid>

					<Grid item md={1} sm={2}>
						<IconButton id={id} color="primary" onClick={e => handleEdit(e)} > <MdModeEdit className={classes.disableClick}/> </IconButton>
					</Grid>

					<Grid item md={1} sm={2}>
						<IconButton id={id} color="secondary" onClick={e => handleDelete(e)} > <MdDelete/> </IconButton>
					</Grid>

				</Grid>

			</Paper> 

		</ThemeProvider>

		<DialogTodo 
		openEditTodoDialog={openEditTodoDialog} 
		setOpenEditTodoDialog={setOpenEditTodoDialog} 
		updatedTodoTitle={updatedTodoTitle} 
		setUpdatedTodoTitle={setUpdatedTodoTitle} 
		checked={checked} 
		setChecked={setChecked} 
		updateTodoId={updateTodoId}
		setUpdateTodoId={setUpdateTodoId}
		/>

	</>

	);

}

export default Todo;