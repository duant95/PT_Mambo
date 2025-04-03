import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './App.css';

function App() {
  // Estado de las tareas separadas por columna
  const [tareas, setTareas] = useState({
    pendiente: [],
    enProceso: [],
    finalizado: []
  });

  // Estado para los campos del formulario de nueva tarea
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: '',
    descripcion: '',
    persona_asignada: '',
    estado: 'pendiente'
  });

  // Definición de columnas y sus títulos legibles
  const columnas = {
    pendiente: 'Pendiente',
    enProceso: 'En Proceso',
    finalizado: 'Finalizado'
  };
  const ordenColumnas = ['pendiente', 'enProceso', 'finalizado'];

  // Cargar tareas desde la API al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/tareas');
      if (!res.ok) {
        console.error('Error al obtener tareas del servidor');
        return;
      }
      const data = await res.json();
      // Organizar las tareas en sus columnas según el estado
      const columnasData = { pendiente: [], enProceso: [], finalizado: [] };
      data.forEach((t) => {
        if (columnasData[t.estado]) {
          columnasData[t.estado].push(t);
        }
      });
      setTareas(columnasData);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  // Manejar el envío del formulario para agregar una nueva tarea
  const agregarTarea = async (e) => {
    e.preventDefault();
    // Validar que los campos obligatorios estén completos
    if (!nuevaTarea.nombre || !nuevaTarea.descripcion || !nuevaTarea.persona_asignada) {
      alert('Por favor, completa todos los campos de la tarea.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea)
      });
      if (res.ok) {
        const tareaCreada = await res.json();
        // Agregar la nueva tarea a la columna "pendiente"
        setTareas((prev) => ({
          ...prev,
          pendiente: [...prev.pendiente, tareaCreada]
        }));
        // Reiniciar campos del formulario
        setNuevaTarea({ nombre: '', descripcion: '', persona_asignada: '', estado: 'pendiente' });
      } else {
        console.error('Error al crear la tarea en el servidor');
      }
    } catch (error) {
      console.error('Error de red al crear la tarea:', error);
    }
  };

  // Manejar el evento de fin de drag & drop para reordenar o mover tareas
  const manejarDragEnd = async (result) => {
    const { source, destination } = result;
    // Si no hay destino, no hacer nada
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    // Si la tarea se soltó en la misma posición de la misma columna, no hacemos nada
    if (sourceCol === destCol && source.index === destination.index) return;

    // Si se reordena dentro de la misma columna:
    if (sourceCol === destCol) {
      const columnTasks = Array.from(tareas[sourceCol]);
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);
      setTareas((prev) => ({
        ...prev,
        [sourceCol]: columnTasks
      }));
      return;
    }

    // Si se mueve entre columnas:
    // Primero, asegurarse de que las columnas existen

    const sourceTasks = Array.from(tareas[sourceCol]);
    const destTasks = Array.from(tareas[destCol]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // Actualizamos el estado de la tarea para reflejar la nueva columna
    movedTask.estado = destCol;
    destTasks.splice(destination.index, 0, movedTask);

    setTareas((prev) => ({
      ...prev,
      [sourceCol]: sourceTasks,
      [destCol]: destTasks
    }));

    // Actualizar el backend con el nuevo estado
    try {
      const res = await fetch(`http://localhost:8000/api/tareas/${movedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: movedTask.nombre,
          descripcion: movedTask.descripcion,
          persona_asignada: movedTask.persona_asignada,
          estado: movedTask.estado
        })
      });
      if (!res.ok) {
        console.error('Error al actualizar el estado de la tarea en el servidor');
      }
    } catch (error) {
      console.error('Error de red al actualizar tarea:', error);
    }
  };

  return (
    <div className="App">
      <h2>Tareas</h2>
      {/* Formulario para agregar nueva tarea */}
      <form className="form" onSubmit={agregarTarea}>
        <input
          className="input"
          type="text"
          placeholder="Tarea"
          value={nuevaTarea.nombre}
          onChange={(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })}
        />
        <input
          className="input"
          type="text"
          placeholder="Descripción"
          value={nuevaTarea.descripcion}
          onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
        />
        <input
          className="input"
          type="text"
          placeholder="Persona asignada"
          value={nuevaTarea.persona_asignada}
          onChange={(e) => setNuevaTarea({ ...nuevaTarea, persona_asignada: e.target.value })}
        />
        <button className="button" type="submit">Agregar Tarea</button>
      </form>

      {/* Tablero con drag & drop */}
      <DragDropContext onDragEnd={manejarDragEnd}>
        <div className="board">
          {ordenColumnas.map((colId) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                  <div className="columnTitle">{columnas[colId]}</div>
                  <div className="taskList">
                    {tareas[colId].map((tarea, index) => (
                      <Draggable key={tarea.id.toString()} draggableId={tarea.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task"
                          >
                            <h4>{tarea.nombre}</h4>
                            <p>{tarea.descripcion}</p>
                            <small>Asignado a: {tarea.persona_asignada}</small>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
