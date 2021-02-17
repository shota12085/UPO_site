<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class TopController extends Controller
{
    //
    public function index()
    {
        //
        // $articles = Article::all();
        return view('article/index');
        // return view('article/index',['articles' => $articles]);
    }
}
