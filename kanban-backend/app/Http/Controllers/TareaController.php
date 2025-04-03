<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    // Obtener todas las tareas
    public function index()
    {
        $tareas = Tarea::all();
        return response()->json($tareas);  // Devuelve la lista de tareas en formato JSON
    }

    // Guardar una nueva tarea
    public function store(Request $request)
    {
        // Validar datos requeridos (simplificado, solo campos básicos)
        // Podemos agregar validación más estricta si es necesario.
        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'persona_asignada' => 'required|string'
        ]);

        // Crear la tarea con estado "Pendiente" por defecto
        $tarea = Tarea::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'persona_asignada' => $request->persona_asignada,
            'estado' => 'Pendiente'
        ]);

        // Devolver la tarea creada en formato JSON
        return response()->json($tarea);
    }

    // Actualizar una tarea (por ejemplo, cambiar estado o editar campos)
    public function update(Request $request, $id)
    {
        $tarea = Tarea::findOrFail($id);  // busca la tarea por ID o lanza 404

        // Actualizar solo los campos presentados en la petición
        if ($request->has('nombre')) {
            $tarea->nombre = $request->nombre;
        }
        if ($request->has('descripcion')) {
            $tarea->descripcion = $request->descripcion;
        }
        if ($request->has('persona_asignada')) {
            $tarea->persona_asignada = $request->persona_asignada;
        }
        if ($request->has('estado')) {
            $tarea->estado = $request->estado;
        }

        $tarea->save();  // guarda los cambios en la BD

        return response()->json($tarea);
    }
}
