<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('top/index');
});
Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/article', function () {
    return view('article/index');
});
Route::resource('admin', 'Admin\AdminController',['only' => 'index']);
// Route::resource('login','Auth/LoginController');
// ログインチェック
Route::get('api/loginCheck', 'Admin\AdminController@getLoginCheck');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
