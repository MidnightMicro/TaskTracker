import List from "@mui/material/List";
import { Box, ListItem } from "@mui/material";
import FormDialog from "./EditButton";

function Materials({  todoTasks, onEdit, onDelete }) {
  return (
    <Box
    sx={{
      marginLeft: 5,
      width:500,
      textAlign: 'center',

    }}
  >
    <h2>Materials List</h2>
    <Box sx={{
        display: "flex",
        }}>

    <List sx={{
      border: 1,
      borderRadius:2,
      width:400,
    }}
   
    >
      <Box sx={{
        marginTop: 2
      }}>
      {todoTasks.map((task, index) => (
        <div key={index}>
          
          <ListItem 
          sx={{
            marginTop:-5,
          }}>
              <h4>Title:{task.title} </h4>
              </ListItem>
          <ListItem
          sx={{
            marginTop:-5,
          }}>
            Due Date: {task.dueDate}
            </ListItem>
          <ListItem sx={{
            marginTop:-3,
          }}>
            <h4>Materials Needed-</h4>
            </ListItem>
          
          <ListItem sx={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: -3,
              marginBottom: 5,
              height:150,
              maxheight:200,
              overflow: 'auto',
              border:1,
              borderRadius:2,
              width:400,
              maxwidth:400,
            }}
            alignItems='flex-start'
            >
            <div>
              {task.materials}
            </div>

            
            </ListItem>
            <ListItem sx={{
              marginBottom:3,
            }}>
            <FormDialog task={task} onEdit={onEdit} index={index} onDelete={onDelete}/>
            </ListItem>
          

        </div>
        
      ))}
      </Box>
    </List>
  
    </Box>
  
    </Box>
  );
}

export default Materials;
