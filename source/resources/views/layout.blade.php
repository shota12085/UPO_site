<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/top.css') }}">
    <title>upo_site</title>
  </head>
  <body>
    <header>
      <div>Article List</div>
    </header>
    @yield('content')
  </body>
</html>