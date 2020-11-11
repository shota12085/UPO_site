@extends('../layout')
@section('content')
<h1>Article</h1>
<form action="/article" method="POST">
  {{ csrf_field()}}
  <div>
    <label for="article-title">タイトル</label>
    <input type="text" name="title" id="article-title">
  </div>
  <div>
    <label for="article-content">内容</label>
    <input type="text" name="content" id="article-content">
  </div>
  <input type="submit">
</form>

<h3>Article List</h3>
<table>
  <tr>
    <th>タイトル</th>
    <th>内容</th>
  </tr>
  @foreach ($articles as $article)
    <tr>
      <th>{{ $article->title }}</th>
      <th>{{ $article->content }}</th>
      <th>
        <form action="/article/{{ $article->id }}" method="POST">
        {{ csrf_field() }}
        {{ method_field('DELETE') }}
        <button>Delete</button>
        </form>
      </th>
    </tr>
  @endforeach
</table>

@endsection