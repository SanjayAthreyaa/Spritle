import React , {useState, useEffect}from 'react'
import Button from '@mui/material/Button';
import Nheader from './Nheader';





//   const Item = ({name, id})=>{

//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const [answer, setAnswer] = useState()
   
  
//     const style = {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: 400,
//       bgcolor: 'background.paper',
//       border: '2px solid #000',
//       boxShadow: 24,
//       p: 4,
//     };
  
//     const postAnswer = () =>{
      
//       setOpen(false)
//       const taskSchema = {
//         task:name,
//         s_id:id,
//         answer:answer
//       }
//       fetch('http://localhost:3004/tasks', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify(taskSchema),
//         })
//     }
  
//     return(
//       <div className='border border-primary-subtle m-3 p-2 px-4 mx-4 rounded border-2 d-flex justify-content-between' style={{backgroundColor:"#f5f5dc"}}>
//         <div className=''>{name} poooooo</div>
//         <Button
//                 type="submit"
//                 variant="contained"
//                 onClick={handleOpen}
//               >
//                 Post Answer
//               </Button>
  
              
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="parent-modal-title"
//           aria-describedby="parent-modal-description"
//         >
//           <Box sx={{ ...style, width: 400 }}>
//             <h5 id="parent-modal-title fs-3 mb-1">Post the answer</h5>
//             <TextField fullWidth label="Enter the task" id="fullWidth" value={answer}
//                 onChange={(e)=> setAnswer(e.target.value)} />
//             <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 onClick={()=> postAnswer()}
//               >
//                 Post
//               </Button>
//           </Box>
//         </Modal>
//       </div>
//     )
//   }
  
const solve =(t) =>{

 

    function plus(x){
        return function(y){
          return y+x;
        };
      }
      
      function minus(x){
        return function(y){
          return y-x;
        };
      }
      function times(x){
        return function(y){
          return y*x;
        };
      }
      
      function dividedBy(x){
        return function(y){
          return y/x;
        };
      }
      
      function one(fn){
          return fn ? fn.call(void 0, 1) : 1;
      }
      function two(fn){
        return fn ? fn.call(void 0, 2) : 2;
      }
      function three(fn){
        return fn ? fn.call(void 0, 3) : 3;
      }
      
      function number(num){
    
    
        return function(fn){
          return fn ? fn.call(void 0, num) : num;
        };
      }
      
      function four(fn){
        return number(4)(fn);
      }
      function five(fn){
        return number(5)(fn);
      }
      function six(fn){
        return number(6)(fn);
      }
      function seven(fn){
        return number(7)(fn);
      }
      function eight(fn){
        return number(8)(fn);
      }
      function nine(fn){
        return number(9)(fn);
      }
    



    t.map((i)=>{
       
        let s= i.task.split(" ")
        let a = eval(s[0])
        let b = eval(s[1])
        let c = eval(s[2])
  
        let result = {
         ...i,answer:  a(b(c()))
        }


        
        fetch(`http://localhost:3004/tasks/${i.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
              })
    })
    window.location.reload()
  
}


const Sconsole = () => {

    const [tasks, setTasks] = useState()
    

    const getTasks = async()=>{
        const data =  await fetch(
           `http://localhost:3004/tasks`,
           {
             method: 'GET',
             headers: {
               'Content-Type': 'application/json',
             }
           }
         ).then((res) => res.json()) 
          
         setTasks(data)
       }
       
       useEffect(() => {
        getTasks()
       
       }, [])

     
      let pending = tasks?.filter(i=> !i.answer)
      let completed = tasks?.filter((i)=> i.answer)
      

  return (
   <>
   <Nheader/>
    <div className='d-flex justify-content-center m-3 fw-bold fs-3'>Welcome to Student Dashboard</div>
     
    <div className='m-3 fw-bold fs-5'>Pending Tasks</div> 
    <div>
              {pending?.length > 0 && 
                pending?.map((item, i) => (
                  <div key={i} className='border border-primary-subtle m-3 p-2 px-4 mx-4 rounded border-2 d-flex justify-content-between' style={{backgroundColor:"#f5f5dc"}}>
                    {item.task}
                  </div>
                ))}
              {pending?.length > 0 && <div className='d-flex justify-content-center'><Button variant="contained"  onClick={()=> solve(tasks)}>Solve tasks</Button></div>}
    </div>
    {!pending?.length && <div className='border border-primary-subtle m-3 p-2 px-4 mx-4 rounded border-2 d-flex justify-content-between' style={{backgroundColor:" rgb(222, 191, 191)"}}>No pending tasks</div>} 
   
    <div className='m-3 fw-bold fs-5'>Completed Tasks</div>
    <div>
              {completed?.length && 
                completed?.map((item, i) => (
                  <div key={i} className='border border-primary-subtle m-3 p-2 px-4 mx-4 rounded border-2 d-flex justify-content-between' style={{backgroundColor:"#f5f5dc"}}>
                    {item.task}
                  </div>
                ))}
            
      </div>
   </>
  )
}

export default Sconsole
