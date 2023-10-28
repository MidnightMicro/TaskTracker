import "../App.css";
import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Container, FormControl, FormLabel } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Materials from "./Materials";

function TodoList() {
  const [todoTask, setTodoTask] = useState("");
  const [todoTasks, setTodoTasks] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [requiredMaterials, setRequiredMaterials] = useState("");

  //adds new task on click
  function onAddTask() {
    if (todoTask === "" || dueDate === "" || title === "") {
      alert("Please complete the form above");
    } else if (todoTask) {
      const newTodo = {
        title: title,
        todo: todoTask,
        completed: false,
        dueDate: dueDate,
        materials: requiredMaterials,
      };
      const newArray = [...todoTasks, newTodo];
      setTodoTasks(newArray);
      setTodoTask("");
      setRequiredMaterials("");
      setDueDate("");
      setTitle("");
    }
  }

  //edits tasks on click
  function onEditTask(index) {
    if (todoTask === "" && dueDate === "") {
      alert("Please enter text or provide a due date");
      return;
    }
    const newTodos = todoTasks.map((todo, todoIndex) => {
      if (todoIndex == index) {
        console.log(todoTasks);
        return ({
          title: todo.title,
          todo: todoTask !== "" ? todoTask : todo.todo,
          completed: false,
          materials: todo.materials,
          dueDate: dueDate !== "" ? dueDate : todo.dueDate,
        });
      }
    });
    setTodoTasks(newTodos);
    setTodoTask("");
    setDueDate("");
    console.log("task clicked");
  }

  //edits materials on click passed to OnEdit/Materials
  function onEditMaterials(index, materials) {
    const newTodos = todoTasks.map((task, todoIndex) => {
      if (todoIndex == index) {
        return (
          {
          title: task.title,
          todo: task.todo,
          completed: task.completed,
          materials,
          dueDate: task.dueDate,
        }
        );
      } else {
        return task
      }
    });
    setTodoTasks(newTodos);
  }

  //deletes materials on click
  function onDeleteMaterials(index) {
    onEditMaterials(index, "")
  }

  //deletes Todo task
  function onDelete(index) {
    const newTodoTasks = [...todoTasks];
    newTodoTasks.splice(index, 1);
    setTodoTasks(newTodoTasks);
    console.log("button clicked");
  }

  //handles checkbox
  const handleToggle = (clickedIndex) => () => {
    const newTodos = todoTasks.map((item, todoIndex) => {
      if (todoIndex == clickedIndex) {
        const newTodo = {
          title: item.title,
          todo: item.todo,
          completed: !item.completed,
          dueDate: item.dueDate,
          materials: item.materials,
        };
        return newTodo;
      } else {
        return item;
      }
    });
    setTodoTasks(newTodos);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            
          }}
        >
          <form>
            <FormControl
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "left",
                marginLeft: 3,
                width: 300,
              }}
            >
              <FormLabel>What do you want to do? </FormLabel>
              <TextField
                value={title}
                placeholder="Name your task"
                helperText="No more than 30 characters please!"
                inputProps={{ maxLength: 30 
                }}
                color="warning"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></TextField>
              <TextField
                sx={{ marginTop: 2, marginBottom: 2 }}
                placeholder="Play the guitar"
                helperText="It can be anything you want!"
                type="text"
                variant="outlined"
                value={todoTask}
                multiline
                rows={4}
                color="primary"
                onChange={(e) => {
                  setTodoTask(e.target.value);
                }}
              ></TextField>

              <TextField
                sx={{ marginBottom: 2 }}
                type="text"
                id="outlined-basic"
                label="Materials Needed?"
                variant="outlined"
                value={requiredMaterials}
                multiline
                rows={4}
                color="primary"
                onChange={(e) => {
                  setRequiredMaterials(e.target.value);
                }}
              />

              <TextField
                focused
                label="Due Date"
                type="date"
                variant="outlined"
                rows={1}
                color="secondary"
                value={dueDate} //lets it clear when task added.
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
              ></TextField>
            </FormControl>
            <br></br>
            <Button
              variant="contained"
              sx={{
                width: 150,
                display: "flex",
                flexDirection: "row",
                alignContent: "left",
                marginLeft: 3,
              }}
              onClick={onAddTask}
            >
              Add task
            </Button>
          </form>

          <List
            dense
            sx={{
              textAlign: "center",
              width: "100%",
              maxWidth: 300,
              alignContent: "left",
              marginLeft: 3,
            }}
          >
            {todoTasks.map((task, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              const editButtonKey = `edit-button-${index}`;
              const deleteButtonKey = `delete-button-${index}`;

              const formattedDueDate = new Date(
                task.dueDate
              ).toLocaleDateString();
              return (
                <Box
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    marginLeft: 3,
                    marginTop: 2,
                    width: 300,
                  }}
                > 
                  <Fragment key={index}>
                    <ListItem
                      key={index}
                      secondaryAction={
                        <Checkbox
                          color="success"
                          edge="end"
                          onChange={handleToggle(index)}
                          checked={task.completed}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      }
                      disablePadding
                    >
                      <ListItemText
                        sx={{
                          alignContent: "center",
                          marginLeft: 3,
                          width: 300,
                          marginRight: 5,
                        }}
                        key={index.id}
                        id={labelId}
                        primary={
                          <>
                            <h3>Title-   {task.title} </h3>
                            <ListItemText
                              sx={{
                                display: "flex",
                                // flexWrap: "wrap",
                                // alignContent: "left",
                                // marginLeft: 3,
                                width: 230,
                                // marginRight: 5,
                                // alignItems: "center",
                                // textOverflow: "ellipsis",
                                overflow: "auto",
                                maxHeight: 200,
                              }}
                            >
                              <>Task-
                              <div>
                                {task.todo} 
                              </div>
                              </>
                            </ListItemText>
                          </>
                        }
                        secondary={<>Due Date is - {`${formattedDueDate}`}</>}
                      />

                      {/* </ListItemButton> */}
                    </ListItem>
                    <Button
                      key={editButtonKey}
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        onEditTask(index);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      key={deleteButtonKey}
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        onDelete(index);
                      }}
                    >
                      Delete
                    </Button>
                  </Fragment>
                </Box>
              );
            })}
          </List>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            width: 500,
            marginTop: -6,
          }}
        >
          <Materials
            todoTasks={todoTasks}
            dueDate={dueDate}
            onEdit={onEditMaterials}
            onDelete={onDeleteMaterials}
          />
        </Container>
      </Container>
    </>
  );
}

export default TodoList;
