<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;





Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/about', [WelcomeController::class, 'about'])->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('documentation', [DashboardController::class, 'documentation'])->name('documentation');

    Route::put('user/bulk', [UserController::class, 'bulkUpdate'])->name('user.bulk.update');
    Route::delete('user/bulk', [UserController::class, 'bulkDelete'])->name('user.bulk.destroy');
    Route::get('user/archived', [UserController::class, 'archived'])->name('user.archived');
    Route::put('user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::apiResource('user', UserController::class);

    Route::apiResource('role', RoleController::class);
    Route::apiResource('permission', PermissionController::class);
    Route::apiResource('media', MediaController::class);
    Route::put('category/bulk', [CategoryController::class, 'bulkUpdate'])->name('category.bulk.update');
    Route::delete('category/bulk', [CategoryController::class, 'bulkDelete'])->name('category.bulk.destroy');
    Route::apiResource('category', CategoryController::class);
    Route::put('courier/bulk', [CourierController::class, 'bulkUpdate'])->name('courier.bulk.update');
    Route::delete('courier/bulk', [CourierController::class, 'bulkDelete'])->name('courier.bulk.destroy');
    Route::apiResource('courier', CourierController::class);
    Route::put('product/bulk', [ProductController::class, 'bulkUpdate'])->name('product.bulk.update');
    Route::delete('product/bulk', [ProductController::class, 'bulkDelete'])->name('product.bulk.destroy');
    Route::get('product/archived', [ProductController::class, 'archived'])->name('product.archived');
    Route::put('product/{product}/restore', [ProductController::class, 'restore'])->name('product.restore');
    Route::delete('product/{product}/force-delete', [ProductController::class, 'forceDelete'])->name('product.force-delete');
    Route::post('product/{product}/upload-media', [ProductController::class, 'uploadMedia'])->name('product.upload-media');
    Route::apiResource('product', ProductController::class);
    Route::put('cart/bulk', [CartController::class, 'bulkUpdate'])->name('cart.bulk.update');
    Route::delete('cart/bulk', [CartController::class, 'bulkDelete'])->name('cart.bulk.destroy');
    Route::apiResource('cart', CartController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
