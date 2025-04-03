<?php

use App\Http\Controllers\TareaController;
use Illuminate\Support\Facades\Route;



Route::get('/tareas', [TareaController::class, 'index']);
Route::post('/tareas', [TareaController::class, 'store']);
Route::put('/tareas/{id}', [TareaController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
