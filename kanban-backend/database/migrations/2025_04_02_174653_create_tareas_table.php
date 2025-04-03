<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTareasTable extends Migration
{
    public function up(): void
    {
        Schema::create('tareas', function (Blueprint $table) {
            $table->id();                                // ID autoincremental
            $table->string('nombre');                   // Nombre de la tarea
            $table->text('descripcion')->nullable();    // Descripción
            $table->string('persona_asignada');         // Nombre de la persona asignada
            $table->string('estado')->default('Pendiente'); // Estado de la tarea (Pendiente, En Proceso, Finalizado)
            $table->timestamps();                       // Marca de tiempo created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tareas');
    }
}
