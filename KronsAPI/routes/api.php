<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\MoveController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DocController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/password-reset', [AuthController::class, 'resetPassword']);

Route::middleware('CheckSanctumToken')->group(function () {
    // AuthController végpontok
    Route::post('/checkToken', [AuthController::class, 'checkToken']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // PartnerController végpontok
    Route::post('/partners', [PartnerController::class, 'index']);
    Route::post('/partner', [PartnerController::class, 'show']);
    Route::post('/createPartner', [PartnerController::class, 'store']);
    Route::post('/updatePartner', [PartnerController::class, 'update']);
    
    // ItemController végpontok
    Route::post('/items', [ItemController::class, 'index']);
    Route::post('/item', [ItemController::class, 'show']);
    Route::post('/createItem', [ItemController::class, 'store']);
    Route::post('/updateItem', [ItemController::class, 'update']);
    
    // DocController végpontok
    Route::post('/saveReceipt', [DocController::class, 'saveReceipt']);
    Route::post('/generateReceiptNumber', [DocController::class, 'generateReceiptNumber']);
    Route::post('/saveReceiptout', [DocController::class, 'saveReceiptout']);
    Route::post('/projectReceipts', [DocController::class, 'projectReceipts']);
    Route::post('/savePdf', [DocController::class, 'savePdf']);
    Route::post('/getDocList', [DocController::class, 'getDocList']);    
    Route::post('/generateReceiptNumberout', [DocController::class, 'generateReceiptNumberout']);

    Route::post('/allCode', [MoveController::class, 'index']);
    Route::post('/moveCode', [MoveController::class, 'show']);
    Route::post('/getSettings', [SettingsController::class, 'getSettings']);
    Route::post('/projects', [ProjectController::class, 'index']);
    Route::post('/project', [ProjectController::class, 'show']);
   

    Route::middleware('role')->group(function (){
        Route::post('/execute-sql', [DocController::class, 'executeSQL']);
        Route::post('/exportToPdf', [DocController::class, 'export']);
        Route::post('/storeUser', [AuthController::class, 'register']);
        Route::post('/allUsers', [AuthController::class, 'getAllUsers']); // Felhasználók listázása
        Route::post('/updateUser', [AuthController::class, 'updateUser']);    
    
        // SettingsController végpontok
        Route::post('/setSettings', [SettingsController::class, 'saveSettings']);
        
        // MoveController végpontok
        Route::post('/moveCode', [MoveController::class, 'show']);
        Route::post('/store', [MoveController::class, 'store']);
        Route::post('/update', [MoveController::class, 'update']);
            
        // ProjectController végpontok
        Route::post('/createProject', [ProjectController::class, 'store']);
        Route::post('/updateProject', [ProjectController::class, 'update']);

    });

});






