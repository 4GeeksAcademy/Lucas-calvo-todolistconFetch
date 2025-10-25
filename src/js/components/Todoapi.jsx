import { useEffect, useState } from "react";

const Todoapi = () => {
  const [lista, setLista] = useState([]);

  const API_URL = "https://playground.4geeks.com/todo";

  const crearUsuario = () => {
    fetch ( API_URL+ "/users/lucas" ,{

      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
  })
      .then((response) => response.json())
      .then((data) => console.log("Usuario creado:", data))
      .catch((error) =>
        console.log("Error al crear el usuario:\n", error)
      );
  };

  const traerTareas = () => {
    fetch(API_URL+ "/users/lucas,")
      .then((response) => {
        if (response.status === 404) {
          crearUsuario();
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.todos) {
          setLista(data.todos);
        } else {
          console.log("No hay tareas para mostrar");
        }
      })
      .catch((error) =>
        console.log("Hubo un problema al obtener las tareas:\n", error)
      );
  };

  useEffect(() => {
    traerTareas();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" placeholder="Agregar tarea" />
      <ul>
        {lista.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todoapi;
