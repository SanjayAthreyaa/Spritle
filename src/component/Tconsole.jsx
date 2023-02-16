import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Nheader from './Nheader';


const Item = ({name, id})=>{

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [task, setTask] = useState()
 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const postTask = () =>{
    console.log(task);
    setOpen(false)
    const taskSchema = {
      task:task,
      s_id:id
    }
    fetch('http://localhost:3004/tasks', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskSchema),
      })
  }

  return(
    <div className='border border-primary-subtle m-3 p-2 px-4 mx-4 rounded border-2 d-flex justify-content-between' style={{backgroundColor:"#f5f5dc"}}>
      <div className=''>{name}</div>
      <Button
              type="submit"
              variant="contained"
              onClick={handleOpen}
            >
              Assign a Task
            </Button>

            
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h5 id="parent-modal-title fs-3 mb-1">Assign a Task</h5>
          <TextField fullWidth label="Enter the task" id="fullWidth" value={task}
              onChange={(e)=> setTask(e.target.value)} />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=> postTask()}
            >
              Post
            </Button>
        </Box>
      </Modal>
    </div>
  )
}


const Tconsole = () => {

  const [student , setStudent] = useState()

  const getStudents = async()=>{
   const data =  await fetch(
      `http://localhost:3004/student`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.json()) 
   
    setStudent(data)
  }
  
  useEffect(() => {
   getStudents()
  
  }, [])
  

  return (
    <>
    <Nheader/>
      <div className='d-flex justify-content-center m-3 fw-bold fs-3'>Welcome to Teacher's Dashboard</div>
      <div className=' m-3 fw-bold fs-5'>Student List</div>
      <div>
              {student?.length &&
                student?.map((item, i) => (
                  <div key={i}>
                    <Item name={item.fullName} id={item.id}/>
                    {/* <hr /> */}
                  </div>
                ))}
      </div>
      
    </>
   

  )
}

export default Tconsole