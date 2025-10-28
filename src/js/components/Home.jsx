import { useEffect, useState } from "react";

const Home = () => {

	let [lista, setLista] = useState([]);
	let [tarea, setTarea] = useState("");

	const API_URL = 'https://playground.4geeks.com/todo';

	const crearUsuario = () => {
		fetch(API_URL + "/users/lucas", {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		})
		.then(response => response.json())
		.then((data) => console.log(data))
		.catch(error => { console.log('Hubo un problema al obtener los personajes: \n', error) });
	};

	const traerTareas = () => {
		fetch(API_URL + "/users/lucas")
			.then((response) => {
				if(response.status === 404) crearUsuario();
				return response.json();
			})
			.then((data) => setLista(data.todos || []))
			.catch(error => { console.log('Hubo un problema al obtener los personajes: \n', error) });
	};

	const agregar = () => {
		if (tarea.trim() === "") return;

		fetch(API_URL + "/todos/lucas", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ label: tarea, is_done: false })
		})
		.then(() => {
			setTarea("");
			traerTareas();
		})
		.catch(error => { console.log('Hubo un problema al agregar tarea: \n', error) });
	};

	const eliminarTarea = (id) => {
		fetch(API_URL + "/todos/" + id, { method: "DELETE" })
			.then(() => traerTareas())
			.catch(error => { console.log('Hubo un problema al eliminar tarea: \n', error) });
	};

	useEffect(() => {
		traerTareas();
	}, []);

	return (
		<div className="d-flex flex-column">	
			<h1 className="text-secondary text-center">TodoList</h1>
			
			<input 
				className="form-control p-4" 
				type="text"  
				placeholder="agrega una tarea" 
				onChange={(e) => setTarea(e.target.value)}
				value={tarea} 
				onKeyDown={(e) => { if (e.key === "Enter") agregar(); }}
			/>

			<ul className="list-unstyled text-start list-group">
				{lista.map((item) => (
					<li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
						<span>{item.label}</span>
						<button className="btn btn-light border-0" onClick={() => eliminarTarea(item.id)}>❌</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
